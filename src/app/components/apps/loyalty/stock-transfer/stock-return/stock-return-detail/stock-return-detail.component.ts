import { Component } from '@angular/core';
import { SharedModule } from '../../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { ShowcodeCardComponent } from '../../../../../../shared/components/showcode-card/showcode-card.component';
import { MaterialModuleModule } from '../../../../../../material-module/material-module.module';
import { SpkReusableTablesComponent } from '../../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../../../core/services/api/api.service';
import { StockTransferModalComponent } from '../../stock-transfer-modal/stock-transfer-modal.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-stock-return-detail',
  imports: [SharedModule, GalleryModule, ShowcodeCardComponent, CommonModule, MaterialModuleModule, SpkReusableTablesComponent,],
  templateUrl: './stock-return-detail.component.html'
})
export class StockReturnDetailComponent {
  filter: any = {};
  id: any = {}
  skLoading: boolean = false;
  invoiceDetail: any = {};
  detailData: any = {};

  constructor(public route: ActivatedRoute, private router: Router, public dialog: MatDialog, public api: ApiService) { }


  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state?.['detail']) {
      this.detailData = nav.extras.state['detail'];
    } else {
      const navigation = history.state;
      if (navigation?.detail) {
        this.detailData = navigation.detail;
      }
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
    const api_path = this.detailData['return-type'] === 'company' ? 'stock-transfer/company-return-detail' : 'stock-transfer/customer-return-detail';
    this.api.post({ '_id': this.id }, api_path).subscribe(result => {
      if (result['statusCode'] === 200) {
        this.skLoading = false;
        this.invoiceDetail = result['data'];
      }
    });
  }



  openModal() {
    const dialogRef = this.dialog.open(StockTransferModalComponent, {
      width: '500px',
      data: {
        'pageType': 'grn_stock',
        '_id': this.id,
        'status': this.invoiceDetail.grn_status,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.getInvoiceDetail();
      }
    });
  }

  invoiceColumns = [
    { label: "S.No" },
    { label: "Product Name" },
    { label: "Product Code" },
    { label: "Qty", table_class: "text-center" },
    { label: "Point Deduction", table_class: "text-right" },
  ]

}
