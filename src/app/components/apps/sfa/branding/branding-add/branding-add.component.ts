import { Component, Inject, Input } from '@angular/core';
import { FORMIDCONFIG } from '../../../../../../config/formId.config';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormFieldTypes, LOGIN_TYPES } from '../../../../../utility/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { LogService } from '../../../../../core/services/log/log.service';
import { RemoveSpaceService } from '../../../../../core/services/remove-space/removeSpace.service';
import { UploadFileService } from '../../../../../shared/services/upload.service';
import { FormValidationService } from '../../../../../utility/form-validation';
import { UtilService } from '../../../../../utility/util.service';
import { ApiService } from '../../../../../core/services/api/api.service';
import { ModuleService } from '../../../../../shared/services/module.service';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { CommonApiService } from '../../../../../shared/services/common-api.service';
import { MatDialog } from '@angular/material/dialog';
import { FilePondModule } from 'ngx-filepond';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { ModalHeaderComponent } from '../../../../../shared/components/modal-header/modal-header.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ModalsComponent } from '../../../../../shared/components/modals/modals.component';

@Component({
    selector: 'app-branding-add',
    imports: [
        CommonModule,
        SharedModule,
        MaterialModuleModule,
        FilePondModule
    ],
    templateUrl: './branding-add.component.html',
    styleUrl: './branding-add.component.scss'
})
export class BrandingAddComponent {
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
    
    
    constructor(
        public CommonApiService: CommonApiService,
        private toastr: ToastrServices,
        public moduleService: ModuleService,
        public api: ApiService,
        public util:UtilService,
        private formValidation: FormValidationService,
        private fb: FormBuilder,
        public uploadService: UploadFileService,
        public spaceRemove:RemoveSpaceService,
        private logService: LogService,
        private router: Router,
        public dialog:MatDialog,
        public route: ActivatedRoute,
    )
    {}
    ngOnInit() {
        const subModule = this.moduleService.getSubModuleByName('SFA', 'Branding');
        const form = this.moduleService.getFormById('SFA', 'Branding', this.FORMID.ID['BrandingForm']);
        if (subModule) {
            this.subModule = subModule;
        }
        if (form) {
            this.moduleFormId = form.form_id;
            this.getFormData();
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
        this.myForm = this.fb.group({});
        this.formFields.forEach(field => {
            if(field.api_path){
                this.getOptions(field.name, field.api_path, field.api_payload, field.api_payload_key)
            }
            field.control = this.fb.control('', this.formValidation.getValidators(field)); // Initialize using FormBuilder
            this.myForm.addControl(field.name, field.control);
        });
        this.formIniatialized = true;
        // if(this.DetailId){
        //   this.getDetail();
        // }
    }
    
    async getOptions(name: string,  api_path: string, api_payload?: any, api_payload_key?: any): Promise<void> {
        try {
            let payload:Record<string,any>={
                dropdown_name: name,
                module_id: this.subModule.sub_module_id || this.subModule.module_id,
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
            result.primaryFields.form_data['files'] = this.myForm.value['files'];
            // Add labels for customer, customer type, and product
            const selectedCustomer = this.formFields.find(f => f.name === 'customer_id')?.options
            ?.find((option: any) => option.value === this.myForm.value['customer_id']);
            const selectedCustomerType = this.formFields.find(f => f.name === 'customer_type_id')?.options
            ?.find((option: any) => option.value === this.myForm.value['customer_type_id']);
            const selectedItemName = this.formFields.find(f => f.name === 'product_id')?.options
            ?.find((option: any) => option.value === this.myForm.value['product_id']);
            if (selectedCustomer) {
                result.primaryFields['customer_name'] = selectedCustomer.label;
            }
            if (selectedCustomerType) {
                result.primaryFields['customer_type_name'] = selectedCustomerType.label;
            }
            if (selectedItemName) {
                result.primaryFields['product_name'] = selectedItemName.label;
            }
            // Only create API
            this.formValidation.removeEmptyFields(result.primaryFields)
            this.formValidation.removeEmptyFields(result.primaryFields.form_data)
            this.api.post(result.primaryFields, 'brand-audit/create').subscribe(response => {
                if (response['statusCode'] === 200) {
                    if (this.UploadFiles.length > 0) {
                        this.api.disabled = true;
                        this.uploadService.uploadFile(response['data']['inserted_id'], 'brand-audit', this.UploadFiles, 'Branding Images', this.subModule, '/apps/sfa/branding' );
                    } else {
                        this.api.disabled = false;
                        this.router.navigate(['/apps/sfa/branding']);
                        this.toastr.success(response['message'], '', 'toast-top-right');
                    }
                }
            });
        } else {
            this.toastr.error('Form Is Invalid', '', 'toast-top-right');
            this.formValidation.markFormGroupTouched(this.myForm);
            const invalidFields = Object.keys(this.myForm.controls).filter(field =>
                this.myForm.get(field)?.invalid
            );
            console.warn('Invalid fields:', invalidFields);
        }
    }
    
    openModal() {
        const dialogRef = this.dialog.open(ModalsComponent, {
            data: {
                'lastPage':'form-config',
                'form_Fields':this.originalFormFields,
                'moduleFormId':this.moduleFormId,
                "moduleId":this.subModule.module_id,
                "moduleName":this.subModule.title,
                'moduleData':this.subModule
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            // if(result === true){
            this.getFormData()
            // }
        });
    }
}
