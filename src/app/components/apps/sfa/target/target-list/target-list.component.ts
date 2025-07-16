import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { Router } from '@angular/router';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { ApiService } from '../../../../../core/services/api/api.service';
import { SweetAlertService } from '../../../../../core/services/alert/sweet-alert.service';
import { ModuleService } from '../../../../../shared/services/module.service';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import { CURRENCY_SYMBOLS } from '../../../../../utility/constants';
@Component({
    selector: 'app-target-list',
    imports: [CommonModule, SharedModule,SpkReusableTablesComponent, MaterialModuleModule,],
    templateUrl: './target-list.component.html',
})
export class TargetListComponent {
    skLoading:boolean = false
    listPagination:any={};
    filter: any = {};
    listing:any=[];
    subModule:any={};
    CURRENCY_SYMBOLS = CURRENCY_SYMBOLS
    accessRight:any = {};
    constructor(private router: Router, public api: ApiService, public moduleService: ModuleService,public alert : SweetAlertService,public comanFuncation:ComanFuncationService){}
    
    
    
    ngOnInit() {
        const accessRight = this.moduleService.getAccessMap('SFA', 'Target');
        if (accessRight) {
            this.accessRight = accessRight;
        }
        const subModule = this.moduleService.getSubModuleByName('SFA', 'Target');
        if (subModule) {
            this.subModule = subModule;
        }
        this.getList();
    }
    
    
    onRefresh()
    {
        this.filter = {};
        this.getList();
    }
    
    
    
    // -------- Pagination//
    
    changeToPage(page: number) {
        this.listPagination.cur_page = page; 
        this.getList(); // API call with the updated page
    }
    
    changeToPagination(action: string) {
        if (action === 'Next' && this.listPagination.cur_page < this.listPagination.total_pages) {
            this.listPagination.cur_page++;
        } else if (action === 'Previous' && this.listPagination.cur_page > 1) {
            this.listPagination.cur_page--;
        }
        this.getList(); 
    }
    // -------- Pagination//
    
    getList(){
        this.skLoading = true;
        this.api.post({filters : this.filter}, 'target/read').subscribe(result => {
            if(result['statusCode'] == 200){
                this.skLoading = false;
                this.listing = result['data'];
                this.listPagination = result['pagination'];
            }
        });
    }
    
    // delete funcation start //
    delete(id: string, api:string, label:string) {
        this.comanFuncation.delete(id, this.subModule, label, api, 'single_action', id).subscribe((result: boolean) => {
            if (result === true) {
                this.getList();
            }
        });
    }
    // delete funcation end

    openMainLogModal(rowId:string) {
        this.comanFuncation.listLogsModal(this.subModule.module_id , rowId, this.subModule.module_type ).subscribe(result => {
            if(result === true){
                this.getList();
            }
        });
    }
    
    goToAddPage()
    {
        this.router.navigate(['/apps/sfa/target/target-add']);
    }
    
    goToDetailPage(rowId:any)
    {
        this.router.navigate(['/apps/sfa/target/target-detail' , rowId]);
    }
    
    PageHeaders = [
        {label: 'Created At'},
        {label: 'Created By'},
        {label: 'Title'},
        {label: 'Target For'},
        {label: 'Start Date'},
        {label: 'End Date'},
        {label: 'Target Value'},
        {label: 'Additional Target'},
    ];
}
