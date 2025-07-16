import { Component } from '@angular/core';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { FlatpickrDefaults } from 'angularx-flatpickr';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { FormValidationService } from '../../../../../utility/form-validation';
import { ApiService } from '../../../../../core/services/api/api.service';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { DateService } from '../../../../../shared/services/date.service';
import { CommonApiService } from '../../../../../shared/services/common-api.service';
import { CURRENCY_SYMBOLS, LOGIN_TYPES } from '../../../../../utility/constants';
import { ModuleService } from '../../../../../shared/services/module.service';
import { FORMIDCONFIG } from '../../../../../../config/formId.config';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quotation-add',
  imports: [
    SharedModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    SpkReusableTablesComponent,
    MaterialModuleModule,
    CommonModule,
    NgxEditorModule,
  ],
  providers:[FlatpickrDefaults],
  templateUrl: './quotation-add.component.html',
})
export class QuotationAddComponent {
  FORMID:any= FORMIDCONFIG;
  CURRENCY_SYMBOLS = CURRENCY_SYMBOLS;
  skLoading:boolean = false
  submodule:any;
  moduleFormId:number =0;
  quotationForm: FormGroup = new FormGroup({});
  today= new Date();
  quantity: number = 1;
  product: number = 1;
  editor!: Editor;
  quotationList: any[] = [];
  subTotal: number = 0;
  totalDiscount: number = 0;
  totalGst: number = 0;
  grandTotal: number = 0;
  site_data:any=[]
  enquiry_data:any=[];
  DetailId:  any;
  pageType:any = {};
  quotationData: any;
  Detail:any = {};
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
  
  constructor(
    private toastr: ToastrServices, 
    public api: ApiService,
    private formValidation: FormValidationService,
    private fb: FormBuilder,
    private dateService: DateService,
    public commonApi: CommonApiService,
    public CommonApiService: CommonApiService,
    private moduleService: ModuleService,
    private router : Router,
    public route: ActivatedRoute
  ){
  }
  
  ngOnInit(){
    const subModule = this.moduleService.getSubModuleByName('SFA', 'Quotation');
    const form = this.moduleService.getFormById('SFA', 'Quotation', this.FORMID.ID['Quotation']);
    if (subModule) {
      this.submodule = subModule;
    }
    
    this.route.paramMap.subscribe(params => {
      if(params){
        this.DetailId = params.get('id');
        const editParam = params.get('edit');
        this.pageType.formType = editParam ? editParam : 'add';
        if (this.DetailId) {
          this.getDetail();
        }
      }
    });
    if (form) {
      this.submodule.form_id = form.form_id;
      this.moduleFormId = form.form_id;
    }
    this.editor = new Editor();
    this.quotationForm = this.fb.group({
      _id: [''],
      title: ['', Validators.required],
      quotation_type: ['', Validators.required],
      customer_type_id: ['', Validators.required],
      customer_type_name: ['', Validators.required],
      customer_name: ['', Validators.required],
      followup_date: ['', Validators.required],
      valid_upto: ['', Validators.required],
      payment_term: ['', Validators.required],
      note: ['', Validators.required],
      product_name: ['', Validators.required],
      cart_item: [[]],
      price: ['', Validators.required],
      discount_percent: ['', Validators.required],
      sub_total: [0],
      qty: ['', Validators.required],
      customer_id: [''],
      total_amount: [0],
      total_discount: [0],
      gst: ['', Validators.required],
      answer: ['', Validators.required],
      module_id: [''],
      module_name: [''],
    });
    this.quotationForm.get('quotation_type')?.valueChanges.subscribe(value => {
      const customerTypeControl = this.quotationForm.get('customer_type_id');
      
      if (value === 'CUSTOMER') {
        customerTypeControl?.setValidators([Validators.required]);
      } else {
        customerTypeControl?.clearValidators();
        customerTypeControl?.setValue(null); // Optional reset
      }
      
      customerTypeControl?.updateValueAndValidity();
    });
    this.quotationForm.get('product_name')?.valueChanges.subscribe((selectedProductId) => {
      const selectedProduct = this.commonApi.productList.find(
        (product: any) => product.value === selectedProductId
      );
      
      if (selectedProduct) {
        this.quotationForm.patchValue({
          price: selectedProduct.mrp
        });
      } else {
        this.quotationForm.patchValue({
          price: null
        });
      }
    });
    this.CommonApiService.getLoginType([LOGIN_TYPES.PRIMARY])
    this.commonApi.getProduct();
    this.setProductFieldValidators(true);
  }
  
