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
import { FormsModule } from '@angular/forms';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { CallRequestModalComponent } from '../call-request-modal/call-request-modal.component';

@Component({
    selector: 'app-call-request',
    imports: [SharedModule,CommonModule,ShowcodeCardComponent,SpkReusableTablesComponent,SpkApexchartsComponent,MaterialModuleModule,FormsModule],
    templateUrl: './call-request.component.html',
})
export class CallRequestComponent {
    skLoading:boolean = false
    skLoadingLeft:boolean = false
    activeTab: string = 'Review Pending';
    listPagination:any={};
    listing:any=[];
    filter: any = {};
    listingData:any={};
    page: number = 1;
    modules:any={};
    mainTabs:any = [];
    priority:any = [];
    chartOptions1 = {}
    chartOptions2 = {}
    stateData:any = [];
    statusData:any = [];
    subStatusData:any = [];
    sixMonthGraph:any = [];
    
    constructor(public dialog:MatDialog,public api: ApiService,public comanFuncation: ComanFuncationService,public moduleService: ModuleService,public alert : SweetAlertService,public dateService:DateService){}
    
    ngOnInit() {
        const modules = this.moduleService.getModuleByName('Call Request');
        if (modules) {
            this.modules = modules;
        }
        
        this.getReadGraph()
    }
    
    onRefresh()
    {
        this.filter = {};
        this.stateData.forEach((location: any) => location.checked = false);
        this.getReadGraph();
    }
    
    setActiveTab(tab:string) {
        this.activeTab = tab;
        this.filter = {};
        this.stateData.forEach((location: any) => location.checked = false);
        this.getList();
    }
    
    getFilters(substatus:string)
    {
        if(this.activeTab === 'Completed'){
            this.filter.sub_status = substatus;
            this.getList();
        }
    }
    
    toggleStateSelection(location: any) {
        location.checked = !location.checked; // Toggle checked state
        const selectedStates = this.stateData
        .filter((loc: any) => loc.checked) // Get checked locations
        .map((loc: any) => loc.state); // Extract state names
        this.filter.state = selectedStates.length ? selectedStates : null;
        this.getList();
    }
    
    
    onDateChange(type: 'start' | 'end', key_name:any, event: any) {
        if (type === 'start') {
            this.filter.start_date = event;
        } else {
            this.filter.end_date = event;
        }
        this.dateService.adjustDateRange(this.filter, key_name);
        if (this.filter.start_date && this.filter.end_date) {
            this.getList();
        }
        
    }
    
    
    getList(){
        this.skLoading = true;
        if (this.filter.start_date && this.filter.end_date) {
            this.filter.created_at = {
                start: this.filter.start_date,
                end: this.filter.end_date
            };
        }
        
        const payload = { ...this.filter };
        delete payload.start_date;
        delete payload.end_date;
        
        
        this.api.post({ filters: payload , page:this.page, activeTab : this.activeTab}, 'call-request/read').subscribe(result => {
            if(result['statusCode'] == 200){
                this.skLoading = false;
                this.listingData = result['data'];
                this.listing = result['data'];
                this.listPagination = result['pagination'];
                this.updateChartData();
            }
        });
    }
    
    getReadGraph(){
        this.skLoadingLeft = true;
        this.api.post({filters : this.filter}, 'call-request/read-graph').subscribe(result => {
            if(result['statusCode'] == 200){
                this.skLoadingLeft = false;
                this.statusData = result['data']['status'];
                this.subStatusData = result['data']['sub_status'];
                this.stateData = result['data']['state_data'];
                this.getList();
                this.getSixMonthGraph();
                
                let totalCount = this.statusData.reduce((sum: any, item: { count: any; }) => sum + item.count, 0);
                
                this.mainTabs = [
                    // { label: "Total", value: "Total", icon: "ri-list-check", countClass: 'primary', count: totalCount },
                    { label: "Review Pending", value: "Review Pending", icon: "ri-hourglass-fill", countClass: 'warning', count: this.getCount('status', "Review Pending") },
                    { label: "Completed", value: "Completed", icon: "ri-checkbox-circle-fill", countClass: 'success', count: this.getCount('status', "Completed") },
                    { label: "Technical Team", value: "Technical Team", icon: "ri-tools-fill", countClass: 'info', count: this.getCount('status', "Technical Team") }
                ];
                
                this.priority = [
                    { label: "Junk Call", icon: "ri-spam-2-fill", colorClass: "text-danger", count: this.getCount('sub_status', "Junk Call") }, 
                    { label: "Training Issue", icon: "ri-graduation-cap-fill", colorClass: "text-warning", count: this.getCount('sub_status', "Training Issue") }, 
                    { label: "Technical Issue", icon: "ri-tools-fill", colorClass: "text-info", count: this.getCount('sub_status', "Technical Issue") } 
                ];
            }
        });
    }
    
