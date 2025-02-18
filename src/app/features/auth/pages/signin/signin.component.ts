import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SelectButtonComponent } from '../../../../core/components/select-button/select-button.component';
import { USER_ROLES } from '../../../../core/enums/user.roles.enum';
import { InputFieldComponent } from '../../../../core/components/fields/input-field/input-field.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { SignupDetails } from '../../../../core/interfaces/signup.details.interface';
import { LoaderComponent } from "../../../../core/components/loader/loader.component";
import { LoadingService } from '../../../../core/services/loading.service';

@Component({
  selector: 'app-signup',
  imports: [
    RouterLink,
    SelectButtonComponent,
    CommonModule,
    ReactiveFormsModule,
    InputFieldComponent,
    ButtonComponent,
    LoaderComponent
],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate(
          '1s ease-out',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
    ]),
  ],
})

export class SignInComponent {
  isTyping = false;
  animationState = true;
  Roles = USER_ROLES;
  step = 1;
  helperText =
    'To begin this journey, tell us what type of account you’d be opening.';
  isPasswordVisible = false;
  startTyping() {
    this.isTyping = true;
  }
  signup$ =new Observable();
  isLoading =false;
  private _formBuilder = inject(FormBuilder);
  private _authService =inject(AuthService);
  private _loadingService =inject(LoadingService);
  isLoading$ =this._loadingService.isLoading.pipe(tap(v => {
    v? this.signUpForm.disable(): this.signUpForm.enable();
    this.isLoading =v
  }))

  signUpForm = this._formBuilder.group({
    password: ['Test', Validators.required],
    lastName: ['User', Validators.required],
    firstName: ['Test', Validators.required],
    accountType: ['user', Validators.required],
    confirmPassword: ['Test', Validators.required],
    hasAcceptedTerms: [true, Validators.requiredTrue],
    username: ['email@gmail.com', [Validators.required, Validators.email]],
    hasAcceptedPrivacyPolicy: [true, Validators.requiredTrue],
  });

  handleRoleSelection(value: string) {
    this.step = 1;
    this.signUpForm.get('accountType')?.setValue(value);
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  submitForm() {
    this.signup$ =this._authService.signup(this.signUpForm.value as SignupDetails)
  }
}
