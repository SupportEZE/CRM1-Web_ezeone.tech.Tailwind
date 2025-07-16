import { Component, ViewChild } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../../../core/services/api/api.service';
import { FilePondModule } from 'ngx-filepond';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { CommonApiService } from '../../../../../shared/services/common-api.service';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { DateService } from '../../../../../shared/services/date.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { LogService } from '../../../../../core/services/log/log.service';
import { ModuleService } from '../../../../../shared/services/module.service';
import { LOGIN_TYPES } from '../../../../../utility/constants';
import { UploadFileService } from '../../../../../shared/services/upload.service';
import { FormValidationService } from '../../../../../utility/form-validation';
import { SpkInputComponent } from '../../../../../../@spk/spk-input/spk-input.component';
import { SpkNgSelectComponent } from '../../../../../../@spk/spk-ng-select/spk-ng-select.component';
import { SpkFlatpickrComponent } from '../../../../../../@spk/spk-flatpickr/spk-flatpickr.component';

@Component({
    selector: 'app-leader-board-add',
    imports: [FormsModule,CommonModule, SharedModule,MaterialModuleModule, FilePondModule,NgxEditorModule,ReactiveFormsModule,SpkReusableTablesComponent, SpkInputComponent, SpkNgSelectComponent, SpkFlatpickrComponent],
    templateUrl: './leader-board-add.component.html',
})
export class leaderBoardAddComponent {
    // DetailId:  any;
    leaderBoardForm: FormGroup = new FormGroup({});
    giftForm: FormGroup = new FormGroup({});
    giftList: any[] = [];
    pondFiles: any[] = [];
    skLoading:boolean = false
    today= new Date();
    pageType:any = 'add'
    editor!: Editor;
    toolbar: Toolbar = [
        ['bold', 'italic'],
        ['underline', 'strike'],
        ['code', 'blockquote'],
        ['ordered_list', 'bullet_list'],
        [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
        ['text_color', 'background_color'],
        ['align_left', 'align_center', 'align_right', 'align_justify'],
    ];
    uploadresults: any = [];
    Detail:any = {};
    originalData:any={}
    @ViewChild('filePond') pond: any;  // Get reference to FilePond
    submodule:any;
    
    constructor(public dialog: MatDialog, public api: ApiService, public toastr: ToastrServices, public CommonApiService: CommonApiService, private fb: FormBuilder, private router: Router, public route: ActivatedRoute, private logService: LogService, private formValidation: FormValidationService, private moduleService : ModuleService,public uploadService: UploadFileService){
        this.skLoading = true;
    }
    
    ngOnInit() {
        
        const subModule = this.moduleService.getSubModuleByName('IRP', 'Leader Board');
        if (subModule) {
            this.submodule = subModule;
        }
        
        this.editor = new Editor();
        this.CommonApiService.getStates()
        this.leaderBoardForm = new FormGroup({
            title: new FormControl('', Validators.required),
            start_date: new FormControl('', Validators.required),
            end_date: new FormControl('', Validators.required),
            customer_type_name: new FormControl('', Validators.required),
            customer_type_id: new FormControl('', Validators.required),
            state: new FormControl('', Validators.required),
            ledger_creation_type: new FormControl('', Validators.required),
            min_eligiblity_points: new FormControl('', Validators.required),
            terms_condition: new FormControl('', Validators.required),
        });
        
        this.giftForm = this.fb.group({
            gift_title: ['', Validators.required],
            rank: ['', Validators.required],
        });
        this.skLoading = false;
        this.CommonApiService.getCustomerCategorySubType([LOGIN_TYPES.INFLUENCER]);
    }

    onSearch(search: string) {
        this.CommonApiService.getStates(search)
    }


    onDateChange(){
        this.leaderBoardForm.get('end_date')?.reset();
    }
    
    pondBannerFiles: any[] = [];
    pondAttachmentFiles: any[] = [];
    pondOptions = this.getPondOptions('image');
    pondDocumentOptions = this.getPondOptions('pdf');
    getPondOptions(type: 'image' | 'pdf'): any {
        const commonOptions = {
            allowFileTypeValidation: true,
            labelIdle: "Click or drag files here to upload...",
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
                allowMultiple: true,
                acceptedFileTypes: ['image/jpeg', 'image/png', 'image/jpg'],
                maxFileSize: '2MB',
                maxFiles: this.giftList.length,
                allowImageValidateSize: true,
                labelFileTypeNotAllowed: 'Only PNG and JPEG files are allowed',
                fileValidateTypeLabelExpectedTypes: 'Allowed: PNG, JPEG',
                labelImageValidateSizeTooSmall: 'Image is too small. Min: {minWidth}×{minHeight}',
                labelImageValidateSizeTooBig: 'Image is too large. Max: {maxWidth}×{maxHeight}',
            };
        } else {
            return {
                ...commonOptions,
                allowMultiple: false,
                acceptedFileTypes: ['application/pdf'],
                maxFileSize: '10MB',
                labelFileTypeNotAllowed: 'Only PDF files are allowed',
                fileValidateTypeLabelExpectedTypes: 'Allowed: PDF',
            };
        }
    }
    onFileProcessed(event: any, type: string) {
        const file = event.file.file;
        Object.assign(file, { image_type: type });
        if (type === 'image') {
            this.pondBannerFiles = [...(this.pondBannerFiles || []), file];
        } else if (type === 'pdf') {
            this.pondAttachmentFiles = [...(this.pondAttachmentFiles || []), file];
        }
    }
    onFileRemove(event: any, type: string) {
        const file = event.file.file;
        if (type === 'image') {
            const index = this.pondBannerFiles.findIndex(f => f.name === file.name && f.size === file.size);
            if (index > -1) {
                this.pondBannerFiles.splice(index, 1);
            }
        } else if (type === 'pdf') {
            const index = this.pondAttachmentFiles.findIndex(f => f.name === file.name && f.size === file.size);
            if (index > -1) {
                this.pondAttachmentFiles.splice(index, 1);
            }
        }
    }
    
