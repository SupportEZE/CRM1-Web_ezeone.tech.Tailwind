import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ShowcodeCardComponent } from '../../../../../shared/components/showcode-card/showcode-card.component';
import { CommonModule } from '@angular/common';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { TicketAddComponent } from '../ticket-add/ticket-add.component';
import { ApiService } from '../../../../../core/services/api/api.service';
import { ModuleService } from '../../../../../shared/services/module.service';
import { LogService } from '../../../../../core/services/log/log.service';
import { SweetAlertService } from '../../../../../core/services/alert/sweet-alert.service';
import { MatDialog } from '@angular/material/dialog';
import { DateService } from '../../../../../shared/services/date.service';
import { Router, RouterModule } from '@angular/router';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import { TicketStatusChangeModalComponent } from '../status-change-modal/status-change-modal.component';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { HighlightService } from '../../../../../shared/services/highlight.service';
import { CommonApiService } from '../../../../../shared/services/common-api.service';
import { ModuleDropdownComponent } from '../../../../../shared/components/module-dropdown/module-dropdown.component';
import { AuthService } from '../../../../../shared/services/auth.service';

@Component({
    selector: 'app-ticket-list',
    imports: [SpkReusableTablesComponent,SharedModule, MaterialModuleModule, CommonModule,ShowcodeCardComponent,FormsModule,RouterModule],
    templateUrl: './ticket-list.component.html',
})
export class TicketListComponent {
    filter: any = {};
    skLoading:boolean = false
    activeTab: any = 'All';
    mainModule:any={};
    pagination:any={};
    // tabs:any=[];
    listing:any={};
    orgData:any={};
    todolistColumn:any =[];
    highlightedId: string | undefined;
    pageKey = 'ticket-list';
    tabCount:any ={};
    priorityKeys: any = [];
    priorityCount: any = {};
    categoryKeys: any = [];
    accessRight:any = {};
    tabs = [
        { label: "All", value: "", icon: "ri-inbox-line", countClass: 'warning', count: 0 },
        { label: "Pending", value: "Pending", icon: "ri-time-line", countClass: 'warning', count: 0 },
        { label: "Complete", value: "Complete", icon: "ri-checkbox-line", countClass: 'success', count: 0 },
        { label: "Cancel", value: "Cancel", icon: "ri-close-circle-line", countClass: 'danger', count: 0 }
    ];
    
    constructor(public dialog:MatDialog,public api: ApiService,public commonFunction: ComanFuncationService,public moduleService: ModuleService,private logService: LogService,public alert : SweetAlertService,public dateService:DateService,private router: Router, private highlightService: HighlightService, private authService: AuthService,public comanFuncation: ComanFuncationService, public commonApiService: CommonApiService
    ){
        this.commonApiService.getDropDownData(16, 'ticket_category');
        this.orgData = this.authService.getUser();
        this.getColumn()
    }
    
    ngOnInit(){
        const accessRight = this.moduleService.getAccessMap('Ticket');
        if (accessRight) {
            this.accessRight = accessRight;
        }

        let highlight = this.highlightService.getHighlight(this.pageKey);
        if (highlight != undefined) {
            this.activeTab = highlight.tab;
            this.highlightedId = highlight.rowId;
            this.pagination.cur_page = highlight.pageIndex;
            this.filter = highlight.filters
            this.highlightService.clearHighlight(this.pageKey);
        }
        
        const mainModule = this.moduleService.getModuleByName('Ticket');
        
        if (mainModule) {
            this.mainModule = mainModule;
        }
        
        
        this.getList();
    }
    setActiveTab(tab:string) {
        this.activeTab = tab;
        this.filter = {};
    }
    
    isHighlighted(id: string): boolean {
        return this.highlightedId === id;
    }
    setHighLight(rowId: string) {
        this.comanFuncation.setHighLight(this.pageKey, rowId, this.activeTab, this.filter, this.pagination.cur_page ? this.pagination.cur_page : 1)
    }
    
    onRefresh()
    {
        this.filter = {};
        this.activeTab = 'All'
        this.filter.customer_name = null;
        this.getList();
    }
    
    onSearch(searchTerm: string) {
        this.filter.customer_name = searchTerm;
        this.getList(); // Fetch the filtered data
    }
    
