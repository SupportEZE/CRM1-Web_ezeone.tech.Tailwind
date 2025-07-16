import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root' // This makes the service available application-wide
})
export class FormValidationService { 
  constructor(private toastr: ToastrService) {}
  
  // Function to mark form controls as touched
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control: AbstractControl) => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
        control.updateValueAndValidity();
      }
    });
  }
  
  
  /* Returns validators based on field properties*/
  getValidators(field: any): ValidatorFn[] {
    let validators: ValidatorFn[] = [];
    
    if (field.required) {
      validators.push(Validators.required);
    }
    
    if (field.edit) {
      validators.push(Validators.required);
    }
    
    if (field.type === 'NUMBER') {
      if (field.min_length) {
        validators.push(Validators.min(Math.pow(10, field.min_length - 1)));
      }
      if (field.max_length) {
        validators.push(Validators.max(Math.pow(10, field.max_length) - 1));
      }
      validators.push(this.numberLengthValidator(field.min_length, field.max_length));
    } else {
      if (field.min_length) {
        validators.push(Validators.minLength(field.min_length));
      }
      if (field.max_length) {
        validators.push(Validators.maxLength(field.max_length));
      }
    }
    if (field.pattern) {
      validators.push(Validators.pattern(field.pattern));
    }
    if (field.type === 'EMAIL') {
      validators.push(this.emailValidator());
    }
    return validators;
  }
  
  /* Custom validator to enforce exact length for numbers*/
  numberLengthValidator(minLength: number, maxLength: number): ValidatorFn {
    return (control: AbstractControl) => {
      if (control.value) {
        const value = control.value.toString();
        if (value.length < minLength || value.length > maxLength) {
          return { numberLength: true };
        }
      }
      return null;
    };
  }
  
  /* Custom email validator format */
  emailValidator(): ValidatorFn {
    return Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
  }
  
  
  // Remove blank form controls
  removeEmptyControls(form: FormGroup): void {
    Object.keys(form.controls).forEach((key) => {
      const control = form.get(key);
      if (control?.value === '' || control?.value == null) {
        form.removeControl(key);
      }
    });
  }

  cleanedPayload(obj: any): any {
    return Object.entries(obj)
      .filter(([_, value]) => value !== '' && value !== null && value !== undefined)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  }
  
  removeEmptyFields(obj: Record<string, any>): void {
    Object.keys(obj).forEach(key => {
      const val = obj[key];
      if (val === null || val === undefined || val === '') {
        delete obj[key];
      }
    });
  }
  
  
  handleInputFilter(event: KeyboardEvent, type: 'mobile' | 'number' | 'alphabet' | 'noSpace' | 'custom' = 'custom') {
    const allowedKeys: Record<string, RegExp> = {
      mobile: /^[6-9][0-9]{0,9}$/,
      number: /^[0-9]*$/,
      alphabet: /^[a-zA-Z]*$/,
      noSpace: /^[^\s]*$/,
      custom: /^[a-zA-Z0-9\s]*$/
    };
    
    const input = event.target as HTMLInputElement;
    const nextValue = input.value + event.key;
    
    if (event.ctrlKey || event.metaKey || event.key === 'Backspace' || event.key === 'Tab') {
      return;
    }
    
    const pattern = allowedKeys[type];
    if (!pattern.test(nextValue)) {
      event.preventDefault();
    }
  }
  
}
