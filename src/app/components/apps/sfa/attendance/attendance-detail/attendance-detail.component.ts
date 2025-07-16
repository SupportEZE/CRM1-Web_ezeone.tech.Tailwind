
import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { SpkGalleryComponent } from '../../../../../../@spk/spk-reusable-plugins/spk-gallery/spk-gallery.component';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { Lightbox, LightboxModule } from 'ng-gallery/lightbox';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Gallery, GalleryItem, ImageItem, ImageSize, ThumbnailsPosition } from 'ng-gallery';
import { SpkApexchartsComponent } from '../../../../../../@spk/spk-apexcharts/apexcharts.component';
import {GoogleMap, GoogleMapsModule, MapKmlLayer} from '@angular/google-maps';
import { SpkProjectCardComponent } from '../../../../../../@spk/reusable-dashboard/spk-project-card/spk-project-card.component';
import { ApiService } from '../../../../../core/services/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DateService } from '../../../../../shared/services/date.service';
import { CommonModule } from '@angular/common';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { CommonApiService } from '../../../../../shared/services/common-api.service';
import { distance as turfDistance } from '@turf/turf';
import { SweetAlertService } from '../../../../../core/services/alert/sweet-alert.service';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { Location } from '@angular/common';
import { SpkProductCardComponent } from '../../../../../../@spk/reusable-apps/spk-product-card/spk-product-card.component';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-arrowheads';
import moment from 'moment';
import { ShowcodeCardComponent } from '../../../../../shared/components/showcode-card/showcode-card.component';
import { ModuleService } from '../../../../../shared/services/module.service';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import { AuthService } from '../../../../../shared/services/auth.service';

@Component({
    selector: 'app-attendance-detail',
    standalone: true,
    imports: [MaterialModuleModule,GoogleMapsModule,SharedModule,NgSelectModule,GalleryModule,SpkProductCardComponent,LightboxModule, OverlayscrollbarsModule,FormsModule,ReactiveFormsModule,SpkProjectCardComponent,CommonModule,SpkApexchartsComponent,ShowcodeCardComponent],
    templateUrl: './attendance-detail.component.html',
    styleUrl: './attendance-detail.component.scss'
})
export class AttendanceDetailComponent {
    team: any;
    today= new Date();
    activeTab:any = 'start-location'
    items!: GalleryItem[];
    attendanceDetailImages:any = [];
    skLoading:boolean = false
    skLoading_battery:boolean = false
    skLoading_timeline:boolean = false
    skLoading_calendar:boolean = false
    attendanceDetail: any;
    DetailId:  any;
    attendanceDetailFormData:any;
    formattedKeysFormData: { [key: string]: any } = {};
    userData:any=[];
    batteryGraph = [];
    mapRoute = [];
    center: google.maps.LatLngLiteral = {lat: 26.5502167, lng: 82.6595271};
    startMarker :google.maps.LatLngLiteral = {lat: 26.5502167, lng: 82.6595271};
    stopMarker :google.maps.LatLngLiteral = {lat: 26.5502167, lng: 82.6595271};
    lastMarker :google.maps.LatLngLiteral = {lat: 26.5502167, lng: 82.6595271};
    
    zoom = 10; // Adjust zoom level as needed
    kmlUrl = 'https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml';
    map: any;
    myMap: any;
    latitude: number = 0;
    longitude: number = 0;    
    allLocations:any = {};
    accessRight:any = {};
    orgData: any = {}
    
