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
import { AnnouncementModalComponent } from '../announcement-modal/announcement-modal.component';

@Component({
    selector: 'app-announcement-list',
    imports: [SharedModule,CommonModule,SpkReusableTablesComponent,MaterialModuleModule,FormsModule],
    templateUrl: './announcement-list.component.html',
})
export class AnnouncementListComponent {
    page:any = 1;
    FORMID:any= FORMIDCONFIG;
    skLoading:boolean = false
    activeTab: string = 'Published';
    pagination:any={};
    filter: any = {};
    mainTabs:any=[];
    modules:any={};
    listingCount:any={};
    listing:any=[];
    accessRight:any = {};
    constructor(public dialog:MatDialog,public api: ApiService,public comanFuncation: ComanFuncationService,public moduleService: ModuleService,public alert : SweetAlertService,private router: Router, private logService : LogService,public toastr: ToastrServices){}
    
    ngOnInit() {
        const accessRight = this.moduleService.getAccessMap('Announcement');
        if (accessRight) {
            this.accessRight = accessRight;
        }
        const modules = this.moduleService.getModuleByName('Announcement');
        if (modules) {
            this.modules = modules;
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
        this.router.navigate(['/apps/sfa/announcement/announcement-add']);
    }
    
    goToDetailPage(rowId:any)
    {
        this.router.navigate(['/apps/sfa/announcement/announcement-detail' , rowId]);
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
        this.api.post({ filters: this.filter, activeTab: this.activeTab, page: this.pagination.cur_page ?? 1}, 'announcement/read').subscribe(result => {
            if(result['statusCode'] == 200){
                this.skLoading = false;
                this.listing = result['data']['result'];
                this.listingCount = result['data']['tabCount'];
                this.pagination = result['pagination'];
                
                this.mainTabs = [
                    { name: 'Published', label: 'Published', icon: 'ri-check-double-line', count: this.listingCount.published},
                    { name: 'Unpublished', label: 'Unpublished', icon: 'ri-file-forbid-line', count: this.listingCount.unpublished}
                ];
            }
        });
    }
    
    onDeleteRow(rowId: any) {
        this.alert.confirm("Are you sure?")
        .then((result) => {
            if (result.isConfirmed) {
                this.api.patch({ _id: rowId, is_delete: 1}, 'announcement/delete').subscribe(result => {
                    if (result['statusCode']  ===  200) {
                        this.logService.logActivityOnDelete(this.modules.module_id, this.modules.title, 'delete', rowId , 'Announcement');
                        Swal.fire('Deleted!', result.message, 'success');
                        this.getList();
                    }                        
                });
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
    
    openModal(row:any , pageType:string) {
        const dialogRef = this.dialog.open(AnnouncementModalComponent, {
            width: '400px',
            data: {
                'rowData': row,
                'pageType': pageType,
                'modules':this.modules
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            
            if(result === true){
                this.getList();
            }
        });
    }
    
    
    PageHeaders = [
        {label: 'Created At', field: 'Created At'},
        {label: 'Created By', field: 'Created By'},
        {label: 'Title', field: 'Title'},
        {label: 'Login Type', field: 'Login Type'},
        {label: 'Customer Category', field: 'Customer Category'},
        {label: 'State', field: 'State'},
        {label: 'Description', field: 'Description'},
        {label: 'Status', field: 'Status'},
    ];
    
}
