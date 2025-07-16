import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../../../core/services/api/api.service';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ModalHeaderComponent } from '../../../../../shared/components/modal-header/modal-header.component';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { FilePondModule } from 'ngx-filepond';
import { UploadFileService } from '../../../../../shared/services/upload.service';
import { CURRENCY_SYMBOLS } from '../../../../../utility/constants';
import { FormValidationService } from '../../../../../utility/form-validation';
import { DateService } from '../../../../../shared/services/date.service';
import { SpkFlatpickrComponent } from '../../../../../../@spk/spk-flatpickr/spk-flatpickr.component';
import { LogService } from '../../../../../core/services/log/log.service';
import { SweetAlertService } from '../../../../../core/services/alert/sweet-alert.service';

@Component({
    selector: 'app-expense-modal',
    imports: [ReactiveFormsModule,MaterialModuleModule,SharedModule,CommonModule,FormsModule,ModalHeaderComponent,SpkReusableTablesComponent,FilePondModule,SpkFlatpickrComponent],
    templateUrl: './expense-modal.component.html',
    styleUrl: './expense-modal.component.scss'
})
export class ExpenseModalComponent {
    CURRENCY_SYMBOLS = CURRENCY_SYMBOLS;
    data: any = {};
    expenseForm: FormGroup = new FormGroup({});
    eventExpenseForm: FormGroup = new FormGroup({});
    today= new Date();
    skLoading : boolean = false;
    expenseList: any[] = [];
    pondFiles: any[] = [];
    @ViewChild('filePond') pond: any;  // Get reference to FilePond
    pageType:any = 'add'
    submodule:any;
    
    
    constructor(@Inject(MAT_DIALOG_DATA) public modalData: any,private dialogRef: MatDialogRef<ExpenseModalComponent>,public api: ApiService,public toastr: ToastrServices, public uploadService: UploadFileService,private fb: FormBuilder,private formValidation: FormValidationService,private dateService: DateService, private logService: LogService, public alert:SweetAlertService){}
    
    
    ngOnInit() {
        if (this.modalData.lastPage == 'expense-modal') {
            this.getExpensePolicyType();
        }
        
        this.expenseForm = this.fb.group({
            expense_date: ['', Validators.required],
            expense_type: ['', Validators.required],
            km: [''],
            expense_type_unit: [''],
            expense_type_value: [''],
            expense_amount: [{value: '', disabled: true}, Validators.required],
            description: ['', Validators.required],
        });
        
        this.expenseForm.get('expense_type')?.valueChanges.subscribe((expense_type) => {
            if (expense_type === 'Car' || expense_type === 'Bike') {
                this.expenseForm.get('km')?.setValidators([Validators.required]);
            } 
            else{
                this.expenseForm.get('km')?.clearValidators();
            }
        });
    }
    
    expensePolicyType:any = [];
    getExpensePolicyType() {
        this.api.post({ 'user_id': this.modalData.expenseDetail.user_id }, 'expense/policy').subscribe(result => {
            if (result['statusCode'] === 200) {
                this.expensePolicyType = result['data'];
            }
        });
    }
    
    
    onSingleSelectChange(event: any)
    {
        const selectedValue = this.expensePolicyType.find((item: any) => item.value === event);
        if (selectedValue) {
            this.expenseForm.patchValue({ expense_type_unit: selectedValue.unit });
            this.expenseForm.patchValue({ expense_type_value: selectedValue.unit_value });
            this.expenseForm.patchValue({ expense_amount: '' });
            this.expenseForm.patchValue({ km: '' });
        }
        if(this.expenseForm.value.expense_type_unit !== 'km'){
            this.expenseForm.get('expense_amount')?.enable();
        }
        else {
            this.expenseForm.get('expense_amount')?.disable();
        }
    }
    
    onAmountCalculate(event: any)
    {
        const selectedValue = this.expensePolicyType.find((item: any) => item.value === this.expenseForm.value.expense_type);
        
        if (selectedValue) {
            const calculatedAmount = Number(event) * selectedValue.unit_value;
            this.expenseForm.patchValue({ expense_amount: calculatedAmount});
        }
    }
    
    onValueChange(event: any)
    {
        if (
            this.expenseForm.value.expense_type_unit === 'amount' &&
            this.expenseForm.value.expense_type_value > 0 &&
            event > this.expenseForm.value.expense_type_value
        ) {
            this.toastr.warning('Entered amount exceeds the assigned limit i.e. ' + this.expenseForm.value.expense_type_value, '', 'toast-top-right');           
            this.expenseForm.patchValue({ expense_amount: '' });
        }
        
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
    
    addToList() {
        if (this.expenseForm.invalid) {
            this.expenseForm.markAllAsTouched();
            return;
        }
        const formData = this.expenseForm.getRawValue();
        const newDate = this.dateService.formatToYYYYMMDD(new Date(formData.expense_date));
        
        const combinedList = [
            ...(this.expenseList || []),
            ...(this.modalData?.sub_expense || [])
        ];
        
        const isDuplicate = combinedList.some(item => {
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
        this.expenseForm.reset();
    }
    
    onSubmitExpenseData() {
        const expense_id = this.modalData.expenseId;
        const previousSubExpenses = this.modalData.sub_expense || [];
        const combinedSubExpenses = [...previousSubExpenses, ...this.expenseList];
        const payload = {
            expense_id,
            sub_expense: combinedSubExpenses
        };
        if (this.pondFiles.length === 0) {
            this.toastr.error('Please upload at least one file.', '', 'toast-top-right');
            return;
        }
        if (this.expenseList.length === 0) {
            this.toastr.error('Please upload at least one sub expense.', '', 'toast-top-right');
            return;
        }
        this.api.disabled = true;
        this.api.post(payload, 'expense/create-sub-expense').subscribe(result => {
            if (result.statusCode === 200) {
                if (this.pondFiles.length > 0){
                    this.api.disabled = true;
                    this.uploadService.uploadFile(result['data']['inserted_id'], 'expense', this.pondFiles, 'Expense Images', this.modalData.subModule, undefined, () => this.dialogRef.close(true))
                }
                else{
                    this.api.disabled = false;
                    this.toastr.success(result['message'], '', 'toast-top-right');
                    this.dialogRef.close(true);
                }
            }
        });
        
    }
    
    deleteExpense(index: number) {
        this.expenseList.splice(index, 1);
    }
    
    closeModal() {
        this.dialogRef.close(); // Closes the dialog
    }
    
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
    
    onInputChange(value: number) {
        if (value > this.modalData.claim_amount) {
            this.toastr.warning('Entered amount should not be greater than the claim amount i.e. ' + this.modalData.claim_amount, '', 'toast-top-right')
            this.data.approved_amount = '';
        }
    }
    
    headerColumn=[
        {label:"S.No", table_class :"text-center"},
        {label:"Expense Date", table_class :""},
        {label:"Expense Type", table_class :""},
        {label:"Expense Amount", table_class :""},
        {label:"Description", table_class :""},
        {label:"Action", table_class :"text-center"},
    ]
    
    expenseStatusOptions = [
        {
            name: 'Submitted'
        },
        {
            name: 'Approved'
        },
        {
            name: 'Paid'
        },
        {
            name: 'Reject'
        },
    ]
}
