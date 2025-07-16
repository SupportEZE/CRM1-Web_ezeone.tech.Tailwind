import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { Image , GalleryModule } from '@ks89/angular-modal-gallery';
import { ShowcodeCardComponent } from '../../../../../shared/components/showcode-card/showcode-card.component';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { NameUtilsService } from '../../../../../utility/name-utils';
import { ModuleService } from '../../../../../shared/services/module.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../../core/services/api/api.service';
import { CURRENCY_SYMBOLS, EDIT_STATUS_PEN_APP } from '../../../../../utility/constants';
import { LogService } from '../../../../../core/services/log/log.service';
import { StatusChangeModalComponent } from '../../../../../shared/components/status-change-modal/status-change-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { SpkProductCardComponent } from '../../../../../../@spk/reusable-apps/spk-product-card/spk-product-card.component';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import { EDIT_STATUS_PEN_REJ } from '../../../../../utility/constants';


@Component({
    selector: 'app-event-detail',
    imports: [SharedModule,GalleryModule, ShowcodeCardComponent,CommonModule,MaterialModuleModule,SpkProductCardComponent],
    templateUrl: './event-plan-detail.component.html',
})
export class EventPlanDetailComponent {
    CURRENCY_SYMBOLS = CURRENCY_SYMBOLS;
    EDIT_STATUS_PEN_REJ = EDIT_STATUS_PEN_REJ;
    EDIT_STATUS_PEN_APP = EDIT_STATUS_PEN_APP;
;
    subModule:any = {};
    DetailId:  any;
    Detail: any;
    countDetail: any = [];
    skLoading:boolean = false
    customerDetail: any = [];
    participantDetail:any = [];
    eventDetail:any = [];
    stats:any = [];
    logList:any=[];
    eventDetailImages:any = [];
    eventExpenseDetailImages:any = [];
    accessRight:any = {};
    
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
        const accessRight = this.moduleService.getAccessMap('SFA', 'Event Plan');
        if (accessRight) {
            this.accessRight = accessRight;
        }
        
        const subModule = this.moduleService.getSubModuleByName('SFA', 'Event Plan');
        if (subModule) {
            this.subModule = subModule;
        }
        
        this.route.paramMap.subscribe(params => {
            this.DetailId = params.get('id');
            
            if(this.DetailId){
                this.getEventDetail();
            }
        });
    }
    
    getEventDetail() {
        this.skLoading = true;
        this.eventDetailImages =[];
        this.eventExpenseDetailImages= [];
        this.api.post({ _id: this.DetailId }, 'event/detail').subscribe(result => {
            if (result['statusCode'] === 200) {
                this.skLoading = false;
                this.Detail = result['data'];
                this.countDetail = result['data']['count'];
                this.customerDetail = result['data']['customers'];
                this.participantDetail = result['data']['participant_data'];
                this.eventDetail = result['data']['expense_data'];
                this.eventDetailImages = result['data']['files'];
                this.eventExpenseDetailImages = result['data']['expense_files'];
                this.logService.getLogs(this.subModule.module_id, (logs) => {
                    this.logList = logs;
                },this.DetailId ? this.DetailId : '',this.subModule.module_type);
                this.stats = [
                    { icon: 'ri-group-line', label: 'Total', value: this.countDetail.totalCount || 0, color: 'primary', percent: this.countDetail.successRatePercent + '%' },
                    { icon: 'ri-repeat-line', label: 'Repeated', value: this.countDetail.repeatCustomerCount || 0, color: 'info', percent: this.countDetail.successRatePercent + '%' },
                    { icon: 'ri-add-circle-line', label: 'New', value: this.countDetail.newCustomerCount || 0, color: 'secondary', percent: this.countDetail.successRatePercent + '%' },
                    { icon: 'ri-user-add-line', label: 'Win', value: this.countDetail.winCount || 0, color: 'primary', percent: this.countDetail.successRatePercent + '%' },
                ];
                // this.chartOptions2.series = [this.countDetail.successRatePercent];
            }
        });
    }
    

    statusOptions = [
        {name:'Approved'},
        {name:'Reject'},
        {name:'Complete'},
    ]
    
    updateStatus()
    {
        const dialogRef = this.dialog.open(StatusChangeModalComponent, {
            width: '450px',
            data: {
                'lastPage':'event-plan',
                'DetailId':this.DetailId,
                'status':this.Detail.status,
                'reason':this.Detail.reason,
                'options':this.statusOptions,
                'subModule':this.subModule,
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result === true){
                this.getEventDetail();
            }
        });
    }
    
    addEventModal(){
        const dialogRef = this.dialog.open(StatusChangeModalComponent, {
            width: '500px',
            data: {
                'lastPage':'event-participants-modal',
                'DetailId':this.DetailId,
                'status':this.Detail.status,
                'subModule':this.subModule,
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result === true){
                this.getEventDetail();
            }
        });  
    }
    
    addEventGallery(){
        const dialogRef = this.dialog.open(StatusChangeModalComponent, {
            width: '500px',
            data: {
                'lastPage':'event-gallery-modal',
                'DetailId':this.DetailId,
                'status':this.Detail.status,
                'subModule':this.subModule,
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result === true){
                this.getEventDetail();
            }
        });  
    }
    
    addEventExpenseModal(){
        const dialogRef = this.dialog.open(StatusChangeModalComponent, {
            width: '800px',
            data: {
                'lastPage':'event-expense-modal',
                'DetailId':this.DetailId,
                'eventDetail':this.Detail,
                'status':this.Detail.status,
                'subModule':this.subModule,
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result === true){
                this.getEventDetail();
            }
        });  
    }
    
    delete(id: string, api: string, label: string) {
        this.comanFuncation.delete(id, this.subModule, label, api, 'single_action', this.DetailId).subscribe((result: boolean) => {
            if (result === true) {
                this.getEventDetail();
            }
        });
    }
    
}
