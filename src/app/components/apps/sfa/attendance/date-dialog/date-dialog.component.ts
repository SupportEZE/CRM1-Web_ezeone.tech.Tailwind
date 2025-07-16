import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { FormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker'; // Import timepicker module
import { SharedModule } from '../../../../../shared/shared.module';
import moment from 'moment';

@Component({
  selector: 'app-date-dialog',
  imports: [MaterialModuleModule,
    FormsModule,
    SharedModule,
    NgxMaterialTimepickerModule],
    templateUrl: './date-dialog.component.html',
  })
  export class DateDialogComponent {
    selectedStartTime: string | undefined;
    selectedStopTime: string | undefined;
    
    todayDate :any= new Date();
    constructor(public dialogRef: MatDialogRef<DateDialogComponent>,@Inject(MAT_DIALOG_DATA) public modalData: any) {
      modalData.attend_date = moment(modalData.attend_date).format('d MMM y');
      this.todayDate = moment(this.todayDate).format('d MMM y');
    }
    closeDialog(): void {
      this.dialogRef.close();
    }
    submitTime(): void {
      this.dialogRef.close({punch_in:this.selectedStartTime,punch_out:this.selectedStopTime});
    }
    goToLeaveAdd(){
      this.dialogRef.close({leave:true});
    }
  }
  