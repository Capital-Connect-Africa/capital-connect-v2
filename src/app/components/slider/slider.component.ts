import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { Slide } from '../../core/interfaces/slide.interface';

@Component({
  selector: 'app-slider',
  imports: [CarouselModule, CommonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {
  @Input() slides:Slide[] =[
    {
      imageUrl: 'assets/img/businessman-working-laptop 1.png',
      description: 'Gain exclusive access to funding opportunities that fit your business',
      className: 'bg-capital-green-100 bg-opacity-[0.37]',
      logoUrl: 'assets/img/logo-white.png',
    },
    {
      imageUrl: 'assets/img/happyman.png',
      description: 'Gain exclusive access to funding opportunities that fit your business',
      className: 'bg-black bg-opacity-[0.2]',
      logoUrl: 'assets/img/logo.png',
    },
    {
      imageUrl: 'assets/img/happy-team.png',
      description: 'Gain exclusive access to funding opportunities that fit your business',
      className: 'bg-capital-green-100 bg-opacity-[0.37]',
      logoUrl: 'assets/img/logo-white.png',
    },
    {
      imageUrl: 'assets/img/happyman.png',
      description: 'Gain exclusive access to funding opportunities that fit your business',
      className: 'bg-black bg-opacity-[0.2]',
      logoUrl: 'assets/img/logo.png',
    }

  ]
}