    addToList() {
        if (this.giftForm.invalid) {
            this.toastr.error('Fill all required gift detail fields.', '', 'toast-top-right');
            return;
        }
        const formData = this.giftForm.value;
      
        
        const formattedGiftData = {
            gift_title: formData.gift_title,
            rank: formData.rank,
            // doc_file: imageFile,
            // file_url: URL.createObjectURL(imageFile),
        };
        this.giftList.push(formattedGiftData);
        this.giftForm.reset();
        // this.pondBannerFiles = [];
    }
    
    
    deleteGift(index: number) {
        this.giftList.splice(index, 1);
        this.toastr.success('Gift removed from the list.', '', 'toast-top-right');
    }
    
    onSubmit() {
        if (this.leaderBoardForm.valid) {
            this.pondFiles = [...this.pondBannerFiles, ...this.pondAttachmentFiles];

            if (this.pondFiles.length === 0 && this.pageType === 'add') {
                this.toastr.error('Please upload at least one file.', '', 'toast-top-right');
                return;
            }
            
            if (this.giftList.length === 0) {
                this.toastr.error('Please add at least one gift.', '', 'toast-top-right');
                return;
            }
            
            const giftDetailArray = this.fb.array(
                this.giftList.map(gift => this.fb.group(gift))
            );

            this.api.disabled = true;
            
            this.leaderBoardForm.setControl('gift_detail', giftDetailArray);
            const isEditMode = this.pageType === 'edit';
            if (isEditMode) {
                const noChanges = this.logService.logActivityOnUpdate(
                    isEditMode, 
                    this.originalData, 
                    this.leaderBoardForm.value,
                    this.submodule.module_id, 
                    this.submodule.title, 
                    'update', 
                    this.originalData._id || null,
                    () => {},
                    this.submodule.module_type
                );
                if (noChanges) {
                    this.api.disabled = false;
                    this.toastr.warning('No changes detected', '', 'toast-top-right')
                    return ;
                }
                
            }
            
            const httpMethod = isEditMode ? 'patch' : 'post';
            const functionName = isEditMode ? 'leader-board/update' : 'leader-board/create';
            this.leaderBoardForm.value.min_eligiblity_points = Number(this.leaderBoardForm.value.min_eligiblity_points);

            this.api[httpMethod](this.leaderBoardForm.value, functionName).subscribe(result => {
                if (result['statusCode'] == 200) {
                    if (this.pondFiles.length> 0){
                        this.uploadService.uploadFile(result['data']['inserted_id'], 'leader-board', this.pondFiles, 'Leader Board Images', this.submodule, '/apps/loyalty/leader-board')
                        this.api.disabled = false;
                    }
                    else{
                        this.api.disabled = false;
                        this.router.navigate(['/apps/loyalty/leader-board']);
                        this.toastr.success(result['message'], '', 'toast-top-right');
                        this.leaderBoardForm.reset();
                    }
                }
            });
        }
        else{
            this.formValidation.markFormGroupTouched(this.leaderBoardForm); // Call the global function
        }
    }
    
    findName(value: any) {
        const selectedIds = value;
        if (Array.isArray(selectedIds) && selectedIds.length > 0) {
            const matchedNames = this.CommonApiService.customerCategorySubType
                .filter((row: any) => selectedIds.includes(row.value))
                .map((row: any) => row.label);
            this.leaderBoardForm.patchValue({ customer_type_name: matchedNames, });
        }
    }
    
    headerColumn=[
        {label:"S.No", table_class :"text-center"},
        {label:"Title", table_class :""},
        {label:"Rank", table_class :"text-center"},
        // {label:"Banner", table_class :""},
        {label:"Action", table_class :"text-center"},
    ]
    
    pointCategoryType = [
        { label: "Purchase", value: "Purchase" },
        { label: "Scan", value: "Scan" },
        { label: "Invite", value: "Invite" },
    ];
}