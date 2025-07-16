import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ShowcodeCardComponent } from '../../../../../shared/components/showcode-card/showcode-card.component';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { TimelineComponent } from '../timeline/timeline.component';
import { AnalyticsComponent } from '../analytics/analytics.component';
import { ApiService } from '../../../../../core/services/api/api.service';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import * as L from 'leaflet';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { DateService } from '../../../../../shared/services/date.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../../../../../shared/components/bottom-sheet/bottom-sheet.component';
import { LOGIN_TYPES } from '../../../../../utility/constants';
import { Router } from '@angular/router';

@Component({
    selector: 'app-checkin-list',
    imports: [MaterialModuleModule,SharedModule, CommonModule, ShowcodeCardComponent, TimelineComponent, AnalyticsComponent,SpkReusableTablesComponent],
    templateUrl: './checkin-list.component.html',
})
export class CheckinListComponent {
    activeTab:any ='Today';
    monthDaysData:any = [];
    monthListColumn:any  = [];
    viewDatepicker: boolean = false
    pagination:any={};
    markerLayer: L.LayerGroup = L.layerGroup();
    LOGIN_TYPES:any;
    selectedMonth:any;
    
    
    
    constructor(public api:ApiService, private router: Router, public commonFunction:ComanFuncationService, public dateService: DateService, private bottomSheet: MatBottomSheet){}
    ngOnInit(): void {
        this.LOGIN_TYPES = LOGIN_TYPES
        this.getActivityFilters();
        this.getDayList();
        
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        this.selectedMonth = `${year}-${month}`;
        this.maxMonth = `${year}-${month}`;
    }
    dateFilter(){
        if (this.activeTab === 'Analytics') {
            this.getAnalytics();
            this.getChartData();
        }else{
            this.getDayList();
        }
    }
    
    onDateChange(type: 'created_at', event: any) {
        if (event) {
            const formattedDate = this.dateService.formatToYYYYMMDD(event); // Convert date to YYYY-MM-DD
            this.filter[type] = formattedDate;
        } else {
            this.filter[type] = null; // Reset the value if cleared
        }
        if (this.filter.created_at) {
            this.getDayList();
        }
    }
    
    onTabChange(tab: string) {
        this.activeTab = tab;
        this.filter = {};
        if (this.activeTab === 'Month') {
            this.getMonthList();
        }else if (this.activeTab === 'Analytics') {
            this.getAnalytics();
            this.getChartData();
        }else{
            this.getDayList();
        }
    }
    
    onRefresh(type: string)
    {
        this.filter = {};
        if(type === 'Today') {
            this.getDayList();
        }
        if(type === 'Month'){
            this.generateMonthDates();
            this.selectedMonth= this.selectedMonth;
            this.getMonthList(this.selectedMonth);
        }
    }
    
    today= new Date();
    monthDate:any =[];
    generateMonthDates() {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const dailyArray = this.monthDate || [];
        this.monthListColumn = [
            { label: 'Employee Name', value: 'Employee Name', "table_class":'sticky-col'},
            { label: 'Employee Code', value: 'Employee Code'},
            { label: 'Reporting Manager', value: 'Reporting Manager'},
            { label: 'Total CheckIn', value: 'Total CheckIn', table_class:"text-center"},
            { label: 'Productive', value: 'Productive', table_class:"text-center"},
            { label: 'New Counter', value: 'New Counter', table_class:"text-center"},
            ...dailyArray.map((item: any) => {
                const dateObj = new Date(item.startDate);
                const day = dateObj.getDate();
                const month = monthNames[dateObj.getMonth()];
                const year = dateObj.getFullYear();
                const formatted = `${day} ${month} ${year}`; // e.g., "1 Jul 2025"
                return {
                    label: formatted,
                    value: formatted,
                };
            })
            // ...Array.from({ length: today }, (_, i) => {
            //     const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1);
            //     const day = date.getDate();
            //     const month = monthNames[date.getMonth()];
            //     const year = date.getFullYear();
            //     const formatted = `${day} ${month} ${year}`;
            //     return {
            //         label: formatted,
            //         value: formatted,
            //     };
            // })
        ];
    }
    
