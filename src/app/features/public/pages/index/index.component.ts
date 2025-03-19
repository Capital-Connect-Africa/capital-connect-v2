import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonComponent } from "../../../../core/components/button/button.component";
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-index',
  imports: [CarouselModule, ButtonComponent, CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  @Output() onSigninPrompt = new EventEmitter();

  private _router =inject(Router);
  private _breakpointObserver =inject(BreakpointObserver);

  breakpoints$ =this._breakpointObserver.observe([Breakpoints.Handset]).pipe(tap(result => {
    if (!result.matches) {
      this._router.navigate(['/auth']);
    }
  }));

  slides =[
    { image: 'assets/img/mobile-banner.png', },
    { image: 'assets/img/mobile-banner.png', },
    { image: 'assets/img/mobile-banner.png', },
    { image: 'assets/img/mobile-banner.png', },
    { image: 'assets/img/mobile-banner.png', },
  ]

  openSignup(){
    this._router.navigateByUrl('auth/signup')
  }

  openSignIn(){
    this._router.navigateByUrl('auth')
  }
}
