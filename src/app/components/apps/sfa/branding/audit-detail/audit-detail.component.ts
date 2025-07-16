import { Component } from '@angular/core';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import { MatDialog } from '@angular/material/dialog';
import { LogService } from '../../../../../core/services/log/log.service';
import { ApiService } from '../../../../../core/services/api/api.service';
import { ActivatedRoute } from '@angular/router';
import { ModuleService } from '../../../../../shared/services/module.service';
import { NameUtilsService } from '../../../../../utility/name-utils';
import { StatusChangeModalComponent } from '../../../../../shared/components/status-change-modal/status-change-modal.component';
import { SpkProductCardComponent } from '../../../../../../@spk/reusable-apps/spk-product-card/spk-product-card.component';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { CommonModule } from '@angular/common';
import { ShowcodeCardComponent } from '../../../../../shared/components/showcode-card/showcode-card.component';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { SharedModule } from '../../../../../shared/shared.module';

@Component({
    selector: 'app-audit-detail',
    imports: [
        SharedModule,
        GalleryModule,
        ShowcodeCardComponent,
        CommonModule,
        MaterialModuleModule,
        SpkProductCardComponent
    ],
    templateUrl: './audit-detail.component.html',
    styleUrl: './audit-detail.component.scss'
})
export class AuditDetailComponent {
    Detail: any;
    subModule:any = {};
    DetailId:  any;
    auditDetailImages:any = [];
    auditCompetitorDetailImages:any = [];
    skLoading:boolean = false
    customerDetail: any = [];
    countDetail: any = [];
    logList:any=[];
    submoduleId:any =0;
    statusOptions = [
        {
            name:'Approved'
        },
        {
            name:'Reject'
        },
        {
            name:'Complete'
        },
        
    ]
    constructor(
        public nameUtils: NameUtilsService,
        public moduleService: ModuleService,
        public route: ActivatedRoute,
        public api:ApiService,
        private logService:LogService,    
        public dialog:MatDialog,
        private comanFuncation:ComanFuncationService
    ){}
    
    ngOnInit() {
        const subModule = this.moduleService.getSubModuleByName('SFA', 'Branding');
        if (subModule) {
            this.subModule = subModule;
        }
        this.route.paramMap.subscribe(params => {
            this.DetailId = params.get('id');
            if(this.DetailId){
                this.getAuditDetail();
            }
        });
    }
    
    getAuditDetail() {
        this.skLoading = true;
        this.auditDetailImages =[];
        this.api.post({ _id: this.DetailId }, 'brand-audit/detail-brand-audit').subscribe(result => {
            if (result['statusCode'] === 200) {
                this.skLoading = false;
                this.Detail = result['data'];
                this.countDetail = result['data']['count'];
                this.customerDetail = result['data']['customers'];
                this.auditDetailImages = result['data']['images'];
                this.auditCompetitorDetailImages = result['data']['competitor_images'];
                this.logService.getLogs(this.subModule.module_id, (logs) => {
                    this.logList = logs;
                },this.DetailId ? this.DetailId : '', this.subModule.module_type);
            }
        });
    }
    
    updateStatus()
    {
        const dialogRef = this.dialog.open(StatusChangeModalComponent, {
            width: '450px',
            data: {
                'lastPage':'branding',
                'DetailId':this.DetailId,
                'status':this.Detail.status,
                'reason':this.Detail.reason,
                'options':this.statusOptions,
                'subModule':this.subModule,
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result === true){
                this.getAuditDetail();
            }
        });
    }
    
    addAuditGallery(type: any){
        const dialogRef = this.dialog.open(StatusChangeModalComponent ,{
            width: '500px',
            data: {
                'type' : type,
                'lastPage':'branding-detail',
                'DetailId':this.DetailId,
                'status':this.Detail.status,
                'subModule':this.subModule,
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result === true){
                this.getAuditDetail();
            }
        });  
    }
    
    delete(id: string, api: string, label: string) {
        this.comanFuncation.delete(id, this.submoduleId, label, api, 'single_action', this.DetailId).subscribe((result: boolean) => {
            if (result === true) {
                this.getAuditDetail();
            }
        });
    }
}
