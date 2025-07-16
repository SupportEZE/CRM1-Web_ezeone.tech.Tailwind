import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { FormBuilder, FormControl, FormsModule } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared.module';
import { SortablejsModule } from '@maksim_m/ngx-sortablejs';
import { ToastrModule } from 'ngx-toastr';
import { ApiService } from '../../../../../core/services/api/api.service';
import { SweetAlertService } from '../../../../../core/services/alert/sweet-alert.service';
import { SpkListviewCardComponent } from '../../../../../../@spk/reusable-apps/spk-listview-card/spk-listview-card.component';
import Swal from 'sweetalert2';
import { FORMIDCONFIG } from '../../../../../../config/formId.config';
import { MatDialog } from '@angular/material/dialog';
import { ModuleService } from '../../../../../shared/services/module.service';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { LogService } from '../../../../../core/services/log/log.service';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import { CommonApiService } from '../../../../../shared/services/common-api.service';
import { FormFieldTypes } from '../../../../../utility/constants';
import { ModalsComponent } from '../../../../../shared/components/modals/modals.component';
import { HighlightService } from '../../../../../shared/services/highlight.service';

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [SharedModule, CommonModule, RouterModule, SpkReusableTablesComponent, FormsModule, SortablejsModule, ToastrModule, SpkListviewCardComponent],
    templateUrl: './product-list.component.html',
})
export class ProductListComponent {
    @ViewChild('reusableTable') reusableTable!: any;
    public disabled: boolean = false;
    filter: any = {};
    sorting: any = {};
    selectedField: string = '';
    isModalOpen: boolean = false;
    range: any;
    FORMID: any = FORMIDCONFIG;
    selectedChoices = [];
    tableData: any = {};
    mastersModule: any = {};
    productModule: any = [];
    module_table: any = {};
    module_form: any = {};
    skLoading: boolean = false
    subModule: any = {};
    moduleName: string = '';
    moduleId: number = 0
    moduleFormId: number = 0;
    moduleTableId: number = 0;
    isChecked: boolean = false;
    highlightedId: string | undefined;
    pageKey = 'qr-list';
    readonly fieldTypes = FormFieldTypes;
    accessRight:any = {};
    cardData = [
        {
            id: 1,
            customClass: "flex items-start justify-between mb-2",
            titleClass: "dark:text-textmuted/50 block mb-1",
            valueClass: "fw-medium mb-0",
            cardClass: "overflow-hidden main-content-card",
            title: "Total Product",
            value: "45,478",
            graph: "Increased",
            color: "success",
            percentage: "2.56%",
            percentageIcon: "ti ti-arrow-narrow-up text-[1rem]",
            bg: "primary",
            icon: "ri-task-line text-xl",
        },
        {
            id: 2,
            customClass: "flex items-start justify-between mb-2",
            titleClass: "dark:text-textmuted/50 block mb-1",
            valueClass: "fw-medium mb-0",
            cardClass: "overflow-hidden main-content-card",
            title: "Active Product",
            value: "2,345",
            graph: "Decreased",
            color: "danger",
            percentage: "3.05%",
            percentageIcon: "ti ti-arrow-narrow-down text-[1rem]",
            bg: "primarytint1color",
            icon: "ri-check-line text-xl"
        },
        {
            id: 3,
            customClass: "flex items-start justify-between mb-2",
            titleClass: "dark:text-textmuted/50 block mb-1",
            valueClass: "fw-medium mb-0",
            cardClass: "overflow-hidden main-content-card",
            title: "Incomplete Info",
            value: "1245",
            graph: "Increased",
            color: "success",
            percentage: "2.16%",
            percentageIcon: "ti ti-arrow-narrow-up text-[1rem]",
            bg: "primarytint2color",
            icon: "ri-time-line text-xl"
        },
        {
            id: 4,
            customClass: "flex items-start justify-between mb-2",
            titleClass: "dark:text-textmuted/50 block mb-1",
            valueClass: "fw-medium mb-0",
            cardClass: "overflow-hidden main-content-card",
            title: "Top Rated",
            value: "658",
            graph: "Increased",
            color: "success",
            percentage: "2.1%",
            percentageIcon: "ti ti-arrow-narrow-up text-[1rem]",
            bg: "primarytint3color",
            icon: "ri-loader-line text-xl"
        },
        {
            id: 4,
            customClass: "flex items-start justify-between mb-2",
            titleClass: "dark:text-textmuted/50 block mb-1",
            valueClass: "fw-medium mb-0",
            cardClass: "overflow-hidden main-content-card",
            title: "Order Punched",
            value: "658",
            graph: "Increased",
            color: "success",
            percentage: "2.1%",
            percentageIcon: "ti ti-arrow-narrow-up text-[1rem]",
            bg: "primarytint3color",
            icon: "ri-loader-line text-xl"
        },
        {
            id: 4,
            customClass: "flex items-start justify-between mb-2",
            titleClass: "dark:text-textmuted/50 block mb-1",
            valueClass: "fw-medium mb-0",
            cardClass: "overflow-hidden main-content-card",
            title: "Never Order",
            value: "658",
            graph: "Increased",
            color: "success",
            percentage: "2.1%",
            percentageIcon: "ti ti-arrow-narrow-up text-[1rem]",
            bg: "primarytint3color",
            icon: "ri-loader-line text-xl"
        },
    ]
    
