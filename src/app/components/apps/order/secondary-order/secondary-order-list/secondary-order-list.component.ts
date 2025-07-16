import { Component, Input } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { FormsModule } from '@angular/forms';
import { FORMIDCONFIG } from '../../../../../../config/formId.config';
import { CURRENCY_SYMBOLS } from '../../../../../utility/constants';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { LogService } from '../../../../../core/services/log/log.service';
import { Router } from '@angular/router';
import { SweetAlertService } from '../../../../../core/services/alert/sweet-alert.service';
import { ModuleService } from '../../../../../shared/services/module.service';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import { ApiService } from '../../../../../core/services/api/api.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { HighlightService } from '../../../../../shared/services/highlight.service';

@Component({
  selector: 'app-secondary-order-list',
  imports: [SharedModule,CommonModule,SpkReusableTablesComponent,MaterialModuleModule,FormsModule],
  templateUrl: './secondary-order-list.component.html',
})
export class SecondaryOrderListComponent {
  @Input() pageHeader: boolean = true;
  @Input() _id !: any;
  CURRENCY_SYMBOLS = CURRENCY_SYMBOLS;
  FORMID:any= FORMIDCONFIG;
  skLoading:boolean = false
  activeTab: any = 'Pending';
  pagination:any={};
  filter: any = {};
  mainTabs:any=[];
  modules:any={};
  listingCount:any={};
  listing:any=[];
  accessRight:any = {};
  highlightedId: string | undefined;
  pageKey = 'primary-order';
  
  constructor(
    public dialog:MatDialog,
    public api: ApiService,
    public comanFuncation: ComanFuncationService,
    public moduleService: ModuleService,
    public alert : SweetAlertService,
    private router: Router,
    private logService : LogService,
    public toastr: ToastrServices,
    private highlightService: HighlightService
  ){}
  
  ngOnInit() {

    let highlight = this.highlightService.getHighlight(this.pageKey);
    if (highlight != undefined) {
      this.activeTab = highlight.tab;
      this.highlightedId = highlight.rowId;
      this.pagination.cur_page = highlight.pageIndex;
      this.filter = highlight.filters
      this.highlightService.clearHighlight(this.pageKey);
    };

    const accessRight = this.moduleService.getAccessMap('SFA', 'Order', 'Secondary Order');
    if (accessRight) {
      this.accessRight = accessRight;
    }
    const modules = this.moduleService.getSubSubModuleByName('SFA', 'Order', 'Secondary Order');
    if (modules) {
      this.modules = modules;
    }
    this.getList();
  }
  
  goToAddPage()
  {
    this.router.navigate(['/apps/order/secondary-order/secondary-order-add']);
  }



  setHighLight(rowId: string) {
    this.comanFuncation.setHighLight(this.pageKey, rowId, this.activeTab, this.filter, this.pagination.cur_page ? this.pagination.cur_page : 1)
  }

  isHighlighted(id: string): boolean {
    return this.highlightedId === id;
  }

  goToDetailPage(rowId: any) {
    this.setHighLight(rowId);
    this.router.navigate(['/apps/order/secondary-order/secondary-order-detail/' , rowId]);
  }
  
  onRefresh()
  {
    this.filter = {};
    this.getList();
  }
  
  onTabChange(tab: string) {
    this.activeTab = tab;
    this.getList();
  }
  
  // -------- Pagination//
  
  changeToPage(page: number) {
    this.pagination.cur_page = page; 
    this.getList(); // API call with the updated page
  }
  
  changeToPagination(action: string) {
    if (action === 'Next' && this.pagination.cur_page < this.pagination.total_pages) {
      this.pagination.cur_page++;
    } else if (action === 'Previous' && this.pagination.cur_page > 1) {
      this.pagination.cur_page--;
    }
    this.getList(); 
  }
  // -------- Pagination//
  
  getList(){
    this.skLoading = true;
    this.api.post({filters : this.filter , activeTab : this.activeTab, page: this.pagination.cur_page ?? 1}, 'secondary-order/secondary-order-list').subscribe(result => {
      if(result['statusCode'] == 200){
        this.skLoading = false;
        this.listing = result['data']['result'];
        this.listingCount = result['data']['activeTab'];
        this.pagination = result['pagination'];
        this.mainTabs = [
          { name: 'Pending', label: 'Pending', icon: 'ri-time-fill', count: this.listingCount.pending_count},
          { name: 'Approved', label: 'Approved', icon: 'ri-checkbox-circle-fill', count: this.listingCount.approved_count},
          { name: 'Reject', label: 'Reject', icon: 'ri-close-circle-fill', count: this.listingCount.reject_count},
          { name: 'Hold', label: 'Hold', icon: 'ri-pause-circle-fill', count: this.listingCount.hold_count},
        ];
      }
    });
  }
  
  openMainLogModal(rowId:string) {
    this.comanFuncation.listLogsModal(this.modules.module_id , rowId, this.modules.module_type ).subscribe(result => {
      if(result === true){
        this.getList();
      }
    });
  }
  
  onDeleteRow(rowId: any) {
    this.alert.confirm("Are you sure?")
    .then((result) => {
      if (result.isConfirmed) {
        this.api.patch({ _id: rowId, is_delete: 1}, 'secondary-order/delete').subscribe(result => {
          if (result['statusCode']  ===  200) {
            this.logService.logActivityOnDelete(this.modules.module_id, this.modules.title, 'delete', rowId , 'Secondary Order');
            Swal.fire('Deleted!', result.message, 'success');
            this.getList();
          }                        
        });
      }
    });
  }
  
  PageHeaders = [
    {label: 'Created At'},
    {label: 'Created By'},
    {label: 'Order Id'},
    {label: 'Customer Category'},
    {label: 'Retailer Detail'},
    {label: 'Distributors Detail',},
    {label: 'State', table_class : 'text-center'},
    {label: 'District', table_class : 'text-center'},
    {label: 'Total Items', table_class : 'text-center'},
    {label: 'Item QTY', table_class : 'text-center'},
    {label: 'Total Order Value', table_class : 'text-center'},
  ];

}
