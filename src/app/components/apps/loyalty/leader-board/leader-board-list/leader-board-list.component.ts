import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ShowcodeCardComponent } from '../../../../../shared/components/showcode-card/showcode-card.component';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../../../core/services/api/api.service';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import { ModuleService } from '../../../../../shared/services/module.service';
import { SweetAlertService } from '../../../../../core/services/alert/sweet-alert.service';
import { DateService } from '../../../../../shared/services/date.service';
import { SpkApexchartsComponent } from '../../../../../../@spk/spk-apexcharts/apexcharts.component';
import { LogModalComponent } from '../../../log-modal/log-modal.component';
import { FORMIDCONFIG } from '../../../../../../config/formId.config';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { LogService } from '../../../../../core/services/log/log.service';
import Swal from 'sweetalert2';
import { HighlightService } from '../../../../../shared/services/highlight.service';

@Component({
    selector: 'app-call-request',
    imports: [SharedModule,CommonModule,SpkReusableTablesComponent,MaterialModuleModule,FormsModule],
    templateUrl: './leader-board-list.component.html',
})
export class leaderBoardListComponent {
    FORMID:any= FORMIDCONFIG;
    skLoading:boolean = false
    activeTab: any ='Running';
    pagination:any={};
    listing:any=[];
    filter: any = {};
    mainTabs:any=[];
    submodule:any={};
    pageKey = 'leaderboard-list';
    highlightedId: string | undefined;
    accessRight:any = {};

    constructor(public dialog: MatDialog, public api: ApiService, public comanFuncation: ComanFuncationService, public moduleService: ModuleService, public alert: SweetAlertService, public dateService: DateService, private router: Router, private logService: LogService, private highlightService:HighlightService){}
    
    
    ngOnInit() {
        const accessRight = this.moduleService.getAccessMap('IRP', 'Leader Board');
        if (accessRight) {
            this.accessRight = accessRight;
        }

        const subModule = this.moduleService.getSubModuleByName('IRP', 'Leader Board');
        if (subModule) {
            this.submodule = subModule;
        }
        let highlight = this.highlightService.getHighlight(this.pageKey);
        if (highlight != undefined) {
            this.activeTab = highlight.tab;
            this.highlightedId = highlight.rowId;
            this.pagination.cur_page = highlight.pageIndex;
            this.filter = highlight.filters
            this.highlightService.clearHighlight(this.pageKey);
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
        this.router.navigate(['/apps/loyalty/leader-board/leader-board-add']);
    }
    
    goToDetailPage(rowId:any)
    {
        this.setHighLight(rowId)
        this.router.navigate(['/apps/loyalty/leader-board/leader-board-detail' , rowId]);
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
        this.api.post({filters : this.filter , activeTab : this.activeTab}, 'leader-board/read').subscribe(result => {
            if(result['statusCode'] == 200){
                this.skLoading = false;
                this.listing = result['data'];
                this.pagination = result['pagination'];

                for (let i = 0; i < this.listing.length; i++) {
                    const list = this.listing[i];
                    list.isChecked = list.status === 'Active';

                }
                
                this.mainTabs = [
                    { name: 'Running', label: 'Running', icon: 'ri-run-line'},
                    { name: 'Expired', label: 'Expired', icon: 'ri-pass-expired-line'}
                ];
            }
        });
    }
    
    // delete funcation start //
    delete(id: string, api:string, label:string) {
        this.comanFuncation.delete(id, this.submodule, label, api, 'single_action' , id).subscribe((result: boolean) => {
            if (result === true) {
                this.getList();
            }
        });
    }
    // delete funcation end
    
    openMainLogModal(rowId:string) {
        this.comanFuncation.listLogsModal(this.submodule.module_id , rowId, this.submodule.module_type ).subscribe(result => {
            if(result === true){
                this.getList();
            }
        });
    }
    
    
    PageHeaders = [
        {label: 'Created At', table_class: ''},
        {label: 'Created By', table_class: ''},
        {label: 'Title', table_class: ''},
        {label: 'Start Date', table_class: ''},
        {label: 'End Date', table_class: ''},
        {label: 'Customer Category', table_class: ''},
        {label: 'State', table_class: ''},
        {label: 'Point Category Type', table_class: ''},
        {label: 'Total Gift', table_class: 'text-center'},
        {label: 'Status', table_class: ''},
    ];


    isHighlighted(id: string): boolean {
        return this.highlightedId === id;
    }

    setHighLight(rowId: string) {
        this.comanFuncation.setHighLight(this.pageKey, rowId, this.activeTab, this.filter, this.pagination.cur_page ? this.pagination.cur_page : 1)
    }

    // ******status change funcation start*****//
    onToggleChange(newState: boolean, id: string, status: string) {
        this.comanFuncation.statusChange(newState, id, status, this.submodule, 'toggle', 'leader-board/update-status').subscribe((result: boolean) => {
            if (result) {
                this.getList();
            } else {
                this.getList();
            }
        });
    }
    // ******status change funcation end*****//
}