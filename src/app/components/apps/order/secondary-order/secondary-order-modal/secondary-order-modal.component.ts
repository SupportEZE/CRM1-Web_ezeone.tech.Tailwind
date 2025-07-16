import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { ModalHeaderComponent } from '../../../../../shared/components/modal-header/modal-header.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../../../core/services/api/api.service';
import { RemoveSpaceService } from '../../../../../core/services/remove-space/removeSpace.service';
import { LogService } from '../../../../../core/services/log/log.service';
import { SweetAlertService } from '../../../../../core/services/alert/sweet-alert.service';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';

@Component({
  selector: 'app-secondary-order-modal',
  imports: [SharedModule, MaterialModuleModule, ModalHeaderComponent, FormsModule, CommonModule],
  templateUrl: './secondary-order-modal.component.html',
})
export class SecondaryOrderModalComponent {
  data:any ={};
  constructor(
    public toastr: ToastrServices,
    @Inject(MAT_DIALOG_DATA) public modalData: any,
    public api:ApiService,
    private logService: LogService,
    public textFormat: RemoveSpaceService,
    private dialogRef: MatDialogRef<SecondaryOrderModalComponent>,
    public alert: SweetAlertService,
    public comanFuncation: ComanFuncationService
  ){
    if(this.modalData.lastPage ==='secondary-order-detail'){
      this.data.status = modalData.status;
    }
  }

  orderStatusOptions = [
    {
      name: 'Approved', value: 'Approved'
    },
    {
      name: 'Reject', value: 'Reject'
    },
    {
      name: 'Hold', value: 'Hold'
    },
  ]
  
  closeModal() {
    this.dialogRef.close(); // Closes the dialog
  }

  submit() {
    this.comanFuncation.statusChange(this.data.status, this.modalData.orderId, this.modalData.status, this.modalData.subModule, 'without-toggle', 'secondary-order/secondary-order-status-change', this.data.status_reason,).subscribe((result: boolean) => {
      if (result) {
        this.dialogRef.close(true);
      }
    });
  }
  
}
