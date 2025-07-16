import { Component, EventEmitter, Inject, NgZone, Output } from '@angular/core';
import { ToastrServices } from '../../../../shared/services/toastr.service ';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../../core/services/api/api.service';
import { SharedModule } from '../../../../shared/shared.module';
import { MaterialModuleModule } from '../../../../material-module/material-module.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SpkInputComponent } from '../../../../../@spk/spk-input/spk-input.component';
import { FormValidationService } from '../../../../utility/form-validation';
import { SpkNgSelectComponent } from '../../../../../@spk/spk-ng-select/spk-ng-select.component';
import { ModalHeaderComponent } from '../../../../shared/components/modal-header/modal-header.component';
import { LogService } from '../../../../core/services/log/log.service';
import { FilePondModule } from 'ngx-filepond';
import { CommonApiService } from '../../../../shared/services/common-api.service';
import { UploadFileService } from '../../../../shared/services/upload.service';
import { LOGIN_TYPES } from '../../../../utility/constants';

@Component({
    selector: 'app-customer-modal',
    imports: [SharedModule, FilePondModule, MaterialModuleModule, ModalHeaderComponent, FormsModule, CommonModule, ReactiveFormsModule, SpkInputComponent, SpkNgSelectComponent],
    templateUrl: './customer-modal.component.html'
})
export class CustomerModalComponent {
    data: any = {}
    formIniatialized: boolean = false;
    bankForm!: FormGroup;
    profileForm!: FormGroup;
    kycForm!: FormGroup;
    pointForm!: FormGroup;
    documentForm!: FormGroup;
    contactPersonForm!: FormGroup;
    markaForm!: FormGroup;
    shippingForm!: FormGroup;
    updateDocumentForm!: FormGroup;
    userAssignForm!: FormGroup;
    distributorForm!: FormGroup;
    otherForm!: FormGroup;
    poinLocationForm!: FormGroup;
    pageType: any = 'add'
    beatList: any = []
    @Output() valueChange = new EventEmitter<any>();
    originalData: any = {};
    editId: any;
    kycStatusList = [
        { label: 'Pending', value: 'Pending' },
        { label: 'Verified', value: 'Verified' },
        { label: 'Reject', value: 'Reject' }
    ];
    profileStatusList = [
        { label: 'Pending', value: 'Pending' },
        { label: 'Approved', value: 'Approved' },
        { label: 'Reject', value: 'Reject' },
        { label: 'Suspect', value: 'Suspect' }
    ];
    
    pointTypeList = [
        { label: 'Credit', value: 'credit' },
        { label: 'Debit', value: 'debit' },
    ];
    
    constructor(public toastr: ToastrServices, @Inject(MAT_DIALOG_DATA) public modalData: any, public dialogRef: MatDialogRef<CustomerModalComponent>, public api: ApiService, private fb: FormBuilder, private formValidation: FormValidationService, private logService: LogService, public CommonApiService: CommonApiService, public uploadService: UploadFileService, private ngZone: NgZone) {
        this.formIniatialized = true;
    }
    
    ngOnInit() {
        this.pondFiles = [];
        this.updateDocumentForm = this.fb.group({
            doc_no: ['', Validators.required],
            doc_type: [''],
            
        });
        
        if (this.modalData.pageType === 'document_number' || this.modalData.pageType === 'document_image') {
            this.data = this.modalData.data;
            if (this.data) {
                this.data.doc_type = this.data.label;
                this.originalData.doc_no = this.data.doc_no;
                this.originalData._id = this.data._id;
                this.updateDocumentForm.patchValue(this.data);
                this.updateDocumentForm.get('doc_type')?.valueChanges.subscribe(type => {
                    const docControl = this.updateDocumentForm.get('doc_no');
                    if (type === 'Pan Card') {
                        docControl?.setValidators([Validators.required, Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)]);
                    } else {
                        docControl?.setValidators([Validators.required, Validators.minLength(12), Validators.maxLength(12)]);
                    }
                    docControl?.updateValueAndValidity();
                });
            }
        }
        
