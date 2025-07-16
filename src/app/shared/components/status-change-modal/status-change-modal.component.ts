import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModuleModule } from '../../../material-module/material-module.module';
import { SharedModule } from '../../shared.module';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api/api.service';
import { ToastrServices } from '../../services/toastr.service ';
import { ComanFuncationService } from '../../services/comanFuncation.service';
import { LogService } from '../../../core/services/log/log.service';
import { ModalHeaderComponent } from '../modal-header/modal-header.component';
import { SpkReusableTablesComponent } from '../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { FilePondModule } from 'ngx-filepond';
import { DateService } from '../../services/date.service';
import { UploadFileService } from '../../services/upload.service';
import { Router } from '@angular/router';
import { FormValidationService } from '../../../utility/form-validation';
import { ShowcodeCardComponent } from '../showcode-card/showcode-card.component';
import { CommonApiService } from '../../services/common-api.service';
import { SweetAlertService } from '../../../core/services/alert/sweet-alert.service';
import { SpkFlatpickrComponent } from '../../../../@spk/spk-flatpickr/spk-flatpickr.component';
import { CURRENCY_SYMBOLS } from '../../../utility/constants';

@Component({
    selector: 'app-status-change-modal',
    imports: [ReactiveFormsModule, MaterialModuleModule, SharedModule, CommonModule, FormsModule, ModalHeaderComponent, SpkReusableTablesComponent, FilePondModule, ShowcodeCardComponent,SpkFlatpickrComponent],
    
    templateUrl: './status-change-modal.component.html',
})
export class StatusChangeModalComponent {
    CURRENCY_SYMBOLS = CURRENCY_SYMBOLS;
    data: any = {};
    today = new Date();
    skLoading: boolean = false;
    bonusId: any;
    areaBonusDetail: any;
    eventGalleryForm!: FormGroup;
    auditGalleryForm!: FormGroup;
    brandingGalleryForm!: FormGroup;
    expenseParticipantsForm!: FormGroup;
    eventExpenseForm: FormGroup = new FormGroup({});
    orderStatusForm: FormGroup = new FormGroup({});
    pondFiles: any[] = [];
    @ViewChild('filePond') pond: any;  // Get reference to FilePond
    pageType: any = 'add'
    uploadresults: any = [];
    originalData: any = {}
    submodule: any;
    expenseList: any[] = [];
    UploadFiles: any = [];
    attachmentFiles: any[] = [];
    bannerFiles: any[] = [];
    schemeDetail: any = {};
    schemeProductDetail: any[] = [];
    productData: any = [];
    pointCategoryType = [
        { label: "Purchase" },
        { label: "Scan" },
        { label: "Invite" },
    ];
    
    headerColumn = [
        { label: "S.No", table_class: "text-center" },
        { label: "Expense Date", table_class: "" },
        { label: "Expense Type", table_class: "" },
        { label: "Expense Amount", table_class: "" },
        { label: "Description", table_class: "" },
        { label: "Action", table_class: "text-center" },
    ]
    
    
    
    leaveStatusOptions = [
        {
            name: 'Approved'
        },
        {
            name: 'Rejected'
        },
    ]
    
    quotationStatusOptions = [
        {
            name: 'Approved'
        },
        {
            name: 'Reject'
        },
    ]
    
    orderStatusOptions = [
        {
            label: 'Approved', value:"Approved"
        },
        {
            label: 'Reject', value:"Reject"
        },
        {
            label: 'Hold', value: 'Hold'
        },
    ]
    
    
    constructor(@Inject(MAT_DIALOG_DATA) public modalData: any, private dialogRef: MatDialogRef<StatusChangeModalComponent>, public api: ApiService, public toastr: ToastrServices, public comanFuncation: ComanFuncationService, private logService: LogService, private dateService: DateService, private fb: FormBuilder, public uploadService: UploadFileService, private router: Router, public formValidation: FormValidationService, public date: DateService, public alert:SweetAlertService, public CommonApiService: CommonApiService) {
        this.data.status = modalData.status;
        this.data.reason = modalData.reason;
    }
    
