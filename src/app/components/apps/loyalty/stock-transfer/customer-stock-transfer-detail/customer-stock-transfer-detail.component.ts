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
import { SpkProductCardComponent } from '../../../../../../@spk/reusable-apps/spk-product-card/spk-product-card.component';
import { AuthService } from '../../../../../shared/services/auth.service';


@Component({
  selector: 'app-customer-stock-transfer-detail',
  imports: [SharedModule, GalleryModule, ShowcodeCardComponent, CommonModule, MaterialModuleModule, SpkReusableTablesComponent, SpkProductCardComponent ],
  templateUrl: './customer-stock-transfer-detail.component.html'
})
export class CustomerStockTransferDetailComponent {
  filter: any = {};
  id: any = {}
  skLoading: boolean = false;
  invoiceDetail: any = {};
  orgData:any ={};


  constructor(public route: ActivatedRoute, public authService:AuthService, public dialog:MatDialog, public api:ApiService){
    this.orgData = this.authService.getUser();
  }
  
  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.getInvoiceDetail();
      }
    });
  }
  
  cartColumn = [
    { label: "Sr.No", },
    { label: "Product Name", },
    { label: "Product Code", },
    { label: "Quantity", table_class: "text-center" },
    { label: "Point Transfered", table_class: "text-right" }
  ]

  totalPoint:number=0;
  getInvoiceDetail() {
    this.skLoading = true;
    this.api.post({ '_id': this.id }, 'stock-transfer/detail').subscribe(result => {
      if (result['statusCode'] === 200) {
        this.skLoading = false;
        this.invoiceDetail = result['data'];

        if (this.invoiceDetail?.selected_item){
          this.totalPoint = this.invoiceDetail.selected_item.reduce((sum: number, item: any) => {
            return sum + (+item.point_value || 0);
          }, 0);
        }
      }
    });
  }
  
  
  
  openModal(){
    const dialogRef = this.dialog.open(StockTransferModalComponent, {
      width: '500px',
      data: {
        'pageType':'customer_stock',
        '_id': this.id,
        'status': this.invoiceDetail.status,
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
    { label: "Price Per Unit", table_class: "text-right" },
    { label: "Qty", table_class: "text-center" },
    { label: "Total Price", table_class: "text-right" },
    { label: "Discount", table_class: "text-right" },
    { label: "Sub Total", table_class: "text-right" },
    { label: "GST", table_class: "text-right" },
    { label: "Net Amount", table_class: "text-right" },
    { label: "Point Transfred", table_class: "text-right" },
  ]
  
}
