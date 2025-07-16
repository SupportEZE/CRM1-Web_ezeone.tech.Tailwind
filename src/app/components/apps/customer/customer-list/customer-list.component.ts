import { Component, ViewChild } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { SpkReusableTablesComponent } from '../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { FormBuilder, FormControl, FormsModule } from '@angular/forms';
import { SortablejsModule } from '@maksim_m/ngx-sortablejs';
import { ToastrModule } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RemoveSpaceService } from '../../../../core/services/remove-space/removeSpace.service';
import { ToastrServices } from '../../../../shared/services/toastr.service ';
import { ApiService } from '../../../../core/services/api/api.service';
import { LogService } from '../../../../core/services/log/log.service';
import { SweetAlertService } from '../../../../core/services/alert/sweet-alert.service';
import { MatDialog } from '@angular/material/dialog';
import { ModuleService } from '../../../../shared/services/module.service';
import { ComanFuncationService } from '../../../../shared/services/comanFuncation.service';
import { DateService } from '../../../../shared/services/date.service';
import { FORMIDCONFIG } from '../../../../../config/formId.config';
import { FormFieldTypes } from '../../../../utility/constants';
import { ModalsComponent } from '../../../../shared/components/modals/modals.component';
import { CommonApiService } from '../../../../shared/services/common-api.service';
import { HighlightService } from '../../../../shared/services/highlight.service';

@Component({
    selector: 'app-customer-list',
    imports: [SharedModule,CommonModule,RouterModule,SpkReusableTablesComponent,FormsModule,SortablejsModule,ToastrModule],
    // SpkListviewCardComponent, SpkDropdownsComponent
    templateUrl: './customer-list.component.html'
})
export class CustomerListComponent {
    @ViewChild('reusableTable') reusableTable!: any;
    Date = Date;
    isNaN = isNaN;
    range: any;
    customerType:any;
    customerTypeId: any;
    customerLoginType:any;
    customerLoginTypeId: any;
    skLoading:boolean = false
    filter:any ={}
    sorting: any = {};
    userPageDropdowns:any = {}
    listData:any =[]
    pagination:any = {}
    submodule:any;
    FORMID:any= FORMIDCONFIG;
    readonly fieldTypes = FormFieldTypes;
    activeTab:any ='Active';
    pageKey = 'customer-list';
    highlightedId: string | undefined;
    accessRight:any = {};
    
    constructor(private toastr: ToastrServices,public api:ApiService, public remove:RemoveSpaceService, private logService:LogService, public alert : SweetAlertService, private router: Router, public dialog: MatDialog, private fb: FormBuilder, public moduleService: ModuleService, public comanFuncation: ComanFuncationService, public dateService:DateService, public route:ActivatedRoute, public CommonApiService: CommonApiService, private highlightService: HighlightService) {
        this.range = this.fb.group({
            start: new FormControl<Date | null>(null),
            end: new FormControl<Date | null>(null)
        });        
    }
    
    ngOnInit(){
        const accessRight = this.moduleService.getAccessMap('Customers');
        if (accessRight) {
            this.accessRight = accessRight;
        }
        
        // const subModule = this.moduleService.getModuleByName('Customers');
        // const form = this.moduleService.getModuleForm('Customers', this.FORMID.ID['Customer']);
        // if (subModule) {
        //     this.submodule = subModule;
        // }
        // if (form) {
        //     this.submodule.form_id = form.form_id;
        // }
        
        
        this.route.params.subscribe(params => {
            if (params) {
                this.customerLoginType = params['login_type'];
                this.customerLoginTypeId = params['login_type_id'];
                this.customerType = params['type_name'];
                this.customerTypeId = params['type_id'];
                const highlight = this.highlightService.getHighlight(this.pageKey);
                if (highlight !== undefined) {
                    this.activeTab = highlight.tab;
                    this.highlightedId = highlight.rowId;
                    this.pagination.cur_page = highlight.pageIndex;
                    this.filter = highlight.filters;
                    this.highlightService.clearHighlight(this.pageKey);
                } else {
                    this.activeTab = (this.customerLoginType === 'Influencer') ? 'Pending' : 'Active';
                }
                
                const subModule = this.moduleService.getModuleByName('Customers');
                this.customerType = this.customerType?.replace(/_/g, ' ') || '';
                const matchedChild = subModule?.children?.find((child: any) => child.title === this.customerType);
                let form
                let table
                if (matchedChild && matchedChild.tables?.length) {
                    table = matchedChild.tables[0];
                }
                
                if (matchedChild && matchedChild.forms?.length) {
                    form = matchedChild.forms[0];
                }
                
                if (subModule) {
                    this.submodule = subModule;
                }
                if (form && table) {
                    this.submodule.form_id = form.form_id;
                    this.submodule.table_id = table.table_id;
                    
                    // this.moduleFormId = form.form_id;
                    this.getHeaderConfigListing();
                }
            }
        });
        
        
        
        
    }
    
    isHighlighted(id: string): boolean {
        return this.highlightedId === id;
    }
    
    setHighLight(rowId: string) {
        this.comanFuncation.setHighLight(this.pageKey, rowId, this.activeTab, this.filter, this.pagination.cur_page ? this.pagination.cur_page : 1)
    }
    
