import { Component, Input } from '@angular/core';
import { SpkApexchartsComponent } from '../../../../../../../@spk/spk-apexcharts/apexcharts.component';
import { SpkReusableTablesComponent } from '../../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from '../../../../../../shared/shared.module';
import { ModuleService } from '../../../../../../shared/services/module.service';
import { ApiService } from '../../../../../../core/services/api/api.service';
import { MaterialModuleModule } from '../../../../../../material-module/material-module.module';
import { ComanFuncationService } from '../../../../../../shared/services/comanFuncation.service';
import { HighlightService } from '../../../../../../shared/services/highlight.service';


@Component({
  selector: 'app-invoice-list',
  imports: [
    SharedModule,
    RouterModule,
    SpkReusableTablesComponent,
    SpkApexchartsComponent,
    MaterialModuleModule
    // SpkDropdownsComponent
  ],
  templateUrl: './invoice-list.component.html',
})
export class InvoiceListComponent {
  @Input() pageHeader: boolean = true;
  @Input() _id !: any;
  skLoading:boolean = false;
  listing:any =[]
  pagination: any = {};
  filter:any ={};
  pageKey = 'invoice-list';
  activeTab: any = 'Unpaid';
  highlightedId: string | undefined;
  mainTabs = [
    { name: 'Unpaid', label: 'Unpaid', icon: 'ri-bill-fill'},
    { name: 'All', label: 'All', icon: 'ri-inbox-fill'},
  ];
  
  constructor(
    public comanFuncation: ComanFuncationService,
    private router: Router,
    private api: ApiService,
    private highlightService: HighlightService,
    private moduleService: ModuleService,      
  ){
  }
  
  ngOnInit() {
    let highlight = this.highlightService.getHighlight(this.pageKey);
    if (highlight != undefined) {
      this.highlightedId = highlight.rowId;
      this.pagination.cur_page = highlight.pageIndex;
      this.filter = highlight.filters
      this.highlightService.clearHighlight(this.pageKey);
    }
    this.getUnpaidList();
    this.getinvoiceGraph();
  }
  
  onRefresh()
  {
    
    if(this.activeTab === 'All'){
      this.getList();
    }
    else{
      this.getUnpaidList();
      this.getinvoiceGraph();
    }
  }
  
  goToDetail(id:any) {
    this.setHighLight(id);
    this.router.navigate(['/apps/sfa/accounts/invoice-detail/'+id]);
  }
  
  
  onTabChange(tab: string) {
    this.activeTab = tab;
    if(tab === 'All'){
      this.getList();
    }
    else{
      this.getinvoiceGraph();
      this.getUnpaidList();
    }
  }
  
  
  
  chartOptions1: any;
  chartLoading:boolean = false;
  topCount:any ={};
  topCountLoading: boolean = false;

  
  getinvoiceGraph() {
    this.chartLoading = true;
    this.topCountLoading = true;
    this.api.post({'_id': this._id }, 'invoice/read-graph').subscribe(result => {
        if (result['statusCode'] === 200) {
          this.topCount = result?.data?.totals || {};
          const monthsData = result?.data?.months || [];
          const months = monthsData.map((item: any) => item.month);
          const invoiceData = monthsData.map((item: any) => item.invoice);
          const paymentData = monthsData.map((item: any) => item.payment);
          this.chartOptions1 = {
            series: [{
              name: 'Invoice',
              data: invoiceData,
            }, {
              name: 'Payment',
              data: paymentData,
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
                border: 'none',
                strokeWidth: 0
              },
            },
            xaxis: {
              categories: months,
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
          this.chartLoading = false;
          this.topCountLoading = false;
        }
        else {
          this.chartLoading = false;

        }
    });
    
  }
  
  click(id:string){
    const data = this.listing.filter((x: { Price: string }) => {
      return x.Price != id;
      
    })
    this.listing = data;
    
  }
  
  
  getList() {
    this.skLoading = true
    this.api.post({ 'page': this.pagination.cur_page ?? 1, 'filters': this.filter, '_id': this._id }, 'invoice/read').subscribe(result => {
      if (result['statusCode'] === 200) {
        this.listing = result['data']['result'];
        this.pagination = result['pagination'];
        this.skLoading = false
      }
      else{
        this.skLoading = false
      }
    });
  }
  
  
  bottomCount:any ={};
  bottomLoading: boolean = false;
  
  getUnpaidList() {
    this.skLoading = true;
    this.bottomLoading = true;
    this.api.post({ 'page': this.pagination.cur_page ?? 1, 'filters': this.filter, '_id': this._id }, 'unpaid-invoice/read').subscribe(result => {
      if (result['statusCode'] === 200) {
        this.listing = result?.data?.unpaid_invoices ?? [];
        this.bottomCount = result?.data?.unpaid_invoices_data ?? {};
        this.pagination = result?.pagination ?? {};
        this.skLoading = false;
        this.bottomLoading = false;
        
      }
      else {
        this.skLoading = false;
        this.bottomLoading = false;
      }
    });
  }
  changeToPagination(btnType: string) {
    if (btnType == 'Previous') {
      if (this.pagination.prev && this.pagination.cur_page > 1) {
        this.pagination.cur_page--;  // Decrement the page number
        if (this.activeTab === 'All') {
          this.getList();
        }
        else {
          this.getUnpaidList();
        }
      }
    }
    else {
      if (this.pagination.next) {
        this.pagination.cur_page++;  // Increment the page number
        
        if (this.activeTab === 'All') {
          this.getList();
        }
        else {
          this.getUnpaidList();
        }
      }
    }
  }
  
  changeToPage(newPage: number) {
    this.pagination.cur_page = newPage;
    if (this.activeTab === 'All') {
      this.getList();
    }
    else {
      this.getUnpaidList();
    }
  }
  
  
  isHighlighted(id: string): boolean {
    return this.highlightedId === id;
  }
  
  transform(value: number): string {
    
    if (value == null) return '';
    
    
    if (value >= 100000) {
      return (value / 100000).toFixed(2).replace(/\.00$/, '') + 'L';
    } else if (value >= 1000) {
      return (value / 1000).toFixed(0) + 'k';
    } else {
      return value.toString();
    }
  }
  
  setHighLight(rowId: string) {
    this.comanFuncation.setHighLight(this.pageKey, rowId, '', this.filter, this.pagination.cur_page ? this.pagination.cur_page : 1)
  }
  
  
  chartOptions:any= {
    series: [{
      name: 'Invoice',
      data: [56, 55, 25, 65, 89, 45, 65, 56, 78, 45, 56, 48],
    }, {
      name: 'Payment',
      data: [56, 89, 45, 48, 44, 35, 48, 56, 89, 46, 75, 42],
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
  
  getColumn() {
    
    return [
      { label: "Invoice Date" },
      { label: "Created By" },
      { label: "Invoice Id" },
      { label: "Customer Category" },
      { label: "Customer Detail" },
      { label: "Account Code" },
      
      ...(this.activeTab === 'Unpaid' ? [
        { label: "Total Amount", table_class: 'text-center' },
        { label: "Received Amount", table_class: 'text-center' },
        { label: "Balance", table_class: 'text-right' },
      ] : [{ label: "Total Item", table_class: 'text-center' },
        { label: "Total Qty", table_class: 'text-center' },
        { label: "Amount", table_class: 'text-right' },]),
      ]
    }
  }
  