    constructor(private location: Location,public router:Router,public toastr: ToastrServices,public alert:SweetAlertService,public commonApi:CommonApiService,public gallery: Gallery, public lightbox: Lightbox,public api:ApiService,public route: ActivatedRoute,public dateService: DateService, public moduleService: ModuleService, public comanFuncation:ComanFuncationService,private authService: AuthService) {}
    ngOnInit() {
        this.orgData = this.authService.getOrg();
        
        const accessRight = this.moduleService.getAccessMap('SFA', 'Attendance');
        if (accessRight) {
            this.accessRight = accessRight;
        }
        
        // Get a lightbox gallery ref
        const lightboxRef = this.gallery.ref('lightbox');
        
        // Add custom gallery config to the lightbox (optional)
        lightboxRef.setConfig({
            imageSize: ImageSize.Cover,
            thumbPosition: ThumbnailsPosition.Top,
        });
        
        // Load items into the lightbox gallery ref
        lightboxRef.load(this.items);
        
        this.route.paramMap.subscribe(params => {
            this.DetailId = params.get('id');
            if(this.DetailId){
                this.getAttendanceDetail();
            }
        });
        this.commonApi.getUserData();
    }
    
    
    
    selectedDate:any;
    selectedUser:any;
    currentMonth: string | undefined;
    currentYear: number | undefined;
    daysInMonth:any;
    dayStatus: any[] | undefined;  
    daysGrid:any=[];;
    firstDayOfMonth:any;
    markers: google.maps.LatLngLiteral[] = [];
    markersTemp:any=[];
    timelineData:any={};
    profilePic:any = {};
    getAttendanceDetail() {
        this.skLoading = true;
        this.attendanceDetailImages =[];
        
        this.api.post({attendance_id: this.DetailId, user_id: this.selectedUser, attend_date: this.selectedDate ? moment(this.selectedDate).format('YYYY-MM-DD') : null}, 'attendance/detail').subscribe(async result => {
            if (result['statusCode']  ===  200) {
                
                this.skLoading = false;
                this.attendanceDetail = result['data']['attendancedetail'] || {};
                this.attendanceDetailFormData = this.attendanceDetail['form_data'] || [];
                this.formattedKeysFormData = this.dateService.formatAndPrintFormData(this.attendanceDetailFormData);
                this.userData = result['data']['userData'] || {};
                this.profilePic = this.userData.files?.find((doc: any) => doc.label === 'Profile Pic');
                this.userData.formattedKeysFormData = this.dateService.formatAndPrintFormData(this.userData);
                
                if(this.attendanceDetail?.start_lat && this.attendanceDetail?.start_lng){
                    this.loadMap('start-location');
                    this.startMarker = {lat: this.attendanceDetail?.start_lat, lng: this.attendanceDetail?.start_lng};
                }
                if(this.attendanceDetail?.stop_lat && this.attendanceDetail?.stop_lng){
                    this.loadMap('stop-location');
                    this.stopMarker = {lat: this.attendanceDetail?.stop_lat,lng: this.attendanceDetail?.stop_lng};
                }
                this.attendanceDetail.attend_date = new Date(this.attendanceDetail?.attend_date);
                
                const today = new Date();
                this.attendanceDetail.showLiveLocation = this.dateService.formatToYYYYMMDD(this.attendanceDetail.attend_date) == this.dateService.formatToYYYYMMDD(today) ? true : false;
                // this.attendanceDetail.last_location = this.markers?.length ? this.markers[this.markers.length - 1 ] : {};
                
                if(this.attendanceDetail?.last_location_lat && this.attendanceDetail?.last_location_lng){
                    this.loadMap('live-location');
                    this.lastMarker = {lat: this.attendanceDetail?.last_location_lat,lng: this.attendanceDetail?.last_location_lng};
                }
                
                this.getUserAndDateSelected();
                this.getMonthCalendar()
                this.getTimelineDetails();
                this.getBatteryDetails();
            }
        });
    }
    
    getUserAndDateSelected()
    {
        this.selectedUser = this.userData._id
        
        this.selectedDate = this.attendanceDetail.attend_date;
    }
    
    
    bars: any[] = [];
    hours: string[] = [];
    
