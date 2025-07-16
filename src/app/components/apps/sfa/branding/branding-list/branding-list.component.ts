import { Component } from '@angular/core';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../../shared/shared.module';
import { ShowcodeCardComponent } from '../../../../../shared/components/showcode-card/showcode-card.component';
import { SpkApexchartsComponent } from '../../../../../../@spk/spk-apexcharts/apexcharts.component';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { BrandingModalComponent } from '../branding-modal/branding-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ModuleService } from '../../../../../shared/services/module.service';
import { ApiService } from '../../../../../core/services/api/api.service';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';


@Component({
    selector: 'app-branding-list',
    imports: [SharedModule,CommonModule,ShowcodeCardComponent,SpkApexchartsComponent,SpkReusableTablesComponent,MaterialModuleModule],
    templateUrl: './branding-list.component.html',
})
export class BrandingListComponent {
    skLoading:boolean = false
    skLoading1:boolean = false
    pagination:any={};
    paginationListing:any={};
    filter: any = {};
    mainTabs:any=[];
    DetailId:  any;
    subModule:any={};
    listingCount:any={};
    listing:any=[];
    auditlisting:any=[];
    activeTab: string = 'All';
    accessRight:any = {};
    
    statusOptions = [
        {
            name:'Approved'
        },
        {
            name:'Reject'
        },
        {
            name:'Complete'
        },
        
    ]
    constructor(
        public dialog:MatDialog,
        private router: Router,
        public route: ActivatedRoute,
        public moduleService: ModuleService,
        public api: ApiService,
        public comanFuncation: ComanFuncationService
    ){}
    
    ngOnInit() {
        const accessRight = this.moduleService.getAccessMap('SFA', 'Branding');
        if (accessRight) {
            this.accessRight = accessRight;
        }
        const subModule = this.moduleService.getSubModuleByName('SFA', 'Branding');
        if (subModule) {
            this.subModule = subModule;
        }
        this.route.paramMap.subscribe(params => {
            this.DetailId = params.get('id');
        });
        this.getList();
        this.getAuditList();
    }
    
    onRefresh()
    {
        this.filter = {};
        this.getList();
    }
    
    onAuditRefresh()
    {
        this.filter = {};
        this.getAuditList();
    }
    
    goToDetailPage(rowId:any)
    {
        this.router.navigate(['/apps/sfa/branding/branding-detail' , rowId]);
    }
    
    goToAuditDetailPage(rowId:any)
    {
        this.router.navigate(['/apps/sfa/branding/audit-detail' , rowId]);
    }
    
    getList(){
        this.skLoading = true;
        this.api.post({filters : this.filter, activeTab : this.activeTab, page: this.pagination.cur_page ?? 1}, 'brand-audit/read').subscribe(result => {
            if(result['statusCode'] == 200){
                this.skLoading = false;
                this.listing = result['data']['result'];
                this.listingCount = result['data']['status_counts'];
                this.pagination = result['pagination'];
            }
        });
    }
    
    getAuditList(){
        this.skLoading1 = true;
        this.api.post({filters : this.filter, activeTab : this.activeTab, page: this.paginationListing.cur_page ?? 1}, 'brand-audit/read-brand-audit').subscribe(result => {
            if(result['statusCode'] == 200){
                this.skLoading1 = false;
                this.auditlisting = result['data'];
                this.paginationListing = result['pagination'];
            }
        });
    }
    
    openModal(formType:string)
    {
        const dialogRef = this.dialog.open(BrandingModalComponent, {
            width: formType === 'view' ? '400px' : '700px',
            data: {
                'formType': formType,
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result === true){
            }
        });
    }
    
    chartOptions:any={
        series: [
            {
                name: 'Request',
                type: 'line',
                data: [47, 43, 55, 55, 41, 41, 53, 42, 47, 41, 50, 35]
            },
            {
                name: 'Audit',
                type: 'area',
                data: [35, 60, 41, 57, 52, 63, 41, 41, 65, 65, 53, 57]
            },
        ],
        chart: {
            toolbar: {
                show: false
            },
            zoom:{
                enabled:false
            },
            type: 'line',
            height: 275,
            dropShadow: {
                enabled: true,
                enabledOnSeries: undefined,
                top: 7,
                left: 0,
                blur: 1,
                color: ["rgba(var(--primary-rgb))",  'rgb(227, 84, 212)'],
                opacity: 0.05,
            },
        },
        grid: {
            borderColor: '#f1f1f1',
            strokeDashArray: 3
        },
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: [1.5, 2],
            curve: ['smooth', 'smooth'],
            dashArray: [0, 5],
        },
        fill: {
            type: ['soild', 'gradient'],
            gradient:{
                opacityFrom: 0.23,
                opacityTo: 0.23,
                shadeIntensity: 0.3,
            },
        },
        legend: {
            show: false,
            position: 'top',
        },
        xaxis: {
            axisBorder: {
                color: '#e9e9e9',
            },
        },
        plotOptions: {
            bar: {
                columnWidth: "20%",
                borderRadius: 2
            }
        },
        colors: ["rgba(var(--primary-rgb))", "rgb(227, 84, 212)"],
    }
    
    headers=[
        {label: "Sr. No."},
        {label:"Request Id"},
        {label:"Request By"},
        {label:"Customer Detail"},
        {label:"Item Details"},
        {label:"Remark"},
        {label:"Status"},
    ]
    
    goToAddPage()
    {
        this.router.navigate(['/apps/sfa/branding/branding-add']);
    }
    
    goToAuditPage()
    {
        this.router.navigate(['/apps/sfa/branding/audit-add']);
    }
    
    openMainLogModal(rowId:string) {
        this.comanFuncation.listLogsModal(this.subModule.module_id , rowId, this.subModule.module_type ).subscribe(result => {
            if(result === true){
                this.getList();
            }
        });
    }
    
    statusChange(rowId:any) {
        const dialogRef = this.dialog.open(BrandingModalComponent, {
            width: '400px',
            data: {
                'lastPage':'branding-list',
                'DetailId':rowId,
                'options':this.statusOptions,
                'subModule':this.subModule,
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result === true){
                this.getList();
            }
        });
    }
    
    // -------- Pagination//
    changeToPage(page: number, type:string) {
        if (type === 'audit_request') {
            this.paginationListing.cur_page = page; 
            this.getAuditList();
        }
        else{
            this.pagination.cur_page = page; 
            this.getList(); // API call with the updated page
        }
    }
    
    changeToPagination(action: string, type:string) {
        if (type === 'audit_request') {
            if (action === 'Next' && this.paginationListing.cur_page < this.paginationListing.total_pages) {
                this.paginationListing.cur_page++;
            } else if (action === 'Previous' && this.paginationListing.cur_page > 1) {
                this.paginationListing.cur_page--;
            }
            this.getAuditList();
        }
        else{
            if (action === 'Next' && this.pagination.cur_page < this.pagination.total_pages) {
                this.pagination.cur_page++;
            } else if (action === 'Previous' && this.pagination.cur_page > 1) {
                this.pagination.cur_page--;
            }
            this.getList(); 
        }
    }
    // -------- Pagination//
}
