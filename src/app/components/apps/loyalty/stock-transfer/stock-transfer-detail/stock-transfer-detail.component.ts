import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { ShowcodeCardComponent } from '../../../../../shared/components/showcode-card/showcode-card.component';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../../core/services/api/api.service';
import { StockTransferModalComponent } from '../stock-transfer-modal/stock-transfer-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ModuleService } from '../../../../../shared/services/module.service';
import { SpkProductCardComponent } from '../../../../../../@spk/reusable-apps/spk-product-card/spk-product-card.component';

@Component({
  selector: 'app-stock-transfer-detail',
  imports: [SharedModule, GalleryModule, ShowcodeCardComponent, CommonModule, MaterialModuleModule, SpkReusableTablesComponent, SpkProductCardComponent ],
  templateUrl: './stock-transfer-detail.component.html'
})
export class StockTransferDetailComponent {
  filter: any = {};
  id: any = {}
  skLoading: boolean = false;
  invoiceDetail: any = {};
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
        this.getInvoiceDetail();
      }
    });
  }
  
  getInvoiceDetail() {
    this.skLoading = true;
    this.api.post({ '_id': this.id }, 'invoice/detail').subscribe(result => {
      if (result['statusCode'] === 200) {
        this.skLoading = false;
        this.invoiceDetail = result['data'];
      }
    });
  }
  
  
  
  openModal(){
    const dialogRef = this.dialog.open(StockTransferModalComponent, {
      width: '500px',
      data: {
        'pageType':'grn_stock',
        '_id': this.id,
        'status': this.invoiceDetail.grn_status,
        'submodule': this.submodule,

      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result === true){
        this.getInvoiceDetail();
      }
    });
  }
  
  invoiceColumns = [
    { label: "S.No" },
    { label: "Product Name" },
    { label: "Product Code" },
    { label: "Qty", table_class: "text-center" },
  ]
  
}
