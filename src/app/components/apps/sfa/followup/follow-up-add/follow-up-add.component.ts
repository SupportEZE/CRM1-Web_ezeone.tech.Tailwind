import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl, FormsModule } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../../../core/services/api/api.service';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { CommonApiService } from '../../../../../shared/services/common-api.service';
import { DateService } from '../../../../../shared/services/date.service';
import { ModalHeaderComponent } from '../../../../../shared/components/modal-header/modal-header.component';
import { LogService } from '../../../../../core/services/log/log.service';
import { ModuleService } from '../../../../../shared/services/module.service';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { LOGIN_TYPES } from '../../../../../utility/constants';

@Component({
    selector: 'app-follow-up-add',
    imports: [FormsModule,CommonModule,SharedModule,MaterialModuleModule,ReactiveFormsModule,ModalHeaderComponent,NgxMaterialTimepickerModule],
    templateUrl: './follow-up-add.component.html',
})
export class FollowUpAddComponent {
    addForm: FormGroup = new FormGroup({});
    data:any ={};
    filter:any ={};
    userList:any =[];
    categoryTypeValue:any =[];
    today= new Date();
    pageType:any = {};
    originalData:any={}
    submodule:any;
    
    constructor(@Inject(MAT_DIALOG_DATA) public modalData: any,private dialogRef: MatDialogRef<FollowUpAddComponent>,public api: ApiService,public toastr: ToastrServices,public CommonApiService: CommonApiService,private fb: FormBuilder,private dateService : DateService,private logService: LogService,private moduleService : ModuleService){}
    
    ngOnInit(){
        const subModule = this.moduleService.getSubModuleByName('SFA', 'Follow Up');
        if (subModule) {
            this.submodule = subModule;
        }
        
        this.CommonApiService.getUserData()
        
        this.addForm = this.fb.group({
            followup_date: ['', Validators.required],
            followup_time: ['', Validators.required],
            followup_type: ['', Validators.required],
            category_type: ['', Validators.required],
            category_id: ['', Validators.required],
            assigned_to_user_id: ['', Validators.required],
            assigned_to_user_name: ['', Validators.required],
            remark: ['', Validators.required],
            _id: [''],
        });
        
        if (this.modalData.formType === 'edit') {
            this.pageType.formType = this.modalData.formType;
            this.addForm.patchValue({ 
                ...this.modalData.formData, 
                _id: this.modalData.formData._id 
            });
            this.originalData = JSON.parse(JSON.stringify(this.modalData.formData));
            this.getCategoryTypeValue();
        }
        
        if (this.modalData.enquiryType === 'add') {
            this.addForm.patchValue({ 
                ...this.modalData.formData, 
            });
            this.pageType.enquiryType = this.modalData.enquiryType;
            this.getCategoryTypeValue();
        }
    }
    
    findName(value: any, type: string) {
        if (type === 'user_name' ){
            const selectedValue = this.CommonApiService.userData.find((item: any) => item.value === value);
            if (selectedValue) {
                this.addForm.patchValue({ assigned_to_user_name: selectedValue.label });
            }
        }
    }
    
    getCategoryTypeValue(){
        this.api.post({category_type : this.addForm.value.category_type}, 'followup/categories').subscribe(result => {
            if(result['statusCode'] == 200){
                this.categoryTypeValue = result['data'];
            }
        });
    }
    
    private lastSearchTerm: string = '';
    onSearch(search: string) {
        const trimmedSearch = search?.trim() || '';
        if (trimmedSearch === this.lastSearchTerm) {
            return;
        }
        this.lastSearchTerm = trimmedSearch;
        this.CommonApiService.getUserData([LOGIN_TYPES.FIELD_USER], search)
    }
    
    onSubmit(){
        if (this.addForm.invalid) {
            this.addForm.markAllAsTouched();
            return
        }
        
        this.api.disabled = true;
        const isEditMode = this.pageType.formType === 'edit';
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
                this.api.disabled = false;
                this.toastr.warning('No changes detected', '', 'toast-top-right')
                return ;
            }
            
        }
        const functionName = isEditMode ? 'followup/update' : 'followup/create';
        const httpMethod = isEditMode ? 'patch' : 'post';
        this.api[httpMethod](this.addForm.value, functionName).subscribe(result => {
            if(result['statusCode'] === 200){
                this.api.disabled = false;
                this.dialogRef.close(true)
                this.toastr.success(result['message'], '', 'toast-top-right');
            }
        });
    }
    
    closeModal() {
        this.dialogRef.close(); // Closes the dialog
    }
    
    followup_type:any = [
        {
            label: 'Call',
            value: 'Call',
        },
        {
            label: 'Visit',
            value: 'Visit',
        }
    ]
    
    category_type:any = [
        {
            label: 'Site',
            value: 'Site',
        },
        {
            label: 'Enquiry',
            value: 'Enquiry',
        },
        {
            label: 'Customer',
            value: 'Customer',
        }
    ]
}
