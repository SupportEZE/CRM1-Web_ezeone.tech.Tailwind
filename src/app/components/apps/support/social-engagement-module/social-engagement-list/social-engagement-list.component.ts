import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { SpkSocialMediaCardComponent } from '../../../../../../@spk/reusable-dashboard/spk-social-media-card/spk-social-media-card.component';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { MatDialog } from '@angular/material/dialog';
import { SocialEngagementAddComponent } from '../social-engagement-add/social-engagement-add.component';
import { Router } from '@angular/router';
import { SweetAlertService } from '../../../../../core/services/alert/sweet-alert.service';
import { ApiService } from '../../../../../core/services/api/api.service';
import { LogService } from '../../../../../core/services/log/log.service';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import { DateService } from '../../../../../shared/services/date.service';
import { ModuleService } from '../../../../../shared/services/module.service';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-social-engagement-list',
    imports: [SharedModule,CommonModule,SpkSocialMediaCardComponent,SpkReusableTablesComponent,MaterialModuleModule,FormsModule],
    templateUrl: './social-engagement-list.component.html',
})
export class SocialEngagementListComponent {
    page:any =1
    skLoading:boolean = false
    skLoadingSocialMedia:boolean = false
    // listing:any=[];
    socialRequestList:any=[];
    performanceListing:any=[];
    socialPlatformListing:any=[];
    originalData:any={};
    modules:any={};
    pagination:any={};
    filter: any = {};
    
    constructor(public dialog:MatDialog,public api: ApiService,public comanFuncation: ComanFuncationService,public moduleService: ModuleService,public alert : SweetAlertService,public dateService:DateService,private router: Router, private logService : LogService,public toastr: ToastrServices){}
    
    
    ngOnInit() {
        const subModule = this.moduleService.getSubModuleByName('IRP', 'Leader Board');
        if (subModule) {
            this.modules = subModule;
        }
        
        this.getSocialRequestList();
    }
    
    getSocialRequestList(){
        this.skLoading = true;
        this.api.post({page: this.pagination.cur_page ?? 1}, 'web-social/read-request').subscribe(result => {
            if(result['statusCode'] == 200){
                this.skLoading = false;
                this.socialRequestList = result['data'];
                // this.getList();
                this.getSocialPlatform();
                this.getPerformance();
            }
        });
    }
    
    openModal(pageType:string, row:any) {
        const dialogRef = this.dialog.open(SocialEngagementAddComponent, {
            width: '700px',
            data: {
                'pageType': pageType,
                'rowData': row
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result === true){
                this.getSocialRequestList();
            }
        });
    }
    
    updateStatus(rowId:any , status:string) {
        this.api.disabled = true;
        let actionText = status === 'Reject' ? 'Delete it!' : 'Update it!';
        let actionVerb = status === 'Reject' ? 'delete' : 'update';
        this.alert.confirm(`Are you sure you want to ${actionVerb} this?`, `Once ${actionVerb}d, this item cannot be restored.`, actionText)
        .then(result => {
            if (result.isConfirmed) {
                this.api.post({_id : rowId , status : status}, 'web-social/request-status-change').subscribe(result => {
                    if(result['statusCode'] == 200){
                        this.api.disabled = false;
                        this.toastr.success(result['message'], '', 'toast-top-right');
                        this.getSocialRequestList();
                    }
                });
            }
        });
        
    }
    
    getSocialPlatform(){
        this.skLoadingSocialMedia = true;
        this.api.post({page: this.pagination.cur_page ?? 1}, 'web-social/read').subscribe(result => {
            if(result['statusCode'] == 200){
                this.skLoadingSocialMedia = false;
                this.socialPlatformListing = result['data'];
            }
        });
    }
    
    getPerformance(){
        this.skLoading = true;
        this.api.post({filters : this.filter, page: this.pagination.cur_page ?? 1}, 'web-social/read-performance').subscribe(result => {
            if(result['statusCode'] == 200){
                this.skLoading = false;
                this.performanceListing = result['data'];
                this.pagination = result['pagination']
            }
        });
    }
    
    
    
    // -------- Pagination//
    
    changeToPage(page: number) {
        this.pagination.cur_page = page; 
        this.getPerformance(); // API call with the updated page
    }
    
    changeToPagination(action: string) {
        if (action === 'Next' && this.pagination.cur_page < this.pagination.total_pages) {
            this.pagination.cur_page++;
        } else if (action === 'Previous' && this.pagination.cur_page > 1) {
            this.pagination.cur_page--;
        }
        this.getPerformance(); 
    }
    // -------- Pagination//
    
    socialMediColumns=[
        { label: 'Date',table_class :""},
        { label: 'Platform',table_class :""},
        { label: 'Category',table_class :""},
        { label: 'Follower Name',table_class :""},
        { label: 'Mobile',table_class :""},
        { label: 'State',table_class :""},
        { label: 'Bonus Points',table_class :"text-center"},
    ]
}