    todayDate() {
        return new Date().toISOString().split('T')[0];
    }
    
    
    loadMap(type:any): void {
        const mapContainerId = 'map';
        
        let address = '';
        if (type === 'start-location') {
            this.latitude = parseFloat(this.attendanceDetail?.start_lat);
            this.longitude = parseFloat(this.attendanceDetail?.start_lng);
            address = this.attendanceDetail?.start_address || 'Not available';
        }
        else if (type === 'stop-location') {
            this.latitude = parseFloat(this.attendanceDetail?.stop_lat);
            this.longitude = parseFloat(this.attendanceDetail?.stop_lng);
            address = this.attendanceDetail?.stop_address || 'Not available';
        }
        else if (type === 'live-location') {
            this.latitude = parseFloat(this.attendanceDetail?.last_location_lat);
            this.longitude = parseFloat(this.attendanceDetail?.last_location_lng);
            address = this.attendanceDetail?.last_location || 'Live location address not available';
        }
        
        
        // Reset the Leaflet map container ID if it exists (to prevent reuse errors)
        const container = document.getElementById(mapContainerId);
        if (container && (container as any)._leaflet_id != null) {
            (container as any)._leaflet_id = null;
        }
        // Delay map creation to ensure DOM is ready
        setTimeout(() => {
            // Initialize map
            this.myMap = L.map(mapContainerId).setView([this.latitude, this.longitude], 16);
            
            // Add OpenStreetMap tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 22,
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(this.myMap);
            
            // Custom marker icon
            const icon = L.icon({
                iconUrl: 'assets/images/pin-marker.gif',
                iconSize: [30, 33],
                iconAnchor: [15, 33],
                popupAnchor: [0, -30]
            });
            
            // Add marker
            const marker = L.marker([this.latitude, this.longitude], { icon }).addTo(this.myMap);
            marker.bindPopup(`<strong>Address:</strong><br>${address}`).openPopup();            
        }, 100);
    }
    
    
    resetAttendance(){
        this.alert.confirm(`Confirm`, 'Are you sure you want reset attendance','Yes, Reset!') .then(result => {
            if (result.isConfirmed) {
                this.api.post({attendance_id: this.DetailId}, 'attendance/reset').subscribe(async result => {
                    if(result['statusCode'] == 200){
                        this.toastr.success(result['message'], '', 'toast-top-right');
                    }
                })
            }
        })
    }
    
    goToLeaveAdd(){
        this.router.navigateByUrl('/apps/sfa/leave-list/leave-add')
    }
    
    absentAttendance(){
        this.alert.confirm(`Confirm`, 'Are you sure you want absent attendance','Yes, mark absent!') .then(result => {
            if (result.isConfirmed) {
                this.api.post({attendance_id: this.DetailId}, 'attendance/absent').subscribe(async result => {
                    if(result['statusCode'] == 200){
                        this.toastr.success(result['message'], '', 'toast-top-right');
                        this.location.back();
                    }
                })
            }else{
                
            }
        })
    }
    
    
    
    convertToAmPm(time24: string): string {
        const [hoursStr, minutes, seconds] = time24.split(':');
        let hours = parseInt(hoursStr, 10);
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        return `${hours}:${minutes} ${ampm}`;
    }
    convertFromToTimesToAmPm(data: any[]): any[] {
        return data.map(item => {
            const updatedItem = { ...item };
            
            if (updatedItem.from) {
                updatedItem.from = this.convertToAmPm(updatedItem.from);
            }
            
            if (updatedItem.to) {
                updatedItem.to = this.convertToAmPm(updatedItem.to);
            }
            
            return updatedItem;
        });
    }
    
    // ------------------Timeline Start-------------------------- //
    
    getTimelineDetails(){
        this.skLoading_timeline = true;
        
        this.api.post({user_id: this.userData._id , attend_date: this.attendanceDetail.attend_date, attendance_id: this.DetailId}, 'attendance/timeline').subscribe(async result => {
            if(result['statusCode'] == 200){
                this.skLoading_timeline = false;
                this.timelineData = result['data'];
                
                if(this.timelineData?.events?.length){
                    this.timelineData.events = this.convertFromToTimesToAmPm(this.timelineData?.events);
                    this.generateBars(this.timelineData?.tatSumByType?.total_min);                    
                }
            }
        })
    }
    
