import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'select-button',
  imports: [CommonModule],
  templateUrl: './select-button.component.html',
  styleUrl: './select-button.component.scss',
})
export class SelectButtonComponent {
  @Input() value!: any;
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() active: boolean = false;
  @Output() onSelect = new EventEmitter<any>();

  handleSelect() {
    if(!this.active){
      this.active = true;
      this.onSelect.emit(this.value);
    }else {
      this.active =false
    }
  }
}
