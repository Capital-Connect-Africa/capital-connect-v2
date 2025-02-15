import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { SelectButtonComponent } from "../../../../core/components/select-button/select-button.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, SelectButtonComponent, CommonModule],
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
  helperText ='To begin this journey, tell us what type of account you’d be opening.'

  startTyping() {
    this.isTyping = true;
  }
}
