import { Component } from '@angular/core';
import { Toast, ToastClasses, ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-toast',
  imports: [Toast],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {

}
