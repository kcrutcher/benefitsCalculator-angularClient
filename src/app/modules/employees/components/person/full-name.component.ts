import { Component, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-full-name',
  templateUrl: './full-name.component.html',
  styleUrls: []
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
