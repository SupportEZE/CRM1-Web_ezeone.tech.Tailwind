import { Component, input, Input } from '@angular/core';
import { SortablejsModule } from '@maksim_m/ngx-sortablejs';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { FORMIDCONFIG } from '../../../../../../config/formId.config';
import { DateService } from '../../../../../shared/services/date.service';
import { SweetAlertService } from '../../../../../core/services/alert/sweet-alert.service';
import { ApiService } from '../../../../../core/services/api/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { ModuleService } from '../../../../../shared/services/module.service';
import { RedeemModalComponent } from '../redeem-modal/redeem-modal.component';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import { HighlightService } from '../../../../../shared/services/highlight.service';
import { MaskService } from '../../../../../utility/mask.service';

@Component({
  selector: 'app-redeem-list',
  standalone: true,
  imports: [
    SharedModule,
    MaterialModuleModule,
    CommonModule,
    RouterModule,
    FormsModule,
    SortablejsModule,
    SpkReusableTablesComponent
  ],
  templateUrl: './redeem-list.component.html',
})
export class RedeemListComponent {
  @Input() _id !:any;
  @Input() redeem_type !:any;
  @Input() detail_page_active:boolean = false
  
  
  filter:any ={};
  skLoading:boolean = false;
  public disabled: boolean = false;
  moduleId:number=0;
  moduleFormId:number =0;
  moduleTableId:number =0;
  FORMID:any= FORMIDCONFIG;
  submoduleId: any={};
  tableId:any;
  activeTab:any ='Pending';
  qrList:any=[];
  tabCount:any ={};
  pagination:any =[];
  redeemType:any;
  pageKey = 'redeem-list';
  highlightedId: string | undefined;
  
  mainTabs = [
    { name: 'Pending', label: 'Pending', icon: 'ri-time-fill', count:this.tabCount.Pending ? this.tabCount.Pending : 0},
    { name: 'Approved', label: 'Approved', icon: 'ri-check-fill', count:this.tabCount.Approved ? this.tabCount.Approved : 0},
    { name: 'Reject', label: 'Reject', icon: 'ri-close-fill', count:this.tabCount.Reject ? this.tabCount.Reject :0},
  ];
  
  
  constructor(
    private toastr: ToastrServices,
    public dialog:MatDialog,
    public api:ApiService,
    public alert : SweetAlertService,
    private dateService: DateService,
    public date:DateService, 
    private router: Router,
    public route:ActivatedRoute,
    private highlightService:HighlightService,
    public comanFuncation: ComanFuncationService,
    public maskService:MaskService,
    private moduleService: ModuleService
  ) {
    
  }
  
  ngOnChanges(){
    this.redeemType = this.redeem_type;
    if(this.redeemType){
      this.getList();   
    }
  }
  
  ngOnInit() {  
    const subModule = this.moduleService.getSubModuleByName('IRP', 'Redeem Request');
    // const form = this.moduleService.getFormById('IRP', 'Redeem Request', this.FORMID.ID['QRCodeformId']);
    // const tableId = this.moduleService.getTableById('IRP', 'Redeem Request', this.FORMID.ID['QRCodeTableId']);
    if (subModule) {
      this.submoduleId = subModule;
    }
    // if (form) {
    //   this.moduleFormId = form.form_id;
    // }
    // if (tableId) {
    //   this.tableId = tableId.table_id;
    // }
    this.route.paramMap.subscribe(params => {
      if(params.get('type')){
        this.redeemType = params.get('type');
        this.getList();   
      }
    });
  }
  
  
  isHighlighted(id: string): boolean {
    return this.highlightedId === id;
  }
  
  setHighLight(rowId: string) {
    this.comanFuncation.setHighLight(this.pageKey, rowId, 'none', this.filter, this.pagination.cur_page ? this.pagination.cur_page : 1)
  }
  
  onRefresh()
  {
    this.filter = {};
    // this.getQrList();
    this.getList();
  }
  
