import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { NgSelectModule } from '@ng-select/ng-select';
import { FORMIDCONFIG } from '../../../../../../config/formId.config';
import { FormFieldTypes, LOGIN_TYPES } from '../../../../../utility/constants';
import { ApiService } from '../../../../../core/services/api/api.service';
import { FormValidationService } from '../../../../../utility/form-validation';
import { ModuleService } from '../../../../../shared/services/module.service';
import { LogService } from '../../../../../core/services/log/log.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { UtilService } from '../../../../../utility/util.service';
import { RemoveSpaceService } from '../../../../../core/services/remove-space/removeSpace.service';
import { ModalsComponent } from '../../../../../shared/components/modals/modals.component';
import { MatDialog } from '@angular/material/dialog';
import moment from 'moment';
import { DateService } from '../../../../../shared/services/date.service';

@Component({
  selector: 'app-leave-add',
  imports: [
    SharedModule,
    NgSelectModule, 
    FormsModule,
    NgxEditorModule,
    ReactiveFormsModule,
    MaterialModuleModule,
    CommonModule
  ],
  templateUrl: './leave-add.component.html',
})
export class LeaveAddComponent {
  filter: any = {};
  pageType:any = 'add';
  productId:any;
  @Input() formFields: any[] = [];
  myForm!: FormGroup;
  primaryForm!: FormGroup;
  FORMID:any= FORMIDCONFIG;
  moduleFormId:number =0;
  // moduleId:number=0
  // submoduleId:number=0
  // moduleName:string = '';
  subModule:any = {};
  originalFormFields: any[] = []; // Store API response separately
  skLoading:boolean = false;
  formIniatialized: boolean = false;
  readonly fieldTypes = FormFieldTypes;
  originalData:any={}
  tableIdId:number =0;
  UploadFIles:any =[];
  
  onClick(event:any){
  }
  
  constructor(
    public api: ApiService,
    public date : DateService,
    public spaceRemove:RemoveSpaceService, 
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder, 
    public util:UtilService, 
    private toastr: ToastrServices, 
    public route: ActivatedRoute,
    private router: Router, 
    private logService: LogService,
    private moduleService: ModuleService,
    private formValidation: FormValidationService,
    public dialog:MatDialog
  ){
    
  }
  
