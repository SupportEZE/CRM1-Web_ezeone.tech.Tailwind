import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../../../core/services/api/api.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { SweetAlertService } from '../../../../../core/services/alert/sweet-alert.service';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { PaymentCollectionAddComponent } from '../payment-collection-add/payment-collection-add.component';
import { CURRENCY_SYMBOLS } from '../../../../../utility/constants';
import { ModuleService } from '../../../../../shared/services/module.service';
import { DateService } from '../../../../../shared/services/date.service';

@Component({
    selector: 'app-stock-audit-list',
    imports: [SharedModule,CommonModule,SpkReusableTablesComponent,MaterialModuleModule,FormsModule],
    templateUrl: './payment-collection-list.component.html',
})
export class PaymentCollectionListComponent {
    CURRENCY_SYMBOLS = CURRENCY_SYMBOLS;
    skLoading:boolean = false
    activeTab: string = 'Pending';
    pagination:any={};
    filter: any = {};
    mainTabs:any=[];
    submodule:any={};
    listingCount:any={};
    listing:any=[];
    showChangeStatusBtn: boolean = false;
    accessRight:any = {};
    constructor(public dialog:MatDialog,public api: ApiService,public alert : SweetAlertService,private router: Router,public toastr: ToastrServices,public moduleService: ModuleService,private dateService: DateService){}
    
    ngOnInit() {
        const accessRight = this.moduleService.getAccessMap('SFA', 'Payment Collection');
        if (accessRight) {
            this.accessRight = accessRight;
        }
        this.getList();
    }
    
    allTasksChecked: boolean=false;
    handleToggleSelectAll(checked: boolean) {
        this.listing.forEach((row: any) => {
            if (row.status === 'Pending') {
                row.checked = checked;
            } else {
                row.checked = false;
            }
        });
        
        this.allTasksChecked = checked;
        this.showChangeStatusBtn = this.listing.some((row: any) => row.checked);
    }
    toggleRowChecked(row: any): void {
        const selectableRows = this.listing.filter((r: any) => r.status === 'Pending');
        this.allTasksChecked = selectableRows.every((r: any) => r.checked);
        this.showChangeStatusBtn = selectableRows.some((r: any) => r.checked);
    }
    get hasPendingRows(): boolean {
        return this.listing?.some((row:any) => row.status === 'Pending');
    }
    
    goToDetailPage(rowId:any)
    {
        this.router.navigate(['/apps/sfa/payment-collection/payment-collection-detail' , rowId]);
    }
    
    onRefresh()
    {
        this.filter = {};
        this.listing.forEach((row: any) => row.checked = false); // uncheck all rows
        this.allTasksChecked = false;
        this.showChangeStatusBtn = false;
        this.getList();
    }
    
    onTabChange(tab: string) {
        this.activeTab = tab;
        this.getList();
    }
    
    // -------- Pagination//
    changeToPage(page: number) {
        this.pagination.cur_page = page; 
        this.getList(); // API call with the updated page
    }
    
    changeToPagination(action: string) {
        if (action === 'Next' && this.pagination.cur_page < this.pagination.total_pages) {
            this.pagination.cur_page++;
        } else if (action === 'Previous' && this.pagination.cur_page > 1) {
            this.pagination.cur_page--;
        }
        this.getList(); 
    }
    // -------- Pagination//
    
    getList(){
        this.skLoading = true;
        if(this.filter.created_at){
            this.filter.created_at = this.dateService.formatToYYYYMMDD(this.filter.created_at);
        }
        if (this.filter.payment_date) {
            this.filter.payment_date = this.dateService.formatToYYYYMMDD(this.filter.payment_date);
        }
        this.api.post({filters : this.filter, activeTab : this.activeTab, page: this.pagination.cur_page ?? 1}, 'payment/read').subscribe(result => {
            if(result['statusCode'] == 200){
                this.skLoading = false;
                this.listing = result['data']['result'];
                this.listingCount = result['data']['status_counts'];
                this.pagination = result['pagination'];
                
                this.mainTabs = [
                    { name: 'All', label: 'All', icon: 'ri-list-check', count: this.listingCount.All },
                    { name: 'Pending', label: 'Pending', icon: 'ri-time-line', count: this.listingCount.Pending },
                    { name: 'Verified', label: 'Verified', icon: 'ri-checkbox-circle-line', count: this.listingCount.Verified },
                    { name: 'Reject', label: 'Reject', icon: 'ri-close-circle-line', count: this.listingCount.Reject },
                ];
            }
        });
    }
    
    openModal(formType: string) {
        const dialogRef = this.dialog.open(PaymentCollectionAddComponent, {
            width: '800px',
            data: {
                'formType': formType,
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            
            if(result === true){
                this.getList();
            }
        });
    }
    
    onChangeStatusAll(formType: string) {
        const selectedRows = this.listing.filter((row: any) => row.checked).map((row: any) => ({ _id: row._id, status: row.status }));
        
        if (selectedRows.length === 0) {
            this.toastr.error('Please select at least one row.', '', 'toast-top-right');
            return;
        }
        
        const dialogRef = this.dialog.open(PaymentCollectionAddComponent, {
            width: '400px',
            data: {
                'formType': formType,
                'selectedRows' : selectedRows
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result === true){
                this.getList();
            }
        });
    }
    
    
    PageHeaders = [
        {label: ''},
        {label: 'S.No'},
        {label: 'Created At'},
        {label: 'Created By'},
        {label: 'Payment At'},
        {label: 'Payment No.'},
        {label: 'Customer Category'},
        {label: 'Customer Name'},
        {label: 'Amount', table_class : 'text-right'},
        {label: 'Payment Mode', table_class : 'text-center'},
        {label: 'Transaction Detail'},
    ];
}
