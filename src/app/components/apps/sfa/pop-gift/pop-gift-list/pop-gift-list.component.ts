import { Component } from '@angular/core';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../../shared/shared.module';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SpkSalesCardsComponent } from '../../../../../../@spk/reusable-dashboard/spk-sales-cards/spk-sales-cards.component';
import { PopGiftAddComponent } from '../pop-gift-add/pop-gift-add.component';
import { ApiService } from '../../../../../core/services/api/api.service';
import { SweetAlertService } from '../../../../../core/services/alert/sweet-alert.service';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import { ModuleService } from '../../../../../shared/services/module.service';
import { DateService } from '../../../../../shared/services/date.service';

@Component({
    selector: 'app-pop-gift-list',
    imports: [SharedModule,CommonModule,SpkReusableTablesComponent,MaterialModuleModule,SpkSalesCardsComponent],
    templateUrl: './pop-gift-list.component.html',
})
export class PopGiftListComponent {
    skLoading:boolean = false
    activeTab: string = 'company_stock';
    pagination:any={};
    filter: any = {};
    mainTabs:any=[];
    submodule:any={};
    listingCount:any={};
    listing:any=[];
    cardData:any=[];
    showChangeStatusBtn: boolean = false;
    accessRight:any = {};
    constructor(public dialog:MatDialog,public api: ApiService,public alert : SweetAlertService,private router: Router,public toastr: ToastrServices,public comanFuncation: ComanFuncationService,public moduleService: ModuleService,private dateService: DateService){}
    
    ngOnInit() {
        const accessRight = this.moduleService.getAccessMap('SFA', 'Pop Gift');
        if (accessRight) {
            this.accessRight = accessRight;
        }
        const subModule = this.moduleService.getSubModuleByName('SFA', 'Pop Gift');
        if (subModule) {
            this.submodule = subModule;
        }
        
        this.getList();
    }
    
    goToDetailPage(rowId:any)
    {
        this.router.navigate(['/apps/sfa/pop-gift/pop-gift-detail' , rowId , this.activeTab]);
    }
    
    onRefresh()
    {
        this.filter = {};
        this.getList();
    }
    
    onTabChange(tab: string) {
        this.activeTab = tab;
        if (this.activeTab === 'company_stock' || this.activeTab === 'team_stock' || this.activeTab === 'distributor_stock') {
            this.getList();
        }
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
        this.api.post({filters : this.filter, activeTab : this.activeTab, page: this.pagination.cur_page ?? 1}, 'pop-gift/read-pop-gift').subscribe(result => {
            if(result['statusCode'] == 200){
                this.skLoading = false;
                this.listing = result['data']['result'];
                this.listingCount = result['data']['summaryStats'];
                this.pagination = result['pagination'];
                this.getMainTabs()
            }
        });
    }
    
    openModal(row:any, formType:string) {
        const dialogRef = this.dialog.open(PopGiftAddComponent, {
            width: formType !== 'manage-transaction' ? '400px' : '770px',
            panelClass: formType !== 'manage-transaction' ? 'mat-right-modal' : '',
            position: formType !== 'manage-transaction' ? { right: '0px' } : undefined,
            data: {
                'formType': formType,
                'formData': row || {}
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result === true){
                this.getList();
            }
        });
    }
    
    // delete funcation start //
    delete(id: string, api:string, label:string) {
        this.comanFuncation.delete(id, this.submodule, label, api, 'single_action', id).subscribe((result: boolean) => {
            if (result === true) {
                this.getList();
            }
        });
    }
    // delete funcation end
    
    getMainTabs()
    {
        this.cardData = [
            {
                id: 1,
                cardClass: "overflow-hidden main-content-card",
                customClass: "justify-content-between align-items-start  mb-2",
                valueClass: "fw-medium mb-0",
                titleClass: "d-block mb-1",
                title: "Total Items",
                value: this.listingCount.totalItems,
                graph: "Stock Execution",
                color: "success",
                percentage: "2.56%",
                percentageIcon: "ti ti-arrow-narrow-up fs-16",
                bg: "primary",
                icon: "ti ti-box-multiple", // Updated
                colClass: "xxl:col-span-2"
            },
            {
                id: 2,
                cardClass: "overflow-hidden main-content-card",
                customClass: "justify-content-between align-items-start  mb-2",
                valueClass: "fw-medium mb-0",
                titleClass: "d-block mb-1",
                title: "Company Stock",
                value: this.listingCount.companyStock,
                graph: "Stock Execution",
                color: "success",
                percentage: "0.34%",
                percentageIcon: "ti ti-arrow-narrow-up fs-16",
                bg: "primarytint1color",
                icon: "ti ti-building-warehouse", // Updated
                colClass: "xxl:col-span-2",
                activeTab: "company_stock",
            },
            {
                id: 3,
                cardClass: "overflow-hidden main-content-card",
                customClass: "justify-content-between align-items-start  mb-2",
                valueClass: "fw-medium mb-0",
                titleClass: "d-block mb-1",
                title: "Team Stock",
                value: this.listingCount.teamStock,
                graph: "Stock Execution",
                color: "success",
                percentage: "7.66%",
                percentageIcon: "ti ti-arrow-narrow-up fs-16",
                bg: "primarytint2color",
                icon: "ti ti-users", // Updated
                colClass: "xxl:col-span-2",
                activeTab: "team_stock",
            },
            {
                id: 4,
                cardClass: "overflow-hidden main-content-card",
                customClass: "justify-content-between align-items-start  mb-2",
                valueClass: "fw-medium mb-0",
                titleClass: "d-block mb-1",
                title: "Distributor Stock",
                value: this.listingCount.customerStock,
                graph: "Stock Execution",
                color: "danger",
                percentage: "0.74%",
                percentageIcon: "ti ti-arrow-narrow-down fs-16",
                bg: "primarytint3color",
                icon: "ti ti-truck-loading", // Updated
                colClass: "xxl:col-span-3",
                activeTab: "distributor_stock",
            },
            {
                id: 5,
                cardClass: "overflow-hidden main-content-card",
                customClass: "justify-content-between align-items-start  mb-2",
                valueClass: "fw-medium mb-0",
                titleClass: "d-block mb-1",
                title: "Successfully Distribution",
                value: Math.round(+this.listingCount.distributionPercentage.replace('%', '')) + '%',
                graph: "Stock Execution",
                color: "danger",
                percentage: "0.74%",
                percentageIcon: "ti ti-arrow-narrow-down fs-16",
                bg: "primarytint3color",
                icon: "ti ti-checkup-list", // Updated
                colClass: "xxl:col-span-3",
                activeTab: "percentage_stock",

            }
        ];
    }
    
    openMainLogModal(rowId:string) {
        this.comanFuncation.listLogsModal(this.submodule.module_id , rowId, this.submodule.module_type ).subscribe(result => {
            if(result === true){
                this.getList();
            }
        });
    }
    
    
    headers=[
        {label:"Created At"},
        {label:"Created By"},
        {label:"Item Detail",},
        {label:"Stock"},
        {label:"Description"},
    ]

    headers_one=[
        {label:"Created At"},
        {label:"Created By"},
        {label:"User Detail",},
        {label:"Total Item", table_class :"text-center"},
        {label:"Total Stock", table_class :"text-center"},
        {label:"Last Transaction"},
    ]
}
