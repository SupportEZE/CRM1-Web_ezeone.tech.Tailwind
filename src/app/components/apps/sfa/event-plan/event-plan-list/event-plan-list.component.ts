import { Component } from '@angular/core';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../../shared/shared.module';
import { ShowcodeCardComponent } from '../../../../../shared/components/showcode-card/showcode-card.component';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { EventPlanAddComponent } from '../event-plan-add/event-plan-add.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from '../../../../../core/services/api/api.service';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import { ModuleService } from '../../../../../shared/services/module.service';
import { CURRENCY_SYMBOLS } from '../../../../../utility/constants';
import { DateService } from '../../../../../shared/services/date.service';

@Component({
    selector: 'app-event-list',
    imports: [SharedModule,CommonModule,SpkReusableTablesComponent,ShowcodeCardComponent,MaterialModuleModule],
    templateUrl: './event-plan-list.component.html',
})
export class EventPlanListComponent {
    skLoading:boolean = false
    activeTab: string = 'Pending';
    dateActiveTab:any;
    pagination:any={};
    filter: any = {};
    mainTabs:any=[];
    submodule:any={};
    listingCount:any={};
    listing:any=[];
    stats:any=[];
    calenderData:any=[];
    showChangeStatusBtn: boolean = false;
    CURRENCY_SYMBOLS = CURRENCY_SYMBOLS
    accessRight:any = {};
    
    constructor(public dialog:MatDialog,public api: ApiService,private router: Router,public toastr: ToastrServices,public comanFuncation: ComanFuncationService,public moduleService: ModuleService, private dateService: DateService){}
    
    ngOnInit() {
        const accessRight = this.moduleService.getAccessMap('SFA', 'Event Plan');
        if (accessRight) {
            this.accessRight = accessRight;
        }
        const subModule = this.moduleService.getSubModuleByName('SFA', 'Event Plan');
        if (subModule) {
            this.submodule = subModule;
        }
        
        this.getList();
    }
    
    goToAddPage()
    {
        this.router.navigate(['/apps/sfa/event-plan/event-plan-add']);
    }
    
    goToDetailPage(rowId:any)
    {
        this.router.navigate(['/apps/sfa/event-plan/event-plan-detail', rowId]);
    }
    
    onRefresh() {
        const { event_date } = this.filter || {};
        this.filter = {};
        if (event_date) this.filter.event_date = event_date;
        this.getList();
    }
    
    onTabChange(tab: string) {
        this.activeTab = tab;
        if (this.activeTab !== 'total') {
            this.getList();
        }
    }
    
    onDateTabChange(tabDate: string) {
        this.dateActiveTab = tabDate;
        this.filter.event_date = tabDate;
        this.getList();
    }
    
    onDateChange(type: 'event_date', event: any) {
        if (event) {
            const formattedDate = this.dateService.formatToYYYYMMDD(event); // Convert date to YYYY-MM-DD
            this.filter[type] = formattedDate;
        } else {
            this.filter[type] = null; // Reset the value if cleared
        }
        if (this.filter.event_date) {
            this.getList();
        }
    }
    
    getList(){
        this.skLoading = true;
        
        this.api.post({filters : this.filter, activeTab : this.activeTab, dateActiveTab : this.dateActiveTab, page: this.pagination.cur_page ?? 1}, 'event/read').subscribe(result => {
            if(result['statusCode'] == 200){
                this.skLoading = false;
                this.listing = result['data']['result'];
                this.listingCount = result['data']['tabCounts'];
                this.calenderData = result['data']['calender_data'];
                this.pagination = result['pagination'];
                this.getMainTabs()
                
                if (!this.dateActiveTab && this.calenderData.length > 0) {
                    this.dateActiveTab = this.calenderData[0].event_date;
                    
                    this.onDateTabChange(this.dateActiveTab);
                }
            }
        });
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
        this.stats = [
            {
                title: 'Total',
                count: this.listingCount.total_count || 0,
                svgIconClass: 'text-primarytint2color',
                svgIconPath: 'ri-bar-chart-box-line',
                activeTab: "Total",
            },
            {
                title: 'Pending Approval',
                count: this.listingCount.pending_count || 0,
                svgIconClass: 'text-primary',
                svgIconPath: 'ri-time-line',
                activeTab: "Pending",
            },
            {
                title: 'In Process',
                count: this.listingCount.inprocess_count || 0,
                svgIconClass: 'text-primary',
                svgIconPath: 'ri-hourglass-fill',
                activeTab: "Inprocess",
            },
            {
                title: 'Upcoming Event',
                count: this.listingCount.upcoming_count || 0,
                svgIconClass: 'text-primarytint3color',
                svgIconPath: 'ri-calendar-event-line',
                activeTab: "Upcoming",
            },
            {
                title: 'Completed',
                count: this.listingCount.complete_count || 0,
                svgIconClass: 'text-primarytint1color',
                svgIconPath: 'ri-check-double-line',
                activeTab: "Complete",
            },
            {
                title: 'Cancel & Reject',
                count: this.listingCount.reject_count || 0,
                svgIconClass: 'text-primarytint2color',
                svgIconPath: 'ri-close-circle-line',
                activeTab: "Reject",
            },
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
        {label:"Event Date"},
        {label:"Request By"},
        {label:"Event Type"},
        {label:"Customer Details"},
        {label:"Budget Details"},
        {label:"Event Venue"},
    ]
}
