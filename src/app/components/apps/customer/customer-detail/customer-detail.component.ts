import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { GalleryItem, Gallery, ImageItem, ImageSize, ThumbnailsPosition } from 'ng-gallery';
import { Lightbox, LightboxModule } from 'ng-gallery/lightbox';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ModuleService } from '../../../../shared/services/module.service';
import { FORMIDCONFIG } from '../../../../../config/formId.config';
import { ApiService } from '../../../../core/services/api/api.service';
import { DateService } from '../../../../shared/services/date.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomerModalComponent } from '../customer-modal/customer-modal.component';
import { ShowcodeCardComponent } from '../../../../shared/components/showcode-card/showcode-card.component';
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { register } from 'swiper/element';
import { LogService } from '../../../../core/services/log/log.service';
import { LogsComponent } from '../../../../shared/components/logs/logs.component';
import { ComanFuncationService } from '../../../../shared/services/comanFuncation.service';
import { NameUtilsService } from '../../../../utility/name-utils';
import { WalletHistoryComponent } from '../wallet-history/wallet-history.component';
import { RedeemListComponent } from '../../loyalty/redeem/redeem-list/redeem-list.component';
import { MaterialModuleModule } from '../../../../material-module/material-module.module';
import { PrimaryDashboardComponent } from '../dashboard/primary-dashboard/primary-dashboard.component';
import { InfluencerDashboardComponent } from '../dashboard/influencer-dashboard/influencer-dashboard.component';
import { SpkProductCardComponent } from '../../../../../@spk/reusable-apps/spk-product-card/spk-product-card.component';
import { CustomerDiscountListComponent } from '../customer-discount/customer-discount-list/customer-discount-list.component';
import { StockComponent } from '../stock/stock.component';
import { SpkMapsComponent } from '../../../../../@spk/spk-maps/spk-maps.component';
import { PrimaryOrderListComponent } from '../../order/primary-order/primary-order-list/primary-order-list.component';
import { LOGIN_TYPES } from '../../../../utility/constants';
import { HighlightService } from '../../../../shared/services/highlight.service';
import { PaymentListComponent } from '../../sfa/accounts/payment/payment-list/payment-list.component';
import { InvoiceListComponent } from '../../sfa/accounts/invoice/invoice-list/invoice-list.component';
import { ServiceCheckinListComponent } from '../../service/service-checkin/service-checkin-list/service-checkin-list.component';
import { AuthService } from '../../../../shared/services/auth.service';

Swiper.use([Autoplay, Navigation, Pagination]);
register();
@Component({
    selector: 'app-customer-detail',
    standalone: true,
    imports: [SharedModule,NgSelectModule, LightboxModule, OverlayscrollbarsModule, ShowcodeCardComponent, FormsModule, ReactiveFormsModule, LogsComponent, WalletHistoryComponent, PrimaryDashboardComponent, MaterialModuleModule, InfluencerDashboardComponent, SpkProductCardComponent, SpkMapsComponent, CustomerDiscountListComponent, StockComponent, PrimaryOrderListComponent, PaymentListComponent, InvoiceListComponent, ServiceCheckinListComponent],
    templateUrl: './customer-detail.component.html'
})

export class CustomerDetailComponent {
    @ViewChild('swiperContainer') swiperContainer!: ElementRef;
    customerType:any;
    customerTypeId:any
    customerLoginType:any;
    customerLoginTypeId: any;
    customerId:any;
    zoom = 4;
    profileNumber: number = 0;
    center: google.maps.LatLngLiteral = {lat: 24, lng: 12};
    submodule:any;
    FORMID:any= FORMIDCONFIG;
    basicDetail:any ={};
    otherDetail:any ={};
    bankDetail:any ={}
    logList:any =[];
    skLoading:boolean = false;
    activeTab:any = 'Basic Detail';
    LOGIN_TYPES:any;
    subActiveTab: any = 'Primary Orders'
    pageKey = 'customer-detail';
    contactPerson: any = [];
    marka:any =[];
    shippingAddress: any = [];
    assignUsers: any = [];
    shopGallery: any = [];
    assignDistributor: any = [];
    allDetails: any = {};
    kyc: any = {};
    document: any = [];
    statsCounts: any = [];
    profileStatus: any = [];
    accessRight:any = {};
    profilePic:any = {};
    orgData: any = {}
    tabs: any[] = [];
    
    
    constructor(public gallery: Gallery, public api:ApiService, public lightbox: Lightbox, public route:ActivatedRoute, public moduleService: ModuleService, private logService:LogService, public date:DateService, public dialog:MatDialog, private router: Router, public comanFuncation:ComanFuncationService,  private highlightService: HighlightService, public nameUtils: NameUtilsService,private authService: AuthService) {}
    
