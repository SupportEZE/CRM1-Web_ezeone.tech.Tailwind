import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared.module';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { ApiService } from '../../../../../core/services/api/api.service';
import { MatDialogRef } from '@angular/material/dialog';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import moment from 'moment'; 
import { DateService } from '../../../../../shared/services/date.service';
import { CommonApiService } from '../../../../../shared/services/common-api.service';
import { ModalHeaderComponent } from '../../../../../shared/components/modal-header/modal-header.component';

@Component({
  selector: 'app-holiday-add',
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule, SharedModule, ModalHeaderComponent, ReactiveFormsModule, MaterialModuleModule],
  templateUrl: './holiday-add.component.html'
})
export class HolidayAddComponent {
  holidayForm: FormGroup;
  states:any = []; 
  today= new Date();
  
  constructor(private fb: FormBuilder, public toastr:ToastrServices, public api:ApiService, private dialogRef: MatDialogRef<HolidayAddComponent>, private dateService: DateService,public CommonApiService: CommonApiService) {
    this.holidayForm = this.fb.group({
      holiday_type: ['National', Validators.required],
      holiday_date: ['', Validators.required],
      holiday_name: ['', Validators.required],
      regional_state: ['']
    });
    
    
    
    this.CommonApiService.getStates()
  }
  
  // get isRegional() {
  //   return this.holidayForm.get('holiday_type')?.value === 'Regional';
  // }
  
  
  
  close() {
    this.dialogRef.close(); // Closes the dialog
  }
  
  
  get f() {
    return this.holidayForm.controls;
  }
  
  onSubmit() {
    this.holidayForm.get('holiday_type')?.valueChanges.subscribe(value => {
      const stateControl = this.holidayForm.get('regional_state');
      if (value === 'Regional') {
        stateControl?.setValidators([Validators.required]);
      } else {
        stateControl?.clearValidators();
        stateControl?.setValue('');
      }
      stateControl?.updateValueAndValidity();
    });
    if (this.holidayForm.invalid) {
      this.holidayForm.markAllAsTouched();
      return;
    }
    else{
      this.api.disabled = true;
      this.holidayForm.value.holiday_date =  this.dateService.formatToYYYYMMDD(this.holidayForm.value.holiday_date);
      this.api.post(this.holidayForm.value, 'holiday/create').subscribe(result => {
        if(result['statusCode'] == 200){
          this.api.disabled = false;
          this.toastr.success(result['message'], '', 'toast-top-right');
          this.dialogRef.close(true);
          this
        }
      });
    }
  }
  
  closeModal() {
    this.dialogRef.close(); // Closes the dialog
  }
}
