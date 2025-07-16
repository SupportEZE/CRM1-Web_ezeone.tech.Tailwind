import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { SortablejsModule } from '@maksim_m/ngx-sortablejs';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { ModuleService } from '../../../../../shared/services/module.service';
import { MatDialog } from '@angular/material/dialog';
import { LogService } from '../../../../../core/services/log/log.service';
import { SweetAlertService } from '../../../../../core/services/alert/sweet-alert.service';
import { ApiService } from '../../../../../core/services/api/api.service';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { FORMIDCONFIG } from '../../../../../../config/formId.config';
import Swal from 'sweetalert2';
import { DateService } from '../../../../../shared/services/date.service';
import { CommonApiService } from '../../../../../shared/services/common-api.service';
import { ModalsComponent } from '../../../../../shared/components/modals/modals.component';
import { LOGIN_TYPES } from '../../../../../utility/constants';
import { AuthService } from '../../../../../shared/services/auth.service';

@Component({
    selector: 'app-expense-list',
    imports: [
        SharedModule,
        MaterialModuleModule,
        CommonModule,
        RouterModule,
        SpkReusableTablesComponent,
        FormsModule,
        SortablejsModule
    ],
    templateUrl: './expense-list.component.html',
})
export class ExpenseListComponent {
    @ViewChild('reusableTable') reusableTable!: any;
    
    activeTab:any;
    module_table:any = {};
    module_form:any = {};
    skLoading:boolean = false
    subModule: any={};
    moduleFormId:number=0;
    moduleTableId:number =0;
    FORMID:any= FORMIDCONFIG;
    expensePageTableData:any = {};
    allexpensePageHeaders:any = [];
    expensePageHeaders:any = [];
    expensePageDropdowns:any = {};
    expenseData:any = [];
    expenseListing:any = [];
    dropdownOptions:any = [];
    expenseListPagination:any = {};
    page: number = 1;
    filter: any = {};
    sorting: any = {};
    listPageData:any = {};
    expensePageDropdownOption:any = [];
    view: any;
    expenseTabs: any = {};
    mainTabs:any = [];
    accessRight:any = {};
    OrgLoginData:any;
    orgData:any;
    loginTypeId:any;
    
    constructor(
        private toastr: ToastrServices,
        public api:ApiService,
        public alert : SweetAlertService,
        private fb: FormBuilder,
        private router: Router,
        private logService:LogService,
        public dialog: MatDialog,
        public moduleService: ModuleService,
        private dateService: DateService,
        public CommonApiService: CommonApiService,
        private authService: AuthService
    ){}
    
    ngOnInit() {
        const accessRight = this.moduleService.getAccessMap('SFA', 'Expense');
        if (accessRight) {
            this.accessRight = accessRight;
        }
        const subModule = this.moduleService.getSubModuleByName('SFA', 'Expense');
        const form = this.moduleService.getFormById('SFA', 'Expense', this.FORMID.ID['ExpenseFormData']);
        const tableId = this.moduleService.getTableById('SFA', 'Expense', this.FORMID.ID['ExpenseTable']);
        if (subModule) {
            this.subModule = subModule;
        }
        if (form) {
            this.moduleFormId = form.form_id;
        }
        if (tableId) {
            this.moduleTableId = tableId.table_id;
        }
        this.OrgLoginData = this.authService.getUser();
        this.orgData = this.authService.getOrg();
        console.log(this.orgData?.is_expesne_senior_status, 'this.orgData');
        
        
        
        this.getHeaderConfigListing();
        
        this.loginTypeId = this.OrgLoginData?.login_type_id;
        if (this.loginTypeId === LOGIN_TYPES.ORGANIZATION_ADMIN) {
            this.activeTab = 'Submitted';
        }
        else{
            this.activeTab = 'Draft';
        }
    }
    
    onRefresh()
    {
        this.filter = {};
        this.reusableTable.clearSearchInputs();
        this.getHeaderConfigListing();
    }
    
    updateExpenseWiseExpense(row?: any) {
        this.router.navigate(['/apps/sfa/expense-list/expense-add']);
    }
    
