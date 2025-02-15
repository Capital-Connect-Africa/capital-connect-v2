import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'auth-layout',
  imports: [RouterOutlet, CarouselModule],
  templateUrl: './auth.layout.component.html',
  styleUrl: './auth.layout.component.scss'
})
export class AuthLayoutComponent {

  slides =[
    {
      image: 'assets/img/businessman-working-laptop 1.png',
      quote: 'It simplifies collaboration and keeps everyone on the same page, allowing us to focus more on creativity and less on logistics.',
      author: 'Robert Howard - Project Manager'
    },
    {
      image: 'assets/img/happyman.png',
      quote: 'It simplifies collaboration and keeps everyone on the same page, allowing us to focus more on creativity and less on logistics.',
      author: 'Robert Howard - Project Manager'
    },
    {
      image: 'assets/img/happy-team.png',
      quote: 'It simplifies collaboration and keeps everyone on the same page, allowing us to focus more on creativity and less on logistics.',
      author: 'Robert Howard - Project Manager'
    }

  ]
}
