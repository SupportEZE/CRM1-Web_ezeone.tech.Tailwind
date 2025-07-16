import { Component, Input } from '@angular/core';
import { ModuleService } from '../../../../../shared/services/module.service';
import { FORMIDCONFIG } from '../../../../../../config/formId.config';
import { SharedModule } from '../../../../../shared/shared.module';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FilePondModule } from 'ngx-filepond';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxEditorModule } from 'ngx-editor';
import { ApiService } from '../../../../../core/services/api/api.service';
import { UtilService } from '../../../../../utility/util.service';
import { FormValidationService } from '../../../../../utility/form-validation';
import { ModalsComponent } from '../../../../../shared/components/modals/modals.component';
import { MatDialog } from '@angular/material/dialog';
import { FormFieldTypes, LOGIN_TYPES } from '../../../../../utility/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { LogService } from '../../../../../core/services/log/log.service';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { RemoveSpaceService } from '../../../../../core/services/remove-space/removeSpace.service';
import { UploadFileService } from '../../../../../shared/services/upload.service';
import { AuthService } from '../../../../../shared/services/auth.service';

@Component({
    selector: 'app-event-add',
    imports: [SharedModule, NgSelectModule, FilePondModule,FormsModule,NgxEditorModule,ReactiveFormsModule, MaterialModuleModule,CommonModule],
    templateUrl: './event-plan-add.component.html',
})
export class EventPlanAddComponent {
    skLoading:boolean = false
    FORMID:any= FORMIDCONFIG;
    subModule:any
    moduleFormId:number=0;
    moduleTableId:number =0;
    UploadFiles:any =[];
    originalFormFields: any[] = []; // Store API response separately
    formGroup: FormGroup = new FormGroup({});
    @Input() formFields: any[] = [];
    myForm!: FormGroup;
    primaryForm!: FormGroup;
    formIniatialized: boolean = false;
    pageType:any = 'add'
    originalData:any={}
    readonly fieldTypes = FormFieldTypes;
    DetailId:any;
    orgData:any ={};
    LOGIN_TYPES = LOGIN_TYPES
    
    constructor(public moduleService: ModuleService,public api: ApiService,public util:UtilService,private formValidation: FormValidationService,private fb: FormBuilder,public dialog:MatDialog,public route: ActivatedRoute, private router: Router,private logService: LogService,private toastr: ToastrServices,public spaceRemove:RemoveSpaceService,public uploadService: UploadFileService, private authService: AuthService){
        this.orgData = this.authService.getUser();
    }
    
    ngOnInit() {
        const subModule = this.moduleService.getSubModuleByName('SFA', 'Event Plan');
        const form = this.moduleService.getFormById('SFA', 'Event Plan', this.FORMID.ID['EventPlanForm']);
        if (subModule) {
            this.subModule = subModule;
        }
        if (form) {
            this.moduleFormId = form.form_id;
            this.getFormData();
        }
        
        this.route.paramMap.subscribe(params => {
            if(params){
                this.DetailId = params.get('id');
                const editParam = params.get('edit');
                this.pageType = editParam ? editParam : 'add';
            }
        });
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
    
    initializeForm(){
        this.getUserList();
        this.getLoginType();
        this.myForm = this.fb.group({});
        this.formFields.forEach(field => {
            
            if(this.orgData.login_type_id === LOGIN_TYPES.FIELD_USER){
                if (field.name === 'assigned_to_user_id') {
                    field.is_show = false;
                }
            }
            
            if(field.min_date === true){
                if(field.min_period === 'today'){
                    field.min_period = new Date();
                }
            }
            
            if(field.api_path){
                this.getOptions(field.name, field.api_path)
            }            
            
            field.control = this.fb.control('', this.formValidation.getValidators(field)); // Initialize using FormBuilder
            this.myForm.addControl(field.name, field.control);
        });
        this.formIniatialized = true;
        if(this.DetailId){
            this.getDetail();
        }
    }
    
    async getOptions(name: string,  api_path: string): Promise<void> {
        try {
            const result: any = await this.api.post(
                { 
                    dropdown_name: name,
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
    
    getDetail() {
        this.api.post({_id: this.DetailId}, 'event/detail').subscribe(result => {
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
        if(field?.actual_name){
            const fieldId = field.options.findIndex((row:any) => row.value === value);
            
            if(fieldId !== -1){
                if((field.type === this.fieldTypes.SINGLE_SELECT) && field.key_source === 'default'){
                    field[field['actual_name']] = field.options[fieldId]['label']
                }
            }
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
                    if (field?.actual_name) {
                        result.primaryFields[field.actual_name] = field[field.actual_name];
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
            
            let function_name = '';;
            if (this.orgData.login_type_id === LOGIN_TYPES.ORGANIZATION_ADMIN) {
                function_name = isEditMode ? 'event/admin/update' : 'event/admin/create';
            } else if (this.orgData.login_type_id === LOGIN_TYPES.FIELD_USER) {
                function_name = isEditMode ? 'event/user/update' : 'event/user/create';
            }
            
            this.formValidation.removeEmptyFields(result.primaryFields)
            this.api[httpMethod](result.primaryFields, function_name).subscribe(result => {
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