    ngOnInit() {
        this.orgData = this.authService.getOrg();
        this.LOGIN_TYPES = LOGIN_TYPES
        
        const accessRight = this.moduleService.getAccessMap('Customers');
        if (accessRight) {
            this.accessRight = accessRight;
        }
        
        const subModule = this.moduleService.getModuleByName('Customers');
        const form = this.moduleService.getModuleForm('Customers', this.FORMID.ID['Customer']);
        const tableId = this.moduleService.getModuleTable('Customers', this.FORMID.ID['CustomerTable']);
        let highlight = this.highlightService.getHighlight(this.pageKey);
        if (highlight != undefined) {
            this.activeTab = highlight.tab;
            this.highlightService.clearHighlight(this.pageKey);
        }
        
        if (subModule) {
            this.submodule = subModule;
        }
        if (form) {
            this.submodule.form_id = form.form_id;
        }
        if (tableId) {
            this.submodule.table_id = tableId.table_id;
        }
        
        this.route.paramMap.subscribe(params => {
            if(params){
                this.customerLoginType = params.get('login_type');
                this.customerLoginTypeId = params.get('login_type_id') ? Number(params.get('login_type_id')) : '';
                if (LOGIN_TYPES.SECONDARY === this.customerLoginTypeId){
                    this.subActiveTab = 'Secondary Orders'
                }
                this.customerType = params.get('type_name');
                this.customerTypeId = params.get('type_id');
                this.customerId = params.get('id');
                this.tabs = this.mainTabs(); // ✅ Call once and cache it
                this.getDetail();
            }
        });
    }
    
    onTabChange(tab: string) {
        this.activeTab = tab;
        if (this.activeTab === 'Account'){
            this.subActiveTab = 'Invoice';
        }
        if (this.activeTab === 'Orders'){
            if (LOGIN_TYPES.SECONDARY === this.customerLoginTypeId) {
                this.subActiveTab = 'Secondary Orders'
            }
            else{
                this.subActiveTab = 'Primary Orders'
            }
        }
        this.setHighLight()
    }
    
    setHighLight() {
        this.comanFuncation.setHighLight(this.pageKey, '', this.activeTab, '', '')
    }
    
    
    
