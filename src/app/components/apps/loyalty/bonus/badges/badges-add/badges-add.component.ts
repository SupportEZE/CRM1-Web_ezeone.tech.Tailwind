import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SortablejsModule } from '@maksim_m/ngx-sortablejs';
import { FilePondModule } from 'ngx-filepond';
import { MaterialModuleModule } from '../../../../../../material-module/material-module.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { DateService } from '../../../../../../shared/services/date.service';
import { FormValidationService } from '../../../../../../utility/form-validation';
import { ApiService } from '../../../../../../core/services/api/api.service';
import { ToastrServices } from '../../../../../../shared/services/toastr.service ';
import { ModuleService } from '../../../../../../shared/services/module.service';
import { FORMIDCONFIG } from '../../../../../../../config/formId.config';
import {LOGIN_TYPES } from '../../../../../../utility/constants';
import { CommonApiService } from '../../../../../../shared/services/common-api.service';
import { SpkNgSelectComponent } from '../../../../../../../@spk/spk-ng-select/spk-ng-select.component';
import { SpkInputComponent } from '../../../../../../../@spk/spk-input/spk-input.component';
import { UploadFileService } from '../../../../../../shared/services/upload.service';
import { SpkFlatpickrComponent } from '../../../../../../../@spk/spk-flatpickr/spk-flatpickr.component';


@Component({
  selector: 'app-badges-add',
  imports: [
    SharedModule,
    MaterialModuleModule,
    CommonModule,
    FormsModule,
    SortablejsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FilePondModule,
    SpkInputComponent,
    SpkNgSelectComponent,
    SpkFlatpickrComponent
  ],
  templateUrl: './badges-add.component.html',
})
export class BadgesAddComponent {
  skLoading:boolean = false
  badgeForm: FormGroup = new FormGroup({});
  today= new Date();
  formIniatialized: boolean = false;
  @Input() formFields: any[] = [];
  documentData: any = {};
  slabTypes: any =[];
  badgeTypes: any =[];
  incentiveTypes: any = [];
  uploadresults: any = [];
  incentiveDropdown:any = [];
  FORMID:any= FORMIDCONFIG;
  submodule:any ={};
  
  constructor(
    private toastr: ToastrServices, 
    public api: ApiService,
    private formValidation: FormValidationService,
    private fb: FormBuilder,
    private dateService: DateService,
    private router: Router,
    private route: ActivatedRoute,
    public moduleService: ModuleService,
    public commonApi: CommonApiService,
    public uploadService: UploadFileService
  ){
  }
  
  
  ngOnInit() {
    
    const submodule = this.moduleService.getSubModuleByName('IRP', 'Bonus');
    const subSubModule = this.moduleService.getSubSubModuleByName('IRP', 'Bonus', 'Badges');
    if (subSubModule) {
      this.submodule = subSubModule;
    }
    
    
    this.badgeForm = this.fb.group({
      title: ['', Validators.required],
      start_date: [''], 
      end_date: [''], 
      eligible_points: ['', Validators.required],
      incentive_type: ['', Validators.required],
      incentive_value: ['', Validators.required],
      customer_type_id: [[], Validators.required],
      customer_type_name: [''],

    });
    
    this.commonApi.getLoginType([LOGIN_TYPES.INFLUENCER])
    this.commonApi.getDropDownData(this.submodule.sub_module_id, 'Incentive Type');
    this.commonApi.getCustomerCategorySubType([LOGIN_TYPES.INFLUENCER]);
  }


  findName(event: any) {
    const selectedIds = event;
    if (Array.isArray(selectedIds) && selectedIds.length > 0) {
      const matchedNames = this.commonApi.customerCategorySubType
        .filter((row: any) => selectedIds.includes(row.value))
        .map((row: any) => row.label);
      this.badgeForm.patchValue({ customer_type_name: matchedNames });
    }
  }

  onSearch(search: string) {
    this.commonApi.getCustomerCategorySubType([LOGIN_TYPES.INFLUENCER], search);
  }
  onDateChange() {
    this.badgeForm.get('end_date')?.reset();
  }
  
  pondFiles: File[] = [];
  pondOptions = this.getPondOptions('image');
  getPondOptions(type: 'image'): any {
    const commonOptions = {
      allowMultiple: false,
      allowFileTypeValidation: true,
      labelIdle: "Click or drag files here to upload...",
      maxFiles: 5,
      server: {
        process: (_fieldName: any, file: any, _metadata: any, load: (arg0: string) => void) => {
          setTimeout(() => {
            load(Date.now().toString());
          }, 1000);
        },
        revert: (_uniqueFileId: any, load: () => void) => {
          load();
        }
      }
    };

    if (type === 'image') {
      return {
        ...commonOptions,
        acceptedFileTypes: ['image/jpeg', 'image/png', 'image/jpg'],
        maxFileSize: '2MB',
        allowImageValidateSize: true,
        imageValidateSizeMinWidth: 300,
        imageValidateSizeMinHeight: 300,
        imageValidateSizeMaxWidth: 300,
        imageValidateSizeMaxHeight: 300,
        labelFileTypeNotAllowed: 'Only PNG and JPEG files are allowed',
        fileValidateTypeLabelExpectedTypes: 'Allowed: PNG, JPEG',
        labelImageValidateSizeTooSmall: 'Image is too small. Min: {minWidth}×{minHeight}',
        labelImageValidateSizeTooBig: 'Image is too large. Max: {maxWidth}×{maxHeight}',
      };
    }
  }
  onFileProcessed(event: any) {
    const file = event.file.file;
    this.pondFiles = [...(this.pondFiles || []), file];
  }


  onFileRemove(event: any) {
    const file = event.file.file;
    const index = this.pondFiles.findIndex(f => f.name === file.name && f.size === file.size);
    if (index > -1) {
      this.pondFiles.splice(index, 1);
    }
  }
  
  
  onSubmit() {    
    if (this.badgeForm.valid){
      if (this.pondFiles.length === 0) {
        this.toastr.error('Banner image is required', '', 'toast-top-right');
        return
      }
      else{
        this.api.disabled = true;
        this.api.post(this.badgeForm.value, 'badges/create').subscribe({
          next: (result) => {
            this.api.disabled = false;
            if (result['statusCode'] === 200) {
              if (this.pondFiles.length > 0) {
                this.uploadService.uploadFile(result['data']['inserted_id'], 'badges', this.pondFiles, 'Badged Images', this.submodule, '/apps/loyalty/badges-list')
              }
              else{
                this.api.disabled = false;
                this.toastr.success(result['message'], '', 'toast-top-right');
                this.router.navigate(['/apps/loyalty/badges-list']);
              }
            }
          },
        });
      }
    }
    else{
      this.toastr.error('Form Is Invalid', '', 'toast-top-right')
      this.formValidation.markFormGroupTouched(this.badgeForm);
    }
    
    
  }
}
