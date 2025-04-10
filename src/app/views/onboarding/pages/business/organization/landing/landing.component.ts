import { Component, inject } from '@angular/core';
import { ButtonComponent } from "../../../../../../components/button/button.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  imports: [ButtonComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  private _router =inject(Router)
  
  next(){
    this._router.navigateByUrl('/onboarding/business/organization-setup/step-one');
  }
}
