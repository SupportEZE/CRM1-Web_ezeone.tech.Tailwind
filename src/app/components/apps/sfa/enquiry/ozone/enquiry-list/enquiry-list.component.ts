import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { SpkReusableTablesComponent } from '../../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../../../shared/shared.module';
import { ModuleService } from '../../../../../../shared/services/module.service';
import { ApiService } from '../../../../../../core/services/api/api.service';
import { MatDialog } from '@angular/material/dialog';
import { FormValidationService } from '../../../../../../utility/form-validation';
import { UtilService } from '../../../../../../utility/util.service';
import { FORMIDCONFIG } from '../../../../../../../config/formId.config';
import { CommonApiService } from '../../../../../../shared/services/common-api.service';
import { ModalsComponent } from '../../../../../../shared/components/modals/modals.component';
import { LogModalComponent } from '../../../../log-modal/log-modal.component';
import { Router } from '@angular/router';
import { SweetAlertService } from '../../../../../../core/services/alert/sweet-alert.service';
import { LogService } from '../../../../../../core/services/log/log.service';
import Swal from 'sweetalert2';
import { FormFieldTypes } from '../../../../../../utility/constants';
import { ComanFuncationService } from '../../../../../../shared/services/comanFuncation.service';
import { HighlightService } from '../../../../../../shared/services/highlight.service';
@Component({
    selector: 'app-enquiry-list',
    imports: [SharedModule,CommonModule,SpkReusableTablesComponent,FormsModule],
    templateUrl: './enquiry-list.component.html',
})
export class OzoneEnquiryListComponent {
    @ViewChild('reusableTable') reusableTable!: any;
    filter: any = {};
    FORMID:any= FORMIDCONFIG;
    skLoading:boolean = false
    tableData:any = {};
    tableHeader:any = [];
    listing:any = [];
    listTabs:any = {};
    pagination:any = {}
    subModule:any = {}
    moduleFormId:number=0;
    moduleTableId:number =0;
    readonly fieldTypes = FormFieldTypes;
    page: number = 1;
    activeTab:any ='Review Pending';
    activeSubTab:any ='';
    mainTabs:any  = [];
    inProcessTabs: any = [];
    closeTabs: any = [];
    highlightedId: string | undefined;
    pageKey = 'enquiry-list';
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

        const accessRight = this.moduleService.getAccessMap('SFA', 'Enquiry');
        if (accessRight) {
            this.accessRight = accessRight;
        }
        const subModule = this.moduleService.getSubModuleByName('SFA', 'Enquiry');
        const form = this.moduleService.getFormById('SFA', 'Enquiry', this.FORMID.ID['EnquiryForm']);
        const tableId = this.moduleService.getTableById('SFA', 'Enquiry', this.FORMID.ID['EnquiryTable']);
        
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
    
    onRefresh()
    {
        this.filter = {};
        this.reusableTable.clearSearchInputs();
        this.getHeaderConfigListing();
    }
    
    isHighlighted(id: string): boolean {
        return this.highlightedId === id;
    }
    
    setHighLight(rowId: string) {
        this.comanFuncation.setHighLight(this.pageKey, rowId, this.activeTab, this.filter, this.pagination.cur_page ? this.pagination.cur_page : 1)
    }

    goToAddPage()
    {
        this.setHighLight('add');
        this.router.navigate(['/apps/sfa/enquiry-list/enquiry-add']);
    }
    
    goToDetailPage(rowId:any)
    {
        this.setHighLight(rowId);
        this.router.navigate(['/apps/sfa/enquiry-list/enquiry-detail' , rowId]);
    }
    
    // Function to change the active tab
    onTabChange(tab: string, subTab: string) {
        this.activeTab = tab;
        this.activeSubTab = subTab;
        this.getList();
    }
    
    // Function to change the active sub-tab
    onSubTabChange(subTab: string) {
        this.activeSubTab = subTab;
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
        this.api.post({filters: this.filter, form_id : this.moduleFormId, activeTab: this.activeTab , activeSubTab: this.activeSubTab}, 'enquiry/read').subscribe(result => {
            if (result['statusCode'] == '200') {
                this.skLoading = false;
                this.listing = result['data']['result'];
                this.listTabs = result['data']['tabCounts'];
                
                this.mainTabs = [
                    { name: 'Review Pending', label: 'Review Pending', icon: 'ri-eye-fill', count: this.listTabs?.review_pending || '0', subTab: '' },
                    { name: 'Inprocess', label: 'Inprocess', icon: 'ri-hourglass-fill', count: (this.listTabs?.not_assigned || 0) + (this.listTabs?.assigned || 0), subTab: 'Assigned' },
                    { name: 'Close', label: 'Close', icon: 'ri-shake-hands-fill', count: (this.listTabs?.lost || 0) + (this.listTabs?.drop || 0) + (this.listTabs?.junk_and_close || 0), subTab: 'Lost' },
                    { name: 'Win', label: 'Win', icon: 'ri-trophy-fill', count: this.listTabs?.win || '0', subTab: '' }
                ];
                // Sub-Tabs for Inprocess
                this.inProcessTabs = [
                    { name: 'Assigned', label: 'Assigned', icon: 'ri-check-double-fill', count: this.listTabs?.assigned || '0' },
                    { name: 'Not Assigned', label: 'Not Assigned', icon: 'ri-hourglass-2-fill', count: this.listTabs?.not_assigned || '0' },
                ];
                // Sub-Tabs for Close
                this.closeTabs = [
                    { name: 'Lost', label: 'Lost', icon: 'ri-hourglass-fill', count: this.listTabs?.lost || '0' },
                    { name: 'Drop', label: 'Drop', icon: 'ri-delete-bin-7-fill', count: this.listTabs?.drop || '0' },
                    { name: 'Junk & Close', label: 'Junk & Close', icon: 'ri-delete-bin-6-fill', count: this.listTabs?.junk_and_close || '0' }
                ];
                
                this.pagination = result['pagination'];
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
    
    updateSearchFilter(event: {searchText: string; name: string }) {
        this.filter[event.name] = event.searchText;
        this.getList();
    }
    
    handleSelectChange(event: { category_name: string; selections: string[] }): void {
        const { category_name, selections } = event;
        this.filter[category_name] = selections;
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
