import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function stringsMatchValidator(controlName1: string, controlName2: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const value1 = formGroup.get(controlName1)?.value;
    const value2 = formGroup.get(controlName2)?.value;

    if (value1 === value2) {
      return null;
    }

    return { stringsMismatch: true };
  };
}