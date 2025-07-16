import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  public _snackBar = inject(MatSnackBar);
  durationInSeconds = 5;

  constructor() { }

  errorSnackBar(message: string, action: string) {
    this._snackBar.open('❌'+message, action, 
      {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: this.durationInSeconds * 1000,
        panelClass: ['error-snackbar'],
      }
    );
  }
  warningSnackbar(message: string, action: string) {
    this._snackBar.open('⚠️'+message, action, 
      {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: this.durationInSeconds * 1000,
        panelClass: ['warning-snackbar'],
      }
    );
  }
  successSnackbar(message: string, action: string) {
    this._snackBar.open('✅'+ message, action, 
      {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: this.durationInSeconds * 1000,
        panelClass: ['success-snackbar'],
      }
    );
  }

  defaultSnackbar() {
    this._snackBar.open('Copied to clipboard', '', {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      duration: this.durationInSeconds * 1000,
    });
  }
}
