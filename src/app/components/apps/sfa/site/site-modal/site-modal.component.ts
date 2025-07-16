import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../../../core/services/api/api.service';
import { SharedModule } from '../../../../../shared/shared.module';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SpkInputComponent } from '../../../../../../@spk/spk-input/spk-input.component';
import { FormValidationService } from '../../../../../utility/form-validation';
import { SpkNgSelectComponent } from '../../../../../../@spk/spk-ng-select/spk-ng-select.component';
import { ModalHeaderComponent } from '../../../../../shared/components/modal-header/modal-header.component';
import { LogService } from '../../../../../core/services/log/log.service';
import { FilePondModule } from 'ngx-filepond';
import { CommonApiService } from '../../../../../shared/services/common-api.service';
import { UploadFileService } from '../../../../../shared/services/upload.service';

@Component({
    selector: 'app-site-modal',
    imports: [SharedModule, FilePondModule, MaterialModuleModule, ModalHeaderComponent, FormsModule, CommonModule, ReactiveFormsModule, SpkInputComponent],
    templateUrl: './site-modal.component.html'
})
export class SiteModalComponent {
    data: any = {}
    contactPersonForm!: FormGroup;
    poinLocationForm!: FormGroup;
    pageType: any = 'add'
    userList: any = []
    @Output() valueChange = new EventEmitter<any>();
    originalData: any = {};
    editId: any;
    
    constructor(public toastr: ToastrServices, @Inject(MAT_DIALOG_DATA) public modalData: any, public dialogRef: MatDialogRef<SiteModalComponent>, public api: ApiService, private fb: FormBuilder, private formValidation: FormValidationService, private logService: LogService, public CommonApiService: CommonApiService, public uploadService: UploadFileService) {
    }
    
    ngOnInit() {
        this.contactPersonForm = this.fb.group({
            contact_person_name: ['', Validators.required],
            contact_person_mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
            designation: ['', Validators.required],
        });
        
        this.poinLocationForm = this.fb.group({
            lat: ['', Validators.required],
            long: ['', Validators.required],
        });
        
        if (this.modalData.pageType === 'contact_person') {
            this.data = this.modalData.data;
            if (this.data) {
                this.originalData = this.data;
                this.contactPersonForm.patchValue(this.data);
                this.editId = this.data._id;
                this.pageType = this.data._id ? 'edit' : 'add'
            }
        }

        if (this.modalData.pageType === 'point_location') {
            this.data = this.modalData.data;
            if (this.data) {
                this.originalData = this.data;
                this.poinLocationForm.patchValue(this.data);
                this.editId = this.data._id;
                this.pageType = this.data._id ? 'edit' : 'add'
            }
        }
    }
    
    
    
    // Contact Person Submit Funcation Start
    submitContactPerson() {
        if (this.contactPersonForm.valid) {
            if (this.editId) {
                this.contactPersonForm.value._id = this.editId;
            }
            this.contactPersonForm.value.site_project_id = this.modalData.DetailId;
            this.api.disabled = true;
            
            const isEditMode = this.pageType === 'edit';
            if (isEditMode) {
                const noChanges = this.logService.logActivityOnUpdate(
                    isEditMode,
                    this.originalData,
                    this.contactPersonForm.value,
                    this.modalData.submodule.module_id,
                    this.modalData.submodule.title,
                    'update',
                    this.modalData.DetailId || null,
                    () => { },
                    this.modalData.submodule.module_type
                );
                if (noChanges) {
                    this.api.disabled = false;
                    this.toastr.warning('No changes detected', '', 'toast-top-right')
                    return;
                }
            }
            
            const httpMethod = isEditMode ? 'patch' : 'post';
            const functionName = isEditMode ? 'sites/update-contact' : 'sites/save-contact';
            this.api[httpMethod](this.contactPersonForm.value, functionName).subscribe(result => {
                if (result['statusCode'] == 200) {
                    this.api.disabled = false;
                    this.toastr.success(result['message'], '', 'toast-top-right');
                    this.dialogRef.close(true)
                }
            });
        }
        else {
            this.formValidation.markFormGroupTouched(this.contactPersonForm);
        }
    }
    // Contact Person Submit Funcation End  
    
    // Other Information Submit Funcation Start
    updateLocation() {
        if (this.poinLocationForm.valid) {
            this.poinLocationForm.value.site_project_id = this.modalData.DetailId;
            
            const isEditMode = this.pageType === 'edit';
            if (isEditMode) {
                const noChanges = this.logService.logActivityOnUpdate(
                    isEditMode,
                    this.originalData,
                    this.poinLocationForm.value,
                    this.modalData.submodule.module_id,
                    this.modalData.submodule.title,
                    'update',
                    this.modalData.DetailId || null,
                    () => { },
                    this.modalData.submodule.module_type
                );
                if (noChanges) {
                    this.api.disabled = false;
                    this.toastr.warning('No changes detected', '', 'toast-top-right')
                    return;
                }
            }
            
            // const httpMethod = isEditMode ? 'patch' : 'post';
            // const functionName = isEditMode ? 'customer/update-shipping-address' : 'customer/save-other-info';
            this.api.disabled = true;
            this.api.patch(this.poinLocationForm.value, 'sites/save-location').subscribe(result => {
                if (result['statusCode'] == 200) {
                    this.api.disabled = false;
                    this.dialogRef.close(true)
                    this.toastr.success(result['message'], '', 'toast-top-right');
                }
            });
        }
        else {
            this.formValidation.markFormGroupTouched(this.poinLocationForm);
        }
    }
    // Other Information Submit Funcation End
    
    
    closeModal() {
        this.dialogRef.close(); // Closes the dialog
    }
}

