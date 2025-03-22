import { Component, inject, Input } from '@angular/core';
import { LoadingService } from '../../core/services/loading.service';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs';

@Component({
  selector: 'app-loader',
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  @Input() message = 'Please wait';
  isLoading = false;
  private _loadingService = inject(LoadingService);
  isLoading$ = this._loadingService.isLoading.pipe(
    tap((v) => (this.isLoading = v))
  );
}