    ngOnInit() {
        this.orderStatusForm = this.fb.group({
            status: ['', Validators.required],
            reason: ['', Validators.required],
            billing_company: ['', Validators.required],
            _id: ['', Validators.required],
        });
        this.expenseParticipantsForm = this.fb.group({
            name: ['', Validators.required],
            mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        });
        
        
        this.eventGalleryForm = this.fb.group({
            login_type_id: ['', Validators.required],
            customer_type_id: ['', Validators.required],
            login_type_name: ['',],
            customer_type_name: ['',],
        });
        
        this.brandingGalleryForm = this.fb.group({});
        this.auditGalleryForm = this.fb.group({});
        
        
        if (this.modalData.lastPage === 'bonus-point-category' || this.modalData.lastPage === 'bonus-basic-detail') {
            this.getBonusDetail();
        }
        if (this.modalData.lastPage == 'order-add') {
            this.getSchemeDetail();
        }
        if (this.modalData.lastPage == 'primary-order-detail') {
            this.CommonApiService.getProduct();
            this.originalData.status = this.modalData.status;
            this.originalData.company_name = this.modalData?.company_name || '';
            this.originalData._id = this.modalData?._id;
            this.orderStatusForm.patchValue(this.modalData);
        } 
        
        if (this.modalData.lastPage == 'event-expense-modal') {
            this.eventExpenseForm = this.fb.group({
                expense_date: ['', Validators.required],
                expense_type: ['', Validators.required],
                km: [''],
                expense_type_unit: [''],
                expense_type_value: [''],
                expense_amount: [{value: '', disabled: true}, Validators.required],
                description: ['', Validators.required],
            });
            
            this.eventExpenseForm.get('expense_type')?.valueChanges.subscribe((expense_type) => {
                if (expense_type === 'Car' || expense_type === 'Bike') {
                    this.eventExpenseForm.get('km')?.setValidators([Validators.required]);
                } 
                else{
                    this.eventExpenseForm.get('km')?.clearValidators();
                }
            });
            
            this.getExpensePolicyType();
        }
        
        this.orderStatusForm.get('status')?.valueChanges.subscribe(status => {
            const reasonControl = this.orderStatusForm.get('reason');
            const companyControl = this.orderStatusForm.get('billing_company');
            if (status === 'Reject' || status === 'Hold') {
                reasonControl?.setValidators([Validators.required]);
            } else {
                reasonControl?.clearValidators();
            }
            reasonControl?.updateValueAndValidity();
            
            if (status === 'Approved') {
                companyControl?.setValidators([Validators.required]);
            } else {
                companyControl?.clearValidators();
            }
            companyControl?.updateValueAndValidity();
        });
        
    }
    
    statusChange() {
        this.comanFuncation.statusChange(this.data.status, this.modalData.DetailId, this.modalData.status, this.modalData.subModule, 'without-toggle', this.modalData.apiPath, this.data.reason, this.modalData.reason).subscribe((result: boolean) => {
            if (result) {
                this.dialogRef.close(true);
            }
        });
    }
    
    leaveStatusChange() {
        this.comanFuncation.statusChange(this.data.status, this.modalData.leaveId, this.modalData.status, this.modalData.subModule, 'without-toggle', 'leave/update-status', this.data.reject_reason, this.modalData.reject_reason,).subscribe((result: boolean) => {
            if (result) {
                this.dialogRef.close(true);
            }
        });
    }
    
    closeModal() {
        this.dialogRef.close(); // Closes the dialog
    }
    
    // Area Bonus Working
    
    updateBonusDetail() {
        this.api.disabled = true;
        this.data._id = this.modalData.bonusId;
        this.api.post(this.data, 'bonus/update').subscribe(
            (result) => {
                if (result.statusCode === 200) {
                    this.api.disabled = false;
                    this.toastr.success(result['message'], '', 'toast-top-right');
                    this.dialogRef.close(true);
                }
            },
        );
    }
    
    updateBonusPoints() {
        const payload = {
            _id: this.modalData.bonusId, // Use the correct ID for updating
            title: this.data.title,
            start_date: this.data.date_from, // Ensure correct format
            end_date: this.data.date_to,
        };
        
        this.api.post(payload, 'bonus/update-bonus').subscribe(
            (result) => {
                if (result.statusCode === 200) {
                    this.toastr.success(result['message'], '', 'toast-top-right');
                    this.dialogRef.close(true);
                }
            },
        );
    }
    
