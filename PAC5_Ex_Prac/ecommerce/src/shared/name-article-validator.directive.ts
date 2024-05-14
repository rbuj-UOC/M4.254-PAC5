import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

/** A hero's name can't match the given regular expression */
export function NameArticleValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}