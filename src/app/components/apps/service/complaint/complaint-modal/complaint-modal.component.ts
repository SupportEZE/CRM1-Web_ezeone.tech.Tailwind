import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ModalHeaderComponent } from '../../../../../shared/components/modal-header/modal-header.component';
import { ApiService } from '../../../../../core/services/api/api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import { LogService } from '../../../../../core/services/log/log.service';
import { FormValidationService } from '../../../../../utility/form-validation';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';

@Component({
  selector: 'app-complaint-modal',
  imports: [ReactiveFormsModule, MaterialModuleModule, SharedModule, CommonModule, FormsModule,ModalHeaderComponent],
  templateUrl: './complaint-modal.component.html',
  styleUrl: './complaint-modal.component.scss'
})
export class ComplaintModalComponent {
  data: any = {};
  skloader: boolean = false;
  poinLocationForm!: FormGroup;
  pageType: any = 'add'
  originalData: any = {};
  editId: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public modalData: any,
    public api: ApiService,
    public comanFuncation: ComanFuncationService,
    private dialogRef: MatDialogRef<ComplaintModalComponent>,
    private fb: FormBuilder,
    private logService: LogService,
    public toastr: ToastrServices,
    private formValidation: FormValidationService
  ) {
    this.data.status = modalData.status;
    this.data.reason = modalData.reason;
  }
  
  ngOnInit() {
    this.poinLocationForm = this.fb.group({
      lat: ['', Validators.required],
      long: ['', Validators.required],
    });
    
    if (this.modalData.pageType === 'point_location') {
      this.data = this.modalData.data;
      if (this.data) {
        this.originalData = this.data;
        this.poinLocationForm.patchValue(this.data);
        this.editId = this.data._id;
        this.pageType = this.data._id ? 'edit' : 'add'
      }
    }
  }
  
  statusChange() {
    this.skloader = true;
    this.comanFuncation.statusChange(this.data.status, this.modalData.DetailId, this.modalData.status, this.modalData.subModule, 'without-toggle', this.modalData.apiPath, this.data.reason, this.modalData.reason).subscribe((result: boolean) => {
      this.skloader = false;
      if (result) {
        this.dialogRef.close(true);
      }
    });
  }
  
  updateLocation() {
    if (this.poinLocationForm.valid) {
      this.poinLocationForm.value._id = this.modalData.DetailId;
      
      const isEditMode = this.pageType === 'edit';
      if (isEditMode) {
        const noChanges = this.logService.logActivityOnUpdate(
          isEditMode,
          this.originalData,
          this.poinLocationForm.value,
          this.modalData.submodule.module_id,
          this.modalData.submodule.title,
          'update',
          this.modalData.DetailId || null,
          () => { },
          this.modalData.submodule.module_type
        );
        if (noChanges) {
          this.api.disabled = false;
          this.toastr.warning('No changes detected', '', 'toast-top-right')
          return;
        }
      }
      this.api.disabled = true;
      this.api.patch(this.poinLocationForm.value, 'complaint/save-location').subscribe(result => {
        if (result['statusCode'] == 200) {
          this.api.disabled = false;
          this.dialogRef.close(true)
          this.toastr.success(result['message'], '', 'toast-top-right');
        }
      });
    }
    else {
      this.formValidation.markFormGroupTouched(this.poinLocationForm);
    }
  }
  
  closeModal() {
    this.dialogRef.close(); // Closes the dialog
  }
  
  
}
