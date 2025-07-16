import { Component,Input,NgModule, ViewChild } from '@angular/core';
import { ModuleService } from '../../../../../shared/services/module.service';
import { ApiService } from '../../../../../core/services/api/api.service';
import { FORMIDCONFIG } from '../../../../../../config/formId.config';
import { SharedModule } from '../../../../../shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { ModalsComponent } from '../../../../../shared/components/modals/modals.component';
import { FormFieldTypes } from '../../../../../utility/constants';
import { FormValidationService } from '../../../../../utility/form-validation';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { UtilService } from '../../../../../utility/util.service';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { CommonModule } from '@angular/common';
import { ExpensePolicyAddComponent } from '../expense-policy-add/expense-policy-add.component';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import { CommonApiService } from '../../../../../shared/services/common-api.service';

@Component({
    selector: 'app-expense-policy-list',
    imports: [SharedModule,CommonModule,SpkReusableTablesComponent,FormsModule],
    templateUrl: './expense-policy-list.component.html',
})
export class ExpensePolicyListComponent {
    @ViewChild('reusableTable') reusableTable!: any;
    FORMID:any= FORMIDCONFIG;
    filter: any = {};
    sorting: any = {};
    skLoading:boolean = false
    moduleFormId:number=0;
    moduleTableId:number =0;
    subModule: any = {};
    originalFormFields: any[] = []; // Store API response separately
    @Input() formFields: any[] = [];
    readonly fieldTypes = FormFieldTypes;
    formIniatialized: boolean = false;
    myForm!: FormGroup;
    accessRight:any = {};
    
    constructor(public moduleService: ModuleService,public api:ApiService,public dialog: MatDialog,private formValidation: FormValidationService,private fb: FormBuilder,public util:UtilService, public comanFuncation: ComanFuncationService,public CommonApiService: CommonApiService){}
    
    ngOnInit() {
        const accessRight = this.moduleService.getAccessMap('Masters', 'Expense Policy');
        if (accessRight) {
            this.accessRight = accessRight;
        }
        const subModule = this.moduleService.getSubModuleByName('Masters', 'Expense Policy');
        const form = this.moduleService.getFormById('Masters', 'Expense Policy', this.FORMID.ID['ExpensePolicyForm']);
        const tableId = this.moduleService.getTableById('Masters', 'Expense Policy', this.FORMID.ID['ExpensePolicyTable']);
        
        if (subModule) {
            this.subModule = subModule;
        }
        if (form) {
            this.moduleFormId = form.form_id;
            this.getFormData();
        }
        if (tableId) {
            this.moduleTableId = tableId.table_id;
        }
        
        this.getHeaderConfigListing();
    }
    
    onRefresh()
    {
        this.filter = {};
        this.reusableTable.clearSearchInputs();
        this.getHeaderConfigListing()
    }
    
    //---------Expense Policy Listing----------//
    
    tableConfigData:any = {};
    visibleHeaders:any = [];
    getHeaderConfigListing() {
        this.CommonApiService.getHeaderConfigListing(this.moduleTableId, this.moduleFormId).subscribe((result: any) => {
            this.tableConfigData = result.data.table_data;
            const allHeaders = this.tableConfigData['tableHead'];
            
            // --------- For columns filter in listing//
            this.visibleHeaders = allHeaders.filter((header: any) => header.list_view_checked);
            this.getList();
            // ---------//
        });
    }
    
    expensePolicyData:any = [];
    listing:any = [];
    
    getList() {
        this.skLoading = true;
        this.api.post({filters: this.filter, form_id : this.moduleFormId}, 'expense/read-allowance-master').subscribe(result => {
            if (result['statusCode'] == '200') {
                this.skLoading = false;
                this.listing = result['data'];
            }
        });
    }
    
    handleSelectionChange(event: { category_name: string; selections: string[] }): void {
        const { category_name, selections } = event;
        this.filter[category_name] = selections;
        this.getList();
        
    }
    
    updateSearchFilter(event: {searchText: string; name: string }) {
        this.filter[event.name] = event.searchText;
        this.getList();
    }
    
    handleDateRangeChange(event: { [key: string]: { start: string; end: string } }) {
        this.filter = event;
        this.getList();
    }
    
    handleDateChange(event: { [key: string]: { selectedDate:string } }) {
        this.filter = event;
        this.getList();
    }    
    
    //---------ExpensePolicy Listing----------//
    
    getFormData(){
        this.skLoading = true;
        this.api.post({"form_id":this.moduleFormId, 'platform':'web'}, 'form-builder/read').subscribe(result => {
            if(result['statusCode'] == 200){
                if (result?.data?.form_data) {
                    this.originalFormFields = JSON.parse(JSON.stringify(result.data.form_data));
                }
                this.formFields = result['data']['form_data'];
                this.skLoading = false;
                this.formFields.forEach((feild:any) => {
                    this.util.createValidation(feild);
                });
                this.initializeForm();
                
            }
        });
    }
    
    initializeForm(){
        this.myForm = this.fb.group({});
        this.formFields.forEach(field => {
            field.control = this.fb.control('', this.formValidation.getValidators(field)); // Initialize using FormBuilder
            this.myForm.addControl(field.name, field.control);
        });
        this.formIniatialized = true;
    }
    
    openModal(event:any) {
        const dialogRef = this.dialog.open(ModalsComponent, {
            // width: '1024px',
            data: {
                'lastPage':'expense-policy-add',
                'form_Fields':this.originalFormFields,
                'moduleFormId':this.moduleFormId,
                "moduleId":this.subModule.sub_module_id,
                "moduleName":this.subModule.title,
                "module_type":this.subModule.module_type
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result === true){
                this.getHeaderConfigListing();
            }
        });
    }
    
    openHeaderSettingModal() {
        // this.getHeaderConfigListing();
        const dialogRef = this.dialog.open(ModalsComponent, {
            width: '450px',
            panelClass: 'mat-right-modal',
            position: { right: '0px' },
            data: {
                'lastPage': 'header-config',
                'moduleFormId':this.moduleFormId,
                'moduleTableId':this.moduleTableId,
                'moduleName':this.subModule.title,
                "tableConfigData": this.tableConfigData,
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result === true){
                this.getHeaderConfigListing();
            }
        });
    }
        
    updateExpensePolicy(row?: any) {
        const dialogRef = this.dialog.open(ExpensePolicyAddComponent, {
            width: '768px',
            data: {
                'lastPage':'expense-policy-add',
                'formType': row ? 'edit' : 'create',
                'formData': row || {}
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result === true){
                this.getHeaderConfigListing();
            }
        });
    }
    
    // ***** List Logs Modal Start *****//
    openMainLogModal(row_id:string) {
        this.comanFuncation.listLogsModal(this.subModule.sub_module_id, row_id, this.subModule.module_type).subscribe(result => {
        });
    }
    // ***** List Logs Modal End *****//
    
}
