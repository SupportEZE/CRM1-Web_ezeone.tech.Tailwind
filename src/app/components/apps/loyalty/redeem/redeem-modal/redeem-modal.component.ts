import { Component, Inject } from '@angular/core';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormValidationService } from '../../../../../utility/form-validation';
import { ApiService } from '../../../../../core/services/api/api.service';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { LogService } from '../../../../../core/services/log/log.service';
import { Validators } from 'ngx-editor';
import { SharedModule } from '../../../../../shared/shared.module';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { ModalHeaderComponent } from '../../../../../shared/components/modal-header/modal-header.component';
import { CommonModule } from '@angular/common';
import { RemoveSpaceService } from '../../../../../core/services/remove-space/removeSpace.service';
import { AuthService } from '../../../../../shared/services/auth.service';

@Component({
  selector: 'app-redeem-modal',
  imports: [SharedModule, MaterialModuleModule, ModalHeaderComponent, FormsModule, CommonModule],
  templateUrl: './redeem-modal.component.html',
})
export class RedeemModalComponent {
  
  data:any ={};
  today= new Date();
  orgData:any ={}
  
  
  
  constructor(public toastr: ToastrServices, @Inject(MAT_DIALOG_DATA) public modalData: any, public dialogRef: MatDialogRef<RedeemModalComponent>, public api:ApiService, private fb: FormBuilder, private formValidation: FormValidationService, private logService: LogService, private authService: AuthService, public textFormat: RemoveSpaceService,){
    
    if(this.modalData.status_type ==='redeem_status'){
      this.data.status = modalData.status;
    }
    if (this.modalData.status_type === 'transfer_status' || this.modalData.status_type === 'voucher_status'){
      this.data.transfer_status = modalData.status;
    }
    this.orgData = this.authService.getUser();
  }
  
    
  submit(){
    this.data._id = this.modalData._id
    this.api.disabled = true
    let api = this.modalData.status_type ==='redeem_status' ? 'redeem/status' : 'redeem/transfer';
    this.api.post(this.data, api).subscribe(result => {
      if(result['statusCode'] == 200){
        this.api.disabled = false;
        this.toastr.success(result['message'], '', 'toast-top-right');
        this.dialogRef.close(true)
      }
    });
  }
  
  closeModal() {
    this.dialogRef.close(); // Closes the dialog
  }
  
}
