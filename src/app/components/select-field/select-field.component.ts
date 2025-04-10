import { Component, EventEmitter, forwardRef, input, Input, Output, SimpleChanges } from '@angular/core';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'select-field',
  imports: [CommonModule, SelectModule, MultiSelectModule, FormsModule],
  templateUrl: './select-field.component.html',
  styleUrl: './select-field.component.scss',
  providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SelectFieldComponent),
        multi: true,
      },
    ],
})

export class SelectFieldComponent implements ControlValueAccessor {
  @Input() disabled =false;
  @Input() label: string ='';
  @Input() options:any[] =[];
  @Input() className: string ='';
  @Input() placeholder: string ='';
  @Input() labelClassName: string ='';
  @Input() formControlName: string ='';
  @Input() type: 'multiple' | 'single' ='single';
  @Input() optionLabel: string | undefined =undefined;
  @Input() optionValue: string | undefined =undefined;
  @Output() valueChange = new EventEmitter<any>();

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
    
    onInputChange(event: SelectChangeEvent): void {
      this.value = event.value;
      this.onChange(this.value);
      this.onTouched();
    }
  
    ngOnChanges(changes: SimpleChanges): void {
      if (changes['type']) {
        this.type = changes['type'].currentValue;
      }
      if (changes['disabled']) {
        this.disabled = changes['disabled'].currentValue;
      }
    }
}
