import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared.module';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { ApiService } from '../../../../../core/services/api/api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { DateService } from '../../../../../shared/services/date.service';
import { FormValidationService } from '../../../../../utility/form-validation';
import { FORMIDCONFIG } from '../../../../../../config/formId.config';
import { UtilService } from '../../../../../utility/util.service';
import { FormFieldTypes } from '../../../../../utility/constants';
import { LogLevel } from '@angular/fire';
import { ModuleService } from '../../../../../shared/services/module.service';
import { LogService } from '../../../../../core/services/log/log.service';
import { ModalHeaderComponent } from '../../../../../shared/components/modal-header/modal-header.component';

@Component({
    selector: 'app-leave-modal',
    providers: [provideNativeDateAdapter()],
    imports: [CommonModule, SharedModule, ReactiveFormsModule, MaterialModuleModule, ModalHeaderComponent],
    templateUrl: './leave-modal.component.html'
})
export class LeaveModalComponent {
    states:any = []; 
    today= new Date();
    formIniatialized: boolean = false;
    skLoading:boolean = false;
    myForm!: FormGroup;
    @Input() formFields: any[] = [];
    moduleFormId:number =0;
    moduleId:any;
    primaryForm!: FormGroup;
    FORMID:any= FORMIDCONFIG;
    readonly fieldTypes = FormFieldTypes;
    formDropdown:any =[];
    formDropdownOption:any =[];
    userList:any =[];
    originalData:any = {};
    tableId:any
    originalFormFields: any[] = []; // Store API response separately
    
    
    constructor(
        @Inject(MAT_DIALOG_DATA) public modalData: any,
        private fb: FormBuilder, public toastr:ToastrServices, public api:ApiService, private dialogRef: MatDialogRef<LeaveModalComponent>,  public moduleService: ModuleService, private dateService: DateService, private formValidation: FormValidationService, public util:UtilService, private logService: LogService, public date:DateService) {
        }
        
        ngOnInit() {
            const subModule = this.moduleService.getSubModuleByName('Masters', 'Leave Policy');
            const form = this.moduleService.getFormById('Masters', 'Leave Policy', this.FORMID.ID['LeaveMasterForm']);
            const tableId = this.moduleService.getTableById('Masters', 'Leave Policy', this.FORMID.ID['LeaveMasterTable']);
            if (subModule) {
                this.moduleId = subModule;
            }
            if (form) {
                this.moduleFormId = form.form_id;
            }
            if (tableId) {
                this.tableId = tableId.table_id;
            }
            this.getFormData()
            
        }
        
        initializeForm(){
            this.myForm = this.fb.group({});
            this.formFields.forEach(field => {
                if(field.api_path){
                    this.getOptions(field.label, field.name, field.api_path, field.api_payload, field.api_payload_key)
                }
                if(field.min_date === true){
                    if(field.min_period === 'today'){
                        field.min_period = new Date();
                    }
                }
                field.control = this.fb.control('', this.formValidation.getValidators(field)); // Initialize using FormBuilder
                this.myForm.addControl(field.name, field.control);
            });
            this.formIniatialized = true;
            
            if (this.modalData.formType === 'edit') {
                let leaveDetail
                leaveDetail = this.modalData.formData;
                this.originalData = { ...leaveDetail, ...leaveDetail.form_data };
                
                delete this.originalData.form_data;
                Object.keys(this.originalData).forEach(key => {
                    if (!this.myForm.contains(key)) {
                        this.myForm.addControl(key, new FormControl(this.originalData[key]));
                    }
                });
                
                this.myForm.patchValue(this.originalData);
                
                const matchedItems = this.formFields.filter((item: any) => Object.keys(this.originalData).includes(item.name) && (item.type === this.fieldTypes.SINGLE_SELECT || item.type === this.fieldTypes.MULTI_SELECT) );
                
                matchedItems.forEach((item: any) => {
                    const controlName = item.name;
                    if (this.myForm.get(controlName)) {
                        this.myForm.get(controlName)?.setValue(this.originalData[controlName]);
                    }
                });
            }
        }
        
        async getOptions(dropdown_name: string, name: string,  api_path: string, api_payload?: any, api_payload_key?: any): Promise<void> {
            try {
                let payload:Record<string,any>={
                    dropdown_name, 
                    module_id: this.moduleId.sub_module_id || this.moduleId.module_id,
                }
                if(api_payload && api_payload_key){
                    payload[api_payload_key] = api_payload;
                }
                const result: any = await this.api.post(
                    payload, 
                    api_path
                ).toPromise();
                
                if (result?.statusCode === 200) {
                    this.formFields.forEach(field => {
                        
                        if (field.name === name) {
                            field.options = result.data;
                        }
                        
                        // if(field?.actual_name && this.modalData.formType === 'edit'){
                        
                        //     const fieldId = field.options.findIndex((row:any) => row.value === value);
                        
                        //     // if(fieldId !== -1){
                        //     //     if((field.type === this.fieldTypes.SINGLE_SELECT) && field.key_source === 'default'){
                        
                        //     //         field[field['actual_name']] = field.options[fieldId]['label']
                        
                        //     //     }
                        //     // }
                        // }
                    });
                    
                    this.originalFormFields.forEach(field => {
                        if (field.name === name) {
                            field.options = result.data;
                        }
                    });
                }
            } catch (error) {
                console.error('Error fetching options:', error);
            }
        }
        