    checkinStatuses = [
        { icon: 'ri-map-pin-fill', color: 'text-info', label: 'Enquiry' },
        { icon: 'ri-map-pin-fill', color: 'text-success', label: 'Primary' },
        { icon: 'ri-map-pin-fill', color: 'text-secondary', label: 'Secondary' },
        { icon: 'ri-map-pin-fill', color: 'text-warning', label: 'Site' },
    ];
    
    PageHeaders = [
        {"label": "Employee Name", "name": "employee_name", "table_class":'sticky-col' },
        {"label": "Employee Code", "name": "employee_code"},
        {"label": "Reporting Manager", "name": "reporting_manager_name" },
        {"label": "Customer Type", "name": "type" },
        {"label": "Company Name", "name": "company_name" },
        {"label": "Check In", "name": "check_in" },
        {"label": "Start Location", "name": "start_location" },
        {"label": "Check Out", "name": "check_out" },
        {"label": "End Location", "name": "end_location" },
        {"label": "Total Time Spend", "name": "total_time_spend" },
        {"label": "Remark", "name": "remark" },
        {"label": "Topic Of Discussion", "name": "check_list" },
        {"label": "Order", "name": "order" },
        {"label": "Enquiry", "name": "enquiry" },
        {"label": "Stock Audit", "name": "stock_audit" },
        {"label": "Photo Gallery", "name": "photo_gallery" },
        {"label": "Follow Up", "name": "follow_up" },
        {"label": "Payment Collection", "name": "payment_collection" },
        {"label": "Branding Audit", "name": "branding_audit" },
        {"label": "Pop Distribution", "name": "pop_distribution" },
        {"label": "Support Ticket", "name": "support_ticket" },
    ];
    
    locations :any= [];
    customers:any = [];
    beats :any= [];
    teamMembers :any= [];
    mainTabs = [
        { name: 'Today', label: 'Today', icon: 'ri-layout-vertical-line' },
        { name: 'Month', label: 'Month', icon: 'ri-calendar-line' }, 
        { name: 'Map View', label: 'Map View', icon: 'ri-map-pin-line' },
        { name: 'Timeline', label: 'Timeline', icon: 'ri-timeline-view' }, 
        { name: 'Analytics', label: 'Analytics', icon: 'ri-bar-chart-line' } 
    ];
    skLoading:boolean = false;
    filter: any = {};
    listingData:any = [];
    locationCount:any = [];
    page: number = 1;
    
    getDayList() {
        this.skLoading = true;
        let reqData :any = {};
        reqData.activeTab = this.activeTab;
        if(this.filter.activity_date){
            this.filter.activity_date = this.dateService.formatToYYYYMMDD(this.filter.activity_date);
            // reqData.activity_date = this.filter.activity_date;
        }
        reqData.filters = this.filter;
        reqData.page = this.page;
        reqData = this.commonFunction.removeBlankKeys(reqData);
        
        this.api.post(reqData, 'activity/read').subscribe(result => {
            if (result['statusCode']  ===  200) {
                this.skLoading = false;
                this.listingData = result?.data?.result ?? [];
                this.locationCount = result?.data?.count_summary ?? [];
                this.pagination = result['pagination'];
                if(this.activeTab == 'Map View'){
                    this.initializeMap();
                }
            }
        },err=>{
            this.skLoading = false
        });
    }
    
    // -------- Pagination//
    
    changeToPage(page: number) {
        this.pagination.cur_page = page; 
        this.getDayList(); // API call with the updated page
    }
    
    changeToPagination(action: string) {
        if (action === 'Next' && this.pagination.cur_page < this.pagination.total_pages) {
            this.pagination.cur_page++;
        } else if (action === 'Previous' && this.pagination.cur_page > 1) {
            this.pagination.cur_page--;
        }
        this.getDayList(); 
    }
    // -------- Pagination//
    
    map: L.Map | undefined;
    initializeMap() {
        
        this.map = L.map('map').setView([28.6139, 77.2090], 12);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
        this.addMarkersToMap();
    }
    
