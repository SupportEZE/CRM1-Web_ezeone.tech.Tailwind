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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpkNgSelectComponent } from '../../../../../../@spk/spk-ng-select/spk-ng-select.component';
import { SpkInputComponent } from '../../../../../../@spk/spk-input/spk-input.component';
import { debounceTime, filter } from 'rxjs/operators';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { SkeletonComponent } from '../../../../../shared/components/skeleton/skeleton.component';
import { DispatchModalComponent } from '../dispatch-modal/dispatch-modal.component';
import { RemoveSpaceService } from '../../../../../core/services/remove-space/removeSpace.service';


@Component({
  selector: 'app-gatepass-detail',
  imports: [SharedModule, GalleryModule, ShowcodeCardComponent, CommonModule, MaterialModuleModule, SpkReusableTablesComponent, SpkInputComponent, SkeletonComponent],
  templateUrl: './gatepass-detail.component.html'
})
export class GatepassDetailComponent {
  @ViewChild('couponInput') couponInputComponent!: SpkInputComponent;
  @ViewChild('qrCodeLabel', { static: false }) qrCodeLabel!: ElementRef;
  
  dispatchForm: FormGroup = new FormGroup({});
  filter: any = {};
  id: any = {}
  skLoading: boolean = false;
  dispatchDetail:any = {};
  linkedOrders:any =[];
  masterQrList: any = [];
  itemList: any = [];
  count: any = {};
  btnFlag:boolean = false;
  pagination: any = {};
  queScanList:any =[];
  masterQrLoading: boolean = false;
  printStatus:boolean = false;
  pageType:any;
  status:any;
  
  constructor(public route: ActivatedRoute, private toastr: ToastrServices, private fb: FormBuilder, public dialog: MatDialog, public api: ApiService, private router: Router, public removeSpace:RemoveSpaceService,) {
    
    this.dispatchForm = this.fb.group({
      qr_code: ['', [Validators.minLength(16), Validators.maxLength(16)]],
    });
  }
  
  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.pageType = params.get('type');
      this.status = params.get('status'); // 👈 add this line if you need status
      
      if (this.id) {
        this.getDetail();
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
    setTimeout(() => {
      this.couponInputComponent?.focusInput?.();
    }, 0); // Delay to ensure view is rendered
  }
  
  
  getDetail() {
    this.skLoading = true;
    this.api.post({ '_id': this.id }, 'gatepass/detail').subscribe(result => {
      if (result['statusCode'] === 200) {
        this.skLoading = false;
        this.dispatchDetail = result?.data?.gatePassData ?? {};
        this.linkedOrders = result?.data?.linkedOrders ?? [];
        this.getMasterCodes();
      }
    });
  }
  
  getMasterCodes() {
    this.masterQrLoading = true;
    this.api.post({ 'page': this.pagination.cur_page ?? 1, 'dispatch_status':this.pageType, '_id': this.id, 'dispatch_id': this.dispatchDetail ?.dispatch_id ?? [] }, 'gatepass/master-box-detail').subscribe(result => {
      if (result['statusCode'] === 200) {
        this.masterQrLoading = false;
        this.masterQrList = result?.data?.masterBoxList ?? [];
        this.printStatus = result?.data?.print_status ?? false;
      }
    });
  }
  
  
  
  pendingQueue: { code: string; id: string }[] = [];
  isSending = false;
  
  handleCouponScan(code: string): void {
    console.log(code, 'code');
    const uniqueId = `${code}-${Date.now()}`;
    this.pendingQueue.push({ code, id: uniqueId });
    
    // Add with timestamp and status, at top of list
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
      gatepass_id: this.id,
      gatepass_no: this.dispatchDetail.gatepass_number,
      master_box_code: code,
    };
    this.api.post(payload, 'qr-code/master-box-scan').subscribe({
      next: (res) => {
        const scanned = this.queScanList.find((row: any) => row.qr_code === code);
        console.log(scanned, 'scanned');
        if (scanned) {
          scanned.status = res?.statusCode === 200 ? res?.message : 'Failed';
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
  
  
  
  getColumns(type:string){
    if(type === 'master_qr'){
      return [
        { label: "Sr.No", },
        { label: "Master Box No." },
        { label: "Status", },
      ];
    }
    else{
      return [
        { label: "Sr.No"},
        { label: "Date Created"},
        { label: "Company Name"},
        { label: "Order Number" },
        { label: "Total Qty." },
        
      ];
    }
    
  }
  
  goToDetail(id: any) {
    // /apps/wms/dispatch-list/order_packing/dispatch-detail/6847ed5a43ba4f395b1aa585
    this.router.navigate(['/apps/wms/dispatch-list/gatepass_pending/dispatch-detail/' + id]);
  }
  
  
  printLabel(): void {
    const printContentsNode = this.qrCodeLabel.nativeElement.cloneNode(true) as HTMLElement;
    const popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    if (popupWin) {
      popupWin.document.open();
      popupWin.document.write(`
       <html>
          <head>
            <title>Print Gatepass</title>
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
    }
    
  }
  