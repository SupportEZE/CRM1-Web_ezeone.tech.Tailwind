import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormsModule } from '@angular/forms';
import { SortablejsModule } from '@maksim_m/ngx-sortablejs';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { SweetAlertService } from '../../../../../core/services/alert/sweet-alert.service';
import { ApiService } from '../../../../../core/services/api/api.service';
import { FORMIDCONFIG } from '../../../../../../config/formId.config';
import { API_TYPE, FormFieldTypes } from '../../../../../utility/constants';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { LogService } from '../../../../../core/services/log/log.service';
import { ModuleService } from '../../../../../shared/services/module.service';
import { MatDialog } from '@angular/material/dialog';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import { DateService } from '../../../../../shared/services/date.service';
import { HighlightService } from '../../../../../shared/services/highlight.service';
import { CommonApiService } from '../../../../../shared/services/common-api.service';
import { ModalsComponent } from '../../../../../shared/components/modals/modals.component';

// interface TabItem {
//     label: string;
//     value: number;
//     count: number;
// }
@Component({
    selector: 'app-user-list',
    standalone: true,
    imports: [SharedModule,CommonModule,RouterModule,SpkReusableTablesComponent,FormsModule,SortablejsModule,ToastrModule],
    templateUrl: './user-list.component.html',
})

export class UserListComponent {
    @ViewChild('reusableTable') reusableTable!: any;
    Date = Date;
    isNaN = isNaN;
    public disabled: boolean = false;
    filter: any = {};
    sorting: any = {};
    range: any;
    skLoading:boolean = true
    FORMID:any= FORMIDCONFIG;
    readonly fieldTypes = FormFieldTypes;
    moduleFormId:any;
    subModule:any;
    moduleTableId:any;
    isChecked: boolean = false;
    isApiLoaded:boolean = false;
    listing:any = [];
    pagination:any = {}
    page: number = 1;
    mainTabs:any = [];
    activeTab:any;
    highlightedId: string | undefined;
    pageKey = 'user-list';
    accessRight:any = {};
    
    constructor(private toastr: ToastrServices,public api:ApiService, private logService:LogService, public alert : SweetAlertService, private router: Router, public dialog: MatDialog, private fb: FormBuilder, public moduleService: ModuleService, public comanFuncation: ComanFuncationService, public dateService:DateService, private highlightService: HighlightService, public CommonApiService: CommonApiService) {
        this.range = this.fb.group({
            start: new FormControl<Date | null>(null),
            end: new FormControl<Date | null>(null)
        });        
    }
    
    ngOnInit() {
        
        let highlight = this.highlightService.getHighlight(this.pageKey);
        if (highlight != undefined) {
            this.activeTab = highlight.tab;
            this.highlightedId = highlight.rowId;
            this.pagination.cur_page = highlight.pageIndex;
            this.filter = highlight.filters
            this.highlightService.clearHighlight(this.pageKey);
        }
        
        const accessRight = this.moduleService.getAccessMap('Masters', 'Users');
        if (accessRight) {
            this.accessRight = accessRight;
        }
        
        const subModule = this.moduleService.getSubModuleByName('Masters', 'Users');
        const form = this.moduleService.getFormById('Masters', 'Users', this.FORMID.ID['UserForm']);
        const tableId = this.moduleService.getTableById('Masters', 'Users', this.FORMID.ID['UserTable']);
        if (subModule) {
            this.subModule = subModule;
        }
        if (form) {
            this.moduleFormId = form.form_id;
        }
        if (tableId) {
            this.moduleTableId = tableId.table_id;
        }
        
        this.getMainTabs();
    }
    
