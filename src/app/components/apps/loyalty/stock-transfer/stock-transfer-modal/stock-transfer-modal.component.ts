import { Component, Inject } from '@angular/core';
import { SpkInputComponent } from '../../../../../../@spk/spk-input/spk-input.component';
import { SpkNgSelectComponent } from '../../../../../../@spk/spk-ng-select/spk-ng-select.component';
import { SpkFlatpickrComponent } from '../../../../../../@spk/spk-flatpickr/spk-flatpickr.component';
import { CommonModule } from '@angular/common';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { ActivatedRoute, Router, } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { ApiService } from '../../../../../core/services/api/api.service';
import { FormValidationService } from '../../../../../utility/form-validation';
import { CommonApiService } from '../../../../../shared/services/common-api.service';
import { UploadFileService } from '../../../../../shared/services/upload.service';
import { ModuleService } from '../../../../../shared/services/module.service';
import { LOGIN_TYPES } from '../../../../../utility/constants';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalHeaderComponent } from '../../../../../shared/components/modal-header/modal-header.component';
import { FilePondModule } from 'ngx-filepond';

@Component({
  selector: 'app-stock-transfer-modal',
  imports: [SpkInputComponent, SpkNgSelectComponent, SharedModule, MaterialModuleModule, CommonModule, ReactiveFormsModule, ModalHeaderComponent, FilePondModule],
  templateUrl: './stock-transfer-modal.component.html'
})

// SpkFlatpickrComponent
export class StockTransferModalComponent {
  skLoading:boolean = false;
  stockForm!: FormGroup;
  statusForm!: FormGroup;
  today = new Date();
  pondPdf: any[] = [];
  pondImages: any[] = [];
  pondOptions = this.getPondOptions('image');
  pondDocumentOptions = this.getPondOptions('pdf');
  pondFiles: any[] = [];
  
  statusList = [
    // { label: 'Pending', value: 'Pending' },
    { label: 'Received', value: 'Received' },
    { label: 'Reject', value: 'Reject' }
  ];
  
  stockStatusList = [
    // { label: 'Pending', value: 'Pending' },
    { label: 'Approved', value: 'Approved' },
    { label: 'Reject', value: 'Reject' }
  ];
  
  
  constructor(private toastr: ToastrServices, public api: ApiService, private formValidation: FormValidationService, private fb: FormBuilder, public uploadService: UploadFileService, public commonApi: CommonApiService,  @Inject(MAT_DIALOG_DATA,) public modalData: any, public dialogRef: MatDialogRef<StockTransferModalComponent>)
  {
    
  }
  
  ngOnInit() { 
    this.stockForm = this.fb.group({
      grn_status: ['', Validators.required],
      remarks: ['']
    });
    
    this.statusForm = this.fb.group({
      status: ['', Validators.required],
      remarks: ['']
    });
    
    
    this.stockForm.get('grn_status')?.valueChanges.subscribe(grn_status => {
      const remarksControl = this.stockForm.get('remarks');
      if (grn_status === 'Reject') {
        remarksControl?.setValidators([Validators.required]);
      } else {
        remarksControl?.clearValidators();
      }
      remarksControl?.updateValueAndValidity();
    });
    
    this.stockForm.get('status')?.valueChanges.subscribe(status => {
      const remarksControl = this.stockForm.get('remarks');
      if (status === 'Reject') {
        remarksControl?.setValidators([Validators.required]);
      } else {
        remarksControl?.clearValidators();
      }
      remarksControl?.updateValueAndValidity();
    });
    
  }
  
  
  closeModal() {
    this.dialogRef.close(); // Closes the dialog
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
  
  
  onSubmit(){
    if(this.stockForm.valid){
      this.stockForm.value._id = this.modalData._id;
      if (this.stockForm.value.grn_status === 'Received' ){
        this.pondFiles = [...this.pondImages, ...this.pondPdf];
        if (this.pondFiles.length === 0){
          this.toastr.error('Bill image is required', '', 'toast-top-right');
          return;
        }
      }
      this.api.disabled = true;
      this.api.patch(this.stockForm.value, "invoice/status").subscribe(result => {
        if (result['statusCode'] == 200) {
          if (this.pondFiles.length > 0) {
            this.uploadService.uploadFile(this.modalData._id, 'invoice', this.pondFiles, 'GRN Bill Copy', this.modalData.submodule, undefined,
              () => this.dialogRef.close(true))
            this.api.disabled = false;
          }
          else{
            this.api.disabled = false;
            this.toastr.success(result['message'], '', 'toast-top-right');
            this.dialogRef.close(true)
          }
         
        }
      });
    }
    else{
      this.formValidation.markFormGroupTouched(this.stockForm)
    }
  }
  
  submitStatus() {
    if (this.statusForm.valid) {
      this.api.disabled = true;
      this.statusForm.value._id = this.modalData._id
      this.api.patch(this.statusForm.value, "stock-transfer/status").subscribe(result => {
        if (result['statusCode'] == 200) {
          this.api.disabled = false;
          this.toastr.success(result['message'], '', 'toast-top-right');
          this.dialogRef.close(true)
        }
      });
    }
    else {
      this.formValidation.markFormGroupTouched(this.statusForm)
    }
  }
}
