import { Component, Input } from '@angular/core';
import { RemoveSpaceService } from '../../../../core/services/remove-space/removeSpace.service';
import { UtilService } from '../../../../utility/util.service';
import { ApiService } from '../../../../core/services/api/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LogService } from '../../../../core/services/log/log.service';
import { ModuleService } from '../../../../shared/services/module.service';
import { FormValidationService } from '../../../../utility/form-validation';
import { FORMIDCONFIG } from '../../../../../config/formId.config';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormFieldTypes } from '../../../../utility/constants';
import { SharedModule } from '../../../../shared/shared.module';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgSelectModule } from '@ng-select/ng-select';
import { FilePondModule } from 'ngx-filepond';
import { MaterialModuleModule } from '../../../../material-module/material-module.module';
import { CommonModule } from '@angular/common';
import { NgxEditorModule } from 'ngx-editor';
import { ToastrServices } from '../../../../shared/services/toastr.service ';
import { ModalsComponent } from '../../../../shared/components/modals/modals.component';
import { UploadFileService } from '../../../../shared/services/upload.service';

@Component({
    selector: 'app-customer-add',
    imports: [SharedModule, FlatpickrModule, NgSelectModule, FilePondModule,
        FormsModule,NgxEditorModule,ReactiveFormsModule, MaterialModuleModule,CommonModule],
        templateUrl: './customer-add.component.html'
    })
    export class CustomerAddComponent {
        submodule:any
        FORMID:any= FORMIDCONFIG;
        moduleFormId:number =0;
        customerType:any;
        customerLoginType:any;
        customerLoginTypeId: any;
        customerId:any
        @Input() formFields: any[] = [];
        myForm!: FormGroup;
        formIniatialized: boolean = false;
        readonly fieldTypes = FormFieldTypes;
        UploadFiles:any =[];
        originalFormFields: any[] = [];
        skLoading:boolean = false;
        uploadedImages: any[] = [];
        binaryFiles: any[] = [];
        pageType:any = 'add'
        originalData:any={}
        customerTypeId:any;
        
        constructor(public spaceRemove:RemoveSpaceService, private toastr: ToastrServices, public util:UtilService, public api: ApiService, public dialog:MatDialog, public route: ActivatedRoute, private router: Router, private logService: LogService, private moduleService: ModuleService,
            private formValidation: FormValidationService, public uploadService: UploadFileService, private fb: FormBuilder
        ){}
        
        ngOnInit() {
            this.route.paramMap.subscribe(params => {
                if(params){
                    
                    this.customerLoginType = params.get('login_type');
                    this.customerLoginTypeId = params.get('login_type_id');
                    this.customerType = params.get('type_name');
                    this.customerTypeId = params.get('type_id');
                    this.customerId = params.get('id');
                    const editParam = params.get('edit');
                    this.pageType = editParam ? editParam : 'add';
                } 
            });
            const subModule = this.moduleService.getModuleByName('Customers');
            this.customerType = this.customerType?.replace(/_/g, ' ') || '';
            const matchedChild = subModule?.children?.find((child: any) => child.title === this.customerType);
            
            let form
            if (matchedChild && matchedChild.forms?.length) {
                form = matchedChild.forms[0];
            }
            
            if (subModule) {
                this.submodule = subModule;
            }
            if (form) {
                this.submodule.form_id = form.form_id;
                this.moduleFormId = form.form_id;
                this.getFormData();
            }
            
        }
        
        
        
        initializeForm(){
            this.myForm = this.fb.group({});
            
            this.formFields.forEach(field => {
                if(field.api_path){
                    this.getOptions(field.name, field.api_path, field.api_payload, field.api_payload_key)
                }
                
                field.control = this.fb.control('', this.formValidation.getValidators(field)); // Initialize using FormBuilder
                this.myForm.addControl(field.name, field.control);
                
                if (this.customerLoginType === "Influencer" && field.name === "customer_code") {
                    field.is_show = false;
                    this.myForm.get(field.name)?.clearValidators(); // Remove all validators
                    this.myForm.get(field.name)?.updateValueAndValidity();
                }
            });
            this.formIniatialized = true;
            if(this.customerId){
                this.getCustomerDetail();
            }
        }
        
        async getOptions(name: string, api_path: string, api_payload?: any, api_payload_key?: any): Promise<void> {
            console.log(name, 'name');
            try {
                let payload: Record<string, any> = {
                    
                    dropdown_name: name,
                    module_id: this.submodule.sub_module_id || this.submodule.module_id,
                }
                if (api_payload && api_payload_key) {
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
        
        
        getCustomerDetail() {
            this.skLoading = true;
            this.api.post({_id: this.customerId}, 'customer/detail').subscribe(result => {
                if (result['statusCode']  ===  200) {
                    this.skLoading = false;
                    let detail
                    detail = result['data']['basic_detail'];
                    this.originalData = { ...detail, ...detail.form_data };
                    if(this.originalData.state){
                        this.getDistrict(this.originalData.state)
                    }
                    
                    delete this.originalData.form_data;
                    const objectKeys = Object.keys(this.originalData);
                    
                    const matchedItems = this.formFields.filter((item:any) => 
                        objectKeys.includes(item.name) && (item.type === this.fieldTypes.SINGLE_SELECT || item.type === this.fieldTypes.MULTI_SELECT));
                    this.myForm.patchValue(this.originalData); 
                    
                    
                    if (matchedItems.length > 0) {
                        for (let index = 0; index < matchedItems.length; index++) {
                            this.onFieldChange(matchedItems[index]['control']?.value, matchedItems[index]);
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
            
            if ((field.name === "mobile" && value.length == 10) || (field.name === "alt_mobile_no" && value.length == 10)) {
                this.checkDuplicate(field.api_path, field.name, value)
            }
            if (field.type === this.fieldTypes.UPLOAD) {
                for (let i = 0; i < this.UploadFiles.length; i++) {
                    if(this.UploadFiles[i]['label'] === field.label){
                        this.UploadFiles.splice(i, 1)
                    }
                }
                Object.assign(value, { image_type: field.label });
                this.UploadFiles.push({'file':value});
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
            
            if (field.name === "state") {
                this.getDistrict(value)
            }
            // && this.orgData.org.postal_auto_fetch === 1
            if (field.name === "pincode" && value.length === 6 ) {// Postal Pincode //
                this.getPostalMaster(value)
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
                            const childOptionIndex = this.formFields[formIndex].child_dependency[childIndex].child_field_option.findIndex((childRow:any) => 
                                {
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
    }
    
    onClick(event:any){
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
                this.getState();
                this.initializeForm();
                
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
    
    checkDuplicate(api:string, fieldName:string, fieldValue:string){
        const requestBody = {
            [fieldName]: fieldValue
        };
        this.api.post(requestBody, api).subscribe(result => {
            if(result === false){
                this.api.isDuplicate = true
            }
            else{
                this.api.isDuplicate = false
            }
        });
    }
    
    getState(){
        this.api.post({}, 'postal-code/states').subscribe(result => {
            if(result['statusCode'] == 200){
                for (let i = 0; i < this.formFields.length; i++) {
                    if(this.formFields[i]['name'] === 'state' || this.formFields[i]['name'] === 'holiday_profile' || this.formFields[i]['name'] === 'assigned_area'){
                        this.formFields[i]['options'] = result['data'];
                    }
                }
            }
        });
    }
    
    getDistrict(state:string){
        for (let i = 0; i < this.formFields.length; i++) {
            if (this.formFields[i]['name'] === 'district') {
                this.formFields[i]['options'] = [];
            }
        }
        this.api.post({"state": state,}, 'postal-code/districts').subscribe(result => {
            if(result['statusCode'] == 200){
                for (let i = 0; i < this.formFields.length; i++) {
                    if(this.formFields[i]['name'] === 'district'){
                        this.formFields[i]['options'] = result['data'];
                    }
                }
            }
        });
    }
    
    getPostalMaster(pincode:any){
        this.api.post({"pincode" : pincode}, 'postal-code/read-using-pincode').subscribe(result => {
            if(result['statusCode'] == 200){
                for (let i = 0; i < this.formFields.length; i++) {
                    if(this.formFields[i]['name'] === 'state'){
                        this.myForm.controls['state'].setValue(result['data']['state']);
                        this.getDistrict(result['data']['state'])
                    } 
                    if(this.formFields[i]['name'] === 'district'){
                        this.myForm.controls['district'].setValue(result['data']['district']);
                    }
                    if(this.formFields[i]['name'] === 'city'){
                        this.myForm.controls['city'].setValue(result['data']['city']);
                    }  
                    if (this.formFields[i]['name'] === 'country') {
                        this.myForm.controls['country'].setValue(result['data']['country']);
                    }                  
                }
            }
        });
    }
    
    openModal(event:any) {
        const dialogRef = this.dialog.open(ModalsComponent, {
            // width: '1024px',
            data: {
                'lastPage':'product',
                'form_Fields':this.originalFormFields,
                'moduleFormId':this.moduleFormId,
                "moduleId":this.submodule.module_id,
                "moduleName":this.submodule.title,
                'moduleData':this.submodule
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result === true){
                this.getFormData()
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
            this.formValidation.removeEmptyFields(result.primaryFields)
            result.primaryFields.form_data['files'] = this.myForm.value['files'];
            const isEditMode = this.pageType === 'edit';
            if (isEditMode) {
                result.primaryFields['_id'] = this.customerId;
                const noChanges = this.logService.logActivityOnUpdate(
                    isEditMode,
                    this.originalData,
                    this.myForm.value,
                    this.submodule.sub_module_id ? this.submodule.sub_module_id : this.submodule.module_id,
                    this.submodule.title,
                    'update',
                    this.originalData._id || null,
                    () => { },
                    this.submodule.module_type
                );
                if (noChanges) {
                    if (this.UploadFiles.length === 0) {
                        this.api.disabled = false;
                        this.toastr.warning('No changes detected', '', 'toast-top-right')
                        return;
                    }
                }
            }
            const httpMethod = isEditMode ? 'patch' : 'post';
            const functionName = isEditMode ? 'customer/update' : 'customer/create';
            result.primaryFields['customer_type_id'] = this.customerTypeId;
            result.primaryFields['customer_type_name'] = this.customerType;
            
            this.api[httpMethod](result.primaryFields, functionName).subscribe(result => {
                if (result['statusCode'] === 200) {
                    if (this.UploadFiles.length > 0) {
                        this.uploadService.uploadFile(result['data']['inserted_id'], 'customer', this.UploadFiles, 'Profile Picture', this.submodule, 'apps/customer/customer-list/' + this.customerLoginType + '/' + this.customerLoginTypeId + '/' + this.customerType + '/' + this.customerTypeId, () => { }, undefined, this.originalData.files)
                    }
                    else {
                        this.api.disabled = false;
                        this.router.navigate(['apps/customer/customer-list/' + this.customerLoginType + '/' + this.customerLoginTypeId + '/' + this.customerType + '/' + this.customerTypeId]);
                        this.toastr.success(result['message'], '', 'toast-top-right');
                    }
                }
            });
        } else {
            this.toastr.error('Form Is Invalid', '', 'toast-top-right')
            this.formValidation.markFormGroupTouched(this.myForm); // Call the global function
        }
    }
    
    onSearch(search: string, field: any) {
        const payload: any = {
            module_id: this.submodule.sub_module_id || this.submodule.module_id,
            page: 1,
            dropdown_name: field.search_payload,
            filters: { search: search }
        };
        
        const stateValue = this.myForm.value.state;
        if (stateValue) {
            payload.state = stateValue;
        }
        
        this.api.post(payload, field.search_api).subscribe({
            next: (result) => {
                if (result['statusCode'] === 200) {
                    field.options = result['data'];
                }
            },
        });
    }
}
