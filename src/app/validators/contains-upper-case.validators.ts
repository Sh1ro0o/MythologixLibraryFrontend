import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function containsUppercase(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value && /\p{Lu}/u.test(value)) {
        return null; //Success return
    }
    else {
        return { noUppercase: true }; //Error return
    }
  };
}