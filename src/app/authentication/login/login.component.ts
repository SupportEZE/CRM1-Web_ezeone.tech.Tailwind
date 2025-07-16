import { CommonModule, DOCUMENT, Location } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Inject, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from '../../shared/services/auth.service';
import { FirebaseService } from '../../shared/services/firebase.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ToastrServices } from '../../shared/services/toastr.service ';
import { first } from 'rxjs';
import { CommonApiService } from '../../shared/services/common-api.service';
import { ApiService } from '../../core/services/api/api.service';
import { Title } from '@angular/platform-browser';
import { FormValidationService } from '../../utility/form-validation';
import {
    trigger,
    transition,
    style,
    animate
} from '@angular/animations';
import { SpkNgSelectComponent } from '../../../@spk/spk-ng-select/spk-ng-select.component';
import { SharedModule } from '../../shared/shared.module';
import { API_TYPE } from '../../utility/constants';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        SharedModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        ToastrModule,
        SpkNgSelectComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        FirebaseService,
        { provide: ToastrService, useClass: ToastrService }
    ],  templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    animations: [
        trigger('slideFade', [
            transition(':enter', [
                style({ transform: 'translateX(100%)', opacity: 0 }),
                animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
            ]),
            transition(':leave', [
                animate('300ms ease-in', style({ transform: 'translateX(-100%)', opacity: 0 }))
            ])
        ])
    ]
})
export class LoginComponent {
    @ViewChild('swiperContainer1') swiperContainer1!: ElementRef;
    public showPassword: boolean = false;
    loginType: string = '';
    public toggleClass: string = 'ri-eye-fill'; // Default to "eye" icon
    active="Angular";
    firestoreModule: any;
    loginContent:boolean = false;
    databaseModule: any;
    authModule: any;
    username = '';
    password = '';
    activeLoginTab:any = 'backend_team'
    activeTab:any = 'login'
    errorMessage = ''; // validation _error handle
    _error: { name: string; message: string } = { name: '', message: '' }; // for firbase _error handle
    disabled = '';
    public loginForm!: FormGroup;
    public individualForm!: FormGroup;
    public authorizedPersonForm!: FormGroup;
    public otpForm!: FormGroup;
    
    iconMap: any = {
        Facebook: 'ri-facebook-fill',
        Instagram: 'ri-instagram-fill',
        LinkedIn: 'ri-linkedin-box-fill',
        Youtube: 'ri-youtube-fill',
        'X-Twitter': 'ri-twitter-fill',
        'Google Review': 'ri-google-fill'
    };
    
    constructor(
        private location: Location,
        @Inject(DOCUMENT) private document: Document,private elementRef: ElementRef,
        private sanitizer: DomSanitizer,
        public authservice: AuthService,
        private router: Router,
        private formBuilder: FormBuilder,
        private renderer: Renderer2,
        private firebaseService: FirebaseService,
        public commonapi:CommonApiService,
        private toastr: ToastrServices,
        public api: ApiService,
        private titleService: Title,
        public formValidation: FormValidationService,
    ) {
        // AngularFireModule.initializeApp(environment.firebase);
        document.body.classList.add('authentication-background');
        const bodyElement = this.renderer.selectRootElement('body', true);
        //  this.renderer.setAttribute(bodyElement, 'class', 'cover1 justify-center');
        
    }
    
    // firestoreModule = this.firebaseService.getFirestore();
    // databaseModule = this.firebaseService.getDatabase();
    // authModule = this.firebaseService.getAuth();
    
    ngOnDestroy(): void {
        document.body.classList.remove('authentication-background');    
    }
    ngOnInit(): void {
        this.getAuthOrg();
        
        this.location.replaceState('auth/login');
        this.loginForm = this.formBuilder.group({
            platform: [''],
            username: ['', [Validators.required]],
            password: ['', Validators.required],
        });
        
        this.authorizedPersonForm = this.formBuilder.group({
            authorized_person: ['', [Validators.required]],
        });
        
        this.individualForm = this.formBuilder.group({
            mobile: ['', [Validators.required, Validators.pattern(/^[6-9][0-9]{9}$/), Validators.minLength(10), Validators.maxLength(10)]],
        });
        
        this.otpForm = this.formBuilder.group({
            d1: ['', [Validators.required, Validators.pattern('[0-9]')]],
            d2: ['', [Validators.required, Validators.pattern('[0-9]')]],
            d3: ['', [Validators.required, Validators.pattern('[0-9]')]],
            d4: ['', [Validators.required, Validators.pattern('[0-9]')]],
            d5: ['', [Validators.required, Validators.pattern('[0-9]')]],
            d6: ['', [Validators.required, Validators.pattern('[0-9]')]]
        });
        
        // Initialize Firebase services here
        this.firestoreModule = this.firebaseService.getFirestore();
        this.databaseModule = this.firebaseService.getDatabase();
        this.authModule = this.firebaseService.getAuth();
    }
    
    
    authOrgData:any = {};
    webBanner:any = [];
    getAuthOrg()
    {
        this.loginContent = true;
        this.api.post({}, 'org', API_TYPE.AUTH).subscribe(result => {
            if (result['statusCode'] == 200){
                this.authOrgData = result['data'];
                if (result['data']) {
                    this.loginContent = false;
                    this.webBanner = this.authOrgData?.org?.web_banner?.map((url: string) => ({ src: url })) || [];
                    this.setTitle();
                }
            }
            else{
                this.loginContent = false;
                this.router.navigate(['/error/error404']);
            }
        });
    }
    
