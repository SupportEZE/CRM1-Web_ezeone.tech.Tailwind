import { Component } from '@angular/core';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { ModuleService } from '../../../../../shared/services/module.service';
import { ActivatedRoute } from '@angular/router';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import { LogService } from '../../../../../core/services/log/log.service';
import { ApiService } from '../../../../../core/services/api/api.service';
import { DateService } from '../../../../../shared/services/date.service';
import { MatDialog } from '@angular/material/dialog';
import { ServiceInvoiceModalComponent } from '../service-invoice-modal/service-invoice-modal.component';
import { CURRENCY_SYMBOLS } from '../../../../../utility/constants';
import { ShowcodeCardComponent } from '../../../../../shared/components/showcode-card/showcode-card.component';

@Component({
    selector: 'app-service-invoice-detail',
    imports: [
        SharedModule,
        SpkReusableTablesComponent,
        ShowcodeCardComponent
    ],
    templateUrl: './service-invoice-detail.component.html',
})
export class ServiceInvoiceDetailComponent {
    CURRENCY_SYMBOLS = CURRENCY_SYMBOLS;
    subModule:any = {};
    submoduleId:any =0;
    DetailId:  any;
    invoiceDetail:any = {};
    skLoading:boolean = false;
    customerDetail: any = {};
    cartDetail : any = [];
    logList:any=[];
    
    
    constructor(
        public moduleService: ModuleService,
        public route:ActivatedRoute,
        public comanFuncation: ComanFuncationService,
        private logService:LogService,
        public api:ApiService,
        private dateService: DateService,
        public dialog: MatDialog
    ){
        
    }

    statusOptions = [
      {
        name:'Unpaid'
      },
      {
        name:'Paid'
      },
      {
        name:'Cancel'
      },
    ]
    
    invoiceColumns=[
        {label:"Product Name"},
        {label:"Qty", table_class : 'text-center'},
        {label:"Mrp", table_class : 'text-right'},
        {label:"Total Discount", table_class : 'text-right'},
        {label:"Net Amount", table_class : 'text-right'},
    ]
    
    ngOnInit(){
        const subModule = this.moduleService.getSubModuleByName('WCMS', 'Invoice');
        if (subModule) {
            this.submoduleId = subModule;
            this.subModule.sub_module_id = subModule.module_id;
            this.subModule.title = subModule.module_name;
            this.subModule.module_type = subModule.module_type;
            console.log(this.submoduleId, 'submodule');
            
        }
        this.route.paramMap.subscribe(params => {   
            this.DetailId = params.get('id');
            if(this.DetailId){
                this.getDetail();
            }
        });
    }
    
    openMainLogModal(row_id:string) {
        this.comanFuncation.listLogsModal(this.submoduleId.module_id, row_id, this.subModule.module_type).subscribe(result => {
            if(result === true){
                this.getDetail();
            }
        });
    }
    
    getDetail() {
        this.skLoading = true;
        this.api.post({_id: this.DetailId}, 'complaint-invoice/detail').subscribe(result => {
            if (result['statusCode']  ===  200) {
                this.skLoading = false;
                this.invoiceDetail = result['data'];
                this.cartDetail = result['data']['item'];
                this.customerDetail = result['data']['customer_details'];
                this.logService.getLogs(this.subModule.sub_module_id, (logs) => {
                    this.logList = logs;
                },this.DetailId ? this.DetailId : '',this.subModule.module_type);
                this.invoiceDetail = this.dateService.formatToDDMMYYYY(this.invoiceDetail);
            }
        });
    }
    
    updateQuotationStatus()
    {
        const dialogRef = this.dialog.open(ServiceInvoiceModalComponent, {
            width: '450px',
            data: {
                'lastPage':'invoice-detail',
                'serviceId':this.DetailId,
                'status':this.invoiceDetail.status,
                'subModule':this.subModule,
                'options':this.statusOptions,
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result === true){
                this.getDetail();
            }
        });
    }
    
}