    goToDetailPage(rowId:any)
    {
        if (this.activeTab === 'Present') {
            this.router.navigate(['/apps/independent/ticket-list/ticket-detail' , rowId]);
        }
    }
    
    
    getTicketCategory() {
        this.api.disabled = true;
        this.api.post({}, 'dropdown/read-dropdown').subscribe((result: any) => {
            if (result['statusCode'] === 200) {
                
            }
        });
    }
    
    getList(){
        const module = this.moduleService.getModuleByName('Ticket');
        this.skLoading = true;
        if(this.activeTab != 'All')this.filter.status = this.activeTab;
        this.filter = this.commonFunction.removeBlankKeys(this.filter)
        
        this.api.post({ filters: this.filter, page: this.pagination.cur_page ?? 1, activeTab : this.activeTab,module_id:module.module_id}, 'ticket/read').subscribe(result => {
            if(result['statusCode'] == 200){
                this.skLoading = false;
                this.listing = result['data'].result;
                this.tabCount = result['data']['category_counts'] ? result['data']['category_counts'] : {};
                this.priorityCount = result['data']['priority_counts'] ? result['data']['priority_counts'] : {};
                this.pagination = result['pagination'];
                this.categoryKeys = Object.keys(result['data']['category_counts'] ? result['data']['category_counts'] : '') ;
                this.priorityKeys = Object.keys(result['data']['priority_counts'] ? result['data']['priority_counts'] : '');
                this.tabs = [
                    { label: "All", value: "All", icon: "ri-inbox-line", countClass:'primary' ,count: result['data'].status_counts.All || 0 },
                    { label: "Pending", value: "Pending", icon: "ri-time-line", countClass:'warning' ,count: result['data'].status_counts?.Pending || 0 },
                    { label: "Complete", value: "Complete", icon: "ri-checkbox-circle-line", countClass:'success' ,count: result['data'].status_counts?.Complete || 0 },
                    { label: "Cancel", value: "Cancel", icon: "ri-close-circle-line", countClass:'danger' ,count: result['data'].status_counts?.Cancel || 0 },
                ];
            }
        });
    }
    
    openModal(row:any) {
        const dialogRef = this.dialog.open(TicketAddComponent, {
            width: '800px',
            data: {
                'lastPage':'ticket-list',
                'formType': row ? 'edit' : 'create',
                'formData': row || {}
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result){
                this.getList();
            }
        });
    }
    // -------- Pagination//
    
    
    changeToPagination(btnType: string) {
        if (btnType == 'Previous') {
            if (this.pagination.prev && this.pagination.cur_page > 1) {
                this.pagination.cur_page--;  // Decrement the page number
                this.getList();
            }
        }
        else
        {
            if (this.pagination.next) {
                this.pagination.cur_page++;  // Increment the page number
                this.getList();
            }
        }
    }
    
    changeToPage(newPage: number) {
        this.pagination.cur_page = newPage;
        this.getList();
    }
    
    getColumn(){
        this.todolistColumn = [
            { label: "Created At", field: "Created At", },
            { label: "Created By", field: "Created By", },
            { label: "Ticket No.", field: "Ticket No.", },
            { label: "Customer Type", field: "Customer Type" },
            { label: "Customer Details", field: "Customer Details" },
            { label: "Category", field: "Category" },
            ...(this.orgData?.org?.sfa ? [{ label: "User Details", field: "User Details" }] : []),
            { label: "Priority", field: "Priority" },
            { label: "Remark", field: "Remark" },
            // {label:"Images",field:"Images"},
            { label: "Status", field: "Status" },
        ]
    }
    
    
    updateStatus(data:any)
    {
        const dialogRef = this.dialog.open(TicketStatusChangeModalComponent, {
            width: '450px',
            data:data
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result === true){
                this.getList();
            }
        });
    }
    
    goToDetail(data:any){
        alert("test");
        this.commonFunction.router.navigateByUrl('apps/ticket/ticket-detail' + data._id);
    }
    
    openDropdownModal()
    {
        const dialogRef = this.dialog.open(ModuleDropdownComponent, {
            width: '450px',
            data:{
                call_as : 'modal',
                moduleData : this.mainModule
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result === true){
                this.getList();
            }
        });
    }
}