    private  mainTabs(): any[] {
        return [
            { name: 'Basic Detail', label: 'Basic Detail', icon: 'ri-user-3-fill', },
            ...((this.customerLoginTypeId === LOGIN_TYPES.INFLUENCER) ? [
                { name: 'Influencer Dashboard', label: 'Dashboard', icon: 'ri-dashboard-fill',},
                { name: 'Wallet History', label: 'Wallet History', icon: 'ri-wallet-3-fill',},] : []),
                ...((this.customerLoginTypeId === LOGIN_TYPES.PRIMARY || this.customerLoginTypeId === LOGIN_TYPES.SUB_PRIMARY || this.customerLoginTypeId === LOGIN_TYPES.SECONDARY) ? [
                    { name: 'Dashboard', label: 'Dashboard', icon: 'ri-dashboard-fill',},
                    ...(this.customerLoginTypeId === LOGIN_TYPES.PRIMARY ||
                        this.customerLoginTypeId === LOGIN_TYPES.SUB_PRIMARY ? [
                            { name: 'Discount', label: 'Discount', icon: 'ri-price-tag-3-fill' },
                        ] : []),
                        { name: 'Orders', label: 'Orders', icon: 'ri-file-list-3-fill', },
                        ...(this.customerLoginTypeId === LOGIN_TYPES.PRIMARY ||
                            this.customerLoginTypeId === LOGIN_TYPES.SUB_PRIMARY ? [
                                { name: 'Account', label: 'Account', icon: 'ri-book-3-line' },
                            ] : []),
                            { name: 'Checkin', label: 'Checkin', icon: 'ri-map-pin-line', },
                            { name: 'Target', label: 'Target', icon: 'ri-focus-2-fill', },
                            
                        ] : []),
                        ...(this.orgData?.purchase_stock_base ? [ { name: 'Stock', label: 'Stock', icon: 'ri-box-3-fill', }]:[]),
                    ]
                }
                
                
                formattedKeysFormData: { [key: string]: any } = {};
                userDetailFormData:any;
                getDetail(){
                    this.skLoading = true
                    this.api.post({ "_id": this.customerId, 'module_id': this.submodule.module_id, 'sub_module_id': this.submodule.sub_module_id }, 'customer/detail').subscribe(result => {
                        if(result['statusCode'] === 200){
                            this.profilePercent();
                            this.getPerformance();
                            this.allDetails =result['data'];
                            this.basicDetail =result['data']['basic_detail'];
                            this.otherDetail = result['data']['other_detail'] ?? {};
                            this.bankDetail = result?.['data']?.['bank_detail'] ?? {};
                            this.contactPerson = result?.['data']?.['contact_person_detail'] ?? [];
                            this.marka = result?.['data']?.['marka'] ?? [];
                            this.shippingAddress = result?.['data']?.['shipping_address'] ?? [];
                            this.assignUsers = result?.['data']?.['user_to_customer_mapping'] ?? [];
                            this.shopGallery = result?.['data']?.['shop_gallery_detail'] ?? [];
                            this.assignDistributor = result?.['data']?.['customer_to_customer_mapping']?.['data'] ?? [];
                            this.kyc = result?.['data']?.['kyc_status_detail'] ?? {};
                            this.document = result?.['data']?.['doc_detail'] ?? [];
                            this.profileStatus = result?.['data']?.['profileStatus'] ?? [];
                            this.profilePic = this.document?.find((doc: any) => (doc.label === 'Profile Picture' || doc.label === 'Profile Pic'));
                            this.skLoading = false
                            this.logService.getLogs(this.submodule.module_id, (logs) => {
                                this.logList = logs;
                            },this.customerId ? this.customerId : '',this.submodule.module_type);
                            this.userDetailFormData = this.basicDetail?.form_data;
                            this.formattedKeysFormData = this.formatAndPrintFormData(this.userDetailFormData);
                            this.statsCounts =[
                                {"label":"Last Visit", "value": this.allDetails?.last_visit?.tat || '--', "class":"bg-primary" , 'icon':"ri-map-pin-line"  },
                                {"label":"Secondary Network", "value": '--',  "class":"bg-primarytint2color", 'icon':"ri-store-line" },
                                {"label":"Primary Sale", "value": '--', "class":"bg-primarytint3color", 'icon':"ri-money-rupee-circle-line"  },
                                {"label":"Secondary Sale", "value": this.allDetails?.secondary_sales_achievement?.total_net_amount_with_tax || '0',  "class":"bg-primarytint1color", 'icon':"ri-money-rupee-circle-line" },
                                {"label":"Last Order", "value": this.allDetails?.last_order?.tat || '--', "class":"bg-primarytint2color", 'icon':"ri-file-list-line"  },
                            ]
                        }
                        else{
                            this.skLoading = false
                        }
                    });
                }
                
                formatAndPrintFormData(form: any) {
                    const formattedObject: { [key: string]: any } = {}; // Create a new object to store formatted keys and values
                    
                    for (let key in form) {
                        if (form.hasOwnProperty(key)) {
                            const formattedKey = key
                            .split('_') // Split by underscore
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
                            .join(' '); // Join with spaces
                            
                            formattedObject[formattedKey] = form[key]; // Assign the original value to the new formatted key
                        }
                    }
                    
                    return formattedObject; // Return the new object with formatted keys
                }
                
                
                profilePercent(){
                    this.api.post({"_id":this.customerId}, 'home/read').subscribe(result => {
                        if(result['statusCode'] === 200){
                            this.profileNumber =result['data'];
                        }
                        else{
                        }
                    });
                }
                
