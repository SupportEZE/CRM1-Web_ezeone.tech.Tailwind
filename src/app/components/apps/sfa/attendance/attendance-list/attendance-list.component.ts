import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { FormBuilder, FormControl, FormsModule } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared.module';
import { SpkDropdownsComponent } from '../../../../../../@spk/reusable-ui-elements/spk-dropdowns/spk-dropdowns.component';
import { SortablejsModule } from '@maksim_m/ngx-sortablejs';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../../../core/services/api/api.service';
import { SweetAlertService } from '../../../../../core/services/alert/sweet-alert.service';
import { SpkListviewCardComponent } from '../../../../../../@spk/reusable-apps/spk-listview-card/spk-listview-card.component';
import Swal from 'sweetalert2';
import { FORMIDCONFIG } from '../../../../../../config/formId.config';
import { ModuleService } from '../../../../../shared/services/module.service';
import { SpkTeamCardComponent } from '../../../../../../@spk/reusable-landing-card/spk-team-card/spk-team-card.component';
import { ModalsComponent } from '../../../../../shared/components/modals/modals.component';
import { MatDialog } from '@angular/material/dialog';
import moment from 'moment';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { DateDialogComponent } from '../date-dialog/date-dialog.component';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import * as L from 'leaflet';
import { CommonApiService } from '../../../../../shared/services/common-api.service';
import { FormFieldTypes } from '../../../../../utility/constants';
@Component({
    selector: 'app-attendance-list',
    standalone: true,
    imports: [SharedModule,MaterialModuleModule,CommonModule,RouterModule,SpkReusableTablesComponent,FormsModule,SortablejsModule,ToastrModule,SpkTeamCardComponent],
    templateUrl: './attendance-list.component.html',
})
export class AttendanceListComponent {
    @Input() ComponentPageType !:any
    
    
    
    mainTabs:any = [];
    subTabs:any = [];
    public disabled: boolean = false;
    filter: any = {};
    sorting: any = {};
    selectedField: string = '';
    isModalOpen: boolean = false;
    range: any;
    FORMID:any= FORMIDCONFIG;
    selectedChoices = [];
    allModulesData:any = [];  
    mastersModule:any = {};
    attendanceModule:any = [];
    moduleTableId:number =0;
    activeTab:any ='Present';
    activeSubTab:any ='List View';
    skLoading:boolean = false;
    monthSkLoading:boolean = false;
    monthDaysData: MonthDayData[] = [];
    monthListColumn: MonthColumn[] = [];
    readonly fieldTypes = FormFieldTypes;
    tableData:any = {};
    tableHeader:any = [];
    moduleId:number=0;
    moduleName:string = '';
    moduleFormId:number=0;
    maxMonth:any;
    accessRight:any = {};
    
    constructor(public commanfunction:ComanFuncationService,public moduleService: ModuleService, private toastr: ToastrServices,public api:ApiService, public alert : SweetAlertService, private fb: FormBuilder, private router: Router,public dialog: MatDialog, public CommonApiService: CommonApiService) {
        
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // +1 because months are 0-indexed
        this.selectedMonth = `${year}-${month}`;
        this.maxMonth = `${year}-${month}`;
        
        const accessRight = this.moduleService.getAccessMap('SFA', 'Attendance');
        if (accessRight) {
            this.accessRight = accessRight;
        }
        
        const subModule = this.moduleService.getSubModuleByName('SFA', 'Attendance');
        const tableData = this.moduleService.getTableById('SFA', 'Attendance', this.FORMID.ID['AttendanceTable']);
        
        if (subModule) {
            this.moduleId = subModule.module_id;
            this.moduleName = subModule.title;
        }
        if(tableData){
            this.moduleTableId = tableData.table_id;
        }
        
        this.getHeaderConfigListing();
        
        this.range = this.fb.group({
            start: new FormControl<Date | null>(null),
            end: new FormControl<Date | null>(null)
        });
        
    }
    
    onRefresh()
    {
        this.filter = {};
        if (this.activeTab === 'Total') {
            this.getMonthList();
        }
        else if (this.activeTab === 'Present') {
            
            if (this.activeSubTab === 'List View') {
                this.getHeaderConfigListing();
            }
            else{
                this.getLiveMapView();
            } 
        }
        else {
            this.getList();
        }
    }
    
