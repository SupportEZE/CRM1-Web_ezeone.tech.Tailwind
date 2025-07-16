import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalHeaderComponent } from '../../../../../shared/components/modal-header/modal-header.component';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { Validators } from 'ngx-editor';
import { ApiService } from '../../../../../core/services/api/api.service';
import { LogService } from '../../../../../core/services/log/log.service';
import { ModuleService } from '../../../../../shared/services/module.service';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { API_ENDPOINTS } from '../../../../../utility/api-endpoints';
import { FORMIDCONFIG } from '../../../../../../config/formId.config';
import { CommonApiService } from '../../../../../shared/services/common-api.service';
import { data } from '../../../../../shared/data/table_data/easy_table';
import { FormValidationService } from '../../../../../utility/form-validation';

@Component({
    selector: 'app-customer-discount-add',
    imports: [CommonModule, SharedModule, ReactiveFormsModule, MaterialModuleModule, ModalHeaderComponent],
    templateUrl: './customer-discount-add.component.html',
})
export class CustomerDiscountAddComponent {
    FORMID:any= FORMIDCONFIG;
    skLoading:boolean = false;
    pageType:any = 'add'
    activeTab:any = '';
    addForm!: FormGroup;
    formDataFields: any = {};
    originalData:any = {};
    subModule:any = {};
    moduleTableId:number =0;
    categoryModuleTableId:number =0;
    moduleFormId:number=0;
    categoryModuleFormId:number=0;
    tableHeader:any = [];
    
    constructor(@Inject(MAT_DIALOG_DATA) public modalData: any, private dialogRef: MatDialogRef<CustomerDiscountAddComponent>, public toastr:ToastrServices, private fb: FormBuilder, private moduleService: ModuleService, public api:ApiService, private logService: LogService, public CommonApiService: CommonApiService, private formValidation: FormValidationService){}
    
    ngOnInit() {
        this.pageType = this.modalData.formType;
        this.activeTab = this.modalData.activeTab;
        const form = this.moduleService.getFormById('Masters', 'Discount Master', this.FORMID.ID['DisMasterProductForm']);        
        const productTable = this.moduleService.getTableById('Masters', 'Discount Master', this.FORMID.ID['DisMasterProductTable']);
        
        const CategoryForm = this.moduleService.getFormById('Masters', 'Discount Master', this.FORMID.ID['DisMasterCategoryForm']);
        const categoryTable = this.moduleService.getTableById('Masters', 'Discount Master', this.FORMID.ID['DisMasterCategoryTable']);
        
        if (form) {
            this.moduleFormId = form.form_id;
        }
        
        if (CategoryForm) {
            this.categoryModuleFormId = CategoryForm.form_id;
        }
        
        if (productTable) {            
            this.moduleTableId = productTable.table_id;
        }
        
        if (categoryTable) {            
            this.categoryModuleTableId = categoryTable.table_id;
        }
        
        this.getHeaderConfigListing();
        
        const subModule = this.moduleService.getModuleByName('Customers');
        
        if (subModule) {
            this.subModule = subModule;
        }
        
        if(this.pageType === 'edit'){
            if (this.modalData?.formData?.customer_form_data === null) {
                this.originalData = { ...this.modalData.formData, ...this.modalData.formData.form_data };
            }
            else{
                this.originalData = { ...this.modalData.formData, ...this.modalData.formData.customer_form_data };
            }
        }
        
        this.addForm = this.fb.group({});
        // this.initForm();
    }
    
    initForm() {
        if (this.modalData?.formData?.customer_form_data === null) {
            if (this.modalData.formData.form_data === null) {
                this.formDataFields = {};
                
                this.tableHeader
                .filter((header:any) => header.is_show)
                .forEach((header:any) => {
                    if (header.name) {
                        this.formDataFields[header.name] = 0;
                    }
                });
            }
            else{
                this.formDataFields = this.modalData.formData.form_data;
            }
        }
        else
        {
            this.formDataFields = this.modalData.formData.customer_form_data;
        }
        
        Object.keys(this.formDataFields).forEach(key => {
            this.addForm.addControl(
                key,
                new FormControl(this.formDataFields[key])
            );
        });
    }
    
    getLabel(key: string): string {
        return key
        .replace(/_/g, ' ')             // Replace underscores with space
        .replace(/\w\S*/g, txt =>       // Capitalize each word
            txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
    }
    
    update()
    {
        const rawValues = this.addForm.value;
        const form_data: Record<string, number> = {};
        for (const key in rawValues) {
            if (rawValues.hasOwnProperty(key)) {
                form_data[key] = +rawValues[key]; // "+" coerces string to number
            }
        }
        this.formValidation.removeEmptyFields(form_data)
        this.api.disabled = true;
        const payload = {
            discount_type: this.modalData.activeTab,
            discount_id: this.modalData.formData._id,
            discount_name: this.modalData.activeTab === 'Product' ? this.modalData.formData.product_name : this.modalData.formData.category_name,
            customer_type_name: this.modalData.basicDetail.customer_type_name,
            customer_type_id: this.modalData.basicDetail.customer_type_id,
            customer_id: this.modalData.basicDetail._id,
            form_data: form_data
        };
        const isEditMode = this.pageType === 'edit';
        if (isEditMode) {
            const noChanges = this.logService.logActivityOnUpdate(
                isEditMode, 
                this.originalData, 
                form_data, 
                this.subModule.module_id, 
                this.subModule.title, 
                'update', 
                this.originalData._id || null,
                () => {},
                this.subModule.module_type
            );
            if (noChanges) {
                this.api.disabled = false;
                this.toastr.warning('No changes detected', '', 'toast-top-right')
                return ;
            }
        }
        
        this.api.post((payload), API_ENDPOINTS.CUSTOMER.CUSTOMER_SAVE_DIS).subscribe(result => {
            if(result['statusCode'] == 200){
                this.api.disabled = false;
                this.dialogRef.close(true);
                this.toastr.success(result['message'], '', 'toast-top-right');
            }
        });
    }
    
    objectKeys(obj: any): string[] {
        return obj ? Object.keys(obj) : [];
    }
    
    close() {
        this.dialogRef.close(); // Closes the dialog
    }
    
    
    getModuleConfigByTab(tab: 'Product' | 'Category') {
        return {
            formId: tab === 'Product' ? this.moduleFormId : this.categoryModuleFormId,
            tableId: tab === 'Product' ? this.moduleTableId : this.categoryModuleTableId,
        };
    }
    
    
    getHeaderConfigListing() {
        this.skLoading = true;
        const config = this.getModuleConfigByTab(this.activeTab as 'Product' | 'Category');
        
        this.CommonApiService.getHeaderConfigListing(config.tableId, config.formId).subscribe((result:any) => {
            this.skLoading = false;
            this.tableHeader = result['data']['table_data']['tableHead'];
            this.initForm();
        });
    }
    
}
