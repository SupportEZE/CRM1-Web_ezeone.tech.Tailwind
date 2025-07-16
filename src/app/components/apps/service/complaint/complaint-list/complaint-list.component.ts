import { Component } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../../shared/shared.module';
import { SweetAlertService } from '../../../../../core/services/alert/sweet-alert.service';
import { Router } from '@angular/router';
import { UtilService } from '../../../../../utility/util.service';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../../../core/services/api/api.service';
import { CommonApiService } from '../../../../../shared/services/common-api.service';
import { ModuleService } from '../../../../../shared/services/module.service';
import { LogModalComponent } from '../../../log-modal/log-modal.component';
import { ModalsComponent } from '../../../../../shared/components/modals/modals.component';
import { FormFieldTypes } from '../../../../../utility/constants';
import { FORMIDCONFIG } from '../../../../../../config/formId.config';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';

@Component({
  selector: 'app-complaint-list',
  imports: [
    SharedModule,
    CommonModule,
    SpkReusableTablesComponent,
    FormsModule
  ],
  templateUrl: './complaint-list.component.html',
  styleUrl: './complaint-list.component.scss'
})
export class ComplaintListComponent {
  filter: any = {};
  FORMID:any= FORMIDCONFIG;
  skLoading:boolean = false
  tableData:any = {};
  tableHeader:any = [];
  listing:any = [];
  listingData:any = [];
  listTabs:any = {};
  listPagination:any = {}
  subModule:any = {}
  moduleName:string = '';
  moduleId:number=0
  moduleFormId:number=0;
  moduleTableId:number =0;
  readonly fieldTypes = FormFieldTypes;
  page: number = 1;
  activeTab:any ='All';
  activeSubTab:any ='';
  mainTabs:any  = [];
  inProcessTabs: any = [];
  closeTabs: any = [];
  // Main Tabs Data
  accessRight:any = {};
  priorityKeys: any = [];
  tabCount:any ={};
  priorityCount: any = {};
  userViceCounts: any = {};
  categoryKeys: any = [];
  tabs = [
    { label: "All", value: "", icon: "ri-inbox-line", countClass: 'warning', count: 0 },
    { label: "Pending", value: "Pending", icon: "ri-time-line", countClass: 'warning', count: 0 },
    { label: "Close", value: "Close", icon: "ri-checkbox-line", countClass: 'success', count: 0 },
    { label: "Cancel", value: "Cancel", icon: "ri-close-circle-line", countClass: 'danger', count: 0 }
  ];
  constructor(
    public moduleService: ModuleService,
    public CommonApiService: CommonApiService,
    public api:ApiService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    public util:UtilService, 
    private router: Router,
    public alert : SweetAlertService,
    public commonFunction: ComanFuncationService
  ){}
  
  ngOnInit() {
    const accessRight = this.moduleService.getAccessMap('WCMS', 'Complaint');
    console.log(accessRight);
    if (accessRight) {
      this.accessRight = accessRight;
    }
    const subModule = this.moduleService.getSubModuleByName('WCMS', 'Complaint');
    const form = this.moduleService.getFormById('WCMS', 'Complaint', this.FORMID.ID['ComplaintForm']);
    const tableId = this.moduleService.getTableById('WCMS', 'Complaint', this.FORMID.ID['ComplaintTable']);
    
    if (subModule) {
      this.subModule = subModule;
      this.moduleId = subModule.module_id;
      this.moduleName = subModule.title;
      console.log(this.subModule);
      
    }
    if (form) {
      this.moduleFormId = form.form_id;
    }
    if (tableId) {
      this.moduleTableId = tableId.table_id;
    }
    this.getHeaderConfigListing();
  }
  setActiveTab(tab:string) {
    this.activeTab = tab;
    this.filter = {};
  }
  
  onRefresh()
  {
    this.filter = {};
    this.getHeaderConfigListing();
  }
  
  goToAddPage()
  {
    this.router.navigate(['/apps/service/complaint/complaint-add']);
  }
  
  goToDetailPage(rowId:any)
  {
    this.router.navigate(['/apps/service/complaint/complaint-detail' , rowId]);
  }
  
  // Function to change the active tab
  onTabChange(tab: string, subTab: string) {
    this.activeTab = tab;
    this.activeSubTab = subTab;
    this.getList();
  }
  
  // Function to change the active sub-tab
  onSubTabChange(subTab: string) {
    this.activeSubTab = subTab;
    this.getList();
  }
  
  getHeaderConfigListing()
  {
    this.CommonApiService.getHeaderConfigListing(this.moduleTableId , this.moduleFormId).subscribe((result:any) => {
      
      this.tableData = result.data;
      this.tableHeader =   result['data']['table_data']['tableHead'];
      
      // --------- For columns filter in listing//
      this.tableHeader = this.tableHeader.filter((header: any) => header.list_view_checked && header.key_name_required !== true && header.type != this.fieldTypes.UPLOAD);
      this.getState();
      this.getList();
      // ---------//
      
    });
  }
  
