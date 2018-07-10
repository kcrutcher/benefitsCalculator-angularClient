import { Component, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-full-name',
  templateUrl: './full-name.component.html',
  styles: ['.form-inline label { margin-right: 5px; }',
           '.form-inline input { margin-bottom: 5px; }'
    ]
})
export class FullNameComponent {
  @Input() personForm: FormGroup;

  firstName: AbstractControl;
  lastName: AbstractControl;

  FullNameComponent() {
    this.firstName = this.personForm.controls['firstName'];
    this.lastName = this.personForm.controls['lastName'];
  }
}
