import { Component, Inject } from '@angular/core';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { ApiService } from '../../../../../core/services/api/api.service';
import { CommonApiService } from '../../../../../shared/services/common-api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LogService } from '../../../../../core/services/log/log.service';
import { FilePondModule } from 'ngx-filepond';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalHeaderComponent } from '../../../../../shared/components/modal-header/modal-header.component';
import { ModuleService } from '../../../../../shared/services/module.service';
import { UploadFileService } from '../../../../../shared/services/upload.service';
import { LOGIN_TYPES } from '../../../../../utility/constants';

@Component({
    selector: 'app-spare-part-add',
    imports: [CommonModule, SharedModule,ModalHeaderComponent, MaterialModuleModule,ReactiveFormsModule, FilePondModule],
    templateUrl: './spare-part-add.component.html',
})
export class SparePartAddComponent {
    data:any ={};
    pageType:any = 'add';
    skLoading:boolean = false
    addForm: FormGroup = new FormGroup({});
    stockForm: FormGroup = new FormGroup({});
    modules:any={};
    assign_to_type: any = [];
    assign_from: any = [];
    listing: any = [];
    submodule:any;
    originalData:any={}
    
    constructor(@Inject(MAT_DIALOG_DATA) public modalData: any, private dialogRef: MatDialogRef<SparePartAddComponent>, public api: ApiService,public toastr: ToastrServices,public CommonApiService: CommonApiService,private fb: FormBuilder,public uploadService: UploadFileService,private logService: LogService,private moduleService : ModuleService){}
    
    
    ngOnInit() {        
        const modules = this.moduleService.getSubModuleByName('WCMS', 'Spare Part');
        if (modules) {
            this.modules = modules;
            console.log(this.modules);
        }
        
        if (this.modalData.formType === 'manage-transaction') {
            this.getList();
        }
        
        this.addForm = this.fb.group({
            product_name: ['', Validators.required],
            mrp: ['', Validators.required],
            description: ['', Validators.required],
            _id: [''],
        });
        
        this.stockForm = this.fb.group({
            transaction_type: ['', Validators.required],
            assign_to_type: [''],
            assign_from: [''],
            assigned_to_id: [''],
            assigned_to_user_id: [''],
            
            // assigned_from_id: [''],
            assigned_to_name: [''],
            assigned_from_name: [''],
            assigned_to_login_id: [''],
            // assign_from_login_id: [''],
            product_id: ['', Validators.required],
            product_name: ['', Validators.required],
            delivery_note: ['', Validators.required],
            transaction_qty: ['', Validators.required],
        });
        
        this.stockForm.get('transaction_type')?.valueChanges.subscribe((transaction_type) => {
            if (transaction_type === 'Fresh Purchase') {
                this.stockForm.get('assign_to_type')?.clearValidators();
                this.stockForm.get('assigned_to_id')?.clearValidators();
                this.stockForm.get('assigned_to_login_id')?.clearValidators();
                
                this.stockForm.get('assign_to_type')?.updateValueAndValidity();
                this.stockForm.get('assigned_to_id')?.updateValueAndValidity();
                this.stockForm.get('assigned_to_login_id')?.updateValueAndValidity();
            }
            else if (transaction_type === 'External'){
                this.stockForm.get('assign_from')?.clearValidators();
                
                this.stockForm.get('assign_from')?.updateValueAndValidity();
                
            }
            else {
                // this.stockForm.get('assign_to_type')?.setValidators([Validators.required]);
                // this.stockForm.get('assigned_to_id')?.setValidators([Validators.required]);
                this.stockForm.get('assigned_to_login_id')?.setValidators([Validators.required]);
                
                // this.stockForm.get('assign_to_type')?.updateValueAndValidity();
                // this.stockForm.get('assigned_to_id')?.updateValueAndValidity();
                this.stockForm.get('assigned_to_login_id')?.updateValueAndValidity();
            }
        });

        if (this.modalData.formType === 'edit') {
            this.pageType = this.modalData.formType;
            this.addForm.patchValue({ 
                ...this.modalData.formData,
                _id: this.modalData.formData._id
            });
            this.originalData = JSON.parse(JSON.stringify(this.modalData.formData));
        }
    }
    
    onSearch(search: string, type:any) {        
        if(type === 'customer'){
            this.CommonApiService.getCustomerData(this.stockForm.value.customer_type_id, '', search)
        }
        if(type === 'user'){
            this.CommonApiService.getUserData(search) 
        }
    }
    
