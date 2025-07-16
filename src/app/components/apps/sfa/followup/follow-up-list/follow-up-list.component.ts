import { Component } from '@angular/core';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FollowUpAddComponent } from '../follow-up-add/follow-up-add.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../../../core/services/api/api.service';
import { ShowcodeCardComponent } from '../../../../../shared/components/showcode-card/showcode-card.component';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import { ModuleService } from '../../../../../shared/services/module.service';
import { LogService } from '../../../../../core/services/log/log.service';
import { SweetAlertService } from '../../../../../core/services/alert/sweet-alert.service';
import { FormsModule } from '@angular/forms';
import { DateService } from '../../../../../shared/services/date.service';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';

@Component({
    selector: 'app-follow-up-list',
    imports: [SpkReusableTablesComponent,SharedModule,CommonModule,ShowcodeCardComponent,FormsModule,MaterialModuleModule],
    templateUrl: './follow-up-list.component.html',
})
export class FollowUpListComponent {
    listing:any=[];
    filter: any = {};
    skLoading:boolean = false
    activeTab: string = 'Pending';
    submodule:any={};
    pagination:any={};
    page: number = 1;
    tabs:any=[];
    listingData:any={};
    accessRight:any = {};
    
    
    
    constructor(public dialog:MatDialog,public api: ApiService,public comanFuncation: ComanFuncationService,public moduleService: ModuleService,private logService: LogService,public alert : SweetAlertService,public date:DateService,){}
    
    
    ngOnInit() {
        const accessRight = this.moduleService.getAccessMap('SFA', 'Follow Up');
        if (accessRight) {
            this.accessRight = accessRight;
        }
        this.filter = {};
        const subModule = this.moduleService.getSubModuleByName('SFA', 'Follow Up');
        if (subModule) {
            this.submodule = subModule;
        }
        this.listingData = { tabCounts: { pending: 0, complete: 0, upcoming: 0 } };
        this.getList();
        
    }
    
    setActiveTab(tab:string) {
        this.activeTab = tab;
        this.filter = {};
        this.getList();
    }
    
    onRefresh()
    {
        this.filter = {};
        this.getList();
    }
    
    updateFilter(name: string) {
        this.filter.assigned_to_user_name = name;
        this.getList();
    }
    
    onDateChange(type: 'followup_date' | 'created_at', event: any) {
        if (event) {
            const formattedDate = this.date.formatToYYYYMMDD(event); // Convert date to YYYY-MM-DD
            this.filter[type] = formattedDate;
        } else {
            this.filter[type] = null; // Reset the value if cleared
        }
        if ((this.filter.followup_date) || this.filter.created_at) {
            this.getList();
        }
    }
    
    getList(){
        this.skLoading = true;        
        this.api.post({filters : this.filter , activeTab : this.activeTab}, 'followup/read').subscribe(result => {
            if(result['statusCode'] == 200){
                this.skLoading = false;
                this.listingData = result['data'];
                this.listing = result['data']['result'];
                this.pagination = result['pagination'];
                
                this.tabs = [
                    { label: "Pending", value: "Pending", icon: "ri-briefcase-line", countClass:'warning' ,count: this.listingData.tabCounts?.pending || 0 },
                    { label: "Upcoming", value: "Upcoming", icon: "ri-calendar-line", countClass:'info' ,count: this.listingData.tabCounts?.upcoming || 0 },
                    { label: "Complete", value: "Complete", icon: "ri-checkbox-circle-line", countClass:'success' ,count: this.listingData.tabCounts?.complete || 0 }
                ];
            }
        });
    }
    
    // updateTabCounts() {
    //     this.tabs.forEach((tab:any) => {
    //         tab.count = this.listingData.tabCounts[tab.value.toLowerCase()] || 0;
    //     });
    // }
    
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
    
    openModal(row:any) {
        const dialogRef = this.dialog.open(FollowUpAddComponent, {
            width: '700px',
            data: {
                'lastPage':'folloup-list',
                'formType': row ? 'edit' : 'create',  // Set formType based on row data
                'formData': row || {}  // Pass the row data if it's edit
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result === true){
                this.getList();
            }
        });
    }
    
    delete(id: string, api:string, label:string) {
        this.comanFuncation.delete(id, this.submodule, label, api, 'single_action', id).subscribe((result: boolean) => {
            if (result === true) {
                this.getList();
            }
        });
    }
    
    onComplete(rowId:string){
        this.comanFuncation.statusChange('Complete', rowId, 'Pending', this.submodule, 'without-toggle','followup/status-update',).subscribe((result: boolean) => {
            if (result) {
                this.getList();
            }
        });
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
        {label:"Category Type"},
        {label:"Party Details"},
        {label:"Type"},
        {label:"Followup Date & Time"},
        {label:"Status"},
        {label:"Assigner"},
        {label:"Remark"},
    ]
    
}
