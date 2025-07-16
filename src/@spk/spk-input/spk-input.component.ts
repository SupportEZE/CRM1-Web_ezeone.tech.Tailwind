import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroupDirective, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MaterialModuleModule } from '../../app/material-module/material-module.module';
import { FormValidationService } from '../../app/utility/form-validation';


@Component({
  selector: 'spk-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModuleModule],
  templateUrl: './spk-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SpkInputComponent),
      multi: true,
    }
  ]
})
export class SpkInputComponent implements ControlValueAccessor {
  @ViewChild('inputRef') inputElement!: ElementRef<HTMLInputElement>; // Add this

  @Input() control!: FormControl;
  @Input() fieldReq?: boolean = false;
  @Input() label!: string;
  @Input() class!: string;
  @Input() type: string = 'text';
  @Input() errorMessage: string = 'This field is required';
  @Input() formControlName!: string;
  @Output() valueChange = new EventEmitter<any>();
  @Input() maxlength?: number;
  @Input() minlength?: number;


  private isUpdating = false;
  
  
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
  
  
  constructor(private formGroupDirective: FormGroupDirective, public cdr:ChangeDetectorRef, public formValidation: FormValidationService) {
  }
  

  focusInput(): void {
    if (this.inputElement?.nativeElement) {
      this.inputElement.nativeElement.focus();
    }
  }
  
  ngOnInit() {
    if (this.formGroupDirective.form) {
      this.control = this.formGroupDirective.form.get(this.formControlName) as FormControl;
    }
    
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
  
  onInputChange(event: any): void {
    const inputEl = event.target as HTMLInputElement;
    let inputValue: any = inputEl.value;
    if (this.type === 'number') {
      inputValue = inputValue === '' ? null : Number(inputValue);
      this.formValidation.handleInputFilter(event, this.type)
    }
    this.isUpdating = true;
    this.control.setValue(inputValue, { emitEvent: false });
    this.isUpdating = false;
    this.onChange(inputValue);
    this.valueChange.emit(inputValue);
  }
  
  
  preventMinus(event: KeyboardEvent) {
    if (this.type === 'number') {
      if (event.key === '-' || event.key === 'Minus') {
        event.preventDefault();
      }
    }
  }
  
  blockNegativePaste(event: ClipboardEvent) {
    if (this.type === 'number') {
      const pasteData = event.clipboardData?.getData('text') || '';
      if (pasteData.includes('-')) {
        event.preventDefault();
      }
    }
  }
}