    close() {
        this.dialogRef.close(); // Closes the dialog
    }
    
    getBonusDetail() {
        this.skLoading = true;
        this.api.post({ _id: this.modalData.bonusId }, 'bonus/detail').subscribe(result => {
            if (result['statusCode'] === 200) {
                this.skLoading = false;
                this.data = result['data'];
                this.data.date_from = new Date(this.data.start_date);
                this.data.date_to = new Date(this.data.end_date);
                this.areaBonusDetail = { ...this.data };
                this.originalData = JSON.parse(JSON.stringify(result.data?.product_point));
                // this.logService.getLogs(this.submoduleId.sub_module_id,  (logs) => {
                // this.logList = logs;
                // }, this.bonusId ? this.bonusId : '', this.submoduleId.module_type)
            }
        });
    }
    
    saveUpdatedPoints() {
        const updatedData = {
            _id: this.modalData.bonusId,
            product_point: this.areaBonusDetail.product_point // Send updated points
        };
        
        
        const isEditMode = true
        if (isEditMode) {
            const noChanges = this.logService.logActivityOnUpdate(
                isEditMode,
                this.originalData,
                this.areaBonusDetail.product_point,
                this.modalData.module_id,
                this.modalData.module_name,
                'update',
                this.modalData.bonusId || null,
                () => { },
                this.modalData.module_type
            );
            if (noChanges) {
                this.api.disabled = false;
                this.toastr.warning('No changes detected', '', 'toast-top-right')
                return;
            }
            
        }
        this.api.disabled = true;
        this.api.post(updatedData, 'bonus/update-point').subscribe(result => {
            if (result['statusCode'] === 200) {
                this.api.disabled = false;
                this.toastr.success(result['message'], '', 'toast-top-right');
                this.dialogRef.close(true);
            }
        });
    }
    
