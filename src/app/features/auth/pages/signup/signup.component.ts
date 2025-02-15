import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SelectButtonComponent } from "../../../../core/components/select-button/select-button.component";

@Component({
  selector: 'app-signup',
  imports: [RouterLink, SelectButtonComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

}