    addMarkersToMap() {
        if (this.map) {
            if (this.markerLayer) {
                this.map.removeLayer(this.markerLayer);
            }
            this.markerLayer = L.layerGroup(); // Reinitialize
            
            
            this.listingData.forEach((item: any) => {
                const lat = parseFloat(item.start_lat);
                const lng = parseFloat(item.start_lng);
                if (!isNaN(lat) && !isNaN(lng)) {
                    let iconName = 'location_on';
                    let color = 'text-secondary';
                    if (item?.customer_details?.login_type_id === LOGIN_TYPES.PRIMARY) {
                        color = 'text-primary';
                    } else if (item?.customer_details?.login_type_id === LOGIN_TYPES.SUB_PRIMARY) {
                        color = 'text-primarytint1color';
                    } else if (item?.customer_details?.login_type_id === LOGIN_TYPES.SECONDARY) {
                        color = 'text-primarytint2color';
                    }
                    else if (item?.customer_details?.login_type_id === LOGIN_TYPES.INFLUENCER) {
                        color = 'text-primarytint3color';
                    }
                    const size = item.zoomLevel >= 15 ? 6 : 3;
                    const customIcon = L.divIcon({
                        html: `<i class="material-icons ${color}" style="font-size: ${size}rem !important;">${iconName}</i>`,
                        iconSize: [size, size],
                        iconAnchor: [size / 2, size],
                        className: '' // disables default styling
                    });
                    
                    const marker = L.marker([lat, lng], { icon: customIcon }).bindPopup(`
                        <b>Customer Name:</b> ${item.customer_details?.customer_name || 'N/A'}<br>
                        <b>Location:</b> ${item?.start_location || 'N/A'}
                        `);
                        this.markerLayer.addLayer(marker);
                    }
                });
                this.markerLayer.addTo(this.map);
            }
        }
        
        maxMonth:any;
        
        monthViewFilter(date:any,user_id:any){
            this.filter.activity_date = date
            this.activeTab = 'Timeline';
            this.teamMembers.map((user:any)=>{
                if(user_id == user._id){user.checked = true}
                else{user.checked = false}
            })
            this.setFilters('teamMembers');
        }
        
        monthReadData:any=[];
        monthSkLoading:boolean = false;
        monthTotals = { new_counter: 0, productive: 0, total_checkin: 0 };
        
        getMonthList(event?:any) {
            this.monthSkLoading = true;
            let reqData :any = {};
            delete this.filter.activity_date;
            delete this.filter.activeTab;
            delete this.filter.page;
            reqData.filters = this.filter;
            reqData.activeTab = this.activeTab;
            reqData.page = this.page;
            if(event){
                reqData.month = event.split('-')[1];
                reqData.year = event.split('-')[0];
            }
            reqData.activity_date = null;
            reqData = this.commonFunction.removeBlankKeys(reqData);
            
            this.api.post(reqData, 'activity/month-read').subscribe(result => {
                if (result['statusCode']  ===  200) {
                    this.monthSkLoading = false;
                    this.monthReadData = result['data'];
                    this.monthDate = this.monthReadData[0].month
                    this.generateMonthDates();
                    this.pagination = result['pagination'];
                    this.calculateMonthTotals();
                    this.calculateMonthColumnTotals();
                }
            },err=>{
                this.monthSkLoading = false
            });
        }
        
        monthColumnTotals: number[] = [];
        
        calculateMonthColumnTotals() {
            if (!this.monthReadData?.length) return;
            
            const columnLength = this.monthReadData[0].month.length;
            this.monthColumnTotals = Array(columnLength).fill(0);
            
            this.monthReadData.forEach((row:any) => {
                row.month.forEach((item: any, index: number) => {
                    this.monthColumnTotals[index] += item?.count || 0;
                });
            });
        }
        
        calculateMonthTotals() {
            this.monthTotals = this.monthReadData?.reduce(
                (acc: any, row: any) => {
                    acc.new_counter += row?.new_counter || 0;
                    acc.productive += row?.productive || 0;
                    acc.total_checkin += row?.total_checkin || 0;
                    return acc;
                },
                { new_counter: 0, productive: 0, total_checkin: 0 }
            );
        }
        
        getActivityFilters() {
            this.api.post({}, 'activity/today-visit-data').subscribe(result => {
                if (result['statusCode']  ===  200) {
                    this.customers = result['data']?.today_visit_customer_types
                    this.beats = result['data']?.today_visit_beats
                    this.teamMembers = result['data']?.today_visitors
                    this.locations = result['data']?.todays_visit_states
                }
            },err=>{
            });
        }
        
