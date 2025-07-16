import { Component, Input } from '@angular/core';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../../shared/shared.module';
import { ApiService } from '../../../../../core/services/api/api.service';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import { API_ENDPOINTS } from '../../../../../utility/api-endpoints';
import { MatDialog } from '@angular/material/dialog';
import { CustomerDiscountAddComponent } from '../customer-discount-add/customer-discount-add.component';
import { ModuleService } from '../../../../../shared/services/module.service';

@Component({
    selector: 'app-customer-discount-list',
    imports: [SharedModule,CommonModule,SpkReusableTablesComponent,MaterialModuleModule],
    templateUrl: './customer-discount-list.component.html',
})
export class CustomerDiscountListComponent {
    @Input() basicDetail !:any
    page:any = 1;
    pagination:any={};    
    skLoading:boolean = false
    filter: any = {};
    activeTab: string = 'Category';
    subModule:any = {};
    accessRight:any = {};
    
    constructor(public api: ApiService,public comanFuncation: ComanFuncationService, public dialog: MatDialog, private moduleService: ModuleService){}
    
    ngOnInit() {
        const accessRight = this.moduleService.getAccessMap('Customers');
        if (accessRight) {
            this.accessRight = accessRight;
        }
        
        const subModule = this.moduleService.getModuleByName('Customers');
        if (subModule) {
            this.subModule = subModule;
        }
        
        this.getCategoryDisList();
    }
    
    onRefresh()
    {
        this.filter = {};
        
        if(this.activeTab === 'Product'){
            this.getProductDisList();
        }
        else{
            this.getCategoryDisList();
        }
    }
    
    onTabChange(tab: string) {
        this.activeTab = tab;
        if(this.activeTab === 'Product'){
            this.getProductDisList();
        }
        else{
            this.getCategoryDisList();
        }
    }
    
    productListing:any = [];    
    getProductDisList() {
        this.skLoading = true;
        this.api.post({
            'customer_id': this.basicDetail._id, 
            'customer_type_id': this.basicDetail.customer_type_id,
            filters: this.filter, 
            page: this.pagination.cur_page ?? 1
        }, API_ENDPOINTS.CUSTOMER_DISCOUNT.PRODUCT_DISCOUNT).subscribe(result => {
            if (result['statusCode'] == '200') {
                this.skLoading = false;
                this.productListing = result['data'];
                this.pagination = result['pagination'];
            }
        });
    }
    
    
    categoryListing:any = [];
    getCategoryDisList() {
        this.skLoading = true;
        this.api.post({
            'customer_id': this.basicDetail._id,
            'customer_type_id': this.basicDetail.customer_type_id,
            filters: this.filter,
            page: this.pagination.cur_page ?? 1
        }, API_ENDPOINTS.CUSTOMER_DISCOUNT.CATEGORY_DISCOUNT).subscribe(result => {
            if (result['statusCode'] == '200') {
                this.skLoading = false;
                this.categoryListing = result['data'];
                this.pagination = result['pagination'];
            }
        });
    }
    
    // getDiscountSum(formData: any): string {
    //     if (!formData || typeof formData !== 'object') return '0';
    //     const values = Object.values(formData).filter(v => typeof v === 'number');
    //     const sum = values.reduce((total, val) => total + val, 0);
    //     return values.join(' + ');
    // }
    
    // getDiscountSum(formData: any): string {
    //     if (!formData || typeof formData !== 'object') return '0';
    
    //     const entries = Object.entries(formData)
    //     .filter(([_, value]) => typeof value === 'number')
    //     .map(([key, value]) => `${this.formatLabel(key)}: ${value}`);
    
    //     return entries.join(' + ');
    // }
    
    getDiscountSumHtml(formData: any): string {
        if (!formData || typeof formData !== 'object') return '0';
        
        const entries = Object.entries(formData)
        .filter(([_, value]) => typeof value === 'number')
        .map(([key, value]) => `${this.formatLabel(key)}: <span class="font-semibold text-[13px] mx-1 text-primary my-1">${value}</span>`);
        
        return entries.join(' + ');
    }
    
    // Optional: Format keys nicely (e.g., "diwali_discount" => "Diwali Discount")
    formatLabel(key: string): string {
        return key
        .replace(/_/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());
    }
    
    
    update(row?: any) {
        const dialogRef = this.dialog.open(CustomerDiscountAddComponent, {
            width: '768px',
            data: {
                'lastPage':'discount-master-add',
                'formType': row ? 'edit' : 'create',
                'formData': row || {},
                'activeTab': this.activeTab,
                'basicDetail': this.basicDetail
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result === true){
                if(this.activeTab === 'Product'){
                    this.getProductDisList();
                }
                else{
                    this.getCategoryDisList();
                }
            }
        });
    }
    
    // ***** List Logs Modal Start *****//
    openMainLogModal(row_id?:string) {
        this.comanFuncation.listLogsModal(this.subModule.module_id, row_id, this.subModule.module_type).subscribe(result => {
        });
    }
    // ***** List Logs Modal End *****//
    
    mainTabs = [
        { name: 'Category', label: 'Category', icon: 'ri-apps-fill', },
        { name: 'Product', label: 'Product', icon: 'ri-box-3-fill',},
    ];
    
    PageHeaders = [
        {label: 'Product'},
        {label: 'Default (%)'},
        {label: 'Customize (%)'},
    ];
    
    PageHeaders1 = [
        {label: 'Category'},
        {label: 'Default (%)'},
        {label: 'Customize (%)'},
    ];
}
