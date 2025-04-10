import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  // private _dialog = inject(MatDialog)
  // confirm(message: string): Observable<boolean> {
  //   const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
  //     width: '35vw',
  //     data: { message }
  //   });

  //   return dialogRef.afterClosed();
  // }
}
