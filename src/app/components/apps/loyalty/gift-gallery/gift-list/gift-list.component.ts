import { Component } from '@angular/core';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SortablejsModule } from '@maksim_m/ngx-sortablejs';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../../../core/services/api/api.service';
import { SweetAlertService } from '../../../../../core/services/alert/sweet-alert.service';
import { GiftAddComponent } from '../gift-add/gift-add.component';
import Swal from 'sweetalert2';
import { DateService } from '../../../../../shared/services/date.service';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { ModuleService } from '../../../../../shared/services/module.service';
import { LogService } from '../../../../../core/services/log/log.service';
import { FORMIDCONFIG } from '../../../../../../config/formId.config';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import { HighlightService } from '../../../../../shared/services/highlight.service';

@Component({
  selector: 'app-gift-list',
  imports: [SpkReusableTablesComponent, SharedModule, MaterialModuleModule, CommonModule, FormsModule, SortablejsModule, RouterModule],
  
  templateUrl: './gift-list.component.html',
})
export class GiftListComponent {
  FORMID:any= FORMIDCONFIG;
  filter:any ={};
  skLoading:boolean = false;
  view: any;
  pagination:any = {}
  giftMasterList:any=[];
  cashMasterList:any=[];
  moduleFormId:number =0;
  moduleId:number=0;
  submodule:any ={}
  activeTab:any ='Gift';
  isChecked: boolean = false;
  originalData:any={};
  mainTabs:any = [];
  giftTabs: any = {};
  highlightedId: string | undefined;
  pageKey = 'qr-list';
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
    private highlightService: HighlightService
  ){}
  
  ngOnInit() {
    const accessRight = this.moduleService.getAccessMap('IRP', 'Gift Gallery');
    if (accessRight) {
      this.accessRight = accessRight;
    }
    
    const subModule = this.moduleService.getSubModuleByName('IRP', 'Gift Gallery');
    const form = this.moduleService.getFormById('IRP', 'Qr Code', this.FORMID.ID['GiftList']);
    if (subModule) {
      this.submodule = subModule;
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
    this.getGiftList();
  }
  
  
  listColumns=[
    {label:"S.No",field:"S.No"},
    {label:"Images",field:"Images"},    
    {label:"Created At",field:"Created At"},
    {label:"Created Name",field:"Created Name"},
    {label:"Title",field:"Title"},
    {label:"Customer Category",field:"Customer Category"},
    {label:"Range Start",field:"Range Start"},
    {label:"Range End",field:"Range End"},
    {label:"Eligible Points",field:"Eligible Points"},
    {label:"Per Point Value",field:"Per Point Value"},
    {label:"Description",field:"Description"},
    {label:"Status",field:"Status"},
    {label:"Action",field:"Action"},
  ]
  
  get filteredListColumns() {
    if (!this.listColumns) return []; // Ensures listColumns is initialized
    
    if (this.activeTab === 'Gift' || this.activeTab === 'Voucher') {
      return this.listColumns?.filter(col => col.label !== 'Range Start' && col.label !== 'Range End' && col.label !== 'Per Point Value' ) || [];
    } else if (this.activeTab === 'Cash') {
      return this.listColumns?.filter(col => col.label !== 'Eligible Points' && col.label !== 'Start Date' && col.label  !== 'End Date'   && col.label !== 'Images') || [];
    }
    return this.listColumns || []; // Default case
  }
  
  
  
  isHighlighted(id: string): boolean {
    return this.highlightedId === id;
  }
  
  setHighLight(rowId: string) {
    this.comanFuncation.setHighLight(this.pageKey, rowId, this.activeTab, this.filter, this.pagination.cur_page ? this.pagination.cur_page : 1)
  }
  
  
  goToDetail(rowId: any) {
    this.setHighLight(rowId);
    this.router.navigate(['/apps/loyalty/gift-list/gift-detail/'+this.activeTab+'/' + rowId]);
  }
  
  getGiftList() {
    this.skLoading = true;
    this.api.post({ filters: this.filter, activeTab: this.activeTab, 'page': this.pagination.cur_page ?? 1 }, 'gift-gallery/read').subscribe(result => {
      if (result['statusCode'] == 200) {
        this.skLoading = false;
        this.giftMasterList = result['data']['result'];
        this.giftTabs = result['data']['activeTab'];
        
        this.mainTabs = [
          { 
            name: 'Gift', 
            label: 'Gift', 
            icon: 'ri-team-fill', 
            count: this.giftTabs.gift_count ? this.giftTabs.gift_count : 0
          },
          { 
            name: 'Cash', 
            label: 'Bank Transfer', 
            icon: 'ri-calendar-check-fill', 
            count: this.giftTabs.cash_count ? this.giftTabs.cash_count : 0
          },
          {
            name: 'Voucher',
            label: 'Voucher',
            icon: 'ri-calendar-check-fill',
            count: this.giftTabs.voucher_count ? this.giftTabs.voucher_count : 0
          }
        ];
        for (let i = 0; i < this.giftMasterList.length; i++) {
          const list = this.giftMasterList[i];
          list.isChecked = list.status === 'Active';
          
        }
        this.pagination = result['pagination'];
      }
    });
  }
  
  
  
  // Function to change tab and fetch data accordingly
  onTabChange(tab: string) {
    this.activeTab = tab;
    this.getGiftList();
  }
  
  changeToPagination(action: string) {
    if (action === 'Next' && this.pagination.cur_page < this.pagination.total_pages) {
      this.pagination.cur_page++;
    } else if (action === 'Previous' && this.pagination.cur_page > 1) {
      this.pagination.cur_page--;
    }
    this.getGiftList(); 
  }
  
  changeToPage(page: number) {
    this.pagination.cur_page = page; 
    this.getGiftList();
  }
  
  goToGiftAdd() {
    this.router.navigate(['/apps/loyalty/gift-list/gift-add']);
  }
  
  // delete funcation start //
  delete(id: string, api: string, label: string) {
    this.comanFuncation.delete(id, this.submodule, label, api, 'single_action', id).subscribe((result: boolean) => {
      if (result === true) {
        this.getGiftList();
      }
    });
  }
  // Delete Funcation End
  
  onRefresh()
  {
    this.filter = {};
    this.getGiftList();
  }
  
  updateGift(id: any, type: string) {
    this.router.navigate(['/apps/loyalty/gift-add'], { queryParams: { id, type } });
  }
  
  onDateChange(type: 'date_from' | 'date_to' | 'created_at', event: any) {
    if (event) {
      const formattedDate = this.dateService.formatToYYYYMMDD(event); // Convert date to YYYY-MM-DD
      this.filter[type] = formattedDate;
    } else {
      this.filter[type] = null; // Reset the value if cleared
    }
    if ((this.filter.date_from && this.filter.date_to) || this.filter.created_at) {
      this.getGiftList();
    }
  }
  
  // ***** List Logs Modal Start *****//
  openMainLogModal(row_id:string) {
    this.comanFuncation.listLogsModal(this.submodule.module_id, row_id, this.submodule.module_type).subscribe(result => {
    });
  }
  // ***** List Logs Modal End *****//
  
  
  // ******status change funcation start*****//
  onToggleChange(newState: boolean, id: string, status: string) {
    this.comanFuncation.statusChange(newState, id, status, this.submodule, 'toggle','gift-gallery/update-status').subscribe((result: boolean) => {
      if (result) {
        this.getGiftList();
      } else {
        this.getGiftList();
      }
    });
  }
  // ******status change funcation end*****//

  
}
