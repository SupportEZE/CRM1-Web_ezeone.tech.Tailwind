import { Component } from '@angular/core';
import { SpkNgSelectComponent } from '../../../../../../@spk/spk-ng-select/spk-ng-select.component';
import { CommonModule } from '@angular/common';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FilePondModule } from 'ngx-filepond';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { ApiService } from '../../../../../core/services/api/api.service';
import { FormValidationService } from '../../../../../utility/form-validation';
import { CommonApiService } from '../../../../../shared/services/common-api.service';
import { UploadFileService } from '../../../../../shared/services/upload.service';
import { ModuleService } from '../../../../../shared/services/module.service';
import { LOGIN_TYPES } from '../../../../../utility/constants';
import { SpkFlatpickrComponent } from '../../../../../../@spk/spk-flatpickr/spk-flatpickr.component';
import { filter, Subject } from 'rxjs';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';

@Component({
  selector: 'app-purchase-add',
  imports: [SpkNgSelectComponent, SharedModule, MaterialModuleModule, CommonModule, ReactiveFormsModule, RouterModule, FilePondModule, SpkFlatpickrComponent, SpkReusableTablesComponent],
  templateUrl: './purchase-add.component.html',
  
})

// SpkFlatpickrComponent
export class PurchaseAddComponent {
  skLoading:boolean = false;
  stockForm!: FormGroup;
  today = new Date();
  pondFiles: any[] = [];
  submodule: any;
  pondPdf: any[] = [];
  pondImages: any[] = [];
  
  pondOptions = this.getPondOptions('image');
  pondDocumentOptions = this.getPondOptions('pdf');
  product:any=[];
  customerType :any =[
    {'label':"Distributor", 'value':"Distributor"},
    {'label':"Dealer", 'value':"Dealer"},
    {'label':"Branch", 'value':"Branch"},
    {'label':"Factory", 'value':"Factory"}
  ]
  accessRight:any = {};
  selectedItems: { label: string, value: string, point_value:number, product_code:string, qty: number }[] = [];
  detailData:any ={};
  
  
  constructor(private toastr: ToastrServices, public api: ApiService,private formValidation: FormValidationService, private fb: FormBuilder,private router: Router,private route: ActivatedRoute, public commonApi: CommonApiService,public uploadService: UploadFileService, private moduleService: ModuleService,)
  {}
  
  ngOnInit() { 
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state?.['detail']) {
      this.detailData = nav.extras.state['detail'];
    } else {
      const navigation = history.state;
      if (navigation?.detail) {
        this.detailData = navigation.detail;
      }
    }
    
    const subModule = this.moduleService.getSubModuleByName('IRP', 'Purchase');
    if (subModule) {
      this.submodule = subModule;
    }
    const accessRight = this.moduleService.getAccessMap('Purchase');
    console.log(accessRight, 'accessRight');
    
    if (accessRight) {
      this.accessRight = accessRight;
    }
    this.stockForm = this.fb.group({
      bill_date: ['', Validators.required],
      bill_amount: ['', Validators.required],
      bill_number: ['', Validators.required],
      login_type_id: ['',],
      customer_type_id: [{ value: '', disabled: false }, Validators.required],
      customer_id: [{ value: '', disabled: false }, Validators.required],
      purchase_from: [{ value: '', disabled: false }, Validators.required],
      purchase_from_name: [{ value: '', disabled: false }, Validators.required],
      product_id: ['', Validators.required],
      customer_name: [''],
      customer_type_name: [''],
      remark: [''],
      qty: ['', Validators.required],
      selectedItems: [''],
    });
    this.stockForm.get('purchase_from')?.valueChanges.subscribe(purchase_from => {
      const remarksControl = this.stockForm.get('purchase_from_name');
      if (purchase_from != 'Factory') {
        remarksControl?.setValidators([Validators.required]);
      } else {
        this.stockForm.removeControl('purchase_from_name');
        remarksControl?.clearValidators();
      }
      remarksControl?.updateValueAndValidity();
    });
    