    onTabChange(tab: string , subTab: string) {
        this.filter = {};
        this.activeTab = tab;
        this.activeSubTab = subTab;
        if (this.activeTab === 'Total') {
            this.getMonthList();
        }
        else if (this.activeTab === 'Present' && this.activeSubTab === 'List View') {
            this.getHeaderConfigListing();
        }
        else {
            this.getList();
        }
    }
    
    onSubTabChange(subTab: string) {
        this.activeSubTab = subTab;
        if (this.activeSubTab === 'List View') {
            this.getHeaderConfigListing();
        }
        else{
            this.getLiveMapView();
        }        
    }
    
    generateMonthDates() {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const daysInMonth = new Date(currentDate.getFullYear(), currentMonth + 1, 0).getDate();
        const today = currentDate.getDate();
        
        this.monthListColumn = [];
        
        this.monthListColumn.push(
            {
                "label": "User Name",
                "value": "User Name"
            },
            {
                "label": "Total Days",
                "value": "Total Days"
            },
            {
                "label": "Present",
                "value": "Present"
            },
            {
                "label": "Absent",
                "value": "Absent"
            },
            {
                "label": "Weekly Off",
                "value": "Weekly Off"
            },
            {
                "label": "Holiday",
                "value": "Holiday"
            },
            {
                "label": "Leaves",
                "value": "Leaves"
            },
        );        
        
        for (let day = 1; day <= this.monthDaysData?.[0]?.attendanceData?.length || 0; day++) {
            this.monthListColumn.push({
                "label": day,
                "value": day.toString() 
            });
        }
    }
    
    goToDetailPage(rowId:any)
    {
        if (this.activeTab === 'Present') {
            this.router.navigate(['/apps/sfa/attendance-list/attendance-detail' , rowId]);
        }
    }
    
    //---------Attendance Listing----------//
    listPageData:any = {};
    PageTableData:any = {};
    allPageHeaders:any = [];
    
    attendancePageDropdowns:any = {}
    
    
    getHeaderConfigListing()
    {
        this.CommonApiService.getHeaderConfigListing(this.moduleTableId , this.moduleFormId).subscribe((result:any) => {
            
            this.tableData = result.data;
            this.tableHeader =   result['data']['table_data']['tableHead'];
            
            // --------- For columns filter in listing//
            this.tableHeader = this.tableHeader.filter((header: any) => header.list_view_checked);
            // this.tableHeader = this.tableHeader.filter((header: any) => header.list_view_checked && header.key_name_required !== true && header.type != this.fieldTypes.UPLOAD);
            
            this.getList();
            // ---------//
            
        });
    }
    
    
    listingData:any = [];
    listPagination:any = {}
    page: number = 1;
    
    getList() {
        this.skLoading = true;
        this.api.post({filters: this.filter, sorting: this.sorting, 'page': this.page, ComponentPageType: this.ComponentPageType }, 'attendance/read').subscribe(result => {
            if (result['statusCode']  ===  200) {
                this.skLoading = false;
                this.listingData = result['data'];
                this.mainTabs = [
                    { name: 'Total', label: 'Month', icon: 'ri-team-fill', count: this.listingData.counters?.totalUsers || 0, subTab: '' },
                    { name: 'Present', label: 'Present', icon: 'ri-calendar-check-fill', count: this.listingData.counters?.totalPunched || 0, subTab: 'List View'},
                    { name: 'Absent', label: 'Absent', icon: 'ri-calendar-close-fill', count: this.listingData.counters?.totalAbsent || 0, subTab: '' },
                    { name: 'Weekly Off', label: 'Weekly Off', icon: 'ri-calendar-todo-fill', count: this.listingData.counters?.totalWeekOff || 0, subTab: '' },
                    { name: 'Holiday', label: 'Holiday', icon: 'ri-roadster-fill', count: this.listingData.counters?.totalHoliday || 0, subTab: '' },
                    { name: 'Leave', label: 'Leave', icon: 'ri-calendar-todo-fill', count: this.listingData.counters?.totalLeave || 0, subTab: '' }
                ];
                
                this.subTabs = [
                    { name: 'List View', label: 'List View', icon: 'ri-layout-vertical-fill',},
                    { name: 'Map View', label: 'Live Map View', icon: 'ri-map-pin-fill',},
                ];
                
                this.listingData = {
                    'Total': result['data'].totalUsers || [],
                    'Present': result['data'].punchedUsers || [],
                    'Absent': result['data'].absentUsers || [],
                    'Weekly Off': result['data'].weekOffUsers || [],
                    'Holiday': result['data'].holidayUsers|| [],
                    'Leave': result['data'].leaveUsers || []
                };
                this.listingData?.Present?.map((r: any) => {
                    r.start_time = r.punch_in ? moment.utc(r.punch_in).utcOffset('+05:30').format('hh:mm a') : '-';
                    r.stop_time = r.punch_out ? moment.utc(r.punch_out).utcOffset('+05:30').format('hh:mm a') : '-';
                    r.attend_date = moment(r.attend_date).format('DD MMM yy');
                });
            }
        });
    }
    
