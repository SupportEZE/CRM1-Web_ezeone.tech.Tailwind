import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../../../core/services/api/api.service';
import { FilePondModule } from 'ngx-filepond';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { CommonApiService } from '../../../../../shared/services/common-api.service';
import { ShowcodeCardComponent } from '../../../../../shared/components/showcode-card/showcode-card.component';
import { ModuleService } from '../../../../../shared/services/module.service';
import { LogService } from '../../../../../core/services/log/log.service';
import { FORMIDCONFIG } from '../../../../../../config/formId.config';
import { LOGIN_TYPES } from '../../../../../utility/constants';
import { NameUtilsService } from '../../../../../utility/name-utils';
import { ModalHeaderComponent } from '../../../../../shared/components/modal-header/modal-header.component';
import { SpkInputComponent } from '../../../../../../@spk/spk-input/spk-input.component';
import { SpkNgSelectComponent } from '../../../../../../@spk/spk-ng-select/spk-ng-select.component';
import { FormValidationService } from '../../../../../utility/form-validation';
import { isThisMonth } from 'date-fns';
import { AuthService } from '../../../../../shared/services/auth.service';

@Component({
    selector: 'app-referral-program-add',
    imports: [FormsModule, CommonModule, ModalHeaderComponent, SharedModule, MaterialModuleModule, FilePondModule, ShowcodeCardComponent, ReactiveFormsModule, SpkNgSelectComponent, SpkInputComponent],
    templateUrl: './referral-program-add.component.html',
})
export class ReferralProgramAddComponent {
    data:any ={};
    skLoading:boolean = false
    submodule:any={};
    originalData:any ={};
    FORMID:any= FORMIDCONFIG;
    customerCategoryList:any = [];
    selectedCustomerCategory: any = {};
    userPoints:any = [];
    referralForm: FormGroup = new FormGroup({});
    orgData:any ={};
    
    
    constructor(public dialog:MatDialog, private formValidation: FormValidationService, public api: ApiService,public toastr: ToastrServices,public CommonApiService: CommonApiService,@Inject(MAT_DIALOG_DATA) public modalData: any,private dialogRef: MatDialogRef<ReferralProgramAddComponent>,  private authService:AuthService, private moduleService : ModuleService,private logService : LogService,public nameUtils: NameUtilsService, private fb: FormBuilder){
        this.orgData = this.authService.getOrg();
    }
    
    ngOnInit() {
        this.referralForm = this.fb.group({
            bonus_type: ['', Validators.required],
            customer_type_id: ['', Validators.required],
            customer_type_name: [''],
            bonus_point: ['', Validators.required],
        });
        
        
        const subModule = this.moduleService.getSubModuleByName('IRP', 'Referral Program');
        if (subModule) {
            this.submodule = subModule;
        }
        
        if (this.modalData.formType === 'edit') {
            // let filteredData = {};
            // filteredData = this.modalData.formData ? { 
            //     bonus_type: this.modalData.formData.bonus_type, 
            //     login_type_id: this.modalData.formData.login_type_id, 
            //     login_type_name: this.modalData.formData.login_type_name, 
            //     customer_category: this.modalData.formData.customer_category, 
            //     customer_type_id: this.modalData.formData.customer_type_id, 
            //     bonus_point: this.modalData.formData.bonus_point, 
            //     status: this.modalData.formData.status,
            //     user_instruction: this.modalData.formData.user_instruction,
            //     _id: this.modalData.formData._id 
            // } : {};
            // this.data = filteredData;
            this.referralForm.patchValue(this.modalData.formData);
            this.originalData = this.modalData.formData;
        }
        else if(this.modalData.formType === 'view'){
            this.getUserPoints();
        }
        else
        {
            this.data.status = 'Active'
        }
        this.CommonApiService.getLoginType([LOGIN_TYPES.PRIMARY]);
        this.CommonApiService.getCustomerCategorySubType([LOGIN_TYPES.INFLUENCER]);
    }
    
    closeModal() {
        this.dialogRef.close(); // Closes the dialog
    }
    
    onSubmit(){
        if (this.referralForm.valid){
            this.api.disabled = true;
            const isEditMode = this.modalData.formType === 'edit';
            if (isEditMode) {
                this.referralForm.value._id = this.modalData.formData._id;
                const noChanges = this.logService.logActivityOnUpdate(
                    isEditMode, 
                    this.originalData, 
                    this.referralForm.value,
                    this.submodule.module_id, 
                    this.submodule.title, 
                    'update', 
                    this.referralForm.value._id || null,
                    () => {},
                    this.submodule.module_type
                );
                if (noChanges) {
                    this.api.disabled = false;
                    this.toastr.warning('No changes detected', '', 'toast-top-right')
                    return ;
                }
                
            }
            const functionName = isEditMode ? 'referral-bonus/update' : 'referral-bonus/create';
            const httpMethod = isEditMode ? 'patch' : 'post';
            this.api[httpMethod](this.referralForm.value, functionName).subscribe(result => {
                if(result['statusCode'] === 200){
                    this.api.disabled = false;
                    this.toastr.success(result['message'], '', 'toast-top-right');
                    this.dialogRef.close(true)
                }
            });
        }
        else {
            this.formValidation.markFormGroupTouched(this.referralForm); // Call the global function
        }
    }
    
    findName(value: any) {
        const selectedIds = value;
        if (Array.isArray(selectedIds) && selectedIds.length > 0) {
            const matchedNames = this.CommonApiService.customerCategorySubType
            .filter((row: any) => selectedIds.includes(row.value))
            .map((row: any) => row.label);
            this.referralForm.patchValue({ customer_type_name: matchedNames, });
        }
    }
    
    onLoginTypeChange(value: any) {
        const selectedValue = this.CommonApiService.loginType.find((item: any) => item.value === value);
        if (selectedValue) {
            this.data.login_type_name = selectedValue.label;
        }
    }
    
    getUserPoints() {
        this.skLoading = true;
        this.api.post({}, 'referral-bonus/userpoints').subscribe(result => {
            if (result['statusCode']  ===  200) {
                this.skLoading = false;
                this.userPoints = result['data'];
            }
        });
    }
    
    bonusType = [
        { label: "Welcome", value: "Welcome" },
        { label: "Birthday", value: "Birthday" },
        { label: "Anniversary", value: "Anniversary" },
        { label: "Invite Friends", value: "Invite Friends" },
        ...(this.orgData?.irp ? [  { label: "Refer Enquiry", value: "Refer Enquiry" }, { label: "Refer Site | Project", value: "Refer Site | Project" }] : []),
        ];    
    }