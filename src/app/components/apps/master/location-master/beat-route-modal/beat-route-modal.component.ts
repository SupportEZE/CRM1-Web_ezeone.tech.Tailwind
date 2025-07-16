import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../../../core/services/api/api.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../../shared/shared.module';
import { ModalHeaderComponent } from '../../../../../shared/components/modal-header/modal-header.component';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { SpkNgSelectComponent } from '../../../../../../@spk/spk-ng-select/spk-ng-select.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormValidationService } from '../../../../../utility/form-validation';
import { Validators } from 'ngx-editor';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { CommonApiService } from '../../../../../shared/services/common-api.service';
import { LOGIN_TYPES } from '../../../../../utility/constants';
@Component({
    selector: 'app-beat-route-modal',
    imports: [CommonModule, SharedModule, ModalHeaderComponent,MaterialModuleModule, SpkNgSelectComponent],
    templateUrl: './beat-route-modal.component.html',
    styleUrl: './beat-route-modal.component.scss'
})
export class BeatRouteModalComponent {
    statusForm: FormGroup = new FormGroup({});
    
    constructor(@Inject(MAT_DIALOG_DATA) public modalData: any, private dialogRef: MatDialogRef<BeatRouteModalComponent>, public api: ApiService, private fb: FormBuilder,private formValidation: FormValidationService,private toastr: ToastrServices,public CommonApiService: CommonApiService){}
    
    ngOnInit()
    {
        this.CommonApiService.getUserData()
        this.statusForm = this.fb.group({
            user_id: ['', Validators.required],
        });
    }
    
    onSearch(search: string, type: any) {
        if(type === 'user'){
            this.CommonApiService.getUserData([LOGIN_TYPES.FIELD_USER], search) 
        }
    }
    
    onSubmitAssigning()
    {
        if (this.statusForm.invalid) {
            this.statusForm.markAllAsTouched();
            return
        }
        const payload = {
            ...this.statusForm.value,
            beat_route_code: this.modalData.selectedRows
        };
        
        this.api.disabled = true;
        this.api.patch(payload, 'beat-route/assign-beat').subscribe(result => {
            if (result['statusCode'] === 200) {
                this.api.disabled = false;
                this.toastr.success(result['message'], '', 'toast-top-right');
                this.dialogRef.close(true)
            }                
        }); 
    }
    
    close() {
        this.dialogRef.close(); // Closes the dialog
    }
}
