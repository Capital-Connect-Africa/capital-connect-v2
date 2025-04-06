import { Component } from '@angular/core';
import { SelectFieldComponent } from "../../../../../../components/select-field/select-field.component";
import { ButtonComponent } from "../../../../../../components/button/button.component";

@Component({
  selector: 'organization-setup-step-one',
  imports: [SelectFieldComponent, ButtonComponent],
  templateUrl: './step-one.component.html',
  styleUrl: './step-one.component.scss'
})
export class StepOneComponent {

}
