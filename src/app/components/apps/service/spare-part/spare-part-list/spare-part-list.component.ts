import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../../../core/services/api/api.service';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import { ModuleService } from '../../../../../shared/services/module.service';
import { FORMIDCONFIG } from '../../../../../../config/formId.config';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { LogService } from '../../../../../core/services/log/log.service';
import { SweetAlertService } from '../../../../../core/services/alert/sweet-alert.service';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { SpkSalesCardsComponent } from '../../../../../../@spk/reusable-dashboard/spk-sales-cards/spk-sales-cards.component';
import { SparePartAddComponent } from '../spare-part-add/spare-part-add.component';
import { CURRENCY_SYMBOLS } from '../../../../../utility/constants';


@Component({
    selector: 'app-spare-part-list',
    imports: [SharedModule,CommonModule,SpkReusableTablesComponent,MaterialModuleModule,FormsModule, SpkSalesCardsComponent],
    templateUrl: './spare-part-list.component.html',
})
export class SparePartListComponent {
    activeTab: string = 'company_stock';
    page:any = 1;
    FORMID:any= FORMIDCONFIG;
    skLoading:boolean = false
    pagination:any={};
    filter: any = {};
    mainTabs:any=[];
    modules:any={};
    listingCount:any={};
    listing:any=[];
    cardData:any=[];
    accessRight:any = {};
    CURRENCY_SYMBOLS = CURRENCY_SYMBOLS;
    constructor(public dialog:MatDialog,public api: ApiService,public comanFuncation: ComanFuncationService,public moduleService: ModuleService,public alert : SweetAlertService,private router: Router, private logService : LogService,public toastr: ToastrServices){}
    
    ngOnInit() {
        const accessRight = this.moduleService.getAccessMap('WCMS', 'Spare Part');
        console.log(accessRight);
        
        if (accessRight) {
            this.accessRight = accessRight;
        }
        const modules = this.moduleService.getSubModuleByName('WCMS', 'Spare Part');
        if (modules) {
            this.modules = modules;
            console.log(this.modules);
        }
        this.getList();
    }
    
    
    onRefresh()
    {
        this.filter = {};
        this.getList();
    }
    
    onTabChange(tab: string) {
        this.activeTab = tab;
        this.getList();
    }
    
    goToAddPage()
    {
        this.router.navigate(['/apps/service/spare-part/spare-part-add']);
    }
    
    goToDetailPage(rowId:any)
    {
        this.router.navigate(['/apps/service/spare-part/spare-part-detail' , rowId , this.activeTab]);
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
        this.api.post({ filters: this.filter, activeTab: this.activeTab, page: this.pagination.cur_page ?? 1}, 'spare-part/read').subscribe(result => {
            if(result['statusCode'] == 200){
                this.skLoading = false;
                this.listing = result['data']['result'];
                this.listingCount = result['data']['summaryStats'];
                this.pagination = result['pagination'];
                this.getMainTabs();
            }
        });
    }
    
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
                value: this.listingCount?.totalItems,
                bg: "primary",
                icon: "ti ti-box-multiple", // Updated
                colClass: "xxl:col-span-2",
            },
            {
                id: 2,
                cardClass: "overflow-hidden main-content-card",
                customClass: "justify-content-between align-items-start  mb-2",
                valueClass: "fw-medium mb-0",
                titleClass: "d-block mb-1",
                title: "Company Stock",
                value: this.listingCount?.companyStock,
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
                value: this.listingCount?.teamStock,
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
                value: this.listingCount?.customerStock,
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
                title: "Successfully Installation",
                value: this.listingCount?.distributionPercentage,
                bg: "primarytint3color",
                icon: "ti ti-checkup-list", // Updated
                colClass: "xxl:col-span-3",
            }
        ];
    }
    
    // delete funcation start //
    delete(id: string, api:string, label:string) {
        this.comanFuncation.delete(id, this.modules, label, api, 'single_action', id).subscribe((result: boolean) => {
            if (result === true) {
                this.getList();
            }
        });
    }
    // delete funcation end
    
    openModal(row:any, formType:string) {
        const dialogRef = this.dialog.open(SparePartAddComponent, {
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
    
    openMainLogModal(rowId:string) {
        this.comanFuncation.listLogsModal(this.modules.module_id , rowId, this.modules.module_type ).subscribe(result => {
            if(result === true){
                this.getList();
            }
        });
    }
    
    headers=[
        {label:"Created By"},
        {label:"Created At"},
        {label:"Item Detail",},
        {label:"Mrp", table_class: "text-right"},
        {label:"Stock"},
        {label:"Description"},
    ]
    
    headers_one=[
        {label:"Created By"},
        {label:"Created At"},
        {label:"User Detail",},
        {label:"Total Item", table_class :"text-center"},
        {label:"Total Stock", table_class :"text-center"},
        {label:"Last Transaction"},
    ]
}