    mainTabs:any =[] 
    getList() {
        this.skLoading = true;
        if(this.filter.state){
            this.getDistrict(this.filter.state);
        }
        this.api.post({ filters: this.filter, 'login_type_name': this.customerLoginType, 'login_type_id': Number(this.customerLoginTypeId), 'customer_type_name': this.customerType, 'customer_type_id': this.customerTypeId, sorting: this.sorting, 'page': this.pagination.cur_page ?? 1, 'active_tab': this.activeTab, 'dropdown': this.userPageDropdowns }, 'customer/read').subscribe(result => {
            if (result['statusCode']  ===  200) {
                this.skLoading = false;
                this.listData = result['data']['result'];
                this.mainTabs = result['data']['profile_status_tabs'];
                this.listData.forEach((row: any) => row.isChecked = row.status === 'Active');
                this.pagination = result['pagination'];
            }
        });
    }
    
    getState(){
        this.api.post({}, 'postal-code/states').subscribe(result => {
            if(result['statusCode'] === 200){
                for (let i = 0; i < this.visibleHeaders.length; i++) {
                    if(this.visibleHeaders[i]['name'] === 'state'){
                        this.visibleHeaders[i]['options'] = result['data'];
                    }
                }
            }
        });
    }
    getDistrict(state:string){
        this.api.post({"state": state,}, 'postal-code/districts').subscribe(result => {
            if(result['statusCode'] === 200){
                for (let i = 0; i < this.visibleHeaders.length; i++) {
                    if(this.visibleHeaders[i]['name'] === 'district'){
                        this.visibleHeaders[i]['options'] = result['data'];
                    }
                }
            }
        });
    }
    
    changeToPagination(btnType: string) {
        if (btnType == 'Previous') {
            if (this.pagination.prev && this.pagination.cur_page > 1) {
                this.pagination.cur_page--;  // Decrement the pagination.cur_page number
                this.getList();
            }
        }
        else
        {
            if (this.pagination.next) {
                this.pagination.cur_page++;  // Increment the pagination.cur_page number
                this.getList();
            }
        }
    }
    
    changeToPage(newPage: number) {
        this.pagination.cur_page = newPage;
        this.getList();
    }
    // --------//
    
    
    onTabChange(tab: any) {
        this.activeTab = tab;
        this.getList();
    }
    
    tableConfigData:any = {};
    visibleHeaders:any = [];
    getHeaderConfigListing() {
        this.CommonApiService.getHeaderConfigListing(this.submodule.table_id , this.submodule.form_id).subscribe((result: any) => {
            this.tableConfigData = result.data.table_data;
            const allHeaders = this.tableConfigData['tableHead'];
            
            // --------- For columns filter in listing//
            this.visibleHeaders = allHeaders.filter((header: any) => header.list_view_checked && header.key_name_required !== true && header.type != this.fieldTypes.UPLOAD);
            
            this.getList();
            // ---------//
            
        });
        
    }
    
    onSortChanged(event: { field: string; order: number }) {
        this.sorting = {};
        this.sorting[event.field] = event.order;
        this.getList();
    }
    
    
    handleSelectionChange(event: { category_name: string; selections: string[] }): void {
        const { category_name, selections } = event;
        this.filter[category_name] = selections;
        this.getList();
    }
    
    updateSearchFilter(event: {searchText: string; name: string }) {
        this.filter[event.name] = event.searchText;
        this.getList();
    }
    
    handleDateRangeChange(event: { [key: string]: { start: string; end: string } }) {
        this.filter = event;
        this.getList();
    }
    
    
    
    
    onRefresh(){
        this.filter = {};
        this.reusableTable.clearSearchInputs();
        this.getHeaderConfigListing();
    }
    
    
    // ***** List Logs Modal Start *****//
    openMainLogModal(row_id:string) {
        this.comanFuncation.listLogsModal(this.submodule.module_id, row_id, this.submodule.module_type).subscribe(result => {
        });
    }
    // ***** List Logs Modal End *****//
    
    // *****Status Change Funcation Start*****//
    onToggleChange(newState: boolean, id: string, status: string) {
        this.comanFuncation.statusChange(newState, id, status, this.submodule, 'toggle','customer/update-status',).subscribe((result: boolean) => {
            if (result) {
                this.getHeaderConfigListing();
            } else {
                this.getHeaderConfigListing();
            }
        });
    }
    // *****Status Change Funcation End*****//
    
    goToPage()
    {
        this.router.navigate(['/apps/customer/customer-list/' + this.customerLoginType + '/' + this.customerLoginTypeId + '/' + this.customerType + '/' + this.customerTypeId + '/customer-add']);
    }
    
    
    
    
    openHeaderSettingModal() {
        const dialogRef = this.dialog.open(ModalsComponent, {
            width: '450px',
            panelClass: 'mat-right-modal',
            position: { right: '0px' },
            data: {
                'lastPage':'header-config',
                'moduleFormId':this.submodule.form_id,
                'moduleTableId':this.submodule.table_id,
                'moduleName':this.submodule.title,
                "tableConfigData": this.tableConfigData,
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.visibleHeaders = result.headers;
                this.getHeaderConfigListing();
            }
        });
    }
    
    isValidDate(value: any): boolean {
        return typeof value === 'string' && !isNaN(Date.parse(value));
    }
    
    isDateHeader(name: string): boolean {
        return name?.includes('date') || name?.endsWith('_at') || name?.endsWith('_app_login') || name?.endsWith('dob');
    }
    
    getDateFormat(headerName: string): string {
        const onlyDateFields = ['dob']; // add more keys as needed
        
        return onlyDateFields.includes(headerName) ? 'd MMM yyyy' : 'd MMM yyyy, hh:mm a';
    }
}