    pondOptions = this.getPondOptions('image');
    getPondOptions(type: 'image'): any {
        const commonOptions = {
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
                allowMultiple: false,
                acceptedFileTypes: ['image/jpeg', 'image/png', 'image/jpg'],
                maxFileSize: '2MB',
                allowImageValidateSize: true,
                labelFileTypeNotAllowed: 'Only PNG and JPEG files are allowed',
                fileValidateTypeLabelExpectedTypes: 'Allowed: PNG, JPEG',
                labelImageValidateSizeTooSmall: 'Image is too small. Min: {minWidth}×{minHeight}',
                labelImageValidateSizeTooBig: 'Image is too large. Max: {maxWidth}×{maxHeight}',
            };
        }
    }
    
    onFileProcessed(event: any, type: string) {
        const file = event.file.file;
        Object.assign(file, { image_type: type });
        if (type === 'image') {
            this.pondFiles = [...(this.pondFiles || []), file];
        }
    }
    
    onFileRemove(event: any, type: string) {
        const file = event.file.file;
        if (type === 'image') {
            const index = this.pondFiles.findIndex(f => f.name === file.name && f.size === file.size);
            if (index > -1) {
                this.pondFiles.splice(index, 1);
            }
        }
    }
    
    // Area Bonus Working 
    
    // -------------------Event Expense Start---------------------- //
    
    expensePolicyType:any = [];
    getExpensePolicyType() {
        this.api.post({ 'user_id': this.modalData?.eventDetail?.assigned_to_user_id }, 'expense/policy').subscribe(result => {
            if (result['statusCode'] === 200) {
                this.expensePolicyType = result['data'];
            }
        });
    }
    
    onSingleSelectChange(event: any)
    {
        const selectedValue = this.expensePolicyType.find((item: any) => item.value === event);
        if (selectedValue) {
            this.eventExpenseForm.patchValue({ expense_type_unit: selectedValue.unit });
            this.eventExpenseForm.patchValue({ expense_type_value: selectedValue.unit_value });
            this.eventExpenseForm.patchValue({ expense_amount: '' });
            this.eventExpenseForm.patchValue({ km: '' });
        }
        if(this.eventExpenseForm.value.expense_type_unit !== 'km'){
            this.eventExpenseForm.get('expense_amount')?.enable();
        }
        else {
            this.eventExpenseForm.get('expense_amount')?.disable();
        }
    }
    
    onAmountCalculate(event: any)
    {
        const selectedValue = this.expensePolicyType.find((item: any) => item.value === this.eventExpenseForm.value.expense_type);
        
        if (selectedValue) {
            const calculatedAmount = Number(event) * selectedValue.unit_value;
            this.eventExpenseForm.patchValue({ expense_amount: calculatedAmount});
        }
    }
    
    onValueChange(event: any)
    {
        if (
            this.eventExpenseForm.value.expense_type_unit === 'amount' &&
            this.eventExpenseForm.value.expense_type_value > 0 &&
            event > this.eventExpenseForm.value.expense_type_value
        ) {
            this.toastr.warning('Entered amount exceeds the assigned limit i.e. ' + this.eventExpenseForm.value.expense_type_value, '', 'toast-top-right');           
            this.eventExpenseForm.patchValue({ expense_amount: '' });
        }
        
    }
    
    // -------------------Event Expense End---------------------- //
    
    
    expenseStatusChange() {
        this.alert.confirm("Are you sure?", "You want to change status", "Yes it!")
        .then(result => {
            if (result.isConfirmed) {
                this.api.disabled = true;
                const previousData = this.modalData.status;
                const updatedData = this.data.status;
                
                let pageType = 'edit'
                const isEditMode = pageType === 'edit';
                if (isEditMode) {
                    const noChanges = this.logService.logActivityOnUpdate(
                        isEditMode,
                        { status: previousData },
                        { status: updatedData },
                        this.modalData?.subModule?.module_id,
                        this.modalData?.subModule?.module_name,
                        'update',
                        this.modalData?.expenseId || null,
                        () => { },
                        this.modalData?.subModule?.module_type
                    );
                    if (noChanges) {
                        this.api.disabled = false;
                        this.toastr.warning('No changes detected', '', 'toast-top-right')
                        return;
                    }
                    
                }
                this.api.patch({'_id': this.modalData.expenseId, 'status': this.data.status, 'approved_amount': this.data.approved_amount, 'reason': this.data.reason}, 'expense/update-status').subscribe(result => {
                    if (result['statusCode'] === 200) {
                        this.api.disabled = false;
                        this.toastr.success(result['message'], '', 'toast-top-right');
                        this.dialogRef.close(true)
                    }
                });
            }
            
        })
        
    }
    
    // expenseStatusChange() {
    //   this.skLoading = true;
    
    //   let newtext: any = '';
    //   let text: any = '';
    
    //   // Handle condition-wise value mapping
    //   if (this.data.status === 'Approved') {
    //     newtext = Number(this.data.approved_amount); // ✅ ensure it's a number
    //   } else if (this.data.status === 'Reject') {
    //     newtext = this.data.reason;
    //     text = this.data.reason;
    //   }
    
    //   this.comanFuncation.statusChange(
    //     this.data.status,
    //     this.modalData.expenseId,
    //     this.modalData.status,
    //     this.modalData.subModule,
    //     'without-toggle',
    //     'expense/update-status',
    //     newtext,
    //     text
    //   ).subscribe((result: boolean) => {
    //     this.skLoading = false;
    //     if (result) {
    //       this.dialogRef.close(true);
    //     }
    //   });
    // }
    
    
    
    // Expense Working 
    
    quotationStatusChange() {
        this.skLoading = true;
        this.comanFuncation.statusChange(this.data.status, this.modalData.quotationId, this.modalData.status, this.modalData.subModule, 'without-toggle', 'quotation/update-status', this.data.reason, this.modalData.reason).subscribe((result: boolean) => {
            this.skLoading = false;
            if (result) {
                this.dialogRef.close(true);
            }
        });
    }
    
    eventStatusChange() {
        this.skLoading = true;
        this.comanFuncation.statusChange(this.data.status, this.modalData.DetailId, this.modalData.status, this.modalData.subModule, 'without-toggle', 'event/status-update', this.data.reason, this.data.approved_amount).subscribe((result: boolean) => {
            this.skLoading = false;
            if (result) {
                this.dialogRef.close(true);
            }
        });
    }
    orderStatusChange() {
        this.alert.confirm("Are you sure?", "You want to change status", "Yes it!")
        .then(result => {
            if (result.isConfirmed) {
                this.api.disabled = true;
                let pageType = 'edit'
                const isEditMode = pageType === 'edit';
                if (isEditMode) {
                    const noChanges = this.logService.logActivityOnUpdate(
                        isEditMode,
                        this.originalData,
                        this.orderStatusForm.value,
                        this.modalData?.subModule?.module_id,
                        this.modalData?.subModule?.sub_module_name,
                        'update',
                        this.modalData?._id || null,
                        () => { },
                        this.modalData?.subModule?.module_type
                    );
                    if (noChanges) {
                        this.api.disabled = false;
                        this.toastr.warning('No changes detected', '', 'toast-top-right')
                        return;
                    }
                    
                }
                this.formValidation.removeEmptyControls(this.orderStatusForm);
                this.api.patch(this.orderStatusForm.value, 'order/primary-order-status-change').subscribe(result => {
                    if (result['statusCode'] === 200) {
                        this.api.disabled = false;
                        this.toastr.success(result['message'], '', 'toast-top-right');
                        this.dialogRef.close(true)
                    }
                });
            }
            
        })
        
    }
    
    // eventExpenseaddToList() {
    //     if (this.eventExpenseForm.invalid) {
    //         this.toastr.error('Fill all required expense fields.', '', 'toast-top-right');
    //         return;
    //     }
    //     const formData = this.eventExpenseForm.value;
    //     const formattedExpense = {
    //         expense_title: formData.title,
    //         expense_date: formData.expense_date,
    //         expense_amount: formData.expense_amount,
    //         description: formData.description,
    //         attachment: [...this.pondFiles]
    //     };
    
    //     this.expenseList.push(formattedExpense);
    
    //     this.eventExpenseForm.reset();
    //     if (this.pond) this.pond.handleClear();
    // }
    
    
    eventExpenseaddToList() {
        if (this.eventExpenseForm.invalid) {
            this.eventExpenseForm.markAllAsTouched();
            return;
        }
        const formData = this.eventExpenseForm.getRawValue();
        const newDate = this.dateService.formatToYYYYMMDD(new Date(formData.expense_date));
        
        // const combinedList = [
        //     ...(this.expenseList || []),
        //     ...(this.modalData?.sub_expense || [])
        // ];
        
        const isDuplicate = this.expenseList.some(item => {
            const existingDate = this.dateService.formatToYYYYMMDD(new Date(item.expense_date));
            return existingDate === newDate && item.expense_type === formData.expense_type;
        });
        
        if (isDuplicate) {
            this.toastr.error('Entry with the same date and expense type already exists.', '', 'toast-top-right');
            return;
        }
        
        const formattedExpense = {
            expense_date: formData.expense_date,
            expense_type: formData.expense_type,
            expense_type_unit: formData.expense_type_unit,
            expense_type_value: formData.expense_type_value,
            km: formData.km,
            expense_amount: formData.expense_amount,
            description: formData.description,
        };
        // this.formValidation.removeEmptyFields(formattedExpense)
        this.expenseList.push(formattedExpense);
        this.eventExpenseForm.reset();
    }
    
    
    onSubmitEventExpense() {
        if (this.pondFiles.length === 0 && this.pageType === 'add') {
            this.toastr.error('Please upload at least one file.', '', 'toast-top-right');
            return;
        }
        if (this.expenseList.length === 0) {
            this.toastr.error('Please upload at least one sub expense.', '', 'toast-top-right');
            return;
        }
        this.api.disabled = true;
        this.api.post({'event_plan_id' : this.modalData.DetailId, 'sub_expense': this.expenseList}, 'event/add-expense').subscribe(result => {
            this.api.disabled = false;
            if (result.statusCode === 200) {
                if (this.pondFiles.length > 0) {
                    this.api.disabled = true;
                    this.uploadService.uploadFile(result['data']['inserted_id'], 'expense', this.pondFiles, 'Expense Images', this.modalData.subModule, undefined,
                        () => {
                            this.api.disabled = false;
                            this.toastr.success(result['message'], '', 'toast-top-right');
                            this.eventExpenseForm.reset();
                            this.dialogRef.close(true);
                        }
                    );
                } else {
                    this.api.disabled = false;
                    this.router.navigate(['event-plan/event-plan-detail']);
                    this.toastr.success(result['message'], '', 'toast-top-right');
                    this.eventExpenseForm.reset();
                    this.dialogRef.close(true);
                }
            }
        });
    }
    
    onSubmitParticipantsData() {
        if (this.expenseParticipantsForm.valid) {
            this.expenseParticipantsForm.value.event_plan_id = this.modalData.DetailId;
            this.api.disabled = true;
            this.logService.logActivityOnUpdate(
                false, // Always false since no edit mode
                null, // No original data to compare
                this.expenseParticipantsForm.value,
                this.modalData.subModule,
                'create', // Action type is 'create'
                this.modalData.DetailId || null,
                () => { },
                this.modalData.module_type
            );
            this.api.post(this.expenseParticipantsForm.value, 'event/add-participants').subscribe(result => {
                if (result['statusCode'] == 200) {
                    this.api.disabled = false;
                    this.toastr.success(result['message'], '', 'toast-top-right');
                    this.dialogRef.close(true);
                } else {
                    this.api.disabled = false;
                }
            });
        } else {
            this.formValidation.markFormGroupTouched(this.expenseParticipantsForm);
        }
    }
    
    submitEventGallery() {
        if (this.pondFiles.length === 0) {
            this.toastr.error('Please upload at least one image.', '', 'toast-top-right');
            return;
        }
        if (this.pondFiles.length > 0) {
            this.uploadService.uploadFile(this.modalData.DetailId, 'event', this.pondFiles, 'Event Images', this.modalData.subModule, undefined,() => this.dialogRef.close(true))
        }
    }
    
    submitBrandingRequestGallery() {
        if (this.pondFiles.length === 0) {
            this.toastr.error('Please upload at least one image.', '', 'toast-top-right');
            return;
        }
        if (this.pondFiles.length > 0) {
            this.uploadService.uploadFile(this.modalData.DetailId, 'brand-audit', this.pondFiles, 'Branding Request', this.modalData.subModule, undefined, () => this.dialogRef.close(true))
        }
    }
    
    submitAuditGallery() {
        if (this.pondFiles.length === 0) {
            this.toastr.error('Please upload at least one image.', '', 'toast-top-right');
            return;
        }
        if (this.pondFiles.length > 0) {
            this.uploadService.uploadFile(this.modalData.DetailId, 'brand-audit', this.pondFiles, 'Audit', this.modalData.subModule, undefined, () => this.dialogRef.close(true))
        }
        
    }

    submitAuditCompetitorGallery() {
        if (this.pondFiles.length === 0) {
            this.toastr.error('Please upload at least one image.', '', 'toast-top-right');
            return;
        }
        if (this.pondFiles.length > 0) {
            this.uploadService.uploadFile(this.modalData.DetailId, 'brand-audit', this.pondFiles, 'Competitor Images', this.modalData.subModule, undefined, () => this.dialogRef.close(true))
        }
        
    }
    
    getSchemeDetail() {
        this.skLoading = true;
        this.api.post({ scheme_id: this.modalData.scheme_id }, 'order/scheme-detail').subscribe(result => {
            if (result['statusCode'] === 200) {
                this.skLoading = false;
                this.schemeDetail = result['data'];
                this.schemeProductDetail = result['data']['product_data'];
            }
        });
    }
    
    deleteExpense(i:any){
        this.expenseList.splice(i, 1)
    }
    
    
    
    productHeaders = [
        { label: "Product", table_class: "" },
        { label: "Stock", table_class: "text-center" },
        { label: "UOM", table_class: "text-center" },
    ]
    
    uomList = [
        {
            label: 'Box',
            value: 'Box',
        },
        {
            label: 'Pcs',
            value: 'Pcs',
        },
    ]
    
    billingCompany: any = [];
    getCompany() {
        this.api.post({'dropdown_name': 'billing_company', 'module_id': this.modalData?.subModule?.sub_module_id},'dropdown/read-dropdown').subscribe(result => {
            if (result['statusCode'] === 200) {
                this.billingCompany = result?.data ?? []
            }
        });
    }
    
    
    
    
}
