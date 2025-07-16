import { ChangeDetectorRef, Component, input, Input } from '@angular/core';
import { SortablejsModule } from '@maksim_m/ngx-sortablejs';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { FORMIDCONFIG } from '../../../../../../config/formId.config';
import { DateService } from '../../../../../shared/services/date.service';
import { SweetAlertService } from '../../../../../core/services/alert/sweet-alert.service';
import { ApiService } from '../../../../../core/services/api/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import Swal from 'sweetalert2';
import { ModuleService } from '../../../../../shared/services/module.service';
import { RemoveSpaceService } from '../../../../../core/services/remove-space/removeSpace.service';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import { HighlightService } from '../../../../../shared/services/highlight.service';
import { QrModalComponent } from '../qr-modal/qr-modal.component';

@Component({
  selector: 'app-qr-list',
  imports: [
    SharedModule,
    MaterialModuleModule,
    CommonModule,
    RouterModule,
    FormsModule,
    SortablejsModule,
    SpkReusableTablesComponent
  ],
  templateUrl: './qr-list.component.html',
})
export class QrListComponent {
  @Input() _id !:any;
  @Input() active_tab !:any;
  @Input() detail_page_active:boolean = false
  filter:any ={};
  skLoading:boolean = false;
  public disabled: boolean = false;
  moduleId:number=0;
  moduleFormId:number =0;
  moduleTableId:number =0;
  FORMID:any= FORMIDCONFIG;
  submodule: any={};
  tableId:any;
  activeTab:any ='item';
  qrList:any=[];
  scanQrList:any=[];
  pagination:any ={};
  generateQr: any = [];
  
  
  highlightedId: string | undefined;
  pageKey = 'qr-list';
  accessRight:any = {};
  
  mainTabs = [
    { name: 'item', label: 'Item', icon: 'ri-file-text-fill'},
    { name: 'box', label: 'Box', icon: 'ri-box-3-fill'},
    { name: 'point_category', label: 'Point Category', icon: 'ri-exchange-fill'},
    { name: 'scan_history', label: 'Scan History', icon: 'ri-qr-code-line'},
    { name: 'generate_history', label: 'Generate History', icon: 'ri-time-line' },
  ];
  
  constructor(
    private cd: ChangeDetectorRef,
    public comanFuncation: ComanFuncationService,
    private toastr: ToastrServices,
    public dialog:MatDialog,
    public api:ApiService,
    public alert : SweetAlertService,
    private dateService: DateService,
    public date:DateService, 
    private router: Router,
    public textFormat:RemoveSpaceService,
    private moduleService: ModuleService,
    private highlightService: HighlightService
  ) {
    
  }
  
  ngOnChanges(){
    
    this.activeTab = this.active_tab
  }
  
  ngOnInit() {
    const accessRight = this.moduleService.getAccessMap('IRP', 'Qr Code');
    if (accessRight) {
      this.accessRight = accessRight;
      this.cd.detectChanges()
    }
    const subModule = this.moduleService.getSubModuleByName('IRP', 'Qr Code');
    const form = this.moduleService.getFormById('IRP', 'Qr Code', this.FORMID.ID['QRCodeformId']);
    const tableId = this.moduleService.getTableById('IRP', 'Qr Code', this.FORMID.ID['QRCodeTableId']);
    if (subModule) {
      this.submodule = subModule;
    }
    if (form) {
      this.moduleFormId = form.form_id;
    }
    if (tableId) {
      this.tableId = tableId.table_id;
    }
    let highlight = this.highlightService.getHighlight(this.pageKey);
    if (highlight != undefined) {
      this.activeTab = highlight.tab;
      this.highlightedId = highlight.rowId;
      this.pagination.cur_page = highlight.pageIndex;
      this.filter = highlight.filters
      this.highlightService.clearHighlight(this.pageKey);
    }
    
    this.onTabChange(this.activeTab)
  }
  
  isHighlighted(id: string): boolean {
    return this.highlightedId === id;
  }
  
  onRefresh()
  {
    this.filter = {};
    if(this.activeTab === 'scan_history'){
      this.getScanQr();
    }
    else if(this.activeTab === 'generate_history'){
      this.getGenHisQr()
    }
    else{
      this.getQrData();
    }
  }
  
  onTabChange(tab: string) {
    if (!this.highlightedId){
      this.pagination.cur_page = 1;
    }
    this.activeTab = tab;
    if(tab === 'scan_history'){
      this.getScanQr();
    }
    else if (tab === 'generate_history'){
      this.getGenHisQr();
    }
    else{
      this.getQrData();
    }
  }
  
  
  getColumns(): any[] {
    if(this.activeTab === 'scan_history'){
      return [ 
        { label: "S.no.", field: "S.no." },
        { label: "Scan Date", field: "Scan Date" },
        { label: "Scan Type", field: "Scan Type" },
        { label: "Scan By", field: "Scan By" },
        { label: "Profession Type", field: "Profession Type" },
        { label: "Mobile No.", field: "Mobile No." },
        { label: "QR Type", field: "QR Type" },
        { label: "Box QR Code No.	", field: "Box QR Code No." },
        { label: "Item QR Code No.	", field: "Item QR Code No."},
        { label: "Point Catgory", field: "Point Catgory"},
        { label: "Product Detail", field: "Product Detail"},
        { label: "State", field: "State"},
        { label: "Scanning Point", field: "Scanning Point"},
        { label: "Geo Location", field: "Geo Location" },
        { label: "Action", field: "Action" },
      ];
    }
    else if (this.activeTab === 'generate_history'){
      return [
        { label: "S.no.", field: "S.no." },
        { label: "Date Created", field: "Date Created" },
        { label: "Created by", field: "Created by" },
        { label: "QR Type", field: "QR Type" },
        { label: "Paper Size", field: "Paper Size" },
        { label: "Product Details/ Point Catgeory", field: "Product Details/ Point Catgeory" },
        { label: "Total QR Code No.	", field: "Total QR Code No." },
        { label: "Print Status", field: "Print Status" },
        { label: "Action", field: "Action" },
      ];
    }
    else{
      return [ 
        { label: "S.no.", field: "S.no." },
        { label: "Date Created", field: "Date Created" },
        { label: "Created by", field: "Created by" },
        ...(this.activeTab === 'item' ? [{ label: "Box QR Code No.", field: "Box QR Code No." }] : []),
        { label: this.activeTab === 'box' ? "Box QR Code No." : "Item QR Code No.", field: this.activeTab === 'box' ? "Box QR Code No." : "Item QR Code No." },
        ...((this.activeTab === 'box' || this.activeTab === 'item')
        ? [{ label: "Product", field: "Product" }]
        : [{ label: "Point Category", field: "Point Category" }]),
        ...(this.activeTab === 'box' ? [{ label: "Packing Size", field: "Packing Size" }] : []),
        { label: "Action", field: "Action" },
      ];
    }
    
  }
  
