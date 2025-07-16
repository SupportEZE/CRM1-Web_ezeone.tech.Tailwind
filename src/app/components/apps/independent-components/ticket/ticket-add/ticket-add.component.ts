import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared.module';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { ApiService } from '../../../../../core/services/api/api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FilePondModule } from 'ngx-filepond';
import { CommonApiService } from '../../../../../shared/services/common-api.service';
import { LogService } from '../../../../../core/services/log/log.service';
import { ModuleService } from '../../../../../shared/services/module.service';
import { UploadFileService } from '../../../../../shared/services/upload.service';
import { ModalHeaderComponent } from '../../../../../shared/components/modal-header/modal-header.component';
import { SpkNgSelectComponent } from '../../../../../../@spk/spk-ng-select/spk-ng-select.component';
import { SpkInputComponent } from '../../../../../../@spk/spk-input/spk-input.component';
import { FormValidationService } from '../../../../../utility/form-validation';
import { LOGIN_TYPES } from '../../../../../utility/constants';
import { AuthService } from '../../../../../shared/services/auth.service';

@Component({
    selector: 'app-ticket-add',
    imports: [FormsModule,CommonModule, SharedModule,MaterialModuleModule, FilePondModule,ReactiveFormsModule,ModalHeaderComponent, SpkNgSelectComponent, SpkInputComponent],
    templateUrl: './ticket-add.component.html',
})
export class TicketAddComponent {
    data:any ={};
    filter:any ={};
    userList:any =[];
    categoryTypeValue:any =[];
    today= new Date();
    pageType:any = 'add'
    form: any;
    submodule:any={};
    orgData:any ={};
    LOGIN_TYPES = LOGIN_TYPES
    
    constructor(private uploadService: UploadFileService, private logService: LogService, public moduleService: ModuleService, public CommonApiService: CommonApiService, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public modalData: any, private dialogRef: MatDialogRef<TicketAddComponent>, public api: ApiService, public toastr: ToastrServices, private formValidation:FormValidationService, private authService: AuthService){
        this.orgData = this.authService.getUser();
    }
    
    ngOnInit(){
        const subModule = this.moduleService.getModuleByName('Ticket');
        if (subModule) {
            this.submodule = subModule;
        }
        this.data = this.modalData.formData;
        this.pageType = this.modalData.formType;
        if (this.pageType === 'edit') {
            this.formsInit(this.modalData.formData)
        }else{
            this.formsInit({})
        }
        
        this.CommonApiService.getDropDownData(16,'ticket_category')
        this.CommonApiService.getDropDownData(16,'priority')
        this.CommonApiService.getCustomerTypeData()
        
    }
    
    formsInit(data:any){
        if (this.pageType === 'edit') {
            let initialFiles:any = [];
            data.attachment.forEach((row: any) => {
                initialFiles.push({ source: row.url, options: { type: 'local' } });
            });
            // this.pondFiles = initialFiles;
        }
        this.form = this.fb.group({
            ticket_category: [data.ticket_category ? data.ticket_category : '', Validators.required],
            // assign_to_user_id: [data.assign_to_user_id?._id ? data.assign_to_user_id?._id : '',],
            customer_id: [data.customer_id ? data.customer_id : '', Validators.required],
            customer_type_id: [data.customer_type_id ? data.customer_type_id : '', Validators.required],
            ticket_priority: [data.ticket_priority ? data.ticket_priority : '', Validators.required],
            ticket_description: [data.ticket_description ? data.ticket_description : '', Validators.required],
        });
        
        if (this.orgData.login_type_id === LOGIN_TYPES.ORGANIZATION_ADMIN || this.orgData.login_type_id === LOGIN_TYPES.SYSTEM_USER) {
            this.form.addControl(
                'assign_to_user_id',
                this.fb.control(data.assign_to_user_id?._id || '')
            );
        }
        
        if(data.customer_type_id)this.CommonApiService.getCustomerData(this.form.value.customer_type_id);
    }
    
    private lastSearchTerm: string = '';
    onSearch(search: string, type:any) {
        const trimmedSearch = search?.trim() || '';
        if (trimmedSearch === this.lastSearchTerm) {
            return;
        }
        this.lastSearchTerm = trimmedSearch;
        
        if(type === 'customer'){
            this.CommonApiService.getCustomerData(this.form.value.customer_type_id, '', search)
        }
    }
    
