import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared.module';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { SpkInputComponent } from '../../../../../../@spk/spk-input/spk-input.component';
import { FilePondModule } from 'ngx-filepond';
import { ApiService } from '../../../../../core/services/api/api.service';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { CommonApiService } from '../../../../../shared/services/common-api.service';
import { ModuleService } from '../../../../../shared/services/module.service';
import { UploadFileService } from '../../../../../shared/services/upload.service';
import { FormValidationService } from '../../../../../utility/form-validation';
import { ActivatedRoute, Router } from '@angular/router';
import { SpkFlatpickrComponent } from '../../../../../../@spk/spk-flatpickr/spk-flatpickr.component';
import { SpkNgSelectComponent } from '../../../../../../@spk/spk-ng-select/spk-ng-select.component';

@Component({
  selector: 'app-scheme-add',
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModuleModule,
    SpkInputComponent,
    FilePondModule,
    SpkFlatpickrComponent,
    SpkNgSelectComponent
  ],
  templateUrl: './scheme-add.component.html',
})
export class SchemeAddComponent {
  
  schemeForm: FormGroup = new FormGroup({});
  pageType:any = 'add'
  skLoading:boolean = false
  modules:any={};
  pondFiles: any[] = [];
  pondBannerFiles: any[] = [];
  today= new Date();
  constructor(
    public api: ApiService,
    public toastr: ToastrServices,
    public CommonApiService: CommonApiService,
    private moduleService : ModuleService,
    public uploadService: UploadFileService,
    private router : Router,
    public route: ActivatedRoute,
    private formValidation: FormValidationService,
    private fb: FormBuilder
  ){
    
  }
  
  ngOnInit() {
    this.CommonApiService.getProduct();
    const modules = this.moduleService.getModuleByName('Scheme');
    if (modules) {
      this.modules = modules;
    }
    
    this.schemeForm = this.fb.group({
      product_data: [[], Validators.required],  // Notice: binding to product_data here
      date_from: ['', Validators.required],
      date_to: ['', Validators.required],
      description: ['', Validators.required],
    });      
  }
  
  onDateChange() {
    this.schemeForm.get('end_date')?.reset();
  }
  
  onProductChange(selectedValues: any[]) {
    const selectedProducts = this.CommonApiService.productList.filter((item: any) =>
      selectedValues.includes(item.value)
  ).map((product: any) => ({
    product_id: product.value,
    product_name: product.label
  }));
  this.schemeForm.patchValue({ product_data: selectedProducts });
}


pondOptions = this.getPondOptions('image');
getPondOptions(type: 'image' | 'pdf'): any {
  const commonOptions = {
    allowFileTypeValidation: true,
    labelIdle: "Click or drag files here to upload...",
    maxFiles: 1,
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
      allowMultiple: false,
      acceptedFileTypes: ['image/jpeg', 'image/png', 'image/jpg'],
      maxFileSize: '2MB',
      allowImageValidateSize: true,
      labelFileTypeNotAllowed: 'Only PNG and JPEG files are allowed',
      fileValidateTypeLabelExpectedTypes: 'Allowed: PNG, JPEG',
      labelImageValidateSizeTooSmall: 'Image is too small. Min: {minWidth}×{minHeight}',
      labelImageValidateSizeTooBig: 'Image is too large. Max: {maxWidth}×{maxHeight}',
    };
  }
}

onFileProcessed(event: any, type: string) {
  const file = event.file.file;
  Object.assign(file, { image_type: type });
  if (type === 'image') {
    this.pondBannerFiles = [...(this.pondBannerFiles || []), file];
  }
}

onFileRemove(event: any, type: string) {
  const file = event.file.file;
  if (type === 'image') {
    const index = this.pondBannerFiles.findIndex(f => f.name === file.name && f.size === file.size);
    if (index > -1) {
      this.pondBannerFiles.splice(index, 1);
    }
  }
}

onSubmit() {
  if (this.schemeForm.valid) {
    const raw = this.schemeForm.value;
    this.pondFiles = [...this.pondBannerFiles];
    if (this.pondFiles.length === 0 && this.pageType === 'add') {
      this.toastr.error('Please upload at least one file.', '', 'toast-top-right');
      return;
    }
    // Convert product ids to product_id + product_name pair
    const productDataFormatted = raw.product_data.map((id: string) => {
      const product = this.CommonApiService.productList.find((p: any) => p.value === id);
      return {
        product_id: product?.value,
        product_name: product?.label
      };
    });
    
    const payload = {
      date_from: raw.date_from,
      date_to: raw.date_to,
      description: raw.description,
      product_data: productDataFormatted
    };
    
    this.api.disabled = true;
    
    this.api.post(payload, 'order/create-scheme').subscribe(result => {
      if (result['statusCode'] == 200) {
        if (this.pondFiles.length > 0) {
          this.uploadService.uploadFile(
            result['data']['inserted_id'],
            'order',
            this.pondFiles,
            'Order Scheme Images',
            this.modules,
            '/apps/sfa/scheme'
          );
        } else {
          this.api.disabled = false;
          this.router.navigate(['/apps/sfa/scheme']);
          this.toastr.success(result['message'], '', 'toast-top-right');
          this.schemeForm.reset();
        }
      }
    });
  } else {
    this.formValidation.markFormGroupTouched(this.schemeForm);
  }
}

}
