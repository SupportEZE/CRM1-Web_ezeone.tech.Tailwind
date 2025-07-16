import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { NameUtilsService } from '../../../../../utility/name-utils';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalHeaderComponent } from '../../../../../shared/components/modal-header/modal-header.component';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { CommonApiService } from '../../../../../shared/services/common-api.service';
import { FilePondModule } from 'ngx-filepond';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { LOGIN_TYPES } from '../../../../../utility/constants';
import { FormValidationService } from '../../../../../utility/form-validation';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { SpkNgSelectComponent } from '../../../../../../@spk/spk-ng-select/spk-ng-select.component';
import { SpkInputComponent } from '../../../../../../@spk/spk-input/spk-input.component';
import { ApiService } from '../../../../../core/services/api/api.service';
import { UploadFileService } from '../../../../../shared/services/upload.service';
import { ModuleService } from '../../../../../shared/services/module.service';
import { SpkFlatpickrComponent } from '../../../../../../@spk/spk-flatpickr/spk-flatpickr.component';

@Component({
    selector: 'app-payment-collection-add',
    standalone:true,
    imports: [CommonModule, SharedModule, ModalHeaderComponent,MaterialModuleModule,FilePondModule,SpkInputComponent,SpkFlatpickrComponent, SpkNgSelectComponent,ReactiveFormsModule],
    templateUrl: './payment-collection-add.component.html',
})
export class PaymentCollectionAddComponent {
    addForm: FormGroup = new FormGroup({});
    statusForm: FormGroup = new FormGroup({});
    submodule:any;
    LOGIN_TYPES = LOGIN_TYPES;
    today= new Date();
    pondFiles: any[] = [];
    
    constructor(@Inject(MAT_DIALOG_DATA) public modalData: any, private dialogRef: MatDialogRef<PaymentCollectionAddComponent>,public nameUtils: NameUtilsService,public CommonApiService: CommonApiService,private toastr: ToastrServices, public api: ApiService, private fb: FormBuilder,private formValidation: FormValidationService,private moduleService : ModuleService, public uploadService: UploadFileService){}
    
    ngOnInit() {
        if (this.modalData.formType === 'add') {
            this.CommonApiService.getCustomerCategorySubType([LOGIN_TYPES.PRIMARY , LOGIN_TYPES.SUB_PRIMARY ,LOGIN_TYPES.SECONDARY]);
        }
        
        this.addForm = this.fb.group({
            customer_type_id: ['', Validators.required],
            customer_type_name: ['', Validators.required],
            collected_from_login_type_id: ['', Validators.required],
            collected_from_id: ['', Validators.required],
            collected_from_name: ['', Validators.required],
            amount: ['', Validators.required],
            payment_mode: ['Cheque', Validators.required],
            transaction_id: [''],
            payment_date: ['', Validators.required],
            payment_to_name: [''],
            payment_to_id: [''],
            payment_to_login_type_id: [''],
        });
        
        this.addForm.get('payment_mode')?.valueChanges.subscribe((mode) => {
            if (mode === 'Cash') {
                this.addForm.get('transaction_id')?.clearValidators();
            } 
            else{
                this.addForm.get('transaction_id')?.setValidators([Validators.required]);
            }
        });
        
        this.addForm.get('collected_from_login_type_id')?.valueChanges.subscribe((customer_type) => {
            if (customer_type === LOGIN_TYPES.PRIMARY || customer_type === LOGIN_TYPES.SUB_PRIMARY) {
                this.addForm.get('payment_to_name')?.clearValidators();
                this.addForm.get('payment_to_id')?.clearValidators();
                this.addForm.get('payment_to_login_type_id')?.clearValidators();
            } 
            else{
                this.addForm.get('payment_to_name')?.setValidators([Validators.required]);
                this.addForm.get('payment_to_id')?.setValidators([Validators.required]);
                this.addForm.get('payment_to_login_type_id')?.setValidators([Validators.required]);
            }
        });
        
        this.statusForm = this.fb.group({
            status: ['', Validators.required],
            reason: ['', Validators.required],
        });
        
    }
    
