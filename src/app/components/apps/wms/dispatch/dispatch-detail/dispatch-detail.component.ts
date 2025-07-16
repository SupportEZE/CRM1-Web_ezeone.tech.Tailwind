import { Component, ElementRef, ViewChild } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { ShowcodeCardComponent } from '../../../../../shared/components/showcode-card/showcode-card.component';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../../core/services/api/api.service';
import { MatDialog } from '@angular/material/dialog';
import { SpkProductCardComponent } from '../../../../../../@spk/reusable-apps/spk-product-card/spk-product-card.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SpkNgSelectComponent } from '../../../../../../@spk/spk-ng-select/spk-ng-select.component';
import { SpkInputComponent } from '../../../../../../@spk/spk-input/spk-input.component';
import { debounceTime, filter } from 'rxjs/operators';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { SkeletonComponent } from '../../../../../shared/components/skeleton/skeleton.component';
import { DispatchModalComponent } from '../dispatch-modal/dispatch-modal.component';
import { QRCodeComponent } from 'angularx-qrcode';
import { TruncateCharsPipe } from '../../../../../core/pipe/truncate-words.pipe.';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import { ModuleService } from '../../../../../shared/services/module.service';
import { FORMIDCONFIG } from '../../../../../../config/formId.config';
import { SweetAlertService } from '../../../../../core/services/alert/sweet-alert.service';
import { RemoveSpaceService } from '../../../../../core/services/remove-space/removeSpace.service';


@Component({
  selector: 'app-dispatch-detail',
  imports: [SharedModule, GalleryModule, TruncateCharsPipe, QRCodeComponent, ShowcodeCardComponent, CommonModule, MaterialModuleModule, SpkReusableTablesComponent, SpkInputComponent, SpkNgSelectComponent, SkeletonComponent],
  templateUrl: './dispatch-detail.component.html'
})
export class DispatchDetailComponent {
  @ViewChild('couponInput') couponInputComponent!: SpkInputComponent;
  @ViewChild('dispatchLabel', { static: false }) dispatchLabel!: ElementRef;
  
  dispatchForm: FormGroup = new FormGroup({});
  filter: any = {};
  id: any = {}
  skLoading: boolean = false;
  dispatchDetail:any = {};
  itemList: any = [];
  masterQrList: any = [];
  dropDownList: any = [];
  count: any = {};
  itemLoading: boolean = false;
  masterQrLoading: boolean = false;
  btnFlag:boolean = false;
  pagination: any = {};
  queScanList:any =[];
  printType:any;
  filterForm!: FormGroup;
  FORMID:any= FORMIDCONFIG;
  submodule: any = {};
  pageType:any ={};
  masterPrintData: any = {}
  markaValue:any;
  