    findName(value: any, type: string) {
        if (type === 'customer_category'){
            const selectedValue = this.CommonApiService.customerCategorySubType.find((item: any) => item.value === value);
            if (selectedValue) {
                this.form.patchValue({ customer_type_name: selectedValue.label });
                this.form.patchValue({ collected_from_login_type_id: selectedValue.login_type_id });
            }
            this.CommonApiService.getCustomerData(this.form.value.customer_type_id);
        }
    }
    
    close() {
        this.dialogRef.close(); // Closes the dialog
    }
    
    priorityList = [
        { label: "High", value: "High"},
        { label: "Medium", value: "Medium"},
        { label: "Low", value: "Low" },
    ];
        
    pondOptions = this.getPondOptions('image');
    pondFiles: any[] = [];
    getPondOptions(type: 'image'): any {
        const commonOptions = {
            allowFileTypeValidation: true,
            labelIdle: "Click or drag files here to upload...",
            maxFiles: 5,
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
                labelFileTypeNotAllowed: 'Only PNG and JPEG files are allowed',
                fileValidateTypeLabelExpectedTypes: 'Allowed: PNG, JPEG',
                labelImageValidateSizeTooSmall: 'Image is too small. Min: {minWidth}×{minHeight}',
                labelImageValidateSizeTooBig: 'Image is too large. Max: {maxWidth}×{maxHeight}',
            };
        }
    }
    
    onFileProcessed(event: any, type: string) {
        const file = event.file.file;
        Object.assign(file, { image_type: type });
        if (type === 'image') {
            this.pondFiles = [...(this.pondFiles || []), file];
        }
    }
    
    onFileRemove(event: any, type: string) {
        const file = event.file.file;
        if (type === 'image') {
            const index = this.pondFiles.findIndex(f => f.name === file.name && f.size === file.size);
            if (index > -1) {
                this.pondFiles.splice(index, 1);
            }
        }
    }
    
    
    uploadresults:any =[]
    submiTicket(){
        if (this.orgData.org.sfa === false) {
            const assignToControl = this.form.get('assign_to_user_id');
            assignToControl?.clearValidators();
            assignToControl?.updateValueAndValidity();
            this.form.removeControl('assign_to_user_id');
        }
        if (this.form.valid){
            this.api.disabled = true;
            let function_name;
            if (this.orgData.login_type_id === LOGIN_TYPES.ORGANIZATION_ADMIN) {
                function_name = this.pageType === 'edit' ? 'ticket/admin/update' : 'ticket/admin/create';
            } else if (this.orgData.login_type_id === LOGIN_TYPES.FIELD_USER) {
                function_name = this.pageType === 'edit' ? 'ticket/user/update' : 'ticket/user/create';
            } else if (this.orgData.login_type_id === LOGIN_TYPES.PRIMARY || this.orgData.login_type_id === LOGIN_TYPES.SUB_PRIMARY) {
                function_name = this.pageType === 'edit' ? 'ticket/customer/update' : 'ticket/customer/create';
            }
            else {
                function_name = this.pageType === 'edit' ? 'ticket/update' : 'ticket/create';
            }
            this.formValidation.removeEmptyFields(this.form.value)
            const httpMethod = this.pageType === 'edit' ? 'patch' : 'post';
            this.api[httpMethod](this.form.value, function_name).subscribe(async result => {
                if(result['statusCode'] === 200){
                    if (this.pondFiles.length > 0) {
                        this.uploadService.uploadFile(result['data']['inserted_id'], 'ticket', this.pondFiles, 'Ticket Images', this.submodule, undefined, () => this.dialogRef.close(true))
                    }
                    else{
                        this.api.disabled = false;
                        if (this.pageType === 'edit') {
                            this.logService.logActivityOnUpdate(this.pageType == 'edit' ? true : false, this.modalData.formData, this.form.value,this.submodule.module_id, this.submodule.title, 'update', this.data._id || null, () => { }, this.submodule.module_type);
                        }
                        this.dialogRef.close(true)
                        this.toastr.success(result['message'], '', 'toast-top-right');
                    }
                }
                else
                {
                    this.api.disabled = false;
                }
            });
        }
        else{
            this.formValidation.markFormGroupTouched(this.form);
        }
    }
}
