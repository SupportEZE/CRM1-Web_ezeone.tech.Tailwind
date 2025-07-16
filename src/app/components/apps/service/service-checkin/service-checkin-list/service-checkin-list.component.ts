import { Component, Input } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ShowcodeCardComponent } from '../../../../../shared/components/showcode-card/showcode-card.component';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { ApiService } from '../../../../../core/services/api/api.service';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import moment from 'moment';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { DateService } from '../../../../../shared/services/date.service';

@Component({
    selector: 'app-service-checkin-list',
    imports: [MaterialModuleModule,SharedModule, CommonModule,SpkReusableTablesComponent],
    templateUrl: './service-checkin-list.component.html',
})
export class ServiceCheckinListComponent {
    @Input() pageHeader: boolean = true;
    @Input() _id !: any;
    skLoading:boolean = false;
    filter: any = {};
    listingData:any = [];
    page: number = 1;
    
    constructor(public api:ApiService, public commonFunction:ComanFuncationService, public dateService: DateService){}
    ngOnInit(): void {
        this.getDayList();
    }
    dateFilter(){
        this.getDayList();
    }
    
    onRefresh()
    {
        this.filter = {};
        this.getDayList();
    }
    
    PageHeaders = [
        {"label": "Created At"},
        {"label": "Created By"},
        {"label": "User Details"},
        {"label": "Reporting Manager"},
        {"label": "Company Name"},
        {"label": "Customer Type"},
        {"label": "Check In"},
        {"label": "Start Location"},
        {"label": "Check Out"},
        {"label": "End Location"},
        {"label": "Total Time Spend"},
        {"label": "Check List"},
        {"label": "Remark"},
    ];
    
    
    getDayList() {
        this.skLoading = true;
        
        let reqData :any = {};
        reqData = this.filter;
        if(this.filter.date){
            reqData.filter = {};
            reqData.filter.activity_date = this.filter.date;
            this.filter.date= null;
        }
        reqData.page = this.page;
        reqData = this.commonFunction.removeBlankKeys(reqData);
        
        this.api.post(reqData, 'activity/read').subscribe(result => {
            if (result['statusCode']  ===  200) {
                this.skLoading = false;
                this.listingData = result['data'];
                this.listingData?.map((item:any)=>{
                    item.created_at= item?.created_at ? moment(item.created_at).utc().format('d MMM yyyy hh:mm a') : '--';
                    item.user_name= item?.user_info?.name || '--';
                    item.user_code= item?.user_info?.user_code || '--';
                    item.reporting_manager_name= item?.user_info?.reporting_manager_name || '--';
                    item.company_name= item?.customer_details?.customer_name || '--';
                    item.type= item?.customer_details?.customer_type_name || '--';
                    item.check_in= item?.visit_start ? moment(item?.visit_start).utc().format('hh:mm a') : '--';
                    item.start_location= item?.start_location || 'Not Available';
                    item.check_out= item?.visit_end ? moment(item?.visit_end).utc().format('hh:mm a') : '--';
                    item.end_location= item?.end_location || 'Not Available';
                    item.total_time_spend= item?.avarage_meeting_time || '--';
                    item.check_list= item?.check_list || '--';
                    item.remark= item?.remark || '--';
                })
            }
        });
    }    
    
    goToDetailPage(id:any){}
}
