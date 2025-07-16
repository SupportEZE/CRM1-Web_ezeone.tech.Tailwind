import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { SweetAlertService } from '../alert/sweet-alert.service';
import { Observable, tap, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public api: ApiService, public alert: SweetAlertService) {}
  // getForm sends a post request to get form builder data and stores it in localStorage
  getForm(apiEndpoint: string): Observable<any> {
    return this.api.post({ platform: 'web' }, apiEndpoint).pipe(
      tap((result: any) => {
        if (result['statusCode'] === 200) {
          // Store the form builder data in local storage.
          localStorage.setItem('formBuilder', JSON.stringify(result.data));
        } else {
          this.alert.showAlert(result['message']);
        }
      })
    );
  }
}