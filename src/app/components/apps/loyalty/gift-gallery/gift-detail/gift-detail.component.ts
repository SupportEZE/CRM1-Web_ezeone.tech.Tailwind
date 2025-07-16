import { Component } from '@angular/core';
import { ShowcodeCardComponent } from '../../../../../shared/components/showcode-card/showcode-card.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../../../../core/services/api/api.service';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { ModuleService } from '../../../../../shared/services/module.service';
import { LogService } from '../../../../../core/services/log/log.service';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { MatDialog } from '@angular/material/dialog';
import { GiftModalComponent } from '../gift-modal/gift-modal.component';
import { MaskService } from '../../../../../utility/mask.service';
import { HighlightService } from '../../../../../shared/services/highlight.service';

@Component({
  selector: 'app-gift-detail',
  imports: [ShowcodeCardComponent, SharedModule, SpkReusableTablesComponent, RouterModule],
  templateUrl: './gift-detail.component.html'
})
export class GiftDetailComponent {
  skLoading:boolean = false;
  giftDetail:any ={}
  vouhcer:any=[];
  submodule:any ={};
  id:any
  pagination: any = {}
  filter:any ={};
  mainTabs:any =[];
  tabCount:any={};
  pageKey = 'gift-detail';
  highlightedId: string | undefined;


  constructor(
    public route: ActivatedRoute,
    public api:ApiService, 
    private toastr: ToastrServices,
    private moduleService: ModuleService,
    private logService: LogService,
    public dialog:MatDialog,
    public maskService:MaskService,
    public comanFuncation: ComanFuncationService,
    private highlightService :HighlightService
  ) {}
  
  
  ngOnInit() {
    const subModule = this.moduleService.getSubModuleByName('IRP', 'Gift Gallery');
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
      this.id = params.get('id');
      if (this.id) {
        this.getGiftDetail();
      }
    });
  }
  


  getColumns(){
    return [
      { label: "Created At" },
      { label: "Created By" },
      { label: "Voucher Code" },
      { label: "Voucher Expire Date" },
      { label: "Customer Detail" }, 
      { label: "Customer Type" },
      { label: "Redeem ID" },
      { label: "Transfer Date" },


    ]
  }
  
  
  
  getGiftDetail(){
    this.skLoading = true;
    this.api.post({ '_id': this.id }, 'gift-gallery/detail').subscribe(result => {
      if (result['statusCode'] === 200) {
        this.skLoading = false;
        this.giftDetail = result['data'];
        this.getVoucherList();
      }
    });
  }


  isHighlighted(id: string): boolean {
    return this.highlightedId === id;
  }

  setHighLight(rowId: string) {
    this.comanFuncation.setHighLight(this.pageKey, rowId, '', this.filter, this.pagination.cur_page ? this.pagination.cur_page : 1)
  }



  getVoucherList() {
    this.skLoading = true;
    this.api.post({ filters: this.filter, 'gift_id': this.id, 'page': this.pagination.cur_page ?? 1 }, 'gift-gallery/read-voucher').subscribe(result => {
      if (result['statusCode'] == 200) {
        this.skLoading = false;
        this.vouhcer = result['data'] ? result['data']['result'] : [];
        this.tabCount = result['data'] ? result['data']['activeTab'] : {};
        this.pagination = result['pagination'];
      }
    });
  }

  changeToPagination(action: string) {
    if (action === 'Next' && this.pagination.cur_page < this.pagination.total_pages) {
      this.pagination.cur_page++;
    } else if (action === 'Previous' && this.pagination.cur_page > 1) {
      this.pagination.cur_page--;
    }
    this.getVoucherList();
  }

  changeToPage(page: number) {
    this.pagination.cur_page = page;
    this.getVoucherList();
  }


  
  // delete funcation start //
  delete(id: string, api: string, label: string) {
    this.comanFuncation.delete(id, this.submodule, label, api, 'single_action', id).subscribe((result: boolean) => {
      if (result === true) {
        this.getGiftDetail();
      }
    });
  }
  // Delete Funcation End
  
  
  
  
  
  openModal(type:any, data?:any) {
    const dialogRef = this.dialog.open(GiftModalComponent, {
      width: '500',
      data: {
        'pageType': 'item_list',
        'type': type,
        'data': data,
        'gift_id': this.id,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.getGiftDetail();
      }
    });
  }
  
  // ******status change funcation start*****//
  onToggleChange(newState: boolean, id: string, status: string) {
    this.comanFuncation.statusChange(newState, id, status, this.submodule, 'toggle', 'qr-code/update-status').subscribe((result: boolean) => {
      this.getGiftDetail();
    });
  }
}
