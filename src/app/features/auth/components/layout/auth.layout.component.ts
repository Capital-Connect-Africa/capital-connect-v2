import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SliderComponent } from "../../../../core/components/slider/slider.component";

@Component({
  selector: 'auth-layout',
  imports: [RouterOutlet, SliderComponent],
  templateUrl: './auth.layout.component.html',
  styleUrl: './auth.layout.component.scss'
})
export class AuthLayoutComponent {

}