  ngOnInit(){
    const subModule = this.moduleService.getSubModuleByName('SFA', 'Leave');
    const form = this.moduleService.getFormById('SFA', 'Leave', this.FORMID.ID['LeaveFormData']);
    const tableId = this.moduleService.getTableById('SFA', 'Expense', this.FORMID.ID['LeaveTableData']);
    if (subModule) {
      // this.moduleId = subModule.module_id;
      // this.submoduleId = subModule.sub_module_id;
      // this.moduleName = subModule.title;
      this.subModule = subModule;
    }
    if (form) {
      this.moduleFormId = form.form_id;
      this.getFormData();
    }
    if (tableId) {
      this.tableIdId = tableId.table_id;
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
    this.getLoginType();
    this.myForm = this.fb.group({});
    this.formFields.forEach(field => {
      
      field.control = this.fb.control('', this.formValidation.getValidators(field)); // Initialize using FormBuilder
      this.myForm.addControl(field.name, field.control);
    });
    this.formIniatialized = true;
    if(this.productId){
      // this.getProductDetail();
    }
  }
  
  getOptions(value:any){
    this.api.post({'user_id' : value},'leave/leave-config').subscribe(result => {
      if(result['statusCode'] === 200){
        for (let i = 0; i < this.formFields.length; i++) {
          if(this.formFields[i]['name'] === 'leave_type'){
            this.formFields[i]['options'] = result['data'];
          }
        }
        for (let i = 0; i < this.originalFormFields.length; i++) {
          if(this.originalFormFields[i]['name'] === 'leave_type'){
            this.originalFormFields[i]['options'] = result['data'];
          }
        }
      }
    });
  }
  
  getLoginType(){
    const login_type_ids = [LOGIN_TYPES.FIELD_USER]
    this.api.post({"form_id":this.moduleFormId, "login_type_ids" : login_type_ids}, 'user/read-dropdown').subscribe(result => {
      if(result['statusCode'] == 200){
        for (let i = 0; i < this.formFields.length; i++) {
          if(this.formFields[i]['name'] === 'user_name'){
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
  
  onSubmit() {
    this.formFields.forEach(field => {
      if (field.is_child_show === false || field.is_show === false) {
        this.myForm.get(field.name)?.clearValidators(); // Remove all validators
        this.myForm.get(field.name)?.updateValueAndValidity(); // Refresh validation state
      }
    });
    
    if (this.myForm.valid) {
      this.api.disabled = true;
      
      if (this.UploadFIles.length > 0) {
        this.UploadFIles.forEach((field: any) => {
          const uploadRequests = field.file.map((fileObj: File) => {
            const formData = new FormData();
            formData.append('file', fileObj, fileObj.name);
            formData.append('label', field.label);
            return this.api.uploadFile(formData, 's3/uploadsingle').toPromise();
          });
          
          if (uploadRequests.length) {
            Promise.all(uploadRequests)
            .then((responses) => console.log('All files uploaded successfully:', responses))
            .catch((error) => console.error('Error uploading files:', error));
          }
          
          // Execute all uploads and check status after completion
          Promise.all(uploadRequests).then((res) => {
            let array: any = [];
            for (let index = 0; index < res.length; index++) {
              array.push({ 'file': res[index]['fullPath'], 'label': res[index]['label'], 'id': index + 1 });
            }
            this.handleSuccess(array);
          }).catch(error => {});
        });
      } else {
        this.handleSuccess([]);
      }
    } else {
      this.formValidation.markFormGroupTouched(this.myForm); // Call the global function
    }
  }
  
  handleSuccess(data: []) {
    this.myForm.addControl('files', this.fb.control(data));
    
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
    result.primaryFields = this.date.formatDatesInObject(result.primaryFields);
    result.primaryFields.form_data['files'] = this.myForm.value['files'];
    
    // Posting the form data for 'leave-create'
    this.api.post(result.primaryFields, 'leave/leave-create').subscribe(
      (response) => {
        if (response['statusCode'] === 200) {
          this.api.disabled = false;
          this.router.navigate(['/apps/sfa/leave-list']);
          this.toastr.success(response['message'], '', 'toast-top-right');
        }
      },
      (error) => {
        this.api.disabled = false;
        this.toastr.error('Error creating leave request', '', 'toast-top-right');
        console.error('Error:', error);
      }
    );
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
          if(fieldIndex !==-1){
            labelName =  field.options[fieldIndex]['label'];
            this.formFields.forEach(field => {
              if (field.name === field.key_name) {
                this.myForm.controls[field.name].setValue(labelName);
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
    
    if (field.name === "product_code" && value.length >= 3) {
      this.checkDuplicate(field.api_path, value)
    }
    if (field.name === "user_name") {
      this.getOptions(value)
      // For Sending Id and Name fields in the API,
      const fieldId = field.options.findIndex((row:any) => row.value === value);
      if(fieldId !== -1){
        let username  = field.options[fieldId]['label'];
        let user_id  = field.options[fieldId]['value'];
        this.myForm.controls['user_name'].setValue(username);
        this.myForm.controls['user_id'].setValue(user_id);
      // For Sending Id and Name fields in the API,
      }
    }
    if (field.type === this.fieldTypes.UPLOAD) {
      for (let i = 0; i < this.UploadFIles.length; i++) {
        if(this.UploadFIles[i]['label'] === field.label){
          this.UploadFIles.splice(i, 1)
        }
      }
      this.UploadFIles.push({'label':field.label, 'file':value});
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

openModal(event:any) {
  const dialogRef = this.dialog.open(ModalsComponent, {
    // width: '1024px',
    data: {
      'lastPage':'product',
      'form_Fields':this.originalFormFields,
      'moduleFormId':this.moduleFormId,
      "moduleId":this.subModule.sub_module_id,
      "moduleName":this.subModule.title,
      "module_type":this.subModule.module_type
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
