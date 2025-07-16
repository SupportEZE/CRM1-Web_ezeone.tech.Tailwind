import { Component } from '@angular/core';
import { SpkNgSelectComponent } from '../../../../../../../@spk/spk-ng-select/spk-ng-select.component';
import { CommonModule } from '@angular/common';
import { MaterialModuleModule } from '../../../../../../material-module/material-module.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FilePondModule } from 'ngx-filepond';
import { ToastrServices } from '../../../../../../shared/services/toastr.service ';
import { ApiService } from '../../../../../../core/services/api/api.service';
import { FormValidationService } from '../../../../../../utility/form-validation';
import { CommonApiService } from '../../../../../../shared/services/common-api.service';
import { UploadFileService } from '../../../../../../shared/services/upload.service';
import { ModuleService } from '../../../../../../shared/services/module.service';
import { LOGIN_TYPES } from '../../../../../../utility/constants';
import { SpkFlatpickrComponent } from '../../../../../../../@spk/spk-flatpickr/spk-flatpickr.component';
import { Subject } from 'rxjs';
import { SpkReusableTablesComponent } from '../../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';

@Component({
  selector: 'app-stock-return-add',
  imports: [SpkNgSelectComponent, SharedModule, MaterialModuleModule, CommonModule, ReactiveFormsModule, RouterModule, FilePondModule, SpkFlatpickrComponent, SpkReusableTablesComponent],
  templateUrl: './stock-return-add.component.html'
})

// SpkFlatpickrComponent
export class StockReturnAddComponent {
  skLoading:boolean = false;
  stockForm!: FormGroup;
  today = new Date();
  pondFiles: any[] = [];
  submodule: any;
  pondPdf: any[] = [];
  pondImages: any[] = [];
  pondOptions = this.getPondOptions('image');
  pondDocumentOptions = this.getPondOptions('pdf');
  detailData: any = {};
  
  product: any = [];
  
  
  selectedItems: { label: string, value: string, product_code: string, qty: number }[] = [];
  
  
  
  constructor(private toastr: ToastrServices, public api: ApiService,private formValidation: FormValidationService, private fb: FormBuilder,private router: Router,private route: ActivatedRoute, public commonApi: CommonApiService,public uploadService: UploadFileService, private moduleService: ModuleService,)
  {
    
    
  }
  
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
    const subModule = this.moduleService.getSubModuleByName('IRP', 'Stock Transfer');
    if (subModule) {
      this.submodule = subModule;
    }
    if(this.detailData['return-type'] === 'company') { 
      this.commonApi.getCustomerCategorySubType([LOGIN_TYPES.PRIMARY, LOGIN_TYPES.SUB_PRIMARY]);
    }
    if (this.detailData['return-type'] === 'customer') {
      this.commonApi.getCustomerCategorySubType([LOGIN_TYPES.SECONDARY, LOGIN_TYPES.INFLUENCER]);
    }
    
    this.getProduct();
    this.stockForm = this.fb.group({
      bill_date: ['', Validators.required],
      bill_amount: ['', Validators.required],
      bill_number: ['', Validators.required],
      sender_login_type_id: ['',],
      sender_customer_type_id: ['', Validators.required],
      sender_customer_id: ['', Validators.required],
      receiver_login_type_id: ['',],
      receiver_customer_type_id: ['', Validators.required],
      receiver_customer_id: ['', Validators.required],
      product_id: ['', Validators.required],
      receiver_customer_name: [''],
      receiver_customer_type_name: [''],
      sender_customer_type_name: [''],
      sender_customer_name: [''],
      qty: ['', Validators.required],
    });
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
  
  
  
  
  getSenderCustomer(value: any) {
    const selectedValue = this.commonApi.customerCategorySubType.find((item: any) => item.value === value);
    if (selectedValue) {
      this.stockForm.value.sender_customer_name = selectedValue.label;
      this.stockForm.patchValue({ 'sender_login_type_id': selectedValue.login_type_id });
      if (this.detailData['return-type'] === 'customer'){
        this.customerCategorySubType = [];
        this.customerData =[];
        this.stockForm.get('receiver_customer_type_id')?.reset();
        this.stockForm.get('receiver_customer_id')?.reset();
        if(selectedValue.login_type_id === LOGIN_TYPES.SECONDARY){
          this.getCustomerCategorySubType([LOGIN_TYPES.PRIMARY])
        }
        if (selectedValue.login_type_id === LOGIN_TYPES.INFLUENCER) {
          this.getCustomerCategorySubType([LOGIN_TYPES.PRIMARY, LOGIN_TYPES.SECONDARY])
        }
      }

    }
    this.commonApi.getCustomerData(this.stockForm.value.sender_customer_type_id, this.stockForm.value.sender_login_type_id);
  }
  
  
  getReceiverCustomer(value: any) {
    const selectedValue = this.customerCategorySubType.find((item: any) => item.value === value);
    if (selectedValue) {
      this.stockForm.value.sender_customer_name = selectedValue.label;
      this.stockForm.patchValue({ 'receiver_login_type_id': selectedValue.login_type_id })
    }
    this.getCustomerData(this.stockForm.value.receiver_customer_type_id, this.stockForm.value.receiver_login_type_id);
  }
  
