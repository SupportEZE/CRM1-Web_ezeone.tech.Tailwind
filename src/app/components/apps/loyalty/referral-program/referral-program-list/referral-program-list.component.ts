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
import { ReferralProgramAddComponent } from '../referral-program-add/referral-program-add.component';
import { LogService } from '../../../../../core/services/log/log.service';
import Swal from 'sweetalert2';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { FormsModule } from '@angular/forms';
import { HighlightService } from '../../../../../shared/services/highlight.service';
@Component({
    selector: 'app-referral-program',
    imports: [SharedModule,CommonModule,SpkReusableTablesComponent,MaterialModuleModule,FormsModule],
    templateUrl: './referral-program-list.component.html',
})
export class ReferralProgramListComponent {
    FORMID:any= FORMIDCONFIG;
    skLoading:boolean = false
    pagination:any={};
    listing:any=[];
    filter: any = {};
    submodule:any={};
    pageKey = 'spin-win-list';
    highlightedId: string | undefined;
    accessRight:any = {};
    
    constructor(public dialog: MatDialog, public api: ApiService, public comanFuncation: ComanFuncationService, public moduleService: ModuleService, public alert: SweetAlertService, public dateService: DateService, private router: Router, private logService: LogService, private highlightService:HighlightService){}
    
    
    ngOnInit() {
        const accessRight = this.moduleService.getAccessMap('IRP', 'Referral Program');
        if (accessRight) {
            this.accessRight = accessRight;
        }
        const subModule = this.moduleService.getSubModuleByName('IRP', 'Referral Program');
        if (subModule) {
            this.submodule = subModule;
        }
        
        this.getList();
    }
    
    onRefresh()
    {
        this.filter = {};
        this.getList();
    }
    
    
    goToAddPage()
    {
        this.router.navigate(['/apps/referral-program']);
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
    
    isHighlighted(id: string): boolean {
        return this.highlightedId === id;
    }
    
    setHighLight(rowId: string) {
        this.comanFuncation.setHighLight(this.pageKey, rowId, 'none', this.filter, this.pagination.cur_page ? this.pagination.cur_page : 1)
    }
    
    
    getList(){
        this.skLoading = true;
        const page = this.pagination.cur_page;
        this.api.post({filters : this.filter , page}, 'referral-bonus/read').subscribe(result => {
            if(result['statusCode'] == 200){
                this.skLoading = false;
                this.listing = result['data'];
                for (let i = 0; i < this.listing.length; i++) {
                    const list = this.listing[i];
                    list.isChecked = list.status === 'Active';
                }
                
                this.pagination = result['pagination'];
            }
        });
    }
    
    
    // ******status change funcation start*****//
    onToggleChange(newState: boolean, id: string, status: string) {
        this.comanFuncation.statusChange(newState, id, status, this.submodule, 'toggle', 'referral-bonus/update-status').subscribe((result: boolean) => {
            if (result) {
                this.getList();
            } else {
                this.getList();
            }
        });
    }
    // ******status change funcation end*****//
    
    // delete funcation start //
    delete(id: string, api: string, label: string) {
        this.comanFuncation.delete(id, this.submodule, label, api, 'single_action', id).subscribe((result: boolean) => {
            if (result === true) {
                this.getList();
            }
        });
    }
    // Delete Funcation End
    
    openModal(pageType:string , row:any) {
        
        if (pageType === 'edit'){
            this.setHighLight(row._id)
        }
        
        const dialogRef = this.dialog.open(ReferralProgramAddComponent, {
            width: pageType === 'view' ? '450px' : '700px',
            data: {
                'formType': pageType,
                'formData': row || {}  // Pass the row data if it's edit
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result === true){
                let highlight = this.highlightService.getHighlight(this.pageKey);
                if (highlight != undefined) {
                    this.highlightedId = highlight.rowId;
                    this.pagination.cur_page = highlight.pageIndex;
                    this.filter = highlight.filters
                    this.highlightService.clearHighlight(this.pageKey);
                }
                
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
        {label: 'Bonus Type'},
        {label: 'Customer Category'},
        {label: 'Bonus Point', table_class :"text-center"},
        {label: 'Backend Working Flow'},
        {label: 'Transfer Points'},
        {label: 'User Working Flow'},
        {label: 'Status'},
        {label:"Action",table_class:"text-center"},
    ];
}