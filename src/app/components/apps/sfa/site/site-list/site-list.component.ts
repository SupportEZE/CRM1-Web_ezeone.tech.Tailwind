import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../../shared/shared.module';
import { ModuleService } from '../../../../../shared/services/module.service';
import { ApiService } from '../../../../../core/services/api/api.service';
import { MatDialog } from '@angular/material/dialog';
import { FormValidationService } from '../../../../../utility/form-validation';
import { UtilService } from '../../../../../utility/util.service';
import { FORMIDCONFIG } from '../../../../../../config/formId.config';
import { CommonApiService } from '../../../../../shared/services/common-api.service';
import { ModalsComponent } from '../../../../../shared/components/modals/modals.component';
import { LogModalComponent } from '../../../log-modal/log-modal.component';
import { Router } from '@angular/router';
import { SweetAlertService } from '../../../../../core/services/alert/sweet-alert.service';
import { LogService } from '../../../../../core/services/log/log.service';
import Swal from 'sweetalert2';
import { FormFieldTypes } from '../../../../../utility/constants';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import { HighlightService } from '../../../../../shared/services/highlight.service';
@Component({
    selector: 'app-site-list',
    imports: [SharedModule,CommonModule,SpkReusableTablesComponent,FormsModule],
    templateUrl: './site-list.component.html',
})
export class SiteListComponent {
    @ViewChild('reusableTable') reusableTable!: any;
    
    filter: any = {};
    FORMID:any= FORMIDCONFIG;
    skLoading:boolean = false
    listing:any = [];
    listTabs:any = {};
    pagination:any = {}
    subModule:any = {}
    moduleFormId:number=0;
    moduleTableId:number =0;
    readonly fieldTypes = FormFieldTypes;
    page: number = 1;
    activeTab:any ='Inprocess';
    highlightedId: string | undefined;
    pageKey = 'user-list';
    mainTabs:any  = [];
    // Main Tabs Data
    accessRight:any = {};
    
    constructor(public moduleService: ModuleService, public CommonApiService: CommonApiService,public api:ApiService,public dialog: MatDialog,private fb: FormBuilder,public util:UtilService, private router: Router,public alert : SweetAlertService,public comanFuncation: ComanFuncationService, private highlightService: HighlightService){}
    
    ngOnInit() {
        let highlight = this.highlightService.getHighlight(this.pageKey);
        if (highlight != undefined) {
            this.activeTab = highlight.tab;
            this.highlightedId = highlight.rowId;
            this.pagination.cur_page = highlight.pageIndex;
            this.filter = highlight.filters
            this.highlightService.clearHighlight(this.pageKey);
        }
        
        const accessRight = this.moduleService.getAccessMap('SFA', 'Site-Project');
        if (accessRight) {
            this.accessRight = accessRight;
        }
        const subModule = this.moduleService.getSubModuleByName('SFA', 'Site-Project');
        const form = this.moduleService.getFormById('SFA', 'Site-Project', this.FORMID.ID['SiteForm']);
        const tableId = this.moduleService.getTableById('SFA', 'Site-Project', this.FORMID.ID['SiteTable']);
        
        if (subModule) {
            this.subModule = subModule;
        }
        if (form) {
            this.moduleFormId = form.form_id;
        }
        if (tableId) {
            this.moduleTableId = tableId.table_id;
        }
        this.getHeaderConfigListing();
        
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
        this.reusableTable.clearSearchInputs();
        this.getHeaderConfigListing();
    }
    
    goToAddPage()
    {
        this.setHighLight('add');
        this.router.navigate(['/apps/sfa/site/site-add']);
    }
    
    goToDetailPage(rowId:any)
    {
        this.setHighLight(rowId);
        this.router.navigate(['/apps/sfa/site/site-detail' , rowId]);
    }
    
    onTabChange(tab: string) {
        if (!this.highlightedId){
            this.pagination.cur_page = 1;
        }
        this.activeTab = tab;
        this.getList();
    }
    
    
    tableConfigData:any = {};
    visibleHeaders:any = [];
    getHeaderConfigListing() {
        this.CommonApiService.getHeaderConfigListing(this.moduleTableId, this.moduleFormId).subscribe((result: any) => {
            this.tableConfigData = result.data.table_data;
            const allHeaders = this.tableConfigData['tableHead'];
            
            // --------- For columns filter in listing//
            this.visibleHeaders = allHeaders.filter((header: any) => header.list_view_checked && header.key_name_required !== true && header.type != this.fieldTypes.UPLOAD);
            
            this.getList();
            // ---------//
            
        });
        
    }
    
    getList() {
        this.skLoading = true;
        this.api.post({filters: this.filter, form_id : this.moduleFormId, activeTab: this.activeTab}, 'sites/read').subscribe(result => {
            if (result['statusCode'] == '200') {
                this.skLoading = false;
                this.listing = result['data']['result'];
                this.listTabs = result['data']['tabCounts'];
                this.pagination = result['pagination'];
                
                this.mainTabs = [
                    { name: 'Inprocess', label: 'Inprocess', icon: 'ri-hourglass-fill', count: this.listTabs?.inprocces || 0},
                    { name: 'Win', label: 'Win', icon: 'ri-trophy-fill', count: this.listTabs?.win || '0'},
                    { name: 'Lost', label: 'Lost', icon: 'ri-hourglass-fill', count: this.listTabs?.lost || '0' },
                ];
                
            }
        });
    }
    
    getTabCount(tabName: string): string {
        // Return count for the specific tab name from the listTabs object
        if (this.listTabs && this.listTabs[tabName] !== undefined) {
            return this.listTabs[tabName].toString();
        }
        return '0';  // Default count if not available
    }
    
    // -------- Pagination//
    changeToPagination(btnType: string) {
        if (btnType == 'Previous') {
            if (this.pagination.prev && this.page > 1) {
                this.page--;  // Decrement the page number
                this.getList();
            }
        }
        else
        {
            if (this.pagination.next) {
                this.page++;  // Increment the page number
                this.getList();
            }
        }
    }
    
    changeToPage(newPage: number) {
        this.page = newPage;
        this.pagination.cur_page = newPage;
        this.getList();
    }
    // --------//
    
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
    
    openHeaderSettingModal() {
        this.getHeaderConfigListing();
        const dialogRef = this.dialog.open(ModalsComponent, {
            width: '450px',
            panelClass: 'mat-right-modal',
            position: { right: '0px' },
            data: {
                'lastPage':'header-config',
                'moduleFormId':this.moduleFormId,
                'moduleTableId':this.moduleTableId,
                'moduleName':this.subModule.title,
                "tableConfigData": this.tableConfigData,
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.getHeaderConfigListing();
            }
        });
    }
    
    
    openMainLogModal(rowId:string) {
        this.comanFuncation.listLogsModal(this.subModule.module_id , rowId, this.subModule.module_type ).subscribe(result => {
            if(result === true){
                this.getList();
            }
        });
    }
}
