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
import { MaterialModuleModule } from '../../../../material-module/material-module.module';
import { FormsModule } from '@angular/forms';
import { CompanyStockTransferListComponent } from '../../loyalty/stock-transfer/company-stock-transfer-list/company-stock-transfer-list.component';
import { CustomerStockTransferListComponent } from '../../loyalty/stock-transfer/customer-stock-transfer-list/customer-stock-transfer-list.component';
import { LOGIN_TYPES } from '../../../../utility/constants';
import { ComanFuncationService } from '../../../../shared/services/comanFuncation.service';
import { HighlightService } from '../../../../shared/services/highlight.service';
import { StockReturnListComponent } from '../../loyalty/stock-transfer/stock-return/stock-return-list/stock-return-list.component';
import { CustomerStockReturnListComponent } from '../../loyalty/stock-transfer/stock-return/customer-stock-return-list/customer-stock-return-list.component';

@Component({
  selector: 'app-stock',
  imports: [ListingTabComponent, CommonModule, ShowcodeCardComponent, PaginationFooterComponent, SpkReusableTablesComponent, SkeletonComponent, DataNotFoundComponent, MaterialModuleModule, FormsModule, CompanyStockTransferListComponent, CustomerStockTransferListComponent, StockReturnListComponent, CustomerStockReturnListComponent],
  templateUrl: './stock.component.html'
})
export class StockComponent {
  
  @Input() basicDetail !:any
  activeTab:any ='Stock';
  pagination:any={};
  skLoading:boolean = false;
  data_hide :boolean = true
  stockList:any =[];
  filter:any ={};
  pageKey = 'stock';
  LOGIN_TYPES = LOGIN_TYPES
  constructor(public api: ApiService, public comanFuncation:ComanFuncationService, private highlightService: HighlightService, public date:DateService ){
  }
  ngOnInit(){
    let highlight = this.highlightService.getHighlight(this.pageKey);
    if (highlight != undefined) {
      this.activeTab = highlight.tab;
      this.highlightService.clearHighlight(this.pageKey);
    }
    else{
      if (this.basicDetail.login_type_id === LOGIN_TYPES.PRIMARY || this.basicDetail.login_type_id === LOGIN_TYPES.SUB_PRIMARY) {
        this.activeTab = 'Stock';
        this.getStock();
      }
      else {
        this.activeTab = 'Purchase Request'
        this.basicDetail.pageFrom = this.activeTab;
      }
    }
  }
  ngOnChanges(){
    
  }
  
  mainTabs(): any[]{
    return [
      ...(this.showForLoginTypes([LOGIN_TYPES.PRIMARY, LOGIN_TYPES.SUB_PRIMARY, LOGIN_TYPES.SALES_VENDOR]) ? [ 
        { name: 'Stock', label: 'In Stock', icon: 'ri-checkbox-circle-fill' },
        { name: 'Out of stock', label: 'Out of Stock', icon: 'ri-close-circle-fill' },
        { name: 'Company To Customer', label: 'Purchase', icon: 'ri-exchange-box-fill' },
      ] : []),
          
      ...(this.showForLoginTypes([LOGIN_TYPES.PRIMARY, LOGIN_TYPES.SUB_PRIMARY]) ? [
        { name: 'Purchase Return', label: 'Purchase Return', icon: 'ri-arrow-go-back-fill' }
      ] : []),
      
      ...(this.showForLoginTypes([LOGIN_TYPES.INFLUENCER, LOGIN_TYPES.SECONDARY]) ? [
        { name: 'Purchase Request', label: 'Purchase Request', icon: 'ri-exchange-box-fill' },
      ] : []),
      
      ...(this.showForLoginTypes([LOGIN_TYPES.PRIMARY, LOGIN_TYPES.SUB_PRIMARY, LOGIN_TYPES.SECONDARY]) ? [
        { name: 'Stock Transfer', label: 'Stock Transfer', icon: 'ri-checkbox-circle-fill' },
      ] : []),
      
      
      ...(this.showForLoginTypes([LOGIN_TYPES.INFLUENCER, LOGIN_TYPES.PRIMARY, LOGIN_TYPES.SUB_PRIMARY, LOGIN_TYPES.SECONDARY]) ? [
        { name: 'Stock Return', label: 'Stock Return', icon: 'ri-arrow-go-back-fill' },
      ] : []),
      
      // { name: 'Stock Return', label: 'Stock Return', icon: 'ri-arrow-go-back-fill' },
    ]
  }
  
  onTabChange(tab: string) {
    this.activeTab = tab;
    if (tab === 'Stock' || tab === 'Out of stock'){
      this.getStock();
    }
    
    if (tab === 'Stock Transfer' || tab === 'Purchase Request') {
      this.basicDetail.pageFrom = tab;
    }
    this.setHighLight()
  }
  
  getColumns(): any[] {
    return [ 
      { label: "S.no.", field: "S.no." },
      { label: "Product Name", field: "Product Name" },
      { label: "Product Code", field: "Product Code" },
      { label: "Qty	", field: "Qty", tableHeadColumn:'text-center' },
    ];
  }
  
  getStock() {
    this.skLoading = true
    this.api.post({ filters: this.filter, 'customer_id': this.basicDetail._id, 'activeTab': this.activeTab, 'page': this.pagination.cur_page ?? 1 }, 'stock-transfer/stock').subscribe(result => {
      if (result['statusCode'] === 200) {
        this.stockList = result['data']['result'];
        this.pagination = result['pagination'];
        this.skLoading = false
      }
    });
  }
  
  
  setHighLight() {
    this.comanFuncation.setHighLight(this.pageKey, '', this.activeTab, '', '')
  }
  
  
  // -------- Pagination//
  changeToPagination(btnType: string) {
    if (btnType == 'Previous') {
      if (this.pagination.prev && this.pagination.cur_page > 1) {
        this.pagination.cur_page--;  // Decrement the page number
        this.getStock();
      }
    }
    else
    {
      if (this.pagination.next) {
        this.pagination.cur_page++;  // Increment the page number
        this.getStock();
      }
    }
  }
  
  changeToPage(newPage: number) {
    this.pagination.cur_page = newPage;
    this.getStock();
  }
  // --------//
  
  showForLoginTypes(types: number[], options: { exclude?: boolean } = {}): boolean {
    const isIncluded = types.includes(this.basicDetail.login_type_id);
    return options.exclude ? !isIncluded : isIncluded;
  }
  
}
