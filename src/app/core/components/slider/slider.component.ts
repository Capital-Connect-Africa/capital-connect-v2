import { Component, Input } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-slider',
  imports: [CarouselModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {
  @Input() slides =[
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
