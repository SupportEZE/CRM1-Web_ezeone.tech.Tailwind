import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ShowcodeCardComponent } from '../../../../../shared/components/showcode-card/showcode-card.component';
import { Editor, NgxEditorModule, Toolbar, Validators } from 'ngx-editor';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import jsonDoc from '../../../../../shared/data/editor';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ContentMasterAddComponent } from '../content-master-add/content-master-add.component';
import { ApiService } from '../../../../../core/services/api/api.service';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SweetAlertService } from '../../../../../core/services/alert/sweet-alert.service';
import Swal from 'sweetalert2';
import { ModuleService } from '../../../../../shared/services/module.service';
import { SpkProductCardComponent } from '../../../../../../@spk/reusable-apps/spk-product-card/spk-product-card.component';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';

@Component({
  selector: 'app-content-master-list',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule, CommonModule, ShowcodeCardComponent, NgxEditorModule, FormsModule, MaterialModuleModule, SpkProductCardComponent],
  templateUrl: './content-master-list.component.html',
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ]
})
export class ContentMasterListComponent {
  ImageItem: any = [];
  DocumentItem: any = [];
  activeTab: any = 'Banner';
  data: any = {};
  collaps: any = [];
  videoData: any = {};
  skLoading: boolean = false
  submodule: any = {};
  accessRight:any = {};
  constructor(
    
    @Inject(MAT_DIALOG_DATA) public modalData: any,
    private dialogRef: MatDialogRef<ContentMasterListComponent>,
    public dialog: MatDialog,
    public api: ApiService,
    public toastr: ToastrServices,
    private sanitizer: DomSanitizer,
    public alert: SweetAlertService,
    public moduleService: ModuleService,
    public comanFuncation: ComanFuncationService
  ) {
    this.activeTab = 'Banner';
  }
  
  fileNavItems = [
    { name: 'Banner', icon: 'ri-image-line' },
    { name: 'Videos', icon: 'ri-video-line' },
    { name: 'Document', icon: 'ri-file-text-line' },
    { name: 'About Us', icon: 'ri-information-line', },
    { name: 'Contact Us', icon: 'ri-customer-service-line' },
    { name: 'Privacy Policy', icon: 'ri-lock-line' },
    { name: 'Term & Condition', icon: 'ri-article-line' },
    { name: 'FAQ\'S', icon: 'ri-question-line' }
  ];
  
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
  
  
  
  ngOnInit() {
    const accessRight = this.moduleService.getAccessMap('Masters', 'Content Master');
    if (accessRight) {
      this.accessRight = accessRight;
    }
    
    const subModule = this.moduleService.getSubModuleByName('Masters', 'Content Master');
    if (subModule) {
      this.submodule = subModule;
    }
    
    this.editor = new Editor();
    this.callApi(this.activeTab)
  }
  
  callApi(activeTab: any) {
    if (activeTab == 'Contact Us') {
      this.contactDetails();
    }
    
    if (activeTab == 'About Us') {
      this.aboutUsDetails();
    }
    if (activeTab == 'Privacy Policy') {
      this.privacyPolicyDetails();
    }
    if (activeTab == 'Term & Condition') {
      this.termsConditionsDetails();
    }
    if (activeTab == 'FAQ\'S') {
      this.faqList();
    }
    if (activeTab == 'Videos') {
      this.videoList();
    }
    if (activeTab == 'Banner') {
      this.bannerList();
    }
    if (activeTab == 'Document') {
      this.DocumentList();
    }
    
    this.api.disabled = false;
  }
  
  buttonClick(event: Event, tabName: string): void {
    event.stopPropagation();
    this.activeTab = tabName;
    if (this.activeTab != tabName) {
      this.callApi(this.activeTab)
    }
    this.openModal(tabName);
  }
  
  
  form = new FormGroup({
    editorContent: new FormControl(
      { value: jsonDoc, disabled: false },
      Validators.required()
    ),
  });
  
  // Faq Api & Functions
  isVisible = false; // Initially hidden
  toggleEditor() {
    this.isVisible = !this.isVisible;
  }
  
