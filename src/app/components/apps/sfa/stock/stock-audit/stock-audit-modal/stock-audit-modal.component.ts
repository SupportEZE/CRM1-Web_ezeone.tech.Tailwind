import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../../../../../shared/shared.module';
import { ShowcodeCardComponent } from '../../../../../../shared/components/showcode-card/showcode-card.component';
import { NameUtilsService } from '../../../../../../utility/name-utils';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalHeaderComponent } from '../../../../../../shared/components/modal-header/modal-header.component';
import { MaterialModuleModule } from '../../../../../../material-module/material-module.module';
import { CommonApiService } from '../../../../../../shared/services/common-api.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpkNgSelectComponent } from '../../../../../../../@spk/spk-ng-select/spk-ng-select.component';
import { SpkInputComponent } from '../../../../../../../@spk/spk-input/spk-input.component';
import { ApiService } from '../../../../../../core/services/api/api.service';
import { ToastrServices } from '../../../../../../shared/services/toastr.service ';
import { FormValidationService } from '../../../../../../utility/form-validation';
import { LOGIN_TYPES } from '../../../../../../utility/constants';
import { SpkReusableTablesComponent } from '../../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';

@Component({
    selector: 'app-stock-audit-modal',
    imports: [CommonModule, SharedModule, ModalHeaderComponent,MaterialModuleModule,FormsModule,ReactiveFormsModule,SpkInputComponent, SpkNgSelectComponent, SpkReusableTablesComponent],
    templateUrl: './stock-audit-modal.component.html',
})
export class StockAuditModalComponent {
    stockAuditForm: FormGroup = new FormGroup({});
    productForm: FormGroup = new FormGroup({});
    skLoading:boolean = false
    productData:any = [];
    filter: any = {};
    filteredData:any = [];
    
    constructor(@Inject(MAT_DIALOG_DATA) public modalData: any, private dialogRef: MatDialogRef<StockAuditModalComponent>,public nameUtils: NameUtilsService,public CommonApiService: CommonApiService,public api: ApiService,private fb: FormBuilder,private toastr: ToastrServices,private formValidation: FormValidationService){}
    
    ngOnInit() {
        if (this.modalData.formType === 'add') {
            this.CommonApiService.getCustomerCategorySubType([LOGIN_TYPES.PRIMARY, LOGIN_TYPES.SUB_PRIMARY, LOGIN_TYPES.SECONDARY]);
            this.CommonApiService.getProduct();
        }
        else{
            this.filteredData = [...this.modalData.formData];
        }
        
        this.stockAuditForm = this.fb.group({
            customer_type_id: ['', Validators.required],
            customer_type_name: ['', Validators.required],
            customer_id: ['', Validators.required],
            customer_name: ['', Validators.required],
        });
        
        this.productForm = this.fb.group({
            product_id: ['', Validators.required],
            product_name: ['', Validators.required],
            stock: ['', Validators.required],
            uom: ['', Validators.required],
        });
    }
    
    onCustomerCategoryChange(value: any) {
        const selectedValue = this.CommonApiService.customerCategorySubType.find((item: any) => item.value === value);
        if (selectedValue) {
            this.stockAuditForm.patchValue({ customer_type_name: selectedValue.label });
        }
        this.CommonApiService.getCustomerData(this.stockAuditForm.value.customer_type_id);
    }
    
    onCustomerChange(value: any) {
        const selectedValue = this.CommonApiService.customerData.find((item: any) => item.value === value);
        if (selectedValue) {
            this.stockAuditForm.patchValue({ customer_name: selectedValue.label });
        }
    }
    
    onProductChange(value: any) {
        const selectedValue = this.CommonApiService.productList.find((item: any) => item.value === value);
        if (selectedValue) {
            this.productForm.patchValue({ product_name: selectedValue.label });
        }
    }
    
    private lastSearchTerm: string = '';
    onSearch(search: string, type:any) {
        const trimmedSearch = search?.trim() || '';
        if (trimmedSearch === this.lastSearchTerm) {
            return;
        }
        this.lastSearchTerm = trimmedSearch;
        
        if(type === 'customer'){
            this.CommonApiService.getCustomerData(this.stockAuditForm.value.customer_type_id, '', search)
        }
        if (type === 'product') {
            this.CommonApiService.getProduct(search)
        }
    }
    
    addToList() {
        if (this.productForm.invalid) {
            this.productForm.markAllAsTouched();
            return;
        }
        const newItem = this.productForm.value;
        newItem.stock = Number(newItem.stock);
        const isDuplicate = this.productData.some((item:any) => item.product_id === newItem.product_id && item.uom === newItem.uom);
        
        if (isDuplicate) {
            this.toastr.error('This product is already added', '', 'toast-top-right');
            return;
        }
        
        this.productData.push(this.productForm.value);
        this.productForm.reset();
    }
    
    deleteRow(index: number) {
        this.productData.splice(index, 1);
    }
    
    onSubmit() {
        if (this.stockAuditForm.invalid) {
            this.stockAuditForm.markAllAsTouched();
            return;
        }
        
        if (this.productData.length === 0) {
            this.toastr.error('Please add at least one product.', '', 'toast-top-right');
            return;
        }
        
        if (this.stockAuditForm.valid) {
            const formValue = {
                ...this.stockAuditForm.value,                
                audit_report: this.productData,
            };
            
            this.api.disabled = true;
            this.api.post(formValue, 'stock/create-stock-audit').subscribe(result => {
                if (result['statusCode'] === 200) {
                    this.api.disabled = false;
                    this.toastr.success(result['message'], '', 'toast-top-right');
                    this.dialogRef.close(true)
                }                
            });
        }
        else {
            this.toastr.error('Form Is Invalid', '', 'toast-top-right')
            this.formValidation.markFormGroupTouched(this.stockAuditForm);
        }
    }
    
    close() {
        this.dialogRef.close(); // Closes the dialog
    }
    
    onStaticSearch() {
        const searchTerm = this.filter.product_name?.toLowerCase() || '';
        
        this.filteredData = this.modalData.formData.filter((item: any) =>
            item.product_name?.toLowerCase().includes(searchTerm)
    );
}


headerColumn=[
    {label:"Product", table_class :""},
    {label:"Stock", table_class :"text-center"},
    {label:"UOM", table_class :"text-center"},
]

uomList = [
    {
        label : 'Box',
        value : 'Box',
    },
    {
        label : 'Pcs',
        value : 'Pcs',
    },
]
}
