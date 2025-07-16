import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SortablejsModule } from '@maksim_m/ngx-sortablejs';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { SpkReusableTablesComponent } from '../../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { SharedModule } from '../../../../../../shared/shared.module';
import { MaterialModuleModule } from '../../../../../../material-module/material-module.module';
import { FORMIDCONFIG } from '../../../../../../../config/formId.config';
import { ApiService } from '../../../../../../core/services/api/api.service';
import { SweetAlertService } from '../../../../../../core/services/alert/sweet-alert.service';
import { DateService } from '../../../../../../shared/services/date.service';
import { ToastrServices } from '../../../../../../shared/services/toastr.service ';
import { ModuleService } from '../../../../../../shared/services/module.service';
import { LogService } from '../../../../../../core/services/log/log.service';
import { ComanFuncationService } from '../../../../../../shared/services/comanFuncation.service';

@Component({
  selector: 'app-badges-list',
  imports: [
    SpkReusableTablesComponent,
    SharedModule,
    MaterialModuleModule,
    CommonModule,
    FormsModule,
    SortablejsModule,
    RouterModule
  ],
  templateUrl: './badges-list.component.html',
})
export class BadgesListComponent {
  
  FORMID:any= FORMIDCONFIG;
  filter:any ={};
  skLoading:boolean = false;
  view: any;
  pagination:any = {}
  badgesMasterList:any=[];
  cashMasterList:any=[];
  moduleFormId:number =0;
  moduleId:number=0
  submodule:any ={}
  activeTab:any ='Active';
  isChecked: boolean = false;
  originalData:any={};
  mainTabs:any = [];
  moduleName:string = '';
  tabCount: any = {};
  accessRight:any = {};
  constructor(
    public dialog: MatDialog,
    public api: ApiService, 
    public alert : SweetAlertService,
    private router: Router,
    private dateService: DateService,
    private toastr: ToastrServices,
    public moduleService: ModuleService,
    private logService:LogService,
    public comanFuncation: ComanFuncationService
  ){}
  
  ngOnInit() {
    const accessRight = this.moduleService.getAccessMap('IRP','Bonus', 'Badges');
    if (accessRight) {
      this.accessRight = accessRight;
    }
    this.getBadgesList();
    const subModule = this.moduleService.getSubModuleByName('IRP', 'Bonus');
    const subSubModule = this.moduleService.getSubSubModuleByName('IRP','Bonus', 'Badges');
    const form = this.moduleService.getFormById('IRP', 'Bonus', this.FORMID.ID['BadgesList']);
    if (subModule) {
      this.moduleId = subModule.module_id;
      this.moduleName = subModule.title;
    }
    if (subSubModule) {
      this.submodule = subSubModule;
      this.moduleName = subSubModule.title;
    }
    if (form) {
      this.moduleFormId = form.form_id;
    }
  }
  
  
  
  listColumns=[
    {label:"S.No",field:"S.No"},
    {label:"Images",field:"Images"},
    {label:"Created At",field:"Created At"},
    {label:"Created Name",field:"Created Name"},    
    {label:"Customer Category",field:"Customer Category"},
    {label:"Title",field:"Title"},
    { label:"Start Date", field:"Start Date"},
    { label:"End Date", field: "End Date" },
    {label:"Incentive Type",field:"Incentive Type"},
    { label: "Eligible Points", field: "Eligible Points", table_class :'text-right'},
    {label:"Status",field:"Status"},
    {label:"Action",field:"Action"},
  ]
  
  onTabChange(tab: string) {
    this.activeTab = tab;
    this.getBadgesList();
  }
  
  goToGiftAdd() {
    this.router.navigate(['/apps/loyalty/badges-list/badges-add']);
  }
  onRefresh()
  {
    this.filter = {};
    this.getBadgesList();
  }
  
  trackById(index: number, item: any) {
    return item.id; // Unique identifier for each item
  }
  
  onDateChange(type: 'start_date' | 'end_date' | 'created_at', event: any) {
    if (event) {
      const formattedDate = this.dateService.formatToYYYYMMDD(event); // Convert date to YYYY-MM-DD
      this.filter[type] = formattedDate;
    } else {
      this.filter[type] = null; // Reset the value if cleared
    }
    if ((this.filter.start_date && this.filter.end_date) || this.filter.created_at) {
      this.getBadgesList();
    }
  }
  
  getBadgesList() {
    this.skLoading = true;
    this.api.post({ 'filters': this.filter, 'activeTab': this.activeTab, page: this.pagination.cur_page ?? 1 }, 'badges/read').subscribe(result => {
      if (result['statusCode'] == 200) {
        this.skLoading = false;
        this.badgesMasterList = result['data']['result'];
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
        for (let i = 0; i < this.badgesMasterList.length; i++) {
          const list = this.badgesMasterList[i];
          list.isChecked = list.status === 'Active';
        }
      }
    });
  }
  
  changeToPagination(action: string) {
    if (action === 'Next' && this.pagination.cur_page < this.pagination.total_pages) {
      this.pagination.cur_page++;
    } else if (action === 'Previous' && this.pagination.cur_page > 1) {
      this.pagination.cur_page--;
    }
    this.getBadgesList(); 
  }
  
  changeToPage(page: number) {
    this.pagination.cur_page = page; 
    this.getBadgesList();
  }
  
  // delete funcation start //
  delete(id: string, api: string, label: string) {
    this.comanFuncation.delete(id, this.submodule, label, api, 'single_action', id).subscribe((result: boolean) => {
      if (result === true) {
        this.getBadgesList();
      }
    });
  }
  // delete funcation end
  
  openMainLogModal(row_id:string) {
    this.comanFuncation.listLogsModal(this.submodule.sub_module_id, row_id, this.submodule.module_type).subscribe(result => {
    });
  }
  
  onToggleChange(newState: boolean, id: string, status: string) {
    this.comanFuncation.statusChange(newState, id, status, this.submodule, 'toggle','badges/update-status',).subscribe((result: boolean) => {
      if (result) {
        this.getBadgesList();
      } else {
        this.getBadgesList();
      }
    });
  }
  
}
