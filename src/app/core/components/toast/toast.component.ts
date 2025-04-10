import { Component, inject } from '@angular/core';
import { Toast, ToastClasses, ToastModule } from 'primeng/toast';
import { ErrorStore } from '../../store/http.errors.store';

@Component({
  selector: 'app-toast',
  imports: [Toast],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  errorStore =inject(ErrorStore)

  handleClose(){
    this.errorStore.setError(undefined)
  }
}