    findName(value: any, type: string) {
        if (type === 'assign_to_type' || type === 'assign_from') {
            const assignToType = this.stockForm.value.assign_to_type;
            const assignFrom = this.stockForm.value.assign_from;
            if (assignToType === 'Team' || assignFrom === 'Team') {
                this.CommonApiService.getUserData([LOGIN_TYPES.SERVICE_FIELD_USER], '');
            }            
            if (assignToType === 'Customer' || assignFrom === 'Customer') {
                this.CommonApiService.getCustomerData();
                const selectedValue = this.CommonApiService.customerData.find((item: any) => item.value === value);
                if (selectedValue) {
                    this.stockForm.patchValue({ assigned_to_name: selectedValue.label });
                    this.stockForm.patchValue({ assigned_to_login_id: selectedValue.login_type_id });
                }
            }
        }
        if (type === 'customer_name' ){
            const assignToType = this.stockForm.value.assign_to_type;
            if (assignToType === 'Team') {
                const selectedValue = this.CommonApiService.userData.find((item: any) => item.value === value);
                if (selectedValue) {
                    this.stockForm.patchValue({ assigned_to_name: selectedValue.label });
                    this.stockForm.patchValue({ assigned_to_login_id: selectedValue.login_type_id });
                }
            }
            if (assignToType === 'Customer') {
                const selectedValue = this.CommonApiService.customerData.find((item: any) => item.value === value);
                if (selectedValue) {
                    this.stockForm.patchValue({
                        assigned_to_name: selectedValue.label || '',
                        assigned_to_login_id: selectedValue.login_type_id || ''
                    });
                }
            }
        }
        
        if (type === 'customer') {
            const selectedValue = this.CommonApiService.customerData.find((item: any) => item.value === value);
            if (selectedValue) {
                this.stockForm.patchValue({
                    assigned_to_name: selectedValue.label || '',
                    assigned_to_login_id: selectedValue.login_type_id || ''
                });
            }
        }
        
        if (type === 'service_user') {
            const selectedValue = this.CommonApiService.userData.find((item: any) => item.value === value);
            if (selectedValue) {
                this.stockForm.patchValue({
                    assigned_to_name: selectedValue.label || '',
                    assigned_to_login_id: selectedValue.login_type_id || ''
                    
                });
            }
            // }
        }  
        if (type === 'product_name'){
            const selectedValue = this.listing.find((item: any) => item._id === value);
            if (selectedValue) {
                this.stockForm.patchValue({ product_name: selectedValue.product_name });
            }
        }
    }
    
    getList(){
        this.api.post({page: 1}, 'spare-part/read').subscribe(result => {
            if(result['statusCode'] == 200){
                this.listing = result['data']['result'];
            }
        });
    }
    
    pondFiles: File[] = [];
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
    
    onSubmitSparePart() {
        if (this.addForm.invalid) {
            this.addForm.markAllAsTouched();
            return
        }        
        if (this.pondFiles.length === 0 && this.modalData.formType === 'add') {
            this.toastr.error('Please upload at least one file.', '', 'toast-top-right');
            return;
        }
        this.api.disabled = true;
        
        const isEditMode = this.pageType === 'edit';
        
        if (isEditMode) {
            const noChanges = this.logService.logActivityOnUpdate(
                isEditMode, 
                this.originalData, 
                this.addForm.value, 
                this.modules.module_id,
                this.modules.title,
                'update', 
                this.originalData._id || null,
                () => {},
                this.modules.module_type
            );
            if (noChanges) {
                if (this.pondFiles.length=== 0){
                    this.api.disabled = false;
                    this.toastr.warning('No changes detected', '', 'toast-top-right')
                    return;
                }
            }
        }        
        const httpMethod = isEditMode ? 'patch' : 'post';
        const functionName = isEditMode ? 'spare-part/update-spare-part' : 'spare-part/create-spare-part';
        this.api[httpMethod](this.addForm.value, functionName).subscribe(result => {
            if (result['statusCode'] === 200) {
                if (this.pondFiles.length > 0){
                    this.api.disabled = true;
                    this.uploadService.uploadFile(result['data']['inserted_id'], 'spare-part', this.pondFiles, 'Spare Part Images', this.modules, undefined, () => this.dialogRef.close(true))
                }
                else {
                    this.api.disabled = false;
                    this.toastr.success(result['message'], '', 'toast-top-right');
                    this.dialogRef.close(true)
                }
            }                
        });        
    }
    
    onSubmitManageStock() {
        if (this.stockForm.invalid) {
            this.toastr.error('Form Is Invalid', '', 'toast-top-right');
            this.stockForm.markAllAsTouched();
            
            const invalidFields = Object.keys(this.stockForm.controls).filter(field =>
                this.stockForm.get(field)?.invalid
            );
            console.warn('Invalid fields:', invalidFields);
            
            return;
        }
        
        
        if (this.stockForm.value.transaction_type === 'Fresh Purchase') {
            delete this.stockForm.value.assigned_to_id;
            delete this.stockForm.value.assigned_to_login_id;
        }
        this.api.disabled = true;
        this.api.post(this.stockForm.value, 'spare-part/create-manage-stock').subscribe(result => {
            if (result['statusCode'] === 200) {
                this.api.disabled = false;
                this.toastr.success(result['message'], '', 'toast-top-right');
                this.dialogRef.close(true)
            }                
        });        
    }
    
    getAssignToTypeOptions(): any[] {
        this.assign_to_type = [];
        this.assign_from = [];
        if (this.stockForm.value.transaction_type === 'Fresh Purchase') {
            this.assign_to_type.push({ label: 'Vendor', value: 'Vendor' });
        }
        if (this.stockForm.value.transaction_type === 'External') {
            this.assign_from.push({ label: 'Team', value: 'Team' },{ label: 'Customer', value: 'Customer' });
        }
        else{
            this.assign_to_type.push({ label: 'Team', value: 'Team' },{ label: 'Customer', value: 'Customer' });
        }
        return this.assign_to_type;
    }
    
    close() {
        this.dialogRef.close(); // Closes the dialog
    }
    
    transaction_type = [
        {
            label: 'Fresh Purchase',
            value: 'Fresh Purchase',
        },
        {
            label: 'Assign',
            value: 'Assign',
        },
        {
            label: 'Return',
            value: 'Return',
        },
        {
            label: 'External',
            value: 'External',
        },
    ]
}
