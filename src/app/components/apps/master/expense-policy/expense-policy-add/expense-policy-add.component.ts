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
    selector: 'app-expense-policy-add-modal',
    providers: [provideNativeDateAdapter()],
    imports: [CommonModule, SharedModule, ReactiveFormsModule, MaterialModuleModule, ModalHeaderComponent],
    templateUrl: './expense-policy-add.component.html'
})
export class ExpensePolicyAddComponent {
    states:any = []; 
    today= new Date();
    formIniatialized: boolean = false;
    skLoading:boolean = false;
    myForm!: FormGroup;
    @Input() formFields: any[] = [];
    moduleFormId:number =0;
    moduleId:number=0;
    submoduleId:any ={}
    moduleName:string = '';
    module_type:string = '';
    primaryForm!: FormGroup;
    FORMID:any= FORMIDCONFIG;
    readonly fieldTypes = FormFieldTypes;
    formDropdown:any =[];
    formDropdownOption:any =[];
    userList:any =[];
    originalData:any = {};
    pageType:any = 'add'
    
    constructor(
        @Inject(MAT_DIALOG_DATA) public modalData: any,
        private fb: FormBuilder, public toastr:ToastrServices, public api:ApiService, private dialogRef: MatDialogRef<ExpensePolicyAddComponent>, private dateService: DateService, private formValidation: FormValidationService, public util:UtilService,private moduleService: ModuleService,private logService: LogService) {}
        
        ngOnInit() {
            this.pageType = this.modalData.formType;
            const subModule = this.moduleService.getSubModuleByName('Masters', 'Expense Policy');
            const form = this.moduleService.getFormById('Masters', 'Expense Policy', this.FORMID.ID['ExpensePolicyForm']);
            if (subModule) {
                this.moduleId = subModule.module_id;
                this.submoduleId = subModule.sub_module_id;
                this.moduleName = subModule.title;
                this.module_type = subModule.module_type;
            }
            if (form) {
                this.moduleFormId = form.form_id;
                this.getFormData();
            }
        }
        
        initializeForm(){
            
            this.myForm = this.fb.group({});
            this.formFields.forEach(field => {
                field.control = this.fb.control('', this.formValidation.getValidators(field)); // Initialize using FormBuilder
                this.myForm.addControl(field.name, field.control);
            });
            
            this.formIniatialized = true;
            
            
        }
        
        onFieldChange(value: any, field: any) {
            if(field.type == this.fieldTypes.SINGLE_SELECT || field.type == this.fieldTypes.MULTI_SELECT || field.type == this.fieldTypes.RADIO_SELECT || field.type == this.fieldTypes.CHECKBOX_SELECT || field.type == this.fieldTypes.DATE || field.type == this.fieldTypes.TIME || field.type == this.fieldTypes.UPLOAD){
                if(field.key_name_required === true){
                    const fieldIndex = field.options.findIndex((row:any) => row.value === value);
                    let labelName:any
                    if(fieldIndex !==-1){
                        labelName =  field.options[fieldIndex]['label'];
                        this.formFields.forEach(field => {
                            if (field.name === field.key_name) {
                                this.myForm.controls[field.name].setValue(labelName);
                            }
                        });
                    }
                }
                if(field.type == this.fieldTypes.SINGLE_SELECT && field.key_source == 'custom'){
                    field.control.setValue(value);
                    field.value = value.label;
                }
                else if (field.type == this.fieldTypes.MULTI_SELECT && field.key_source == 'custom') {
                    field.control.setValue(value);
                    field.value = value.label;
                }
                else{
                    field.control.setValue(value);
                }
            }
            
            if (field.type === this.fieldTypes.DATE) {
                this.myForm.controls[field.name].setValue(field.control.value);                    
            }
            this.myForm.controls['flight'].setValue(true);                    
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
                    if(this.pageType === 'edit'){
                        this.originalData = { ...this.modalData.formData, ...this.modalData.formData.form_data };
                        delete this.originalData.form_data;
                        console.log(this.originalData, 'originalData');
                        
                        this.myForm.patchValue(this.originalData);    
                    }
                    this.getUserList();
                }
            });
        }
        
        getUserList(){
            this.api.post({}, 'user/read-dropdown').subscribe(result => {
                if(result['statusCode'] == 200){
                    this.userList = result['data'];
                    for (let i = 0; i < this.formFields.length; i++) {
                        if(this.formFields[i]['name'] === 'user_id'){
                            this.formFields[i]['options'] = result['data'];
                        }
                    }
                }
            });
        }
        
        onSubmit(){
            this.formFields.forEach(field => {
                if (field.is_child_show === false || field.is_show === false) {
                    this.myForm.get(field.name)?.clearValidators(); // Remove all validators
                    this.myForm.get(field.name)?.updateValueAndValidity(); // Refresh validation state
                }
            });
            
            if (this.myForm.valid) {
                this.api.disabled = true;
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
                    }
                });
                
                const isEditMode = this.pageType === 'edit';
                if (isEditMode) {
                    const noChanges = this.logService.logActivityOnUpdate(
                        isEditMode, 
                        this.originalData, 
                        this.myForm.value, 
                        this.submoduleId, 
                        this.moduleName, 
                        'update', 
                        this.originalData.user_id || null,
                        () => {},
                        this.module_type
                    );
                    if (noChanges) {
                        this.api.disabled = false;
                        this.toastr.warning('No changes detected', '', 'toast-top-right')
                        return ;
                    }
                    
                }
                
                this.api.post((result.primaryFields), 'expense/save-allowance-master').subscribe(result => {
                    if(result['statusCode'] == 200){
                        this.api.disabled = false;
                        this.dialogRef.close(true);
                        this.toastr.success(result['message'], '', 'toast-top-right');
                    }
                });
            } else {
                this.toastr.error('Form Is Invalid', '', 'toast-top-right')
                this.formValidation.markFormGroupTouched(this.myForm); // Call the global function
                const invalidFields = Object.keys(this.myForm.controls).filter(field =>
                    this.myForm.get(field)?.invalid
                );
                
                console.warn('Invalid fields:', invalidFields); // Optional: log for debugging
            }
        }
        
        close() {
            this.dialogRef.close(); // Closes the dialog
        }
    }
    