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
import { HeaderComponent } from '../../../../../shared/components/header/header.component';
import { SweetAlertService } from '../../../../../core/services/alert/sweet-alert.service';

@Component({
  selector: 'app-purchase-modal',
  imports: [SharedModule, MaterialModuleModule, CommonModule, ReactiveFormsModule, FilePondModule, ModalHeaderComponent],
  templateUrl: './purchase-modal.component.html'
})

// SpkFlatpickrComponent
export class PurchaseModalComponent {
  skLoading:boolean = false;
  statusForm!: FormGroup;
  today = new Date();
  pondPdf: any[] = [];
  pondImages: any[] = [];
  pondFiles: any[] = [];
  
  statusList = [
    // { label: 'Pending', value: 'Pending' },
    { label: 'Approved', value: 'Approved' },
    { label: 'Reject', value: 'Reject' }
  ];
  
  
  
  constructor(private toastr: ToastrServices, public alert:SweetAlertService, public api: ApiService, private formValidation: FormValidationService, private fb: FormBuilder, public uploadService: UploadFileService, public commonApi: CommonApiService,  @Inject(MAT_DIALOG_DATA,) public modalData: any, public dialogRef: MatDialogRef<PurchaseModalComponent>)
  {
    
  }
  
  ngOnInit() { 
    this.statusForm = this.fb.group({
      status: ['', Validators.required],
      claim_point: [{value: '', disabled: true }],
      approved_point: [''],
      _id: [''],
      remarks: ['']
    });
    
    this.statusForm.get('status')?.valueChanges.subscribe(status => {
      const remarksControl = this.statusForm.get('remarks');
      if (status === 'Reject') {
        remarksControl?.setValidators([Validators.required]);
      } else {
        remarksControl?.clearValidators();
      }
      remarksControl?.updateValueAndValidity();
    });
    
    this.statusForm.get('status')?.valueChanges.subscribe(status => {
      const approvedControl = this.statusForm.get('approved_point');
      if (status === 'Approved') {
        approvedControl?.setValidators([Validators.required]);
      } else {
        approvedControl?.clearValidators();
      }
      approvedControl?.updateValueAndValidity();
    });
    
    this.statusForm.patchValue({'claim_point':this.modalData.claim_point});
    this.statusForm.patchValue({'_id':this.modalData._id});
    console.log(this.statusForm.value, 'value');
    
  }
  
  
  closeModal() {
    this.dialogRef.close(); // Closes the dialog
  }
  
  submitStatus() {
    if(this.statusForm.value.status === 'Approved'){
      if(Number(this.statusForm.value.approved_point ) > Number(this.modalData.claim_point)){
        this.toastr.error('Maximum point transferred ' + this.modalData.claim_point, '', 'toast-top-right');
        return
      }
    }
    
    if (this.statusForm.valid) {
      this.alert.confirm("Are you sure?", "You want to transferred point", "Yes it!").then(result => {
        if (result.isConfirmed) {
          this.api.disabled = true;
          const formValue = this.statusForm.getRawValue();
          let payload: any = { status: formValue.status };
          payload._id = formValue._id;
          if (formValue.status === 'Approved') {
            payload.claim_point = formValue.claim_point;
            payload.approved_point = formValue.approved_point;
          } else if (formValue.status === 'Reject') {
            payload.remarks = formValue.remarks;
          }
          this.api.patch(payload, "purchase/update-status").subscribe(result => {
            if (result['statusCode'] == 200) {
              this.api.disabled = false;
              this.toastr.success(result['message'], '', 'toast-top-right');
              this.dialogRef.close(true)
            }
          });
        }
      })
    }
    else {
      this.formValidation.markFormGroupTouched(this.statusForm)
    }
  }
}
