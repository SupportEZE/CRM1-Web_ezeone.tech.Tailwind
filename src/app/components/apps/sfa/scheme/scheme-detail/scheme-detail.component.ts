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
import { ModalHeaderComponent } from '../../../../../shared/components/modal-header/modal-header.component';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';

@Component({
  selector: 'app-scheme-detail',
  imports: [
    SharedModule,GalleryModule,
    ShowcodeCardComponent,
    CommonModule,
    MaterialModuleModule,
    SpkProductCardComponent,
  ],
  templateUrl: './scheme-detail.component.html',
})
export class SchemeDetailComponent {
  submodule:any;
  FORMID:any= FORMIDCONFIG;
  skLoading:boolean = false;
  DetailId:  any;
  Detail:any = {};
  productDetail:any= {};
  schemeImages:any = [];
  
  constructor(
    public api:ApiService,
    public route:ActivatedRoute,
    public moduleService: ModuleService,
    public nameUtils: NameUtilsService,
    private comanFuncation:ComanFuncationService
  ) {}
  ngOnInit() {
    const submodule = this.moduleService.getSubModuleByName('SFA', 'Order');
    const subSubModule = this.moduleService.getSubSubModuleByName('SFA', 'Order', 'Scheme');
    if (subSubModule) {
      this.submodule = subSubModule;
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
    this.schemeImages =[];
    this.api.post({scheme_id: this.DetailId}, 'order/scheme-detail').subscribe(result => {
      if (result['statusCode']  ===  200) {
        this.skLoading = false;
        this.Detail = result['data'];
        this.productDetail = result['data']['product_data'];
        this.schemeImages = result['data']['files'];
      }
    });
  }
  
  delete(id: string, api: string, label: string) {
    this.comanFuncation.delete(id, this.submodule, label, api, 'single_action', this.DetailId).subscribe((result: boolean) => {
        if (result === true) {
            this.getDetail();
        }
    });
  }

  productList = [
    { product: 'Product 1' },
    { product: 'Product 2' },
    { product: 'Product 3' },
    { product: 'Product 4' },
    { product: 'Product 5' },
    { product: 'Product 6' },
    { product: 'Product 7' },
    { product: 'Product 8' },
    { product: 'Product 9' },
    { product: 'Product 10' }
  ];
  
  // Detail = {
  //   created_at: '1 May 2025, 07:10 PM',
  //   created_name: 'EzeOne Development',
  //   start_date: '1 May 2025',
  //   end_date: '1 May 2025',
  //   description: 'Lorem ipsum dolor sit amet.',
  //   status: 'Active',
  //   updated_at: '2 May 2025, 09:30 AM'
  // };
}



