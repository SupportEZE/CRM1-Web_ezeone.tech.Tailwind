import { Component } from '@angular/core';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { ModuleService } from '../../../../../shared/services/module.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../../core/services/api/api.service';
import { FORMIDCONFIG } from '../../../../../../config/formId.config';
import { CURRENCY_SYMBOLS } from '../../../../../utility/constants';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { HttpClient } from '@angular/common/http';
import { DateService } from '../../../../../shared/services/date.service';
import { StatusChangeModalComponent } from '../../../../../shared/components/status-change-modal/status-change-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { ShowcodeCardComponent } from '../../../../../shared/components/showcode-card/showcode-card.component';
import { LogService } from '../../../../../core/services/log/log.service';

@Component({
  selector: 'app-quotation-detail',
  imports: [
    MaterialModuleModule,
    SharedModule,
    SpkReusableTablesComponent,
    NgxEditorModule,
    ShowcodeCardComponent
  ],
  templateUrl: './quotation-detail.component.html',
})

export class QuotationDetailComponent {
  CURRENCY_SYMBOLS = CURRENCY_SYMBOLS;
  submodule:any;
  FORMID:any= FORMIDCONFIG;
  skLoading:boolean = false;
  DetailId:  any;
  quotationDetail:any = {};
  customerDetail: any = {};
  editor!: Editor;
  cartDetail : any = [];
  subModule:any = {};
  submoduleId:any =0;
  logList:any=[];
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    // ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  constructor
  (
    private toastr: ToastrServices, 
    public api:ApiService,
    public route:ActivatedRoute,
    public moduleService: ModuleService,
    private router: Router,
    private http: HttpClient,
    private dateService: DateService,
    public dialog: MatDialog,
    public comanFuncation: ComanFuncationService,
    private logService:LogService
  ) {}


  ngOnInit(){
    const subModule = this.moduleService.getSubModuleByName('SFA', 'Quotation');
    if (subModule) {
        this.submoduleId = subModule;
        this.subModule.sub_module_id = subModule.module_id;
        this.subModule.title = subModule.module_name;
        this.subModule.module_type = subModule.module_type;
    }
    this.route.paramMap.subscribe(params => {   
        this.DetailId = params.get('id');
        if(this.DetailId){
            this.getDetail();
        }
    });
    this.editor = new Editor();
  }

  quotationColumns=[
    {label:"S.No", table_class :"text-center"},
    {label:"Product Details",table_class :""},
    {label:"Price Per Unit",table_class :"text-right"},
    {label:"Quantity",table_class :"text-center"},
    {label:"Discount",table_class :"text-right"},
    {label:"Sub Total",table_class :"text-right"},
    {label:"Gst",table_class :"text-right"},
    {label:"Net Amount",table_class :"text-right"},
  ]

  getDetail() {
    this.skLoading = true;
    this.api.post({_id: this.DetailId}, 'quotation/detail').subscribe(result => {
        if (result['statusCode']  ===  200) {
            this.skLoading = false;
            this.quotationDetail = result['data'];
            this.cartDetail = result['data']['cart_item'];
            this.customerDetail = result['data']['customer_details'];
            this.logService.getLogs(this.subModule.sub_module_id, (logs) => {
            this.logList = logs;
            },this.DetailId ? this.DetailId : '',this.subModule.module_type);
            this.quotationDetail = this.dateService.formatToDDMMYYYY(this.quotationDetail);
        }
    });
  }

  editQuotationItem() {
    this.router.navigate(['/apps/sfa/quotation-list/quotation-detail/' + this.DetailId +'/edit']);
  }  

  deleteQuotation() {
    this.cartDetail.splice(1);
    this.toastr.success('Quotation removed from the list.', '', 'toast-top-right');
  }

  exportQuotationPdf() {
    this.skLoading = true;
    this.api.post({_id: this.DetailId}, 'quotation/export-pdf').subscribe(result => {
      this.skLoading = false;
      if (result['statusCode'] === 200) {
        window.open(result['data']['signedUrl'], '_blank');
      } else {
      }
    });
  }

    updateQuotationStatus()
    {
      const dialogRef = this.dialog.open(StatusChangeModalComponent, {
        width: '450px',
        data: {
          'lastPage':'quotation-detail',
          'quotationId':this.DetailId,
          'status':this.quotationDetail.status,
          'subModule':this.subModule,
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result === true){
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
  
  

}
