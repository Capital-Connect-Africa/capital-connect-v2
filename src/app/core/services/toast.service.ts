import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastOptions } from '../interfaces/toast.options.interface';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _messageService = inject(MessageService);
  position = 'top-right';

  show(options: ToastOptions) {
    this.position = options.position ?? this.position;
    this._messageService.add({
      severity: options.severity,
      summary: options.summary,
      detail: options.details,
      life:  5000,
    });
  }
}
