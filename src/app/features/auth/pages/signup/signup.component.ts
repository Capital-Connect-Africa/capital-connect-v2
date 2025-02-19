import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
import { AnimationState } from '../../../../core/enums/animation.state.enum';
import { slideInFromBottom, slideInFromLeft, slideInFromRight } from '../../../../core/utils/animation.triggers.util'; 

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
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  animations: [
    slideInFromRight, 
    slideInFromBottom, 
    slideInFromLeft
  ],
})

export class SignupComponent {
  isTyping = false;
  animationStates =AnimationState
  animationState =AnimationState.BOTTOM;
  Roles = USER_ROLES;
  step = 0;
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
    password: ['', Validators.required],
    lastName: ['', Validators.required],
    firstName: ['', Validators.required],
    accountType: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    hasAcceptedTerms: [false, Validators.requiredTrue],
    username: ['', [Validators.required, Validators.email]],
    hasAcceptedPrivacyPolicy: [false, Validators.requiredTrue],
  });

  handleRoleSelection(value: string) {
    this.signUpForm.get('accountType')?.setValue(value);
    this.next()
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  submitForm() {
    this.signup$ =this._authService.signup(this.signUpForm.value as SignupDetails)
  }

  next(stride:number =1){
    if(stride >0){
      this.animationState =AnimationState.RIGHT
    }else if(stride <0){
      if((this.step +stride) <0) return
      this.animationState =AnimationState.LEFT
    }
    this.step +=stride;
  }
}