    getCount(type:string, value: string) {
        const data = type === 'status' ? this.statusData : this.subStatusData;
        return (data || []).find((item: any) => item[type] === value)?.count || 0;
    }
    
    getSixMonthGraph(){
        this.skLoading = true;
        this.api.post({}, 'call-request/read-graph-month').subscribe(result => {
            if(result['statusCode'] == 200){
                this.skLoading = false;
                this.sixMonthGraph = result['data']['result'];
                
                this.updateGraphData();
            }
        });
    }
    
    openModal(row:any , pageType:string) {
        const dialogRef = this.dialog.open(CallRequestModalComponent, {
            width: '400px',
            data: {
                'rowData': row,
                'pageType': pageType,
                'modules':this.modules
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result === true){
                this.getReadGraph();
            }
        });
    }
    
    openListLogModal(rowId:string) {
        this.comanFuncation.listLogsModal(this.modules.module_id , rowId, this.modules.module_type ).subscribe(result => {
            if(result === true){
                this.getReadGraph();
            }
        });
    }
    
    PageHeaders = [
        {label: 'Created At', table_class :""},
        {label: 'Created By', table_class: ''},
        {label: 'Customer Category', table_class :""},
        {label: 'Customer Name', table_class :""},
        {label: 'Customer No.', table_class :"text-center"},
        {label: 'State', table_class :""},
        {label: 'Status', table_class :""},
        {label: 'Sub Status', table_class :""},
        { label: 'Close Date', table_class: "" },
        {label: 'Tat', table_class :"text-center"},
    ];
    
    
    updateChartData() {
        const filteredTabs = this.mainTabs.filter((tab:any) => tab.label !== "Total");
        this.chartOptions1 = {
            series: filteredTabs.map((tab:any) => tab.count), // Extract counts dynamically
            labels: filteredTabs.map((tab:any) => tab.label), // Extract labels dynamically
            chart: {
                height: 175,
                type: 'donut',
            },
            dataLabels: {
                enabled: false,
            },
            
            legend: {
                show: true,
                position: 'bottom',
                horizontalAlign: 'center',
                markers: {
                    size: 4,
                    shape: undefined,
                    border:'none',
                    strokeWidth: 0
                },
                offsetY: 20,
            },
            stroke: {
                show: true,
                curve: 'smooth',
                lineCap: 'round',
                colors: "#fff",
                width: 0,
                dashArray: 0,
            },
            plotOptions: {
                pie: {
                    startAngle: -90,
                    endAngle: 90,
                    offsetY: 10,
                    expandOnClick: false,
                    donut: {
                        size: '80%',
                        background: 'transparent',
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                fontSize: '20px',
                                color: '#495057',
                                offsetY: -25
                            },
                            value: {
                                show: true,
                                fontSize: '15px',
                                color: undefined,
                                offsetY: -20,
                                // formatter: function (val: string) {
                                //   return val + "%"
                                // }
                            },
                            total: {
                                show: true,
                                showAlways: true,
                                label: 'Total',
                                fontSize: '22px',
                                fontWeight: 600,
                                color: '#495057',
                            }
                            
                        }
                    }
                }
            },
            grid: {
                padding: {
                    bottom: -100
                }
            },
            colors: ["rgba(var(--primary-rgb))", "rgba(227, 84, 212, 1)", "rgba(255, 93, 159, 1)", "rgba(255, 142, 111, 1)"],
        };
    }
    
    updateGraphData() {
        const labels = this.sixMonthGraph.month; 
        
        const series = this.sixMonthGraph.series.map((item: any) => ({
            name: item.name || "Unknown", // Handle empty names
            type: item.type,
            data: item.data
        }));
        
        this.chartOptions2 = {
            
            series: series,
            chart: {
                width:"100%",
                height: 268,
                type: 'bar',
                stacked: {
                    enabled: true,
                },
                toolbar: {
                    show: false,
                },
                zoom:{
                    enabled:false
                }
            },
            grid: {
                borderColor: '#f1f1f1',
                strokeDashArray: 3
            },
            legend: {
                show: true,
                position: 'bottom',
                horizontalAlign: 'center',
                markers: {
                    shape: "circle",
                    size: 4,
                    strokeWidth: 0
                },
            },
            stroke: {
                curve: 'smooth',
                width: [0],
            },
            dataLabels:{
                enabled:false
            },
            plotOptions: {
                bar: {
                    columnWidth: "30%",
                    borderRadius: [3],
                    borderRadiusWhenStacked: "all",
                }
            },
            colors: ["rgba(var(--primary-rgb))", "rgba(227, 84, 212, 1)", "rgba(255, 142, 111, 1)"],
            labels: labels,
            // labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
            tooltip: {
                shared: true,
                intersect: false,
            },
        }
    }
}