    generateBars(totalMinutes:any) {
        if (!this.timelineData.events.length) return;
        
        const events = this.timelineData.events;
        
        // Fill missing "to" from next event
        for (let i = 0; i < events.length; i++) {
            const current = events[i];
            const next = events[i + 1];
            if (!current.to && !current.end && next) {
                current.to = next.from || next.start;
            }
        }
        
        const getColor = (type: string) => {
            switch (type) {
                case 'Punch In':
                return 'bg-success';
                case 'Punch Out':
                return 'bg-danger';
                case 'Travel':
                return 'bg-info';
                case 'Halt':
                return 'bg-warning';
                case 'Walking':
                return 'bg-secaondary';
                default:
                return 'bg-secondary';
            }
        };
        
        this.bars = [];
        
        let accumulatedMinutes = 0;
        
        for (const item of events) {
            const eventMinutes = item.tatMin || 1; // fallback 1 minute if missing
            
            let fromTimeStr = item.start || item.from;
            let toTimeStr = item.end || item.to || item.from;
            
            // Format properly if only time is given
            if (fromTimeStr?.length === 8) fromTimeStr = `${this.todayDate()}T${fromTimeStr}`;
            if (toTimeStr?.length === 8) toTimeStr = `${this.todayDate()}T${toTimeStr}`;
            
            const fromDate = new Date(fromTimeStr);
            const toDate = new Date(toTimeStr);
            
            const startTime = this.formatTime(fromDate);
            const endTime = this.formatTime(toDate);
            
            const left = (accumulatedMinutes / totalMinutes) * 100;
            const width = (eventMinutes / totalMinutes) * 100;
            
            accumulatedMinutes += eventMinutes;
            
            this.bars.push({
                left,
                width,
                color: getColor(item.type),
                startTime,
                endTime,
                type: item.type, // optional if you want type also
            });
        }
    }
    getCssColor(colorClass: string): string {
        switch (colorClass) {
            case 'bg-success': return '#21ce9e';
            case 'bg-danger': return '#ff0000';
            case 'bg-info': return '#0ea5e8';
            case 'bg-warning': return '#ffc658';
            case 'bg-secaondary': return '#9e5cf7';
            case 'bg-gray': return '#6c757d';
            default: return '#999';
        }
    }
    formatTime(date: Date): string {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHour = hours % 12 || 12;
        const displayMinutes = minutes.toString().padStart(2, '0');
        return `${displayHour}:${displayMinutes} ${ampm}`;
    }
    // ------------------Timeline End-------------------------- //
    
    // ------------------Battery Graph Start-------------------------- //
    
    getBatteryDetails(){
        this.skLoading_battery = true;
        // this.chartOptions = {};
        this.api.post({user_id: this.userData._id , attend_date: this.attendanceDetail.attend_date, attendance_id: this.DetailId}, 'attendance/battery-graph').subscribe(async result => {
            if(result['statusCode'] == 200){
                this.skLoading_battery = false;
                this.batteryGraph = result['data'];
                if(this.batteryGraph?.length)this.updateChartOptions(this.batteryGraph || {});
            }
        })
    }
    
    updateChartOptions(data: { battery_level: number; time: string }[]) {
        const batteryLevels = data.map(item =>
            parseFloat((item.battery_level * 100).toFixed(2))
        );
        
        const labels = data.map(item => this.convertToAmPm(item.time));
        
        this.chartOptions = {
            ...this.chartOptions,
            series: [
                {
                    name: 'Battery %',
                    type: 'line',
                    data: batteryLevels
                }
            ],
            labels: labels
        };
    }
    
