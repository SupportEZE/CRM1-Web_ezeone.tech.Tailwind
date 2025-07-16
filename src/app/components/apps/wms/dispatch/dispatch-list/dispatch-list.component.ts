import { Component, Input } from '@angular/core';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SharedModule } from '../../../../../shared/shared.module';
import { ModuleService } from '../../../../../shared/services/module.service';
import { ApiService } from '../../../../../core/services/api/api.service';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import { HighlightService } from '../../../../../shared/services/highlight.service';
import { RemoveSpaceService } from '../../../../../core/services/remove-space/removeSpace.service';
import { MatDialog } from '@angular/material/dialog';
import { DispatchModalComponent } from '../dispatch-modal/dispatch-modal.component';


@Component({
  selector: 'app-dispatch-list',
  imports: [
    SharedModule,
    RouterModule,
    SpkReusableTablesComponent,
    MaterialModuleModule
  ],
  templateUrl: './dispatch-list.component.html'
})
export class DispatchListComponent {
  skLoading: boolean = false;
  listing: any = [];
  pagination: any = {};
  filter: any = {};
  pageKey = 'payment-list';
  highlightedId: string | undefined;
  pageType:any ={};
  checked:any ={}
  mainTabs = [
    { name: 'Unpaid', label: 'Unpaid', icon: 'ri-bill-fill' },
    { name: 'All', label: 'All', icon: 'ri-inbox-fill' },
  ];
  selectedBillingCom: string | null = null;
  selectedRows: any[] = [];
  
  constructor(
    public route:ActivatedRoute,
    public comanFuncation: ComanFuncationService,
    private router: Router,
    private api: ApiService,
    public dialog:MatDialog,
    public removeSpace: RemoveSpaceService,
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
    this.route.paramMap.subscribe(params => {
      if (params.get('type')) {
        this.pageType = params.get('type');
        this.getList();
      }
    });
  }
  
  onRefresh() {
    this.getList();
    this.selectedRows =[];
  }
  
  
  
  isCheckboxDisabled(row: any): boolean {
    if (!this.selectedBillingCom) return false;
    return row.organisation_name !== this.selectedBillingCom;
  }
  
  onCheckboxChange(event: any, row: any) {
    if (event.checked) {
      this.selectedBillingCom = row.organisation_name;
      const exists = this.selectedRows.some(item => item._id === row._id);
      if (!exists) {
        this.selectedRows.push(row);
      }
    } else {
      this.selectedRows = this.selectedRows.filter(item => item._id !== row._id);
      const anyOtherChecked = this.listing.some(
        (item: any) =>
          item !== row &&
        item._checked &&
        item.organisation_name === this.selectedBillingCom
      );
      if (!anyOtherChecked) {
        this.selectedBillingCom = null;
      }
    }
  }
  
  goToDetail(id: any) {
    this.setHighLight(id);
    this.router.navigate(['/apps/wms/dispatch-list/' + this.pageType + '/dispatch-detail/'+id]);
  }
  
  getList() {
    this.skLoading = true
    this.api.post({ 'page': this.pagination.cur_page ?? 1, 'activeTab':this.pageType, 'filters': this.filter}, 'dispatch/read').subscribe(result => {
      if (result['statusCode'] === 200) {
        this.listing = result?.data?? [];
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
      ...(this.pageType === 'gatepass_pending' ? [{ label: "Action"}] : []),
      { label: 'Created At' },
      { label: 'Billing Company'},
      { label: 'Order Number',},
      { label: 'Customer Type'},
      { label: 'Customer Detail'},
      { label: 'Account Code',},
      // { label: 'Total Item' },
      // { label: 'Total Qty.' },
      ]
    }
    
    
    
    openDialog(type:string) {
      const dialogRef = this.dialog.open(DispatchModalComponent, {
        width: '1024px',
        data: {
          'lastPage': type,
          'item': this.selectedRows ?? [],
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.selectedRows =[];
          this.getList();
        }
      });
    }
  }
  