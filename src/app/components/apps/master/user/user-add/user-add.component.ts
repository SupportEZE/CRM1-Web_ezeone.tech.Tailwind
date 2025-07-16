import { ChangeDetectorRef, Component, Input, ViewChild, NO_ERRORS_SCHEMA  } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { FlatpickrDefaults, FlatpickrModule } from 'angularx-flatpickr';
import { NgSelectModule } from '@ng-select/ng-select';
import { FilePondModule } from 'ngx-filepond';
import { CommonModule, DatePipe } from '@angular/common';
import {NgxEditorModule,} from 'ngx-editor';
import Choices, {Options } from 'choices.js';
import { ApiService } from '../../../../../core/services/api/api.service';
import { UtilService } from '../../../../../utility/util.service';
import { ModalsComponent } from '../../../../../shared/components/modals/modals.component';
import { MatDialog } from '@angular/material/dialog';
import { FormFieldTypes, LOGIN_TYPES } from '../../../../../utility/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { FORMIDCONFIG } from '../../../../../../config/formId.config';
import { RemoveSpaceService } from '../../../../../core/services/remove-space/removeSpace.service';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { FormValidationService } from '../../../../../utility/form-validation';
import { ModuleService } from '../../../../../shared/services/module.service';
import { LogService } from '../../../../../core/services/log/log.service';
import { UploadFileService } from '../../../../../shared/services/upload.service';
import { AuthService } from '../../../../../shared/services/auth.service';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
@Component({
    selector: 'app-user-add',
    standalone: true,
    imports: [SharedModule, FlatpickrModule, NgSelectModule, FilePondModule, FormsModule,NgxEditorModule,ReactiveFormsModule, MaterialModuleModule,CommonModule],
    templateUrl: './user-add.component.html',
    providers:[  FlatpickrDefaults],
    // styleUrl: './add-user.component.scss',
    schemas: [NO_ERRORS_SCHEMA]
})
export class UserAddComponent {
    formGroup: FormGroup = new FormGroup({});
    @Input() formFields: any[] = [];
    myForm!: FormGroup;
    primaryForm!: FormGroup;
    FORMID:any= FORMIDCONFIG;
    moduleFormId:number =0;
    moduleId:any={}
    uploadedImages: any[] = [];
    binaryFiles: any[] = [];
    uploadedLabel: any;
    skLoading:boolean = false
    readonly fieldTypes = FormFieldTypes;
    formIniatialized: boolean = false;
    public tagsElement!:Choices;
    public type: string = 'component';
    Math = Math;
    statList:any =[]
    reportingManagerList:any =[]
    orgData:any = {}
    pageType:any = 'add'
    userId:any
    loginType:any;
    submodule:any ={}
    pondFiles: any[] = [];
    originalFormFields: any[] = []; // Store API response separately
    UploadFiles:any =[];
    
    
    constructor(public spaceRemove:RemoveSpaceService, private fb: FormBuilder, public util:UtilService, private toastr: ToastrServices, public api: ApiService, private cdRef: ChangeDetectorRef, public dialog:MatDialog, private router: Router,private formValidation: FormValidationService, private logService: LogService, public route: ActivatedRoute, private moduleService: ModuleService, public uploadService: UploadFileService, private authService: AuthService, public comanFuncation: ComanFuncationService){
        this.orgData = this.authService.getOrg();
    }
    
