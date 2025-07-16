
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { ApiService } from '../../../../../core/services/api/api.service';
import { CURRENCY_SYMBOLS } from '../../../../../utility/constants';
import { CommonApiService } from '../../../../../shared/services/common-api.service';
import { ModuleService } from '../../../../../shared/services/module.service';
import { UploadFileService } from '../../../../../shared/services/upload.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { FormValidationService } from '../../../../../utility/form-validation';
import { SpkNgSelectComponent } from '../../../../../../@spk/spk-ng-select/spk-ng-select.component';
import { CommonModule } from '@angular/common';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { SpkInputComponent } from '../../../../../../@spk/spk-input/spk-input.component';

@Component({
    selector: 'app-service-invoice-add',
    imports: [SharedModule, CommonModule, FormsModule, ReactiveFormsModule,RouterModule, SpkReusableTablesComponent, SpkNgSelectComponent, MaterialModuleModule, SpkInputComponent],
    templateUrl: './service-invoice-add.component.html',
})
export class ServiceInvoiceAddComponent {
    pageType:any = 'add'
    CUR = CURRENCY_SYMBOLS;
    quotationList: any[] = [];
    selectedItems: { label: string, value: string, qty: number, product_code: string, mrp: number, total_price:number }[] = [];
    submodule: any;
    product: any = [];
    stockForm!: FormGroup;
    skLoading:boolean = false;
    today= new Date();
    complaintId:any;
    serviceEngineerId:any;
    billingFromAddress:any;
    billingFromMobile:any;
    billingFromCustomer:any;
    constructor(
        private toastr: ToastrServices,
        public api: ApiService, 
        private formValidation: FormValidationService,
        private fb: FormBuilder,
        private router: Router, 
        private route: ActivatedRoute, 
        public commonApi: CommonApiService, 
        public uploadService: UploadFileService,
        private moduleService: ModuleService,
        public CommonApiService: CommonApiService,
        
    ){}
    
    Service_Type=[
        {label:"Complaint",value:"Complaint"},
        {label:"Installation",value:"Installation"},
    ]
    
    service_Status=[
        {label:"Paid",value:"Paid"},
        {label:"Unpaid",value:"Unpaid"},
        {label:"Cancel",value:"Cancel"},
    ]
    
    ngOnInit() {
        const subModule = this.moduleService.getSubModuleByName('WCMS', 'Invoice');
        if (subModule) {
            this.submodule = subModule;
        } 
        this.stockForm = this.fb.group({
            customer_name: ['', Validators.required],
            customer_address: ['', Validators.required],
            customer_mobile: ['', Validators.required],
            // billing_to_customer: ['', Validators.required],
            // billing_to_address: ['', Validators.required],
            // billing_from_email: ['', Validators.required],
            // billing_to_email: ['', Validators.required],
            // billing_to_phone: ['', Validators.required],
            invoice_date: ['', Validators.required],
            product_id: ['', Validators.required],
            // pincode: ['', Validators.required],
            status: ['', Validators.required],
            title: ['', Validators.required],
            qty: ['', Validators.required],
            payment_mode: ['UPI / Online'],
            service_type: ['Complaint'],
            transaction_number: [''],
            invoice_note: [''],
            complaint_id: [''],
            total_amount: [0],
            total_items: [0],
            total_qty: [0],
            item: [[]],
        });
        this.route.queryParamMap.subscribe(params => {
            this.complaintId = params.get('complaint_id');
            this.serviceEngineerId = params.get('service_engineer_id');
            this.billingFromCustomer = params.get('customer_name');
            this.billingFromMobile = params.get('customer_mobile');
            this.billingFromAddress = params.get('address');
            this.serviceEngineerId = params.get('service_engineer_id');
            this.serviceEngineerId = params.get('service_engineer_id');
            console.log(params);
            console.log(this.billingFromCustomer, 'customer console');
            console.log(this.billingFromMobile, 'customer mobile');
            console.log(this.billingFromAddress, 'customer address');
            
            if (this.complaintId) {
                this.stockForm.patchValue({ complaint_id: this.complaintId });
            }
            if (this.serviceEngineerId) {
                this.stockForm.patchValue({ service_engineer_id: this.serviceEngineerId });
                this.getProduct(); // If needed
            }
            console.log('Complaint ID from query:', this.serviceEngineerId);
            console.log('Complaint ID from query:', this.complaintId);
        });
        this.stockForm.patchValue({
            complaint_id: this.complaintId || '',
            customer_name: this.billingFromCustomer || '',
            customer_mobile: this.billingFromMobile || '',
            customer_address: this.billingFromAddress || ''
        });        
        this.getProduct();
    }
    
