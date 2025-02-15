import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { SelectButtonComponent } from "../../../../core/components/select-button/select-button.component";

@Component({
  selector: 'app-signup',
  imports: [RouterLink, SelectButtonComponent],
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

  startTyping() {
    this.isTyping = true;
  }
}
