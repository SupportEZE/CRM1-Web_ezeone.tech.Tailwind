import { Component, ViewChild } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { FORMIDCONFIG } from '../../../../../../config/formId.config';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { ApiService } from '../../../../../core/services/api/api.service';
import { SweetAlertService } from '../../../../../core/services/alert/sweet-alert.service';
import { DateService } from '../../../../../shared/services/date.service';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { ModuleService } from '../../../../../shared/services/module.service';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import { CommonApiService } from '../../../../../shared/services/common-api.service';
import { ModalsComponent } from '../../../../../shared/components/modals/modals.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-leave-list',
    imports: [
        SharedModule,
        SpkReusableTablesComponent,
        CommonModule
    ],
    templateUrl: './leave-list.component.html',
})
export class LeaveListComponent {
    @ViewChild('reusableTable') reusableTable!: any;
    activeTab:any ='Pending';
    filter:any ={};
    listColumns : any = [];
    skLoading:boolean = false;
    view: any;
    mainTabs:any = [];
    leaveTabs: any = {};
    public disabled: boolean = false;
    leaveModule:any = [];
    leaveList:any = [];
    page: number = 1;
    moduleId:number=0;
    moduleFormId:number =0;
    moduleTableId:number =0;
    FORMID:any= FORMIDCONFIG;
    sorting: any = {};
    subModule: any={};
    tableId:any; 
    leaveData:any = [];
    leaveListing:any = [];
    leavePageDropdownOption:any = [];
    accessRight:any = {};
    
    constructor(
        private toastr: ToastrServices,
        public api:ApiService,
        public alert : SweetAlertService,
        private dateService: DateService,
        private router: Router,
        private moduleService: ModuleService,
        public comanFuncation: ComanFuncationService,
        public CommonApiService: CommonApiService,
        public dialog: MatDialog
    ){
        
    }
    
    ngOnInit() { 
        const accessRight = this.moduleService.getAccessMap('SFA', 'Leave');
        if (accessRight) {
            this.accessRight = accessRight;
        } 
        const subModule = this.moduleService.getSubModuleByName('SFA', 'Leave');
        const form = this.moduleService.getFormById('SFA', 'Leave', this.FORMID.ID['LeaveFormData']);
        const tableId = this.moduleService.getTableById('SFA', 'Leave', this.FORMID.ID['LeaveTableData']);
        if (subModule) {
            this.subModule = subModule;
        }
        if (form) {
            this.moduleFormId = form.form_id;
        }
        if (tableId) {
            this.tableId = tableId.table_id;
        }
        this.getHeaderConfigListing();   
    }
    
    onTabChange(tab: string) {
        this.activeTab = tab;
        this.getList();
    }
    
    onRefresh()
    {
        this.filter = {};
        this.reusableTable.clearSearchInputs();
        this.getHeaderConfigListing();
    }
    
    updateLeaveWiseLeave(row?: any) {
        this.router.navigate(['/apps/sfa/leave-list/leave-add']);
    }
    
    tableConfigData:any = {};
    visibleHeaders:any = [];
    getHeaderConfigListing() {
        this.CommonApiService.getHeaderConfigListing(this.moduleTableId, this.moduleFormId).subscribe((result: any) => {
            this.tableConfigData = result.data.table_data;
            const allHeaders = this.tableConfigData['tableHead'];
            
            // --------- For columns filter in listing//
            this.visibleHeaders = allHeaders.filter((header: any) => header.list_view_checked);
            this.getList();
            // ---------//
        });
    }
    
    goToDetailPage(rowId:any)
    {
        this.router.navigate(['/apps/sfa/leave-list/leave-detail' , rowId]);
    }
    
    
    getList() {
        this.skLoading = true;
        const filters = {...this.filter, activeTab: this.activeTab };
        this.api.post({filters, sorting: this.sorting, 'page': this.page}, 'leave/leave-read').subscribe(result => {
            if (result['statusCode']  ===  200) {
                this.skLoading = false;
                this.leaveListing = result['data']['result'];
                this.leaveTabs = result['data']['leave_status_tabs'];
                this.mainTabs = [
                    { 
                        name: 'Pending', 
                        label: 'Pending', 
                        icon: 'ri-time-fill', 
                        count: this.leaveTabs.find((tab: { pendingCount: undefined; }) => tab.pendingCount !== undefined)?.pendingCount || 0 
                    },
                    { 
                        name: 'Approved', 
                        label: 'Approved', 
                        icon: 'ri-checkbox-circle-fill', 
                        count: this.leaveTabs.find((tab: { approvedCount: undefined; }) => tab.approvedCount !== undefined)?.approvedCount || 0 
                    },
                    { 
                        name: 'Rejected', 
                        label: 'Rejected', 
                        icon: 'ri-close-circle-fill', 
                        count: this.leaveTabs.find((tab: { rejectCount: undefined; }) => tab.rejectCount !== undefined)?.rejectCount || 0 
                    }
                ]; 
                // this.leaveListing = this.dateService.formatDatesInArray(this.leaveListing);
                // Convert date fields
                for (let i = 0; i < this.leaveListing.length; i++) {
                    const list = this.leaveListing[i];
                    if (list.updated_at) {
                        list.updated_at = this.dateService.formatToYYYYMMDD(new Date(list.updated_at));
                    }
                    if (list.created_at) {
                        list.created_at = this.dateService.formatToYYYYMMDD(new Date(list.created_at));
                    }
                    if (list.leave_end) {
                        list.leave_end = this.dateService.formatToYYYYMMDD(new Date(list.leave_end));
                    }
                    if (list.leave_start) {
                        list.leave_start = this.dateService.formatToYYYYMMDD(new Date(list.leave_start));
                    }
                }
            }
        });
    }
    
    
    // -------- Sorting//
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
    
    handleDateChange(event: { [key: string]: string }) {
        this.filter = {
            ...this.filter,
            ...event
        };
        this.getList();
    }
    
    onDeleteLeave(leaveId: any) {
        this.alert.confirm("Are you sure?")
        .then((result) => {
            if (result.isConfirmed) {
                this.api.patch({ _id: leaveId, is_delete: 1}, 'leave/delete').subscribe(result => {
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
    
    openMainLogModal(row_id:string) {
        this.comanFuncation.listLogsModal(this.subModule.module_id, row_id, this.subModule.module_type).subscribe(result => {
        });
    }
    
}
