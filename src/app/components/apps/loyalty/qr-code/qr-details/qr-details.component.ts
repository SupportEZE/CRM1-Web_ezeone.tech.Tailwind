import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Lightbox, LightboxModule } from 'ng-gallery/lightbox';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SharedModule } from '../../../../../shared/shared.module';
import { ApiService } from '../../../../../core/services/api/api.service';
import { ModuleService } from '../../../../../shared/services/module.service';
import { SweetAlertService } from '../../../../../core/services/alert/sweet-alert.service';
import { FORMIDCONFIG } from '../../../../../../config/formId.config';
import { ShowcodeCardComponent } from '../../../../../shared/components/showcode-card/showcode-card.component';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import { QRCodeComponent } from 'angularx-qrcode';
import { LogService } from '../../../../../core/services/log/log.service';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { TruncateCharsPipe } from '../../../../../core/pipe/truncate-words.pipe.';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../../../shared/services/auth.service';

@Component({
  selector: 'app-qr-details',
  imports: [
    SharedModule,
    RouterModule,
    LightboxModule, 
    CommonModule,
    ShowcodeCardComponent,
    QRCodeComponent,
    TruncateCharsPipe
  ],
  templateUrl: './qr-details.component.html',
})
export class QrDetailsComponent {
  @ViewChild('qrCodeLabel', { static: false }) qrCodeLabel!: ElementRef;
  skLoading : boolean = false;
  id:any;
  FORMID:any= FORMIDCONFIG;
  submodule:any =0;
  couponDetail: any = {};
  originalData: any = {};
  coupon: any = [];
  productMrp: any[] = [];
  filterForm!: FormGroup;
  mrp:number =0;
  orgData:any ={};


  constructor(
    public lightbox: Lightbox,
    public alert:SweetAlertService,
    public route: ActivatedRoute,
    public api:ApiService, 
    private toastr: ToastrServices,
    private moduleService: ModuleService,
    private logService: LogService,
    private fb: FormBuilder,
    private authService :AuthService,
    public comanFuncation: ComanFuncationService
  ) {
    this.orgData = this.authService.getUser();
  }
  
  
  ngOnInit() {
    this.filterForm = this.fb.group({
      select_value: [null]
    });
    
    
    const subModule = this.moduleService.getSubModuleByName('IRP', 'Qr Code');
    if (subModule) {
      this.submodule = subModule;
    }
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if(this.id){
        this.getQRDetail();
      }
    });
  }
  
  getExcelColumnName(index: number): string {
    let name = '';
    while (index >= 0) {
      name = String.fromCharCode((index % 26) + 65) + name;
      index = Math.floor(index / 26) - 1;
    }
    return name;
  }
  
  
  
  
  
  // ******status change funcation start*****//
  onToggleChange(newState: boolean, id: string, status: string) {
    this.comanFuncation.statusChange(newState, id, status, this.submodule, 'toggle', 'qr-code/update-status').subscribe((result: boolean) => {
      this.getQRDetail();
    });
  }
  
  
  
  printStatus(event:boolean, id:string)
  {
    this.alert.confirm("Are you sure?", "You want to change print status", "Yes it!")
    .then(result => {
      if (result.isConfirmed) {
        const isEditMode = true;
        if (isEditMode) {
          const noChanges = this.logService.logActivityOnUpdate(
            isEditMode,
            {'print status':this.originalData},
            {'print status':event},
            this.submodule.module_id,
            this.submodule.title,
            'update',
            id || null,
            () => { },
            this.submodule.module_type
          );
          if (noChanges) {
            this.toastr.warning('No changes detected', '', 'toast-top-right')
            return;
          }
          
        }
        this.api.patch({ 'is_printed': event, '_id': id }, 'qr-code/print-status-change').subscribe(result => {
          if (result['statusCode'] == 200) {
            this.toastr.success(result['message'], '', 'toast-top-right');
            this.getQRDetail();
          }
        });
      }
    });
  }
  // ******status change funcation end*****//
  getQRDetail() {
    this.skLoading =true;
    this.api.post({ '_id': this.id }, 'qr-code/detail-history').subscribe(result => {
      if (result['statusCode'] == 200) {
        this.couponDetail = result['data']['qr_history'] ? result['data']['qr_history'] : {}
        this.coupon = result['data']['qr_data'] ? result['data']['qr_data'] : []
        this.skLoading = false;
        if (this.orgData?.org?.wms){
          this.loadFilterOptions();
        }
        if (this.couponDetail){
          this.originalData = this.couponDetail.is_printed
        }
      }
    });
  }
  
  loadFilterOptions(): void {
    this.api.post({ 'product_id': this.couponDetail.product_id }, 'product/mrp-dropdown').subscribe(result => {
      if (result['statusCode'] == 200) {
        this.productMrp = result['data'] ?? []
        if (this.productMrp.length === 1) {
        const firstOption = this.productMrp[0];
        this.filterForm.patchValue({ select_value: firstOption.value });
        this.onSingleSelectChange(firstOption.value);
      }
      }
    });
  }
  
  onSingleSelectChange(event: any): void {
      this.mrp = event;
  }
  
  
  
  
  // QR label print funcation start
  printLabel(): void {
    const printContentsNode = this.qrCodeLabel.nativeElement.cloneNode(true) as HTMLElement;
    const popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    if (popupWin) {
      popupWin.document.open();
      popupWin.document.write(`
       <html>
          <head>
            <title>Qr Detail</title>
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
  