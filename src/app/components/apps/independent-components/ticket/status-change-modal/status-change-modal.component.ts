import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../../../core/services/api/api.service';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { SharedModule } from '../../../../../shared/shared.module';
import { ModalHeaderComponent } from '../../../../../shared/components/modal-header/modal-header.component';


@Component({
  selector: 'app-status-change-modal',
  imports: [ReactiveFormsModule,MaterialModuleModule,SharedModule,CommonModule,FormsModule,ModalHeaderComponent],
  templateUrl: './status-change-modal.component.html',
})
export class TicketStatusChangeModalComponent {
  data:any ={};
  statusOptions = [{name:'Complete'},{name:'Cancel'}]
  
  constructor(@Inject(MAT_DIALOG_DATA) public modalData: any,private dialogRef: MatDialogRef<TicketStatusChangeModalComponent>,public api: ApiService,public toastr: ToastrServices,public comanFuncation: ComanFuncationService){
    this.data.status = modalData.status ? modalData.status : 'Complete';
    this.data.reason = modalData.reason;
    this.data._id = modalData._id;
  }
  
  statusChange(){
    this.api.disabled = true;      
    this.api.post(this.data,'ticket/close').subscribe((result: any) => {
      if (result['statusCode'] === 200) {
        this.toastr.success(result['message'], '', 'toast-top-right');
        this.api.disabled = false;      
        this.dialogRef.close(true);
      }
    });
  }
  
  close() {
    this.dialogRef.close(); // Closes the dialog
  }
}
