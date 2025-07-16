import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { FilePondModule } from 'ngx-filepond';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../../../../shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { ModalsComponent } from '../../../../../shared/components/modals/modals.component';
import { FormValidationService } from '../../../../../utility/form-validation';
import { ModuleService } from '../../../../../shared/services/module.service';
import { LogService } from '../../../../../core/services/log/log.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../../core/services/api/api.service';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { UtilService } from '../../../../../utility/util.service';
import { RemoveSpaceService } from '../../../../../core/services/remove-space/removeSpace.service';
import { FORMIDCONFIG } from '../../../../../../config/formId.config';
import { FormFieldTypes } from '../../../../../utility/constants';
import { data } from '../../../../../shared/data/table_data/easy_table';

@Component({
  selector: 'app-qr-add',
  imports: [
    SharedModule,
    NgSelectModule, 
    FormsModule,
    NgxEditorModule,
    ReactiveFormsModule,
    MaterialModuleModule,
    CommonModule
  ],
  templateUrl: './qr-add.component.html',
})
export class QrAddComponent {
  filter: any = {};
  pageType:any = 'add';
  productId:any;
  @Input() formFields: any[] = [];
  myForm!: FormGroup;
  primaryForm!: FormGroup;
  FORMID:any= FORMIDCONFIG;
  moduleFormId:number =0;
  moduleId:number=0
  submoduleId:number=0
  moduleName:string = '';
  originalFormFields: any[] = []; // Store API response separately
  skLoading:boolean = false;
  formIniatialized: boolean = false;
  readonly fieldTypes = FormFieldTypes;
  originalData:any={}
  tableIdId:number =0;
  submodule:any
  
  constructor(
    public dialog:MatDialog,
    public spaceRemove:RemoveSpaceService, 
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder, 
    public util:UtilService, 
    private toastr: ToastrServices, 
    public api: ApiService, 
    public route: ActivatedRoute,
    private router: Router, 
    private logService: LogService,
    private moduleService: ModuleService,
    private formValidation: FormValidationService
  ){
    
  }
  
  ngOnInit(){
    const subModule = this.moduleService.getSubModuleByName('IRP', 'Qr Code');
    const form = this.moduleService.getFormById('IRP', 'Qr Code', this.FORMID.ID['QRCodeformId']);
    if (subModule) {
      this.submodule = subModule;
    }
    if (form) {
      this.submodule.form_id = form.form_id;
      this.moduleFormId = form.form_id;
      this.getFormData();
    }
  }
  
  onRefresh()
  {
    this.filter = {};
    // this.getProductList();
    this.getListingModuleData();
  }
  
  //---------Product Listing----------//
  listPageData:any = {};
  productPageTableData:any = {};
  allProductPageHeaders:any = [];
  productPageHeaders:any = [];
  productPageDropdowns:any = {}
  
  getListingModuleData() {
    this.api.post({platform: 'web', table_id : this.tableIdId, form_id : this.moduleFormId}, 'table-builder/read').subscribe(result => {
      if (result['statusCode'] == '200') {
        this.listPageData = result.data;
        this.productPageTableData = this.listPageData['table_data'];
        this.allProductPageHeaders = this.productPageTableData['tableHead'];
        this.productPageHeaders = this.productPageTableData['tableHead'];
        
        // --------- For send dropdown getProductList//
        this.productPageDropdowns = this.productPageHeaders.filter((header: any) => (header.type === 'SINGLE_SELECT' || header.type === 'MULTI_SELECT'));
        this.productPageDropdowns = this.productPageDropdowns.map((row:any) => row.name)
        // ---------//                
        
        // --------- For columns filter in listing//
        this.productPageHeaders = this.productPageHeaders.filter((header: any) => header.list_view_checked);
        // this.getProductList();
        // ---------//
        
      }
      else {
        
      }
    });
  }
  
  // initializeForm(){
  //   const qrTypeField = this.formFields.find(field => field.name === 'qrcode_type');
  //   const qrTypeValue = qrTypeField ? qrTypeField.value : null;
  //   this.getQrType()
  
