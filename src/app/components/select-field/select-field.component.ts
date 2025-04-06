import { Component, Input } from '@angular/core';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'select-field',
  imports: [CommonModule, SelectModule, MultiSelectModule, FormsModule],
  templateUrl: './select-field.component.html',
  styleUrl: './select-field.component.scss'
})

export class SelectFieldComponent {
  @Input() label: string ='';
  @Input() className: string ='';
  @Input() placeholder: string ='';
  @Input() labelClassName: string ='';
  @Input() type: 'multiple' | 'single' ='multiple';

  cities: City[] | undefined;

    selectedCity: City | undefined;

    ngOnInit() {
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
    }
}
