import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalHeaderComponent } from '../../../../../shared/components/modal-header/modal-header.component';
import { SpkNgSelectComponent } from '../../../../../../@spk/spk-ng-select/spk-ng-select.component';
import { LogService } from '../../../../../core/services/log/log.service';
import { FormValidationService } from '../../../../../utility/form-validation';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../../../core/services/api/api.service';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';


@Component({
    selector: 'app-announcement-modal',
    imports: [SharedModule, CommonModule, MaterialModuleModule,FormsModule,ReactiveFormsModule,ModalHeaderComponent, SpkNgSelectComponent],
    templateUrl: './announcement-modal.component.html',
})
export class AnnouncementModalComponent {
    statusForm!: FormGroup;
    editId:any;
    data:any ={}
    originalData:any={};
    pageType:any ='add'
    
    statusTypeList = [
        { label: 'Published', value: 'Published' },
        { label: 'Unpublished', value: 'Unpublished' },
    ];
    
    constructor(private fb: FormBuilder, private formValidation: FormValidationService, private logService: LogService,@Inject(MAT_DIALOG_DATA) public modalData: any,public dialogRef: MatDialogRef<AnnouncementModalComponent>,public api:ApiService,public toastr: ToastrServices){
        
    }
    
    ngOnInit(){
        this.statusForm = this.fb.group({
            status: ['Published', Validators.required],
        });
        
        
        if(this.modalData.pageType === 'edit'){
            this.data = this.modalData.rowData;
            if(this.data){
                this.originalData = this.data;
                this.statusForm.patchValue(this.data);   
                this.editId = this.data._id;
                this.pageType = this.data._id ? 'edit' :'add'
            }
        }
    }
    
    
    updateStatus() {
        if (this.statusForm.valid) {
            if(this.editId){
                this.statusForm.value._id = this.editId;
            }
            
            const isEditMode = this.pageType === 'edit';
            if (isEditMode) {
                const noChanges = this.logService.logActivityOnUpdate(
                    isEditMode, 
                    this.originalData, 
                    this.statusForm.value, 
                    this.modalData.modules.module_id, 
                    this.modalData.modules.title, 
                    'update', 
                    this.editId || null,
                    () => {},
                    this.modalData.modules.module_type
                );
                if (noChanges) {
                    this.api.disabled = false;
                    this.toastr.warning('No changes detected', '', 'toast-top-right')
                    return ;
                }
            }
            
            this.api.disabled = true;
            this.api.patch(this.statusForm.value, 'announcement/update-status').subscribe(result => {
                if(result['statusCode'] == 200){
                    this.api.disabled = false;
                    this.dialogRef.close(true)
                    this.toastr.success(result['message'], '', 'toast-top-right');
                }
            });
        }
        else{
            this.formValidation.markFormGroupTouched(this.statusForm);
        }
    }

    closeModal() {
        this.dialogRef.close(); // Closes the dialog
    }
    
}
