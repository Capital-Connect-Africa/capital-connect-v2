import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectButtonComponent } from "../../../../core/components/select-button/select-button.component";
import { USER_ROLES } from '../../../../core/enums/user.roles.enum';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, SelectButtonComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('1s ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
})

export class SignupComponent {
  isTyping = false;
  animationState = true;
  Roles =USER_ROLES;
  step =1
  helperText ='To begin this journey, tell us what type of account you’d be opening.'

  startTyping() {
    this.isTyping = true;
  }

  private _formBuilder = inject(FormBuilder);

  signUpForm = this._formBuilder.group({
    password: ['', Validators.required],
    lastName: ['', Validators.required],
    firstName: ['', Validators.required],
    accountType: ['user', Validators.required],
    confirmPassword: ['', Validators.required],
    hasAcceptedTerms: ['', Validators.required],
    hasAcceptedPrivacyPolicy: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  })

  handleRoleSelection(value:string){
    this.step =1;
    this.signUpForm.get('accountType')?.setValue(value);
  }
}
