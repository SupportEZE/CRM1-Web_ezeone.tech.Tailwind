import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ModalHeaderComponent } from '../../../../../shared/components/modal-header/modal-header.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';

@Component({
  selector: 'app-qr-modal',
  imports: [ModalHeaderComponent, CommonModule, SharedModule, MaterialModuleModule],
  templateUrl: './qr-modal.component.html'
})
export class QrModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public modalData: any, public dialogRef: MatDialogRef<QrModalComponent>) {
    }

  closeModal() {
    this.dialogRef.close(); // Closes the dialog
  }
}
