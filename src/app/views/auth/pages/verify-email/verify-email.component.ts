import { Component, inject } from '@angular/core';
import { ButtonComponent } from "../../../../components/button/button.component";
import { LoaderComponent } from "../../../../components/loader/loader.component";
import { InputFieldComponent } from "../../../../components/input-field/input-field.component";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { slideInFromBottom } from '../../../../core/utils/animation.triggers.util';
import { AnimationState } from '../../../../core/enums/animation.state.enum';
import { UsersStore } from '../../../../features/users/store/users.store';
import { AuthStore } from '../../../../features/auth/store/auth.store';
import { ResendEmailVerificationDto } from '../../../../features/auth/interfaces/resend.verification.email.dto.interface';

@Component({
  selector: 'app-verify-email',
  imports: [ButtonComponent, LoaderComponent, InputFieldComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss',
  animations: [
      slideInFromBottom, 
  ],
})
export class VerifyEmailComponent {

  animationStates =AnimationState
  animationState =AnimationState.BOTTOM;

  store =inject(UsersStore);
  authStore =inject(AuthStore);
  private _router =inject(Router);
  private _fb =inject(FormBuilder);
  private _activatedRoute =inject(ActivatedRoute);

  token =this._activatedRoute.snapshot.queryParams['token'];

  ngOnInit(){
    if(this.token) {
      this.verifyEmailToken(this.token);
    }
  }

  emailVerificationForm =this._fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  async resendEmailVerificationToken(){
    const values =this.emailVerificationForm.value as ResendEmailVerificationDto;
    if(this.emailVerificationForm.invalid) return;
    await this.authStore.resendEmailVerificationToken(values);
  }

  back(){
    this._router.navigateByUrl('/auth')
  }

  async verifyEmailToken(token:string){
    await this.store.verifyUserEmailToken(token);
    this.back();
  }
}