        analyticsData:any={};
        analyticsReqSent:boolean = false
        getAnalytics() {
            this.skLoading = true;
            this.analyticsReqSent = false;
            let reqData :any = {};
            reqData = this.filter;
            reqData.activeTab = this.activeTab;
            reqData.page = this.page;
            reqData = this.commonFunction.removeBlankKeys(reqData);
            this.api.post(reqData, 'activity/anyalytics').subscribe(result => {
                if (result['statusCode']  ===  200) {
                    this.skLoading = false;
                    this.analyticsReqSent = true;
                    this.analyticsData = result['data'];
                }
            },err=>{
                this.analyticsReqSent = true
            });
        }
        
        chartData:any=[];
        chartReqSent:boolean = false
        getChartData() {
            this.chartReqSent = false;
            let reqData :any = {};
            reqData = this.filter;
            reqData.activeTab = this.activeTab;
            reqData.page = this.page;
            reqData = this.commonFunction.removeBlankKeys(reqData);
            this.api.post(reqData, 'activity/n-days-data').subscribe(result => {
                if (result['statusCode']  ===  200) {
                    this.chartReqSent = true;
                    this.chartData = result['data'];
                }
            },err=>{
                this.chartReqSent = true
            });
        }
        
        
        setFilters(type:string){
            this.filter.customer_type_name = [];
            this.filter.user_id = [];
            this.filter.state = [];
            this.filter.beat_code = [];
            if(type == 'customers'){
                this.teamMembers.map((item:any)=>{ item.checked = false });
                this.locations.map((item:any)=>{ item.checked = false });
                this.beats.map((item:any)=>{ item.checked = false });
                
                this.customers.map((item:any)=>{ if(item.checked)this.filter.customer_type_name.push(item.customer_type_name) });
            }
            if(type == 'teamMembers'){
                this.locations.map((item:any)=>{ item.checked = false });
                this.customers.map((item:any)=>{ item.checked = false });
                this.beats.map((item:any)=>{ item.checked = false });
                
                this.teamMembers.map((item:any)=>{ if(item.checked)this.filter.user_id.push(item._id) });
            }
            if(type == 'locations'){
                this.teamMembers.map((item:any)=>{ item.checked = false });
                this.customers.map((item:any)=>{ item.checked = false });
                this.beats.map((item:any)=>{ item.checked = false });
                
                this.locations.map((item:any)=>{ if(item.checked)this.filter.state.push(item.state) });
            }
            if(type == 'beats'){
                this.teamMembers.map((item:any)=>{ item.checked = false });
                this.locations.map((item:any)=>{ item.checked = false });
                this.customers.map((item:any)=>{ item.checked = false });
                
                this.beats.map((item:any)=>{ if(item.checked)this.filter.beat_code.push(item.beat_code) });
            }
            this.onTabChange(this.activeTab);
            
        }
        
        resetFilters(){
            this.teamMembers.map((item:any)=>{ item.checked = false });
            this.locations.map((item:any)=>{ item.checked = false });
            this.beats.map((item:any)=>{ item.checked = false });
            this.customers.map((item:any)=>{ item.checked = false });
            this.filter.activity_date = null;
        }
        
        openBottomSheet(): void {
            this.bottomSheet.open(BottomSheetComponent, {
                data: {
                    message: 'Hello from parent',
                    id: 123
                }
            }).afterDismissed().subscribe((result) => {
                if(result.dismiss){
                    if(this.activeTab === 'Timeline'){
                        this.filter.start_date = this.dateService.formatToYYYYMMDD(result?.data?.start_date);
                        this.filter.end_date = this.dateService.formatToYYYYMMDD(result?.data?.end_date);
                        this.filter.user_ids = result?.data?.user_ids;
                        this.getDayList();
                    }
                }
                console.log('Data returned from bottom sheet:', result);
            });
        }
        
        
        
        goToDetailPage(rowId:any)
        {
            this.router.navigate(['/apps/order/primary-order/primary-order-detail/' , rowId]);
        }
    }
    