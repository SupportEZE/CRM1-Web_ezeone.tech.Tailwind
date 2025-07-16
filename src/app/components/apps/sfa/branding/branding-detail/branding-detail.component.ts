import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import { LogService } from '../../../../../core/services/log/log.service';
import { ApiService } from '../../../../../core/services/api/api.service';
import { ActivatedRoute } from '@angular/router';
import { ModuleService } from '../../../../../shared/services/module.service';
import { NameUtilsService } from '../../../../../utility/name-utils';
import { SpkProductCardComponent } from '../../../../../../@spk/reusable-apps/spk-product-card/spk-product-card.component';
import { SpkApexchartsComponent } from '../../../../../../@spk/spk-apexcharts/apexcharts.component';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { CommonModule } from '@angular/common';
import { ShowcodeCardComponent } from '../../../../../shared/components/showcode-card/showcode-card.component';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { StatusChangeModalComponent } from '../../../../../shared/components/status-change-modal/status-change-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { BrandingModalComponent } from '../branding-modal/branding-modal.component';

@Component({
    selector: 'app-branding-detail',
    imports: [
        SharedModule,
        GalleryModule,
        ShowcodeCardComponent,
        CommonModule,
        MaterialModuleModule,
        SpkProductCardComponent
    ],
    templateUrl: './branding-detail.component.html',
    styleUrl: './branding-detail.component.scss'
})
export class BrandingDetailComponent {
    Detail: any;
    subModule:any = {};
    DetailId:  any;
    brandDetailImages:any = [];
    skLoading:boolean = false
    customerDetail: any = [];
    countDetail: any = [];
    logList:any=[];
    accessRight:any = {};
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
        const accessRight = this.moduleService.getAccessMap('SFA', 'Branding');
        if (accessRight) {
            this.accessRight = accessRight;
        }
        
        const subModule = this.moduleService.getSubModuleByName('SFA', 'Branding');
        if (subModule) {
            this.subModule = subModule;
        }
        this.route.paramMap.subscribe(params => {
            this.DetailId = params.get('id');
            if(this.DetailId){
                this.getBrandDetail();
            }
        });
    }
    
    getBrandDetail() {
        this.skLoading = true;
        this.brandDetailImages =[];
        this.api.post({ _id: this.DetailId }, 'brand-audit/detail').subscribe(result => {
            if (result['statusCode'] === 200) {
                this.skLoading = false;
                this.Detail = result['data'];
                this.countDetail = result['data']['count'];
                this.customerDetail = result['data']['customers'];
                this.brandDetailImages = result['data']['files'];
                this.logService.getLogs(this.subModule.module_id, (logs) => {
                    this.logList = logs;
                },this.DetailId ? this.DetailId : '', this.subModule.module_type);
            }
        });
    }
    
    // updateStatus()
    // {
    //   const dialogRef = this.dialog.open(StatusChangeModalComponent, {
    //     width: '450px',
    //     data: {
    //       'lastPage':'branding',
    //       'DetailId':this.DetailId,
    //       'status':this.Detail.status,
    //       'reason':this.Detail.reason,
    //       'options':this.statusOptions,
    //       'subModule':this.subModule,
    //     }
    //   });
    //   dialogRef.afterClosed().subscribe(result => {
    //     if(result === true){
    //       this.getBrandDetail();
    //     }
    //   });
    // }
    
    addBrandGallery(){
        const dialogRef = this.dialog.open(StatusChangeModalComponent, {
            width: '500px',
            data: {
                'lastPage':'branding-gallery-modal',
                'DetailId':this.DetailId,
                'status':this.Detail.status,
                'subModule':this.subModule,
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result === true){
                this.getBrandDetail();
            }
        });  
    }
    
    delete(id: string, api: string, label: string) {
        this.comanFuncation.delete(id, this.subModule, label, api, 'single_action', this.DetailId).subscribe((result: boolean) => {
            if (result === true) {
                this.getBrandDetail();
            }
        });
    }
    
    statusChange(rowId:any) {
        const dialogRef = this.dialog.open(BrandingModalComponent, {
            width: '400px',
            data: {
                'lastPage':'branding-list',
                'DetailId':rowId,
                'options':this.statusOptions,
                'subModule':this.subModule,
                'status':this.Detail.status,
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result === true){
                this.getBrandDetail();
            }
        });
    }
}
