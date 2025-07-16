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
  selector: 'app-gatepass-list',
  imports: [
    SharedModule,
    RouterModule,
    SpkReusableTablesComponent,
    MaterialModuleModule
  ],
  templateUrl: './gatepass-list.component.html'
})
export class GatepassListComponent {
  @Input() _id !: any;
  skLoading: boolean = false;
  listing: any = [];
  pagination: any = {};
  filter: any = {};
  pageKey = 'payment-list';
  highlightedId: string | undefined;
  pageType: any = {};
  checked: any = {}
  selectedBillingCom: string | null = null;
  selectedRows: any[] = [];
  submodule: any;



  constructor(
    public route: ActivatedRoute,
    public comanFuncation: ComanFuncationService,
    private router: Router,
    private api: ApiService,
    public dialog: MatDialog,
    public removeSpace: RemoveSpaceService,
    private highlightService: HighlightService,
    private moduleService: ModuleService,
  ) {
  }

  ngOnInit() {
    const subModule = this.moduleService.getSubModuleByName('WMS', 'Dispatch');
    console.log(subModule, 'subModule');
    
    if (subModule) {
      this.submodule = subModule;
    }

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
  }



  isCheckboxDisabled(row: any): boolean {
    if (!this.selectedBillingCom) return false;
    return row.organisation_name !== this.selectedBillingCom;
  }

  goToDetail(id: any) {
    this.setHighLight(id);
    this.router.navigate(['/apps/wms/dispatch-list/type/list',this.pageType,'detail',id]);
    //  this.router.navigate(['/apps/wms/dispatch-list/gatepass_pending/detail/' + this.pageType + '/' + id]);
  }

  getList() {
    this.skLoading = true
    this.api.post({ 'page': this.pagination.cur_page ?? 1, 'activeTab': this.pageType, 'filters': this.filter, '_id': this._id }, 'gatepass/read').subscribe(result => {
      if (result['statusCode'] === 200) {
        this.listing = result?.data ?? [];
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
      { label: 'Created By' },
      { label: 'Gatepass No.' },
      { label: 'Invoice No.' },
      { label: 'E-Way Bill No.' },
      { label: 'Driver Name', },
      { label: 'Mobile No.' },
      { label: 'Vehicle No.' },
      { label: 'Transportation Mode', },
      { label: 'Bilty Number' },
      { label: 'Action' },]
  }



  openDialog(type: string, id?:any) {
    const dialogRef = this.dialog.open(DispatchModalComponent, {
      width: '1024px',
      data: {
        'lastPage': type,
        '_id': id,
        'item': this.selectedRows ?? [],
        'submodule': this.submodule,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.getList();
      }
    });
  }
}
