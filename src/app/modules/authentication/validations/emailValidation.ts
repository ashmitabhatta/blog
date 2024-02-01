import {
  AbstractControl,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';
import { SignupService } from '../service/signup.service';
import { catchError, map } from 'rxjs';
export function customemailValidation(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email: string = control.value;
    if (!email) {
      return null;
    }
    const isValidEmail =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
    return isValidEmail ? null : { invalidEmail: true };
  };
}
export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmpassword = control.get('confirmpassword')?.value;
  if (password === confirmpassword) {
    return null;
  } else {
    return { PasswordNoMatch: true };
  }
};
