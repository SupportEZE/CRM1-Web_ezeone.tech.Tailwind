import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { ShowcodeCardComponent } from '../../../../../shared/components/showcode-card/showcode-card.component';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../../core/services/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModuleService } from '../../../../../shared/services/module.service';
import { FORMIDCONFIG } from '../../../../../../config/formId.config';
import { NameUtilsService } from '../../../../../utility/name-utils';
import { CURRENCY_SYMBOLS, LOGIN_TYPES } from '../../../../../utility/constants';
import { SpkProductCardComponent } from '../../../../../../@spk/reusable-apps/spk-product-card/spk-product-card.component';

@Component({
    selector: 'app-payment-collection-detail',
    imports: [SharedModule,GalleryModule, ShowcodeCardComponent,CommonModule,MaterialModuleModule,SpkProductCardComponent],
    templateUrl: './payment-collection-detail.component.html',
})
export class PaymentCollectionDetailComponent {
    submodule:any;
    FORMID:any= FORMIDCONFIG;
    skLoading:boolean = false;
    DetailId:  any;
    Detail:any = {};
    CURRENCY_SYMBOLS = CURRENCY_SYMBOLS;
    
    constructor(public api:ApiService, public route:ActivatedRoute, public moduleService: ModuleService,public nameUtils: NameUtilsService) {}
    
    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.DetailId = params.get('id');
            if(this.DetailId){
                this.getDetail();
            }
        });
    }
    
    getDetail() {
        this.skLoading = true;
        this.api.post({_id: this.DetailId}, 'payment/detail').subscribe(result => {
            if (result['statusCode']  ===  200) {
                this.skLoading = false;
                this.Detail = result['data'];
            }
        });
    }
    
}
