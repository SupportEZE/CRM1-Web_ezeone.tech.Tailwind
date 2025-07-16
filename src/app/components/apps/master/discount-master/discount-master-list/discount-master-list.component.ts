import { Component,Input,NgModule, ViewChild } from '@angular/core';
import { ModuleService } from '../../../../../shared/services/module.service';
import { ApiService } from '../../../../../core/services/api/api.service';
import { FORMIDCONFIG } from '../../../../../../config/formId.config';
import { SharedModule } from '../../../../../shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { ModalsComponent } from '../../../../../shared/components/modals/modals.component';
import { FormFieldTypes } from '../../../../../utility/constants';
import { FormValidationService } from '../../../../../utility/form-validation';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { UtilService } from '../../../../../utility/util.service';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { CommonModule } from '@angular/common';
import { DiscountMasterAddComponent } from '../discount-master-add/discount-master-add.component';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import { CommonApiService } from '../../../../../shared/services/common-api.service';
import { API_ENDPOINTS } from '../../../../../utility/api-endpoints';
import { HighlightService } from '../../../../../shared/services/highlight.service';

@Component({
    selector: 'app-discount-master-list',
    imports: [SharedModule,CommonModule,SpkReusableTablesComponent,FormsModule],
    templateUrl: './discount-master-list.component.html',
})
export class DiscountMasterListComponent {
    @ViewChild('reusableTable') reusableTable!: any;
    FORMID:any= FORMIDCONFIG;
    filter: any = {};
    sorting: any = {};
    skLoading:boolean = false
    tableData:any = {};
    tableHeader:any = [];
    moduleName:string = '';
    moduleId:number=0
    subModule:any={};
    moduleFormId:number=0;
    categoryModuleFormId:number=0;
    moduleTableId:number =0;
    categoryModuleTableId:number =0;
    originalFormFields: any[] = []; // Store API response separately
    @Input() formFields: any[] = [];
    readonly fieldTypes = FormFieldTypes;
    formIniatialized: boolean = false;
    myForm!: FormGroup;
    activeTab:any ='';
    activeTabValue:any ='';
    activeSubTab:any ='Category';
    mainTabs:any  = [];
    subTab: any = [];
    page: number = 1;
    pagination:any={};
    
    constructor(public moduleService: ModuleService,public api:ApiService,public dialog: MatDialog,private formValidation: FormValidationService,private fb: FormBuilder,public util:UtilService, public comanFuncation: ComanFuncationService, public CommonApiService: CommonApiService, private highlightService: HighlightService){}
    
    ngOnInit() {
        const subModule = this.moduleService.getSubModuleByName('Masters', 'Discount Master');
        
        const form = this.moduleService.getFormById('Masters', 'Discount Master', this.FORMID.ID['DisMasterProductForm']);
        const tableId = this.moduleService.getTableById('Masters', 'Discount Master', this.FORMID.ID['DisMasterProductTable']);
        
        const CategoryForm = this.moduleService.getFormById('Masters', 'Discount Master', this.FORMID.ID['DisMasterCategoryForm']);
        const CategoryTable = this.moduleService.getTableById('Masters', 'Discount Master', this.FORMID.ID['DisMasterCategoryTable']);
        
        if (subModule) {
            this.subModule = subModule;
        }
        
        if (form) {
            this.moduleFormId = form.form_id;
        }
        
        if (CategoryForm) {
            this.categoryModuleFormId = CategoryForm.form_id;
        }
        this.getFormData();
        
        if (tableId) {            
            this.moduleTableId = tableId.table_id;
        }
        
        if (CategoryTable) {            
            this.categoryModuleTableId = CategoryTable.table_id;
        }
        
        // if (this.activeSubTab === 'Product') {
        this.getProductCustomerType();
        // }
        
        // const highlight = this.highlightService.getHighlight('discount-tabs');
        
        // if (highlight) {
        //     this.activeTab = highlight.tab || this.mainTabs[0]?.label || '';
        //     this.activeSubTab = highlight.subTab || 'Product';
        // } else {
        //     this.activeTab = this.mainTabs[0]?.label || '';
        //     this.activeSubTab = 'Product';
        // }
        // setTimeout(() => {
        //     this.getHeaderConfigListing();
        // }, 100);
    }
    
    getModuleConfigByTab(tab: 'Product' | 'Category') {
        return {
            formId: tab === 'Product' ? this.moduleFormId : this.categoryModuleFormId,
            tableId: tab === 'Product' ? this.moduleTableId : this.categoryModuleTableId,
            getListFn: tab === 'Product' ? this.getProductDisList.bind(this) : this.getCategoryDisList.bind(this)
        };
    }
    
    onRefresh()
    {
        // const highlight = this.highlightService.getHighlight('discount-tabs');
        // if (highlight) {
        //     this.activeTab = highlight.tab || '';
        //     this.activeSubTab = highlight.subTab || 'Product'; // fallback if not stored
        // }
        
        this.filter = {};
        this.reusableTable.clearSearchInputs();
        this.getHeaderConfigListing();
        this.getProductCustomerType();
    }
    
