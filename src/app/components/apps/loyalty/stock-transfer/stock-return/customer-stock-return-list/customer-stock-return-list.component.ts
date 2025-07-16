import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SpkReusableTablesComponent } from '../../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { SharedModule } from '../../../../../../shared/shared.module';
import { HighlightService } from '../../../../../../shared/services/highlight.service';
import { ComanFuncationService } from '../../../../../../shared/services/comanFuncation.service';
import { ApiService } from '../../../../../../core/services/api/api.service';
import { MaterialModuleModule } from '../../../../../../material-module/material-module.module';
import { ModuleService } from '../../../../../../shared/services/module.service';
import { LOGIN_TYPES } from '../../../../../../utility/constants';


@Component({
  selector: 'app-customer-stock-return-list',
  imports: [
    SharedModule,
    RouterModule,
    SpkReusableTablesComponent,
    MaterialModuleModule
  ],
  templateUrl: './customer-stock-return-list.component.html'
})
export class CustomerStockReturnListComponent {
  @Input() pageHeader: boolean = true;
  @Input() tabView: boolean = false;
  @Input() _id !: any;
  @Input() customerDetail!: any;
  tabCount: any = {};
  activeTab: any = '';
  skLoading: boolean = false;
  highlightedId: string | undefined;
  pageKey = 'stock-list';
  pagination: any = {};
  filter: any = {};
  listing: any = [];
  stockType: any = {}
  accessRight:any = {};
  LOGIN_TYPES = LOGIN_TYPES
  mainTabs = [
    { name: 'My Return', label: 'My Return', icon: 'ri-time-fill', count: this.tabCount.Pending ? this.tabCount.Pending : 0 },
    { name: 'From Customer', label: 'From Customer', icon: 'ri-check-fill', count: this.tabCount.Approved ? this.tabCount.Approved : 0 },
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
    
    if (this.customerDetail && Object.keys(this.customerDetail).length > 0) {
      this.activeTab = 'My Return'
    }
    
    
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
  
  
  getList(key_value?:any) {
    this.skLoading = true
    this.api.post({ 'page': this.pagination.cur_page ?? 1, 'activeTab': this.activeTab, 'filters': this.filter, [this.activeTab === 'My Return' ? 'sender_id' : 'recevier_id']: this._id }, 'stock-transfer/customer-return-read').subscribe(result => {
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
    const key_value = tab === 'Pending' ? 'sender_id' : 'recevier_id'
    this.getList(key_value);
  }
  
  goToPage() {
    let detail ={'return-type':'customer'}
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
    { label: "Sender Customer Category" },
    { label: "Sender Customer Detail" },
    { label: "Receiver Customer Category" },
    { label: "Receiver Customer Detail" },
    { label: "Total Item", table_class: 'text-center' },
    { label: "Total Qty", table_class: 'text-center' },
    { label: "Bill Amount", table_class: 'text-right' },
  ]
}
