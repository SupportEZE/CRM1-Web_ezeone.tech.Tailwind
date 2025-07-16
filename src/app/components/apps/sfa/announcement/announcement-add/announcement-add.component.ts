import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../../../core/services/api/api.service';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { CommonApiService } from '../../../../../shared/services/common-api.service';
import { DateService } from '../../../../../shared/services/date.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LogService } from '../../../../../core/services/log/log.service';
import { ModuleService } from '../../../../../shared/services/module.service';
import { FilePondModule } from 'ngx-filepond';
import { LOGIN_TYPES } from '../../../../../utility/constants';
import { UploadFileService } from '../../../../../shared/services/upload.service';
import { FormValidationService } from '../../../../../utility/form-validation';
import { SpkInputComponent } from '../../../../../../@spk/spk-input/spk-input.component';
import { SpkNgSelectComponent } from '../../../../../../@spk/spk-ng-select/spk-ng-select.component';
import { AuthService } from '../../../../../shared/services/auth.service';

@Component({
    selector: 'app-announcement-add',
    imports: [FormsModule,CommonModule, SharedModule,MaterialModuleModule, SpkInputComponent, SpkNgSelectComponent, FilePondModule,ReactiveFormsModule],
    templateUrl: './announcement-add.component.html',
})
export class AnnouncementAddComponent {
    announcementForm: FormGroup = new FormGroup({});
    pageType:any = 'add'
    skLoading:boolean = false
    modules:any={};
    pondFiles: any[] = [];
    pondBannerFiles: any[] = [];
    pondAttachmentFiles: any[] = [];
    orgData: any = {}
    
    constructor(public dialog: MatDialog, public api: ApiService, public toastr: ToastrServices, public CommonApiService: CommonApiService, private dateService: DateService, private fb: FormBuilder, private router: Router, public route: ActivatedRoute, private formValidation: FormValidationService, private authService: AuthService,private moduleService : ModuleService,public uploadService: UploadFileService){
        this.orgData = this.authService.getUser();
    }
    
    ngOnInit() {
        const modules = this.moduleService.getModuleByName('Announcement');
        if (modules) {
            this.modules = modules;
        }
        
        this.announcementForm = new FormGroup({
            title: new FormControl('', Validators.required),
            login_type_name: new FormControl('', Validators.required),
            login_type_id: new FormControl('', Validators.required),
            customer_type_name: new FormControl('', Validators.required),
            customer_type_id: new FormControl('', Validators.required),
            state: new FormControl('', Validators.required),
            status: new FormControl('Published', Validators.required),
            description: new FormControl('', Validators.required),
        });
        
        this.CommonApiService.getStates()
        let PRIMARY_CUSTOMER: number[] = [];
        let SECONDARY_CUSTOMER: number[] = [];
        let INFLUENCER: number[] = [];
        
        
        if (this.orgData?.org?.sfa || this.orgData?.org?.dms) {
            PRIMARY_CUSTOMER = [LOGIN_TYPES.PRIMARY, LOGIN_TYPES.SUB_PRIMARY];
            SECONDARY_CUSTOMER = [LOGIN_TYPES.SECONDARY];
        }
        if (this.orgData?.org?.irp) {
            INFLUENCER = [LOGIN_TYPES.INFLUENCER]
        }
        const login_type_ids = [...(PRIMARY_CUSTOMER || []), ...(SECONDARY_CUSTOMER || []), ...(INFLUENCER || [])]
        this.CommonApiService.getLoginType(login_type_ids)
        // this.setAllowMultiple('banner');
        
    }
    
    onLoginTypeChange(value: any) {
        const selectedValue = this.CommonApiService.loginType.find((item: any) => item.value === value);
        if (selectedValue) {
            this.announcementForm.patchValue({
                login_type_name: selectedValue.label,
            });
            
            this.CommonApiService.getCustomerCategorySubType(this.announcementForm.value.login_type_id);
        }
    }
    
