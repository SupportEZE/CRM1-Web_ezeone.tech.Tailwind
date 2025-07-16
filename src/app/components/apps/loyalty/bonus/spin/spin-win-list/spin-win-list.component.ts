import { Component } from '@angular/core';
import { SharedModule } from '../../../../../../shared/shared.module';
import { SpkReusableTablesComponent } from '../../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { CommonModule } from '@angular/common';
import { FORMIDCONFIG } from '../../../../../../../config/formId.config';
import { FormsModule } from '@angular/forms';
import { MaterialModuleModule } from '../../../../../../material-module/material-module.module';
import { ComanFuncationService } from '../../../../../../shared/services/comanFuncation.service';
import { LogService } from '../../../../../../core/services/log/log.service';
import { ModuleService } from '../../../../../../shared/services/module.service';
import { ToastrServices } from '../../../../../../shared/services/toastr.service ';
import { DateService } from '../../../../../../shared/services/date.service';
import { Router } from '@angular/router';
import { SweetAlertService } from '../../../../../../core/services/alert/sweet-alert.service';
import { ApiService } from '../../../../../../core/services/api/api.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { HighlightService } from '../../../../../../shared/services/highlight.service';

@Component({
  selector: 'app-spin-win-list',
  imports: [
    CommonModule,
    SharedModule,
    SpkReusableTablesComponent,
    FormsModule,
    MaterialModuleModule
    
  ],
  templateUrl: './spin-win-list.component.html',
})
export class SpinWinListComponent {
  mainTabs:any = [];
  FORMID:any= FORMIDCONFIG;
  filter:any ={};
  skLoading:boolean = false;
  view: any;
  pagination:any = {}
  spinWinList:any=[];
  cashMasterList:any=[];
  moduleFormId:number =0;
  submoduleId:any ={}
  sorting: any = {};
  spinWinDetails:any;
  spinWinId:any;
  activeTab:any ='Active';
  tabCount: any = {};
  pageKey = 'spin-win-list';
  highlightedId: string | undefined;
  submodule: any = {};
  accessRight:any = {};
  
  
  constructor(
    public dialog: MatDialog,
    public api: ApiService, 
    public alert : SweetAlertService,
    private router: Router,
    public dateFormat: DateService,
    private toastr: ToastrServices,
    public moduleService: ModuleService,
    private logService:LogService,
    public comanFuncation: ComanFuncationService,
    private highlightService:HighlightService
  ){}
  
  ngOnInit() {
    const accessRight = this.moduleService.getAccessMap('IRP','Bonus', 'Spin & Win');
    if (accessRight) {
      this.accessRight = accessRight;
    }
    this.getSpinWinList();
    const subModule = this.moduleService.getSubModuleByName('IRP', 'Bonus');
    const subSubModule = this.moduleService.getSubSubModuleByName('IRP','Bonus', 'Spin & Win');;
    const form = this.moduleService.getFormById('IRP', 'Bonus', this.FORMID.ID['SpinWinList']);
    
    if (subSubModule) {
      this.submodule = subSubModule;
    }
    if (form) {
      this.moduleFormId = form.form_id;
    }
    
    
    let highlight = this.highlightService.getHighlight(this.pageKey);
    if (highlight != undefined) {
      this.activeTab = highlight.tab;
      this.highlightedId = highlight.rowId;
      this.pagination.cur_page = highlight.pageIndex;
      this.filter = highlight.filters
      this.highlightService.clearHighlight(this.pageKey);
    }
    
    
  }
  
  spinWinListColumns=[
    {label:"S.No",field:"S.No"},
    {label:"Created At",field:"Created At"},
    {label:"Created Name",field:"Created Name"},
    {label:"Customer Category",field:"Customer Category"},
    {label:"Point Section",field:"Point Section"},
    {label:"Eligibilty Days Interval",field:"Eligibilty Days Interval"},
    {label:"Spin Points Slab",field:"Spin Points Slab"},
    {label:"Status",field:"Status"},
    {label:"Action",field:"Action"},
  ]
  
  
  onTabChange(tab: string) {
    this.activeTab = tab;
    if (this.activeTab === 'Active') {
      this.getSpinWinList();
    }
    this.getSpinWinList();
  }
  
  
  isHighlighted(id: string): boolean {
    return this.highlightedId === id;
  }
  
