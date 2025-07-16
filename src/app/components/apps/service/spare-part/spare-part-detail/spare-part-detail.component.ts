import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { ShowcodeCardComponent } from '../../../../../shared/components/showcode-card/showcode-card.component';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { NameUtilsService } from '../../../../../utility/name-utils';
import { ApiService } from '../../../../../core/services/api/api.service';
import { FORMIDCONFIG } from '../../../../../../config/formId.config';
import { ActivatedRoute } from '@angular/router';
import { ModuleService } from '../../../../../shared/services/module.service';

@Component({
  selector: 'app-spare-part-detail',
  imports: [CommonModule,SharedModule,ShowcodeCardComponent,SpkReusableTablesComponent],
  templateUrl: './spare-part-detail.component.html',
})
export class SparePartDetailComponent {
  submodule:any;
  FORMID:any= FORMIDCONFIG;
  skLoading:boolean = false;
  DetailId:  any;
  Detail:any = {};
  activeTab: string = 'Incoming';
  listingActiveTab:any
  
  constructor(public api:ApiService, public route:ActivatedRoute, public moduleService: ModuleService,public nameUtils: NameUtilsService) {}

  ngOnInit() {
    const subModule = this.moduleService.getSubModuleByName('SFA', 'Pop Gift');
    if (subModule) {
      this.submodule = subModule;
    }
    
    this.route.paramMap.subscribe(params => {
      this.listingActiveTab = params.get('activeTab');
      this.DetailId = params.get('id');
      if(this.DetailId){
        this.getDetail();
      }
    });
  }
  
  getDetail() {
    this.skLoading = true;
    
    const payload: any = {
      activeTab: this.activeTab
    };
    if (this.listingActiveTab === 'company_stock') {
      payload['_id'] = this.DetailId;
    } else {
      payload['assigned_to_id'] = this.DetailId;
    }
    
    this.api.post(payload, 'spare-part/detail').subscribe(result => {
      if (result['statusCode']  ===  200) {
        this.skLoading = false;
        this.Detail = result['data'];
      }
    });
  }
  
  header=[
    {label:"Created At"},
    {label:"Created By"},
    {label:"Transaction Type"},
    {label:"Detail"},
    {label:"Qty"},
  ]
  
  teamStock = [
    { name: "Rakesh Singh", qty: "50 Qty" },
    { name: "Anjali Mehra", qty: "50 Qty" },
    { name: "Suresh Kumar", qty: "50 Qty" },
    { name: "Priya Sharma", qty: "50 Qty" },
    { name: "Amit Verma", qty: "50 Qty" },
    { name: "Neha Joshi", qty: "50 Qty" },
    { name: "Vikram Chauhan", qty: "50 Qty" },
    { name: "Kavita Desai", qty: "50 Qty" },
    { name: "Rahul Patel", qty: "50 Qty" },
  ];
}