    constructor(private toastr: ToastrServices, public api: ApiService, private highlightService: HighlightService, public alert: SweetAlertService, private fb: FormBuilder, private router: Router, private logService: LogService, public dialog: MatDialog, public moduleService: ModuleService, public comanFuncation: ComanFuncationService, public CommonApiService: CommonApiService) {
        // this.allModulesData =  localStorage.getItem('modules');
        this.range = this.fb.group({
            start: new FormControl<Date | null>(null),
            end: new FormControl<Date | null>(null)
        });
        
    }
    
    
    
    ngOnInit() {
        const accessRight = this.moduleService.getAccessMap('Masters', 'Products');
        if (accessRight) {
            this.accessRight = accessRight;
        }
        this.skLoading = false;
        const subModule = this.moduleService.getSubModuleByName('Masters', 'Products');
        const form = this.moduleService.getFormById('Masters', 'Products', this.FORMID.ID['Products']);
        const moduleTableId = this.moduleService.getTableById('Masters', 'Products', this.FORMID.ID['Products']);
        let highlight = this.highlightService.getHighlight(this.pageKey);
        if (highlight != undefined) {
            this.highlightedId = highlight.rowId;
            this.pagination.cur_page = highlight.pageIndex;
            this.filter = highlight.filters
            this.highlightService.clearHighlight(this.pageKey);
        }
        if (subModule) {
            this.subModule = subModule;
            this.moduleId = subModule.module_id;
            this.moduleName = subModule.title;
        }
        if (form) {
            this.moduleFormId = form.form_id;
        }
        if (moduleTableId) {
            this.moduleTableId = moduleTableId.table_id;
        }
        this.getHeaderConfigListing();
    }
    
    
    
    onRefresh() {
        this.filter = {};
        this.reusableTable.clearSearchInputs();
        this.getHeaderConfigListing();
    }
    
    goToPage() {
        this.router.navigate(['/apps/master/products-list/add-product']);
    }
    
    //---------Product Listing----------//
    
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
    
    listing: any = [];
    pagination: any = {}
    page: number = 1;
    
