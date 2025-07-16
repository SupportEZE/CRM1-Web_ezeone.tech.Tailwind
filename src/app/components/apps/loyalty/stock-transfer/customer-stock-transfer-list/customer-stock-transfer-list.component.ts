import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { HighlightService } from '../../../../../shared/services/highlight.service';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import { ApiService } from '../../../../../core/services/api/api.service';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { ModuleService } from '../../../../../shared/services/module.service';


@Component({
  selector: 'app-customer-stock-transfer-list',
  imports: [
    SharedModule,
    RouterModule,
    SpkReusableTablesComponent,
    MaterialModuleModule
  ],
  templateUrl: './customer-stock-transfer-list.component.html'
})
export class CustomerStockTransferListComponent {
  @Input() pageHeader: boolean = true;
  @Input() btnLabel!: string;
  @Input() mainTab!: string;
  @Input() customerDetail!: any;
  @Input() stockType !: any
  @Input() _id !: any;
  tabCount:any ={};
  activeTab: any = 'Pending';
  skLoading: boolean = false;
  highlightedId: string | undefined;
  pageKey = 'stock-list';
  pagination: any = {};
  filter:any ={};
  listing:any =[];
  accessRight:any = {};
  mainTabs = [
    { name: 'Pending', label: 'Pending', icon: 'ri-time-fill', count: this.tabCount.Pending ? this.tabCount.Pending : 0 },
    { name: 'Approved', label: 'Approved', icon: 'ri-check-fill', count: this.tabCount.Approved ? this.tabCount.Approved : 0 },
    { name: 'Reject', label: 'Reject', icon: 'ri-close-fill', count: this.tabCount.Reject ? this.tabCount.Reject : 0 },
  ];
  
  constructor( public comanFuncation: ComanFuncationService,private highlightService: HighlightService,private router: Router, private api: ApiService,public route:ActivatedRoute,public moduleService: ModuleService) {}
  

  ngOnChanges() {
    this.getList();
  }


  ngOnInit(){
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
    
  }
  
  onRefresh() {
    this.getList();
  }
  
  
  getList() {
    this.skLoading = true;
    this.api.post({ 'page': this.pagination.cur_page ?? 1, mainTab: this.mainTab, 'activeTab': this.activeTab, '_id': this._id, 'filters': this.filter }, 'stock-transfer/read').subscribe(result => {
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
  
  goToDetail(rowId:any) {
    this.setHighLight(rowId);
    this.router.navigate(['/apps/loyalty/stock-transfer-list/company/customer-stock-transfer-detail/' + rowId]);
  }
  
  goToPage() {
    let detail
    if (this.customerDetail){
      detail = this.customerDetail
    }
    this.router.navigate(['/apps/loyalty/stock-transfer-list/company/stock-add'], { state: {detail} });
  }
  
  
  
  
  onTabChange(tab: string) {
    this.activeTab = tab;
    this.getList();
  }
  
  
  invoiceColumn = [
    { label: "Date Created" },
    { label: "Created By" },
    { label: "Bill Date" },
    { label: "Bill No." },
    { label: "Transfer ID" },
    { label: "Sender Customer Category" },
    { label: "Sender Customer Detail" },
    { label: "Receiver Customer Category" },
    { label: "Receiver Customer Detail" },
    { label: "Total Item", table_class: 'text-center' },
    { label: "Total Qty", table_class: 'text-center' },
    { label: "Bill Amount", table_class: 'text-right' },
  ]
}