    private lastSearchTerm: string = '';
    onSearch(search: string, type:any) {
        const trimmedSearch = search?.trim() || '';
        if (trimmedSearch === this.lastSearchTerm) {
            return;
        }
        this.lastSearchTerm = trimmedSearch;
        
        if(type === 'customer'){
            this.CommonApiService.getCustomerData(this.addForm.value.customer_type_id, '', search)
        }
    }
    
    pondOptions = this.getPondOptions('image');
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
    
    
    findName(value: any, type: string) {
        if (type === 'customer_category'){
            const selectedValue = this.CommonApiService.customerCategorySubType.find((item: any) => item.value === value);
            if (selectedValue) {
                this.addForm.patchValue({ customer_type_name: selectedValue.label });
                this.addForm.patchValue({ collected_from_login_type_id: selectedValue.login_type_id });
            }
            this.CommonApiService.getCustomerData(this.addForm.value.customer_type_id);
        }
        if (type === 'customer_name' ){
            const selectedValue = this.CommonApiService.customerData.find((item: any) => item.value === value);
            if (selectedValue) {
                this.addForm.patchValue({ collected_from_name: selectedValue.label });
                
                if (this.addForm.get('collected_from_login_type_id')?.value === LOGIN_TYPES.SECONDARY) {
                    this.CommonApiService.getCustomerMapping(this.addForm.value.collected_from_id);
                }
            }
        }
        if (type === 'payment_to_name'){
            const selectedValue = this.CommonApiService.customerMapping.find((item: any) => item.value === value);
            if (selectedValue) {
                this.addForm.patchValue({ payment_to_name: selectedValue.label });
                this.addForm.patchValue({ payment_to_login_type_id: selectedValue.login_type_id });
                
            } 
        }
    }
    
    onSubmit() {
        if (this.addForm.invalid) {
            this.toastr.error('Form Is Invalid', '', 'toast-top-right')
            this.addForm.markAllAsTouched();
            const invalidFields = Object.keys(this.addForm.controls).filter(field =>
                this.addForm.get(field)?.invalid
            );
            
            console.warn('Invalid fields:', invalidFields); // Optional: log for debugging
            return
        }        
        if (this.addForm.value.payment_mode !== 'Cash' && this.pondFiles.length === 0) {
            this.toastr.error('Please upload at least one file.', '', 'toast-top-right');
            return;
        }
        this.api.disabled = true;
        this.api.post(this.addForm.value, 'payment/create').subscribe(result => {
            if (result['statusCode'] === 200) {
                if (this.pondFiles.length > 0){
                    this.api.disabled = true;
                    this.uploadService.uploadFile(result['data']['inserted_id'], 'payment', this.pondFiles, 'Payment Collection Images', this.submodule, undefined, () => this.dialogRef.close(true))
                }
                else {
                    this.api.disabled = false;
                    this.toastr.success(result['message'], '', 'toast-top-right');
                    this.dialogRef.close(true)
                }
            }                
        });        
    }
    
    statusChange()
    {
        if (this.statusForm.invalid) {
            this.statusForm.markAllAsTouched();
            return
        }
        const payload = {
            ...this.statusForm.value,
            customers: this.modalData.selectedRows
        };
        
        this.api.disabled = true;
        this.api.patch(payload, 'payment/update-status').subscribe(result => {
            if (result['statusCode'] === 200) {
                this.api.disabled = false;
                this.toastr.success(result['message'], '', 'toast-top-right');
                this.dialogRef.close(true)
            }                
        }); 
    }
    
    close() {
        this.dialogRef.close(); // Closes the dialog
    }
    
    modeList = [
        {
            label : 'Cash',
            value : 'Cash',
        },
        {
            label : 'Cheque',
            value : 'Cheque',
        },
        {
            label : 'Online',
            value : 'Online',
        },
    ]
    
    statusList = [
        {
            label : 'Verified',
            value : 'Verified',
        },
        {
            label : 'Reject',
            value : 'Reject',
        }
    ]
}