  getSiteData(){
    this.api.post({}, 'quotation/read-site').subscribe(result => {
      if (result['statusCode'] === 200) {
        this.site_data = result['data'] 
      } 
    })
  }
  
  getEnquiryData(){
    this.api.post({}, 'quotation/read-enquiry').subscribe(result => {
      if (result['statusCode'] === 200) {
        this.enquiry_data = result['data'] 
      } 
    })
  }
  
  findName(value: any) {
    const index = this.commonApi.customerCategorySubType.findIndex((row: any) => row.value === value);
    if (index != -1) {
      this.quotationForm.setControl('customer_type_name', new FormControl(this.commonApi.customerTypeData[index]['label'])
    );
  }
  }

  onLoginTypeChange(value: any) {
    const selectedValue = this.CommonApiService.loginType.find((item: any) => item.value === value);
    if (selectedValue) {
      this.quotationForm.patchValue({
        login_type_name: selectedValue.label,
      });
      this.CommonApiService.getCustomerCategorySubType(LOGIN_TYPES.PRIMARY);
    }
  }

  onCustomerCategoryChange(value: any) {
    const selectedValue = this.CommonApiService.customerCategorySubType.find((item: any) => item.value === value);
    if (selectedValue) {
      this.quotationForm.patchValue({
        customer_type_name: selectedValue.label,
      });
    }
  }

  addToList() {
    const formData = this.quotationForm.value;
    const fieldsToCheck = ['product_name', 'qty', 'price', 'discount_percent'];
    const isEmpty = fieldsToCheck.every(field => !formData[field]);
    
    if (isEmpty) {
      this.toastr.warning('Cannot add empty quotation data.', '', { positionClass: 'toast-top-right' });
      return;
    }
    
    const qty = +formData.qty || 0;
    const price = +formData.price || 0;
    const discount_percent = +formData.discount_percent || 0;
    
    const selectedProduct = this.CommonApiService.productList.find((p: any) => p.value === formData.product_name);
    const { label: product_name = '', value: product_id = '', gst_percent = 0 } = selectedProduct || {};
    
    const existingIndex = this.quotationList.findIndex(item => item.product_id === product_id);
    
    if (existingIndex !== -1) {
      const existingItem = this.quotationList[existingIndex];
      
      this.subTotal -= existingItem.sub_total;
      this.totalDiscount -= existingItem.discount_amount;
      this.totalGst -= existingItem.gst_amount;
      this.grandTotal -= existingItem.net_amount;
      
      const updatedQty = existingItem.qty + qty;
      const updatedPrice = existingItem.price + price;
      
      const updatedSubTotal = updatedQty * updatedPrice;
      const updatedDiscountAmount = (updatedSubTotal * discount_percent) / 100;
      const updatedSubTotalAfterDiscount = updatedSubTotal - updatedDiscountAmount;
      const updatedGstAmount = (updatedSubTotalAfterDiscount * gst_percent) / 100;
      const updatedNetAmount = updatedSubTotalAfterDiscount + updatedGstAmount;
      
      this.quotationList[existingIndex] = {
        product_id,
        product_name,
        qty: updatedQty,
        price: +updatedPrice.toFixed(2),
        discount_percent,
        discount_amount: +updatedDiscountAmount.toFixed(2),
        sub_total: +updatedSubTotalAfterDiscount.toFixed(2),
        gst_percent,
        gst_amount: +updatedGstAmount.toFixed(2),
        net_amount: +updatedNetAmount.toFixed(2)
      };
      
      this.subTotal += +updatedSubTotalAfterDiscount.toFixed(2);
      this.totalDiscount += +updatedDiscountAmount.toFixed(2);
      this.totalGst += +updatedGstAmount.toFixed(2);
      this.grandTotal += +updatedNetAmount.toFixed(2);
      
    } else {
      const sub_total = price * qty;
      const discount_amount = (sub_total * discount_percent) / 100;
      const subTotalAfterDiscount = sub_total - discount_amount;
      const gst_amount = (subTotalAfterDiscount * gst_percent) / 100;
      const net_amount = subTotalAfterDiscount + gst_amount;
      
      const newItem = {
        product_id,
        product_name,
        qty,
        price: +price.toFixed(2),
        discount_percent,
        discount_amount: +discount_amount.toFixed(2),
        sub_total: +subTotalAfterDiscount.toFixed(2),
        gst_percent,
        gst_amount: +gst_amount.toFixed(2),
        net_amount: +net_amount.toFixed(2)
      };
      
      this.quotationList.push(newItem);
      
      this.subTotal += newItem.sub_total;
      this.totalDiscount += newItem.discount_amount;
      this.totalGst += newItem.gst_amount;
      this.grandTotal += newItem.net_amount;
    }
    
    this.subTotal = +this.subTotal.toFixed(2);
    this.totalDiscount = +this.totalDiscount.toFixed(2);
    this.totalGst = +this.totalGst.toFixed(2);
    this.grandTotal = +this.grandTotal.toFixed(2);
    
    this.quotationForm.patchValue({
      product_name: '',
      qty: '',
      price: '',
      discount_percent: '',
      gst: '', // optional - since gst is fetched automatically
      net_amount: '',
    });
    
    fieldsToCheck.concat('net_amount', 'date_from').forEach(field => {
      const control = this.quotationForm.get(field);
      if (control) {
        control.markAsPristine();
        control.markAsUntouched();
      }
    });
    
    if (this.quotationList.length > 0) {
      this.setProductFieldValidators(false);
    }
  }

