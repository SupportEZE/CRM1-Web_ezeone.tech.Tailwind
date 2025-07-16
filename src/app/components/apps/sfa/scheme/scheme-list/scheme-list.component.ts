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
import Swal from 'sweetalert2';
import { SweetAlertService } from '../../../../../core/services/alert/sweet-alert.service';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { DateService } from '../../../../../shared/services/date.service';

@Component({
    selector: 'app-scheme-list',
    imports: [SharedModule,CommonModule,SpkReusableTablesComponent,MaterialModuleModule,FormsModule],
    templateUrl: './scheme-list.component.html',
})
export class SchemeListComponent {
    page:any = 1;
    FORMID:any= FORMIDCONFIG;
    skLoading:boolean = false
    activeTab: string = 'Active';
    pagination:any={};
    filter: any = {};
    mainTabs:any=[];
    modules:any={};
    listingCount:any={};
    listing:any=[];
    submodule:any ={};
    accessRight:any = {};
    listData:any =[];
    constructor(
        public dialog:MatDialog,
        public api: ApiService,
        public comanFuncation: ComanFuncationService,
        public moduleService: ModuleService,
        public alert : SweetAlertService,
        private router: Router,
        private logService : LogService,
        public toastr: ToastrServices,
        private dateService: DateService,
    )
    {}
    
    ngOnInit() {
        const accessRight = this.moduleService.getAccessMap('SFA', 'Order', 'Scheme');
        if (accessRight) {
            this.accessRight = accessRight;
        }
        const subSubModule = this.moduleService.getSubSubModuleByName('SFA', 'Order', 'Scheme');
        if (subSubModule) {
            this.submodule = subSubModule;
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
    
    onDateChange(type: 'date_from' | 'date_to' | 'created_at', event: any) {
        if (event) {
            const formattedDate = this.dateService.formatToYYYYMMDD(event); // Convert date to YYYY-MM-DD
            this.filter[type] = formattedDate;
        } else {
            this.filter[type] = ''; // Reset the value if cleared
        }
        if (this.filter.date_from || this.filter.date_to || this.filter.created_at) {
            this.getList();
        }
    }
    
    goToAddPage()
    {
        this.router.navigate(['/apps/sfa/scheme/scheme-add']);
    }
    
    goToDetailPage(rowId:any)
    {
        this.router.navigate(['/apps/sfa/scheme/scheme-detail' , rowId]);
    }
    
    // -------- Pagination//
    
    changeToPage(page: number) {
        this.pagination.cur_page = page; 
        this.getList(); // API call with the updated page
    }
    
    changeToPagination(btnType: string) {
        if (btnType == 'Previous') {
            if (this.pagination.prev && this.pagination.cur_page > 1) {
                this.pagination.cur_page--;  // Decrement the page number
                this.getList();
            }
        }
        else
        {
            if (this.pagination.next) {
                this.pagination.cur_page++;  // Increment the page number
                this.getList();
            }
        }
    }
    // -------- Pagination//
    
    getList(){
        this.skLoading = true;
        this.api.post({ filters: this.filter, activeTab: this.activeTab, page: this.pagination.cur_page ?? 1}, 'order/read-scheme').subscribe(result => {
            if(result['statusCode'] == 200){
                this.skLoading = false;
                this.listing = result['data']['result'];
                this.listingCount = result['data']['activeTab'];
                this.listData.forEach((row:any) => {
                    if(row.status === 'Active'){
                        row.isChecked = true
                    }
                    else{
                        row.isChecked = false
                    }
                });
                this.pagination = result['pagination'];
                // for (let i = 0; i < this.listing.length; i++) {
                //     const list = this.listing[i];
                //     if (list.date_from) {
                //         list.date_from = this.dateService.formatToYYYYMMDD(new Date(list.date_from));
                //     }
                //     if (list.date_to) {
                //         list.date_to = this.dateService.formatToYYYYMMDD(new Date(list.date_to));
                //     }
                // }
                
                this.mainTabs = [
                    { name: 'Active', label: 'Active', icon: 'ri-check-double-line', count: this.listingCount.active_count},
                    { name: 'Inactive', label: 'Inactive', icon: 'ri-file-forbid-line', count: this.listingCount.inactive_count}
                ];
            }
        });
    }
    
    onDeleteRow(rowId: any) {
        this.alert.confirm("Are you sure?")
        .then((result) => {
            if (result.isConfirmed) {
                this.api.patch({ _id: rowId, is_delete: 1}, 'order/delete-scheme').subscribe(result => {
                    if (result['statusCode']  ===  200) {
                        this.logService.logActivityOnDelete(this.submodule.module_id, this.submodule.title, 'delete', rowId , 'Scheme');
                        Swal.fire('Deleted!', result.message, 'success');
                        this.getList();
                    }                        
                });
            }
        });
    }
    
    onToggleChange(newState: boolean, id: string, status: string) {
        this.comanFuncation.statusChange(newState, id, status, this.submodule, 'toggle', 'order/update-scheme-status',).subscribe((result: boolean) => {
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
    
    PageHeaders = [
        {label: 'Created At'},
        {label: 'Created By'},
        {label: 'Scheme ID'},
        {label: 'Start Date'},
        {label: 'End Date'},
        {label: 'Product'},
        {label: 'Scheme Description'},
        {label: 'Status'},
    ];
    
}
