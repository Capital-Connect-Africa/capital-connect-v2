import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormBuilder,  ReactiveFormsModule, Validators, } from '@angular/forms';
import { InputFieldComponent } from '../../../../components/input-field/input-field.component';
import { ButtonComponent } from '../../../../components/button/button.component';
import { LoaderComponent } from "../../../../components/loader/loader.component";
import { AuthStore } from '../../../../features/auth/store/auth.store';
import { SignInDto } from '../../../../features/auth/interfaces/signin.dto.interface';

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

  //services
  store =inject(AuthStore);
  private _formBuilder = inject(FormBuilder);
  private _router =inject(Router)

  signInForm = this._formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });



  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  async submitForm() {
    const values =this.signInForm.value as SignInDto
    await this.store.signIn(values);
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
      this._router.navigateByUrl('/')
    }
}


}
