// auth.service.ts
import { inject, Injectable, Injector, runInInjectionContext, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError, map, switchMap } from 'rxjs/operators';
import { Observable, of, Subject, throwError } from 'rxjs';
import { ApiService } from '../../core/services/api/api.service';
import { SweetAlertService } from '../../core/services/alert/sweet-alert.service';
import { ToastrServices } from './toastr.service ';
import { Router } from '@angular/router';
import { API_TYPE, AUTH_KEYS } from '../../utility/constants';
import { NavService } from './nav.service';

interface LoginResponse {
  statusCode: number;
  message: string;
  data: LoginData;
  error: any;
}

interface LoginData {
  _id: string;
  org_id: number;
  name: string;
  login_type_id: number;
  login_type_name: string;
  user_role_id: string;
  token_type: string;
  token: string;
  next_api_path: string;
  org: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authToken = AUTH_KEYS.TOKEN;
  private userData = AUTH_KEYS.USER;
  private modules = AUTH_KEYS.MODULE;
  private OrgLoginData = AUTH_KEYS.ORG;
  private _isLoggedIn = signal<boolean>(this.hasValidToken());
  public showLoader: boolean = false;

  private sessionExpiredSubject = new Subject<boolean>();
  sessionExpired$ = this.sessionExpiredSubject.asObservable();
  
  isLoggedIn = this._isLoggedIn.asReadonly();
  
  
  
  constructor(private http: HttpClient,  private router: Router, private injector: Injector, private alert: SweetAlertService ) { }
  
  
  
  private get api(): ApiService {
    return this.injector.get(ApiService);
  }

  private get nav(): NavService {
    return this.injector.get(NavService);
  }
  
  private get toastr(): ToastrServices {
    return this.injector.get(ToastrServices);
  }
  
  
  emitSessionExpired() {
    this.sessionExpiredSubject.next(true);
  }
  
  login(credentials: any , api_path: string): Observable<boolean> {
    return runInInjectionContext(this as any, () => {
      this.showLoader = true;
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post<any>(`${this.api.authUrl}${api_path}`, credentials, { headers }).pipe(
        switchMap(response => {
          if (response.statusCode === 200 && response.data?.token) {
            this.toastr.success(response.message, '', 'toast-top-right');
            localStorage.setItem(this.authToken, response.data.token);
            localStorage.setItem(this.userData, JSON.stringify(response.data));
            localStorage.setItem(this.OrgLoginData, JSON.stringify(response.data.org));
            this._isLoggedIn.set(true);
            return this.fetchNavigationData().pipe(
              map(() => {
                this.showLoader = false;
                return true;
              }),
              catchError(() => {
                this.api.disabled = false;
                this.showLoader = false;
                this._isLoggedIn.set(false);
                return of(false);
              })
            );
          } else {
            this.api.disabled = false;
            this.showLoader = false;
            this._isLoggedIn.set(false);
            return of(false);
          }
        }),
        catchError(() => {
          this.api.disabled = false;
          this.showLoader = false;
          this._isLoggedIn.set(false);
          return of(false);
        })
      );
    });
  }

  fetchNavigationData(): Observable<any> {
    return this.api.post({}, 'authorization/read', API_TYPE.AUTH).pipe(
      switchMap((result: any) => {
        if (result['statusCode'] === 200) {
          if (Array.isArray(result['data']) && result['data'].length === 0) {
            this.toastr.error('Unauthorized', '', 'toast-top-right');
            this.logout('logout');
            return of(false);
          }
          else{
            localStorage.setItem(this.modules, JSON.stringify(result['data']));
            this.nav.loadModules();
            return of(true);
          }

        } else {
          this.alert.showAlert(result['message']);
          return throwError(() => new Error(result['message']));
        }
      })
    );
  }
  
  
  logout(text?:any): void {
    if (text){
      this.clearData(text)
    }
    else{
      this.alert.confirm("Confirm Logout", "Are you sure you want to log out from your account?", "Yes, Logout")
        .then((result) => {
          if (result.isConfirmed) {
            this.clearData()
          }
        });
    }

   
  }


  clearData(text?:any){
    localStorage.setItem('logout-event', Date.now().toString());
    this.api.post({ platform: 'web', 'activity': text ? text : '' }, `logout`, API_TYPE.AUTH).subscribe(result => {
      if (result['statusCode'] === 200) {
        this.toastr.success(result.message, '', 'toast-top-right');
        localStorage.removeItem(this.authToken);
        localStorage.removeItem(this.userData);
        localStorage.removeItem(this.OrgLoginData);
        localStorage.removeItem(this.modules);
        localStorage.clear();
        this._isLoggedIn.set(false);
        this.nav.refreshMenuItems();
        this.router.navigateByUrl('/auth/login').then(() => {
        });
      }
    });
  }

  getToken(): string | null {
    return localStorage.getItem(this.authToken);
  }
  
  getUser(): LoginData | null {
    const data = localStorage.getItem(this.userData);
    return data ? JSON.parse(data) : null;
  }
  
  getOrg(): any | null {
    const data = localStorage.getItem(this.OrgLoginData);
    return data ? JSON.parse(data) : null;
  }
  
  
  getModule(): any | null {
    const data = localStorage.getItem(this.modules);
    return data ? JSON.parse(data) : null;
  }
  
  
  
  hasValidToken(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    const payload = this.decodeToken(token);
    if (!payload) return false;
    
    const now = Math.floor(Date.now() / 1000);
    return payload.exp && payload.exp > now;
  }
  
  private decodeToken(token: string): any | null {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (e) {
      return null;
    }
  }
  
  
 
}