    tableConfigData:any = {};
    visibleHeaders:any = [];
    getHeaderConfigListing() {
        this.CommonApiService.getHeaderConfigListing(this.moduleTableId, this.moduleFormId).subscribe((result: any) => {
            this.tableConfigData = result?.data?.table_data;
            const allHeaders = this.tableConfigData?.['tableHead'];
            this.visibleHeaders = allHeaders.filter((header: any) => {
                if (
                    (header.name === 'senior_status' || header.name === 'senior_status_remark')
                ) {
                    return this.orgData?.is_expesne_senior_status && header.list_view_checked;
                }
                return header.list_view_checked;
            });
            console.log(this.visibleHeaders, 'visibleHeaders');
            this.getList();
            // ---------//
        });
    }
    
    onTabChange(tab: string) {
        this.activeTab = tab;
        this.getList();
    }
    
    goToDetailPage(rowId:any)
    {
        this.router.navigate(['/apps/sfa/expense-list/expense-detail' , rowId]);
    }
    
    onCheckboxChange(item: any, type: string, event: Event) {
        const target = event.target as HTMLInputElement;
        if (type === 'view') {
            item.list_view_checked = target.checked; 
        } else if (type === 'filter') {
            item.filter_checked = target.checked;        
        }        
    }
    
    getList() {
        this.skLoading = true;
        this.api.post({filters: this.filter, 'activeTab' : this.activeTab, sorting: this.sorting, 'page': this.page}, 'expense/read').subscribe(result => {
            if (result['statusCode'] === 200 ) {
                this.skLoading = false;
                this.expenseListing = result['data']['result'];
                this.expenseTabs = result['data']['expense_status_tabs'];
                this.mainTabs = [
                    // { name: 'Draft', label: 'Draft', icon: 'ri-sticky-note-fill', count: this.expenseTabs.find((tab: { darftCount: undefined; }) => tab.darftCount !== undefined)?.darftCount },
                    ...(this.loginTypeId !== LOGIN_TYPES.ORGANIZATION_ADMIN ? [{ name: 'Draft', label: 'Draft', icon: 'ri-sticky-note-fill', count: this.expenseTabs.find((tab: { darftCount: undefined; }) => tab.darftCount !== undefined)?.darftCount }] : []),
                    { name: 'Submitted', label: 'Submitted', icon: 'ri-calendar-check-fill', count: this.expenseTabs.find((tab: { submittedCount: undefined; }) => tab.submittedCount !== undefined)?.submittedCount || 0 },
                    { name: 'Approved',  label: 'Approved',  icon: 'ri-upload-2-fill',  count: this.expenseTabs.find((tab: { approvedCount: undefined; }) => tab.approvedCount !== undefined)?.approvedCount || 0  },
                    { name: 'Reject',  label: 'Reject',  icon: 'ri-close-circle-fill',  count: this.expenseTabs.find((tab: { rejectCount: undefined; }) => tab.rejectCount !== undefined)?.rejectCount || 0  },
                    { name: 'Paid',  label: 'Paid',  icon: 'ri-wallet-3-fill',  count: this.expenseTabs.find((tab: { paidCount: undefined; }) => tab.paidCount !== undefined)?.paidCount || 0  }
                ]; 
                // const draftTabExists = this.mainTabs.some((tab: { name: string; }) => tab.name === 'Draft');
                // this.activeTab = draftTabExists ? 'Draft' : (this.mainTabs[0]?.name || '');
                this.activeTab = this.mainTabs[0]?.name || '';
                this.expenseListPagination = result['pagination'];        
            }
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
    
    handleDateChange(event: { [key: string]: string }) {
        this.filter = {
            ...this.filter,
            ...event
        };
        this.getList();
    }
    
    handleDateRangeChange(event: { [key: string]: { start: string; end: string } }) {
        this.filter = event;
        this.getList();
    }
    
    onDeleteLeave(leaveId: any) {
        this.alert.confirm("Are you sure?")
        .then((result) => {
            if (result.isConfirmed) {
                this.api.patch({ _id: leaveId, is_delete: 1}, 'expense/delete').subscribe(result => {
                    if (result['statusCode']  ===  200) {
                        Swal.fire('Deleted!', result.message, 'success');
                        this.getList();
                    }                        
                });
            }
        });
    }
    
    openHeaderSettingModal() {
        this.getHeaderConfigListing();
        const dialogRef = this.dialog.open(ModalsComponent, {
            width: '450px',
            panelClass: 'mat-right-modal',
            position: { right: '0px' },
            data: {
                'lastPage': 'header-config',
                'moduleFormId':this.moduleFormId,
                'moduleTableId':this.moduleTableId,
                'moduleName':this.subModule.title,
                "tableConfigData": this.tableConfigData,
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result === true){
                this.getHeaderConfigListing();
            }
        });
    }
}
