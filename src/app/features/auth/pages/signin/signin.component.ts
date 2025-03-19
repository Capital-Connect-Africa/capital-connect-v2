import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
    CommonModule,
    ReactiveFormsModule,
    InputFieldComponent,
    ButtonComponent,
    LoaderComponent,
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
  //booleans
  current_form: string = 'login';
  isTyping = false;
  animationState = true;
  isPasswordVisible = false;
  isShowSignInForm =false

  signup$ =new Observable();
  isLoading =false;

  //services
  private _formBuilder = inject(FormBuilder);
  private _authService =inject(AuthService);
  private _loadingService =inject(LoadingService);
  private _router =inject(Router)

  isLoading$ =this._loadingService.isLoading.pipe(tap(v => {
    v? this.signInForm.disable(): this.signInForm.enable();
    this.isLoading =v
  }))

  signInForm = this._formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', Validators.required],
  });

  startTyping() {
    this.isTyping = true;
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  submitForm() {
    this.signup$ =this._authService.signup(this.signInForm.value as SignupDetails)
    // this.signIn$ = this._authService.signin(this.signInForm.value as SigninDetails);
  }

  setCurrentForm(form: string) {
    this.current_form = form;    
  }

  authBack(){
    if(this.current_form === 'forgot'){
      this.setCurrentForm('login')
    }else if(this.current_form === 'check_inbox'){
      this.setCurrentForm('forgot')
    }else if(this.current_form === 'set_password'){
      this.setCurrentForm('check_inbox')
    }else{
      this._router.navigateByUrl('')
    }
}


}