    onCustomerCategoryChange(value: any) {
        const selectedValue = this.CommonApiService.customerCategorySubType.find((item: any) => item.value === value);
        if (selectedValue) {
            this.announcementForm.patchValue({
                customer_type_name: selectedValue.label,
            });
        }
    }
    
    
    pondOptions = this.getPondOptions('image');
    pondDocumentOptions = this.getPondOptions('pdf');
    getPondOptions(type: 'image' | 'pdf'): any {
        const commonOptions = {
            allowFileTypeValidation: true,
            labelIdle: "Click or drag files here to upload...",
            maxFiles: 1,
            server: {
                process: (_fieldName: any, file: any, _metadata: any, load: (arg0: string) => void) => {
                    setTimeout(() => {
                        load(Date.now().toString());
                    }, 1000);
                },
                revert: (_uniqueFileId: any, load: () => void) => {
                    load();
                }
            }
        };
        
        if (type === 'image') {
            return {
                ...commonOptions,
                allowMultiple: false,
                acceptedFileTypes: ['image/jpeg', 'image/png', 'image/jpg'],
                maxFileSize: '2MB',
                allowImageValidateSize: true,
                // imageValidateSizeMinWidth: 1600,
                // imageValidateSizeMinHeight: 900,
                // imageValidateSizeMaxWidth: 1600,
                // imageValidateSizeMaxHeight: 900,
                labelFileTypeNotAllowed: 'Only PNG and JPEG files are allowed',
                fileValidateTypeLabelExpectedTypes: 'Allowed: PNG, JPEG',
                labelImageValidateSizeTooSmall: 'Image is too small. Min: {minWidth}×{minHeight}',
                labelImageValidateSizeTooBig: 'Image is too large. Max: {maxWidth}×{maxHeight}',
            };
        } else {
            return {
                ...commonOptions,
                allowMultiple: true,
                acceptedFileTypes: ['application/pdf'],
                maxFileSize: '10MB',
                labelFileTypeNotAllowed: 'Only PDF files are allowed',
                fileValidateTypeLabelExpectedTypes: 'Allowed: PDF',
            };
        }
    }
    onFileProcessed(event: any, type: string) {
        const file = event.file.file;
        Object.assign(file, { image_type: type });
        if (type === 'image') {
            this.pondBannerFiles = [...(this.pondBannerFiles || []), file];
        } else if (type === 'pdf') {
            this.pondAttachmentFiles = [...(this.pondAttachmentFiles || []), file];
        }
    }
    
    onFileRemove(event: any, type: string) {
        const file = event.file.file;
        if (type === 'image') {
            const index = this.pondBannerFiles.findIndex(f => f.name === file.name && f.size === file.size);
            if (index > -1) {
                this.pondBannerFiles.splice(index, 1);
            }
        } else if (type === 'document') {
            const index = this.pondAttachmentFiles.findIndex(f => f.name === file.name && f.size === file.size);
            if (index > -1) {
                this.pondAttachmentFiles.splice(index, 1);
            }
        }
    }

    onSearch(search: string) {
        this.CommonApiService.getStates(search)
    }
    
    onSubmit() {
        if (this.announcementForm.valid){
            this.pondFiles = [...this.pondBannerFiles, ...this.pondAttachmentFiles];
            if (this.pondFiles.length === 0 && this.pageType === 'add') {
                this.toastr.error('Please upload at least one file.', '', 'toast-top-right');
                return;
            }
            else{
                this.api.disabled = true;
                this.api.post(this.announcementForm.value, 'announcement/create').subscribe(result => {
                    if (result['statusCode'] == 200) {
                        if (this.pondFiles.length > 0) {
                            this.uploadService.uploadFile(result['data']['inserted_id'], 'announcement', this.pondFiles, 'Announcement Images', this.modules, '/apps/sfa/announcement')
                        }
                        else {
                            this.api.disabled = false;
                            this.router.navigate(['/apps/sfa/announcement']);
                            this.toastr.success(result['message'], '', 'toast-top-right');
                            this.announcementForm.reset();
                        }
                    }
                });
            }
            
        }
        else{
            this.formValidation.markFormGroupTouched(this.announcementForm); // Call the global function
        }
    }
    
    statusType = [
        { label: "Published", value: "Published" },
        { label: "Unpublished", value: "Unpublished" }
    ]
}
