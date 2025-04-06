import { Component, inject } from '@angular/core';
import { SelectFieldComponent } from "../../../../../../components/select-field/select-field.component";
import { ButtonComponent } from "../../../../../../components/button/button.component";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'organization-setup-step-two',
  imports: [SelectFieldComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './step-two.component.html',
  styleUrl: './step-two.component.scss'
})
export class StepTwoComponent {
  formBuilder =inject(FormBuilder);

  formGroup =this.formBuilder.group({
    name: ['', [Validators.required]],
    country: ['', [Validators.required]],
    sector: ['', [Validators.required]],
    subsector: ['', [Validators.required]],
    segment: ['', [Validators.required]],
    products: ['', [Validators.required]],
  })

  handleSubmit(){
    const values =this.formGroup.value
  }
}