  //   this.myForm = this.fb.group({});
  //   this.formFields.forEach(field => {
  //     field.control = this.fb.control('', this.formValidation.getValidators(field));
  //     this.myForm.addControl(field.name, field.control);
  //   });
  //   this.formIniatialized = true;
  //   if(this.productId){
  //     // this.getProductDetail();
  //   }
  // }
  initializeForm(){
    this.myForm = this.fb.group({});
    this.formFields.forEach(field => {
      
      if(field.api_path && !field.is_parent_dependency){
        this.getOptions(field.name, field.api_path)
      }
      
      
      field.control = this.fb.control('', this.formValidation.getValidators(field)); // Initialize using FormBuilder
      this.myForm.addControl(field.name, field.control);
    });
    this.formIniatialized = true;
    
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
  
  openModal(event:any) {
    const dialogRef = this.dialog.open(ModalsComponent, {
      // width: '1024px',
      data: {
        'lastPage':'product',
        'form_Fields':this.originalFormFields,
        'moduleFormId':this.moduleFormId,
        "moduleId":this.submodule.sub_module_id ? this.submodule.sub_module_id :this.submodule.module_id,
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
    let second_value:any=null;
    if (field.type == this.fieldTypes.SINGLE_SELECT || field.type == this.fieldTypes.MULTI_SELECT || field.type == this.fieldTypes.RADIO_SELECT || field.type == this.fieldTypes.CHECKBOX_SELECT || field.type == this.fieldTypes.DATE || field.type == this.fieldTypes.TIME || field.type == this.fieldTypes.UPLOAD) {
      if (field.type == this.fieldTypes.SINGLE_SELECT) {
        field.control.setValue(value);
        field.value = value.label;
        const fieldIndex = field.options.findIndex((row: any) => row.value === value);
        let labelName: any
        if (fieldIndex !== -1) {
          labelName = field.options[fieldIndex]['label'];
          second_value = field.options[fieldIndex]['second_value']
          this.formFields.forEach(row => {
            if (row['name'] === field.key_name) {
              this.myForm.controls[row['name']].setValue(labelName);
            }
          });
        }
      }
      else {
        field.control.setValue(value);
      }
    }
    if (field.type === this.fieldTypes.DATE_RANGE) {
      const formattedValue = { from: value.from, to: value.to };
      this.myForm.controls[field.name].setValue(formattedValue);
    }
    if (field.is_child_dependency === true) {
      const fieldId = field.options.findIndex((row: any) => row.value === value);
      if (fieldId !== -1) {
        if ((field.type === this.fieldTypes.SINGLE_SELECT) && field.key_source === 'default') {
          field.value = field.options[fieldId]['value']
          this.getDependencyUpdate(field)
        }
        else {
          field.value = field.options[fieldId]['label']
          this.getDependencyUpdate(field)
        }
      }
    }
    const fieldIndex = this.formFields.findIndex(row => row.name == field.name);
    const unMatchChildData = this.formFields[fieldIndex].child_dependency?.filter((unMatch: any) => unMatch.parent_field_value != field.value);

    let lastChildFieldIndex = 0;

    if (field.is_child_dependency) {
      console.log(field.is_child_dependency, 'is_child_dependency');
      
      const startIndex = this.formFields.findIndex(formIndexRow => formIndexRow.name == field.name);
      // this.onResetDependentFields(startIndex);
      for (let formIndex = startIndex; formIndex <= this.formFields.length - 1; formIndex++) {
        const selectedFieldObject = this.formFields[formIndex].options?.find((row: any) => this.spaceRemove.formatString(row.value) === this.spaceRemove.formatString(this.formFields[formIndex].value));
        const selectedFieldLabel = selectedFieldObject?.label || '';
        
        for (let childIndex = 0; childIndex <= this.formFields[formIndex].child_dependency.length - 1; childIndex++) {
          let isVisible = false;
          
          const childDependency = this.formFields[formIndex].child_dependency[childIndex]
          if (childDependency.visibilty === 'Direct' && (childDependency.parent_field_value === selectedFieldLabel || (childDependency.child_field_option.length === 0 && this.formFields[formIndex]['is_child_show']))) {
            isVisible = true;
          }

          if (this.formFields[formIndex].child_dependency[childIndex].visibilty === 'Option') {
            console.log(childIndex, 'childIndex');
            console.log(this.formFields[formIndex].child_dependency[childIndex].child_field_name, 'child_name');
            
            const parentChildIndex = this.formFields.findIndex((fieldRow: any) => fieldRow.name == this.formFields[formIndex].child_dependency[childIndex].child_field_name);
            console.log(parentChildIndex, 'parentChildIndex');
            
            if (parentChildIndex !== -1 && this.formFields[parentChildIndex].type === this.fieldTypes.SHORT_TEXT && this.formFields[formIndex].value) {
              isVisible = true;
              this.formFields[parentChildIndex].is_child_show = isVisible;
            }
            
            if (parentChildIndex !== -1 && this.formFields[parentChildIndex].type === (this.fieldTypes.SINGLE_SELECT || this.fieldTypes.MULTI_SELECT)) {
              if (field.key_source === 'default'){
                const fieldIndex = field.options.findIndex((row: any) => row.value === value);
                
                if (fieldIndex !== -1) {
                  const isMatch = (second_value || field.value) === this.formFields[formIndex].child_dependency[childIndex].child_field_name
                  // this.formFields[formIndex].child_dependency[childIndex].child_field_name === this.formFields[parentChildIndex]['name'];
                  if (isMatch) {
                    this.formFields[parentChildIndex]['is_child_show'] = isMatch;
                    this.getOptions(this.formFields[parentChildIndex]['name'], this.formFields[parentChildIndex]['api_path'], field.value)
                  }
                  else{
                    // this.formFields[parentChildIndex]['is_child_show']=  false;
                    // this.getOptions(this.formFields[parentChildIndex]['name'], this.formFields[parentChildIndex]['api_path'], field.value)
                    
                    unMatchChildData.map((row: any) => {
                      let ChildFieldIndex = this.formFields.findIndex((index: any) => index.name == row.child_field_name);
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
              else{
                 this.getOptions(this.formFields[parentChildIndex]['name'], this.formFields[parentChildIndex]['api_path'], field.value)
              }
            }

          }
          // const formFieldIndex = this.formFields.findIndex((fieldRow: any) => fieldRow.name == this.formFields[formIndex].child_dependency[childIndex].child_field_name);
          
          // if (formFieldIndex !== -1) {
          //   this.formFields[formFieldIndex].is_child_show = isVisible;
          // }

        }
      }
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
    }
  }


  getQrType() {
    // Find the selected qrcode_type value from the form fields
    const qrTypeField = this.formFields.find(field => field.name === 'qrcode_type');
    const selectedQrType = qrTypeField ? qrTypeField.value : null;
    
    // Ensure qrTypeField has a valid selection
    if (!selectedQrType) {
      return;
    }
    
    // Prepare the request payload
    const payload = {
      qrcode_type: selectedQrType // Send selected qrcode_type value
    };
    
    // Call API with the payload
    this.api.post(payload, 'qr-code/read-item').subscribe(result => {
      if (result['statusCode'] === 200) {
        for (let i = 0; i < this.formFields.length; i++) {
          if (this.formFields[i]['name'] === 'user_name') {
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
      // if (child_field_name) {
      //   // label
      //   this.api.post({ child_field_name, parent_field_value }, 'form-builder/read-dependency')
      //   .subscribe(result => {
      //     if (result?.statusCode === 200 && result?.data) {
      //       const fieldToUpdate = this.formFields.find((f: any) => f.name === child_field_name);
      //       if (fieldToUpdate) {
      //         fieldToUpdate.options = result.data;
      //       }
      //     }
      //   });
      // }
    }
  }
  
  onSubmit() {
    this.formFields.forEach(field => {
      if (field.is_child_show === false || field.is_show === false) {
        this.myForm.get(field.name)?.clearValidators(); 
        this.myForm.get(field.name)?.updateValueAndValidity(); 
      }
    });

    if (this.myForm.valid) {
      this.formValidation.removeEmptyControls(this.myForm)
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
      this.api.post(result.primaryFields, 'qr-code/create').subscribe(result => {
        if (result['statusCode'] === 200) {
          this.api.disabled = false;
          this.router.navigate(['/apps/loyalty/qr-list/qr-details/' + result['data']['history_id'] ]);
          this.toastr.success(result['message'], '', 'toast-top-right');
        }
      });
    } else {
      this.toastr.error('Form Is Invalid', '', 'toast-top-right')
      this.formValidation.markFormGroupTouched(this.myForm); // Call the global function
    }
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
