import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() className = '';
  @Input() label = '';
  @Input() showArrow = true;
  @Input() showContent = true;
  @Input() type: 'submit' | 'button' = 'submit';
  @Input() disabled = false;
  @Output() onClick = new EventEmitter();

  handleClick() {
    this.onClick.emit();
  }
}
