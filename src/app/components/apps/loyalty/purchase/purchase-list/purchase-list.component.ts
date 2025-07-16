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
  selector: 'app-purchase-list',
  imports: [
    SharedModule,
    RouterModule,
    SpkReusableTablesComponent,
    MaterialModuleModule
  ],
  templateUrl: './purchase-list.component.html'
})
export class PurchaseListComponent {
  @Input() pageHeader: boolean = true;
  @Input() btnLabel!: string;
  @Input() customerDetail!: any;
  @Input() _id !: any;
  tabCount:any ={};
  activeTab: any = 'Pending';
  skLoading: boolean = false;
  highlightedId: string | undefined;
  pageKey = 'purchase-list';
  pagination: any = {};
  filter:any ={};
  listing:any =[];
  accessRight:any = {};
  mainTabs: any[] = [];
  
  
  constructor( public comanFuncation: ComanFuncationService,private highlightService: HighlightService,private router: Router, private api: ApiService,public route:ActivatedRoute,public moduleService: ModuleService) {}
  
  
  ngOnChanges(){
    console.log(this.customerDetail, 'customerDetail');
    this.getList();
  }
  
  ngOnInit(){
    this.mainTabs = this.getColumns();
    const accessRight = this.moduleService.getAccessMap('Purchase');
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
    if(this.pageHeader){
      this.getList();
    }
  }
  
  onRefresh() {
    this.getList();
  }
  
  
  getList() {
    this.skLoading = true;
    this.api.post({ 'page': this.pagination.cur_page ?? 1, 'activeTab': this.activeTab, '_id': this._id, 'filters': this.filter }, 'purchase/read').subscribe(result => {
      if (result['statusCode'] === 200) {
        this.listing = result?.['data']?.['result'];
        this.tabCount = result?.['data']?.['tabCounts']
        this.pagination = result['pagination'];
        this.skLoading = false;
        this.mainTabs = this.getColumns();
      }
      else {
        this.skLoading = false
      }
    });
  }
  getColumns(): any[] {
    return [
      { name: 'Pending', label: 'Pending', icon: 'ri-time-fill', count: this.tabCount.pending_count ? this.tabCount.pending_count : 0 },
      { name: 'Approved', label: 'Approved', icon: 'ri-check-fill', count: this.tabCount.approved_count ? this.tabCount.approved_count : 0 },
      { name: 'Reject', label: 'Reject', icon: 'ri-close-fill', count: this.tabCount.reject_count ? this.tabCount.reject_count : 0 },
    ];
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
    this.router.navigate(['/apps/loyalty/purchase/purchase-detail/' + rowId]);
  }
  
  goToPage() {
    let detail
    if (this.customerDetail){
      this.customerDetail.pageFrom = 'Detail Page'
      detail = this.customerDetail
    }
    this.router.navigate(['/apps/loyalty/purchase/purchase-add'], { state: { detail }});
  }
  
  
  
  
  onTabChange(tab: string) {
    this.activeTab = tab;
    this.getList();
  }
  
  
  invoiceColumn = [
    { label: "Date Created" },
    { label: "Created By" },
    // { label: "Purchase ID" },
    { label: "Bill Date" },
    { label: "Bill No." },
    { label: "Category" },
    { label: "Influencer Detail" },
    { label: "Total Item", table_class: 'text-center' },
    { label: "Total Qty", table_class: 'text-center' },
  ]
}