    ngOnInit() {
        const subModule = this.moduleService.getSubModuleByName('Masters', 'Users');
        const form = this.moduleService.getFormById('Masters', 'Users', this.FORMID.ID['UserForm']);
        
        if (subModule) {
            this.submodule = subModule;
        }
        if (form) {
            this.submodule.form_id = form.form_id;
            this.moduleFormId = form.form_id;
            this.getFormData();
        }
        
        this.route.paramMap.subscribe(params => {
            if(params){
                this.loginType = params.get('login_type_id')
                this.userId = params.get('id');
                const editParam = params.get('edit');
                this.pageType = editParam ? editParam : 'add';
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
        this.myForm = this.fb.group({});
        this.formFields.forEach(field => {
            if(field.api_path){
                
                if(field.api_payload_key){
                    const payload = new Set(); 
                    if (this.orgData.sfa || this.orgData.irp || this.orgData.dms || this.orgData.wcms || this.orgData.wms) {
                        payload.add(LOGIN_TYPES.SYSTEM_USER);
                    }
                    if (this.orgData.sfa) {
                        payload.add(LOGIN_TYPES.FIELD_USER);
                    }
                    if (this.orgData.wms) {
                        payload.add(LOGIN_TYPES.WHAREHOUSE);
                    }
                    
                    if (this.orgData.wcms) {
                        payload.add(LOGIN_TYPES.SERVICE_VENDOR);
                        payload.add(LOGIN_TYPES.SERVICE_FIELD_USER);
                    }
                    field.api_payload_key = Array.from(payload);
                }
                
                this.getOptions(field.name, field.api_path, field.api_payload, field.api_payload_key)
            }
            
            field.control = this.fb.control('', this.formValidation.getValidators(field)); // Initialize using FormBuilder
            this.myForm.addControl(field.name, field.control);
        });
        this.formIniatialized = true;
        if(this.userId){
            this.getUserDetail();
        }
        
        // if(this.loginType){
        //     const index = this.formFields.findIndex((row:any) => row.name === 'login_type_id');
        //     if(index !== -1){
        //         this.formFields[index].value = Number(this.loginType)
        //         this.onFieldChange(this.loginType, this.formFields[index]);
        //         this.myForm.patchValue({'login_type_id':Number(this.loginType)});
        //     }
        // }
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
        console.log(value, 'value');
        console.log(field, 'field');

        
        if(field.type == this.fieldTypes.SINGLE_SELECT || field.type == this.fieldTypes.MULTI_SELECT || field.type == this.fieldTypes.RADIO_SELECT || field.type == this.fieldTypes.CHECKBOX_SELECT || field.type == this.fieldTypes.DATE || field.type == this.fieldTypes.TIME || field.type == this.fieldTypes.UPLOAD){
            if(field.type == this.fieldTypes.SINGLE_SELECT){
                field.control.setValue(value);
                console.log(field.control,'field.control');
                console.log(field, 'field');
                field.value = value.label;
                // if(field.key_name_required === true){
                //     const fieldIndex = field.options.findIndex((row:any) => row.value === value);
                //     let labelName:any
                //     if(fieldIndex !==  -1){
                //         labelName = field.options[fieldIndex]['label'];
                //         this.formFields.forEach(row => {
                //             if (row['name'] === field.key_name) {
                //                 this.myForm.controls[row['name']].setValue(labelName);
                //             }
                //         });
                //     }
                // }
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
            Object.assign(value, { image_type: field.label });
            this.UploadFiles.push({'file':value});
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
                    if(field.visibilty === 'Option'){
                        // this.getDependencyUpdate(field)
                    }
                }
                else{
                    field.value = field.options[fieldId]['label']
                    if(field.visibilty === 'Option'){
                        // this.getDependencyUpdate(field)
                    }
                }
            }
        }
        
        if (field.is_child_dependency) {
            const startIndex = this.formFields.findIndex(formIndexRow => formIndexRow.name == field.name);
            
            this.onResetDependentFields(startIndex);
            for (let formIndex = startIndex; formIndex <= this.formFields.length-1; formIndex++) {
                let selectedFieldObject = this.formFields[formIndex].options?.find((row: any) => this.spaceRemove.formatString(row.value) == this.spaceRemove.formatString(this.formFields[formIndex].value));
                if (selectedFieldObject?.value != field.value) {
                    selectedFieldObject = this.formFields[formIndex].options?.find((row: any) => row.value=== this.formFields[formIndex].value);
                }
                
                const selectedFieldLabel = selectedFieldObject?.label || undefined;
                let lastChildFieldIndex = 0;
                for (let childIndex = 0; childIndex <= this.formFields[formIndex].child_dependency.length-1; childIndex++) {
                    let isVisible = false;
                    let childData =  this.formFields[formIndex].child_dependency;
                    
                    const childDependency = this.formFields[formIndex].child_dependency[childIndex]
                    
                    if(childDependency.visibilty === 'Direct' && selectedFieldLabel && (childDependency.parent_field_value === selectedFieldLabel || (childDependency.child_field_option.length ===0 && this.formFields[formIndex]['is_child_show']))) {
                        isVisible = true;
                        
                        if(childDependency?.api_path && childDependency.parent_field_value === selectedFieldLabel){
                            this.getDirectOptions(childDependency.child_field_name, childDependency.api_path)
                        }
                    }
                    
                    if(this.formFields[formIndex].child_dependency[childIndex].visibilty === 'Option') {
                        
                        const parentChildIndex = this.formFields.findIndex((fieldRow: any) => fieldRow.name == this.formFields[formIndex].child_dependency[childIndex].child_field_name);
                        
                        if(parentChildIndex!== -1 && this.formFields[parentChildIndex].type === this.fieldTypes.SHORT_TEXT && this.formFields[formIndex].value) {
                            isVisible = true;
                            
                            this.formFields[parentChildIndex].is_child_show = isVisible;
                            
                        }
                        const childOptionIndex = this.formFields[formIndex].child_dependency[childIndex].child_field_option.findIndex((childRow:any) => {
                            return childRow.parent_field_value == selectedFieldLabel && childRow.parent_field_name == this.formFields[formIndex].name
                        });
                        if(childOptionIndex !== -1) {
                            
                            isVisible = true;
                            const formTargetFieldIndex = this.formFields.findIndex((fieldRow: any) => fieldRow.name == this.formFields[formIndex].child_dependency[childIndex].child_field_name);
                            this.formFields[formTargetFieldIndex].options = this.formFields[formIndex].child_dependency[childIndex]['child_field_option'].filter((childFieldOptionRow:any) => childFieldOptionRow.parent_field_name == this.formFields[formIndex].name && childFieldOptionRow.parent_field_value == selectedFieldLabel);
                        }
                    }
                    
                    const formFieldIndex = this.formFields.findIndex((fieldRow: any) => fieldRow.name == this.formFields[formIndex].child_dependency[childIndex].child_field_name && this.formFields[formIndex].child_dependency[childIndex].parent_field_value ==  selectedFieldLabel);
                    if(formFieldIndex !== -1) {
                        
                        this.formFields[formFieldIndex].is_child_show = isVisible;
                    }else{
                        
                        let unMatchChildData = childData.filter(
                            (value:any, index:any, self:any) =>
                                index === self.findIndex((t:any) => t.child_field_name === value.child_field_name && value.parent_field_value!=selectedFieldLabel)
                        );
                        
                        let matchChildData = childData.filter(
                            (value:any, index:any, self:any) =>
                                value.parent_field_value==selectedFieldLabel
                        );
                        
                        unMatchChildData = unMatchChildData.filter((unMatch: any) => {
                            return !matchChildData.some((match: any) => match.child_field_name === unMatch.child_field_name);
                        });
                        
                        unMatchChildData.map((row:any)=>{
                            let ChildFieldIndex = this.formFields.findIndex((index:any)=>index.name == row.child_field_name );
                            if (lastChildFieldIndex != ChildFieldIndex) {
                                if (ChildFieldIndex !== -1 && this.formFields[ChildFieldIndex]) {
                                    let childFieldData = this.formFields[ChildFieldIndex];
                                    
                                    this.formFields[ChildFieldIndex].is_child_show = false;
                                }
                            }
                            lastChildFieldIndex = ChildFieldIndex;
                        })
                    }
                }
            }
        }
        if (field.name === "state") {
            this.getDistrict(value)
        }
        if (field.check_duplicate && value.length === field.api_call_length) {
            this.checkDuplicate(field.api_path, field.name, value)
        }
        if (field.name === "pincode" && value.length === 6) {// Postal Pincode //
            this.getPostalMaster(value)
        }
    }
    
    
    onDeleteImage(index: number) {
        this.uploadedImages.splice(index, 1);
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
                this.getReportingManager();
                this.getUserRole();
                this.getState();
                this.initializeForm();
            }
        });
    }
    
    async getDirectOptions(name: string,  api_path: string): Promise<void> {
        this.skLoading = true;
        try {
            let payload:Record<string,any>={
                module_id: this.submodule.sub_module_id || this.submodule.module_id,
            }
            const result: any = await this.api.post(
                payload, 
                api_path
            ).toPromise();
            
            if (result?.statusCode === 200) {
                this.skLoading = false;
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
    
    async getOptions(name: string, api_path: string, api_payload?: any, api_payload_key?: any): Promise<void> {
        try {
            let payload:Record<string,any>={
                dropdown_name: name,
                module_id: this.submodule.sub_module_id || this.submodule.module_id,
            }
            if (name === 'reporting_manager_id' && this.userId) {
                payload['user_id'] = this.userId;
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
    
    
    originalData:any={}
    
    
    getUserDetail() {
        this.skLoading = true;
        this.api.post({_id: this.userId}, 'user/read-detail').subscribe(result => {
            if (result['statusCode']  ===  200) {
                this.skLoading = false;
                let detail
                detail = result['data'];
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
                                // this.getDependencyUpdate(this.formFields[index])
                            }
                        }
                    }
                }
            }
            
        });
        
    }
    
    formatDateForFlatpickr(dateString: string): string {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Extracts 'YYYY-MM-DD'
    }
    
    
    
    // getDependencyUpdate(field:any){
    //     if (field.is_child_dependency) {
    //         let parent_field_value: any;
    //         let child_field_name: any;
    //         let label: any;
    
    //         // Find the parent field value if key_source is 'default'
    //         if (field.key_source === 'default') {
    //             const option = field.options.find((row: any) => row.value === field.value);
    //             parent_field_value = option ? option.label : null;
    //         }
    
    //         // Find child dependency details efficiently
    //         field.child_dependency.forEach((dependency: any) => {
    //             const childField = this.formFields.find((f: any) => f.name === dependency.child_field_name);
    //             if (childField) {
    //                 child_field_name = childField.name;
    //                 const childOption = dependency.child_field_option.find((row: any) => row.parent_field_value === parent_field_value);
    //                 label = childOption ? childOption.label : null;
    //             }
    //         });
    
    //         // Fetch updated child field options
    //         if (child_field_name) {
    //             // label
    //             this.api.post({ child_field_name, parent_field_value }, 'form-builder/read-dependency')
    //             .subscribe(result => {
    //                 if (result?.statusCode === 200 && result?.data) {
    //                     const fieldToUpdate = this.formFields.find((f: any) => f.name === child_field_name);
    //                     if (fieldToUpdate) {
    //                         fieldToUpdate.options = result.data;
    //                     }
    //                 }
    //             });
    //         }
    //     }
    // }
    
    
    
    
    cleanDetailObject() {
        if (!this.originalData || !this.myForm.value) {
            return;
        }
        
        const productObj = this.myForm.value; // Product object from form values
        this.originalData = Object.keys(this.originalData)
        .filter(key => key in productObj) // Keep only keys that exist in myForm.value
        .reduce((cleaned, key) => {
            cleaned[key] = this.originalData[key];
            return cleaned;
        }, {} as any);
        
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
            
            this.formValidation.removeEmptyFields(result.primaryFields)
            this.formValidation.removeEmptyFields(result.primaryFields.form_data)
            const isEditMode = this.pageType === 'edit';
            if (isEditMode) {
                result.primaryFields['_id'] = this.userId;
                const noChanges = this.logService.logActivityOnUpdate(
                    isEditMode, 
                    this.originalData, 
                    this.myForm.value, 
                    this.submodule.sub_module_id, 
                    this.submodule.title, 
                    'update', 
                    this.originalData._id || null,
                    () => {},
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
            const functionName = isEditMode ? 'user/update' : 'user/create';
            
            
            
            this.api[httpMethod](result.primaryFields, functionName).subscribe(result => {
                if (result['statusCode'] === 200) {
                    if (this.UploadFiles.length> 0){
                        this.api.disabled = true;
                        this.uploadService.uploadFile(result['data']['inserted_id'], 'user',  this.UploadFiles, 'User Images', this.submodule, '/apps/master/user/user-list')
                    }
                    else{
                        this.api.disabled = false;
                        this.comanFuncation.setHighLight('userList', 'add', '', {}, 1);
                        this.router.navigate(['/apps/master/user/user-list']);
                        this.toastr.success(result['message'], '', 'toast-top-right');
                    }
                }
            });
        } else {
            this.toastr.error('Form Is Invalid', '', 'toast-top-right')
            this.formValidation.markFormGroupTouched(this.myForm); // Call the global function
        }
    }
    
    openModal(event:any) {
        const dialogRef = this.dialog.open(ModalsComponent, {
            // width: '1024px',
            data: {
                'lastPage':'user-add',
                'form_Fields':this.originalFormFields,
                'moduleFormId':this.moduleFormId,
                "moduleId":this.submodule.sub_module_id,
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
    
    getReportingManager(){
        this.api.post({}, 'user/read-dropdown').subscribe(result => {
            if(result['statusCode'] == 200){
                this.reportingManagerList = result['data'];
                for (let i = 0; i < this.formFields.length; i++) {
                    if(this.formFields[i]['name'] === 'reporting_manager_id' || this.formFields[i]['name'] === 'reporting_manager_2' || this.formFields[i]['name'] === 'hod'){
                        this.formFields[i]['options'] = result['data'];
                    }
                }
            }
        });
    }
    
    getUserRole(){
        this.api.post({}, 'rbac/read-dropdown').subscribe(result => {
            if(result['statusCode'] == 200){
                for (let i = 0; i < this.formFields.length; i++) {
                    if(this.formFields[i]['name'] === 'user_role_id'){
                        this.formFields[i]['options'] = result['data'];
                    }
                }
            }
        });
    }
    
    getState(){
        this.api.post({}, 'postal-code/states').subscribe(result => {
            if(result['statusCode'] == 200){
                this.statList = result['data'];
                for (let i = 0; i < this.formFields.length; i++) {
                    if(this.formFields[i]['name'] === 'state' || this.formFields[i]['name'] === 'holiday_profile' || this.formFields[i]['name'] === 'assigned_area'){
                        this.formFields[i]['options'] = result['data'];
                    }
                }
            }
        });
    }
    
    getDistrict(state:string){
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
                }
            }
        });
    }
    
}