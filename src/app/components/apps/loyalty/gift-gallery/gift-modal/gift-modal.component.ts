import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ModalHeaderComponent } from '../../../../../shared/components/modal-header/modal-header.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpkInputComponent } from '../../../../../../@spk/spk-input/spk-input.component';
import { ApiService } from '../../../../../core/services/api/api.service';
import { FormValidationService } from '../../../../../utility/form-validation';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { LogService } from '../../../../../core/services/log/log.service';
import { SpkFlatpickrComponent } from '../../../../../../@spk/spk-flatpickr/spk-flatpickr.component';

@Component({
  selector: 'app-gift-modal',
  imports: [ModalHeaderComponent, CommonModule, SharedModule, MaterialModuleModule, SpkInputComponent, SpkFlatpickrComponent, ReactiveFormsModule],
  templateUrl: './gift-modal.component.html'
})
export class GiftModalComponent {
  voucherForm!: FormGroup;
  originalData: any = {};
  formIniatialized: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public modalData: any, public toastr: ToastrServices, private formValidation: FormValidationService, private fb: FormBuilder, private logService: LogService, public api:ApiService, public dialogRef: MatDialogRef<GiftModalComponent>) {
    this.formIniatialized = true;

    }



  ngOnInit(){
    this.voucherForm = this.fb.group({
      voucher_code: ['', Validators.required],
      expiry_date: ['', Validators.required],
    });


    this.formIniatialized = false
  }

  onSubmit(){
    if (this.voucherForm.valid) {
      this.voucherForm.value.gift_id = this.modalData.gift_id;

      const isEditMode = true;
      // if (isEditMode) {
      //   const noChanges = this.logService.logActivityOnUpdate(
      //     isEditMode,
      //     this.originalData,
      //     this.voucherForm.value,
      //     this.modalData.submodule.sub_module_id ? this.modalData.submodule.sub_module_id : this.modalData.submodule.module_id,
      //     this.modalData.submodule.title,
      //     'update',
      //     this.modalData.gift_id || null,
      //     () => { }
      //   );
      //   if (noChanges) {
      //     this.api.disabled = false;
      //     this.toastr.warning('No changes detected', '', 'toast-top-right')
      //     return;
      //   }

      // }


      this.api.disabled = true;
      this.api.post(this.voucherForm.value, 'gift-gallery/create-voucher').subscribe(result => {
        if (result['statusCode'] == 200) {
          this.dialogRef.close(true)
          this.api.disabled = false;
          this.toastr.success(result['message'], '', 'toast-top-right');
        }
      });
    }
    else {
      this.formValidation.markFormGroupTouched(this.voucherForm);
    }
  }

  closeModal() {
    this.dialogRef.close(); // Closes the dialog
  }
}

