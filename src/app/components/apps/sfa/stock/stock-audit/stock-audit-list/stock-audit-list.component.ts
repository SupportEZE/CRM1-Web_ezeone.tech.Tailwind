import { Component } from '@angular/core';
import { SharedModule } from '../../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { SpkReusableTablesComponent } from '../../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../../../../core/services/api/api.service';
import { FormsModule } from '@angular/forms';
import { MaterialModuleModule } from '../../../../../../material-module/material-module.module';
import { StockAuditModalComponent } from '../stock-audit-modal/stock-audit-modal.component';
import { ModuleService } from '../../../../../../shared/services/module.service';

@Component({
    selector: 'app-stock-audit-list',
    imports: [SharedModule,CommonModule,SpkReusableTablesComponent,MaterialModuleModule,FormsModule],
    templateUrl: './stock-audit-list.component.html',
})
export class StockAuditListComponent {
    
    skLoading:boolean = false
    listPagination:any={};
    filter: any = {};
    listing:any=[];
    accessRight:any = {};
    constructor(public dialog:MatDialog,public api: ApiService,public moduleService: ModuleService){}
    
    ngOnInit() {
        const accessRight = this.moduleService.getAccessMap('SFA', 'Stock', 'Stock Audit');
        if (accessRight) {
            this.accessRight = accessRight;
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
        this.api.post({filters : this.filter,}, 'stock/read-stock-audit').subscribe(result => {
            if(result['statusCode'] == 200){
                this.skLoading = false;
                this.listing = result['data'];
                this.listPagination = result['pagination'];
            }
        });
    }
    
    openModal(formType:string , formData:any) {
        const dialogRef = this.dialog.open(StockAuditModalComponent, {
            width: formType === 'view' ? '700px' : '800px',
            data: {
                'formType': formType,
                'formData': formData,
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            
            if(result === true){
                this.getList();
            }
        });
    }
    
    PageHeaders = [
        {label: 'Created At'},
        {label: 'Created By'},
        {label: 'Customer Category'},
        {label: 'Audit No.',},
        {label: 'Customer Detail'},
        {label: 'Total Item', table_class : 'text-center'},
        {label: 'Total Qty', table_class : 'text-center'},
    ];
}
