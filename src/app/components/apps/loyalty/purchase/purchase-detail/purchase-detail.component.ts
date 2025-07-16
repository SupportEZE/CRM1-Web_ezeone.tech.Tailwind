import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { ShowcodeCardComponent } from '../../../../../shared/components/showcode-card/showcode-card.component';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../../core/services/api/api.service';
import { PurchaseModalComponent } from '../purhcase-modal/purchase-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ModuleService } from '../../../../../shared/services/module.service';
import { SpkProductCardComponent } from '../../../../../../@spk/reusable-apps/spk-product-card/spk-product-card.component';

@Component({
  selector: 'app-purchase-detail',
  imports: [SharedModule, GalleryModule, ShowcodeCardComponent, CommonModule, MaterialModuleModule, SpkReusableTablesComponent, SpkProductCardComponent ],
  templateUrl: './purchase-detail.component.html'
})
export class PurchaseDetailComponent {
  filter: any = {};
  id: any = {}
  skLoading: boolean = false;
  purchaseDetail: any = {};
  submodule:any ={};
  
  
  constructor(public route: ActivatedRoute, public dialog:MatDialog, public api:ApiService, public moduleService: ModuleService){}
  
  
  ngOnInit() {
    const subSubModule = this.moduleService.getSubSubModuleByName('IRP', 'Stock Transfer', 'Company To Customer');
    if (subSubModule) {
      this.submodule = subSubModule;
    }
    
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.getPurchaseDetail();
      }
    });
  }
  
  getPurchaseDetail() {
    this.skLoading = true;
    this.api.post({ '_id': this.id }, 'purchase/detail').subscribe(result => {
      if (result['statusCode'] === 200) {
        this.skLoading = false;
        this.purchaseDetail = result['data'];
        if(this.purchaseDetail?.selectedItem.length > 0){
          this.summary();
        }
      }
    });
  }
  
  
  
  totalItemQuantity:number=0;
  totalPointValue:number=0;
  summary(){
    this.totalItemQuantity = 0;
    this.totalPointValue = 0;
    this.purchaseDetail.selectedItem.forEach((item:any) => {
      const qty = Number(item.qty) || 0;
      const pointValue = Number(item.point_value) || 0;
      this.totalItemQuantity += qty;
      this.totalPointValue += qty * pointValue;
    });
  }
  
  
  openModal(){
    const dialogRef = this.dialog.open(PurchaseModalComponent, {
      width: '500px',
      data: {
        'pageType':'purchase_status',
        '_id': this.id,
        'status': this.purchaseDetail.status,
        'claim_point':this.totalPointValue?? 0,
        'submodule': this.submodule,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result === true){
        this.getPurchaseDetail();
      }
    });
  }
  
  itemColumn = [
    { label: "S.No" },
    { label: "Product Detail" },
    { label: "Qty", table_class: "text-center" },
    { label: "Point Per Qty.", table_class: "text-right" },
  ]
  
}
