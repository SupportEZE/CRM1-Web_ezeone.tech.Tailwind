import { Component } from '@angular/core';
import { SpkDropdownsComponent } from '../../../../../../@spk/reusable-ui-elements/spk-dropdowns/spk-dropdowns.component';
import { SpkApexchartsComponent } from '../../../../../../@spk/spk-apexcharts/apexcharts.component';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from '../../../../../shared/shared.module';
import { ModuleService } from '../../../../../shared/services/module.service';
import { ApiService } from '../../../../../core/services/api/api.service';
import { CURRENCY_SYMBOLS } from '../../../../../utility/constants';
import { SweetAlertService } from '../../../../../core/services/alert/sweet-alert.service';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import Swal from 'sweetalert2';
import { LogService } from '../../../../../core/services/log/log.service';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { DateService } from '../../../../../shared/services/date.service';

@Component({
  selector: 'app-quotation-list',
  imports: [
    SharedModule,
    RouterModule,
    SpkReusableTablesComponent,
    SpkApexchartsComponent,
    MaterialModuleModule
  ],
  templateUrl: './quotation-list.component.html',
})
export class QuotationListComponent {
  CURRENCY_SYMBOLS = CURRENCY_SYMBOLS;
  listing:any=[];
  skLoading:boolean = false;
  topCountLoading: boolean = false;
  activeTab: string = 'Pending';
  listPagination:any={};
  filter: any = {};
  mainTabs:any=[];
  modules:any={};
  listingCount:any={};
  dataCount:any=[];
  page: number = 1;
  submodule:any={};
  accessRight:any = {};
  
  constructor(
    public api:ApiService,
    public alert : SweetAlertService,
    private router: Router,
    private moduleService: ModuleService,
    public comanFuncation: ComanFuncationService,  
    private logService : LogService,
    private dateService: DateService,
  ){
    
  }
  
  ngOnInit() {
    const accessRight = this.moduleService.getAccessMap('SFA', 'Quotation');
    if (accessRight) {
      this.accessRight = accessRight;
    }
    
    const subModule = this.moduleService.getSubModuleByName('SFA', 'Quotation');
    if (subModule) {
      this.modules = subModule;
    }
    this.getQuotationList();
    this.getQuotationCount()
  }
  
  onRefresh()
  {
    this.filter = {};
    this.getQuotationList();
  }
  
  onTabChange(tab: string) {
    this.activeTab = tab;
    this.getQuotationList();
  }
  
  onDateChange(type: 'created_at',event: any) {
    if (event) {
      const formattedDate = this.dateService.formatToYYYYMMDD(event); // Convert date to YYYY-MM-DD
      this.filter[type] = formattedDate;
    } else {
      this.filter[type] = null; // Reset the value if cleared
    }
    if ((this.filter.created_at)) {
      this.getQuotationList();
    }
  }
  
  chartOptions:any= {
    series: [{
      name: 'Total',
      data: [56, 55, 25, 65, 89, 45, 65, 56, 78, 45, 56, 48],
    }, {
      name: 'Negotiation',
      data: [56, 89, 45, 48, 44, 35, 48, 56, 89, 46, 75, 42],
    }, {
      name: 'Win',
      data: [75, 86, 35, 24, 68, 57, 94, 95, 78, 48, 68, 99],
    }, {
      name: 'Lost',
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
    {label:"Sr. No.", table_class:"text-center"},
    {label:"Created At" ,table_class:""},
    {label:"Created By", table_class:""},
    {label:"Quote Id", table_class:"text-center"},
    {label:"Quotation Type", table_class:""},
    {label:"Customer Type", table_class:""},
    {label:"Customer Detail", table_class:""},
    {label:"Item Qty", table_class:"text-center"},
    {label:"Total Item", table_class:"text-center"},
    {label:"Amount", table_class:"text-right"},
    {label:"Action", table_class:"text-center"},
  ]
  
  addQuotation() {
    this.router.navigate(['/apps/sfa/quotation-list/quotation-add']);
  }
  
  quotationDetail(rowId:any) {
    this.router.navigate(['/apps/sfa/quotation-list/quotation-detail' , rowId]);
  }
  
  getQuotationList(){
    this.skLoading = true;
    this.topCountLoading = true;
    this.api.post({filters : this.filter , activeTab : this.activeTab}, 'quotation/read').subscribe(result => {
      if(result['statusCode'] == 200){
        this.skLoading = false;
        this.topCountLoading = true;
        this.listing = result['data']['result'];
        this.listingCount = result['data']['activeTab'];
        this.listPagination = result['pagination'];
        this.mainTabs = [
          { name: 'Pending', label: 'Pending', count: this.listingCount.pending_count ? this.listingCount.pending_count : 0},
          { name: 'Approved', label: 'Approved', count: this.listingCount.approved_count ? this.listingCount.approved_count : 0},
          { name: 'Reject', label: 'Reject', count: this.listingCount.reject_count ? this.listingCount.reject_count : 0}
        ];
        for (let i = 0; i < this.listing.length; i++) {
          const list = this.listing[i];
          if (list.created_at) {
            list.created_at = this.dateService.formatToYYYYMMDD(new Date(list.created_at));
          }
        }
      }
    });
  }
  
  getQuotationCount(){
    this.skLoading = true;
    this.topCountLoading = true;
    this.api.post({filters : this.filter , activeTab : this.activeTab}, 'quotation/read-count').subscribe(result => {
      if(result['statusCode'] == 200){
        this.skLoading = false;
        this.topCountLoading = false;
        this.dataCount = result['data']
      }
    });
  }
  
  onDeleteRow(rowId: any) {
    this.alert.confirm("Are you sure?")
    .then((result) => {
      if (result.isConfirmed) {
        this.api.patch({ _id: rowId, is_delete: 1}, 'quotation/delete').subscribe(result => {
          if (result['statusCode']  ===  200) {
            this.logService.logActivityOnDelete(this.modules.module_id, this.modules.title, 'delete', rowId , 'Quotation', this.modules.module_type);
            Swal.fire('Deleted!', result.message, 'success');
            this.getQuotationList();
          }                        
        });
      }
    });
  }
  
  openMainLogModal(rowId:string) {
    this.comanFuncation.listLogsModal(this.modules.module_id , rowId, this.modules.module_type ).subscribe(result => {
      if(result === true){
        this.getQuotationList();
      }
    });
  }
  
  // openModal(row:any , pageType:string) {
  //   const dialogRef = this.dialog.open(AnnouncementModalComponent, {
  //     width: '400px',
  //     data: {
  //       'rowData': row,
  //       'pageType': pageType,
  //       'modules':this.modules
  //     }
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  
  //     if(result === true){
  //       this.getQuotationList();
  //     }
  //   });
  // }
  
  // -------- Pagination//
  changeToPagination(btnType: string) {
    if (btnType == 'Previous') {
      if (this.listPagination.prev && this.page > 1) {
        this.page--;  // Decrement the page number
        this.getQuotationList();
      }
    }
    else
    {
      if (this.listPagination.next) {
        this.page++;  // Increment the page number
        this.getQuotationList();
      }
    }
  }
  
  changeToPage(newPage: number) {
    this.page = newPage;
    this.listPagination.cur_page = newPage;
    this.getQuotationList();
  }
  // --------//
}
