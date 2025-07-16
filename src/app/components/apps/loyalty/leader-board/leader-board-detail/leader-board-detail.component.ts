import { Component, ElementRef, ViewChild } from '@angular/core';
import { GalleryItem, Gallery, ImageItem, ImageSize, ThumbnailsPosition } from 'ng-gallery';
import { Lightbox, LightboxModule } from 'ng-gallery/lightbox';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { GoogleMap } from '@angular/google-maps';
import { ActivatedRoute, Router } from '@angular/router';
import { ModuleService } from '../../../../../shared/services/module.service';
import { FORMIDCONFIG } from '../../../../../../config/formId.config';
import { ApiService } from '../../../../../core/services/api/api.service';
import { DateService } from '../../../../../shared/services/date.service';
import { MatDialog } from '@angular/material/dialog';
// import { CustomerModalComponent } from '../customer-modal/customer-modal.component';
import { ShowcodeCardComponent } from '../../../../../shared/components/showcode-card/showcode-card.component';
import { Image, GalleryModule } from '@ks89/angular-modal-gallery';
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { register } from 'swiper/element';
import { LogService } from '../../../../../core/services/log/log.service';
import { LogsComponent } from '../../../../../shared/components/logs/logs.component';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import { NameUtilsService } from '../../../../../utility/name-utils';
import { SpkProductCardComponent } from '../../../../../../@spk/reusable-apps/spk-product-card/spk-product-card.component';

Swiper.use([Autoplay, Navigation, Pagination]);
register();
@Component({
    selector: 'app-leader-board-detail',
    imports: [SharedModule,GalleryModule, ShowcodeCardComponent,CommonModule,MaterialModuleModule,SpkProductCardComponent],
    templateUrl: './leader-board-detail.component.html'
})

export class leaderBoardDetailComponent {
    submodule:any;
    FORMID:any= FORMIDCONFIG;
    skLoading:boolean = false;
    DetailId:  any;
    Detail:any = {};
    // giftImageData:any =[];
    logList:any=[];
    today = new Date();
    
    constructor(public gallery: Gallery, public api:ApiService, public lightbox: Lightbox, public route:ActivatedRoute, public moduleService: ModuleService, private logService:LogService, public date:DateService, public dialog:MatDialog, private router: Router,private dateService : DateService,private comanFuncation:ComanFuncationService, public nameUtils: NameUtilsService) {}
    ngOnInit() {
        const subModule = this.moduleService.getSubModuleByName('IRP', 'Leader Board');
        if (subModule) {
            this.submodule = subModule;
        }
        
        this.route.paramMap.subscribe(params => {
            
            this.DetailId = params.get('id');
            
            if(this.DetailId){
                this.getDetail();
            }
        });
    }
    
    getDetail() {
        this.skLoading = true;
        this.api.post({_id: this.DetailId}, 'leader-board/detail').subscribe(result => {
            if (result['statusCode']  ===  200) {
                this.skLoading = false;
                this.Detail = result['data'];
                
                // Logs Fetch //
                this.logService.getLogs(this.submodule.module_id, (logs) => {
                    this.logList = logs;
                }, this.DetailId ? this.DetailId : '',this.submodule.module_type);
                // Logs Fetch //
                
            }
        });
    }
    
    // delete funcation start //
    delete(id: string, api:string, label:string) {
        this.comanFuncation.delete(id, this.submodule, label, api, 'single_action',this.DetailId).subscribe((result: boolean) => {
            if (result === true) {
                this.getDetail();
            }
        });
    }
    // delete funcation end
    
    editPage(){
        // this.router.navigate(['/apps/loyalty/leader-board/leader-board-detail/'+ this.DetailId +'/edit']);
    }
}