    goToLeaveAdd(){
        this.router.navigateByUrl('/apps/sfa/leave-list/leave-add')
    }
    
    convertToUTC(timeString: string,date:any) {
        date = new Date(date);
        const datePart = date.toISOString().split('T')[0]; // Get the date part (YYYY-MM-DD)
        const timeParts = timeString.match(/(\d+):(\d+)\s*(AM|PM)/i); // Match time and AM/PM
        
        if (!timeParts) {
            throw new Error('Invalid time format');
        }
        
        let hours = parseInt(timeParts[1], 10);
        const minutes = parseInt(timeParts[2], 10);
        const period = timeParts[3].toUpperCase(); // AM or PM
        
        // Adjust for AM/PM
        if (period === 'AM') {
            if (hours === 12) {
                hours = 0; // Midnight case
            }
        } else if (period === 'PM') {
            if (hours !== 12) {
                hours += 12; // Convert PM times to 24-hour format
            }
        }
        
        // Construct the local date-time string
        const localDateTime = `${datePart}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
        
        // Create a Date object using the local date-time string
        const localDate = new Date(localDateTime);
        
        // Convert to UTC
        const utcDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);
        
        return utcDate;
    }
    todayDate:any = new Date(); 
    markPresent(user_id:number,attend_date:any){
        const dialogRef = this.dialog.open(DateDialogComponent,{data:{attend_date:attend_date}});
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                if(result.leave){
                    this.goToLeaveAdd();
                    return;
                }
                const punch_in = this.convertToUTC(result.punch_in,attend_date);
                const punch_out = result.punch_out ? this.convertToUTC(result.punch_out,attend_date) : null;
                this.api.post({user_id:user_id,punch_in:punch_in,punch_out:punch_out, attend_date:attend_date}, 'attendance/punch-in').subscribe(async result => {
                    if(result['statusCode'] == 200){
                        this.toastr.success(result['message'], '', 'toast-top-right');
                        if(this.activeTab != 'Total'){this.getList();}
                        else{this.getMonthList();}
                    }else{
                        // this.toastr.success(result['message'], '', 'toast-top-right');
                    }
                })
            } else {
                
            }
        });
        
        
    }
    
    goToDetail(attendanceId:any){
        this.router.navigate(['/apps/sfa/attendance-list/attendance-detail' , attendanceId]);
    }
    selectedMonth:any;
    getMonthList() {
        
        this.monthSkLoading = true;
        if(this.selectedMonth){
            this.filter.month = this.selectedMonth.split('-')[1];
            this.filter.year = this.selectedMonth.split('-')[0];
        }
        
        this.filter = this.commanfunction.removeBlankKeys(this.filter);
        this.api.post({filters: this.filter, sorting: this.sorting, 'page': this.page  }, 'attendance/month-read').subscribe(result => {
            if (result['statusCode']  ===  200) {
                this.monthSkLoading = false;
                this.monthDaysData = result['data'];
                this.listPagination = result['pagination'];
                this.generateMonthDates();
            }
        });
    }    
    
    
    // -------- Sorting//
    onSortChanged(event: { field: string; order: number }) {
        this.sorting = {};
        this.sorting[event.field] = event.order;
        this.getList();
    }
    // --------//
    
    // -------- Pagination//
    changeToPagination(btnType: string) {
        if (btnType == 'Previous') {
            if (this.listPagination.prev && this.page > 1) {
                this.page--;  // Decrement the page number
                this.getList();
            }
        }
        else
        {
            if (this.listPagination.next) {
                this.page++;  // Increment the page number
                this.getList();
            }
        }
    }
    
    changeToPage(newPage: number) {
        this.page = newPage;
        this.listPagination.cur_page = newPage;
        this.getList();
    }
    // --------//
    
    
    handleSelectionChange(event: { category_name: string; selections: string[] }): void {
        const { category_name, selections } = event;
        this.filter[category_name] = selections;
        this.getList();
        
    }
    
    updateSearchFilter(event: {searchText: string; name: string }) {
        this.filter[event.name] = event.searchText;
        this.getList();
    }
    
    handleDateRangeChange(event: { [key: string]: { start: string; end: string } }) {
        this.filter = event;
        this.getList();
    }
    
    onDeleteAttendance(attendanceId: any) {
        this.alert.confirm("Are you sure?")
        .then((result) => {
            if (result.isConfirmed) {
                this.api.patch({ _id: attendanceId, is_delete: 1}, 'attendance/delete').subscribe(result => {
                    if (result['statusCode']  ===  200) {
                        Swal.fire('Deleted!', result.message, 'success');
                        this.getList();
                    }                        
                });
            }
        });
    }
    
    openHeaderSettingModal() {        
        const dialogRef = this.dialog.open(ModalsComponent, {
            width: '450px',
            panelClass: 'mat-right-modal',
            position: { right: '0px' },
            data: {
                'lastPage':'header-config',
                'moduleFormId':this.moduleFormId,
                'moduleTableId':this.moduleTableId,
                "PageTableData":this.tableData,
                "allPageHeaders":this.tableHeader,
                "PageHeaders":this.tableHeader,
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.tableHeader = result.headers;
                this.getHeaderConfigListing();
            }
        });
    }
    
    //--------Attendance Listing---------//
    map: L.Map | undefined;
    liveMapList:any = [];
    getLiveMapView()
    {
        this.skLoading = true;
        this.api.post({attend_date: this.todayDate}, 'attendance/map-view').subscribe(async result => {
            this.skLoading = false;
            if(result['statusCode'] == 200){
                this.liveMapList = result['data'];
                if(this.liveMapList.length){
                    setTimeout(() => {
                        this.initializeMap();
                    });
                }
            }
        })
    }
    
    initializeMap() {
        this.map = L.map('map').setView([28.6139, 77.2090], 12);        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
        this.addMarkersToMap();
    }
    
    addMarkersToMap() {
        if (this.map) {
            const customIcon = L.icon({
                iconUrl: './assets/images/faces/12.jpg',
                iconSize: [32, 32],
                iconAnchor: [16, 32],
                popupAnchor: [0, -32]
            });
            
            const markerGroup: L.LatLng[] = []; 
            
            if (this.liveMapList && Array.isArray(this.liveMapList)) {
                this.liveMapList.forEach((item: any) => {
                    const lat = parseFloat(item.latitude);
                    const lng = parseFloat(item.longitude);
                    
                    if (!isNaN(lat) && !isNaN(lng)) {
                        const marker = L.marker([lat, lng], { icon: customIcon }).addTo(this.map as L.Map)
                        .bindPopup(`
                            Name: <b>${item?.created_name}</b><br>
                            Time: <b>${moment(item?.created_at).format('hh:mm a')}</b><br>
                            Address: <b>${item?.location}</b>
                        `, { autoClose: false });
                            marker.openPopup();
                            markerGroup.push(L.latLng(lat, lng));
                        }
                    });
                    
                    if (markerGroup.length) {
                        const bounds = L.latLngBounds(markerGroup);
                        this.map.fitBounds(bounds, { padding: [50, 50] });
                    }
                } else {
                    console.error("listingData2 is not available or not in the correct format");
                }
            } else {
                console.error("Map is not initialized");
            }
        }
        
        
        listingData2 = [
            {
                start_lat: '28.4089',   // Faridabad
                start_lng: '77.3178',
                customer_details: {
                    customer_name: 'ABC Enterprises',
                    district: 'Faridabad',
                    state: 'Haryana'
                }
            },
            {
                start_lat: '28.6139',   // Delhi
                start_lng: '77.2090',
                customer_details: {
                    customer_name: 'XYZ Traders',
                    district: 'New Delhi',
                    state: 'Delhi'
                }
            },
            {
                start_lat: '28.4595',   // Gurugram
                start_lng: '77.0266',
                customer_details: {
                    customer_name: 'GHI Industries',
                    district: 'Gurugram',
                    state: 'Haryana'
                }
            }
        ];
        
        
        attendanceStatuses = [
            { icon: 'ri-star-fill', color: 'text-primary', label: 'Holiday' },
            { icon: 'ri-calendar-2-fill', color: 'text-primarytint1color', label: 'Weekly Off' },
            { icon: 'ri-check-double-line', color: 'text-success', label: 'Present' },
            { icon: 'ri-star-half-line', color: 'text-info', label: 'Half Day' },
            // { icon: 'ri-information-fill', color: 'text-warning', label: 'Late' },
            { icon: 'ri-close-line', color: 'text-danger', label: 'Absent' },
            { icon: 'ri-flight-takeoff-fill', color: 'text-primarytint2color', label: 'On Leave' }
        ];
        
        PageHeaders:any = [
            // {
            //     "id": 2,
            //     "label": "Attend Date",
            //     "name": "attend_date",
            //     "placeholder": "Enter User Name",
            //     "type": "input",
            //     "min_length": 0,
            //     "max_length": 0,
            //     "show_guide": false,
            //     "required": true,
            //     "read_only": false,
            //     "validation_error": "User Name is required.",
            //     "parent_id": 1,
            //     "child": [],
            //     "is_show": true,
            //     "is_enable": true,
            //     "is_parent_dependency": false,
            //     "id_child_dependency": true,
            //     "child_dependency": [],
            //     "options": [],
            //     "data_type": "string",
            //     "sequence": 1,
            //     "class_name": "input-field",
            //     "icon": "user",
            //     "tooltip": "Enter the user’s name.",
            //     "grid_column": 1,
            //     "help_text": "User's personal identification.",
            //     "validation_pattern": null,
            //     "example_value": "John Doe"
            // },
            {
                "id": 1,
                "label": "User Name",
                "name": "name",
                "placeholder": "Enter User Name",
                "type": "SHORT_TEXT",
                "min_length": 0,
                "max_length": 0,
                "show_guide": false,
                "required": true,
                "read_only": false,
                "validation_error": "User Name is required.",
                "parent_id": 1,
                "child": [],
                "is_show": true,
                "is_enable": true,
                "is_parent_dependency": false,
                "id_child_dependency": true,
                "child_dependency": [],
                "options": [],
                "data_type": "string",
                "sequence": 1,
                "class_name": "input-field",
                "icon": "user",
                "tooltip": "Enter the user’s name.",
                "grid_column": 1,
                "help_text": "User's personal identification.",
                "validation_pattern": null,
                "example_value": "John Doe",
                "filter_checked": true
            },
            {
                "id": 3,
                "label": "User Code",
                "name": "user_code",
                "placeholder": "Enter User Code",
                "type": "SHORT_TEXT",
                "min_length": 0,
                "max_length": 10,
                "show_guide": true,
                "required": true,
                "read_only": false,
                "validation_error": "User Code is required.",
                "parent_id": 1,
                "child": [],
                "is_show": true,
                "is_enable": true,
                "is_parent_dependency": false,
                "is_child_dependency": false,
                "options": [],
                "data_type": "string",
                "sequence": 2,
                "class_name": "input-field",
                "icon": "code",
                "tooltip": "Enter the user's unique code.",
                "grid_column": 2,
                "help_text": "This code is used for identification.",
                "validation_pattern": "^\\d+$",
                "example_value": "12345",
                "filter_checked": true
            },
            {
                "label": "Designation",
                "name": "designation",
                "type": "SHORT_TEXT",
                "filter_checked": true


            },
            {
                "id": 4,
                "label": "Reporting Manager",
                "name": "reporting_manager_name",
                "placeholder": "Enter Reporting Manager's Name",
                "type": "SHORT_TEXT",
                "min_length": 0,
                "max_length": 100,
                "show_guide": true,
                "required": true,
                "read_only": false,
                "validation_error": "Reporting Manager's Name is required.",
                "parent_id": 1,
                "child": [],
                "is_show": true,
                "is_enable": true,
                "is_parent_dependency": false,
                "is_child_dependency": false,
                "options": [],
                "data_type": "string",
                "sequence": 3,
                "class_name": "input-field",
                "icon": "manager",
                "tooltip": "Enter the name of the reporting manager.",
                "grid_column": 1,
                "help_text": "The name of the person the user reports to.",
                "validation_pattern": null,
                "example_value": "Jane Smith",
                "filter_checked": true
            },
            {
                "label": "Start Meter Reading",
                "name": "start_meter_reading",
            },
            {
                "label": "Uniform",
                "name": "uniform",
            },
            {
                "label": "Vehicle Type",
                "name": "vehicle_type",
            },
            {
                "label": "Working Type",
                "name": "working_type",
            },
            {
                "label": "Stop Meter Reading",
                "name": "stop_meter_reading",
            },
            {
                "id": 5,
                "label": "Start Time",
                "name": "start_time",
                "placeholder": "Select Start Time",
                "type": "datetime",
                "min_length": 0,
                "max_length": 0,
                "show_guide": true,
                "required": true,
                "read_only": false,
                "validation_error": "Start Time is required.",
                "parent_id": 1,
                "child": [],
                "is_show": true,
                "is_enable": true,
                "is_parent_dependency": false,
                "id_child_dependency": false,
                "child_dependency": [],
                "options": [],
                "data_type": "datetime",
                "sequence": 4,
                "class_name": "datetime-field",
                "icon": "clock-in",
                "tooltip": "Select the time when the user started their work.",
                "grid_column": 1,
                "help_text": "The time when the user starts their work.",
                "validation_pattern": null,
                "example_value": "08:00 AM"
            },
            {
                "id": 6,
                "label": "Stop Time",
                "name": "stop_time",
                "placeholder": "Select Stop Time",
                "type": "datetime",
                "min_length": 0,
                "max_length": 0,
                "show_guide": true,
                "required": true,
                "read_only": false,
                "validation_error": "Stop Time is required.",
                "parent_id": 1,
                "child": [],
                "is_show": true,
                "is_enable": true,
                "is_parent_dependency": false,
                "id_child_dependency": false,
                "child_dependency": [],
                "options": [],
                "data_type": "datetime",
                "sequence": 5,
                "class_name": "datetime-field",
                "icon": "clock-out",
                "tooltip": "Select the time when the user stopped their work.",
                "grid_column": 1,
                "help_text": "The time when the user ends their work.",
                "validation_pattern": null,
                "example_value": "06:00 PM"
            },
            {
                "id": 7,
                "label": "Start Address",
                "name": "start_address",
                "placeholder": "Enter Start Address",
                "type": "input",
                "min_length": 0,
                "max_length": 255,
                "show_guide": true,
                "required": true,
                "read_only": false,
                "validation_error": "Start Address is required.",
                "parent_id": 1,
                "child": [],
                "is_show": true,
                "is_enable": true,
                "is_parent_dependency": false,
                "id_child_dependency": false,
                "child_dependency": [],
                "options": [],
                "data_type": "string",
                "sequence": 6,
                "class_name": "input-field",
                "icon": "location",
                "tooltip": "Enter the start address of the user's work location.",
                "grid_column": 1,
                "help_text": "The address where the user starts their work.",
                "validation_pattern": null,
                "example_value": "123 Main St, Cityville"
            },
            {
                "id": 8,
                "label": "Stop Address",
                "name": "stop_address",
                "placeholder": "Enter Stop Address",
                "type": "input",
                "min_length": 0,
                "max_length": 255,
                "show_guide": true,
                "required": true,
                "read_only": false,
                "validation_error": "Stop Address is required.",
                "parent_id": 1,
                "child": [],
                "is_show": true,
                "is_enable": true,
                "is_parent_dependency": false,
                "id_child_dependency": false,
                "child_dependency": [],
                "options": [],
                "data_type": "string",
                "sequence": 7,
                "class_name": "input-field",
                "icon": "location",
                "tooltip": "Enter the stop address of the user's work location.",
                "grid_column": 1,
                "help_text": "The address where the user ends their work.",
                "validation_pattern": null,
                "example_value": "456 Oak St, Cityville"
            },
            {
                "label": "Remark",
                "name": "remark",
            },
        ];
    }
    
    interface AttendanceData {
        userName: string;
        date: string;
        day: string;
        punched: boolean;
        leave: boolean;
        weekOff: boolean;
        holiday: boolean;
        regionalHoliday: boolean;
        absent: boolean;
        attendance_id:string;
        late:boolean;
        halfday:boolean
    }
    
    // Define the interface for MonthDayData
    interface MonthDayData {
        userId:any;
        userName: any;
        totalWoringDays: any;
        totalPresentDays: any;
        totalAbsentDays: any;
        totalWeekOffDays: any;
        totalHolidayDays: any;
        totalLeaveDays: any;
        date: string; // The date (can be a string or Date object depending on your data)
        attendanceData: AttendanceData[]; // Array of AttendanceData objects for each day
    }
    
    interface MonthColumn {
        label: string | number; // Allow both string and number for label
        value: string | number; // Same here for value, you can change depending on your needs
    }
    
    // interface MonthDayData {
    //     date: string; // The date (can be a string or Date object depending on your data)
    //     attendanceData: AttendanceData[]; // Array of AttendanceData objects for each day
    // }
    
    // Declare the monthDaysData as an array of MonthDayData
    // monthDaysData: MonthDayData[] = [];