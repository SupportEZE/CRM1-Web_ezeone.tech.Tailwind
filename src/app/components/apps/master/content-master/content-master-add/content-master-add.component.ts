import { Component, Inject } from '@angular/core';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../../../core/services/api/api.service';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FilePondOptions } from 'filepond';
import { FilePondModule } from 'ngx-filepond';
import { FORMIDCONFIG } from '../../../../../../config/formId.config';
import { FormValidationService } from '../../../../../utility/form-validation';
import { SharedModule } from '../../../../../shared/shared.module';
import { LOGIN_TYPES } from '../../../../../utility/constants';
import { CommonApiService } from '../../../../../shared/services/common-api.service';
import { UploadFileService } from '../../../../../shared/services/upload.service';
import { ModuleService } from '../../../../../shared/services/module.service';
import { ModalHeaderComponent } from '../../../../../shared/components/modal-header/modal-header.component';
import { SpkNgSelectComponent } from '../../../../../../@spk/spk-ng-select/spk-ng-select.component';
import { AuthService } from '../../../../../shared/services/auth.service';

@Component({
  selector: 'app-content-master-add',
  imports: [MaterialModuleModule, SharedModule, CommonModule, FilePondModule, NgxEditorModule, FormsModule, ReactiveFormsModule, ModalHeaderComponent, SpkNgSelectComponent],
  templateUrl: './content-master-add.component.html'
})
export class ContentMasterAddComponent {
  bannerForm!: FormGroup;
  documentForm!: FormGroup;
  videoForm!: FormGroup;
  data:any ={};
  documentData: any = {};
  userSubTypes: any =[];
  FORMID:any= FORMIDCONFIG;
  validFormats !: string[];
  maxFileSize !: number;
  skLoading:boolean = false
  submodule: any
  orgData:any = {}
  
  
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public modalData: any,
    private dialogRef: MatDialogRef<ContentMasterAddComponent>,
    public api: ApiService,
    public toastr: ToastrServices,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private formValidation: FormValidationService,
    public CommonApiService: CommonApiService,
    public uploadService :UploadFileService,
    public moduleService:ModuleService,
    private authService: AuthService
  ){
    this.orgData = this.authService.getOrg();
  }
  
  ngOnInit() {
    
    const subModule = this.moduleService.getSubModuleByName('Masters', 'Content Master');
    if (subModule) {
      this.submodule = subModule;
    }
    
    if(this.modalData.lastPage == 'Banner' || this.modalData.lastPage == 'Videos' || this.modalData.lastPage == 'Document'){
      const payload = new Set(); 
      if (this.orgData.sfa || this.orgData.dms) {
        payload.add(LOGIN_TYPES.PRIMARY);
        payload.add(LOGIN_TYPES.SUB_PRIMARY);
        payload.add(LOGIN_TYPES.SECONDARY);
      }
      if (this.orgData.irp) {
        payload.add(LOGIN_TYPES.INFLUENCER);
      }
      const payload_key = Array.from(payload);
      this.CommonApiService.getLoginType(payload_key)
    }
    if (this.modalData.lastPage == 'FAQ\'S'){
      if (this.modalData.type === 'edit') {
        this.data = this.modalData.faqData;
      }
      else{
        this.data.answer = ''
      }
      
    }
    this.editor = new Editor();
    
    
    this.bannerForm = this.fb.group({
      login_type_id: ['', Validators.required],
      customer_type_id: ['', Validators.required],
      login_type_name: ['', ],
      customer_type_name: ['',],
    });
    
    this.documentForm = this.fb.group({
      login_type_id: [null, Validators.required],
      customer_type_id: ['', Validators.required],
      login_type_name: ['', ],
      customer_type_name: ['',],
      title: ['', Validators.required],
    });
    
    
    this.videoForm = this.fb.group({
      login_type_id: ['', Validators.required],
      customer_type_id: ['', Validators.required],
      customer_type_name: [''],
      login_type_name: [''],
      title: ['', Validators.required],
      youtube_url: ['', Validators.required],
    });
    
  }
  
  
  closeModal() {
    this.dialogRef.close();
  }
  
  editor!: Editor;
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
  
  
  // Video add api`s & functions`
  submitFaqData(){
    this.data.answer
    this.api.disabled = true;
    const httpMethod = this.data._id ? 'patch' : 'post';
    this.api[httpMethod](this.data, this.data._id ? 'faq/update' : 'faq/create')
    .subscribe(result => {
      if(result['statusCode'] == 200){
        this.api.disabled = false;
        this.toastr.success(result['message'], '', 'toast-top-right');
        this.dialogRef.close(true);  
        // this.faqDetails();
      }
    });
  }
  
  submitVideo(){
    
    if (this.videoForm.valid){
      this.api.disabled = true;
      
      this.api.post(this.videoForm.value, 'videos/create')
      .subscribe(result => {
        if (result['statusCode'] == 200) {
          this.api.disabled = false;
          this.toastr.success(result['message'], '', 'toast-top-right');
          this.dialogRef.close(true);
        }
      });
    }
    else{
      this.formValidation.markFormGroupTouched(this.videoForm); // Call the global function
    }
    
  }
  
  
  
  getSubType(event:any){
    this.api.post({"login_type_id" : event}, 'customer-type/read-dropdown').subscribe(result => {
      if(result['statusCode'] == 200){
        this.userSubTypes = result['data'];
      }
    });
  }
  
  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  // Video add api`s & functions
  
  // FAQ add api`s & functions
  faqEditor(data:string){
    this.data.answer += `<p>${data}<p>`
  }
  faqDetails() {
    this.data.answer = ''
    // this.skLoading = true; 
    this.api.post({},'faq/read').subscribe(result => {
      if (result['statusCode'] === 200) {
        this.faqEditor(result['data'])
      }
      // this.skLoading = false;
    },);
  } 
  
  
  
  // FAQ add api`s & functions`
  findName(event: any, type: string) {
    if (type === 'login_type') {
      let index = this.CommonApiService.loginType.findIndex((row: any) => row.value === event)
      if (index !== -1) {
        let name = this.CommonApiService.loginType[index]['label'];
        if (this.modalData.lastPage === 'Banner') {
          this.bannerForm.patchValue({ 'login_type_name': name });
        }
        if (this.modalData.lastPage === 'Videos') {
          this.videoForm.patchValue({ 'login_type_name': name });
        }
        if (this.modalData.lastPage === 'Document') {
          this.documentForm.patchValue({ 'login_type_name': name });
        }
      }
    }
    if (type === 'customer_type') {
      const selectedIds = event;
      if (Array.isArray(selectedIds) && selectedIds.length > 0) {
        const matchedNames = this.userSubTypes
        .filter((row: any) => selectedIds.includes(row.value))
        .map((row: any) => row.label);
        if (this.modalData.lastPage === 'Banner') {
          this.bannerForm.patchValue({ customer_type_name: matchedNames });
        }
        if (this.modalData.lastPage === 'Videos') {
          this.videoForm.patchValue({ customer_type_name: matchedNames });
        }
        if (this.modalData.lastPage === 'Document') {
          this.documentForm.patchValue({ customer_type_name: matchedNames });
        }
      }
      
    }
  }
  
  
  
  // BANNER add api`s & functions`
  pondFiles: File[] = [];
  
  pondOptions = this.getPondOptions('image');
  pondDocumentOptions = this.getPondOptions('pdf');
  getPondOptions(type: 'image' | 'pdf'): any {
    const commonOptions = {
      allowMultiple: true,
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
        imageValidateSizeMinWidth: 1600,
        imageValidateSizeMinHeight: 900,
        imageValidateSizeMaxWidth: 1600,
        imageValidateSizeMaxHeight: 900,
        labelFileTypeNotAllowed: 'Only PNG and JPEG files are allowed',
        fileValidateTypeLabelExpectedTypes: 'Allowed: PNG, JPEG',
        labelImageValidateSizeTooSmall: 'Image is too small. Min: {minWidth}×{minHeight}',
        labelImageValidateSizeTooBig: 'Image is too large. Max: {maxWidth}×{maxHeight}',
      };
    } else {
      return {
        ...commonOptions,
        acceptedFileTypes: ['application/pdf'],
        maxFileSize: '20MB',
        labelFileTypeNotAllowed: 'Only PDF files are allowed',
        fileValidateTypeLabelExpectedTypes: 'Allowed: PDF',
      };
    }
  }
  onFileProcessed(event: any) {
    const file = event.file.file;
    if (this.modalData.lastPage === 'Document'){
      Object.assign(file, { 'doc_no': this.documentForm.value.title });
    }
    this.pondFiles = [...(this.pondFiles || []), file]; 
  }
  
  onFileRemove(event: any) {
    const file = event.file.file;
    const index = this.pondFiles.findIndex(f => f.name === file.name && f.size === file.size);
    if (index > -1) {
      this.pondFiles.splice(index, 1);
    }
  }
  
  
  submitBanner() {
    this.submitForm(this.bannerForm, 'banner',);
  }
  
  submitDocument() {
    this.submitForm(this.documentForm, 'document');
  }
  
  
  submitForm(form: FormGroup, fileType: 'banner' | 'document') {
    if (!form.valid) {
      this.formValidation.markFormGroupTouched(form);
      return;
    }
    
    if (this.pondFiles.length === 0) {
      const errorMsg = fileType === 'banner' ? 'Banner image is required' : 'PDF is required';
      this.toastr.error(errorMsg, '', 'toast-top-right');
      return;
    }
    
    this.api.disabled = true;
    this.api.post(form.value, `${fileType}/create`).subscribe(result => {
      if (result['statusCode'] === 200) {
        if (this.pondFiles.length > 0) {
          this.uploadService.uploadFile(
            result['data']['inserted_id'],
            fileType,
            this.pondFiles,
            form.value.customer_type_name,
            this.submodule,
            undefined,
            () => this.dialogRef.close(true)
          );
        } else {
          this.api.disabled = false;
          this.toastr.success(result['message'], '', 'toast-top-right');
          this.dialogRef.close(true);
        }
      }
    });
  }
  
}
