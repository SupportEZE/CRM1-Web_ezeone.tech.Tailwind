import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { ShowcodeCardComponent } from '../../../../../shared/components/showcode-card/showcode-card.component';
import { NameUtilsService } from '../../../../../utility/name-utils';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalHeaderComponent } from '../../../../../shared/components/modal-header/modal-header.component';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { CommonApiService } from '../../../../../shared/services/common-api.service';
import { FilePondModule } from 'ngx-filepond';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { ModuleService } from '../../../../../shared/services/module.service';
import { FORMIDCONFIG } from '../../../../../../config/formId.config';
import { ApiService } from '../../../../../core/services/api/api.service';
import { UtilService } from '../../../../../utility/util.service';
import { FormFieldTypes, LOGIN_TYPES } from '../../../../../utility/constants';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormValidationService } from '../../../../../utility/form-validation';
import { UploadFileService } from '../../../../../shared/services/upload.service';
import { RemoveSpaceService } from '../../../../../core/services/remove-space/removeSpace.service';
import { LogService } from '../../../../../core/services/log/log.service';
import { Router } from '@angular/router';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';

@Component({
    selector: 'app-branding-modal',
    imports: [CommonModule,SharedModule,ModalHeaderComponent,MaterialModuleModule,FilePondModule],
    templateUrl: './branding-modal.component.html',
})
export class BrandingModalComponent {
    skLoading:boolean = false
    data:any ={};
    FORMID:any= FORMIDCONFIG;
    subModule:any
    moduleFormId:number=0;
    originalFormFields: any[] = []; // Store API response separately
    @Input() formFields: any[] = [];
    myForm!: FormGroup;
    primaryForm!: FormGroup;
    formIniatialized: boolean = false;
    DetailId:any;
    readonly fieldTypes = FormFieldTypes;
    originalData:any={}
    pageType:any = 'add'
    
    constructor(@Inject(MAT_DIALOG_DATA) public modalData: any, private dialogRef: MatDialogRef<BrandingModalComponent>,public CommonApiService: CommonApiService,private toastr: ToastrServices, public moduleService: ModuleService, public api: ApiService,public util:UtilService,private formValidation: FormValidationService,private fb: FormBuilder,public uploadService: UploadFileService, public spaceRemove:RemoveSpaceService,private logService: LogService,private router: Router,public comanFuncation: ComanFuncationService,){}
    
    ngOnInit() {
        const subModule = this.moduleService.getSubModuleByName('SFA', 'Branding');
        const form = this.moduleService.getFormById('SFA', 'Branding', this.FORMID.ID['BrandingForm']);
        if (subModule) {
            this.subModule = subModule;
        }
        if (form) {
            this.moduleFormId = form.form_id;
            if (this.modalData.formType === 'add-branding-request' || this.modalData.formType === 'add-branding-request') {
                this.getFormData();
            }
        }

        if (this.modalData.lastPage === 'branding-list') {
           this.data.status = this.modalData.status
        }
    }
    
    getFormData(){
        this.skLoading = true;
        this.api.post({"form_id":this.moduleFormId, 'platform':'web'}, 'form-builder/read').subscribe(result => {
            if(result['statusCode'] == 200){
                if (result?.data?.form_data) {
                    this.originalFormFields = JSON.parse(JSON.stringify(result.data.form_data));
                }
                this.formFields = result['data']['form_data'];
                this.skLoading = false;
                this.formFields.forEach((feild:any) => {
                    this.util.createValidation(feild);
                });
                this.initializeForm();
                
            }
        });
    }
    
    initializeForm(){
        this.getUserList();
        this.getLoginType();
        this.myForm = this.fb.group({});
        this.formFields.forEach(field => {
            if(field.api_path){
                this.getOptions(field.label, field.name, field.api_path)
            }
            field.control = this.fb.control('', this.formValidation.getValidators(field)); // Initialize using FormBuilder
            this.myForm.addControl(field.name, field.control);
        });
        this.formIniatialized = true;
        if(this.DetailId){
            this.getDetail();
        }
    }
    