    if (this.detailData && Object.keys(this.detailData).length > 0) {
      if (this.detailData.pageFrom === 'Detail Page') {
        this.stockForm.patchValue({'customer_type_id': this.detailData.customer_type_id });
        this.stockForm.get('customer_type_id')?.disable();
        this.stockForm.patchValue({ 'login_type_id': this.detailData.login_type_id });
        this.getReceiverCustomer(this.detailData.login_type_id)
        this.stockForm.patchValue({ 'customer_id': this.detailData._id });
        this.stockForm.get('customer_id')?.disable();
        this.stockForm.patchValue({ 'customer_name': this.detailData.customer_name });
        this.stockForm.patchValue({ 'customer_type_name': this.detailData.customer_type_name });
        this.commonApi.getCustomerCategorySubType([LOGIN_TYPES.PRIMARY]);
        this.getCustomerCategorySubType([LOGIN_TYPES.INFLUENCER, LOGIN_TYPES.SECONDARY]);
        this.getProduct();
      }
    }
    else{
      this.commonApi.getCustomerCategorySubType([LOGIN_TYPES.PRIMARY, LOGIN_TYPES.SECONDARY]);
      this.getCustomerCategorySubType([LOGIN_TYPES.INFLUENCER, LOGIN_TYPES.SECONDARY])
    }
  }
  
  
  getPondOptions(type: 'image' | 'pdf'): any {
    const commonOptions = {
      allowFileTypeValidation: true,
      allowFileSizeValidation: true,
      labelIdle: "Click or drag files here to upload...",
      server: {
        process: (_fieldName: any, file: any, _metadata: any, load: (arg0: string) => void) => {
          setTimeout(() => {
            load(Date.now().toString());
          }, 1000);
        },
        revert: (_uniqueFileId: any, load: () => void) => {
          load();
        }
      }
    };
    
    if (type === 'image') {
      return {
        ...commonOptions,
        allowMultiple: true,
        acceptedFileTypes: ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'],
        maxFiles: 2,
        allowImageValidateSize: true,
        labelFileTypeNotAllowed: 'Only PNG, JPEG, or PDF files are allowed',
        fileValidateTypeLabelExpectedTypes: 'Allowed: PNG, JPEG, PDF',
        labelImageValidateSizeTooSmall: 'Image is too small. Min: {minWidth}×{minHeight}',
        labelImageValidateSizeTooBig: 'Image is too large. Max: {maxWidth}×{maxHeight}',
        
        // Custom validation for file size based on type
        fileValidateFunction: (file: File) => {
          const isPDF = file.type === 'application/pdf';
          const maxSize = isPDF ? 1 * 1024 * 1024 : 2 * 1024 * 1024; // 10MB or 2MB
          if (file.size > maxSize) {
            return Promise.reject(`Max size exceeded: ${isPDF ? '10MB for PDF' : '2MB for images'}`);
          }
          return Promise.resolve();
        }
      };
    } else {
      return {
        ...commonOptions,
        allowMultiple: false,
        maxFiles: 2,
        acceptedFileTypes: ['application/pdf'],
        maxFileSize: '10MB',
        labelFileTypeNotAllowed: 'Only PDF files are allowed',
        fileValidateTypeLabelExpectedTypes: 'Allowed: PDF',
      };
    }
  }
  onFileProcessed(event: any, type: string) {
    const file = event.file.file;
    Object.assign(file, { image_type: type });
    if (type === 'image') {
      this.pondImages = [...(this.pondImages || []), file];
    } else if (type === 'pdf') {
      this.pondPdf = [...(this.pondPdf || []), file];
    }
  }
  onFileRemove(event: any, type: string) {
    const file = event.file.file;
    if (type === 'image') {
      const index = this.pondImages.findIndex(f => f.name === file.name && f.size === file.size);
      if (index > -1) {
        this.pondImages.splice(index, 1);
      }
    } else if (type === 'pdf') {
      const index = this.pondPdf.findIndex(f => f.name === file.name && f.size === file.size);
      if (index > -1) {
        this.pondPdf.splice(index, 1);
      }
    }
  }
  
  
  customerLoginType: any[] = [];
  customerLoginType$ = new Subject<any>();
  
  getCustomerLoginType(login_type_ids: any) {
    this.api.post({ "login_type_ids": login_type_ids }, 'rbac/read-login-types').subscribe(result => {
      if (result.statusCode === 200) {
        this.customerLoginType = result.data; // <-- for binding
        this.customerLoginType$.next(result.data); // <-- for multiple async handling
      }
    });
  }
  
  
  
  customerCategorySubType: any = []
  getCustomerCategorySubType(login_sub_type_id: any, search?: any) {
    this.api.post({ "login_type_id": login_sub_type_id, 'search': search }, 'rbac/read-customer-type').subscribe(result => {
      if (result['statusCode'] === 200) {
        this.customerCategorySubType = result['data']
      }
    })
  }
  
  
  
  
  getReceiverCustomer(value: any) {
    const selectedValue = this.customerCategorySubType.find((item: any) => item.value === value);
    if (selectedValue) {
      this.stockForm.patchValue({ 'login_type_name': selectedValue.label });
      this.stockForm.patchValue({ 'login_type_id': selectedValue.login_type_id })
    }
    this.getCustomerData(this.stockForm.value.customer_type_id, this.stockForm.value.login_type_id);
  }
  
  customerData: any = []
  getCustomerData(cust_type_id?: any, login_type_id?: any, search?: any) {
    this.api.post({ customer_type_id: cust_type_id, login_type_id: login_type_id, 'search': search }, 'customer/read-dropdown').subscribe((result: any) => {
      if (result['statusCode'] === 200) {
        this.customerData = result['data']
      }
    })
  }
  
  private lastSearchTerm: string = '';
  onSearch(search: string, type: any) {
    const trimmedSearch = search?.trim() || '';
    if (trimmedSearch === this.lastSearchTerm) {
      return;
    }
    this.lastSearchTerm = trimmedSearch;
    if (type === 'customer') {
      this.getCustomerData(this.stockForm.value.customer_type_id, this.stockForm.value.login_type_id, search)
    }
    if (type === 'product') {
      this.getProduct(search)
    }
  }
  
  
  getProduct(search?:any) {
    this.api.post({ 'dropdown-name': 'Product', 'customer_type_id':this.detailData?.customer_type_id ? this.detailData?.customer_type_id : this.stockForm.value.customer_type_id, filters: { 'search': search } }, 'product/read-dropdown').subscribe(result => {
      if (result['statusCode'] == 200) {
        this.product = result['data']
      }
    });
  }
  
  
  totalItemQuantity:number=0;
  totalPointValue:number=0;
  
  addToList() {
    const product = this.stockForm.get('product_id')?.value;
    const qty = this.stockForm.get('qty')?.value;
    if (this.selectedItems.length === 0) {
      if (!product) {
        this.toastr.error('Please select a product.', '', 'toast-top-right');
        return;
      }
      
      if (qty <= 0) {
        this.toastr.error('Please enter a valid quantity greater than 0.', '', 'toast-top-right');
        return;
      }
    }
    
    const selectedOption = this.product.find((row:any) => row.value === product);
    if (!selectedOption) {
      this.toastr.error('Selected product not found.', '', 'toast-top-right');
      return;
    }
    
    const existing = this.selectedItems.find(p => p.value === product);
    if (existing) {
      existing.qty += qty;
    } else {
      this.selectedItems.push({
        label: selectedOption.label,
        value: selectedOption.value,
        product_code: selectedOption.product_code,
        point_value: selectedOption.point_value,
        qty: qty
      });
    }
    // Reset stockForm
    this.stockForm.get('product_id')?.reset();
    this.stockForm.get('qty')?.reset();
    if (this.selectedItems.length > 0) {
      this.stockForm.get('product_id')?.clearValidators();
      this.stockForm.removeControl('product_id');
      this.stockForm.removeControl('qty');
      this.stockForm.get('qty')?.clearValidators();
      this.stockForm.get('product_id')?.updateValueAndValidity();
      this.stockForm.get('qty')?.updateValueAndValidity();
      
    }
    this.summary();
  }
  
  
  
  summary(){
    this.totalItemQuantity = 0;
    this.totalPointValue = 0;
    this.selectedItems.forEach(item => {
      const qty = Number(item.qty) || 0;
      const pointValue = Number(item.point_value) || 0;
      this.totalItemQuantity += qty;
      this.totalPointValue += qty * pointValue;
    });
  }
  
  headerColumn = [
    { label: "S.No", table_class: "text-center" },
    { label: "Product Name", table_class: "" },
    { label: "QTY", table_class: "text-center" },
    { label: "Point Per Qty.", table_class: "text-right" },
    { label: "Action", table_class: "text-center" },
  ];
  
  
  delete(index: number) {
    this.selectedItems.splice(index, 1);
    this.toastr.success('Produc removed from the list.', '', 'toast-top-right');
    this.summary();
    if (this.selectedItems.length ===0){
      this.stockForm.get('product_id')?.setValidators(Validators.required);
      this.stockForm.get('qty')?.setValidators([
        Validators.required,
        Validators.min(1)
      ]);
    }
  }
  
  findName(event:any, type:string){
    
    if (type === 'customer_type_id') {
      const existing = this.customerCategorySubType.findIndex((row: any) => row.value === event);
      if (existing !== -1) {
        this.stockForm.patchValue({ 'customer_type_name': this.customerCategorySubType[existing]['label'] });
      }
    }
    if (type === 'customer_id') {
      const existing = this.customerData.findIndex((row: any) => row.value === event);
      if (existing !== -1) {
        this.stockForm.patchValue({ 'customer_name': this.customerData[existing]['label'] }); 
      }
    }
  }
  
  
  
  
  onSubmit(){
    if(this.stockForm.valid){
      this.api.disabled = true;
      this.stockForm.patchValue({ 'selectedItems': this.selectedItems })
      this.pondFiles = [...this.pondImages, ...this.pondPdf];
      this.api.post(this.stockForm.getRawValue(), 'purchase/create').subscribe(result => {
        if (result['statusCode'] == 200) {
          if (this.pondFiles.length > 0) {
            this.uploadService.uploadFile(result['data']['inserted_id'], 'purchase', this.pondFiles, 'Purchase Bill', this.submodule, '/apps/loyalty/purchase')
            this.api.disabled = false;
          }
          else {
            this.api.disabled = false;
            this.router.navigate(['/apps/loyalty/purchase']);
            this.toastr.success(result['message'], '', 'toast-top-right');
          }
        }
      });
    }
    else{
      this.formValidation.markFormGroupTouched(this.stockForm)
    }
  }
}
