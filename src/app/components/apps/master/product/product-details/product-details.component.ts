import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SharedModule } from '../../../../../shared/shared.module';
import { Image,GalleryModule } from '@ks89/angular-modal-gallery';
import { Lightbox, LightboxModule } from 'ng-gallery/lightbox';
import { ApiService } from '../../../../../core/services/api/api.service';
import { CommonModule } from '@angular/common';
import { SweetAlertService } from '../../../../../core/services/alert/sweet-alert.service';
import { ModuleService } from '../../../../../shared/services/module.service';
import { FORMIDCONFIG } from '../../../../../../config/formId.config';
import { LogService } from '../../../../../core/services/log/log.service';
import { ShowcodeCardComponent } from '../../../../../shared/components/showcode-card/showcode-card.component';
import { LogsComponent } from '../../../../../shared/components/logs/logs.component';
import { SpkProductCardComponent } from '../../../../../../@spk/reusable-apps/spk-product-card/spk-product-card.component';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { PRICE_TYPE } from '../../../../../utility/constants';
import { AuthService } from '../../../../../shared/services/auth.service';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';

@Component({
    selector: 'app-product-details',
    standalone: true,
    imports: [SharedModule, RouterModule, ShowcodeCardComponent, LightboxModule, GalleryModule, CommonModule, SpkProductCardComponent, LogsComponent, SpkReusableTablesComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent {
    FORMID:any= FORMIDCONFIG;
    subModule:any ={};
    data:any ={};
    logList:any=[];
    productDetail: any;
    productPrice: any;
    formattedKeysFormData: { [key: string]: any } = {};
    formattedKeysRecentActivities: { [key: string]: any } = {};
    productDetailFormData:any;
    disptachConfig: any ={};
    productDetailImages: any = [];
    skLoading : boolean = false;
    orgData: any = {}
    priceInputValues: any = {};
    dispatchConfig:any = {}
    public posts:any
    originalData: any = [];
    updatedData: any = [];
    
    constructor(public lightbox: Lightbox, private router: Router, public alert:SweetAlertService, public route: ActivatedRoute,public api:ApiService, private toastr: ToastrServices,private moduleService: ModuleService, private logService:LogService, private comanFuncation:ComanFuncationService, public dialog:MatDialog, private authService: AuthService) {
        this.orgData = this.authService.getUser();
    }
    
    DetailId: any;
    ngOnInit() {
        const subModule = this.moduleService.getSubModuleByName('Masters', 'Products');
        if (subModule) {
            this.subModule = subModule;
        }
        
        this.route.paramMap.subscribe(params => {
            this.DetailId = params.get('id');
            if(this.DetailId){
                this.getProductDetail();
            }
        });
    }
    
    
    
    getProductDetail() {
        this.skLoading = true;
        this.api.post({ _id: this.DetailId, 'module_id': this.subModule.module_id, 'sub_module_id': this.subModule.sub_module_id }, 'product/detail').subscribe(result => {
            if (result['statusCode']  ===  200) {
                this.skLoading = false
                this.productDetail = result['data'];
                this.productPrice = result['data']?.['product_price'] ?? {};                
                this.priceInputValues = { ...(this.productPrice?.form_data ?? {}) };                
                this.productDetailImages = result['data']['files'];
                this.productDetailFormData = result['data']['form_data'];
                this.dispatchConfig = result?.data?.dispatch_config ?? {};
                this.logService.getLogs(this.subModule.sub_module_id, (logs) => {
                    this.logList = logs;
                },this.DetailId ? this.DetailId : '', this.subModule.module_type);
                this.formattedKeysFormData = this.formatAndPrintFormData(this.productDetailFormData);
                delete this.formattedKeysFormData['Files']
                
                this.getPriceConfig();
                if (this.productPrice?.form_data && Array.isArray(result.data.product_price.form_data)) {
                    this.originalData = result.data.product_price.form_data.map((zoneData: any, i: number) => ({
                        zone: this.priceZone[i],
                        ...(zoneData || {})
                    }));
                }
            }
        });
    }
    
    formatAndPrintFormData(form: any) {
        const formattedObject: { [key: string]: any } = {};
        for (let key in form) {
            if (form.hasOwnProperty(key)) {
                const formattedKey = key
                .split('_') 
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' '); 
                formattedObject[formattedKey] = form[key]; 
            }
        }
        return formattedObject;
    }
    
    // delete funcation start //
    delete(id: string, api: string, label: string) {
        this.comanFuncation.delete(id, this.subModule, label, api, 'single_action', this.DetailId).subscribe((result: boolean) => {
            if (result === true) {
                this.getProductDetail();
            }
        });
    }
    // delete funcation end
    
    
    
    
    openModal(type:string) {
        const dialogRef = this.dialog.open(ProductModalComponent, {
            width: (type == 'point_category') ?  '400px' : '768px',
            data: {
                'pageType': type,
                'product_id': this.DetailId,
                ...(this.dispatchConfig && { dispatch_config: this.dispatchConfig }),
                'point_category_name': this.productDetail.point_category_name ? this.productDetail.point_category_name : '',
                'point_category_id': this.productDetail.point_category_id ? this.productDetail.point_category_id : '',
                'subModule':this.subModule,
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result === true){
                this.getProductDetail();
            }
        });
    }
    
    
    editPage(event:any){
        this.router.navigate(['/apps/master/products-list/product-details/'+ this.DetailId +'/edit']);
    }
    
    
    //-----------Price Architecture---------------//
    priceConfig: { label: string }[] = [];
    priceConfigType = {};
    priceZone = [];
    
    getPriceConfig(){
        this.skLoading = true;
        this.api.post({}, 'product/price-config').subscribe(result => {
            if(result['statusCode'] == 200){
                this.skLoading = false;
                this.priceConfigType = result['data']['price_type'];               
                this.priceZone = result['data']['zones'];
                this.priceConfig = result['data']['result'] ?? [];
                
                
            }
        });
    }
    
    onZonePriceChange(value: any, index: number, label: string) {
        if (!this.priceInputValues[index]) {
            this.priceInputValues[index] = {};
        }
        this.priceInputValues[index][label] = +value;
        if(this.priceConfigType === PRICE_TYPE[4])
            {
            const data:any = this.priceConfig?.find((row:any) => row.label === label)
            if (!!data?.customer_type_id) this.priceInputValues[index][`${label.replace(/net/gi, '').trim().replace(/\s+/g, '_').toLowerCase()}_id`] = data.customer_type_id;
        }
        
    }
    
    saveNetPrice()
    {
        let formData:any = null;
        if (this.priceConfigType === PRICE_TYPE[1] || this.priceConfigType === PRICE_TYPE[2]) {
            if(this.priceConfigType === PRICE_TYPE[2]){
                Object.entries(this.priceInputValues).forEach(([key, value]) => {
                    const data: any = this.priceConfig?.find((row: any) => row.label === key);
                    const row: any = {}; 
                    row[key] = value;
                    if (data?.customer_type_id) {
                        const dynamicKey = `${key.replace(/net/gi, '').trim().replace(/\s+/g, '_').toLowerCase()}_id`;
                        row[dynamicKey] = data.customer_type_id;
                    }
                    this.priceInputValues = {...this.priceInputValues,...row}
                });
            }
            formData = { ...this.priceInputValues };        
        }
        
        if (this.priceConfigType === PRICE_TYPE[3] || this.priceConfigType === PRICE_TYPE[4]) {
            this.priceInputValues = Object.values(this.priceInputValues);
            formData = this.priceInputValues.map((zoneData: any, i: number) => ({
                zone: this.priceZone[i],
                ...(zoneData || {})
            }));
        }
        this.updatedData = formData;
        
        this.alert.confirm("Are you sure?", "You want to update.", "Yes it!")
        .then((result) => {
            if (result.isConfirmed) {
                // const isEditMode = true
                // if (isEditMode) {
                //     const noChanges = this.logService.logActivityOnUpdateArray(
                //         isEditMode,
                //         this.originalData,
                //         this.updatedData,
                //         this.subModule.sub_module_id,
                //         this.subModule.sub_module_name,
                //         'update',
                //         this.DetailId || null,
                //         () => { },
                //         this.subModule.module_type
                //     );
                //     if (noChanges) {
                //         this.api.disabled = false;
                //         this.toastr.warning('No changes detected', '', 'toast-top-right');
                //         return;
                //     }
                    
                // }
                
                this.api.post({product_id: this.DetailId, form_data: formData}, 'product/save-price').subscribe(result => {
                    if(result['statusCode'] == 200){
                        this.getProductDetail();
                    }
                });
                
            }
        });
    }
}