    getList() {
        this.skLoading = true;
        this.api.post({ filters: this.filter, sorting: this.sorting, 'page': this.page }, 'product/read').subscribe(result => {
            if (result['statusCode'] === 200) {
                this.skLoading = false;
                this.listing = result['data'];
                this.listing.forEach((row: any) => row.isChecked = row.status === 'Active');
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
    
    
    // -------- Excel Download//
    
    openModal() {
        this.isModalOpen = true; // Open the modal
    }
    
    closeModal() {
        this.isModalOpen = false; // Close the modal
    }
    
    isHighlighted(id: string): boolean {
        return this.highlightedId === id;
    }
    
    setHighLight(rowId: string) {
        this.comanFuncation.setHighLight(this.pageKey, rowId, '', this.filter, this.pagination.cur_page ? this.pagination.cur_page : 1)
    }
    
    // getAllExcelOptionChecked() {
    //     this.allProductPageHeaders.forEach((header: any) => {
    //         header.excel_checked = true;
    //     });
    
    //     this.excelDownloadColumn = this.allProductPageHeaders.filter((header: any) => header.excel_checked);
    // }
    
    // excelDownloadColumn: any = [];
    // onExcelCheckboxChange(item: any, type: string, event: Event) {
    //     const target = event.target as HTMLInputElement;
    //     item.excel_checked = target.checked;
    //     this.excelDownloadColumn = this.allProductPageHeaders.filter((header: any) => header.excel_checked);
    // }
    
    downurl: any = '';
    // getListingExcelDownload() {
    //     this.api.disabled = true;
    //     this.api.post({ filters: this.filter, sorting: this.sorting, 'page': this.page }, 'product/read').subscribe(result => {
    //         if (result['statusCode'] === 200) {
    //             this.api.disabled = false;
    //             this.closeModal();
    //             // window.open(this.downurl + result['filename']);
    //         }
    //     });
    // }
    // --------//
    
    handleSelectionChange(event: { category_name: string; selections: string[] }): void {
        const { category_name, selections } = event;
        this.filter[category_name] = selections;
        this.getList();
        
    }
    
    updateSearchFilter(event: { searchText: string; name: string }) {
        this.filter[event.name] = event.searchText;
        this.getList();
    }
    
    handleDateRangeChange(event: { [key: string]: { start: string; end: string } }) {
        this.filter = event;
        this.getList();
    }
    
    onDeleteProduct(productId: any) {
        this.alert.confirm("Are you sure?")
        .then((result) => {
            if (result.isConfirmed) {
                this.api.patch({ _id: productId, is_delete: 1 }, 'product/delete').subscribe(result => {
                    if (result['statusCode'] === 200) {
                        Swal.fire('Deleted!', result.message, 'success');
                        this.getList();
                    }
                });
            }
        });
    }
    
    // -------- Pagination//
    changeToPagination(btnType: string) {
        if (btnType == 'Previous') {
            if (this.pagination.prev && this.page > 1) {
                this.page--;  // Decrement the page number
                this.getList();
            }
        }
        else {
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
    
    
    // ******status change funcation start*****//
    onToggleChange(newState: boolean, id: string, status: string) {
        this.comanFuncation.statusChange(newState, id, status, this.subModule, 'toggle', 'product/update-status',).subscribe((result: boolean) => {
            if (result) {
                this.getHeaderConfigListing();
            } else {
                this.getHeaderConfigListing();
            }
        });
    }
    // ******status change funcation end*****//
    
    openHeaderSettingModal() {
        this.getHeaderConfigListing()
        const dialogRef = this.dialog.open(ModalsComponent, {
            width: '450px',
            panelClass: 'mat-right-modal',
            position: { right: '0px' },
            data: {
                'lastPage': 'header-config',
                'moduleFormId': this.moduleFormId,
                'moduleTableId': this.moduleTableId,
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
    
    // ***** List Logs Modal Start *****//
    openMainLogModal(row_id:string) {
        this.comanFuncation.listLogsModal(this.subModule.sub_module_id, row_id, this.subModule.module_type).subscribe(result => {
        });
    }
    // ***** List Logs Modal End *****//
    
    
    
    // ***** Import Modal Start *****//
    importModal() {
        this.comanFuncation.importModal(this.subModule.sub_module_id, this.moduleFormId).subscribe(result => {
        });
    }
    // ***** Import Modal End *****//
}