  setHighLight(rowId: string) {
    this.comanFuncation.setHighLight(this.pageKey, rowId, this.activeTab, this.filter, this.pagination.cur_page ? this.pagination.cur_page : 1)
  }
  
  goToSpinWinAdd() {
    this.router.navigate(['/apps/loyalty/spin-win-list/spin-win-add']);
  }
  
  trackById(index: number, item: any) {
    return item.id; // Unique identifier for each item
  }
  
  getSpinWinList() {
    this.skLoading = true;
    this.api.post({ filters: this.filter, activeTab: this.activeTab, 'page': this.pagination.cur_page ?? 1}, 'spin-win/read').subscribe(result => {
      if (result['statusCode'] == 200) {
        this.skLoading = false;
        this.spinWinList = result['data']['result'];
        this.tabCount = result['data']['statusTabs'] ? result['data']['statusTabs'] : {};
        
        this.mainTabs = [
          { 
            name: 'Active', 
            label: 'Active', 
            icon: 'ri-team-fill', 
            count: this.tabCount.activeCount ? this.tabCount.activeCount : 0
          },
          { 
            name: 'Inactive', 
            label: 'Inactive',
            icon: 'ri-calendar-check-fill', 
            count: this.tabCount.inActiveCount ? this.tabCount.inActiveCount : 0 
          }
        ];      
        this.pagination = result['pagination'];
        for (let i = 0; i < this.spinWinList.length; i++) {
          const list = this.spinWinList[i];
          list.isChecked = list.status === 'Active';
        }
      }
    });
  }
  
  getSlabPoints(slabData: any[]): string {
    return slabData?.map(slab => slab.slab_point).join(', ') || '--';
  }
  
  onRefresh()
  {
    this.filter = {};
    this.getSpinWinList();
  }
  
  onDateChange(type: 'date_from' | 'date_to' | 'created_at', event: any) {
    if (event) {
      const formattedDate = this.dateFormat.formatToYYYYMMDD(event); // Convert date to YYYY-MM-DD
      this.filter[type] = formattedDate;
    } else {
      this.filter[type] = null; // Reset the value if cleared
    }
    if ((this.filter.date_from && this.filter.date_to) || this.filter.created_at) {
      this.getSpinWinList();
    }
  }
  
  openMainLogModal(row_id:string) {
    this.comanFuncation.listLogsModal(this.submoduleId.sub_module_id, row_id, this.submoduleId.module_type).subscribe(result => {
    });
  }
  
  changeToPagination(action: string) {
    if (action === 'Next' && this.pagination.cur_page < this.pagination.total_pages) {
      this.pagination.cur_page++;
    } else if (action === 'Previous' && this.pagination.cur_page > 1) {
      this.pagination.cur_page--;
    }
    this.getSpinWinList(); 
  }
  
  changeToPage(page: number) {
    this.pagination.cur_page = page; 
    this.getSpinWinList();
  }
  
  onToggleChange(newState: boolean, id: string, status: string) {
    this.comanFuncation.statusChange(newState, id, status, this.submoduleId, 'toggle','spin-win/update-status',).subscribe((result: boolean) => {
      if (result) {
        this.getSpinWinList();
      } else {
        this.getSpinWinList();
      }
    });
  }
  
  onUpdate(id: any) {
    this.setHighLight(id)
    this.router.navigate(['/apps/loyalty/spin-win-list/edit', id, 'edit']); // For edit mode
  }  
  
  getSpinWinDetail() {
    this.skLoading = true;
    this.api.post({_id: this.spinWinId}, 'spin-win/detail').subscribe(result => {
      if (result['statusCode']  ===  200) {
        this.skLoading = false;
        this.spinWinDetails = result['data'];
      }
    });
  }
  
}