  constructor(public route: ActivatedRoute, private router: Router, private toastr: ToastrServices, private fb: FormBuilder, public dialog: MatDialog, private moduleService: ModuleService, public comanFuncation: ComanFuncationService, public removeSpace:RemoveSpaceService, public api: ApiService, public alert:SweetAlertService) {
    
  }
  
  
  ngOnInit() {
    this.filterForm = this.fb.group({
      select_value: [null]
    });
    
    this.dispatchForm = this.fb.group({
      master_box_code: ['', Validators.required],
      qr_code: ['', [Validators.minLength(16), Validators.maxLength(16)]],
    });
    
    const subModule = this.moduleService.getSubModuleByName('WMS', 'Dispatch');
    if (subModule) {
      this.submodule = subModule;
    }
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      const pageType = params.get('type');
      if (pageType){
        this.pageType = pageType;
      }
      
      if (this.id) {
        this.getDetail();
        this.getMasterCodes();
        this.getMasterDropdownCodes();
      }
    });
    
    
    this.dispatchForm.get('qr_code')?.valueChanges
    .pipe(
      debounceTime(150),  // Adjust as needed, 100–300ms is good for barcode guns
      filter(value => !!value && value.length === 16)
    )
    .subscribe(code => {
      this.handleCouponScan(code);
    });
  }
  
  ngAfterViewInit() {
    this.dispatchForm.get('master_box_code')?.valueChanges.subscribe(value => {
      if (value) {
        setTimeout(() => {
          this.couponInputComponent?.focusInput?.();
        });
      }
    });
  }
  
  
  
  
  pendingQueue: { code: string; id: string }[] = [];
  isSending = false;
  
  handleCouponScan(code: string): void {
    const uniqueId = `${code}-${Date.now()}`;
    this.pendingQueue.push({ code, id: uniqueId });
    this.queScanList.unshift({
      id: uniqueId,
      qr_code: code,
      status: 'Pending',
      scanned_at: Date.now()
    });
    this.dispatchForm.get('qr_code')?.setValue('');
    this.processNextCode();
  }
  
  processNextCode(): void {
    if (this.isSending || this.pendingQueue.length === 0) return;
    
    this.isSending = true;
    
    const { code, id } = this.pendingQueue.shift()!; // `!` is safe because we already checked length
    
    const payload = {
      dispatch_id: this.id,
      qr_code: code,
      master_box_code: this.dispatchForm.get('master_box_code')?.value
    };
    
    this.api.post(payload, 'dispatch/dispatch-qr-code').subscribe({
      next: (res) => {
        const scanned = this.queScanList.find((row: any) => row.id === id);
        if (scanned) {
          // res?.message
          scanned.status = res?.statusCode === 200 ? res?.message : res?.message;
          this.getItems();
          this.getMasterCodes();
        }
      },
      error: () => {
        const scanned = this.queScanList.find((row: any) => row.id === id);
        if (scanned) {
          scanned.status = 'Error';
        }
      },
      complete: () => {
        this.isSending = false;
        setTimeout(() => this.processNextCode(), 200);
      }
    });
  }
  
  
  
  
  getColumns(tab: string): any[] {
    if (tab === 'master') {
      return [
        { label: "Sr.No", },
        { label: "Master Box No.", },
        { label: "Total Small Boxes", },
        { label: "Total Items"},
        { label: "Action" },
      ];
    }
    if (tab === 'que-item') {
      return [
        { label: "Sr.No", },
        { label: "Qr Code No.", },
        { label: "Status" },
      ];
    }
    
    else {
      return [
        { label: "Sr.No", },
        { label: "Product Detail", },
        { label: "Qty.", },
        { label: "Dispatch Qty.", table_class: "text-center" },
      ];
    }
    
  }
  
  
  marka:any =[]
  getDetail() {
    this.skLoading = true;
    this.api.post({ '_id': this.id }, 'dispatch/detail').subscribe(result => {
      if (result['statusCode'] === 200) {
        this.skLoading = false;
        this.dispatchDetail = result ?.data ?? {};
        
        if (this.dispatchDetail?.marka?.length) {
          this.marka = this.dispatchDetail.marka.map((item: any) => ({
            label: item.marka,
            value: item.marka
          }));
          if (this.marka.length === 1) {
            const firstOption = this.marka[0];
            this.filterForm.patchValue({ select_value: firstOption.value });
            this.onSingleSelectChange(firstOption.value);
          }
        }
        
        this.getItems();
      }
    });
  }
  
  getItems() {
    this.itemLoading = true;
    this.api.post({ 'dispatch_id': this.id }, 'dispatch/items').subscribe(result => {
      if (result['statusCode'] === 200) {
        this.itemLoading = false;
        this.itemList = result?.data?.items ?? [];
        
        if (this.itemList.length > 0) {
          this.itemList = this.itemList.map((item: any) => ({
            ...item,
            qty: item.planned_qty,
            plannedQtyControl: new FormControl(item.planned_qty || 0)
          }));
        }
        else{
          this.router.navigate(['/apps/wms/dispatch-list/order_packing']);
        }
        this.count = result?.data?.count ?? {};
      }
    });
  }
  
  
  delete(id: string, api: string, label: string) {
    this.comanFuncation.delete(id, this.submodule, label, api, 'single_action', id).subscribe((result: boolean) => {
      if (result === true) {
        this.getMasterCodes();
      }
    });
  }
  
  
  getMasterCodes(search?:any) {
    this.masterQrLoading = true;
    this.api.post({ 'page': this.pagination.cur_page ?? 1, 'pdf': false, 'filters': { 'search': search}, 'dispatch_id': this.id }, 'qr-code/read-master-box').subscribe(result => {
      if (result['statusCode'] === 200) {
        this.masterQrLoading = false;
        this.masterQrList = result?.data?? [];
        this.pagination = result?.pagination ?? {};
      }
    });
  }
  
  
  pdfMasterQr:any =[];
  printLoading:boolean = false;
  printMaster() {
    this.printLoading = true;
    this.api.post({'pdf': true, 'dispatch_id': this.id }, 'qr-code/read-master-box').subscribe(result => {
      if (result['statusCode'] === 200) {
        this.printMasterbox()
        this.printType = 'master-all-item';
        this.pdfMasterQr = result?.data ?? [];
        this.printLoading = false;
      }
      else{
        this.printLoading = false;
      }
    });
  }
  
  
  openDialog(type:string, item?:any, masterbox_number?:any) {
    const dialogRef = this.dialog.open(DispatchModalComponent, {
      width: '1024px',
      data: {
        'id':this.id,
        'lastPage': type,
        'masterbox_number': masterbox_number,
        'item': item ?? [],
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
  
  
  changeToPagination(btnType: string) {
    if (btnType == 'Previous') {
      if (this.pagination.prev && this.pagination.cur_page > 1) {
        this.pagination.cur_page--;  // Decrement the page number
        this.getMasterCodes();
      }
    }
    else {
      if (this.pagination.next) {
        this.pagination.cur_page++;  // Increment the page number
        this.getMasterCodes();
      }
    }
  }
  
  changeToPage(newPage: number) {
    this.pagination.cur_page = newPage;
    this.getMasterCodes();
  }
  
  
  private lastSearchTerm: string = '';
  onSearch(search: string) {
    const trimmedSearch = search?.trim() || '';
    if (trimmedSearch === this.lastSearchTerm) {
      return;
    }
    this.lastSearchTerm = trimmedSearch;
    this.getMasterDropdownCodes(search)
  }
  
  getMasterDropdownCodes(search?: any) {
    this.api.post({ 'filters': { 'search': search }, 'dispatch_id': this.id }, 'qr-code/read-master-box-dropdown').subscribe(result => {
      if (result['statusCode'] === 200) {
        this.dropDownList = result?.data ?? [];
      }
    });
  }
  
  
  genrateMasterBox() {
    this.btnFlag = true;
    this.api.post({ 'dispatch_id': this.id }, 'qr-code/create-master-box').subscribe(result => {
      if (result['statusCode'] === 200) {
        this.btnFlag = false;
        this.getMasterCodes();
        this.getMasterDropdownCodes();
        this.toastr.success(result['message'], '', 'toast-top-right');
      }
      else{
        this.btnFlag = false;
      }
    });
  }
  
  
  onSingleSelectChange(event: any): void {
    this.markaValue = event;
  }
  
  
  alertError(masterBoxNo:string){
    this.toastr.warning(`Item not linked with master box ${masterBoxNo}`, '', 'toast-top-right');
  }
  
  
  totalMasterQty:number =0;
  printMasterbox(data?:any, type?:string, masterBoxNumber?:any){
    if(type === 'single-master-item'){
      this.totalMasterQty = data.reduce((sum: number, item: any) => {
        return sum + (+item.qty || 0);
      }, 0);
      
      this.dispatchDetail.marka.map((item: any) => ({
        label: item.marka,
        value: item.marka
      }));
      
      this.masterPrintData = { item: data, masterBoxNumber: masterBoxNumber};
    }
    // if (!this.filterForm.value.select_value) {
    //   this.toastr.error('Select Party Marka First', '', 'toast-top-right');
    //   return
    // }
    
    setTimeout(() => {
      const printContentsNode = this.dispatchLabel.nativeElement.cloneNode(true) as HTMLElement;
      const popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
      if (popupWin) {
        popupWin.document.open();
        popupWin.document.write(`
        <html>
          <head>
            <title>Dispatch Print</title>
            <style>
              @media print {
              @page {margin: 0;}
                html, body {margin: 0; padding: 0;}
                #QR_CODE_LABEL > div { page-break-after: always; break-after: always; page-break-inside: avoid; display: block;}
                body {font-family: 'Arial', sans-serif;}
              }
            </style>
          </head>
          <body></body>
        </html>
      `);
          popupWin.document.close();
          
          // Wait a tick to append cloned content
          setTimeout(() => {
            const body = popupWin.document.body;
            if (body) {
              body.appendChild(printContentsNode);
              popupWin.focus();
              popupWin.print();
              popupWin.close();
            }
          }, 500); // Delay to allow QR canvases to be ready
        } else {
          console.error('Popup blocked.');
        }
      }, 500);
    }
    
    updateQty(row:any){
      if (Number(row.planned_qty) > Number(row.qty)){
        row.planned_qty = row.qty
        this.toastr.error('maximum qty allowed ' + Number(row.qty), '', 'toast-top-right');
        return
      }
      this.alert.confirm("Are you sure?", "You want to decrease qty", "Yes it!").then(result => {
        if (result.isConfirmed) {
          this.api.disabled = true;
          this.api.post({ 'dispatch_id': this.id, 'item_id': row._id, 'planned_qty': Number(row.planned_qty) }, 'dispatch/excess-item-return').subscribe(result => {
            if (result['statusCode'] === 200) {
              this.api.disabled = false;
              this.getItems();
              this.toastr.success(result['message'], '', 'toast-top-right');
            }
          });
        }
        if (result.isDismissed){
          row.planned_qty = row.qty
        }
      })
      
    }
  }
  