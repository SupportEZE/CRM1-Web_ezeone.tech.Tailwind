import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { NameUtilsService } from '../../../../../utility/name-utils';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalHeaderComponent } from '../../../../../shared/components/modal-header/modal-header.component';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { CommonApiService } from '../../../../../shared/services/common-api.service';
import { CommonModule } from '@angular/common';
import { FilePondModule } from 'ngx-filepond';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { SpkNgSelectComponent } from '../../../../../../@spk/spk-ng-select/spk-ng-select.component';
import { ApiService } from '../../../../../core/services/api/api.service';
import { UploadFileService } from '../../../../../shared/services/upload.service';
import { SpkInputComponent } from '../../../../../../@spk/spk-input/spk-input.component';
import { LogService } from '../../../../../core/services/log/log.service';
import { ModuleService } from '../../../../../shared/services/module.service';

@Component({
    selector: 'app-pop-gift-add',
    imports: [CommonModule, SharedModule, ModalHeaderComponent,MaterialModuleModule,FilePondModule, SpkNgSelectComponent, SpkInputComponent,ReactiveFormsModule],
    templateUrl: './pop-gift-add.component.html',
})
export class PopGiftAddComponent {
    data:any ={};
    addForm: FormGroup = new FormGroup({});
    stockForm: FormGroup = new FormGroup({});
    submodule:any;
    listing: any = [];
    assign_to_type: any = [];
    pageType:any = 'add';
    originalData:any={}
    
    constructor(@Inject(MAT_DIALOG_DATA) public modalData: any, private dialogRef: MatDialogRef<PopGiftAddComponent>,public nameUtils: NameUtilsService,public CommonApiService: CommonApiService,private toastr: ToastrServices,public api: ApiService,private fb: FormBuilder,public uploadService: UploadFileService,private logService: LogService,private moduleService : ModuleService){}
    
    ngOnInit() {
        const subModule = this.moduleService.getSubModuleByName('SFA', 'Pop Gift');
        if (subModule) {
            this.submodule = subModule;
        }
        
        if (this.modalData.formType === 'manage-transaction') {
            this.getList();
        }
        
        this.addForm = this.fb.group({
            product_name: ['', Validators.required],
            description: ['', Validators.required],
            _id: [''],
        });
        
        this.stockForm = this.fb.group({
            transaction_type: ['', Validators.required],
            assign_to_type: [''],
            assigned_to_id: [''],
            assigned_to_login_id: [''],
            assigned_to_name: ['', Validators.required],
            product_id: ['', Validators.required],
            product_name: ['', Validators.required],
            transaction_qty: ['', Validators.required],
            delivery_note: ['', Validators.required],
        });
        
        this.stockForm.get('transaction_type')?.valueChanges.subscribe((transaction_type) => {
            if (transaction_type === 'Fresh Purchase') {
                this.stockForm.get('assign_to_type')?.clearValidators();
                this.stockForm.get('assigned_to_id')?.clearValidators();
                this.stockForm.get('assigned_to_login_id')?.clearValidators();
            } 
            else{
                this.stockForm.get('assign_to_type')?.setValidators([Validators.required]);
                this.stockForm.get('assigned_to_id')?.setValidators([Validators.required]);
                this.stockForm.get('assigned_to_login_id')?.setValidators([Validators.required]);
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
    
    getList(){
        this.api.post({page: 1}, 'pop-gift/read-pop-gift').subscribe(result => {
            if(result['statusCode'] == 200){
                this.listing = result['data']['result'];
            }
        });
    }
    
    private lastSearchTerm: string = '';
    onSearch(search: string, type:any) {
        const trimmedSearch = search?.trim() || '';
        if (trimmedSearch === this.lastSearchTerm) {
            return;
        }
        this.lastSearchTerm = trimmedSearch;
        
        if(type === 'Team'){
            this.CommonApiService.getUserData(search);
        }
        if(type === 'Customer'){
            this.CommonApiService.getCustomerData('', '', search)
        }
    }
    
    findName(value: any, type: string) {
        if (type === 'assign_to_type' ){
            if (this.stockForm.value.assign_to_type === 'Team') {
                this.CommonApiService.getUserData();
            }
            if (this.stockForm.value.assign_to_type === 'Customer') {
                this.CommonApiService.getCustomerData();
            }
        }
        if (type === 'customer_name' ){
            if (this.stockForm.value.assign_to_type === 'Team') {
                const selectedValue = this.CommonApiService.userData.find((item: any) => item.value === value);
                if (selectedValue) {
                    this.stockForm.patchValue({ assigned_to_name: selectedValue.label });
                    this.stockForm.patchValue({ assigned_to_login_id: selectedValue.login_type_id });
                }
            }
            if (this.stockForm.value.assign_to_type === 'Customer') {
                const selectedValue = this.CommonApiService.customerData.find((item: any) => item.value === value);
                if (selectedValue) {
                    this.stockForm.patchValue({ assigned_to_name: selectedValue.label });
                    this.stockForm.patchValue({ assigned_to_login_id: selectedValue.login_type_id });
                }
            }
        }
        if (type === 'product_name'){
            const selectedValue = this.listing.find((item: any) => item._id === value);
            if (selectedValue) {
                this.stockForm.patchValue({ product_name: selectedValue.product_name });
            }
        }
    }
    
    onSubmitPopGift() {
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
                this.submodule.module_id,
                this.submodule.title,
                'update', 
                this.originalData._id || null,
                () => {},
                this.submodule.module_type
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
        const functionName = isEditMode ? 'pop-gift/update-pop-gift' : 'pop-gift/create-pop-gift';
        this.api[httpMethod](this.addForm.value, functionName).subscribe(result => {
            if (result['statusCode'] === 200) {
                if (this.pondFiles.length > 0){
                    this.api.disabled = true;
                    this.uploadService.uploadFile(result['data']['inserted_id'], 'pop-gift', this.pondFiles, 'Pop And Gift Images', this.submodule, undefined, () => this.dialogRef.close(true))
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
            this.stockForm.markAllAsTouched();
            return;
        }
        
        if (this.stockForm.value.transaction_type === 'Fresh Purchase') {
            delete this.stockForm.value.assigned_to_id;
            delete this.stockForm.value.assigned_to_login_id;
        }
        this.api.disabled = true;
        this.api.post(this.stockForm.value, 'pop-gift/create-manage-stock').subscribe(result => {
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
    ]
    
    getAssignToTypeOptions(): any[] {
        this.assign_to_type = [];
        if (this.stockForm.value.transaction_type === 'Fresh Purchase') {
            this.assign_to_type.push({ label: 'Vendor', value: 'Vendor' });
        }
        else{
            this.assign_to_type.push({ label: 'Team', value: 'Team' },{ label: 'Customer', value: 'Customer' });
        }
        return this.assign_to_type;
    }
}