    setTitle() {
        const companyName = this.authOrgData?.org?.org_name;
        this.titleService.setTitle(companyName);
        this.setFavicon(this.authOrgData?.org?.favicon_url || 'https://ezeonetech.com/wp-content/uploads/2025/03/favicon-1.png');
        
    }
    
    setFavicon(faviconUrl: string) {
        let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']") || null;
        
        if (link) {
            link.href = faviconUrl;
        } else {
            link = document.createElement('link');
            link.rel = 'icon';
            link.href = faviconUrl;
            document.getElementsByTagName('head')[0].appendChild(link);
        }
    }
    
    switchTab(tab: 'backend_team' | 'individual') {
        this.activeLoginTab = tab;
        if (this.activeLoginTab === 'backend_team') {
            this.activeTab = 'login';
        }
        if (this.activeLoginTab === 'individual') {
            this.activeTab = 'mobile';
        }
        
        // Reset all forms
        this.loginForm.reset();
        this.individualForm.reset();
        this.otpForm.reset();
        
        // Optional: clear validation errors if needed
        this.markAllUntouched(this.loginForm);
        this.markAllUntouched(this.individualForm);
        this.markAllUntouched(this.otpForm);
    }
    
    markAllUntouched(form: FormGroup) {
        Object.keys(form.controls).forEach(key => {
            form.controls[key].markAsPristine();
            form.controls[key].markAsUntouched();
            form.controls[key].updateValueAndValidity();
        });
    }
    
    
    
    // ----------------------------------OTP Section Start----------------------------------------- //
    @ViewChild('oneInput') oneInput!: ElementRef<HTMLInputElement>;
    @ViewChild('twoInput') twoInput!: ElementRef<HTMLInputElement>;
    @ViewChild('threeInput') threeInput!: ElementRef<HTMLInputElement>;
    @ViewChild('fourInput') fourInput!: ElementRef<HTMLInputElement>;
    @ViewChild('fiveInput') fiveInput!: ElementRef<HTMLInputElement>;
    @ViewChild('sixInput') sixInput!: ElementRef<HTMLInputElement>;
    
    onDigitInput(event: KeyboardEvent, nextInput: HTMLInputElement | null, prevInput: HTMLInputElement | null): void {
        const inputElement = event.target as HTMLInputElement;
        const key = event.key;
        
        // If a digit is typed, go to next
        if (key !== 'Backspace' && inputElement.value?.length === 1) {
            if (nextInput) nextInput.focus();
        }
        
        // If backspace and current is empty, go to previous
        if (key === 'Backspace' && inputElement.value?.length === 0) {
            if (prevInput) prevInput.focus();
        }
    }
    
    goToPreviousTab(activeLoginTab:string, activeTab: string): void {
        if (activeLoginTab === 'backend_team' && activeTab === 'otp') {
            this.activeTab = 'authorized_person';
            this.otpForm.reset();
        }
        if (activeLoginTab === 'individual' && activeTab === 'otp') {
            this.activeTab = 'mobile';
            this.otpForm.reset();
        }
        else{
            this.activeTab = activeTab;
        }
        // this.loginForm.reset();
    }
    
    onOtpSend(): void {
        
        let isFormInvalid = false;
        
        if (this.activeLoginTab === 'backend_team') {
            if (this.authorizedPersonForm.invalid) {
                this.authorizedPersonForm.markAllAsTouched();
                isFormInvalid = true;
            }
            if (this.loginForm.invalid) {
                this.loginForm.markAllAsTouched();
                isFormInvalid = true;
            }
        }
        
        if (this.activeLoginTab === 'individual') {
            if (this.individualForm.invalid) {
                this.individualForm.markAllAsTouched();
                isFormInvalid = true;
            }
        }
        
        if (isFormInvalid) {
            return; // Don't proceed if any form is invalid
        }
        
        this.api.disabled = true;
        const payload = {
            ...(this.activeLoginTab === 'backend_team' ? this.loginForm.value : this.individualForm.value),
            ...(this.activeLoginTab === 'backend_team' && { mobile: this.authorizedPersonForm.value.authorized_person }),
            org_id: this.authOrgData?.org?.org_id,
            login_type: this.activeLoginTab
        };
        this.api.post(payload, 'send-otp', API_TYPE.AUTH).subscribe(result => {
            if(result['statusCode'] === 200){
                this.activeTab = 'otp';
                this.api.disabled = false;        
            }
        });
    }
    
