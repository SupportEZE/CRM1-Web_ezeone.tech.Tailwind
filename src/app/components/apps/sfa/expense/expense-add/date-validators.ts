import { AbstractControl, ValidatorFn } from '@angular/forms';

export class DateValidators {
  static minDate(min: Date): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) return null;
      const controlDate = new Date(control.value);
      return controlDate < min ? { minDate: { requiredDate: min, actual: controlDate } } : null;
    };
  }

  static maxDate(max: Date): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) return null;
      const controlDate = new Date(control.value);
      return controlDate > max ? { maxDate: { requiredDate: max, actual: controlDate } } : null;
    };
  }


  static startToEndDateValidator(startKey: string, endKey: string): ValidatorFn {
  return (group: AbstractControl): { [key: string]: any } | null => {
    const startControl = group.get(startKey);
    const endControl = group.get(endKey);

    if (!startControl || !endControl) return null;

    const start = new Date(startControl.value);
    const end = new Date(endControl.value);

    if (!start || !end) return null;

    if (end < start) {
      endControl.setErrors({
        ...(endControl.errors || {}),
        ['dateOrderInvalid']: true
      });
      return { ['dateOrderInvalid']: true };
    } else {
      if (endControl.errors?.['dateOrderInvalid']) {
        const { ['dateOrderInvalid']: _, ...otherErrors } = endControl.errors;
        endControl.setErrors(Object.keys(otherErrors).length ? otherErrors : null);
      }
      return null;
    }
  };
}
}

