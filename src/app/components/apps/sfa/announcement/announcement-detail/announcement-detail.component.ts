import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { ShowcodeCardComponent } from '../../../../../shared/components/showcode-card/showcode-card.component';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../../core/services/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModuleService } from '../../../../../shared/services/module.service';
import { LogService } from '../../../../../core/services/log/log.service';
import { FORMIDCONFIG } from '../../../../../../config/formId.config';
import { DateService } from '../../../../../shared/services/date.service';
import { NameUtilsService } from '../../../../../utility/name-utils';
import { SpkProductCardComponent } from '../../../../../../@spk/reusable-apps/spk-product-card/spk-product-card.component';

@Component({
    selector: 'app-announcement-detail',
    imports: [SharedModule,GalleryModule, ShowcodeCardComponent,CommonModule,MaterialModuleModule,SpkProductCardComponent],
    templateUrl: './announcement-detail.component.html',
})
export class AnnouncementDetailComponent {
    submodule:any;
    FORMID:any= FORMIDCONFIG;
    skLoading:boolean = false;
    DetailId:  any;
    Detail:any = {};
    
    constructor(public api:ApiService, public route:ActivatedRoute, public moduleService: ModuleService,public nameUtils: NameUtilsService) {}
    ngOnInit() {
        const subModule = this.moduleService.getSubModuleByName('SFA', 'Announcement');
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
        this.api.post({_id: this.DetailId}, 'announcement/detail').subscribe(result => {
            if (result['statusCode']  ===  200) {
                this.skLoading = false;
                this.Detail = result['data'];
            }
        });
    }
}
