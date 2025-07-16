import { Component, Inject } from '@angular/core';
import { ModalHeaderComponent } from '../../../../../shared/components/modal-header/modal-header.component';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../../shared/shared.module';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import { ApiService } from '../../../../../core/services/api/api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { FormValidationService } from '../../../../../utility/form-validation';
import { ActivatedRoute, Router } from '@angular/router';
import { ModuleService } from '../../../../../shared/services/module.service';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { CURRENCY_SYMBOLS } from '../../../../../utility/constants';

@Component({
  selector: 'app-service-invoice-modal',
  imports: [
    ReactiveFormsModule, 
    MaterialModuleModule, 
    SharedModule, 
    CommonModule, 
    FormsModule,
    ModalHeaderComponent,
    SpkReusableTablesComponent
  ],
  templateUrl: './service-invoice-modal.component.html',
  styleUrl: './service-invoice-modal.component.scss'
})
export class ServiceInvoiceModalComponent {
  CURRENCY_SYMBOLS = CURRENCY_SYMBOLS
  pageType:any = 'add'
  skLoading:boolean = false;
  data: any = {};
  skloader: boolean = false;
  stockForm!: FormGroup;
  product: any = [];
  selectedItems: {
    net_price: number;
    sub_total: number;
    discount: number; label: string, value: string, qty: number, product_code: string, mrp: number, total_price:number 
  }[] = [];
  today= new Date();
  complaintId:any;
  serviceEngineerId:any;
  billingFromAddress:any;
  billingFromMobile:any;
  billingFromCustomer:any;
  submodule: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public modalData: any,
    public api: ApiService,
    private moduleService: ModuleService,
    private fb: FormBuilder,
    public comanFuncation: ComanFuncationService,
    private dialogRef: MatDialogRef<ServiceInvoiceModalComponent>,
    private toastr: ToastrServices,
    private formValidation: FormValidationService,
    private router: Router, 
    private route: ActivatedRoute, 
  ) {
    console.log('Received Data:', this.modalData);
    this.data.status = modalData.status;
    this.data.reason = modalData.reason;
  }
  
  payment_mode=[
    {label:"UPI/Online",value:"UPI/Online"},
    {label:"Cash",value:"Cash"},
  ]
  
  headerColumn=[
    {label:"Product Name"},
    {label:"Qty", table_class : 'text-right'},
    {label:"Mrp", table_class : 'text-right'},
    {label:"Total Discount", table_class : 'text-right'},
    // {label:"Sub Total", table_class : 'text-right'},
    {label:"Net Amount", table_class : 'text-right'},
  ]
  
  ngOnInit() {
    const subModule = this.moduleService.getSubModuleByName('WCMS', 'Invoice');
    if (subModule) {
      this.submodule = subModule;
    } 
    this.stockForm = this.fb.group({
      product_id: [''],
      qty: ['',],
      price: ['', Validators.required],
      total_discount: [''],
      complaint_id: [''],
      payment_mode: [''],
      service_type: ['Complaint', Validators.required],
      transaction_number: [''],
      net_amount: [0],
      total_items: [0],
      total_qty: [0],
      item: this.fb.array([]) 
    });
    if (this.modalData?.complaint_id) {
      this.stockForm.patchValue({complaint_id: this.modalData.complaint_id});
    }
    this.stockForm.get('product_id')?.valueChanges.subscribe(productId => {
      const selectedProduct = this.product.find((p: any) => p.value === productId);
      if (selectedProduct) {
        this.stockForm.get('price')?.setValue(selectedProduct.mrp || 0);
      } else {
        this.stockForm.get('price')?.setValue(0);
      }
    });
    this.stockForm.get('status')?.valueChanges.subscribe(status => {
      this.toggleTransactionFields(status);
    });
    this.getProduct();
  }
  
  get itemArray(): FormArray {
    return this.stockForm.get('item') as FormArray;
  }
  
  toggleTransactionFields(status: string) {
    const txnControl = this.stockForm.get('transaction_number');
    const cashControl = this.stockForm.get('cash');
    
    if (status === 'Transaction Number') {
      txnControl?.setValidators([Validators.required]);
      cashControl?.clearValidators();
      cashControl?.setValue('');
    } else if (status === 'Cash') {
      cashControl?.setValidators([Validators.required]);
      txnControl?.clearValidators();
      txnControl?.setValue('');
    } else {
      txnControl?.clearValidators();
      txnControl?.setValue('');
      cashControl?.clearValidators();
      cashControl?.setValue('');
    }
    
    txnControl?.updateValueAndValidity();
    cashControl?.updateValueAndValidity();
  }
  
  statusChange() {
    this.skloader = true;
    this.comanFuncation.statusChange(this.data.status, this.modalData.DetailId, this.modalData.status, this.modalData.subModule, 'without-toggle', this.modalData.apiPath, this.data.reason, this.modalData.reason).subscribe((result: boolean) => {
      this.skloader = false;
      if (result) {
        this.dialogRef.close(true);
      }
    });
  }
  
  getProduct(search?: any) {
    this.api.post({ '_id': this.modalData.service_engineer_id,  filters: { 'search': search } }, 'spare-part/read-dropdown').subscribe(result => {
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
  
  closeModal() {
    this.dialogRef.close(); // Closes the dialog
  }
  
  addToList() {
    const product = this.stockForm.get('product_id')?.value;
    const qty = +this.stockForm.get('qty')?.value;
    const discount = +this.stockForm.get('total_discount')?.value || 0;
    const mrp = +this.stockForm.get('price')?.value || 0;
    
    if (!product) {
      this.toastr.error('Please select a product.', '', { positionClass: 'toast-top-right' });
      return;
    }
    
    if (!qty || qty <= 0) {
      this.toastr.error('Please enter a valid quantity greater than 0.', '', { positionClass: 'toast-top-right' });
      return;
    }
    
    const selectedOption = this.product.find((row: any) => row.value === product);
    if (!selectedOption) {
      this.toastr.error('Selected product not found.', '', { positionClass: 'toast-top-right' });
      return;
    }
    
    const sub_total = qty * mrp;
    const discount_amount = (sub_total * discount) / 100;
    const net_price = sub_total - discount_amount;
    
    const existing = this.selectedItems.find(p => p.value === product);
    const itemArray = this.stockForm.get('item') as FormArray;
    
    if (existing) {
      existing.qty += qty;
      existing.discount = discount;
      existing.sub_total = existing.qty * existing.mrp;
      existing.net_price = existing.sub_total - (existing.sub_total * discount / 100);
      
      const index = this.selectedItems.findIndex(p => p.value === product);
      if (itemArray.at(index)) {
        const control = itemArray.at(index) as FormGroup;
        control.patchValue({
          qty: existing.qty,
          discount: discount
        });
      }
    } else {
      this.selectedItems.push({
        label: selectedOption.label,
        value: selectedOption.value,
        product_code: selectedOption.product_code,
        qty,
        mrp,
        discount,
        sub_total,
        net_price,
        total_price: net_price
      });
      
      itemArray.push(this.fb.group({
        product_id: [product],
        qty: [qty],
        discount: [discount]
      }));
    }
    
    // ✅ Clear input fields using patchValue
    this.stockForm.patchValue({
      product_id: '',
      qty: '',
      price: '',
      total_discount: ''
    });
    
    this.stockForm.markAsPristine();
    this.stockForm.markAsUntouched();
    this.stockForm.updateValueAndValidity();
  }
  
  setProductFieldValidators(isRequired: boolean) {
    const controls = ['product_id', 'price', 'qty', 'total_disocunt'];
    controls.forEach(control => {
      const formControl = this.stockForm.get(control);
      if (formControl) {
        formControl.clearValidators();
        if (isRequired) {
          formControl.setValidators([Validators.required]);
        }
        formControl.updateValueAndValidity();
      }
    });
  }
  
  onSubmit() {
    // ✅ Step 1: Clear temp input field validators before form check
    const tempFields = ['product_id', 'qty', 'price', 'total_discount'];
    tempFields.forEach(field => {
      const control = this.stockForm.get(field);
      if (control) {
        control.clearValidators();
        control.updateValueAndValidity();
      }
    });
    
    // ✅ Step 2: Validate form
    if (this.stockForm.valid) {
      const item = this.selectedItems.map(item => {
        const sub_total = item.qty * item.mrp;
        const discount = item.discount || 0;
        const net_price = sub_total - (sub_total * discount) / 100;
        return {
          product_id: item.value,
          product_name: item.label,
          product_code: item.product_code,
          qty: item.qty,
          mrp: item.mrp,
          discount: discount,
          sub_total: sub_total,
          net_price: net_price
        };
      });
      
      // ✅ Step 4: Calculate totals
      const total_items = item.length;
      const total_qty = item.reduce((sum, item) => sum + +item.qty, 0);
      const sub_total = item.reduce((sum, item) => sum + item.sub_total, 0);
      const net_amount = item.reduce((sum, item) => sum + item.net_price, 0);
      const total_discount = sub_total - net_amount;
      
      // ✅ Step 5: Clean payload and remove temp fields
      const payload = {
        ...this.stockForm.value,
        item,
        total_items,
        total_qty,
        sub_total,
        net_amount,
        total_discount
      };
      
      delete payload.product_id;
      delete payload.qty;
      delete payload.price;

      this.api.disabled = true;
      this.api.post(payload, 'complaint-invoice/create').subscribe(response => {
        this.api.disabled = false;
        if (response['statusCode'] === 200) {
          this.toastr.success(response['message'], '',  'toast-top-right' );
          this.dialogRef.close(true);
        }
      });
      
    } else {
      this.toastr.error('Form Is Invalid', '', { positionClass: 'toast-top-right' });
      this.formValidation.markFormGroupTouched(this.stockForm);
      const invalidFields = Object.keys(this.stockForm.controls).filter(field =>
        this.stockForm.get(field)?.invalid
      );
      console.log('❌ Invalid Fields:', invalidFields);
    }
  }
  
  
  
  delete(index: number) {
    this.selectedItems.splice(index, 1);
    const itemArray = this.stockForm.get('item') as FormArray;
    itemArray.removeAt(index);
  }
  
}
