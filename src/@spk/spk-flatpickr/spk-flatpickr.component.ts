import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { FormControl, FormGroupDirective, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { FlatpickrDefaults, FlatpickrModule } from 'angularx-flatpickr';
import { MaterialModuleModule } from '../../app/material-module/material-module.module';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DateService } from '../../app/shared/services/date.service';

@Component({
  selector: 'spk-flatpickr',
  standalone: true,
  imports: [FlatpickrModule, MaterialModuleModule, CommonModule, FormsModule, ReactiveFormsModule],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SpkFlatpickrComponent),
    multi: true
  }],
  templateUrl: './spk-flatpickr.component.html',
  styleUrl: './spk-flatpickr.component.scss'
})
export class SpkFlatpickrComponent {
  disablePicker: boolean = false;
  @Input() fieldReq?: boolean = false;
  @Input() label!: string;
  @Input() class: string = ''; 
  @Input() dateFormat: string = ''; 
  @Input() min!: Date; 
  @Input() max!: Date; 

  @Input() placeholder: string = ''; 
  @Input() mode!: 'single' | 'multiple' | 'range';
  @Output() dateChange = new EventEmitter<string | string[]>();
  @Input() control!: FormControl;
  @Input() formControlName!: string; 
  
  private isUpdating = false;
  private onChange: (value: any) => void = () => { };
  private onTouched: () => void = () => { };

  constructor(private formGroupDirective: FormGroupDirective, public date:DateService) {}

  ngOnInit() {
    if (this.formGroupDirective.form) {
      this.control = this.formGroupDirective.form.get(this.formControlName) as FormControl;
    }
    // Convert ISO string to Local Date before displaying
    // if (this.control?.value && typeof this.control.value === 'string') {
    //   this.control.setValue(this.date.convertUTCtoLocal(this.control.value));
    // }
  }


  emitDateChange() {
    this.dateChange.emit(this.control.value);
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /** Required for ControlValueAccessor */
  writeValue(value: any): void {
    if (value !== undefined && this.control.value !== value) {
      this.isUpdating = true; // Prevent recursion
      this.control.setValue(value, { emitEvent: false });
      this.isUpdating = false;
    }
  }


  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.control.valueChanges.subscribe(value => {
      if (!this.isUpdating) {
        this.onChange(value);
      }
    });
  }

  onBlur(): void {
    this.onTouched();
  }
  // onDateSelected(event: MatDatepickerInputEvent<Date>) {
  //   if (event.value) {
  //     // Convert Date object to ISO string before saving
  //     const isoDate = event.value.toISOString(); // Convert back to UTC
  //     this.control.setValue(isoDate);
  //     this.control.markAsTouched();
  //     this.control.markAsDirty();
  //   }
  // }

  onDateSelected(event: MatDatepickerInputEvent<Date>) {
  if (event.value) {
    // Ensure only the date is retained (remove time)
    const selectedDate = event.value;
    // const localDate = new Date(
    //   selectedDate.getFullYear(),
    //   selectedDate.getMonth(),
    //   selectedDate.getDate()
    // );


    // Update the form control
    this.control.setValue(event.value);
    this.control.markAsTouched();
    this.emitDateChange();
  }
}

}
