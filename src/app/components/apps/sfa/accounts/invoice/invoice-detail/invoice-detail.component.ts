import { Component } from '@angular/core';
import { SharedModule } from '../../../../../../shared/shared.module';
import { SpkReusableTablesComponent } from '../../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../../../core/services/api/api.service';
import { ShowcodeCardComponent } from '../../../../../../shared/components/showcode-card/showcode-card.component';

@Component({
  selector: 'app-invoice-detail',
  imports: [SharedModule, SpkReusableTablesComponent, ShowcodeCardComponent],
  templateUrl: './invoice-detail.component.html',
})
export class InvoiceDetailComponent {
  
  
  
  constructor(public route: ActivatedRoute, public api:ApiService){}
  invoiceColumns=[
    { label:"S.No"},
    { label: "Product Name" },
    {label:"Product Code"},
    {label: "Price Per Unit", table_class: "text-right" },
    {label:"Qty", table_class:"text-center"},
    {label:"Total Price", table_class:"text-right"},
    {label:"Discount", table_class:"text-right"},
    { label:"Sub Total", table_class: "text-right" },
    { label: "GST", table_class: "text-right" },
    {label:"Net Amount", table_class:"text-right"},
  ]
  invoice:any;
  id:any ={}
  skLoading:boolean = false;
  invoiceDetail:any ={};
  
  
  ngOnInit() {
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
}