  faqEditor(data: string) {
    this.data += `<p>${data}<p>`
  }
  faqList() {
    this.data = ''
    this.skLoading = true;
    this.api.post({}, 'faq/read').subscribe(result => {
      if (result['statusCode'] === 200) {
        this.collaps = result['data']
      }
      this.skLoading = false;
    },);
  }
  
  
  // Faq Api & Functions
  
  
  // collaps = [
  //   {'question':" 1. How can I change the color scheme of the admin template?", 'answer':"Navigate to the Theme Settings page, where you'll find options to choose a primary color and accent color. Select your desired colors and save the changes."},
  //   {'question':" 2. How can I change the color scheme of the admin template?", 'answer':"Navigate to the Theme Settings page, where you'll find options to choose a primary color and accent color. Select your desired colors and save the changes."},
  //   {'question':" 3. How can I change the color scheme of the admin template?", 'answer':"Navigate to the Theme Settings page, where you'll find options to choose a primary color and accent color. Select your desired colors and save the changes."},
  //   {'question':" 4. How can I change the color scheme of the admin template?", 'answer':"Navigate to the Theme Settings page, where you'll find options to choose a primary color and accent color. Select your desired colors and save the changes."}
  // ]
  
  openIndex: number | null = null; // Tracks the currently open index
  
  toggleCollapse(index: number) {
    this.openIndex = this.openIndex === index ? null : index; // Toggle visibility
  }
  
  openModal(type: string, data?: any) {
    const dialogRef = this.dialog.open(ContentMasterAddComponent, {
      width: '500px',
      panelClass: 'mat-right-modal',
      position: { right: '0px' },
      disableClose: true,
      data: {
        'lastPage': type,
        'faqData': data,
        'type': data ? 'edit' : 'add'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        if (this.activeTab === 'Banner' || this.activeTab === 'FAQ\'S' || this.activeTab === 'Videos' || this.activeTab === 'Document') {
          this.callApi(this.activeTab)
        }
      }
    });
  }
  
  downloadFile(url: string) {
    window.open(url, '_blank')
  }
  
  // Contact Api & Functions
  submitContact() {
    this.api.disabled = true;
    this.api.post(this.data, 'contact/create')
    .subscribe(result => {
      if (result['statusCode'] == 200) {
        this.api.disabled = false;
        this.toastr.success(result['message'], '', 'toast-top-right');
        this.contactDetails();
      }
    });
  }
  
  contactDetails() {
    this.skLoading = true;
    this.api.post({}, 'contact/read').subscribe(result => {
      if (result['statusCode'] === 200) {
        this.data = result['data'] ?? {};
      }
      this.skLoading = false;
    },);
  }
  // Contact Api & Functions
  
  
  
  
  parseNgxEditorContent(content: string): any {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    return Array.from(doc.body.children).map(element => ({
      type: element.tagName.toLowerCase(),
      content: element.innerHTML.trim()
    }));
  }
  