                socialLinks:any =[];
                getPerformance() {
                    this.api.post({ '_id': this.customerId, 'page': 1 }, 'web-social/read-performance').subscribe(result => {
                        if (result['statusCode'] == 200) {
                            this.skLoading = false;
                            this.socialLinks = result['data'];
                        }
                    });
                }
                
                
                getIds(data:any){
                    return data.map((item: any) => (item.parent_customer_id));
                }
                
                getuserIds(data: any) {
                    return data.map((item: any) => (item.user_id));
                }
                
                
                openModal(type:string, row?:any) {
                    let data ={}
                    if(type == 'bank'){
                        data = this.bankDetail ? this.bankDetail : ''
                    }
                    if(type == 'contact_person'){
                        data = row ? row : ''
                    }
                    if (type == 'marka') {
                        data = row ? row : ''
                    }
                    if(type == 'shipping_address'){
                        data = row ? row : ''
                    }
                    
                    if (type == 'document_number' || type ==  'document_image'){
                        data = row ? row : ''
                    }
                    
                    if(type == 'wallet_history'){
                        data = this.basicDetail ? this.basicDetail : ''
                    }
                    
                    if (type == 'shop_gallery') {
                        data = this.basicDetail ? this.basicDetail : ''
                    }
                    
                    if(type == 'assign_user'){
                        data = this.getuserIds(this.assignUsers);
                        // this.allDetails.user_ids ? this.allDetails.user_ids : ''
                    }
                    if(type == 'assign_distibutor'){
                        let login_type_id = 5;
                        let parent_customer_id = this.getIds(this.assignDistributor);
                        data = {
                            login_type_id: login_type_id,
                            parent_customer_id: parent_customer_id
                        };
                        
                    }
                    if(type == 'kyc'){
                        data = row ? row : ''
                    }
                    
                    if(type == 'profile_status'){
                        data = this.basicDetail.profile_status ? this.basicDetail.profile_status : ''
                    }
                    if (type == 'other_information' || type == 'point_location'){
                        data = this.otherDetail ? this.otherDetail : ''
                    }
                    const dialogRef = this.dialog.open(CustomerModalComponent, {
                        width: (type == 'document_number' || type == 'document_image') ?  '400px' : '768px',
                        data: {
                            'pageType': type,
                            'data':data,
                            fromPrimaryOrderAdd: false,
                            'customer_id':this.customerId,
                            'customer_type':this.customerType,
                            'customer_type_id': this.customerTypeId,
                            'customer_name': this.basicDetail.customer_name,
                            'submodule':this.submodule,
                            'profile_status':this.profileStatus,
                            'customerLoginTypeId':this.customerLoginTypeId,
                        }
                    });
                    dialogRef.afterClosed().subscribe(result => {
                        if(result === true){
                            this.getDetail();
                        }
                    });
                }
                
                
                
                // delete funcation start //
                delete(id: string, api:string, label:string) {
                    this.comanFuncation.delete(id, this.submodule, label, api, 'single_action',this.customerId).subscribe((result: boolean) => {
                        if (result === true) {
                            this.getDetail();
                        }
                    });
                }
                // delete funcation end
                
                editPage(event:any){
                    if(this.activeTab === 'Basic Detail'){
                        this.router.navigate(['/apps/customer/customer-list/' + this.customerLoginType + '/' + this.customerLoginTypeId + '/' + this.customerType + '/' + this.customerTypeId + '/customer-edit/' + this.customerId + '/edit']);
                    }
                    else{
                        this.openModal(this.activeTab.toLowerCase().replace(/\s+/g, "_"))
                    }
                }
                
                isFallback = false;
                onError(event: any) {
                    this.isFallback = true;
                    event.target.src = `${this.api.rootUrl}brand-logos/${this.orgData?.org_name}/desktop-logo.png`
                }
                
                // ******status change funcation start*****//
                onToggleChange(newState: boolean, id: string, status: string) {
                    this.comanFuncation.statusChange(newState, id, status, this.submodule, 'toggle', 'customer/update-status').subscribe((result: boolean) => {
                        this.getDetail();
                    });
                }
                
                showForLoginTypes(types: number[], options: { exclude?: boolean } = {}): boolean {
                    const isIncluded = types.includes(this.customerLoginTypeId);
                    return options.exclude ? !isIncluded : isIncluded;
                }
            }
            