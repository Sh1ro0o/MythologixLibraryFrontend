import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function containsLowercase(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value && /\p{Ll}/u.test(value)) {
        return null; //Success return
    }
    else {
        return { noLowercase: true }; //Error return
    }
  };
}