  // About Us Api & Functions
  aboutData: string = ''
  submitAboutUs() {
    if (this.aboutData){
      this.api.disabled = true;
      this.api.post({ 'about_us': this.aboutData }, 'about/create')
      .subscribe(result => {
        if (result['statusCode'] == 200) {
          this.api.disabled = false;
          this.toastr.success(result['message'], '', 'toast-top-right');
          this.aboutUsDetails();
        }
      });
    }
    else{
      this.toastr.error('About us is required', '', 'toast-top-right');
    }
  }
  appendEditor(data: string) {
    this.aboutData += `<p>${data}<p>`
  }
  aboutUsDetails() {
    this.aboutData = ''
    this.skLoading = true;
    this.api.post({}, 'about/read').subscribe(result => {
      if (result['statusCode'] == 200) {
        this.appendEditor(result['data'] ? result['data']['about_us'] : '')
      }
      this.skLoading = false;
    },);
  }
  // About Us Api & Functions
  
  
  // Video Api & Functions
  videoList() {
    this.skLoading = true;
    this.api.post({}, 'videos/read').subscribe(result => {
      if (result['statusCode'] == 200) {
        this.videoData = result['data'].map((video: any) => ({
          ...video,
          safeUrl: this.sanitizeUrl(video.youtube_url)
        }));
        this.skLoading = false;
      }
    },);
  }
  
  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url ? url : '');
  }
  // Video Api & Functions
  
  
  async bannerList() {
    this.skLoading = true;
    this.api.post({ 'module_id': this.submodule.module_id, 'sub_module_id': this.submodule.sub_module_id }, 'banner/read').subscribe(result => {
      if (result['statusCode'] == 200) {
        this.skLoading = false;
        this.ImageItem = result['data'];
      }
    });
  }
  // delete funcation start //
  delete(id: string, api: string, label: string) {
    this.comanFuncation.delete(id, this.submodule, label, api, 'single_action', id).subscribe((result: boolean) => {
      if (result === true) {
        if (this.activeTab === 'Banner') {
          this.bannerList();
        }
        if (this.activeTab === 'Document') {
          this.DocumentList();
        }
        
        if (this.activeTab === 'Videos') {
          this.videoList();
        }
        
        if (this.activeTab === 'Faq') {
          this.faqList()
        }
      }
    });
  }
  // delete funcation end
  
  // Privacy Policy Api & Functions
  privacyPolicyData: string = ''
  submitPrivacyPolicy() {
    if (this.privacyPolicyData){
      this.api.disabled = true;
      this.api.post({ 'privacy_policy': this.privacyPolicyData }, 'privacy-policy/create')
      .subscribe(result => {
        if (result['statusCode'] == 200) {
          this.api.disabled = false;
          this.toastr.success(result['message'], '', 'toast-top-right');
          this.privacyPolicyDetails();
        }
      });
    }
    else{
      this.toastr.error('Privacy policy is required', '', 'toast-top-right');
    }
  }
  appendPolicyEditor(data: string) {
    this.privacyPolicyData += `<p>${data}<p>`
  }
  privacyPolicyDetails() {
    this.privacyPolicyData = ''
    this.skLoading = true;
    this.api.post({}, 'privacy-policy/read').subscribe(result => {
      if (result['statusCode'] === 200) {
        this.appendPolicyEditor(result['data'] ? result['data']['privacy_policy'] : '')
      }
      this.skLoading = false;
    },);
  }
  // Privacy Policy Api & Functions
  
  // Terms & Conditions Api & Functions
  termsConditionsData: string = ''
  submitTermsConditionsData() {
    if (this.termsConditionsData){
      this.api.disabled = true;
      this.api.post({ 'terms_conditions': this.termsConditionsData }, 'terms-conditions/create')
      .subscribe(result => {
        if (result['statusCode'] == 200) {
          this.api.disabled = false;
          this.toastr.success(result['message'], '', 'toast-top-right');
          this.termsConditionsDetails();
        }
      });
    }
    else{
      this.toastr.success('Term & condition is required', '', 'toast-top-right');
    }
    
  }
  
  appendtermsConditionsEditor(data: string) {
    this.termsConditionsData += `<p>${data}<p>`
  }
  termsConditionsDetails() {
    this.termsConditionsData = ''
    this.skLoading = true;
    this.api.post({}, 'terms-conditions/read').subscribe(result => {
      if (result['statusCode'] === 200) {
        this.appendtermsConditionsEditor(result['data'] ? result['data']['terms_conditions'] : '')
      }
      this.skLoading = false;
    },);
  }
  // Terms & Conditions Api & Functions
  
  async DocumentList() {
    this.skLoading = true;
    this.api.post({ 'module_id': this.submodule.module_id, 'sub_module_id': this.submodule.sub_module_id }, 'document/read').subscribe(result => {
      if (result['statusCode'] == 200) {
        this.skLoading = false;
        this.DocumentItem = result['data'];
        this.DocumentItem.forEach((row:any) => {
          row.fileExtension = ('.'+row.file_type)
          .match(/\.(docx?|odt|rtf|txt|pdf|xls[x]?|ods|csv|tsv|pptx?|odp|html?|md|tex|xml|json|epub|mobi|azw3?|vsdx?|gdoc|gsheet|gslides|msi|apk|ipa|png|jpe?g|gif|bmp|webp|svg)$/i)
          ?.[0]
          .replace('.', '') || 'Unknown';
        });        
      }
    });
  }
}



