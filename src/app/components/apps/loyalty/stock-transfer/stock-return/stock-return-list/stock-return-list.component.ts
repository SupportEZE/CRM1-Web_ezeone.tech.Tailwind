import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SpkReusableTablesComponent } from '../../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { SharedModule } from '../../../../../../shared/shared.module';
import { HighlightService } from '../../../../../../shared/services/highlight.service';
import { ComanFuncationService } from '../../../../../../shared/services/comanFuncation.service';
import { ApiService } from '../../../../../../core/services/api/api.service';
import { MaterialModuleModule } from '../../../../../../material-module/material-module.module';
import { ModuleService } from '../../../../../../shared/services/module.service';


@Component({
  selector: 'app-stock-return-list',
  imports: [
    SharedModule,
    RouterModule,
    SpkReusableTablesComponent,
    MaterialModuleModule
  ],
  templateUrl: './stock-return-list.component.html'
})
export class StockReturnListComponent {
  @Input() pageHeader: boolean = true;
  @Input() _id !: any;
  @Input() customerDetail!: any;
  tabCount: any = {};
  activeTab: any = 'Pending';
  skLoading: boolean = false;
  highlightedId: string | undefined;
  pageKey = 'stock-list';
  pagination: any = {};
  filter: any = {};
  listing: any = [];
  stockType: any = {}
  accessRight:any = {};
  mainTabs = [
    { name: 'Pending', label: 'Pending', icon: 'ri-time-fill', count: this.tabCount.Pending ? this.tabCount.Pending : 0 },
    { name: 'Approved', label: 'Approved', icon: 'ri-check-fill', count: this.tabCount.Approved ? this.tabCount.Approved : 0 },
    { name: 'Reject', label: 'Reject', icon: 'ri-close-fill', count: this.tabCount.Reject ? this.tabCount.Reject : 0 },
  ];
  
  constructor(public comanFuncation: ComanFuncationService, private highlightService: HighlightService, private router: Router, private api: ApiService, public route: ActivatedRoute,public moduleService: ModuleService) { }
  
  ngOnInit() {
    const accessRight = this.moduleService.getAccessMap('IRP', 'Stock Transfer', 'Company To Customer');
    if (accessRight) {
      this.accessRight = accessRight;
    }
    let highlight = this.highlightService.getHighlight(this.pageKey);
    if (highlight != undefined) {
      this.activeTab = highlight.tab;
      this.highlightedId = highlight.rowId;
      this.pagination.cur_page = highlight.pageIndex;
      this.filter = highlight.filters
      this.highlightService.clearHighlight(this.pageKey);
    };
    
    this.route.paramMap.subscribe(params => {
      if (params.get('type')) {
        this.stockType = params.get('type');
        this.getList();
      }
    });
    
    this.getList();
  }
  
  onRefresh() {
    this.getList();
  }
  
  
  getList() {
    this.skLoading = true
    this.api.post({ 'page': this.pagination.cur_page ?? 1, 'activeTab': this.activeTab, 'filters': this.filter, '_id': this._id }, 'stock-transfer/company-return-read').subscribe(result => {
      if (result['statusCode'] === 200) {
        this.listing = result['data']['result'];
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
        this.pagination.cur_page--;
        this.getList();
      }
    }
    else {
      if (this.pagination.next) {
        this.pagination.cur_page++;
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
    this.comanFuncation.setHighLight(this.pageKey, rowId, this.activeTab, this.filter, this.pagination.cur_page ? this.pagination.cur_page : 1)
  }
  
  goToDetail(rowId: any) {
    this.setHighLight(rowId);
    let detail = { 'return-type': 'customer' }
    this.router.navigate(['/apps/loyalty/stock-transfer-list/company/stock-return-detail/' + rowId], { state: { detail } });
  }
  
  onTabChange(tab: string) {
    this.activeTab = tab;
    this.getList();
  }
  
  goToPage() {
    let detail ={'return-type':'company'}
    // if (this.customerDetail) {
    //   detail. = this.customerDetail
    // }
    this.router.navigate(['/apps/loyalty/stock-transfer-list/company/stock-return-add'], { state: { detail }});
  }
  
  invoiceColumn = [
    { label: "Date Created" },
    { label: "Created By" },
    { label: "Bill Date" },
    { label: "Bill/Slip Number" },
    { label: "Customer Category" },
    { label: "Customer Detail" },
    { label: "Total Item", table_class: 'text-center' },
    { label: "Total Qty", table_class: 'text-center' },
    { label: "Bill Amount", table_class: 'text-right' },
  ]
}