    getProduct(search?: any) {
        this.api.post({ '_id': this.serviceEngineerId,  filters: { 'search': search } }, 'spare-part/read-dropdown').subscribe(result => {
            if (result['statusCode'] == 200) {
                this.product = result['data']
            }
        });
    }
    
    onSearch(search: string, type: any) {
        if (type === 'product') {
            this.getProduct(search)
        }
    }
    
    addToList() {
        const product = this.stockForm.get('product_id')?.value;
        const qty = +this.stockForm.get('qty')?.value;
        
        if (!product) {
            this.toastr.error('Please select a product.', '', 'toast-top-right');
            return;
        }
        
        if (!qty || qty <= 0) {
            this.toastr.error('Please enter a valid quantity greater than 0.', '', 'toast-top-right');
            return;
        }
        
        const selectedOption = this.product.find((row: any) => row.value === product);
        if (!selectedOption) {
            this.toastr.error('Selected product not found.', '', 'toast-top-right');
            return;
        }
        
        const mrp = isNaN(+selectedOption.mrp) ? 0 : +selectedOption.mrp;
        const total_price = qty * mrp;
        
        const existing = this.selectedItems.find(p => p.value === product);
        const itemArray = this.stockForm.get('item') as FormArray;
        
        if (existing) {
            // Update displayed item
            existing.qty += qty;
            existing.total_price = existing.qty * existing.mrp;
            
            // Update form item[]
            const index = this.selectedItems.findIndex(p => p.value === product);
            if (itemArray.at(index)) {
                const control = itemArray.at(index) as FormGroup;
                control.patchValue({ qty: existing.qty });
            }
        } else {
            // Add new item to display list
            this.selectedItems.push({
                label: selectedOption.label,
                value: selectedOption.value,
                product_code: selectedOption.product_code,
                qty,
                mrp,
                total_price
            });
            
            // Add to form array
            itemArray.push(this.fb.group({
                product_id: [product],
                qty: [qty]
            }));
        }
        
        // Reset input fields
        this.stockForm.get('product_id')?.reset();
        this.stockForm.get('qty')?.reset();
        
        // Clear validators if items exist
        if (this.selectedItems.length > 0) {
            ['product_id', 'qty'].forEach(field => {
                this.stockForm.get(field)?.clearValidators();
                this.stockForm.get(field)?.updateValueAndValidity();
            });
        }
    }
    
    delete(index: number) {
        this.selectedItems.splice(index, 1);
        const itemArray = this.stockForm.get('item') as FormArray;
        itemArray.removeAt(index);
    }
    
    onSubmit() {
        if (this.stockForm.valid) {
            const item = this.selectedItems.map(item => ({
                product_id: item.value,
                product_name: item.label,
                product_code: item.product_code,
                qty: item.qty,
                mrp: item.mrp,
                total_price: item.total_price
            }));
            
            const total_items = item.length;
            const total_qty = item.reduce((sum, item) => sum + item.qty, 0);
            const total_amount = item.reduce((sum, item) => sum + item.total_price, 0); // 👈 calculate total_amount
            
            this.stockForm.patchValue({
                item: item,
                total_items: total_items,
                total_qty: total_qty,
                total_amount: total_amount  // 👈 include it
            });
            this.api.disabled = true;
            const isEditMode = !!this.stockForm.get('_id')?.value;
            const httpMethod = isEditMode ? 'patch' : 'post';
            const apiEndpoint = isEditMode ? 'complaint-invoice/update-item' : 'complaint-invoice/create';
            if (!isEditMode && this.stockForm.contains('_id')) {
                this.stockForm.removeControl('_id');
            }
            this.api[httpMethod](this.stockForm.value, apiEndpoint).subscribe(response => {
                this.api.disabled = false;
                if (response['statusCode'] === 200) {
                    this.router.navigate(['/apps/service/service-invoice']);
                    this.toastr.success(response['message'], '', 'toast-top-right');
                    this.stockForm.reset();
                }
            });
        } else {
            this.toastr.error('Form Is Invalid', '', 'toast-top-right')
            this.formValidation.markFormGroupTouched(this.stockForm); // Call the global function
        }
    }
    
    createinvoiceColumns=[
        {label:"Product Name"},
        {label:"Description"},
        {label:"Qty"},
        {label:"Price Per Unit"},
        {label:"Total"},
        {label:"Action"},
    ]
    
    headerColumn=[
        {label:"Product Name"},
        {label:"Qty", table_class : 'text-right'},
        {label:"Mrp", table_class : 'text-right'},
        {label:"Total", table_class : 'text-right'},
    ]
    
    Currency=[
        {label:"Select Currency",value:1},
        {label:"USD - (United States Dollar)",value:2},
        {label:"BHD - (Bahraini Dinar)",value:3},
        {label:"KWD - (Kuwaiti Dinar)",value:4},
        {label:"CHF - (Swiss Franc)",value:5},
    ]
}