    // ----------------------------------Individual Login Section End----------------------------------------- //
    
    
    
    // ----------------------------------Backend Admin Section Start----------------------------------------- //
    
    
    onAdminLoginSubmit()
    {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }
        
        const payload = {
            ...this.loginForm.value,
            login_type: this.activeLoginTab
        };
        
        this.api.disabled = true;
        this.api.post(payload, 'web/admin-login-validate', API_TYPE.AUTH).subscribe(result => {
            if(result['statusCode'] === 200){
                this.api.disabled = false;
                if (result['data']['otp_flag'] === true) {
                    this.activeTab = 'authorized_person';
                }
                else{
                    this.Submit();
                }
            }
        });
    }
    
    Submit() {
        if (this.validateFormsByLoginType()) {
            return; // Stop if any form is invalid
        }
        
        const otp = [
            this.otpForm.value.d1,
            this.otpForm.value.d2,
            this.otpForm.value.d3,
            this.otpForm.value.d4,
            this.otpForm.value.d5,
            this.otpForm.value.d6
        ].join('');
        
        let payload:any
        
        
        if (this.activeLoginTab === 'backend_team') {
            payload = {
                ...this.loginForm.value,
                mobile: this.authorizedPersonForm.value.authorized_person,
                ...(otp ? { otp : Number(otp) } : {} ),
                login_type: this.activeLoginTab
            };
        }
        else if (this.activeLoginTab === 'individual') {
            payload = {
                ...(this.activeLoginTab === 'backend_team' && {...this.loginForm.value, ...this.authorizedPersonForm.value}),
                ...(this.activeLoginTab === 'individual' && {...this.individualForm.value}),
                ...(otp ? { otp : Number(otp) } : {} ),
                org_id: this.authOrgData?.org?.org_id,
                login_type: this.activeLoginTab
            };
        }
        this.api.disabled = true;
        this.formValidation.removeEmptyFields(payload)
        this.authservice.login(payload , 'web-login').pipe(first()).subscribe({
            next: (result: any) => {
                if (result === true) {
                    this.api.disabled = false;
                    if (this.commonapi.fcmToken) {
                        localStorage.setItem('fcmToken', this.commonapi.fcmToken);
                    }
                    const modulesData = this.authservice.getModule();
                    const firstPath = this.getFirstValidPath(modulesData);
                    if (firstPath) {
                        this.router.navigate([firstPath]);
                    } else {
                        this.authservice.logout('logout');
                    }
                } else {
                    this.toastr.error('Login failed. Invalid credentials or user inactive.', '', 'toast-top-right');
                    this.router.navigate(['']);
                }
            },
            error: (err) => {
                this.toastr.error('Something went wrong during login. Please try again later.', '', 'toast-top-right');
            }
        });
    }
    
    private validateFormsByLoginType(): boolean {
        let isFormInvalid = false;
        
        if (this.activeLoginTab === 'backend_team') {
            if (this.activeTab === 'authorized_person' && this.authorizedPersonForm.invalid) {
                this.authorizedPersonForm.markAllAsTouched();
                isFormInvalid = true;
            }
            if (this.activeTab === 'login' && this.loginForm.invalid) {
                this.loginForm.markAllAsTouched();
                isFormInvalid = true;
            }
        }
        
        if (this.activeLoginTab === 'individual') {
            if (this.activeTab === 'mobile' && this.individualForm.invalid) {
                this.individualForm.markAllAsTouched();
                isFormInvalid = true;
            }
        }
        
        if (this.activeTab === 'mobile' && this.otpForm.invalid) {
            this.otpForm.markAllAsTouched();
            isFormInvalid = true;
        }
        
        return isFormInvalid;
    }
    
    
    getFirstValidPath(modules: any[]): string | null {
        for (const item of modules) {
            // Case 1: Direct link with path
            if (item.path && typeof item.path === 'string' && item.path.trim() !== '') {
                return item.path;
            }
            
            // Case 2: Children array (nested structure)
            if (Array.isArray(item.children) && item.children?.length > 0) {
                const childPath = this.getFirstValidPath(item.children);
                if (childPath) return childPath;
            }
        }
        
        return null;
    }
    // ----------------------------------Backend Admin Section End----------------------------------------- //
    
    getMaskedMobile(): string {
        let mobile = '';
        
        if (this.activeLoginTab === 'backend_team' && this.activeTab === 'otp') {
            mobile = this.authorizedPersonForm.value?.authorized_person;
        } else if (this.activeLoginTab === 'individual' && this.activeTab === 'otp') {
            mobile = this.individualForm.value?.mobile;
        }
        
        if (mobile && mobile?.length >= 3) {
            return '******' + mobile.slice(-3);
        }
        
        return '';
    }
    
    public togglePassword() {
        this.showPassword = !this.showPassword; // Toggle the password visibility
        this.toggleClass = this.showPassword ? 'ri-eye-off-fill' : 'ri-eye-fill'; // Toggle the icon
    }
    
}