  customerData: any = []
  getCustomerData(cust_type_id?: any, login_type_id?: any, search?: any) {
    this.api.post({ customer_type_id: cust_type_id, login_type_id: login_type_id, 'search': search }, 'customer/read-dropdown').subscribe((result: any) => {
      if (result['statusCode'] === 200) {
        this.customerData = result['data']
      }
    })
  }
  
  
  onSearch(search: string, type: any) {
    if (type === 'sender_customer') {
      this.commonApi.getCustomerData(this.stockForm.value.sender_customer_type_id, this.stockForm.value.sender_login_type_id, search)
    }
    if (type === 'receiver_customer') {
      this.getCustomerData(this.stockForm.value.receiver_customer_type_id, this.stockForm.value.receiver_login_type_id, search)
    }
    if (type === 'product') {
      this.getProduct(search)
    }
  }
  
  
  getProduct(search?: any) {
    this.api.post({ 'dropdown-name': 'Product', filters: { 'search': search } }, 'product/read-dropdown').subscribe(result => {
      if (result['statusCode'] == 200) {
        this.product = result['data']
      }
    });
  }
  
  
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
    
    const selectedOption = this.product.find((row: any) => row.value === product);
    if (!selectedOption) {
      this.toastr.error('Selected product not found.', '', 'toast-top-right');
      return;
    }
    
    const existing = this.selectedItems.find(p => p.value === product);
    if (existing) {
      existing.qty += qty; // Add quantity if already in list
    } else {
      this.selectedItems.push({
        label: selectedOption.label,
        value: selectedOption.value,
        product_code: selectedOption.product_code,
        qty: qty
      });
    }
    // Reset stockForm
    this.stockForm.get('product_id')?.reset();
    this.stockForm.get('qty')?.reset();
    if (this.selectedItems.length > 0) {
      this.stockForm.get('product_id')?.clearValidators();
      this.stockForm.get('qty')?.clearValidators();
      this.stockForm.get('product_id')?.updateValueAndValidity();
      this.stockForm.get('qty')?.updateValueAndValidity();
    }
  }
  
  headerColumn = [
    { label: "S.No", table_class: "text-center" },
    { label: "Product Name", table_class: "" },
    { label: "QTY", table_class: "text-center" },
    { label: "Action", table_class: "text-center" },
  ];
  
  
  delete(index: number) {
    this.selectedItems.splice(index, 1);
    this.toastr.success('Produc removed from the list.', '', 'toast-top-right');
  }
  
  
  findName(event: any, type: string) {
    if (type === 'sender_customer_type_id') {
      const existing = this.commonApi.customerCategorySubType.findIndex((row: any) => row.value === event);
      if (existing !== -1) {
        this.stockForm.patchValue({ 'sender_customer_type_name': this.commonApi.customerCategorySubType[existing]['label'] })
      }
    }
    if (type === 'sender_customer_id') {
      const existing = this.commonApi.customerData.findIndex((row: any) => row.value === event);
      if (existing !== -1) {
        this.stockForm.patchValue({ 'sender_customer_name': this.commonApi.customerData[existing]['label'] });
      }
    }
    if (type === 'receiver_customer_type_id') {
      const existing = this.customerCategorySubType.findIndex((row: any) => row.value === event);
      if (existing !== -1) {
        this.stockForm.patchValue({ 'receiver_customer_type_name': this.customerCategorySubType[existing]['label'] });
      }
    }
    if (type === 'receiver_customer_id') {
      const existing = this.customerData.findIndex((row: any) => row.value === event);
      if (existing !== -1) {
        this.stockForm.patchValue({ 'receiver_customer_name': this.customerData[existing]['label'] });
      }
    }
  }
  
  
  
  
  onSubmit(){
    if (this.detailData['return-type'] == 'company') {
      this.stockForm.get('receiver_customer_type_id')?.clearValidators();
      this.stockForm.get('receiver_customer_id')?.clearValidators();
      this.stockForm.get('receiver_customer_id')?.updateValueAndValidity();
      // this.formValidation.removeEmptyControls(this.stockForm)
    }
    
    if (this.stockForm.valid) {
      if (this.stockForm.value.sender_customer_type_id === this.stockForm.value.receiver_customer_type_id) {
        this.toastr.error('Sender and Receiver customer category both are same', '', 'toast-top-right');
        return
      }
      if (this.selectedItems.length === 0) {
        this.toastr.error('Add to list at least one item', '', 'toast-top-right');
        return
      }
      this.api.disabled = true;
      this.stockForm.value.selectedItems = this.selectedItems;
      this.pondFiles = [...this.pondImages, ...this.pondPdf];
      
      const api_path = this.detailData['return-type'] === 'company' ? 'stock-transfer/company-return-create' :'stock-transfer/customer-return-create';
      
      this.api.post(this.stockForm.value, api_path).subscribe(result => {
        if (result['statusCode'] == 200) {
          const pageRedirectUrl = this.detailData['return-type'] === 'company' ? '/apps/loyalty/stock-transfer-list/company/company-stock-return-list' : '/apps/loyalty/stock-transfer-list/company/customer-stock-return-list';
          
          if (this.pondFiles.length > 0) {
            this.uploadService.uploadFile(result['data']['inserted_id'], 'stock-transfer', this.pondFiles, 'Customer Stock Return Bill', this.submodule, pageRedirectUrl)
            this.api.disabled = false;
          }
          else {
            this.api.disabled = false;
            this.router.navigate([pageRedirectUrl]);
            this.toastr.success(result['message'], '', 'toast-top-right');
          }
        }
      });
    }
    else {
      this.formValidation.markFormGroupTouched(this.stockForm)
    }
  }
}
