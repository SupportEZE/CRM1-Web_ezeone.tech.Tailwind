import { Component } from '@angular/core';
import { LogService } from '../../../../../core/services/log/log.service';
import { ModuleService } from '../../../../../shared/services/module.service';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../../../core/services/api/api.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SweetAlertService } from '../../../../../core/services/alert/sweet-alert.service';
import { Lightbox, LightboxModule } from 'ng-gallery/lightbox';
import { FORMIDCONFIG } from '../../../../../../config/formId.config';
import Swal from 'sweetalert2';
import { LogsComponent } from '../../../../../shared/components/logs/logs.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { ShowcodeCardComponent } from '../../../../../shared/components/showcode-card/showcode-card.component';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { CommonModule } from '@angular/common';
import { SpkGalleryComponent } from '../../../../../../@spk/spk-reusable-plugins/spk-gallery/spk-gallery.component';
import { StatusChangeModalComponent } from '../../../../../shared/components/status-change-modal/status-change-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { DateService } from '../../../../../shared/services/date.service';
import { SpkProductCardComponent } from '../../../../../../@spk/reusable-apps/spk-product-card/spk-product-card.component';

@Component({
    selector: 'app-leave-detail',
    imports: [SharedModule, RouterModule, ShowcodeCardComponent, LightboxModule, GalleryModule, CommonModule, LogsComponent, SpkProductCardComponent],
    templateUrl: './leave-detail.component.html',
})
export class LeaveDetailComponent {
    FORMID:any= FORMIDCONFIG;
    logList:any=[];
    Detail: any;
    formattedKeysFormData: { [key: string]: any } = {};
    formattedKeysRecentActivities: { [key: string]: any } = {};
    leaveDetailFormData:any;
    skLoading : boolean = false;
    subModule:any = {};
    accessRight:any = {};
    
    constructor(
        public lightbox: Lightbox,
        private router: Router,
        public alert:SweetAlertService,
        public route: ActivatedRoute,
        public api:ApiService, 
        private toastr: ToastrService,
        private moduleService: ModuleService, 
        private logService:LogService,
        public dialog:MatDialog,
        private dateService: DateService
    ) {}
    
    leaveId: any;
    ngOnInit() {
        const accessRight = this.moduleService.getAccessMap('SFA', 'Leave');
        if (accessRight) {
            this.accessRight = accessRight;
        }
        const subModule = this.moduleService.getSubModuleByName('SFA', 'Leave');
        if (subModule) {
            this.subModule = subModule;
        }
        
        this.route.paramMap.subscribe(params => {
            this.leaveId = params.get('id');
            if(this.leaveId){
                this.getLeaveDetail();
            }
        });
    }
    
    getLeaveDetail() {
        this.skLoading = true;
        this.api.post({leave_id: this.leaveId}, 'leave/leave-detail').subscribe(result => {
            if (result['statusCode']  ===  200) {
                this.skLoading = false
                this.Detail = result['data'];
                this.leaveDetailFormData = result['data']['form_data'];
                this.Detail = this.dateService.formatToDDMMYYYY(this.Detail);
                this.logService.getLogs(this.subModule.module_id, (logs) => {
                    this.logList = logs;
                },this.leaveId ? this.leaveId : '',this.subModule.module_type);
                this.formattedKeysFormData = this.formatAndPrintFormData(this.leaveDetailFormData);
                delete this.formattedKeysFormData['Files']
                
            }
        });
    }
    
    formatAndPrintFormData(form: any) {
        const formattedObject: { [key: string]: any } = {};
        for (let key in form) {
            if (form.hasOwnProperty(key)) {
                const formattedKey = key
                .split('_') 
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' '); 
                formattedObject[formattedKey] = form[key]; 
            }
        }
        return formattedObject;
    }
    
    
    onDeleteImage(data: any) {
        this.api.disabled = true;
        this.alert.confirm("Are you sure you want to delete this?", "Once deleted, this item cannot be restored.", "Delete it!")
        .then(result => {
            if (result.isConfirmed) {
                this.api.patch({'_id': this.leaveId , 'file_id' : data.file_id, 'file_path':data.filepath}, 'leave/delete-file').subscribe(result => {
                    if (result['statusCode']  ===  200) {
                        this.api.disabled = false;
                        Swal.fire('Deleted!', result.message, 'success');
                        this.logService.logActivityOnDelete(this.subModule.module_id, this.subModule.module_name, 'delete', data.file_id);
                        this.getLeaveDetail();
                    }
                });
            }
        });
    }
    
    updateStatus()
    {
        const dialogRef = this.dialog.open(StatusChangeModalComponent, {
            width: '450px',
            data: {
                'lastPage':'leave-detail',
                'leaveId':this.leaveId,
                'status':this.Detail.status,
                'subModule':this.subModule
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result === true){
                this.getLeaveDetail();
            }
        });
    }
    
    
    
}