  getQrData() {
    this.skLoading = true
    this.api.post({ 'qrcode_type': this.activeTab, 'filters': this.filter, 'page': this.pagination.cur_page ?? 1}, 'qr-code/read-qr').subscribe(result => {
      if (result['statusCode'] === 200) {
        this.qrList = result['data'];
        this.pagination = result['pagination'];
        this.skLoading = false
      }
      else{
        this.skLoading = false
      }
    });
  }
  
  getScanQr() {
    this.skLoading = true
    this.api.post({'qrcode_type':this.activeTab, 'filters':this.filter, "_id":this._id, 'page': this.pagination.cur_page ?? 1}, 'qr-code/read-scanqr').subscribe(result => {
      if (result['statusCode'] === 200) {
        this.scanQrList = result['data'];
        this.pagination = result['pagination'];
        this.skLoading = false
      }
      else{
        this.skLoading = false
      }
    });
  }
  
  
  getGenHisQr() {
    this.skLoading = true
    this.api.post({ 'qrcode_type': this.activeTab, 'filters': this.filter, "_id": this._id, 'page': this.pagination.cur_page ?? 1 }, 'qr-code/read-history').subscribe(result => {
      if (result['statusCode'] === 200) {
        this.generateQr = result['data'];
        this.pagination = result['pagination'];
        this.skLoading = false
      }
      else {
        this.skLoading = false
      }
    });
  }
  
  
  openModal(row:any) {
    
    const dialogRef = this.dialog.open(QrModalComponent, {
      width: '768px',
      data: {
        'pageType': 'item_list',
        'data': row,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
  
  redirectToMap(lat:any, lng:any) {
    if (!lat&&!lng){
      this.toastr.error('Location Not Found', '', 'toast-top-right');
      return
    }
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, '_blank');
  }
  
  // Reopen Funcation start
  
  reopen(id: string){
    this.alert.confirm("Are you sure?", "You want to reopen QR code", "Yes it!")
    .then((result) => {
      if (result.isConfirmed) {
        this.api.post({ '_id': id}, 'qr-code/qr-reopen').subscribe(result => {
          if (result['statusCode'] === 200) {
            this.getScanQr();
            this.toastr.success(result['message'], '', 'toast-top-right');
          }
        });
      }
    });
  }
  
  // Reopen Funcation end
  
  // delete funcation start //
  delete(id: string, api: string, label: string) {
    this.comanFuncation.delete(id, this.submodule, label, api, 'single_action', id).subscribe((result: boolean) => {
      if (result === true) {
        if (this.activeTab === 'scan_history') {
          this.getScanQr();
        }
        else if (this.activeTab === 'generate_history') {
          this.getGenHisQr();
        }
        else {
          this.getQrData();
        }
      }
    });
  }
  // delete funcation end
  
  
  
  
  
  // -------- Pagination//
  changeToPagination(btnType: string) {
    if (btnType == 'Previous') {
      if (this.pagination.prev && this.pagination.cur_page  > 1) {
        this.pagination.cur_page --;  // Decrement the page number
        if(this.activeTab == 'scan_history'){
          this.getScanQr();
        }
        else if (this.activeTab == 'generate_history'){
          this.getGenHisQr();
        }
        else{
          this.getQrData();
        }
      }
    }
    else
    {
      if (this.pagination.next) {
        this.pagination++;  // Increment the page number
        if (this.activeTab == 'scan_history') {
          this.getScanQr();
        }
        else if (this.activeTab == 'generate_history') {
          this.getGenHisQr();
        }
        else {
          this.getQrData();
        }
      }
    }
  }
  
  changeToPage(newPage: any) {
    this.pagination.cur_page = newPage;
    if (this.activeTab == 'scan_history') {
      this.getScanQr();
    }
    else if (this.activeTab == 'generate_history') {
      this.getGenHisQr();
    }
    else {
      this.getQrData();
    }
  }
  // --------//
  
  
  
  
  setHighLight(rowId: string) {
    this.comanFuncation.setHighLight(this.pageKey, rowId, this.activeTab, this.filter, this.pagination.cur_page ? this.pagination.cur_page : 1)
  }
  
  
  goToDetail(rowId:any)
  {
    this.setHighLight(rowId);
    this.router.navigate(['/apps/loyalty/qr-list/qr-details/' + rowId ]);
  }
  
  goToPage()
  {
    this.router.navigate(['/apps/loyalty/qr-list/qr-add']);
  }
  
  goToStock() {
    this.router.navigate(['/apps/loyalty/stock-transfer-list']);
  }
  
}
