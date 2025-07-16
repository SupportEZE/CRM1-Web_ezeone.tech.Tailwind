import { Component } from '@angular/core';

import { CountUpModule } from 'ngx-countup';
import { SharedModule } from '../../../../../shared/shared.module';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { SpkApexchartsComponent } from '../../../../../../@spk/spk-apexcharts/apexcharts.component';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import { Router } from '@angular/router';
import { ApiService } from '../../../../../core/services/api/api.service';
import { HighlightService } from '../../../../../shared/services/highlight.service';
import { ModuleService } from '../../../../../shared/services/module.service';
import { CURRENCY_SYMBOLS } from '../../../../../utility/constants';
import { DateService } from '../../../../../shared/services/date.service';

@Component({
    selector: 'app-service-invoice-list',
    imports: [SharedModule,SpkReusableTablesComponent,SpkApexchartsComponent,CountUpModule,MaterialModuleModule],
    templateUrl: './service-invoice-list.component.html',
})
export class ServiceInvoiceListComponent {
    CURRENCY_SYMBOLS = CURRENCY_SYMBOLS
    skLoading:boolean = false;
    topCountLoading: boolean = false;
    listing:any =[];
    pagination: any = {};
    filter:any ={};
    pageKey = 'invoice-list';
    activeTab: string = 'Paid';
    highlightedId: string | undefined;
    accessRight:any = {};
    mainTabs:any=[];
    listingCount:any={};
    constructor(
        public comanFuncation: ComanFuncationService,
        private router: Router,
        private api: ApiService,
        private highlightService: HighlightService,
        private moduleService: ModuleService,
        private dateService: DateService,
    ){}
    
    ngOnInit() {
        const accessRight = this.moduleService.getAccessMap('WCMS', 'Invoice');
        if (accessRight) {
            this.accessRight = accessRight;
        }
        let highlight = this.highlightService.getHighlight(this.pageKey);
        if (highlight != undefined) {
            this.highlightedId = highlight.rowId;
            this.pagination.cur_page = highlight.pageIndex;
            this.filter = highlight.filters
            this.highlightService.clearHighlight(this.pageKey);
        }
        this.getList();
    }
    
    onRefresh()
    {
        this.getList();
    }
    
    onTabChange(tab: string) {
        this.activeTab = tab;
        this.getList();
    }
    
    goToAddPage()
    {
        this.router.navigate(['/apps/service/service-invoice/invoice-add']);
    }
    
    goToDetail(rowId:any) {
        this.setHighLight(rowId);
        this.router.navigate(['/apps/service/service-invoice/invoice-detail', rowId]);
    }
    
    getList() {
        this.skLoading = true;
        this.topCountLoading = true;
        this.api.post({ 'page': this.pagination.cur_page ?? 1, 'filters':this.filter, activeTab : this.activeTab }, 'complaint-invoice/read').subscribe(result => {
            if (result['statusCode'] === 200) {
                this.listing = result['data'] || [];
                // this.listingCount = result['data']['activeTab'];
                // this.mainTabs = [
                //     { name: 'Paid', label: 'Paid', count: this.listingCount.paid_count ? this.listingCount.paid_count : 0},
                //     { name: 'Unpaid', label: 'Unpaid', count: this.listingCount.unpaid_count ? this.listingCount.unpaid_count : 0},
                //     { name: 'Cancel', label: 'Cancel', count: this.listingCount.cancel_count ? this.listingCount.cancel_count : 0}
                // ];
                for (let i = 0; i < this.listing.length; i++) {
                    const list = this.listing[i];
                    if (list.invoice_date) {
                        list.invoice_date = this.dateService.formatToYYYYMMDD(new Date(list.invoice_date));
                    }
                }
                this.pagination = result['pagination'];
                this.skLoading = false;
                this.topCountLoading = false;
            }
            else{
                this.skLoading = false
            }
        });
    }
    
    changeToPagination(btnType: string) {
        if (btnType == 'Previous') {
            if (this.pagination.prev && this.pagination.cur_page > 1) {
                this.pagination.cur_page--;  // Decrement the page number
                this.getList();
            }
        }
        else {
            if (this.pagination.next) {
                this.pagination.cur_page++;  // Increment the page number
                this.getList();
            }
        }
    }
    
    changeToPage(newPage: number) {
        this.pagination.cur_page = newPage;
        this.getList();
    }
    
    isHighlighted(id: string): boolean {
        return this.highlightedId === id;
    }    
    
    setHighLight(rowId: string) {
        this.comanFuncation.setHighLight(this.pageKey, rowId, '', this.filter, this.pagination.cur_page ? this.pagination.cur_page : 1)
    }
    
    
    chartOptions:any= {
        series: [{
            name: 'Total Invoices',
            data: [56, 55, 25, 65, 89, 45, 65, 56, 78, 45, 56, 48],
        }, {
            name: 'Paid Invoices',
            data: [56, 89, 45, 48, 44, 35, 48, 56, 89, 46, 75, 42],
        }, {
            name: 'Pending Invoices',
            data: [75, 86, 35, 24, 68, 57, 94, 95, 78, 48, 68, 99],
        }, {
            name: 'Overdue Invoices',
            data: [89, 44, 62, 77, 24, 65, 48, 39, 47, 46, 57, 88],
        }],
        chart: {
            type: "bar",
            height: 263,
            stacked: true,
            toolbar: {
                show: false,
            }
        },
        plotOptions: {
            bar: {
                columnWidth: '25%',
                borderRadius: 1,
            }
        },
        grid: {
            show: false,
            borderColor: '#f2f6f7',
        },
        dataLabels: {
            enabled: false,
        },
        colors: ["rgba(255, 142, 111, 1)", "rgba(255, 93, 159, 1)", "rgba(227, 84, 212, 1)", "rgba(var(--primary-rgb))"],
        stroke: {
            width: 0,
        },
        legend: {
            show: true,
            position: 'top',
            horizontalAlign: 'center',
            markers: {
                size: 4,
                shape: undefined,
                border:'none',
                strokeWidth: 0
            },
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'sep', 'oct', 'nov', 'dec'],
            labels: {
                show: true,
                style: {
                    colors: "#8c9097",
                    fontSize: "11px",
                    fontWeight: 500,
                    cssClass: "apexcharts-xaxis-label",
                },
            },
        },
        yaxis: {
            title: {
                style: {
                    color: "#8c9097",
                },
            },
            labels: {
                show: true,
                style: {
                    colors: "#8c9097",
                    fontSize: "11px",
                    fontWeight: 500,
                    cssClass: "apexcharts-xaxis-label",
                },
            },
        }, 
    };
    
    invoiceColumn=[
        {label:"Invoice Date"},
        {label: "Created By" },
        {label:"Invoice Id"},
        {label:"Complaint Type"},
        {label:"Customer Detail"},
        // {label:"Billing To Detail"},
        {label:"Total Item", table_class:'text-center'},
        {label:"Total Qty", table_class:'text-center'},
        {label:"Amount", table_class:'text-right'},
        // {label:"Payment Received", table_class:'text-right'},
        // {label:"Balance Amount", table_class:'text-right'},
        {label:"Status"},
    ]
}
