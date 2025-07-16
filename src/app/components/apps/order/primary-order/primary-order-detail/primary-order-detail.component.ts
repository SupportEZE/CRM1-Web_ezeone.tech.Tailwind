import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { ShowcodeCardComponent } from '../../../../../shared/components/showcode-card/showcode-card.component';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { ModuleService } from '../../../../../shared/services/module.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../../core/services/api/api.service';
import { FORMIDCONFIG } from '../../../../../../config/formId.config';
import { CURRENCY_SYMBOLS } from '../../../../../utility/constants';
import { StatusChangeModalComponent } from '../../../../../shared/components/status-change-modal/status-change-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { LogService } from '../../../../../core/services/log/log.service';
import { SweetAlertService } from '../../../../../core/services/alert/sweet-alert.service';
import Swal from 'sweetalert2';
import { DispatchModalComponent } from '../../../wms/dispatch/dispatch-modal/dispatch-modal.component';

@Component({
  selector: 'app-primary-order-detail',
  imports: [SharedModule,GalleryModule, ShowcodeCardComponent,CommonModule,MaterialModuleModule,SpkReusableTablesComponent],
  templateUrl: './primary-order-detail.component.html',
})
export class PrimaryOrderDetailComponent {
  filter:any = {};
  submodule:any;
  orderId:  any;
  orderDetail:any = {};
  customerDetail:any= {};
  contactPersonDetail:any={};
  orderStatusList:any= [];
  FORMID:any= FORMIDCONFIG;
  skLoading:boolean = false;
  CURRENCY_SYMBOLS = CURRENCY_SYMBOLS;
  logList:any =[]
  accessRight:any = {};
  
  constructor(
    public api:ApiService,
    public route:ActivatedRoute,
    public moduleService: ModuleService,
    public dialog:MatDialog,
    private logService : LogService,
    public alert : SweetAlertService,
  ) {}
  
  
  ngOnInit() {
    const accessRight = this.moduleService.getAccessMap('SFA', 'Order', 'Primary Order');
    if (accessRight) {
      this.accessRight = accessRight;
    }
    
    const subSubModule = this.moduleService.getSubSubModuleByName('SFA', 'Order', 'Primary Order');
    if (subSubModule) {
      this.submodule = subSubModule;
    }
    this.route.paramMap.subscribe(params => {
      this.orderId = params.get('id');
      if(this.orderId){
        this.getDetail();
      }
    });
  }
  
  getDetail() {
    this.skLoading = true;
    this.api.post({_id: this.orderId}, 'order/primary-order-detail').subscribe(result => {
      if (result['statusCode']  ===  200) {
        this.skLoading = false;
        this.orderDetail = result ?.data ?? {};
        this.customerDetail = result?.data?.customer_info ?? {};
        this.contactPersonDetail = result?.data?.contact_person_info ?? {};
        this.orderStatusList = result?.data?.order_tracking_status ?? [];;
        this.logService.getLogs(this.submodule.module_id, (logs) => {
          this.logList = logs;
        },this.orderId ? this.orderId : '' , this.submodule.module_type);
      }
    });
  }
  
  addNewItem(type: any){
    const dialogRef = this.dialog.open(StatusChangeModalComponent, {
      width: '800px',
      data: {
        'type' : type,
        'lastPage':'primary-order-detail',
        'DetailId':this.orderId,
        'status':this.orderDetail.status,
        'subModule':this.submodule,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result === true){
        this.getDetail();
      }
    });  
  }
  
  updateOrderStatus(type: any){
    const dialogRef = this.dialog.open(StatusChangeModalComponent, {
      width: '450px',
      data: {
        'type' : type,
        'lastPage':'primary-order-detail',
        '_id':this.orderId,
        'status':this.orderDetail.status,
        'subModule':this.submodule,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result === true){
        this.getDetail();
      }
    });  
  }

  dispatchPlan() {
    const dialogRef = this.dialog.open(DispatchModalComponent, {
      width: '1024px',
      data: {
        'lastPage': 'primary-order-detail',
        '_id': this.orderId,
        'status': this.orderDetail.status,
        'item': this.orderDetail?.item ?? [],
        'subModule': this.submodule,
        "orderDetail": this.orderDetail
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.getDetail();
      }
    });
  }
  
  
  
  cartColumn=[
    {label:"Sr. No.",table_class:"Sr. No."},
    {label:"Product Detail",},
    {label:"Price", table_class:"text-right"},
    {label:"Discount", table_class:"text-right"},
    {label:"Unit Price", table_class:"text-right"},
    {label:"Qty", table_class:"text-center"},
    {label:"UOM", table_class:"text-center"},
    {label:"Sub-Total", table_class:"text-right"},
    {label:"GST", table_class:"text-right"},
    {label:"Net Amount", table_class:"text-right"},
  ]
  
  onDeleteRow(rowId: any) {
    this.alert.confirm("Are you sure?")
    .then((result) => {
      if (result.isConfirmed) {
        this.api.patch({ _id: rowId, is_delete: 1}, 'order/delete-primary-order-item').subscribe(result => {
          if (result['statusCode']  ===  200) {
            this.logService.logActivityOnDelete(this.submodule.module_id, this.submodule.title, 'delete', this.orderDetail._id , 'Item Delete' , this.submodule.module_type);
            Swal.fire('Deleted!', result.message, 'success');
            this.getDetail();
          }                        
        });
      }
    });
  }
  
  formatMessage(message: string): string {
    if (!message) return '';
    return message
    .replace('Hold', '<span class="text-info font-semibold">Hold</span>')
    .replace('Approved', '<span class="text-success font-semibold">Approved</span>')
    .replace('Placed', '<span class="text-primary font-semibold">Placed</span>')
    .replace('Reject', '<span class="text-danger font-semibold">Reject</span>');
  }
  
  exportOrderPdf() {
    this.skLoading = true;
    this.api.post({_id: this.orderId}, 'order/export-pdf').subscribe(result => {
      this.skLoading = false;
      if (result['statusCode'] === 200) {
        window.open(result['data']['signedUrl'], '_blank');
      } else {
      }
    });
  }
  
}
