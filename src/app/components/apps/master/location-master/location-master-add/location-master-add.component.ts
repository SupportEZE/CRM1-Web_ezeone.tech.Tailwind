import { Component, Inject } from '@angular/core';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { ShowcodeCardComponent } from '../../../../../shared/components/showcode-card/showcode-card.component';
import { ApiService } from '../../../../../core/services/api/api.service';
import { SpkNgSelectComponent } from '../../../../../../@spk/spk-ng-select/spk-ng-select.component';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { SharedModule } from '../../../../../shared/shared.module';
import { SweetAlertService } from '../../../../../core/services/alert/sweet-alert.service';
import { LogService } from '../../../../../core/services/log/log.service';
import { LogsComponent } from '../../../../../shared/components/logs/logs.component';
import { CommonApiService } from '../../../../../shared/services/common-api.service';
import { ModuleService } from '../../../../../shared/services/module.service';

@Component({
    selector: 'app-location-master-add',
    imports: [SharedModule,MaterialModuleModule, CommonModule, NgxEditorModule, ShowcodeCardComponent, FormsModule, LogsComponent],
    templateUrl: './location-master-add.component.html'
})
export class LocationMasterAddComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public modalData: any,public api: ApiService, public toastr: ToastrServices, private dialogRef: MatDialogRef<LocationMasterAddComponent>,public alert : SweetAlertService, private logService: LogService,public CommonApiService: CommonApiService, public moduleService: ModuleService){}
    data:any ={};
    originalData:any ={};
    districtList:any =[]
    logList:any =[]
    skLoading:boolean = false
    lastPageRowId:string = '';
    subModule:any={};
    
    ngOnInit() {
        
        const modules = this.moduleService.getSubModuleByName('Masters', 'Location Master');
        if (modules) {
            this.subModule = modules;
        }
        
        
        if (this.modalData.formType === 'edit') {
            this.CommonApiService.getStates()
            this.skLoading = true;
            setTimeout(() => {
                let filteredData = {};
                
                if (this.modalData.lastPage === 'Pincode') {
                    filteredData = this.modalData.formData ? { 
                        state: this.modalData.formData.state, 
                        district: this.modalData.formData.district, 
                        city: this.modalData.formData.city, 
                        pincode: this.modalData.formData.pincode,
                        _id: this.modalData.formData._id 
                    } : {};
                } 
                else if (this.modalData.lastPage === 'Zone') {
                    filteredData = this.modalData.formData ? { 
                        zone: this.modalData.formData.zone, 
                        state: this.modalData.formData.state, 
                        _id: this.modalData.formData._id 
                    } : {};
                } 
                else if (this.modalData.lastPage === 'Beat Route') {
                    filteredData = this.modalData.formData ? { 
                        state: this.modalData.formData.state, 
                        district: this.modalData.formData.district, 
                        description: this.modalData.formData.description,
                        _id: this.modalData.formData._id 
                    } : {};
                }
                // this.data = { ...this.modalData.formData };
                this.data = filteredData;
                this.originalData = this.modalData.formData;
                
                if (this.data.state && (this.modalData.lastPage === 'Pincode' || this.modalData.lastPage === 'Beat Route')) {
                    this.getDistrict(this.data.state);
                }
                
                this.skLoading = false;
            }, 500);
        } else {
            this.CommonApiService.getStates()
            this.data = {};
            this.skLoading = false;
        }
        
        if (this.modalData.lastPage === 'logs'){
            this.lastPageRowId = this.modalData.formData._id
            this.logService.getLogs(this.subModule.module_id, (logs) => {
                this.logList = logs;
            }, 
            this.lastPageRowId ?  this.lastPageRowId : '',
            this.subModule.module_type
        );
    }
}

close() {
    this.dialogRef.close(); // Closes the dialog
}


getDistrict(state:string){
    this.api.post({"state": state,}, 'postal-code/districts').subscribe(result => {
        if(result['statusCode'] == 200){
            this.districtList = result['data']
        }
    });
}

onSubmitPincode() {
    this.api.disabled = true;
    const isEditMode = this.modalData.formType === 'edit';
    const functionName = isEditMode ? 'postal-code/update' : 'postal-code/create';
    const httpMethod = isEditMode ? 'patch' : 'post';
    
    this.api[httpMethod](this.data, functionName).subscribe(result => {
        if (result.statusCode === 200) {
            this.api.disabled = false;
            this.logService.logActivityOnUpdate(isEditMode, this.originalData, this.data, this.subModule.module_id, this.subModule.title, 'update', this.data._id || null, () => {}, this.subModule.module_type);
            this.toastr.success(result['message'], '', 'toast-top-right');
            this.dialogRef.close(true);
        }
    });
}

onSubmiZone() {
    this.api.disabled = true;
    const isEditMode = this.modalData.formType === 'edit';
    const functionName = isEditMode ? 'zone-master/update' : 'zone-master/create';
    const httpMethod = isEditMode ? 'patch' : 'post';
    this.api[httpMethod](this.data, functionName).subscribe(result => {
        if(result['statusCode'] === 200){
            this.api.disabled = false;
            this.logService.logActivityOnUpdate(isEditMode, this.originalData, this.data, this.subModule.module_id, this.subModule.title, 'update', this.data._id || null, () => {}, this.subModule.module_type);
            this.toastr.success(result['message'], '', 'toast-top-right');
            this.dialogRef.close(true);
        }
        else if (result['statusCode'] === 202) {
            this.api.disabled = false;
            this.alert.confirm("Are you sure? " , result['message'])
            .then((res) => {
                if (res.isConfirmed) {
                    this.data.forcefully = true;
                    this.data.responseData = result['data'];
                    
                    this.onSubmiZone();
                }
            });
        }
    });
}

onSubmiBeatCode() {
    this.api.disabled = true;
    const isEditMode = this.modalData.formType === 'edit';
    const functionName = isEditMode ? 'beat-route/update' : 'beat-route/create';
    const httpMethod = isEditMode ? 'patch' : 'post';
    this.api[httpMethod](this.data, functionName).subscribe(result => {
        if(result['statusCode'] === 200){
            this.api.disabled = false;
            this.logService.logActivityOnUpdate(isEditMode, this.originalData, this.data, this.subModule.module_id, this.subModule.title, 'update', this.data._id || null, () => {}, this.subModule.module_type);
            this.toastr.success(result['message'], '', 'toast-top-right');
            this.dialogRef.close(true);
        }
    });
}
}
