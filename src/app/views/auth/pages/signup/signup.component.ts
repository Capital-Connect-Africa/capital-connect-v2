import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SelectButtonComponent } from '../../../../components/select-button/select-button.component';
import { USER_ROLES } from '../../../../features/users/enums/user.roles.enum';
import { InputFieldComponent } from '../../../../components/input-field/input-field.component';
import { ButtonComponent } from '../../../../components/button/button.component';
import { LoaderComponent } from "../../../../components/loader/loader.component";
import { AnimationState } from '../../../../core/enums/animation.state.enum';
import { slideInFromBottom, slideInFromLeft, slideInFromRight } from '../../../../core/utils/animation.triggers.util'; 
import { AuthStore } from '../../../../features/auth/store/auth.store';
import { SignUpDto } from '../../../../features/auth/interfaces/signup.dto.interface';
import { UsersStore } from '../../../../features/users/store/users.store';

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
    slideInFromBottom, 
    slideInFromLeft,
    slideInFromRight
  ],
})

export class SignupComponent {
  animationStates =AnimationState
  animationState =AnimationState.BOTTOM;
  Roles = USER_ROLES;
  step = 0;
  helperText = 'To begin this journey, tell us what type of account you’d be opening.';
  isPasswordVisible = false;

  store =inject(AuthStore);
  userStore =inject(UsersStore)
  private _router =inject(Router);
  private _formBuilder = inject(FormBuilder);


  signUpForm = this._formBuilder.group({
    password: ['', [Validators.required]],
    lastName: ['',[ Validators.required, Validators.pattern(/^[a-zA-Z\s\-]+$/)]],
    firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s\-]+$/)]],
    accountType: ['',[ Validators.required]],
    hasAcceptedTermsOfUseAndPrivacyPolicy: [false,[ Validators.requiredTrue]],
    username: ['', [Validators.required, Validators.email]],
  });

  handleRoleSelection(value: string) {
    this.signUpForm.get('accountType')?.setValue(value);
    this.next()
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  async submitForm() {
    if(!this.signUpForm.valid) return;
    const values =this.signUpForm.value
    const hasAcceptedTermsOfUseAndPrivacyPolicy =values.hasAcceptedTermsOfUseAndPrivacyPolicy;
    const roles =values.accountType as USER_ROLES
    delete values.accountType;
    delete values.hasAcceptedTermsOfUseAndPrivacyPolicy;
    const userConsent ={
      hasAcceptedPrivacyPolicy: hasAcceptedTermsOfUseAndPrivacyPolicy,
      hasAcceptedTerms: hasAcceptedTermsOfUseAndPrivacyPolicy
    }
    await this.store.signUp({...values, ...userConsent, roles} as SignUpDto);
    this._router.navigateByUrl(`/auth/verify-email?token=${this.userStore.currentUser()?.emailVerificationToken}`)
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
