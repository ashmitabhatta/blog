import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Pipe({
  name: 'arrayconvert',
  standalone:true,
})
export class PipesPipe implements PipeTransform {

  transform(value: AbstractControl): FormGroup {
    return value as FormGroup;
  }

}