  updateFilter(name: string) {
    this.filter.service_engineer_name = name;
    this.getList();
  }
  
  updatePriorityFilter(name: string) {
    this.filter.priority = name;
    this.getList();
  }
  
  getList() {
    this.skLoading = true;
    if(this.activeTab != 'All')this.filter.status = this.activeTab;
    this.filter = this.commonFunction.removeBlankKeys(this.filter)
    this.api.post({filters: this.filter, form_id : this.moduleFormId, activeTab: this.activeTab, 'page': this.listPagination.cur_page ?? 1,}, 'complaint/read').subscribe(result => {
      if (result['statusCode'] == '200') {
        this.skLoading = false;
        this.listingData = result['data'];
        this.listing = result['data']['result'];
        this.tabCount = result['data']['category_counts'] ? result['data']['category_counts'] : {};
        this.priorityCount = result['data']['priority_counts'] ? result['data']['priority_counts'] : {};        
        this.priorityKeys = Object.keys(result['data']['priority_counts'] ? result['data']['priority_counts'] : '');
        this.userViceCounts = Object.keys(result['data']['userViceCounts'] ? result['data']['userViceCounts'] : '');
        this.tabs = [
          { label: "All", value: "All", icon: "ri-inbox-line", countClass:'primary' ,count: result['data'].status_counts.All || 0 },
          { label: "Pending", value: "Pending", icon: "ri-time-line", countClass:'warning' ,count: result['data'].status_counts?.Pending || 0 },
          { label: "Close", value: "Close", icon: "ri-checkbox-circle-line", countClass:'success' ,count: result['data'].status_counts?.Close || 0 },
          { label: "Cancel", value: "Cancel", icon: "ri-close-circle-line", countClass:'danger' ,count: result['data'].status_counts?.Cancel || 0 },
        ];
        this.listPagination = result['pagination'];
      }
    });
  }
  
  getState(){
    this.api.post({}, 'postal-code/states').subscribe(result => {
      if(result['statusCode'] === 200){
        for (let i = 0; i < this.tableHeader.length; i++) {
          if(this.tableHeader[i]['name'] === 'state'){
            this.tableHeader[i]['options'] = result['data'];
          }
        }
      }
    });
  }
  getDistrict(state:string){
    this.api.post({"state": state,}, 'postal-code/districts').subscribe(result => {
      if(result['statusCode'] === 200){
        for (let i = 0; i < this.tableHeader.length; i++) {
          if(this.tableHeader[i]['name'] === 'district'){
            this.tableHeader[i]['options'] = result['data'];
          }
        }
      }
    });
  }
  
  getTabCount(tabName: string): string {
    // Return count for the specific tab name from the listTabs object
    if (this.listTabs && this.listTabs[tabName] !== undefined) {
      return this.listTabs[tabName].toString();
    }
    return '0';  // Default count if not available
  }
  
  // -------- Pagination//
  changeToPagination(btnType: string) {
    if (btnType == 'Previous') {
      if (this.listPagination.prev && this.page > 1) {
        this.page--;  // Decrement the page number
        this.getList();
      }
    }
    else
    {
      if (this.listPagination.next) {
        this.page++;  // Increment the page number
        this.getList();
      }
    }
  }
  
  changeToPage(newPage: number) {
    this.page = newPage;
    this.listPagination.cur_page = newPage;
    this.getList();
  }
  // --------//
  
  updateSearchFilter(event: {searchText: string; name: string }) {
    this.filter[event.name] = event.searchText;
    this.getList();
  }
  
  handleSelectChange(event: { category_name: string; selections: string[] }): void {
    const { category_name, selections } = event;
    this.filter[category_name] = selections;
    this.getList();
    
  }
  
  openHeaderSettingModal() {
    this.getHeaderConfigListing();
    const dialogRef = this.dialog.open(ModalsComponent, {
      width: '450px',
      panelClass: 'mat-right-modal',
      position: { right: '0px' },
      data: {
        'lastPage':'header-config',
        'moduleFormId':this.moduleFormId,
        'moduleTableId':this.moduleTableId,
        "PageTableData":this.tableData,
        "allPageHeaders":this.tableHeader,
        "PageHeaders":this.tableHeader,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.tableHeader = result.headers;
        this.getHeaderConfigListing();
      }
    });
  }
  
  openMainLogModal() {
    const dialogRef = this.dialog.open(LogModalComponent, {
      width: '350px',
      panelClass: 'mat-right-modal',
      position: { right: '0px' },
      data: {
        'moduleId':this.subModule.module_id,
        'module_type':this.subModule.module_type,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  
}
