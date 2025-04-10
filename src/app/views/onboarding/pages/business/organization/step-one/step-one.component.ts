import { Component, inject } from '@angular/core';
import { SelectFieldComponent } from "../../../../../../components/select-field/select-field.component";
import { ButtonComponent } from "../../../../../../components/button/button.component";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'organization-setup-step-one',
  imports: [SelectFieldComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './step-one.component.html',
  styleUrl: './step-one.component.scss'
})
export class StepOneComponent {
  private _router =inject(Router)
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
    this._router.navigateByUrl('/onboarding/business/organization-setup/step-two');
  }

  back(){
    this._router.navigateByUrl('/onboarding/business/organization-setup');
  }
}