    async getOptions(dropdown_name: string, name: string,  api_path: string): Promise<void> {
        try {
            const result: any = await this.api.post(
                { 
                    dropdown_name, 
                    module_id: this.subModule.sub_module_id || this.subModule.module_id 
                }, 
                api_path
            ).toPromise();
            
            if (result?.statusCode === 200) {
                this.formFields.forEach(field => {
                    if (field.name === name) {
                        field.options = result.data;
                    }
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
    
    onFieldChange(value: any, field: any) {
        if(field.type == this.fieldTypes.SINGLE_SELECT || field.type == this.fieldTypes.MULTI_SELECT || field.type == this.fieldTypes.RADIO_SELECT || field.type == this.fieldTypes.CHECKBOX_SELECT || field.type == this.fieldTypes.DATE || field.type == this.fieldTypes.TIME || field.type == this.fieldTypes.UPLOAD){
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
        if (field.type === this.fieldTypes.DATE_RANGE) {
            const formattedValue = { from: value.from, to: value.to };
            this.myForm.controls[field.name].setValue(formattedValue);
        }
        if (field.type === this.fieldTypes.UPLOAD) {
            for (let i = 0; i < this.UploadFiles.length; i++) {
                if(this.UploadFiles[i]['label'] === field.label){
                    this.UploadFiles.splice(i, 1)
                }
            }
            this.UploadFiles.push({'label':field.label, 'file':value});
        }
        if(field.is_child_dependency === true){
            const fieldId = field.options.findIndex((row:any) => row.value === value);
            if(fieldId !== -1){
                if((field.type === this.fieldTypes.SINGLE_SELECT) && field.key_source === 'default'){
                    field.value = field.options[fieldId]['value']
                    this.getDependencyUpdate(field)
                }
                else{
                    field.value = field.options[fieldId]['label']
                    this.getDependencyUpdate(field) 
                }
            }
        }
        
        if (field.is_child_dependency) {
            const startIndex = this.formFields.findIndex(formIndexRow => formIndexRow.name == field.name);
            this.onResetDependentFields(startIndex);
            for (let formIndex = startIndex; formIndex <= this.formFields.length-1; formIndex++) {
                const selectedFieldObject = this.formFields[formIndex].options?.find((row: any) => this.spaceRemove.formatString(row.value) === this.spaceRemove.formatString(this.formFields[formIndex].value));
                const selectedFieldLabel = selectedFieldObject?.label || '';
                for (let childIndex = 0; childIndex <= this.formFields[formIndex].child_dependency.length-1; childIndex++) {
                    let isVisible = false;
                    const childDependency = this.formFields[formIndex].child_dependency[childIndex]
                    if(childDependency.visibilty === 'Direct' && (childDependency.parent_field_value === selectedFieldLabel || (childDependency.child_field_option.length ===0 && this.formFields[formIndex]['is_child_show']))) {
                        isVisible = true;
                    }
                    if(this.formFields[formIndex].child_dependency[childIndex].visibilty === 'Option') {
                        const parentChildIndex = this.formFields.findIndex((fieldRow: any) => fieldRow.name == this.formFields[formIndex].child_dependency[childIndex].child_field_name);
                        if(parentChildIndex!== -1 && this.formFields[parentChildIndex].type === this.fieldTypes.SHORT_TEXT && this.formFields[formIndex].value) {
                            isVisible = true;
                            this.formFields[parentChildIndex].is_child_show = isVisible;
                        }
                        const childOptionIndex = this.formFields[formIndex].child_dependency[childIndex].child_field_option.findIndex(
                            (childRow:any) => {
                                return childRow.parent_field_value == selectedFieldLabel && childRow.parent_field_name == this.formFields[formIndex].name
                            }
                        );
                        if(childOptionIndex !== -1) {
                            isVisible = true;
                            const formTargetFieldIndex = this.formFields.findIndex((fieldRow: any) => fieldRow.name == this.formFields[formIndex].child_dependency[childIndex].child_field_name);
                            this.formFields[formTargetFieldIndex].options = this.formFields[formIndex].child_dependency[childIndex]['child_field_option'].filter((childFieldOptionRow:any) => childFieldOptionRow.parent_field_name == this.formFields[formIndex].name && childFieldOptionRow.parent_field_value == selectedFieldLabel);
                        }
                    }
                    const formFieldIndex = this.formFields.findIndex((fieldRow: any) => fieldRow.name == this.formFields[formIndex].child_dependency[childIndex].child_field_name);
                    if(formFieldIndex !== -1) {
                        this.formFields[formFieldIndex].is_child_show = isVisible;
                    }
                }          
            }
        }
        
        if (field.name === "customer_type_id") {
            this.getCustomerByLoginType(value)
        }
    }
    
    onResetDependentFields(startIndex: number) {
        if(this.formFields[startIndex].child_dependency.length==0) {
            return;   
        }
        this.formFields[startIndex].child_dependency.map((dependencyRow:any) => {
            const dependencyFormIndex = this.formFields.findIndex((formRow) => {
                return formRow.name === dependencyRow.child_field_name;
            })
            
            if(dependencyFormIndex  !== -1) {
                this.myForm.controls[dependencyRow.child_field_name].reset();
                this.formFields[dependencyFormIndex].value = "";
            }
            
            this.onResetDependentFields(dependencyFormIndex);
        })
    }
    
    getDetail() {
        this.api.post({_id: this.DetailId}, 'branding/detail').subscribe(result => {
            if (result['statusCode']  ===  200) {
                let Detail
                Detail = result['data'];
                this.originalData = { ...Detail, ...Detail.form_data };
                delete this.originalData.form_data;
                const objectKeys = Object.keys(this.originalData);
                const matchedItems = this.formFields.filter((item:any) => objectKeys.includes(item.name) && (item.type === this.fieldTypes.SINGLE_SELECT || item.type === this.fieldTypes.MULTI_SELECT));
                this.myForm.patchValue(this.originalData);        
                if (matchedItems.length > 0) {
                    
                    for (let index = 0; index < matchedItems.length; index++) {
                        const controlName = matchedItems[index]['name'];
                        if (this.myForm.controls[controlName]) {
                            this.myForm.controls[controlName].setValue(this.originalData[controlName]);
                        }
                        
                        for (let index = 0; index < this.formFields.length; index++) {
                            if((this.formFields[index]['name'] === controlName) && this.originalData[controlName]){
                                this.formFields[index]['is_child_show'] = true;
                                this.formFields[index]['value'] = this.originalData[controlName];
                                this.getDependencyUpdate(this.formFields[index])
                            }
                        }
                    }
                }
                
                
            }
            
        });
    }
    
    getUserList(){
        this.api.post({page : 1}, 'user/read-dropdown').subscribe(result => {
            if(result['statusCode'] == 200){
                for (let i = 0; i < this.formFields.length; i++) {
                    if(this.formFields[i]['name'] === 'assigned_to_user_id'){
                        this.formFields[i]['options'] = result['data'];
                    }
                }
            }
        });
    }
    
    getLoginType(){
        const login_type_ids = [LOGIN_TYPES.PRIMARY, LOGIN_TYPES.SUB_PRIMARY , LOGIN_TYPES.SECONDARY]
        this.api.post({ "form_id": this.moduleFormId, "login_type_ids": login_type_ids }, 'customer-type/read-dropdown').subscribe(result => {
            if(result['statusCode'] == 200){
                for (let i = 0; i < this.formFields.length; i++) {
                    if(this.formFields[i]['name'] === 'customer_type_id'){
                        this.formFields[i]['options'] = result['data'];
                    }
                }
            }
        });
    }
    
    getCustomerByLoginType(value:string){
        this.api.post({"customer_type_id": value,}, 'customer/read-dropdown').subscribe(result => {
            if(result['statusCode'] == 200){
                for (let i = 0; i < this.formFields.length; i++) {
                    if(this.formFields[i]['name'] === 'customer_id'){
                        this.formFields[i]['options'] = result['data'];
                    }
                }
            }
        });
    }
    
    getDependencyUpdate(field:any){
        if (field.is_child_dependency) {
            let parent_field_value: any;
            let child_field_name: any;
            let label: any;
            
            // Find the parent field value if key_source is 'default'
            if (field.key_source === 'default') {
                const option = field.options.find((row: any) => row.value === field.value);
                parent_field_value = option ? option.label : null;
            }
            
            // Find child dependency details efficiently
            field.child_dependency.forEach((dependency: any) => {
                const childField = this.formFields.find((f: any) => f.name === dependency.child_field_name);
                if (childField) {
                    child_field_name = childField.name;
                    const childOption = dependency.child_field_option.find((row: any) => row.parent_field_value === parent_field_value);
                    label = childOption ? childOption.label : null;
                }
            });
            
            // Fetch updated child field options
            if (child_field_name) {
                // label
                this.api.post({ child_field_name, parent_field_value }, 'form-builder/read-dependency')
                .subscribe(result => {
                    if (result?.statusCode === 200 && result?.data) {
                        const fieldToUpdate = this.formFields.find((f: any) => f.name === child_field_name);
                        if (fieldToUpdate) {
                            fieldToUpdate.options = result.data;
                        }
                    }
                });
            }
        }
    }
    
    onCustomerCategoryChange(value: any) {
        const selectedValue = this.CommonApiService.customerCategorySubType.find((item: any) => item.value === value);
        if (selectedValue) {
            this.data.customer_type_name = selectedValue.label;
        }
        this.CommonApiService.getCustomerData(this.data.customer_type_id);
    }
    
    pondFiles: File[] = [];
    UploadFiles:any=[];
    pondOptions = {
        allowMultiple: true,
        labelIdle: "Click or drag images here to upload...",
        acceptedFileTypes: ['image/jpeg', 'image/png', 'image/jpg'],
        maxFileSize: '2KB',
        maxFiles: 5,
    };
    
    onFileAdd(event: any) {
        const file = event.file.file;
        const validFormats = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!validFormats.includes(file.type)) {
            this.toastr.error('Invalid file type. Only JPG, JPEG, and PNG are allowed.', '', 'toast-top-right');
            return;
        }
        
        const byte = 1000000; // 1 MB in bytes
        if (file.size > (2 * byte)) {
            this.toastr.error('File size should not exceed 2MB.', '', 'toast-top-right');
            return;
        }
        this.pondFiles.push(file);
        this.UploadFiles = this.pondFiles
    }
    
    close() {
        this.dialogRef.close(); // Closes the dialog
    }
    
    onSubmit() {
        this.formFields.forEach(field => {
            if (field.is_child_show === false || field.is_show === false) {
                this.myForm.get(field.name)?.clearValidators(); // Remove all validators
                this.myForm.get(field.name)?.updateValueAndValidity(); // Refresh validation state
            }
        });
        if (this.myForm.valid) {
            this.api.disabled = true;
            const result: { primaryFields: Record<string, any> & { form_data: Record<string, any> }; } = {
                primaryFields: { form_data: {} }
            };
            this.formFields.forEach(field => {
                if (field.name && this.myForm.value.hasOwnProperty(field.name)) {
                    if (field.read_only === false && field.key_source !== 'custom') {
                        result.primaryFields[field.name] = this.myForm.value[field.name];
                    }
                    if (field.key_source === 'custom') {
                        result.primaryFields.form_data[field.name] = this.myForm.value[field.name];
                    }
                    if (field.type === this.fieldTypes.UPLOAD) {
                        delete result.primaryFields.form_data[field.name];
                    }
                }
            });
            result.primaryFields.form_data['files'] = this.myForm.value['files'];
            const isEditMode = this.pageType === 'edit';
            if (isEditMode) {
                result.primaryFields['_id'] = this.DetailId;
                const noChanges = this.logService.logActivityOnUpdate(
                    isEditMode, 
                    this.originalData, 
                    this.myForm.value, 
                    this.subModule.module_id,
                    this.subModule.title,
                    'update', 
                    this.originalData._id || null,
                    () => {},
                    this.subModule.module_type
                );
                if (noChanges) {
                    if (this.UploadFiles.length=== 0){
                        this.api.disabled = false;
                        this.toastr.warning('No changes detected', '', 'toast-top-right')
                        return;
                    }
                }
            } 
            const httpMethod = isEditMode ? 'patch' : 'post';
            const functionName = isEditMode ? 'event/update' : 'event/create';
            this.api[httpMethod](result.primaryFields, functionName).subscribe(result => {
                if (result['statusCode'] === 200) {
                    if (this.UploadFiles.length> 0){
                        this.api.disabled = true;
                        this.uploadService.uploadFile(result['data']['inserted_id'], 'event',  this.UploadFiles, 'Event Plan Images', this.subModule, '/apps/sfa/event-plan')
                    }
                    else
                    {
                        this.api.disabled = false;
                        this.router.navigate([!isEditMode ? '/apps/sfa/event-plan' : `/apps/sfa/event-plan/event-plan-detail/${this.DetailId}`]);
                        this.toastr.success(result['message'], '', 'toast-top-right');
                    }
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
    
    brandStatusChange(){
        this.skLoading = true;
        this.comanFuncation.statusChange(this.data.status, this.modalData.DetailId, this.modalData.status, this.modalData.subModule, 'without-toggle','brand-audit/status', this.data.reason,).subscribe((result: boolean) => {
            this.skLoading = false;
            if (result) {
                this.dialogRef.close(true);
            }
        });
    }
    
    closeModal() {
        this.dialogRef.close(); // Closes the dialog
    }
}
