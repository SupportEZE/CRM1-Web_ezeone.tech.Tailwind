import { Component, Input } from '@angular/core';
import { ListingTabComponent } from '../../../../shared/components/listing-tab/listing-tab.component';
import { CommonModule } from '@angular/common';
import { SpkReusableTablesComponent } from '../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { ApiService } from '../../../../core/services/api/api.service';
import { DateService } from '../../../../shared/services/date.service';
import { PaginationFooterComponent } from '../../../../shared/components/pagination-footer/pagination-footer.component';
import { ShowcodeCardComponent } from '../../../../shared/components/showcode-card/showcode-card.component';
import { SkeletonComponent } from '../../../../shared/components/skeleton/skeleton.component';
import { DataNotFoundComponent } from '../../../../shared/components/data-not-found/data-not-found.component';
import { QrListComponent } from '../../loyalty/qr-code/qr-list/qr-list.component';
import { RedeemListComponent } from '../../loyalty/redeem/redeem-list/redeem-list.component';
import { PurchaseListComponent } from '../../loyalty/purchase/purchase-list/purchase-list.component';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-wallet-history',
  imports: [ListingTabComponent, CommonModule, ShowcodeCardComponent, PaginationFooterComponent, SpkReusableTablesComponent, SkeletonComponent, DataNotFoundComponent, QrListComponent, PurchaseListComponent, RedeemListComponent],
  templateUrl: './wallet-history.component.html'
})
export class WalletHistoryComponent {
  @Input() basicDetail !:any
  activeTab:any ='Ledger';
  ledger:any =[];
  pagination:any={};
  skLoading:boolean = false;
  data_hide :boolean = true
  mainTabs: any[] = [];
  orgData:any ={};


  constructor(public api: ApiService, public date:DateService, private authService:AuthService ){
  }
  ngOnInit(){
  }
  ngOnChanges(){
    this.orgData = this.authService.getOrg();
    this.mainTabs = this.getTabColumns();
    if(this.basicDetail && Object.keys(this.basicDetail).length > 0) {
      this.getLedger();
    }
  }
  
  onTabChange(tab: string) {
    this.activeTab = tab;
    if(tab === 'Ledger'){
      this.getLedger();
    }
  }
  
  getColumns(): any[] {
    return [ 
      // { label: "Sr.No", field: "Sr.No" }, ...(this.data && (this.data.is_child_dependency === 'Option')
      // ? [{ label: "Dependancy Value", field: "Dependancy Value" }]
      // : []),
      { label: "S.no.", field: "S.no." },
      { label: "Date", field: "Date" },
      { label: "Transaction Type	", field: "Transaction Type	" },
      { label: "Credit	", field: "Credit	",  table_class:"text-right" },
      { label: "Debit	", field: "Debit	",  table_class:"text-right" },
      { label: "Balance	", field: "Balance	",  table_class:"text-right" }
      
    ];
  }
  
  getTabColumns(): any[] {
    return [
      { name: 'Ledger', label: 'Ledger', icon: 'ri-file-text-fill'},
      ...(this.orgData?.purchase_stock_base ? [{ name: 'Scan History', label: 'Scan History', icon: 'ri-qr-code-fill'}] : [{ name: 'Purchase Req', label: 'Purchase Req', icon: 'ri-file-text-fill'}]),
      { name: 'Gift Redeem', label: 'Gift Redeem', icon: 'ri-gift-line'},
      { name: 'Cash Redeem', label: 'Bank Transfer', icon: 'ri-wallet-line'},
    ];
  }
  
  
  
  getLedger() {
    this.skLoading = true
    this.api.post({'customer_id':this.basicDetail._id, 'page': this.pagination.cur_page ?? 1}, 'ledger/read').subscribe(result => {
      if (result['statusCode'] === 200) {
        this.ledger = result['data'];
        this.pagination = result['pagination'];
        this.skLoading = false
      }
      else{
        this.skLoading = false
      }
    });
  }
  
  
  // -------- Pagination//
  changeToPagination(btnType: string) {
    if (btnType == 'Previous') {
      if (this.pagination.prev && this.pagination.cur_page > 1) {
        this.pagination.cur_page--;  // Decrement the page number
        this.getLedger();
      }
    }
    else
    {
      if (this.pagination.next) {
        this.pagination.cur_page++;  // Increment the page number
        this.getLedger();
      }
    }
  }
  
  changeToPage(newPage: number) {
    this.pagination.cur_page = newPage;
    this.getLedger();
  }
  // --------//
  
  
}