    // Function to change the active tab
    onTabChange(tab: string, subTab: string) {
        this.activeTab = tab;
        this.activeSubTab = subTab;
        // this.highlightService.setHighlight('discount-tabs', {
        //     tab,
        //     subTab,
        //     rowId: '',
        //     filters: {},
        //     pageIndex: 1
        // });
        
        this.getHeaderConfigListing();
        this.getTabValue();
        this.getFormData();
    }
    
    // Function to change the active sub-tab
    onSubTabChange(subTab: string) {
        this.activeSubTab = subTab;
        
        // Update just the subTab in highlight
        // const existing = this.highlightService.getHighlight('discount-tabs') || {};
        // this.highlightService.setHighlight('discount-tabs', {
        //     ...existing,
        //     subTab
        // });
        
        this.getHeaderConfigListing();
        this.getFormData();
    }
    
    //---------Expense Policy Listing----------//
    listPageData:any = {};
    PageTableData:any = {};
    allPageHeaders:any = [];
    
    getHeaderConfigListing() {
        const config = this.getModuleConfigByTab(this.activeSubTab as 'Product' | 'Category');
        
        this.CommonApiService.getHeaderConfigListing(config.tableId, config.formId).subscribe((result:any) => {
            this.tableData = result.data;
            this.tableHeader =   result['data']['table_data']['tableHead'];            
            // --------- For columns filter in productListing//
            this.tableHeader = this.tableHeader.filter((header: any) => header.list_view_checked);
            // ---------//
            config.getListFn();
        });
    }
    
    productListing:any = [];    
    getProductDisList() {
        this.skLoading = true;
        this.api.post({filters: this.filter, 'customer_type_id': this.activeTabValue, page: this.pagination.cur_page ?? 1}, API_ENDPOINTS.PRODUCT.PRODUCT_DISCOUNT).subscribe(result => {
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
        this.api.post({filters: this.filter, 'customer_type_id': this.activeTabValue, page: this.pagination.cur_page ?? 1}, API_ENDPOINTS.PRODUCT.CATEGORY_DISCOUNT).subscribe(result => {
            if (result['statusCode'] == '200') {
                this.skLoading = false;
                this.categoryListing = result['data'];
                this.pagination = result['pagination'];
            }
        });
    }
    
    getProductCustomerType() {
        this.skLoading = true;
        this.api.post({}, API_ENDPOINTS.PRODUCT.CUSTOMER_TYPE).subscribe(result => {
            if (result['statusCode'] == '200') {
                this.skLoading = false;
                this.mainTabs = result['data'];
                this.activeTab = this.mainTabs[0].label;
                
                this.getTabValue()
                
                // Sub-Tabs
                this.subTab = [
                    { name: 'Category', label: 'Category', icon: 'ri-apps-fill', },
                    { name: 'Product', label: 'Product', icon: 'ri-box-3-fill',},
                ];

                this.getHeaderConfigListing();
            }
        });
    }
    
    getTabValue()
    {
        const matchedTab = this.mainTabs.find((tab:any) => tab.label === this.activeTab);
        this.activeTabValue = matchedTab?.value || null;
    }
    
    updateSearchFilter(event: {searchText: string; name: string }) {
        this.filter[event.name] = event.searchText;
        
        const config = this.getModuleConfigByTab(this.activeSubTab as 'Product' | 'Category');
        config.getListFn();
        // this.getProductDisList();
    }    
    
    //---------ExpensePolicy Listing----------//
    
    getFormData(){
        const config = this.getModuleConfigByTab(this.activeSubTab as 'Product' | 'Category');
        
        this.CommonApiService.getFormData(config.formId).subscribe((result:any) => {
            // this.api.post({"form_id": config.formId, 'platform':'web'}, 'form-builder/read').subscribe(result => {
            if(result['statusCode'] == 200){
                if (result?.data?.form_data) {
                    this.originalFormFields = JSON.parse(JSON.stringify(result.data.form_data));
                }
                this.formFields = result['data']['form_data'];
            }
        });
    }
    
    openModal(event:any) {
        const config = this.getModuleConfigByTab(this.activeSubTab as 'Product' | 'Category');
        
        const dialogRef = this.dialog.open(ModalsComponent, {
            data: {
                'lastPage':'enquiry',
                'form_Fields':this.originalFormFields,
                'moduleFormId':config.formId,
                "moduleId":this.subModule.module_id,
                "moduleName":this.subModule.title,
                'moduleData':this.subModule,
                'activeSubTab':this.activeSubTab,
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result === true){
                this.getHeaderConfigListing();
            }
        });
    }
    
    
    update(row?: any) {
        const dialogRef = this.dialog.open(DiscountMasterAddComponent, {
            width: '768px',
            data: {
                'lastPage':'discount-master-add',
                'formType': row ? 'edit' : 'create',
                'formData': row || {},
                'activeTab': this.activeTab,
                'activeTabValue': this.activeTabValue,
                'activeSubTab': this.activeSubTab,
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result === true){
                this.getHeaderConfigListing();
            }
        });
    }
    
    
    // ***** List Logs Modal Start *****//
    openMainLogModal(row_id?:string) {
        this.comanFuncation.listLogsModal(this.subModule.sub_module_id, row_id, this.subModule.module_type).subscribe(result => {
        });
    }
    // ***** List Logs Modal End *****//
    
}
