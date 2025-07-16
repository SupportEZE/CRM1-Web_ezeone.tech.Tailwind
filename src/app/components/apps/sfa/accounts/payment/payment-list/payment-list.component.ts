import { Component, Input } from '@angular/core';
import { SpkReusableTablesComponent } from '../../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from '../../../../../../shared/shared.module';
import { ModuleService } from '../../../../../../shared/services/module.service';
import { ApiService } from '../../../../../../core/services/api/api.service';
import { MaterialModuleModule } from '../../../../../../material-module/material-module.module';
import { ComanFuncationService } from '../../../../../../shared/services/comanFuncation.service';
import { HighlightService } from '../../../../../../shared/services/highlight.service';


@Component({
  selector: 'app-payment-list',
  imports: [
    SharedModule,
    RouterModule,
    SpkReusableTablesComponent,
    MaterialModuleModule
  ],
  templateUrl: './payment-list.component.html',
})
export class PaymentListComponent {
  @Input() pageHeader: boolean = true;
  @Input() _id !: any;
  skLoading: boolean = false;
  listing: any = []
  pagination: any = {};
  filter: any = {};
  pageKey = 'payment-list';
  highlightedId: string | undefined;
  mainTabs = [
    { name: 'Unpaid', label: 'Unpaid', icon: 'ri-bill-fill' },
    { name: 'All', label: 'All', icon: 'ri-inbox-fill' },
  ];

  constructor(
    public comanFuncation: ComanFuncationService,
    private router: Router,
    private api: ApiService,
    private highlightService: HighlightService,
    private moduleService: ModuleService,
  ) {
  }

  ngOnInit() {
    let highlight = this.highlightService.getHighlight(this.pageKey);
    if (highlight != undefined) {
      this.highlightedId = highlight.rowId;
      this.pagination.cur_page = highlight.pageIndex;
      this.filter = highlight.filters
      this.highlightService.clearHighlight(this.pageKey);
    }
    this.getList();
  }

  onRefresh() {
    this.getList();
  }

  goToDetail(id: any) {
    this.setHighLight(id);
    this.router.navigate(['/apps/sfa/accounts/invoice-detail/' + id]);
  }

  click(id: string) {
    const data = this.listing.filter((x: { Price: string }) => {
      return x.Price != id;

    })
    this.listing = data;

  }


  getList() {
    this.skLoading = true
    this.api.post({ 'page': this.pagination.cur_page ?? 1, 'filters': this.filter, '_id': this._id }, 'invoice-payment/read').subscribe(result => {
      if (result['statusCode'] === 200) {
        this.listing = result['data'];
        this.pagination = result['pagination'];
        this.skLoading = false
      }
      else {
        this.skLoading = false
      }
    });
  }


  changeToPagination(btnType: string) {
    if (btnType == 'Previous') {
      if (this.pagination.prev && this.pagination.cur_page > 1) {
        this.pagination.cur_page--;  // Decrement the page number
        this.getList();
      }
    }
    else {
      if (this.pagination.next) {
        this.pagination.cur_page++;  // Increment the page number
        this.getList();
      }
    }
  }

  changeToPage(newPage: number) {
    this.pagination.cur_page = newPage;
    this.getList();
  }


  isHighlighted(id: string): boolean {
    return this.highlightedId === id;
  }


  setHighLight(rowId: string) {
    this.comanFuncation.setHighLight(this.pageKey, rowId, '', this.filter, this.pagination.cur_page ? this.pagination.cur_page : 1)
  }


  getColumn() {
    return [
      { label: 'Created At' },
      { label: 'Payment Date' },
      { label: 'Document No.', table_class: 'text-center' },
      { label: 'Customer Category' },
      { label: 'Customer Detail' },
      { label: 'Amount', table_class: 'text-right' },
      { label: 'Payment Mode' },
      { label: 'Transaction Detail' },
      { label: 'Transaction Remark' },]
  }
}
