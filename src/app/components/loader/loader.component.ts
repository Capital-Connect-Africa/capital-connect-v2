import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})

export class LoaderComponent {
  @Input() message = 'Please wait';
  @Input() isLoading = false;

}
