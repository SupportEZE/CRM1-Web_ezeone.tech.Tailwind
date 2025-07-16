import { Component } from '@angular/core';
import { LogsComponent } from '../../../../../shared/components/logs/logs.component';
import { SpkGalleryComponent } from '../../../../../../@spk/spk-reusable-plugins/spk-gallery/spk-gallery.component';
import { CommonModule } from '@angular/common';
import { GalleryModule, Image } from '@ks89/angular-modal-gallery';
import { Lightbox, LightboxModule } from 'ng-gallery/lightbox';
import { ShowcodeCardComponent } from '../../../../../shared/components/showcode-card/showcode-card.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SharedModule } from '../../../../../shared/shared.module';
import { FORMIDCONFIG } from '../../../../../../config/formId.config';
import { DateService } from '../../../../../shared/services/date.service';
import { MatDialog } from '@angular/material/dialog';
import { LogService } from '../../../../../core/services/log/log.service';
import { ModuleService } from '../../../../../shared/services/module.service';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../../../core/services/api/api.service';
import { SweetAlertService } from '../../../../../core/services/alert/sweet-alert.service';
import { StatusChangeModalComponent } from '../../../../../shared/components/status-change-modal/status-change-modal.component';
import Swal from 'sweetalert2';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { SpkProductCardComponent } from '../../../../../../@spk/reusable-apps/spk-product-card/spk-product-card.component';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import { CURRENCY_SYMBOLS } from '../../../../../utility/constants';
import { ExpenseModalComponent } from '../expense-modal/expense-modal.component';

@Component({
    selector: 'app-expense-detail',
    imports: [SharedModule, RouterModule, ShowcodeCardComponent, LightboxModule, GalleryModule, CommonModule, LogsComponent, SpkReusableTablesComponent,SpkProductCardComponent],
    templateUrl: './expense-detail.component.html',
})
export class ExpenseDetailComponent {
    CURRENCY_SYMBOLS = CURRENCY_SYMBOLS;
    FORMID:any= FORMIDCONFIG;
    logList:any=[];
    Detail: any;
    subExpenseDetail:any=[];
    formattedKeysFormData: { [key: string]: any } = {};
    formattedKeysRecentActivities: { [key: string]: any } = {};
    expenseDetailFormData:any;
    skLoading : boolean = false;
    subModule:any = {}
    accessRight:any = {};
    constructor(
        public lightbox: Lightbox,
        private router: Router,
        public alert:SweetAlertService,
        public route: ActivatedRoute,
        public api:ApiService, 
        private toastr: ToastrService,
        private moduleService: ModuleService, 
        private logService:LogService,
        public dialog:MatDialog,
        private dateService: DateService,
        private comanFuncation:ComanFuncationService
    ) {}
    
    expenseId: any;
    ngOnInit() {
        const accessRight = this.moduleService.getAccessMap('SFA', 'Expense');
        if (accessRight) {
            this.accessRight = accessRight;
        }
        const subModule = this.moduleService.getSubModuleByName('SFA', 'Expense');
        if (subModule) {
            this.subModule = subModule;
        }
        
        this.route.paramMap.subscribe(params => {
            this.expenseId = params.get('id');
            if(this.expenseId){
                this.getexpenseDetail();
            }
        });
    }
    
    subExpenseColumns=[
        { label: 'Expense Date'},
        { label: 'Expense Title'},
        { label: 'Expense Amount', table_class: 'text-right'},
        { label: 'Description'},
    ]
    
    getexpenseDetail() {
        this.skLoading = true;
        this.api.post({'_id': this.expenseId}, 'expense/detail').subscribe(result => {
            if (result['statusCode']  ===  200) {
                this.skLoading = false
                this.Detail = result['data'];
                this.subExpenseDetail = result['data']['sub_expense'];
                this.expenseDetailFormData = result['data']['form_data'];
                this.formattedKeysFormData = this.formatAndPrintFormData(this.expenseDetailFormData);
                this.logService.getLogs(this.subModule.module_id, (logs) => {
                    this.logList = logs;
                },this.expenseId ? this.expenseId : '',this.subModule.module_type);
            }
        });
    }
    
    delete(id: string, api: string, label: string) {
        this.comanFuncation.delete(id, this.subModule, label, api, 'single_action', this.expenseId).subscribe((result: boolean) => {
            if (result === true) {
                this.getexpenseDetail();
            }
        });
    }
    
    formatAndPrintFormData(form: any) {
        const formattedObject: { [key: string]: any } = {};
        for (let key in form) {
            if (form.hasOwnProperty(key)) {
                const formattedKey = key
                .split('_') 
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' '); 
                formattedObject[formattedKey] = form[key]; 
            }
        }
        return formattedObject;
    }
    
    
    onDeleteImage(data: any) {
        this.api.disabled = true;
        this.alert.confirm("Are you sure you want to delete this?", "Once deleted, this item cannot be restored.", "Delete it!")
        .then(result => {
            if (result.isConfirmed) {
                this.api.patch({'_id': this.expenseId , 'file_id' : data.file_id, 'file_path':data.filepath}, 'expense/delete-file').subscribe(result => {
                    if (result['statusCode']  ===  200) {
                        this.api.disabled = false;
                        Swal.fire('Deleted!', result.message, 'success');
                        this.logService.logActivityOnDelete(this.subModule.module_id, this.subModule.module_name, 'delete', data.file_id);
                        this.getexpenseDetail();
                    }
                });
            }
        });
    }
    
    updateStatus()
    {
        const dialogRef = this.dialog.open(ExpenseModalComponent, {
            width: '450px',
            data: {
                'lastPage':'expense-status-modal',
                'expenseId':this.expenseId,
                'status':this.Detail.status,
                'approved_amount':this.Detail.approved_amount,
                'reason':this.Detail.reason,
                'claim_amount':this.Detail.claim_amount,
                'subModule':this.subModule,
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result === true){
                this.getexpenseDetail();
            }
        });
    }
    
    addExpenseModal(){
        const dialogRef = this.dialog.open(ExpenseModalComponent, {
            width: '800px',
            data: {
                'lastPage':'expense-modal',
                'expenseId':this.expenseId,
                'status':this.Detail.status,
                'expenseDetail':this.Detail,
                'subModule':this.subModule,
                'sub_expense': this.Detail.sub_expense
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result === true){
                this.getexpenseDetail();
            }
        });
        
    }
    
    // delete funcation start //
    deleteSubExpense(id: string, api: string, label: string) {
        this.comanFuncation.delete(id, this.subModule, label, api, 'single_action', this.expenseId).subscribe((result: boolean) => {
            if (result === true) {
                this.getexpenseDetail();
            }
        });
    }
    // delete funcation end
    
}
