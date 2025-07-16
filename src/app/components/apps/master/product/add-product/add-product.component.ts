import { ChangeDetectorRef, Component, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { SpkNgSelectComponent } from '../../../../../../@spk/spk-ng-select/spk-ng-select.component';
import {AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { FlatpickrDefaults, FlatpickrModule } from 'angularx-flatpickr';
import flatpickr from 'flatpickr';
import { SharedModule } from '../../../../../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FilePondModule } from 'ngx-filepond';
import { CommonModule } from '@angular/common';
import {NgxEditorModule,} from 'ngx-editor';
import Choices, {Options } from 'choices.js';
import { FORMIDCONFIG } from '../../../../../../config/formId.config';
import { RemoveSpaceService } from '../../../../../core/services/remove-space/removeSpace.service';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { ApiService } from '../../../../../core/services/api/api.service';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { UtilService } from '../../../../../utility/util.service';
import { ModalsComponent } from '../../../../../shared/components/modals/modals.component';
import { MatDialog } from '@angular/material/dialog';
import { FormFieldTypes } from '../../../../../utility/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { FormValidationService } from '../../../../../utility/form-validation';
import { FormFieldComponent } from '../../../../../shared/components/form-field/form-field.component';
import { LogService } from '../../../../../core/services/log/log.service';
import { ModuleService } from '../../../../../shared/services/module.service';
import { UploadFileService} from '../../../../../shared/services/upload.service';
@Component({
    selector: 'app-add-product',
    standalone: true,
    imports: [SharedModule, FlatpickrModule, NgSelectModule, FilePondModule,
        FormsModule,NgxEditorModule,ReactiveFormsModule, MaterialModuleModule,CommonModule],
        templateUrl: './add-product.component.html',
        providers:[  FlatpickrDefaults],
    })
    export class AddProductComponent {
        
        productId:any;
        pageType:any = 'add'
        formGroup: FormGroup = new FormGroup({});
        @Input() formFields: any[] = [];
        myForm!: FormGroup;
        primaryForm!: FormGroup;
        FORMID:any= FORMIDCONFIG;
        moduleFormId:number =0;
        submodule:any
        skLoading:boolean = false
        readonly fieldTypes = FormFieldTypes;
        formIniatialized: boolean = false;
        public tagsElement!:Choices;
        public type: string = 'component';
        Math = Math;
        pondFiles: any[] = [];
        originalFormFields: any[] = []; // Store API response separately
        
        constructor(public spaceRemove: RemoveSpaceService, private cdr: ChangeDetectorRef, private fb: FormBuilder, public util: UtilService, private toastr: ToastrServices, public api: ApiService, public dialog: MatDialog, public route: ActivatedRoute, private router: Router, public uploadService: UploadFileService,  private logService: LogService, private moduleService: ModuleService,
            private formValidation: FormValidationService
        ){
        }
        ngOnInit() {
            const subModule = this.moduleService.getSubModuleByName('Masters', 'Products');
            const form = this.moduleService.getFormById('Masters', 'Products', this.FORMID.ID['Products']);
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
                    this.productId = params.get('id');
                    const editParam = params.get('edit');
                    this.pageType = editParam ? editParam : 'add';
                }
            });
        }
        
        
        initializeForm(){
            this.myForm = this.fb.group({});
            this.formFields.forEach(field => {
                
                if(field.api_path){
                    this.getOptions(field.name, field.api_path)
                }
                
                field.control = this.fb.control('', this.formValidation.getValidators(field)); // Initialize using FormBuilder
                this.myForm.addControl(field.name, field.control);
            });
            this.formIniatialized = true;
            if(this.productId){
                this.getProductDetail();
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
        
        //     onFieldChange(value: any, field: any) {
        //         if(field.type == this.fieldTypes.SINGLE_SELECT || field.type == this.fieldTypes.MULTI_SELECT || field.type == this.fieldTypes.RADIO_SELECT || field.type == this.fieldTypes.CHECKBOX_SELECT || field.type == this.fieldTypes.DATE || field.type == this.fieldTypes.TIME || field.type == this.fieldTypes.UPLOAD){
        //             if(field.type == this.fieldTypes.SINGLE_SELECT ){
        //                 field.control.setValue(value);
        //                 field.value = value.label;
        //                 if(field.key_name_required === true){
        //                     const fieldIndex = field.options.findIndex((row:any) => row.value === value);
        //                     let labelName:any
        //                     if(fieldIndex !==  -1){
        //                         labelName = field.options[fieldIndex]['label'];
        //                         this.formFields.forEach(row => {
        //                             if (row['name'] === field.key_name) {
        //                                 this.myForm.controls[row['name']].setValue(labelName);
        //                             }
        //                         });
        //                     }
        //                 }
        //             }
        //             else{
        //                 field.control.setValue(value);
        //             }
        //         }
        //         if (field.type === this.fieldTypes.DATE_RANGE) {
        //             const formattedValue = { from: value.from, to: value.to };
        //             this.myForm.controls[field.name].setValue(formattedValue);
        //         }
        //         if (field.name === "product_code" && value.length >= 3) {
        //             this.checkDuplicate(field.api_path, value)
        //         }
        //         if (field.type === this.fieldTypes.UPLOAD) {
        //             this.pondFiles = value
        //         }
        //         if(field.is_child_dependency === true){
        //             const fieldId = field.options.findIndex((row:any) => row.value === value);
        //             if(fieldId !== -1){
        //                 if((field.type === this.fieldTypes.SINGLE_SELECT) && field.key_source === 'default'){
        //                     field.value = field.options[fieldId]['value']
        //                     this.getDependencyUpdate(field)
        //                 }
        //                 else{
        //                     field.value = field.options[fieldId]['label']
        //                     this.getDependencyUpdate(field) 
        //                 }
        //             }
        //         }
        
        //         if (field.is_child_dependency) {
        //             const startIndex = this.formFields.findIndex(formIndexRow => formIndexRow.name == field.name);
        //             this.onResetDependentFields(startIndex);
        //             for (let formIndex = startIndex; formIndex <= this.formFields.length-1; formIndex++) {
        //                 const selectedFieldObject = this.formFields[formIndex].options?.find((row: any) => this.spaceRemove.formatString(row.value) === this.spaceRemove.formatString(this.formFields[formIndex].value));
        //                 const selectedFieldLabel = selectedFieldObject?.label || '';
        //                 for (let childIndex = 0; childIndex <= this.formFields[formIndex].child_dependency.length-1; childIndex++) {
        //                     let isVisible = false;
        //                     const childDependency = this.formFields[formIndex].child_dependency[childIndex]
        //                     if(childDependency.visibilty === 'Direct' && (childDependency.parent_field_value === selectedFieldLabel || (childDependency.child_field_option.length ===0 && this.formFields[formIndex]['is_child_show']))) {
        //                         isVisible = true;
        //                     }
        //                     if(this.formFields[formIndex].child_dependency[childIndex].visibilty === 'Option') {
        //                         const parentChildIndex = this.formFields.findIndex((fieldRow: any) => fieldRow.name == this.formFields[formIndex].child_dependency[childIndex].child_field_name);
        //                         if(parentChildIndex!== -1 && this.formFields[parentChildIndex].type === this.fieldTypes.SHORT_TEXT && this.formFields[formIndex].value) {
        //                             isVisible = true;
        //                             this.formFields[parentChildIndex].is_child_show = isVisible;
        //                         }
        //                         const childOptionIndex = this.formFields[formIndex].child_dependency[childIndex].child_field_option.findIndex((childRow:any) => 
        //                             {
        
        //                             return childRow.parent_field_value == selectedFieldLabel && childRow.parent_field_name == this.formFields[formIndex].name
        //                         }
        //                     );
        //                     if(childOptionIndex !== -1) {
        
        //                         isVisible = true;
        //                         const formTargetFieldIndex = this.formFields.findIndex((fieldRow: any) => fieldRow.name == this.formFields[formIndex].child_dependency[childIndex].child_field_name);
        //                         this.formFields[formTargetFieldIndex].options = this.formFields[formIndex].child_dependency[childIndex]['child_field_option'].filter((childFieldOptionRow:any) => childFieldOptionRow.parent_field_name == this.formFields[formIndex].name && childFieldOptionRow.parent_field_value == selectedFieldLabel);
        //                     }
        //                 }
        //                 const formFieldIndex = this.formFields.findIndex((fieldRow: any) => fieldRow.name == this.formFields[formIndex].child_dependency[childIndex].child_field_name);
        
        //                 if(formFieldIndex !== -1) {
        
        //                     this.formFields[formFieldIndex].is_child_show = isVisible;
        //                 }
        //             }          
        //         }
        //     }
        // }
        
        onFieldChange(value: any, field: any) {
            if(field.type == this.fieldTypes.SINGLE_SELECT || field.type == this.fieldTypes.MULTI_SELECT || field.type == this.fieldTypes.RADIO_SELECT || field.type == this.fieldTypes.CHECKBOX_SELECT || field.type == this.fieldTypes.DATE || field.type == this.fieldTypes.TIME || field.type == this.fieldTypes.UPLOAD){
                if(field.type == this.fieldTypes.SINGLE_SELECT ){
                    field.control.setValue(value);
                    field.value = value.label;
                    if(field.key_name_required === true){
                        const fieldIndex = field.options.findIndex((row:any) => row.value === value);
                        let labelName:any
                        if(fieldIndex !==  -1){
                            labelName = field.options[fieldIndex]['label'];
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
            if (field.type === this.fieldTypes.UPLOAD) {
                this.pondFiles = value
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
                            if (parentChildIndex !== -1 && this.formFields[parentChildIndex].type === (this.fieldTypes.SINGLE_SELECT || this.fieldTypes.MULTI_SELECT)) {
                                const data:any = this.getOptions(this.formFields[parentChildIndex]['name'], this.formFields[parentChildIndex]['api_path'],field.value)
                                // if(data.length)
                                
                                // isVisible = true;
                                // this.formFields[parentChildIndex].is_child_show = isVisible;
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
                module_id: this.submodule.sub_module_id || this.submodule.module_id, page: 1, 'dropdown_name': field
                .name, 'filters': { 'search': trimmedSearch }
            }, field.api_path).subscribe({
                next: (result) => {
                    if (result['statusCode'] === 200) {
                        field.options = result['data'];
                    }
                },
            });
        }
        
        
        
        originalData:any={}
        getProductDetail() {
            this.api.post({_id: this.productId}, 'product/detail').subscribe(result => {
                if (result['statusCode']  ===  200) {
                    let productDetail
                    productDetail = result['data'];
                    this.originalData = { ...productDetail, ...productDetail.form_data };
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
        
        
        
        async getOptions(name: string, api_path: string, value?: any): Promise<void> {
            try {
        
              const result: any = await this.api.post(
                {
                  dropdown_name: name,
                  module_id: this.submodule.sub_module_id || this.submodule.module_id,
                  dropdown_option: value
                },
                api_path
              ).toPromise();
        
              if (result?.statusCode === 200) {
                this.formFields.forEach(field => {
                  if (field.name === name) {
                    field.options = result.data;
                    if (value && result.data.length > 0) {
                      field.is_child_show = true;
                    }
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
                // if (child_field_name) {
                //     this.api.post({ child_field_name, parent_field_value }, 'form-builder/read-dependency')
                //     .subscribe(result => {
                //         if (result?.statusCode === 200 && result?.data) {
                //             const fieldToUpdate = this.formFields.find((f: any) => f.name === child_field_name);
                //             if (fieldToUpdate) {
                //                 fieldToUpdate.options = result.data;
                //             }
                //         }
                //     });
                // }
            }
        }
        
        
        
        
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
                        if (field.type === this.fieldTypes.UPLOAD) {
                            delete result.primaryFields.form_data[field.name];
                        }
                    }
                });
                
                result.primaryFields.form_data['files'] = this.myForm.value['files'];
                const isEditMode = this.pageType === 'edit';
                if (isEditMode) {
                    result.primaryFields['_id'] = this.productId;
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
                        if (this.pondFiles.length=== 0){
                            this.api.disabled = false;
                            this.toastr.warning('No changes detected', '', 'toast-top-right')
                            return;
                        }
                    }
                    
                }
                
                const httpMethod = isEditMode ? 'patch' : 'post';
                const functionName = isEditMode ? 'product/update' : 'product/create';
                this.api[httpMethod](result.primaryFields, functionName).subscribe(result => {
                    if (result['statusCode'] === 200) {
                        if (this.pondFiles.length> 0){
                            this.uploadService.uploadFile(result['data']['inserted_id'], 'product', this.pondFiles, 'Product Images', this.submodule, '/apps/master/products-list', () => { }, undefined , this.originalData.files)
                        }
                        else{
                            this.api.disabled = false;
                            this.router.navigate(['/apps/master/products-list']);
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
        
        openModal(event:any) {
            const dialogRef = this.dialog.open(ModalsComponent, {
                // width: '1024px',
                data: {
                    'lastPage':'product',
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
        
        checkDuplicate(api:string, productCode:string){
            this.api.post({'product_code':productCode}, api).subscribe(result => {
                if(result === false){
                    this.api.isDuplicate = true
                }
                else{
                    this.api.isDuplicate = false
                }
            });
        }
    }