import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'input-field',
  imports: [CommonModule],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true,
    },
  ],
})
export class InputFieldComponent implements ControlValueAccessor {
  @Input() label!: string;
  @Input() errorMessage!: string;
  @Input({ required: true }) placeholder!: string;
  @Input({ required: true }) formControlName: string = '';
  @Input() type: 'number' | 'text' | 'password' | 'email' = 'text';
  @Input() className: string = '';
  @Input() icon!: string;
  @Input() disabled:boolean =false;
  @Output() onIconTouch = new EventEmitter();

  value: any;
  onChange = (value: string) => {};
  onTouched = () => {};


  writeValue(value: string): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
    this.onTouched();
  }

  onIconClick() {
    this.onIconTouch.emit();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['icon']) {
      this.icon = changes['icon'].currentValue;
    }

    if (changes['type']) {
      this.type = changes['type'].currentValue;
    }
  }
}
