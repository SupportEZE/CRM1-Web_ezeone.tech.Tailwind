import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { catchError, map, Observable, of, throwError } from 'rxjs';

// import { CookieService } from 'ngx-cookie-service';
import { CryptoService } from '../crypto/crypto.service';
import { UtilService } from '../../../utility/util.service';
import { ToastrServices } from '../../../shared/services/toastr.service ';
import { AuthService } from '../../../shared/services/auth.service';
import { API_TYPE } from '../../../utility/constants';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  encrypt: boolean = false
  canActive: boolean = false;
  disabled: boolean = false;
  isDuplicate: boolean = false;
  userData: any = {}
  navApi: any;
  
  //-----For local----//
  
  
  // Lal`s Ip
  // public rootUrl = 'http://192.168.0.108/';
  // public upload = 'http://192.168.0.108:8005/';
  // public baseUrl  ='http://192.168.0.108:8008/api/';
  // public authUrl = 'http://192.168.0.108:8005/auth/';
  // public adminUrl = 'http://192.168.0.108:8006/admin';
  // public webSocketUrl = 'http://192.168.0.108:8008';
  
  //-----For Localhost----//
  // public rootUrl = 'http://192.168.0.108/';
  // public upload = 'http://192.168.5.115:8005/';
  // public baseUrl  ='http://192.168.5.115:8008/api/';
  // public authUrl = 'http://192.168.0.108:8005/auth/';
  // public adminUrl = 'http://192.168.0.108:8006/admin';
  // public webSocketUrl = 'http://192.168.0.108:8008';
  
  
  //-----For Live----//
  // public rootUrl = 'https://ezeone.tech/';
  // public upload = 'https://ezeone.tech:8005/'; 
  // public baseUrl = 'https://ezeone.tech:8008/api/';
  // public authUrl = 'https://ezeone.tech:8005/auth/';
  // public adminUrl = 'https://ezeone.tech:8006/admin';
  // public webSocketUrl = 'https://ezeone.tech:8008';
  // ---- For Development ---- //
  
  public rootUrl = 'https://works.ezeone.tech/';
  public upload = 'https://works.ezeone.tech:8005/';
  public baseUrl  ='https://works.ezeone.tech:8008/api/';
  public authUrl = 'https://works.ezeone.tech:8005/auth/';
  public adminUrl = 'https://works.ezeone.tech:8006/admin';
  public webSocketUrl = 'https://works.ezeone.tech:8008';
  
  constructor(private http: HttpClient, public crypto: CryptoService, public toastr: ToastrServices, private utilService: UtilService, private authService :AuthService) {}
  
  ngOnInit() {
    this.userData = this.authService.getOrg();
  }
  
  // Method to set headers with token
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'en',
    });
  }
  
  
  // test() {
  //   this.crypto.decryptData({ encryptedData: "YWJjZGVmMTIzNDU2Nzg5MA==::SAQHuMLxSqtOeuP7qncwutPNh4kX1lmCtB/52I1/WLphtgyq4ZuA0wnBLAUcUcMBt2+6FZQHs63vSHNJ6GPhgRen+KIj+X4dUzP60jjT9fU=" });
  //   console.log('test');
  // }
  
  
  // GET method
  get(endpoint: string): Observable<any> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.get(url, { headers: this.getHeaders() }).pipe(map((result: any) => {
      const decrypt = this.crypto.decryptData(JSON.stringify(result));
      return decrypt;
    }));
  }

  // POST method
  post(body: any, endpoint: string, urlType?:string): Observable<any> {
    const url = `${urlType === API_TYPE.AUTH ? this.authUrl : this.baseUrl}${endpoint}`;
    const isEncryptionEnabled = this.encrypt === true;
    const requestBody = isEncryptionEnabled
    ? this.crypto.encryptData(body)
    : body;
    const headers = this.getHeaders();
    
    return this.http.post(url, requestBody, { headers }).pipe(
      map((result: any) => {
        if (isEncryptionEnabled) {
          try {
            return this.crypto.decryptData(result);
          } catch (e) {
            console.error('Decryption error:', e);
            throw new Error('Failed to decrypt response data.');
          }
        } else {
          return result;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.disabled = false;
        const errorMessage = this.utilService.handleApiError(error);
        this.toastr.error(errorMessage, '', 'toast-top-right');
        return of(error);
      })
    );
  }
 
  // PATCH method

  patch(body: any, endpoint: string): Observable<any> {
    const url = `${this.baseUrl}${endpoint}`;
    const isEncryptionEnabled = this.encrypt === true;
    
    const requestBody = isEncryptionEnabled
    ? { encryptedData: this.crypto.encryptData(body) }
    : body;
    
    const headers = this.getHeaders();
    
    return this.http.patch(url, requestBody, { headers }).pipe(
      map((result: any) => {
        if (isEncryptionEnabled) {
          try {
            return this.crypto.decryptData(result);
          } catch (e) {
            console.error('Decryption error:', e);
            throw new Error('Failed to decrypt response data.');
          }
        } else {
          return result;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.disabled = false;
        const errorMessage = this.utilService.handleApiError(error);
        this.toastr.warning(errorMessage, '', 'toast-top-right');
        return of(error);
      })
    );
  }

  

  private getHeadersWithoutContentType(): HttpHeaders {
    const headers = this.getHeaders();
    return headers.delete('Content-Type'); // Let Angular set it automatically
  }
  uploadFile(formData: FormData, endpoint: string): Observable<any> {
    const url = `${this.baseUrl}${endpoint}`;
    return this.http.post(url, formData, {
      headers: this.getHeadersWithoutContentType(), // Remove Content-Type manually
    }).pipe(map((result: any) => result),
    catchError((error: HttpErrorResponse) => {
      this.disabled = false
      let errorMessage = this.utilService.handleApiError(error);
      this.toastr.error(errorMessage, '', 'toast-top-right');
      return of(error);
    }));
  }
  
  async getForms(id: any): Promise<any> {
    let data: any = localStorage.getItem('formBuilder');
    data = data ? JSON.parse(data) : [];
    return data.find((row: any) => row.form_id === id) || null;
  }
  
}
