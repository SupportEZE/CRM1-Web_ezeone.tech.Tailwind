import { Component, Input, NgZone } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SortablejsModule } from '@maksim_m/ngx-sortablejs';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormValidationService } from '../../../../../utility/form-validation';
import { ApiService } from '../../../../../core/services/api/api.service';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { FilePondModule } from 'ngx-filepond';
import { DateService } from '../../../../../shared/services/date.service';
import { LOGIN_TYPES } from '../../../../../utility/constants';
import { CommonApiService } from '../../../../../shared/services/common-api.service';
import { UploadFileService } from '../../../../../shared/services/upload.service';
import { ModuleService } from '../../../../../shared/services/module.service';
import { SpkInputComponent } from '../../../../../../@spk/spk-input/spk-input.component';
import { SpkNgSelectComponent } from '../../../../../../@spk/spk-ng-select/spk-ng-select.component';
import { AuthService } from '../../../../../shared/services/auth.service';

@Component({
  selector: 'app-gift-add',
  imports: [
    SharedModule,
    MaterialModuleModule,
    CommonModule,FormsModule,
    SortablejsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,
    FilePondModule,
    SpkInputComponent,
    SpkNgSelectComponent
  ],
  templateUrl: './gift-add.component.html',
})
export class GiftAddComponent {
  skLoading:boolean = false
  giftForm: FormGroup = new FormGroup({});
  myForm!: FormGroup;
  today= new Date();
  // giftForm!: FormGroup;
  formIniatialized: boolean = false;
  @Input() formFields: any[] = [];
  documentData: any = {};
  editor!: Editor;
  giftMasterList:any=[];
  giftId: string = '';
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    // ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  submodule:any ={};
  orgData:any ={}
  
  constructor(
    private toastr: ToastrServices, 
    private ngZone: NgZone,
    public api: ApiService,
    private formValidation: FormValidationService,
    private fb: FormBuilder,
    private dateService: DateService,
    private router: Router,
    private route: ActivatedRoute,
    public commonApi: CommonApiService,
    public uploadService: UploadFileService,
    private moduleService: ModuleService,
    private authService:AuthService
  ){
    this.orgData = this.authService.getOrg();
  }
  
  ngOnInit() {   
    const subModule = this.moduleService.getSubModuleByName('IRP', 'Gift Gallery');
    if (subModule) {
      this.submodule = subModule;
    }
    
    this.editor = new Editor();
    
    this.giftForm = this.fb.group({
      gift_type: ['Gift', Validators.required],
      customer_type_id: ['', Validators.required],
      customer_type_name: [''],
      login_type_id: ['', Validators.required],
      login_type_name: [''],
      title: ['', Validators.required],
      point_value: ['', Validators.required],
      range_start: [''],
      range_end: [''],
      voucher_type_id: [''],
      description: ['', Validators.required],
    });
    
    
    
    const payload = new Set(); 
    if (this.orgData.irp && this.orgData.dms) {
      payload.add(LOGIN_TYPES.SECONDARY);
      payload.add(LOGIN_TYPES.INFLUENCER);
    }
    if (this.orgData.dms) {
      payload.add(LOGIN_TYPES.SECONDARY);
    }
    if (this.orgData.irp) {
      payload.add(LOGIN_TYPES.INFLUENCER);
    }
    const payload_key = Array.from(payload);
    this.commonApi.getLoginType(payload_key)
    this.giftForm.get('gift_type')?.valueChanges.subscribe((giftType) => {
      if (giftType === 'Gift') {
        this.giftForm.get('range_start')?.clearValidators();
        this.giftForm.get('range_end')?.clearValidators();
      } 
      else if (giftType === 'Cash') {
        this.giftForm.get('range_start')?.setValidators([Validators.required]);
        this.giftForm.get('range_end')?.setValidators([Validators.required]);
      }
    });
  }
  
  
  
  
  
  onGiftTypeChange(event: any) {
    if (event.value === 'Voucher') {
      this.getTitle()
    }
    else{
      this.voucher=[];
    }
  }
  
  voucher:any =[]
  getTitle() {
    this.api.post({}, 'gift-gallery/voucher-types').subscribe((result: any) => {
      if (result['statusCode'] === 200) {
        this.voucher = result['data']
      }
    })
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
        imageValidateSizeMinWidth: 1400,
        imageValidateSizeMinHeight: 700,
        imageValidateSizeMaxWidth: 1400,
        imageValidateSizeMaxHeight: 700,
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
  findName(value: any, type:string) {
    if (type === 'login_type'){
      const index = this.commonApi.loginType.findIndex((row: any) => row.value === value);
      if (index != -1) {
        this.giftForm.setControl('login_type_name', new FormControl(this.commonApi.loginType[index]['label'])
      );
    }
  }
  
  if (type === 'voucher') {
    const index = this.voucher.findIndex((row: any) => row.value === value);
    if (index != -1) {
      this.giftForm.setControl('title', new FormControl(this.voucher[index]['label']));
      this.giftForm.setControl('voucher_type_id', new FormControl(this.voucher[index]['value']));
    }
  }
  
  if (type === 'customer_type') {
    const selectedIds = value;
    if (Array.isArray(selectedIds) && selectedIds.length > 0) {
      const matchedNames = this.commonApi.customerCategorySubType
      .filter((row: any) => selectedIds.includes(row.value))
      .map((row: any) => row.label);
      this.giftForm.patchValue({ customer_type_name: matchedNames });
    }
  }
}

onSubmit() {
  if (this.giftForm.valid){
    if (this.giftForm.value.gift_type !== 'Cash' && this.pondFiles.length === 0) {
      this.toastr.error('Please upload image.', '', 'toast-top-right');
      return;
    }
    else{
      const giftType = this.giftForm.get('gift_type')?.value;
      if (giftType === 'Cash') {
        if (this.giftForm.value.range_end < this.giftForm.value.range_start) {
          this.toastr.error('Range end cannot be less than range start.', '', 'toast-top-right');
          return
        }
      }
      this.api.disabled = true;
      this.formValidation.removeEmptyControls(this.giftForm)
      this.api.post(this.giftForm.value, 'gift-gallery/create').subscribe({
        next: (result) => {
          this.api.disabled = false;
          if (result['statusCode'] == 200) {
            if (this.pondFiles.length > 0) {
              this.uploadService.uploadFile(result['data']['inserted_id'], 'gift-gallery', this.pondFiles, 'Gift Images', this.submodule, 'apps/loyalty/gift-list')
            }
            else {
              this.api.disabled = false;
              this.toastr.success(result['message'], '', 'toast-top-right');
              this.router.navigate(['/apps/loyalty/gift-list']);
            }
          } 
        },
      });
    }
  }
  else{
    this.formValidation.markFormGroupTouched(this.giftForm);
  }
  
}



giftDetails(id: string) {
  this.skLoading = true;
  this.api.post({ id }, 'gift-gallery/read').subscribe(result => {
    if (result['statusCode'] === 200) {
      const giftData = result['data'];
      this.giftForm.patchValue(giftData);
    }
    this.skLoading = false;
  },);
}


}