  setProductFieldValidators(isRequired: boolean) {
    const controls = ['product_name', 'price', 'qty', 'discount', 'gst'];
    controls.forEach(control => {
      const formControl = this.quotationForm.get(control);
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
    const quotationType = this.quotationForm.get('quotation_type')?.value;
    const customerId = this.quotationForm.get('customer_id')?.value;
    const customerTypeId = this.quotationForm.get('customer_type_id')?.value;
    
    let selectedItem: any = null;
    let customerName: string = '';
    let customerTypeName: string = '';
    
    if (quotationType === 'Customer') {
      selectedItem = this.CommonApiService.customerTypeData.find((item: { value: any; }) => item.value == customerTypeId);
      customerTypeName = selectedItem?.label || '';
      selectedItem = this.CommonApiService.customerData.find((item: { value: any; }) => item.value == customerId);
      customerName = selectedItem?.label || '';
    } else if (quotationType === 'Site') {
      selectedItem = this.site_data.find((item: { value: any; }) => item.value == customerId);
      customerName = selectedItem?.label || '';
    } else if (quotationType === 'Enquiry') {
      selectedItem = this.enquiry_data.find((item: { value: any; }) => item.value == customerId);
      customerName = selectedItem?.label || '';
    }
    
    this.quotationForm.patchValue({
      sub_total: +this.subTotal,
      total_discount: +this.totalDiscount,
      gst: +this.totalGst,
      total_amount: +this.grandTotal,
      module_id: this.submodule?.module_id || null,
      module_name: this.submodule?.module_name || null,
      customer_name: customerName,
      customer_type_name: customerTypeName,
      cart_item: this.quotationList.map(item => (
        {
          product_id: item.product_id,
          product_name: item.product_name,
          qty: +item.qty,
          price: +item.price,
          total_price: +(item.price * item.qty).toFixed(2),
          discount_percent: +item.discount_percent,
          discount_amount: +item.discount_amount,
          gst_percent: +item.gst_percent,
          gst_amount: +item.gst_amount,
          sub_total: +item.sub_total,
          net_amount: +item.net_amount
        }  
      ))
    });
    // Remove unnecessary fields if they exist
    ['product_name', 'qty', 'price', 'discount'].forEach(control => {
      if (this.quotationForm.contains(control)) {
        this.quotationForm.removeControl(control);
      }
    });
    this.api.disabled = true;
    const isEditMode = !!this.quotationForm.get('_id')?.value;
    const httpMethod = isEditMode ? 'patch' : 'post';
    const apiEndpoint = isEditMode ? 'quotation/update-item' : 'quotation/create';
    if (!isEditMode && this.quotationForm.contains('_id')) {
      this.quotationForm.removeControl('_id');
    }
    this.api[httpMethod](this.quotationForm.value, apiEndpoint).subscribe(response => {
      this.api.disabled = false;
      if (response['statusCode'] === 200) {
        this.router.navigate(['/apps/sfa/quotation-list']);
        this.toastr.success(response['message'], '', 'toast-top-right');
        this.quotationForm.reset();
      }
    });
  }

  deleteQuotation(index: number) {
    this.quotationList.splice(index, 1);
    this.recalculateTotals();
    this.toastr.success('Quotation removed from the list.', '', 'toast-top-right');
  }

  recalculateTotals() {
    this.subTotal = 0;
    this.totalDiscount = 0;
    this.totalGst = 0;
    this.grandTotal = 0;
    
    this.quotationList.forEach(item => {
      this.subTotal += item.sub_total;
      this.totalDiscount += item.discount_amount;
      this.totalGst += item.gst_amount;
      this.grandTotal += item.net_amount;
    });
    
    // Round values to 2 decimals
    this.subTotal = parseFloat(this.subTotal.toFixed(2));
    this.totalDiscount = parseFloat(this.totalDiscount.toFixed(2));
    this.totalGst = parseFloat(this.totalGst.toFixed(2));
    this.grandTotal = parseFloat(this.grandTotal.toFixed(2));
    
    // Optional: Re-add validators if list becomes empty
    if (this.quotationList.length === 0) {
      this.setProductFieldValidators(true);
    }
  }

  getDetail() {
    this.skLoading = true;
    this.api.post({ _id: this.DetailId }, 'quotation/detail').subscribe(result => {
      if (result['statusCode'] === 200) {
        this.skLoading = false;
        const quotationData = result['data'];
        this.quotationForm.patchValue(quotationData);
        this.getSiteData();
        this.getEnquiryData();
        this.commonApi.getCustomerTypeData();
        this.commonApi.getCustomerData();
        this.quotationList = quotationData.cart_item || [];
        this.subTotal = quotationData.sub_total || 0;
        this.totalDiscount = quotationData.total_discount || 0;
        this.totalGst = quotationData.gst || 0;
        this.grandTotal = quotationData.total_amount || 0;
      }
    });
  }

  createQuotationColumns=[
    {label:"Sr No.", table_class: "text-center"},
    {label:"Product Details", table_class: ""},
    {label:"Price Per Unit", table_class: "text-right"},
    {label:"Quantity", table_class: "text-center"},
    {label:"Discount", table_class: "text-right"},
    {label:"Sub Total", table_class: "text-right"},
    {label:"Gst", table_class: "text-right"},
    {label:"Net Amount", table_class: "text-right"},
    {label:"Action", table_class: "text-center"},
  ]

  Currency=[
    {label:"Select Currency",value:1},
    {label:"USD - (United States Dollar)",value:2},
    {label:"BHD - (Bahraini Dinar)",value:3},
    {label:"KWD - (Kuwaiti Dinar)",value:4},
    {label:"CHF - (Swiss Franc)",value:5},
  ]

  Quotation_Type=[
    {label:"Customer",value:"Customer"},
    {label:"Site / Project",value:"Site"},
    {label:"Enquiry",value:"Enquiry"},
  ]

}