    onTabChange(tab: any) {
        this.isApiLoaded = false
        if (!this.highlightedId){
            this.pagination.cur_page = 1;
        }
        this.activeTab = tab;
        
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
    
    goToPage()
    {
        this.setHighLight('add');
        this.router.navigate(['/apps/master/user/user-list/user-add', this.activeTab]);
    }
    
    goToDetail(rowId: any) {
        this.setHighLight(rowId);
        this.router.navigate(['/apps/master/user/user-list/user-detail/' + rowId]);
    }
    
    //---------User Listing----------//
    
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
    
    getMainTabs() {
        this.skLoading = true;
        this.api.post({}, 'rbac/user-list-tabs').subscribe(result => {
            if (result['statusCode']  ===  200) {
                // this.skLoading = false;
                this.mainTabs = result['data'];
                if (this.mainTabs.length) {                    
                    if(this.highlightedId){
                        this.activeTab = this.activeTab; 
                    }
                    else{
                        this.activeTab = this.mainTabs[0].value;
                    }
                }
                this.getHeaderConfigListing();
            }
        });
    }
    
    getList() {
        this.skLoading = true;
        this.api.post({filters: this.filter, login_type_id: this.activeTab, sorting: this.sorting, 'page': this.pagination.cur_page ?? 1}, 'user/read').subscribe(result => {
            this.isApiLoaded = true;
            if (result['statusCode']  ===  200) {
                this.skLoading = false;
                this.listing = result['data'];
                this.listing.forEach((row:any) => {
                    if(row.status === 'Active'){
                        row.isChecked = true
                    }
                    else{
                        row.isChecked = false
                    }
                });
                this.pagination = result['pagination'];
            }
        });
    }
    
    // -------- Sorting//
    onSortChanged(event: { field: string; order: number }) {
        this.sorting = {};
        this.sorting[event.field] = event.order;
        this.getList();
    }
    // --------//
    
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
    
    handleDateRangeChange(event: { [key: string]: { start: string; end: string } }) {
        this.filter = event;
        this.getList();
    }
    
    
    // delete funcation start //
    delete(id: string, api: string, label: string) {
        this.comanFuncation.delete(id, this.subModule, label, api, 'single_action', id).subscribe((result: boolean) => {
            if (result === true) {
                // this.comanFuncation.setHighLight('userList', 'add', '', {}, 1);
                this.getList();
            }
        });
    }
    // delete funcation end
    
    // *****Status Change Funcation Start*****//
    onToggleChange(newState: boolean, id: string, status: string) {
        this.comanFuncation.statusChange(newState, id, status, this.subModule, 'toggle','user/update-status',).subscribe((result: boolean) => {
            if (result) {
                this.getHeaderConfigListing();
            } else {
                this.getHeaderConfigListing();
            }
        });
    }
    // *****Status Change Funcation End*****//
    
    // ***** List Logs Modal Start *****//
    openMainLogModal(row_id?:string) {
        this.comanFuncation.listLogsModal(this.subModule.sub_module_id, row_id, this.subModule.module_type).subscribe(result => {
        });
    }
    // ***** List Logs Modal End *****//
    
    
    
    //--------User Listing---------//
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
    
    resetDevice(rowId:string)
    {
        this.alert.confirm(`Confirm`, 'Are you sure you want reset device','Yes, Reset!') .then(result => {
            if (result.isConfirmed) {
                this.skLoading = true;
                this.api.post({login_type_id: this.activeTab, _id: rowId}, 'reset-device', API_TYPE.AUTH).subscribe(result => {
                    if (result['statusCode']  ===  200) {
                        this.skLoading = false;
                        this.toastr.success(result['message'], '', 'toast-top-right');
                        this.getHeaderConfigListing();
                    }
                });
            }
        })
    }
}











// -------- Excel Download//

// openModal() {
//     this.isModalOpen = true; // Open the modal
// }

// closeModal() {
//     this.isModalOpen = false; // Close the modal
// }

// getAllExcelOptionChecked() {
//     this.allUserPageHeaders.forEach((header: any) => {
//         header.excel_checked = true;
//     });

//     this.excelDownloadColumn = this.allUserPageHeaders.filter((header: any) => header.excel_checked);
// }

// excelDownloadColumn:any = [];
// onExcelCheckboxChange(item: any, type: string, event: Event) {
//     const target = event.target as HTMLInputElement;
//     item.excel_checked = target.checked;
//     this.excelDownloadColumn = this.allUserPageHeaders.filter((header: any) => header.excel_checked);
// }

// downurl: any = '';
// getListingExcelDownload()
// {
//     this.api.disabled = true;
//     this.api.post({filters: this.filter, sorting: this.sorting, 'page': this.page, 'dropdown': this.allUserPageHeaders }, 'user/read').subscribe(result => {
//         if (result['statusCode']  ===  200) {
//             this.api.disabled = false;
//             this.closeModal();
//         }
//     });
// }
// --------//