        this.bankForm = this.fb.group({
            beneficiary_name: ['', Validators.required],
            bank_name: ['', Validators.required],
            account_no: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(16)]],
            ifsc_code: ['', [Validators.required, Validators.pattern(/^[A-Z]{4}0[A-Za-z0-9]{6}$/)]],
            branch_name: ['', Validators.required],
            upi_id: ['', [Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+$/)]]
        });
        
        this.contactPersonForm = this.fb.group({
            contact_person_name: ['', Validators.required],
            contact_person_mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
            designation: ['',]
        });
        
        this.markaForm = this.fb.group({
            marka: ['', Validators.required]
        });
        
        this.shippingForm = this.fb.group({
            shipping_state: ['', Validators.required],
            shipping_district: ['', Validators.required],
            shipping_city: ['', Validators.required],
            shipping_address: ['', Validators.required],
            shipping_contact_number: ['', Validators.required],
            shipping_contact_name: ['', Validators.required],
            shipping_pincode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
        });
        
        
        
        
        this.userAssignForm = this.fb.group({
            user_ids: [''],
        });
        
        this.distributorForm = this.fb.group({
            parent_customer_id: ['', Validators.required],
        });
        
        this.otherForm = this.fb.group({
            gst_number: ['', [Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/)]],
            credit_limit: [''],
            credit_days: [''],
            beat_code_id: [''],
            beat_code: [''],
            beat_code_desc: [''],
            customer_id: [''],
        });
        
        this.poinLocationForm = this.fb.group({
            lat: ['', Validators.required],
            long: ['', Validators.required],
        });
        
        this.documentForm = this.fb.group({
            aadhar_no: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
            pan_no: ['', [Validators.required, Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)]],
        });
        
        
        
        this.kycForm = this.fb.group({
            kyc_status: ['', Validators.required],
            status_remark: ['']
        });
        
        this.profileForm = this.fb.group({
            profile_status: ['', Validators.required],
            remark: ['']
        });
        
        this.pointForm = this.fb.group({
            transaction_type: ['', Validators.required],
            points: ['', Validators.required],
            remark: ['', Validators.required]
        });
        
        this.profileForm.get('profile_status')?.valueChanges.subscribe(status => {
            const remarkControl = this.profileForm.get('remark');
            if (status === 'Reject' || status === 'Suspect') {
                remarkControl?.setValidators([Validators.required]);
            } else {
                remarkControl?.clearValidators();
            }
            remarkControl?.updateValueAndValidity();
        });
        
        this.kycForm.get('kyc_status')?.valueChanges.subscribe(kyc_status => {
            const status_remarkControl = this.kycForm.get('status_remark');
            if (kyc_status === 'Reject') {
                status_remarkControl?.setValidators([Validators.required]);
            } else {
                status_remarkControl?.clearValidators();
            }
            status_remarkControl?.updateValueAndValidity();
        });
        
        if (this.modalData.pageType === 'bank') {
            this.data = this.modalData.data;
            this.originalData = this.data;
            if (this.data) {
                this.bankForm.patchValue(this.data);
            }
        }
        if (this.modalData.pageType === 'assign_user') {
            const userData = this.modalData?.data;
            this.userAssignForm.controls['user_ids'].setValue(userData);
            this.CommonApiService.getUserData();
            
            if (userData) {
                setTimeout(() => {
                    this.findName(userData, 'user');
                }, 500);
            }
        }
        
        if (this.modalData.pageType === 'assign_distibutor') {
            const loginTypeId = this.modalData.data?.login_type_id || '';
            const parentCustomerId = this.modalData.data?.parent_customer_id;
            this.CommonApiService.getCustomerData('', loginTypeId);
            if (parentCustomerId) {
                this.distributorForm.controls['parent_customer_id'].setValue(parentCustomerId);
                setTimeout(() => {
                    this.findName(parentCustomerId, 'customer');
                }, 500);
            }
        }
        
        if (this.modalData.pageType === 'shipping_address') {
            this.data = this.modalData.data;
            if (this.data) {
                this.originalData = this.data;
                this.shippingForm.patchValue(this.data);
                this.editId = this.data._id;
                if (this.data.shipping_state) {
                    this.getDistrict(this.data.shipping_state)
                }
                this.pageType = this.data._id ? 'edit' : 'add'
            }
            this.CommonApiService.getStates()
        }
        if (this.modalData.pageType === 'contact_person') {
            this.data = this.modalData.data;
            if (this.data) {
                this.originalData = this.data;
                this.contactPersonForm.patchValue(this.data);
                this.editId = this.data._id;
                this.pageType = this.data._id ? 'edit' : 'add'
            }
            this.CommonApiService.getStates()
        }
        
        if (this.modalData.pageType === 'marka') {
            this.data = this.modalData.data;
            if (this.data) {
                this.originalData = this.data;
                this.markaForm.patchValue(this.data);
                this.editId = this.data._id;
                this.pageType = this.data._id ? 'edit' : 'add'
            }
        }
        
        if (this.modalData.pageType === 'kyc') {
            this.data = this.modalData.data;
            if (this.data) {
                this.originalData = this.data;
                this.kycForm.patchValue(this.data);
                this.editId = this.data._id;
                this.pageType = this.data._id ? 'edit' : 'add'
            }
            this.CommonApiService.getStates()
        }
        if (this.modalData.pageType === 'profile_status') {
            this.data = this.modalData.data;
            this.originalData = {'profile_status': this.data }
            if (this.data) {
                this.profileForm.patchValue({'profile_status':this.data});
            }
            
            // if(this.customer_type === 'scan_history'){
            //     return [ 
            //          // { label: 'Pending', value: 'Pending' },
            //     ];
            // }
            // else{
            //     return [ 
            // { label: 'Pending', value: 'Pending' },
            // { label: 'Approved', value: 'Approved' },
            // { label: 'Reject', value: 'Reject' },
            // { label: 'Suspect', value: 'Suspect' }
            //     ];
            // }
        }
        
        if (this.modalData.pageType === 'wallet_history') {
            this.data = this.modalData.data;
        }
        
        
        if (this.modalData.pageType === 'other_information') {
            this.data = this.modalData.data;
            if (this.data) {
                this.originalData = this.data;
                this.otherForm.patchValue(this.data);
                this.editId = this.data._id;
                if (this.data.shipping_state) {
                    this.getDistrict(this.data.shipping_state)
                }
                this.pageType = this.data._id ? 'edit' : 'add'
                this.getBeatList(this.data.state, this.data.district);
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
        
        
        this.formIniatialized = false
        
    }
    
    // getProfileStatusList() {
    //     if (this.modalData.customerLoginTypeId === LOGIN_TYPES.INFLUENCER) {
    //         return [
    //             { label: 'Pending', value: 'Pending' },
    //             { label: 'Approved', value: 'Approved' },
    //             { label: 'Reject', value: 'Reject' },
    //             { label: 'Suspect', value: 'Suspect' }
    //         ];
    //     } else {
    //         return [
    //             { label: 'Active', value: 'Active' },
    //             { label: 'Inactive', value: 'Inactive' },
    //             { label: 'Lead', value: 'Lead' },
    //         ];
    //     }
    // }
    
    
    onSingleSelectChange(value: any, type?: any) {
        if (type === 'state') {
            this.getDistrict(value)
        }
        
        if (type === 'beat_code_assign') {
            const selectedValue = this.beatList.find((item: any) => item.value === value);
            if (selectedValue) {
                this.otherForm.patchValue({ beat_code: selectedValue.label });
                this.otherForm.patchValue({ beat_code_desc: selectedValue.description });
            }
        }
        this.valueChange.emit(value)
    }
    
    
    private lastSearchTerm: string = '';
    onSearch(search: string, type:any) {
        console.log('Search Fired:', type, search);
        const trimmedSearch = search?.trim() || '';
        if (trimmedSearch === this.lastSearchTerm) {
            return;
        }
        this.lastSearchTerm = trimmedSearch;
        
        if(type === 'customer'){
            this.CommonApiService.getCustomerData('', this.modalData.data.login_type_id ? this.modalData.data.login_type_id : '', search)
        }
        if(type === 'user'){
        this.CommonApiService.getUserData([LOGIN_TYPES.SECONDARY], search);
        }
        if(type === 'beat_code'){
            this.getBeatList(this.data.state, this.data.district, this.lastSearchTerm);
        }
        if (type === 'state') {
            this.CommonApiService.getStates(search)
        }
        if (type === 'district') {
            this.getDistrict(search)
        }
    }
    
    
    
    
    // Area Wise Beat List Start
    getBeatList(state:string , district:string, search?:string) {
        this.api.post({'filters': { 'search': search }, 'state': state , 'district': district}, 'beat-route/read-dropdown').subscribe(result => {
            if (result['statusCode'] == 200) {
                this.beatList = result['data'];
            }
        });
    }
    // Area Wise Beat List End
    
    
    
    // Bank Detail Submit Funcation Start
    onSubmit() {
        if (this.bankForm.valid) {
            this.bankForm.value.customer_id = this.modalData.customer_id;
            
            const isEditMode = true;
            if (isEditMode) {
                const noChanges = this.logService.logActivityOnUpdate(
                    isEditMode,
                    this.originalData,
                    this.bankForm.value,
                    this.modalData.submodule.sub_module_id ? this.modalData.submodule.sub_module_id : this.modalData.submodule.module_id,
                    this.modalData.submodule.title,
                    'update',
                    this.modalData.customer_id || null,
                    () => { },
                    this.modalData.submodule.module_type
                );
                if (noChanges) {
                    this.api.disabled = false;
                    this.toastr.warning('No changes detected', '', 'toast-top-right')
                    return;
                }
                
            }
            
            
            this.api.disabled = true;
            this.api.post(this.bankForm.value, 'customer/save-bank-info').subscribe(result => {
                if (result['statusCode'] == 200) {
                    this.dialogRef.close(true)
                    this.api.disabled = false;
                    this.toastr.success(result['message'], '', 'toast-top-right');
                }
            });
        }
        else {
            this.formValidation.markFormGroupTouched(this.bankForm);
        }
    }
    // Bank Detail Submit Funcation Start
    
    
    
    // Contact Person Submit Funcation Start
    submitContactPerson() {
        if (this.contactPersonForm.valid) {
            if (this.editId) {
                this.contactPersonForm.value._id = this.editId;
            }
            this.contactPersonForm.value.customer_id = this.modalData.customer_id;
            this.api.disabled = true;
            
            const isEditMode = this.pageType === 'edit';
            if (isEditMode) {
                // result.primaryFields['_id'] = this.productId;
                const noChanges = this.logService.logActivityOnUpdate(
                    isEditMode,
                    this.originalData,
                    this.contactPersonForm.value,
                    this.modalData.submodule.module_id,
                    this.modalData.submodule.title,
                    'update',
                    this.modalData.customer_id || null,
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
            const functionName = isEditMode ? 'customer/update-contact-person-info' : 'customer/save-contact-person-info';
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
    
    
    // Marka Submit Funcation Start
    submitMarka() {
        if (this.markaForm.valid) {
            if (this.editId) {
                this.markaForm.value._id = this.editId;
            }
            this.markaForm.value.customer_id = this.modalData.customer_id;
            this.api.disabled = true;
            
            const isEditMode = this.pageType === 'edit';
            if (isEditMode) {
                // result.primaryFields['_id'] = this.productId;
                const noChanges = this.logService.logActivityOnUpdate(
                    isEditMode,
                    this.originalData,
                    this.markaForm.value,
                    this.modalData.submodule.module_id,
                    this.modalData.submodule.title,
                    'update',
                    this.modalData.customer_id || null,
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
            const functionName = isEditMode ? 'customer/update-marka' : 'customer/save-marka';
            this.api[httpMethod](this.markaForm.value, functionName).subscribe(result => {
                if (result['statusCode'] == 200) {
                    this.api.disabled = false;
                    this.toastr.success(result['message'], '', 'toast-top-right');
                    this.dialogRef.close(true)
                }
            });
        }
        else {
            this.formValidation.markFormGroupTouched(this.markaForm);
        }
    }
    // Marka Submit Funcation End
    
    
    
    // Shipping Address Submit Funcation Start
    submitAddress() {
        if (!this.modalData.fromPrimaryOrderAdd){
            ['shipping_contact_number', 'shipping_contact_name'].forEach(field => {
                const control = this.shippingForm.get(field);
                control?.setValidators(null);
                control?.setValue(null);
                control?.updateValueAndValidity();
            });
        }
        if (this.shippingForm.valid) {
            this.shippingForm.value.customer_id = this.data.assign_to_id || this.modalData.customer_id;
            if (this.editId) {
                this.shippingForm.value._id = this.editId;
            }
            
            const isEditMode = this.pageType === 'edit';
            if (isEditMode) {
                // result.primaryFields['_id'] = this.productId;
                const noChanges = this.logService.logActivityOnUpdate(
                    isEditMode,
                    this.originalData,
                    this.shippingForm.value,
                    this.modalData.submodule.module_id,
                    this.modalData.submodule.title,
                    'update',
                    this.modalData.customer_id || null,
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
            const functionName = isEditMode ? 'customer/update-shipping-address' : 'customer/save-shipping-address';
            
            
            this.api.disabled = true;
            this.api[httpMethod](this.shippingForm.value, functionName).subscribe(result => {
                if (result['statusCode'] == 200) {
                    this.api.disabled = false;
                    this.dialogRef.close(true)
                    this.toastr.success(result['message'], '', 'toast-top-right');
                }
            });
        }
        else {
            this.formValidation.markFormGroupTouched(this.shippingForm);
        }
    }
    // Shipping Address Submit Funcation End
    
    
    // Other Information Submit Funcation Start
    addOtherInfo() {
        if (this.otherForm.valid) {
            this.otherForm.patchValue({ customer_id: this.modalData.customer_id });
            const isEditMode = this.pageType === 'edit';
            if (isEditMode) {
                // result.primaryFields['_id'] = this.productId;
                const noChanges = this.logService.logActivityOnUpdate(
                    isEditMode,
                    this.originalData,
                    this.otherForm.value,
                    this.modalData.submodule.module_id,
                    this.modalData.submodule.title,
                    'update',
                    this.modalData.customer_id || null,
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
            
            this.formValidation.removeEmptyControls(this.otherForm)
            this.api.disabled = true;
            this.api.patch(this.otherForm.value, 'customer/save-other-info').subscribe(result => {
                if (result['statusCode'] == 200) {
                    this.api.disabled = false;
                    this.dialogRef.close(true)
                    this.toastr.success(result['message'], '', 'toast-top-right');
                }
            });
        }
        else {
            this.formValidation.markFormGroupTouched(this.otherForm);
        }
    }
    // Other Information Submit Funcation End
    
    
    // Other Information Submit Funcation Start
    updateLocation() {
        if (this.poinLocationForm.valid) {
            this.poinLocationForm.value.customer_id = this.modalData.customer_id;
            // if(this.editId){
            //   this.otherForm.value._id = this.editId;
            // }
            
            const isEditMode = this.pageType === 'edit';
            if (isEditMode) {
                // result.primaryFields['_id'] = this.productId;
                const noChanges = this.logService.logActivityOnUpdate(
                    isEditMode,
                    this.originalData,
                    this.poinLocationForm.value,
                    this.modalData.submodule.module_id,
                    this.modalData.submodule.title,
                    'update',
                    this.modalData.customer_id || null,
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
            this.api.patch(this.poinLocationForm.value, 'customer/save-other-info').subscribe(result => {
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
    
    
    findName(event: any, type: string) {
        const selectedIds = event;
        if (Array.isArray(selectedIds) && selectedIds.length > 0) {
            if (type === 'customer') {
                this.distributorForm.value.parent_customer_array = this.CommonApiService.customerData
                .filter((row: any) => selectedIds.includes(row.value));
                return this.distributorForm.value.parent_customer_array;
            }
            if (type === 'user') {
                this.userAssignForm.value.user_array = this.CommonApiService.userData
                .filter((row: any) => selectedIds.includes(row.value));
                return this.userAssignForm.value.user_array;
            }
        }
        return []; // Return empty array if no match
    }
    
    
    // User Assign Submit Funcation Start
    assignUser() {
        if (this.userAssignForm.valid) {
            this.userAssignForm.value.customer_id = this.modalData.customer_id;
            this.userAssignForm.value.customer_type_id = this.modalData.customer_type_id;
            this.userAssignForm.value.customer_type_name = this.modalData.customer_type;
            this.userAssignForm.value.customer_name = this.modalData.customer_name;
            this.api.disabled = true;
            this.api.post(this.userAssignForm.value, 'customer/save-user-to-customer-mapping').subscribe(result => {
                if (result['statusCode'] == 200) {
                    this.api.disabled = false;
                    this.toastr.success(result['message'], '', 'toast-top-right');
                    this.dialogRef.close(true)
                }
            });
        }
        else {
            this.formValidation.markFormGroupTouched(this.userAssignForm);
        }
    }
    // User Assign Submit Funcation End
    
    
    // Distributor Assign Submit Funcation Start
    assignDistributor() {
        if (this.distributorForm.valid) {
            this.distributorForm.value.child_customer_id = this.modalData.customer_id;
            this.distributorForm.value.child_customer_type_name = this.modalData.customer_type;
            this.distributorForm.value.child_customer_type_id = this.modalData.customer_type_id;
            this.distributorForm.value.child_customer_name = this.modalData.customer_name;
            
            
            this.api.disabled = true;
            this.api.post(this.distributorForm.value, 'customer/assign-customer-mapping').subscribe(result => {
                if (result['statusCode'] == 200) {
                    this.api.disabled = false;
                    this.toastr.success(result['message'], '', 'toast-top-right');
                    this.dialogRef.close(true)
                }
            });
        }
        else {
            this.formValidation.markFormGroupTouched(this.userAssignForm);
        }
    }
    // Distributor Assign Submit Funcation End
    
    
    // Kyc Submit Funcation Start
    updateKyc() {
        if (this.kycForm.valid) {
            this.kycForm.value.customer_id = this.modalData.customer_id;
            if (this.editId) {
                this.kycForm.value._id = this.editId;
            }
            
            const isEditMode = this.pageType === 'edit';
            if (isEditMode) {
                // result.primaryFields['_id'] = this.productId;
                const noChanges = this.logService.logActivityOnUpdate(
                    isEditMode,
                    this.originalData,
                    this.kycForm.value,
                    this.modalData.submodule.module_id,
                    this.modalData.submodule.title,
                    'update',
                    this.modalData.customer_id || null,
                    () => { },
                    this.modalData.submodule.module_type
                );
                if (noChanges) {
                    this.api.disabled = false;
                    this.toastr.warning('No changes detected', '', 'toast-top-right')
                    return;
                }
            }
            
            this.api.disabled = true;
            this.api.patch(this.kycForm.value, 'customer/save-kyc-status').subscribe(result => {
                if (result['statusCode'] == 200) {
                    this.api.disabled = false;
                    this.dialogRef.close(true)
                    this.toastr.success(result['message'], '', 'toast-top-right');
                }
            });
        }
        else {
            this.formValidation.markFormGroupTouched(this.kycForm);
        }
    }
    // Kyc Submit Funcation End
    
    
    // Profile Status Funcation Start
    updateStatus() {
        if (this.profileForm.valid) {
            this.profileForm.value._id = this.modalData.customer_id;
            if (this.editId) {
                this.profileForm.value._id = this.editId;
            }
            
            const isEditMode = true;
            if (isEditMode) {
                const noChanges = this.logService.logActivityOnUpdate(
                    isEditMode,
                    this.originalData,
                    {'profile_status':this.profileForm.value.profile_status},
                    this.modalData.submodule.module_id,
                    this.modalData.submodule.title,
                    'update',
                    this.modalData.customer_id || null,
                    () => { },
                    this.modalData.submodule.module_type
                );
                if (noChanges) {
                    this.api.disabled = false;
                    this.toastr.warning('No changes detected', '', 'toast-top-right')
                    return;
                }
            }
            
            this.api.disabled = true;
            this.api.patch(this.profileForm.value, 'customer/update-profile-status').subscribe(result => {
                if (result['statusCode'] == 200) {
                    this.api.disabled = false;
                    this.dialogRef.close(true)
                    this.toastr.success(result['message'], '', 'toast-top-right');
                }
            });
        }
        else {
            this.formValidation.markFormGroupTouched(this.kycForm);
        }
    }
    // Profile Status Funcation End
    
    
    // Postal  Code Start
    districtList: any = [];
    
    
    onValueChange(event: any, type?: string) {
        if (event.length === 6 && type === 'pincode') {
            this.getPostalMaster(event)
        }
        this.valueChange.emit(event);
    }
    
    
    getDistrict(state: string, search: string = '') {
        this.api.post({'filters': { 'search': search }, "state": state}, 'postal-code/districts').subscribe(result => {
            if (result['statusCode'] == 200) {
                this.districtList = result['data'];
            }
        });
    }
    
    getPostalMaster(pincode: any) {
        this.api.post({ "pincode": pincode }, 'postal-code/read-using-pincode').subscribe(result => {
            if (result['statusCode'] == 200) {
                this.shippingForm.controls['shipping_state'].setValue(result['data']['state']);
                this.getDistrict(result['data']['state'])
                this.shippingForm.controls['shipping_district'].setValue(result['data']['district']);
                this.shippingForm.controls['shipping_city'].setValue(result['data']['city']);
            }
        });
    }
    
    // Postal Code End
    
    
    closeModal() {
        this.dialogRef.close(); // Closes the dialog
    }
    // Document Start
    pondOptions = this.getPondOptions('image');
    getPondOptions(type:any): any {
        const commonOptions = {
            allowMultiple: type === 'shop_images' ? true : false,
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
        
        if (type === 'image' || type === 'shop_images') {
            return {
                ...commonOptions,
                acceptedFileTypes: ['image/jpeg', 'image/png', 'image/jpg'],
                maxFileSize: '2MB',
                allowImageValidateSize: true,
                // imageValidateSizeMinWidth: 300,
                // imageValidateSizeMinHeight: 300,
                // imageValidateSizeMaxWidth: 300,
                // imageValidateSizeMaxHeight: 300,
                labelFileTypeNotAllowed: 'Only PNG and JPEG files are allowed',
                fileValidateTypeLabelExpectedTypes: 'Allowed: PNG, JPEG',
                labelImageValidateSizeTooSmall: 'Image is too small. Min: {minWidth}×{minHeight}',
                labelImageValidateSizeTooBig: 'Image is too large. Max: {maxWidth}×{maxHeight}',
            };
        }
    }
    
    pondFiles: any[] = [];
    aadharFrontImg: any[] = [];
    aadharBackImg: any[] = [];
    panImg: any[] = [];
    
    onFileProcessed(event: any, type: string) {
        const file = event.file.file;
        if (this.modalData.pageType === 'document_image') {
            Object.assign(file, { image_type: type, doc_no: (type === 'Pan Card' || type === 'Aadhar Front') ? this.updateDocumentForm.value.doc_no : '' });
        }
        else {
            Object.assign(file, { image_type: type, doc_no: type === 'Pan Card' ? this.documentForm.value.pan_no : type === 'Aadhar Front' ? this.documentForm.value.aadhar_no : '' });
        }
        
        if (type === 'Aadhar Front') {
            this.aadharFrontImg = [...(this.aadharFrontImg || []), file];
            
        } else if (type === 'Aadhar Back') {
            this.aadharBackImg = [...(this.aadharBackImg || []), file];
        }
        else if (type === 'Pan Card') {
            this.panImg = [...(this.panImg || []), file];
        }
        else{
            this.pondFiles = [...(this.pondFiles || []), file];
        }
    }
    
    onFileRemove(event: any, type: string) {
        const file = event.file.file;
        if (type === 'Aadhar Front') {
            const index = this.aadharFrontImg.findIndex(f => f.name === file.name && f.size === file.size);
            if (index > -1) {
                this.aadharFrontImg.splice(index, 1);
            }
        } else if (type === 'Aadhar Back') {
            const index = this.aadharBackImg.findIndex(f => f.name === file.name && f.size === file.size);
            if (index > -1) {
                this.aadharBackImg.splice(index, 1);
            }
        }
        else if (type === 'Pan Card') {
            const index = this.panImg.findIndex(f => f.name === file.name && f.size === file.size);
            if (index > -1) {
                this.panImg.splice(index, 1);
            }
        }
        else{
            const index = this.pondFiles.findIndex(f => f.name === file.name && f.size === file.size);
            if (index > -1) {
                this.pondFiles.splice(index, 1);
            } 
        }
    }
    
    submitShopImages(){
        if (this.pondFiles.length > 0) {
            this.uploadService.uploadFile(this.modalData.customer_id, 'customer', this.pondFiles, 'Shop Images', this.modalData.submodule, undefined, () => this.dialogRef.close(true))
        }
    }
    saveDocument() {
        if (this.documentForm.valid) {
            this.documentForm.value.customer_id = this.modalData.customer_id;
            this.api.disabled = true;
            this.pondFiles = [...this.aadharFrontImg, ...this.aadharBackImg, ...this.panImg];
            if (this.pondFiles.length > 0) {
                this.uploadService.uploadFile(this.modalData.customer_id, 'customer', this.pondFiles, 'Doc Images', this.modalData.submodule, undefined, () => this.dialogRef.close(true))
            }
        }
        else {
            this.formValidation.markFormGroupTouched(this.documentForm);
        }
    }
    
    // Docuement End
    
    
    // Update Document Funcation Start
    
    
    // async updateDocument() {
    
    //   if(this.pondFiles.length > 0){
    //     for (let i = 0; i < this.pondFiles.length; i++) {
    //       const formData = new FormData();
    //       let label = (this.pondFiles[i] as any).doc_label || ''; 
    //       formData.append('file', this.pondFiles[i]);
    //       formData.append('doc_label', label);
    //       const result = await this.api.uploadFile(formData, 's3/uploadsingle').toPromise();
    //       const modifiedresult = { ...result, 'doc_label':label, 'id':i+1 };
    //       // this.uploadresults.push(modifiedresult);
    //       this.updateDocSubmit()
    //     }
    //   }
    //   else{
    //     this.updateDocSubmit()
    //   }
    // }
    
    updateDocNumber() {
        this.updateDocumentForm.value._id = this.originalData['_id']
        this.api.disabled = true;
        let pageType = 'edit'
        const isEditMode = pageType === 'edit';
        if (isEditMode) {
            const noChanges = this.logService.logActivityOnUpdate(
                isEditMode,
                this.originalData,
                this.updateDocumentForm.value,
                this.modalData.submodule.module_id,
                this.modalData.submodule.title,
                'update',
                this.modalData.customer_id || null,
                () => { },
                this.modalData.submodule.module_type
            );
            if (noChanges) {
                this.api.disabled = false;
                this.toastr.warning('No changes detected', '', 'toast-top-right')
                return;
            }
            
        }
        this.updateDocumentForm.value._id
        this.api.patch(this.updateDocumentForm.value, 'customer/update-docs').subscribe(result => {
            if (result['statusCode'] == 200) {
                this.api.disabled = false;
                this.toastr.success(result['message'], '', 'toast-top-right');
                this.dialogRef.close(true)
            }
        });
    }
    
    updateDocument() {
        if (this.modalData.pageType === 'document_image') {
            this.updateDocumentForm.value.customer_id = this.modalData.customer_id;
            this.pondFiles = [...this.aadharFrontImg, ...this.aadharBackImg, ...this.panImg];
            if (this.pondFiles.length > 0) {
                this.api.disabled = true;
                this.uploadService.uploadFile(this.modalData.customer_id, 'customer', this.pondFiles, 'Doc Images', this.modalData.submodule, undefined, () => this.dialogRef.close(true), this.data._id, this.originalData)
            }
            else {
                this.toastr.error(this.data.label + ' Image is required', '', 'toast-top-right');
            }
        }
        if (this.updateDocumentForm.valid && this.modalData.pageType === 'document_number') {
            this.updateDocNumber();
        }
        else {
            this.formValidation.markFormGroupTouched(this.updateDocumentForm);
        }
    }
    // Update Document Funcation End
    
    
    
    // Kyc Submit Funcation Start
    updatePoint() {
        if (this.pointForm.valid) {
            this.pointForm.value.login_type_id = Number(this.data.login_type_id);
            this.pointForm.value.customer_type_id = this.data.customer_type_id;
            this.pointForm.value.customer_id = this.data._id;
            this.pointForm.value.customer_name = this.data.customer_name;
            this.pointForm.value.points = Number(this.pointForm.value.points);
            this.api.disabled = true;
            this.api.post(this.pointForm.value, 'ledger/create-manual').subscribe(result => {
                if (result['statusCode'] == 200) {
                    this.api.disabled = false;
                    this.toastr.success(result['message'], '', 'toast-top-right');
                    this.dialogRef.close(true)
                }
            });
        }
        else {
            this.formValidation.markFormGroupTouched(this.kycForm);
        }
    }
    // Kyc Submit Funcation End
    
}