  onTabChange(tab: string) {
    this.activeTab = tab;
    this.getList();
  }
  
  
  getColumns(): any[] {
    if (this.redeemType === 'Gift' || this.redeemType === 'Voucher' ){
      return [ 
        { label: "S.no.", field: "S.no." },
        { label: "Date", field: "Date" },
        { label: "Req. ID	", field: "Req. ID	" },
        { label: "Name", field: "Name"},
        { label: "Profession Type", field: "Profession Type"},
        { label: "Mobile", field: "Mobile"},
        { label: "State", field: "State"},
        { label: "District", field: "District"},
        { label: "Gift Title", field: "Gift Title"},
        { label: "Redeem Point", field: "Redeem Point", table_class:"text-right" },
        { label: "Redeem Status", field: "Redeem Status"},
        ...((this.activeTab === 'Approved')
        ? [
          // { label: "Gift Status", field: "Gift Status" }
            ...(this.redeemType === 'Gift' ? [
            { label: "Gift Status", field: "Gift Status" }, 
            { label: "Shipping Address", field: "Shipping Address" },
            { label: "Shipping Type", field: "Shipping Type" },
            { label: "Courier By", field: "Courier By" },
            { label: "Tracking Number", field: "Tracking Number" },
            { label: "Remark", field: "Remark" }] : [
              { label: "Voucher Status", field: "Voucher Status" },
              { label: "Voucher Number", field: "Voucher Number" }
            ])]
            : (this.activeTab === 'Reject') ? [{ label: "Reason", field: "Reason" }]: ''),
            ...((this.activeTab != 'Pending')
            ? [{ label: "Action By", field: "Action By"}, { label: "Action Date", field: "Action Date"}]: ''),
          ];
        }
        else{
          return [ 
            { label: "S.no.", field: "S.no." },
            { label: "Date", field: "Date" },
            { label: "Req. ID	", field: "Req. ID	" },
            { label: "Name", field: "Name"},
            { label: "Profession Type", field: "Profession Type"},
            { label: "Mobile", field: "Mobile"},
            { label: "State", field: "State"},
            { label: "District", field: "District"},
            { label: "Gift Title", field: "Gift Title"},
            { label: "Beneficiary Name", field: "Beneficiary Name"},
            { label: "Bank Name", field: "Bank Name"},
            { label: "Account No.", field: "Account No."},
            { label: "IFSC Code", field: "IFSC Code"},
            { label: "Redeem Point", field: "Redeem Point", table_class:"text-right" },
            { label: "Point Value	", field: "Point Value", table_class:"text-right" },
            { label: "Redeem Amount", field: "Redeem Amount", table_class:"text-right" },
            { label: "Redeem Status", field: "Redeem Status"},
            ...((this.activeTab === 'Approved')
            ? [
              { label: "Transfer Status", field: "Transfer Status"},
              { label: "Mode", field: "Mode"},
              { label: "TXN No.", field: "TXN No."},
              { label: "TXN Date", field: "TXN Date"},
              { label: "TXN Remark", field: "TXN Remark"},]
              : (this.activeTab === 'Reject') ? [{ label: "Reason", field: "Reason" }]: ''),
              ...((this.activeTab != 'Pending')
              ? [{ label: "Action By", field: "Action By"}, { label: "Action Date", field: "Action Date"}]: ''),
            ];
          }
        }
        
        getList() {
          this.skLoading = true;
          if(this.filter.created_at){
            this.filter.created_at = this.filter.created_at ? this.dateService.formatToYYYYMMDD(new Date( this.filter.created_at)) : null;
          }
          if(this.filter.transaction_date){
            this.filter.transaction_date = this.filter.transaction_date ? this.dateService.formatToYYYYMMDD(new Date( this.filter.transaction_date)) : null;
          }
          this.api.post({'activeTab':this.activeTab, '_id':this._id, 'redeemType':this.redeemType, 'filters':this.filter, 'page': this.pagination.cur_page ?? 1}, 'redeem/read').subscribe(result => {
            if (result['statusCode'] === 200) {
              this.qrList = result['data']['redeem'];
              this.tabCount = result['data']['statusCounters'];
              this.pagination = result['pagination'];
              this.skLoading = false;
              this.mainTabs = [
                { name: 'Pending', label: 'Pending', icon: 'ri-time-fill', count:this.tabCount.Pending ? this.tabCount.Pending : 0},
                { name: 'Approved', label: 'Approved', icon: 'ri-check-fill', count:this.tabCount.Approved ? this.tabCount.Approved : 0},
                { name: 'Reject', label: 'Reject', icon: 'ri-close-fill', count:this.tabCount.Reject ? this.tabCount.Reject :0},
              ];
            }
            else{
              this.skLoading = false
            }
          });
        }
        
        // -------- Pagination//
        
        changeToPagination(btnType: string) {
          if (btnType == 'Previous') {
            if (this.pagination.prev && this.pagination.cur_page > 1) {
              this.pagination.cur_page--;  // Decrement the page number
              this.getList();
            }
          }
          else
          {
            if (this.pagination.next) {
              this.pagination.cur_page++;  // Increment the page number
              this.getList();
            }
          }
        }
        
        changeToPage(newPage: number) {
          this.pagination.cur_page = newPage;
          this.getList();
        }
        // --------//
        
        
        changeStatus(_id:string, status:string, status_type:string, redeem_type:string, data:any){
          if (redeem_type === 'Cash' && (status === 'Pending' || status === 'Approved')){
            if (!data.beneficiary_name && !data.bank_name && !data.account_no && !data.ifsc_code){
              this.toastr.error('Bank details are not completed', '', 'toast-top-right')
              return
            }
          }
          this.setHighLight(_id)
          
          const dialogRef = this.dialog.open(RedeemModalComponent, {
            
            width: '500px',
            data: {
              '_id': _id,
              'status':status,
              'status_type':status_type,
              'redeem_type':redeem_type,
            }
            
          });
          dialogRef.afterClosed().subscribe(result => {
            if(result === true){
              let highlight = this.highlightService.getHighlight(this.pageKey);
              if (highlight != undefined) {
                this.highlightedId = highlight.rowId;
                this.pagination.cur_page = highlight.pageIndex;
                this.filter = highlight.filters
                this.highlightService.clearHighlight(this.pageKey);
              }
              this.getList();
            }
          });
        }
        
        
        
        
        goToDetailPage(rowId:any)
        {
          this.router.navigate(['/apps/loyalty/qr-detail' , rowId]);
        }
        
      }
      
      