        private lastSearchTerm: string = '';
        onSearch(search: string, field: any) {
            const trimmedSearch = search?.trim() || '';
            if (trimmedSearch === this.lastSearchTerm) {
                return;
            }
            this.lastSearchTerm = trimmedSearch;
            this.api.post({
                'dropdown_name': field
                .name, 'search': trimmedSearch
            }, field.api_path).subscribe({
                next: (result) => {
                    if (result['statusCode'] === 200) {
                        field.options = result['data'];
                    }
                },
            });
        }
        
        onFieldChange(value: any, field: any) {
            if(field.type == this.fieldTypes.SINGLE_SELECT || field.type == this.fieldTypes.MULTI_SELECT || field.type == this.fieldTypes.RADIO_SELECT || field.type == this.fieldTypes.CHECKBOX_SELECT || field.type == this.fieldTypes.DATE || field.type == this.fieldTypes.TIME || field.type == this.fieldTypes.UPLOAD){
                
                if(field.type == this.fieldTypes.SINGLE_SELECT ){
                    field.control.setValue(value);
                    field.value = value.label;
                    if(field.key_name_required === true){
                        const fieldIndex = field.options.findIndex((row:any) => row.value === value);
                        let labelName:any
                        if(fieldIndex !==  -1){
                            labelName =  field.options[fieldIndex]['label'];
                            this.formFields.forEach(row => {
                                if (row['name'] === field.key_name) {
                                    this.myForm.controls[row['name']].setValue(labelName);
                                }
                            });
                        }
                    }
                }
                else{
                    field.control.setValue(value);
                }
            }
            
            if (field.type === this.fieldTypes.DATE_RANGE) {
                const formattedValue = { from: value.from, to: value.to };
                this.myForm.controls[field.name].setValue(formattedValue);
            }
            
            if (field.type === this.fieldTypes.DATE) {
                this.myForm.controls[field.name].setValue(field.control.value);                    
            }
            if(field?.actual_name){
                const fieldId = field.options.findIndex((row:any) => row.value === value);
                if(fieldId !== -1){
                    if((field.type === this.fieldTypes.SINGLE_SELECT) && field.key_source === 'default'){
                        field[field['actual_name']] = field.options[fieldId]['label']
                    }
                }
            }
        }
        
        getFormData(){
            this.skLoading = true;
            this.api.post({"form_id":this.moduleFormId, 'platform':'web'}, 'form-builder/read').subscribe(result => {
                if(result['statusCode'] == 200){
                    this.formFields = result['data']['form_data'];
                    this.skLoading = false;
                    this.formFields.forEach((feild:any) => {
                        this.util.createValidation(feild);
                    });
                    this.initializeForm();
                }
            });
        }
        
        
        onSubmit() {
            this.formFields.forEach(field => {
                if (field.is_child_show === false || field.is_show === false) {
                    this.myForm.get(field.name)?.clearValidators();
                    this.myForm.get(field.name)?.updateValueAndValidity();
                }
            });
            const isEditMode = this.modalData.formType === 'edit';
            
            if (!isEditMode && !this.myForm.valid) {
                this.toastr.error('Form is Invalid', '', 'toast-top-right');
                this.formValidation.markFormGroupTouched(this.myForm);
                const invalidFields = Object.keys(this.myForm.controls).filter(field =>
                    this.myForm.get(field)?.invalid
                );
                console.warn('Invalid fields:', invalidFields);
                return;
            }
            
            const result: { primaryFields: Record<string, any> & { form_data: Record<string, any> }; } = {
                primaryFields: {form_data: {}}
            };
            
            this.formFields.forEach(field => {
                if (field.name && this.myForm.value.hasOwnProperty(field.name)) {
                    if (field.read_only === false && field.key_source !== 'custom') {
                        result.primaryFields[field.name] = this.myForm.value[field.name];
                    }
                    if (field.key_source === 'custom') {
                        result.primaryFields.form_data[field.name] = this.myForm.value[field.name];
                    }
                    if (field?.actual_name) {
                        result.primaryFields[field.actual_name] = field[field.actual_name];
                    }
                }
            });
            this.api.disabled = true;
            
            result.primaryFields['_id'] = this.originalData._id;
            if (isEditMode) {
                result.primaryFields['user_name'] = this.originalData.user_name;
                const noChanges = this.logService.logActivityOnUpdate(
                    isEditMode, 
                    this.originalData, 
                    this.myForm.value, 
                    this.moduleId.sub_module_id, 
                    this.moduleId.title, 
                    'update', 
                    this.originalData._id || null,
                    () => {},
                    this.moduleId.module_type
                );
                if (noChanges) {
                    this.api.disabled = false;
                    this.toastr.warning('No changes detected', '', 'toast-top-right')
                    return ;
                }
            }
            
            const httpMethod = isEditMode ? 'patch' : 'post';
            const functionName = isEditMode ? 'leave/update' : 'leave/create';
            this.api[httpMethod](result.primaryFields, functionName).subscribe(result => {
                if(result['statusCode'] == 200){
                    this.api.disabled = false;
                    this.dialogRef.close(true);
                    this.toastr.success(result['message'], '', 'toast-top-right');
                }
            });
        }
        
        close() {
            this.dialogRef.close(); // Closes the dialog
        }
    }
    