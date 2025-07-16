import { Component } from '@angular/core';
import { ComanFuncationService } from '../../../../../../shared/services/comanFuncation.service';
import { LogService } from '../../../../../../core/services/log/log.service';
import { ModuleService } from '../../../../../../shared/services/module.service';
import { ToastrServices } from '../../../../../../shared/services/toastr.service ';
import { DateService } from '../../../../../../shared/services/date.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SweetAlertService } from '../../../../../../core/services/alert/sweet-alert.service';
import { ApiService } from '../../../../../../core/services/api/api.service';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModuleModule } from '../../../../../../material-module/material-module.module';
import { FormsModule } from '@angular/forms';
import { SpkReusableTablesComponent } from '../../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { SharedModule } from '../../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FORMIDCONFIG } from '../../../../../../../config/formId.config';
import Swal from 'sweetalert2';
import { HighlightService } from '../../../../../../shared/services/highlight.service';

@Component({
  selector: 'app-bonus-point-list',
  imports: [
    CommonModule,
    SharedModule,
    SpkReusableTablesComponent,
    FormsModule,
    MaterialModuleModule,
    RouterModule
  ],
  templateUrl: './bonus-point-list.component.html',
})
export class BonusPointListComponent {
  FORMID:any= FORMIDCONFIG;
  filter:any ={};
  skLoading:boolean = false;
  view: any;
  pagination:any = {}
  bonusList :any=[];
  sorting: any = {};
  moduleFormId:number =0;
  moduleId:number=0
  submoduleId:any ={}
  moduleName:string = '';
  mainTabs:any = [];
  activeTab:any ='Active';
  tabCount: any = {};
  pageKey = 'bonus-list';
  highlightedId: string | undefined;
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
    public comanFuncation: ComanFuncationService,
    public route:ActivatedRoute,
    private highlightService:HighlightService
  ){}
  
  ngOnInit() {
    const accessRight = this.moduleService.getAccessMap('IRP','Bonus');
    if (accessRight) {
      this.accessRight = accessRight;
    }
    const subModule = this.moduleService.getSubModuleByName('IRP', 'Bonus');
    const subSubModule = this.moduleService.getSubSubModuleByName('IRP','Bonus', 'Spin & Win');
    const form = this.moduleService.getFormById('IRP', 'Bonus', this.FORMID.ID['BonusList']);
    if (subModule) {
      this.submoduleId = subModule;
      this.submoduleId.sub_module_id = this.submoduleId.module_id
    }
    if (subSubModule) {
      this.submoduleId = subSubModule;
      this.moduleName = subSubModule.title;
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
    
    this.getBonusList();
  }
  
  
  spinWinListColumns=[
    {label:"S.No",field:"S.No"},
    {label:"Created At",field:"Created At"},
    {label:"Created Name",field:"Created Name"},
    {label:"Date From",field:"Date From"},
    {label:"Date To",field:"Date To"},
    {label:"Customer Category",field:"Customer Category"},
    {label:"Title",field:"Title"},
    {label:"Status",field:"Status"},
  ]
  
  onTabChange(tab: string) {
    this.activeTab = tab;
    if (this.activeTab === 'Active') {
      this.getBonusList();
    }
    this.getBonusList();
  }
  
  onRefresh()
  {
    this.filter = {};
    this.getBonusList();
  }
  
  
  isHighlighted(id: string): boolean {
    return this.highlightedId === id;
  }
  
  setHighLight(rowId: string) {
    this.comanFuncation.setHighLight(this.pageKey, rowId, this.activeTab, this.filter, this.pagination.cur_page ? this.pagination.cur_page : 1)
  }
  
  
  goToBonusAdd() {
    this.router.navigate(['/apps/loyalty/bonus/bonus-add']);
  }
  
  trackById(index: number, item: any) {
    return item.id; // Unique identifier for each item
  }
  
  getBonusList() {
    this.skLoading = true;
    this.api.post({ 'filters': this.filter, 'activeTab': this.activeTab,'page': this.pagination.cur_page ?? 1 }, 'bonus/read').subscribe(result => {
      if (result['statusCode'] == 200) {
        this.skLoading = false;
        this.bonusList = result['data']['result']; 
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
        for (let i = 0; i < this.bonusList.length; i++) {
          const list = this.bonusList[i];
          list.isChecked = list.status === 'Active';
          // Convert date fields
          if (list.created_at) {
            list.created_at = this.dateService.formatToYYYYMMDD(new Date(list.created_at));
          }
          if (list.start_date) {
            list.start_date = this.dateService.formatToYYYYMMDD(new Date(list.start_date));
          }
          if (list.end_date) {
            list.end_date = this.dateService.formatToYYYYMMDD(new Date(list.end_date));
          }
        }
      }
    });
  }
  
  onDateChange(type: 'start_date' | 'end_date' | 'created_at', event: any) {
    if (event) {
      const formattedDate = this.dateService.formatToYYYYMMDD(event); // Convert date to YYYY-MM-DD
      this.filter[type] = formattedDate;
    } else {
      this.filter[type] = ''; // Reset the value if cleared
    }
    if ((this.filter.start_date && this.filter.end_date) || this.filter.created_at) {
      this.getBonusList();
    }
  }
  
  changeToPagination(action: string) {
    if (action === 'Next' && this.pagination.cur_page < this.pagination.total_pages) {
      this.pagination.cur_page++;
    } else if (action === 'Previous' && this.pagination.cur_page > 1) {
      this.pagination.cur_page--;
    }
    this.getBonusList(); 
  }
  
  changeToPage(page: number) {
    this.pagination.cur_page = page; 
    this.getBonusList();
  }
  
  onToggleChange(newState: boolean, id: string, status: string) {
    this.comanFuncation.statusChange(newState, id, status, this.submoduleId, 'toggle','bonus/update-status',).subscribe((result: boolean) => {
      if (result) {
        this.getBonusList();
      } else {
        this.getBonusList();
      }
    });
  }
  
  onUpdate(id: any) {
    this.router.navigate(['/apps/loyalty/bonus-point-add', id, 'edit']); // For edit mode
  } 
  
  onDeleteRow(rowId: any) {
    this.alert.confirm("Are you sure?")
    .then((result) => {
      if (result.isConfirmed) {
        let deleteEndpoint = '';
        deleteEndpoint = 'bonus/delete';
        this.api.patch({ _id: rowId, is_delete: 1}, deleteEndpoint).subscribe(result => {
          if (result['statusCode'] == '200') {
            Swal.fire('Deleted!', result.message, 'success');
            this.getBonusList();
          }                        
        });
      }
    });
  } 
  
}