    chartOptions:any={
        series: [
            {
                name: 'Battery %',
                type: 'line',
                data: []
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
        labels: [],
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
        yaxis: {
            min: 0,
            max: 100,
            tickAmount: 5,
            labels: {
                formatter: (val: number) => `${val}%`
            },
            title: {
                text: 'Battery %'
            }
        },
        plotOptions: {
            bar: {
                columnWidth: "20%",
                borderRadius: 2
            }
        },
        colors: ["rgba(var(--primary-rgb))", "rgb(227, 84, 212)"],
    }
    // ------------------Battery Graph End-------------------------- //
    
    
    // ------------------Route Start-------------------------- //
    getRouteDetails(){
        this.skLoading_battery = true;
        this.api.post({user_id: this.userData._id , attend_date: this.attendanceDetail.attend_date, attendance_id: this.DetailId}, 'attendance/route').subscribe(async result => {
            
            if(result['statusCode'] == 200){
                this.skLoading_battery = false;
                this.mapRoute = result['data'];
                if(this.mapRoute.length){
                    this.center = {lat: result['data'][0].latitude,lng: result['data'][0].longitude};
                    await this.mapRoute.map((r:any)=>{
                        this.markers.push({lat: r.latitude,lng: r.longitude})
                    })  
                    this.markersTemp = this.mapRoute;                
                    this.initMap(this.markers);
                }
                
            }
        })
    }
    
    // map: L.Map | undefined;
    routeMarkers: L.Marker[] = [];
    sliderIndex = 0;
    totalDistance = 0
    cumulativeDistance = 0
    
    async initMap(markers: any[]) {
        setTimeout(() => {
            this.markers = markers;            
            this.routeMarkers = [];
            
            if (this.map) {
                this.map.remove();
            }
            
            this.map = L.map('map', {
                center: [markers[0].lat, markers[0].lng],
                zoom: 14
            });
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(this.map);
            
            // Add Start Marker
            const start = markers[0];
            L.marker([start.lat, start.lng], {
                icon: L.icon({
                    iconUrl: './assets/images/start-marker.png',
                    iconSize: [25, 25],
                    iconAnchor: [15, 30],
                    popupAnchor: [0, -30]
                })
            }).addTo(this.map).bindPopup('Start Point');
            
            // Add End Marker
            const end = markers[markers.length - 1];
            L.marker([end.lat, end.lng], {
                icon: L.icon({
                    iconUrl: './assets/images/end-marker.png',
                    iconSize: [25, 25],
                    iconAnchor: [15, 30],
                    popupAnchor: [0, -30]
                })
            }).addTo(this.map).bindPopup('End Point');
            
            setTimeout(() => {
                const routingControl = L.Routing.control({
                    waypoints: markers.map((coord: any) => L.latLng(coord.lat, coord.lng)),
                    routeWhileDragging: true,
                    show: false,
                    // @ts-ignore
                    createMarker: (i: number, waypoint: any, n: number) => {
                        const marker = L.marker(waypoint.latLng);
                        
                        // Distance calculation
                        if (i > 0) {
                            const from = [markers[i - 1].lng, markers[i - 1].lat];
                            const to = [markers[i].lng, markers[i].lat];
                            
                            const dist = turfDistance(from, to, { units: 'kilometers' });
                            this.totalDistance += dist;
                        }
                        // marker.bindPopup(`Point ${i + 1}<br>Distance: ${this.totalDistance.toFixed(2)} km  <br>Time: ${moment(this.markersTemp[this.sliderIndex].created_at).format('hh:mm a')}`);
                        // this.routeMarkers.push(marker);
                        // return marker;
                    },
                    
                    lineOptions: {
                        styles: [{ color: 'blue', opacity: 0.7, weight: 6}],
                        extendToWaypoints: true,
                        missingRouteTolerance: 0,
                        // className: 'custom-routing-path',
                    }
                    //   @ts-ignore
                }).addTo(this.map);
                
                // Add arrowheads after route is loaded
                routingControl.on('routesfound', (e: any) => {
                    const coords = e.routes[0].coordinates;
                    
                    const line = L.polyline(coords, {
                        color: 'transparent'
                    }).addTo(this.map!);
                });
                
                setTimeout(() => {
                    this.map?.invalidateSize();
                    
                    const initialCoord = this.markers[0];
                    const latLng = L.latLng(initialCoord.lat, initialCoord.lng);
                    
                    this.sliderMarker = L.marker(latLng, {
                        icon: L.icon({
                            iconUrl: './assets/images/moving-marker.gif',
                            iconSize: [30, 30],
                            iconAnchor: [10, 30],
                            popupAnchor: [0, -40]
                        })
                    }).addTo(this.map);
                    
                }, 700);
            }, 500);
        }, 700);
    }
    
    onSliderChange() {
        this.cumulativeDistance = 0;
        const selectedCoord = this.markers[this.sliderIndex];
        if (!selectedCoord || !this.map) return;
        
        const latLng = L.latLng(selectedCoord.lat, selectedCoord.lng);
        
        for (let i = 1; i <= this.sliderIndex; i++) {
            const from = [this.markers[i - 1].lng, this.markers[i - 1].lat];
            const to = [this.markers[i].lng, this.markers[i].lat];
            
            const segmentDist = turfDistance(from, to, { units: 'kilometers' });
            this.cumulativeDistance += segmentDist;
        }
        
        // Update or create slider marker
        if (this.sliderMarker) {
            this.sliderMarker.setLatLng(latLng);
        } else {
            this.sliderMarker = L.marker(latLng, {
                icon: L.icon({
                    iconUrl: './assets/images/moving-marker.gif',
                    iconSize: [30, 30],
                    iconAnchor: [10, 30],
                    popupAnchor: [0, -40]
                })
            }).addTo(this.map);
        }
        
        // this.sliderMarker
        // .bindPopup(`Point ${this.sliderIndex + 1}<br>Total Distance: ${this.cumulativeDistance.toFixed(2)} km <br>Time: ${moment(this.markersTemp[this.sliderIndex].created_at).format('hh:mm a')}`)
        // .openPopup();
        
        this.map.setView(latLng, 14);
    }
    
    sliderMarker: L.Marker | undefined;
    playInterval: any;
    isPlaying = false;
    
    togglePlayPause() {
        if (this.isPlaying) {
            clearInterval(this.playInterval);
            this.isPlaying = false;
        } else {
            this.isPlaying = true;
            this.playInterval = setInterval(() => {
                if (this.sliderIndex < this.markers.length - 1) {
                    this.sliderIndex++;
                    this.onSliderChange();
                } else {
                    clearInterval(this.playInterval);
                    this.isPlaying = false;
                }
            }, 1000); // Adjust speed if needed
        }
    }
    
    resetRoute() {
        clearInterval(this.playInterval);
        this.isPlaying = false;
        this.sliderIndex = 0;
        this.onSliderChange();
    }
    
    // ------------------Route End-------------------------- //
    
    // ------------------Month Calendar Start-------------------------- //
    
    getMonthCalendar(){
        this.skLoading_calendar = true;
        
        this.api.post({user_id: this.userData._id , attend_date: this.attendanceDetail.attend_date, attendance_id: this.DetailId}, 'attendance/single-month-read').subscribe(async result => {
            if(result['statusCode'] == 200){
                const date = new Date();
                this.currentMonth = this.getMonthName(date.getMonth());
                this.currentYear = date.getFullYear();
                this.daysInMonth = this.getDaysInMonth(date.getMonth(), date.getFullYear());
                this.firstDayOfMonth = this.getFirstDayOfMonth(date.getMonth(), date.getFullYear());
                
                if(result['data'])this.setCurrentMonthStats(result['data']);
                await this.generateDaysGrid();
                
                const lastNonNullIndex = this.daysGrid.reverse().findIndex((value:any) => value !== null);
                const daysGridTemp = this.daysGrid.reverse().slice(0, this.daysGrid.length - lastNonNullIndex);
                this.daysGrid = [];
                
                const currentDate = new Date();
                const currentDay = currentDate.getDate();
                
                const attendanceData = result['data']?.attendanceData;
                daysGridTemp.map((r: any) => {
                    if (r) {
                        const matchingAttendance = attendanceData?.find((item: any) => {
                            const attendanceDate = new Date(item.startDate);
                            return attendanceDate.getDate() === r;
                        });
                        
                        if (matchingAttendance) {
                            let status :any=null
                            if (matchingAttendance.punched) {
                                status = 'Present';
                            }if (matchingAttendance.absent) {
                                status = 'Absent';
                            } else if (matchingAttendance.leave) {
                                status = 'Leave';
                            } else if (matchingAttendance.weekOff) {
                                status = 'Weekly Off';
                            } else if (matchingAttendance.holiday) {
                                status = 'Holiday';
                            } else if (matchingAttendance.regionalHoliday) {
                                status = 'Regional Holiday';
                            }
                            this.daysGrid.push({
                                date: r,
                                status: status,
                                current_date: r === currentDay ? true : false
                            });
                        } else {
                            this.daysGrid.push({
                                date: r,
                                status: null,
                                current_date: r === currentDay ? true : false
                            });
                        }
                    } else {
                        this.daysGrid.push({
                            date: null,
                            status: null,
                            current_date: false
                        });
                    }
                });
                
                this.skLoading_calendar = false;
            }
        })
    }
    
    getMonthName(monthIndex: number): string {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return months[monthIndex];
    }
    
    getDaysInMonth(month: number, year: number): number[] {
        const date = new Date(year, month + 1, 0); 
        const daysInMonth = [];
        for (let i = 1; i <= date.getDate(); i++) {
            daysInMonth.push(i);
        }
        return daysInMonth;
    }
    
    getFirstDayOfMonth(month: number, year: number): number {
        const date = new Date(year, month, 1); 
        return date.getDay(); 
    }
    
    generateDaysGrid(): void {
        const totalDays = this.daysInMonth.length;
        let firstDay = this.firstDayOfMonth;
        
        firstDay = (firstDay === 0) ? 6 : firstDay - 1;
        
        const grid = new Array(42).fill(null);
        
        for (let i = 0; i < totalDays; i++) {
            grid[firstDay + i] = this.daysInMonth[i];
        }
        this.daysGrid = grid;
    }
    
    cardData:any=[];
    setCurrentMonthStats(data:any){
        this.cardData = [
            {
                title: 'Total Days',
                count: data?.totalWoringDays ? data?.totalWoringDays : '0', 
                // percentage: '-5.20%',
                iconClass: 'ri-pages-line text-[1rem]',
                // badgeClass: 'danger',
                avatarClass: 'bg-primary svg-white',
            },
            {
                title: 'Present',
                count: data?.totalPresentDays ? data?.totalPresentDays : '0',
                // percentage: '+7.20%',
                iconClass: 'ri-calendar-check-fill text-[1rem]',
                // badgeClass: 'success',
                avatarClass: 'bg-primarytint1color svg-white',
            },
            {
                title: 'Absent',
                count: data?.totalAbsentDays ? data?.totalAbsentDays : '0',
                // percentage: '-5.20%',
                iconClass: 'ri-calendar-close-fill text-[1rem]',
                // badgeClass: 'danger',
                avatarClass: 'bg-danger svg-white',
            },
            {
                title: 'Weekly Off',
                count: data?.totalWeekOffDays ? data?.totalWeekOffDays : '0',
                // percentage: '+5.20%',
                iconClass: 'ri-calendar-todo-fill text-[1rem]',
                // badgeClass: 'success',
                avatarClass: 'bg-primarytint2color svg-white',
            },
            {
                title: 'Holiday',
                count: data?.totalHolidayDays ? data?.totalHolidayDays : '0',
                // percentage: '+5.20%',
                iconClass: 'ri-roadster-fill text-[1rem]',
                // badgeClass: 'success',
                avatarClass: 'bg-secondary svg-white',
            },
            {
                title: 'Leaves',
                count: data?.totalLeaveDays ? data?.totalLeaveDays : '0',
                // percentage: '+5.20%',
                iconClass: 'ri-calendar-todo-fill text-[1rem]',
                // badgeClass: 'success',
                avatarClass: 'bg-primarytint3color svg-white',
            },
        ];
    }
    
    // ------------------Month Calendar End-------------------------- //
    
    isFallback = false;
    onError(event: any) {
        this.isFallback = true;
        event.target.src = `${this.api.rootUrl}brand-logos/${this.orgData?.org_name}/desktop-logo.png`
    }
}