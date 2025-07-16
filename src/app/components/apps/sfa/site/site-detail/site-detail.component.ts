import { Component, ElementRef, ViewChild } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { SpkApexchartsComponent } from '../../../../../../@spk/spk-apexcharts/apexcharts.component';
import { ApiService } from '../../../../../core/services/api/api.service';
import { CommonModule } from '@angular/common';
import { LogService } from '../../../../../core/services/log/log.service';
import { ModuleService } from '../../../../../shared/services/module.service';
import { FormsModule } from '@angular/forms';
import { ShowcodeCardComponent } from '../../../../../shared/components/showcode-card/showcode-card.component';
import { DateService } from '../../../../../shared/services/date.service';
import { SweetAlertService } from '../../../../../core/services/alert/sweet-alert.service';
import { MatDialog } from '@angular/material/dialog';
import { StatusChangeModalComponent } from '../../../../../shared/components/status-change-modal/status-change-modal.component';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { LogsComponent } from '../../../../../shared/components/logs/logs.component';
import { SpkProductCardComponent } from '../../../../../../@spk/reusable-apps/spk-product-card/spk-product-card.component';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { FollowUpAddComponent } from '../../followup/follow-up-add/follow-up-add.component';
import { SiteModalComponent } from '../site-modal/site-modal.component';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import * as L from 'leaflet';
import { CommentsComponent } from '../../../../../shared/components/comments/comments.component';
// declare const L: any

@Component({
    selector: 'app-site-detail',
    standalone: true,
    imports: [SharedModule, SpkReusableTablesComponent,SpkApexchartsComponent,CommonModule,FormsModule,ShowcodeCardComponent,SpkProductCardComponent,LogsComponent,MaterialModuleModule,SpkReusableTablesComponent,CommentsComponent],
    templateUrl: './site-detail.component.html',
})
export class SiteDetailComponent {
    DetailId:  any;
    Detail: any;
    formattedKeysFormData: { [key: string]: any } = {};
    DetailFormData:any;
    siteMainStages:any = [];
    competitorStages:any = [];
    logList:any=[];
    skLoading:boolean = false
    skLoading1:boolean = false
    subModule:any = {};
    originalData:any = {};
    assignType:any  = 'upcomming';
    activeTab:any = 'quotation'
    center: google.maps.LatLngLiteral = {lat: 24, lng: 12};
    taskActivity:any=[];
    quotationList:any=[];
    contactPerson:any=[];
    zoom = 3;
    map: any;
    myMap: any;
    latitude: number = 0;
    longitude: number = 0;
    accessRight:any = {};

    constructor(private router: Router,public route: ActivatedRoute,public api:ApiService,private logService:LogService,public moduleService: ModuleService,private dateService: DateService,public alert : SweetAlertService,public dialog:MatDialog,private toastr: ToastrServices,public comanFuncation:ComanFuncationService){}
    
    ngOnInit() {
        const accessRight = this.moduleService.getAccessMap('SFA', 'Site-Project');
        if (accessRight) {
            this.accessRight = accessRight;
        }

        const subModule = this.moduleService.getSubModuleByName('SFA', 'Site-Project');
        if (subModule) {
            this.subModule = subModule;
        }
        
        this.route.paramMap.subscribe(params => {
            this.DetailId = params.get('id');
            
            if(this.DetailId){
                this.getDetail();
            }
        });
    }
    
    getDetail() {
        this.skLoading = true;
        this.api.post({_id: this.DetailId}, 'sites/detail').subscribe(result => {
            if (result['statusCode']  ===  200) {
                this.skLoading = false;
                this.Detail = result['data'];
                this.DetailFormData = this.Detail['form_data'];
                this.siteMainStages = this.Detail['stages']
                this.competitorStages = this.Detail['competitor'];
                this.contactPerson = this.Detail['contact_person_detail'] ?? [];
                
                const completed = this.siteMainStages.filter((item: any) => Object.values(item)[0] === true).length;
                const total = this.siteMainStages.length;
                const percentage = total > 0 ? (completed / total) * 100 : 0;
                
                this.chartOptions1 = {
                    ...this.chartOptions1,
                    series: [parseFloat(percentage.toFixed(2))]
                };
                
                // Formating
                this.formattedKeysFormData = this.formatAndPrintFormData(this.DetailFormData);
                // Formating
                
                this.getQuotation()
                this.getLogs();
                this.loadMap();
            }
        });
    }
    
    loadMap(): void {
        const mapContainerId = 'map';
        this.latitude = parseFloat(this.Detail?.lat);
        this.longitude = parseFloat(this.Detail?.long);
        
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
                iconUrl: 'assets/images/highlight-marker.png',
                iconSize: [30, 33],
                iconAnchor: [15, 33],
                popupAnchor: [0, -30]
            });
            
            // Add marker
            const marker = L.marker([this.latitude, this.longitude], { icon }).addTo(this.myMap);
            marker.bindPopup(
                `<strong>Address:</strong><br>${this.Detail?.gps_address || 'Not available'}`
            ).openPopup();
        }, 100);
    }
    
    
    getKey(stage: any): string {
        return Object.keys(stage)[0];  // Since each object has only one key, we return the key (stage name)
    }
    
    getLogs()
    {
        this.logService.getLogs(this.subModule.module_id, (logs) => {
            this.logList = logs;
        }, this.DetailId ? this.DetailId : '',this.subModule.module_type);
    }
    
    formatAndPrintFormData(form: any) {
        const formattedObject: { [key: string]: any } = {}; // Create a new object to store formatted keys and values
        
        for (let key in form) {
            if (form.hasOwnProperty(key)) {
                const formattedKey = key
                .split('_') // Split by underscore
                .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
                .join(' '); // Join with spaces
                
                formattedObject[formattedKey] = form[key]; // Assign the original value to the new formatted key
            }
        }
        
        return formattedObject; // Return the new object with formatted keys
    }
    
    onUpdateStage(stageName: string, prevValue: boolean, checked: boolean, type: string) {
        const originalData = { [stageName]: prevValue };
        const updatedData = { [stageName]: checked };
        this.alert.confirm("Are you sure?", "You want to update stage", "Yes it!")
        .then((result) => {
            if (result.isConfirmed) {
                const payload = {
                    [type === 'stage' ? 'stage' : 'competitor']: stageName,
                    site_project_id: this.DetailId,
                    checked
                };
                const endpoint = type === 'stage' ? 'sites/save-stage' : 'sites/save-competitor';
                
                this.api.post(payload, endpoint).subscribe(result => {
                    if (result['statusCode']  ===  200) {
                        this.logService.logActivityOnUpdate(true, originalData, updatedData, this.subModule.module_id, this.subModule.title, 'update', this.DetailId || null, () => { }, this.subModule.module_type);
                        this.getDetail();
                        this.toastr.success(result['message'], '', 'toast-top-right');
                    }                        
                });
            }
        });
    }
    
    
    
    getTaskActivity() {
        this.skLoading1 = true;
        this.api.post({site_project_id : this.DetailId}, 'sites/activities').subscribe(result => {
            if (result['statusCode']  ===  200) {
                this.skLoading1 = false;
                this.taskActivity = result['data'];
            }
        });
    }
    
    editPage(event:any){
        this.router.navigate(['/apps/sfa/site/site-detail/'+ this.DetailId +'/edit']);
    }
    
    updateStatus()
    {
        const dialogRef = this.dialog.open(StatusChangeModalComponent, {
            width: '450px',
            data: {
                'lastPage':'site',
                'DetailId':this.DetailId,
                'status':this.Detail.status,
                'reason':this.Detail.reason,
                'subModule':this.subModule,
                'options':this.statusOptions,
                'apiPath':'sites/status-update',
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result === true){
                this.getDetail();
            }
        });
    }
    
    goToDetailPage()
    {
        this.alert.confirm("Comming Soon !")
        .then((result) => {
            if (result.isConfirmed) {
            }
        });
    }
    
    getTatDaysReadable(tatString: string): string {
        if (!tatString) return '--';
        
        const match = tatString.match(/(\d+)h\s*(\d+)min\s*(\d+)sec/);
        if (!match) return tatString;
        
        const hours = parseInt(match[1], 10);
        
        if (hours >= 24) {
            const days = Math.floor(hours / 24);
            return `${days} day${days > 1 ? 's' : ''}`;
        } else {
            return `${hours}h`;
        }
    }
    
    onSaveFollowup()
    {
        const payload = {
            category_type: 'Site',
            category_id: this.Detail._id,
            assigned_to_user_name: this.Detail.assigned_to_user_name,
            assigned_to_user_id: this.Detail.assigned_to_user_id,
        };
        const dialogRef = this.dialog.open(FollowUpAddComponent, {
            width: '700px',
            data: {
                'lastPage':'folloup-list',
                'enquiryType': 'add',  // Set formType based on row data
                'formData': payload || {}  // Pass the row data if it's edit
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result === true){
                this.getDetail();
            }
        });
        
    }
    
    openModal(type:string, row?:any) {
        let data ={}
        if(type == 'contact_person'){
            data = row ? row : ''
        }
        if(type == 'point_location'){
            data = {lat: row.lat , long: row.long , _id : row._id , site_project_id : row._id}
        }
        const dialogRef = this.dialog.open(SiteModalComponent, {
            width: '350px',
            panelClass: 'mat-right-modal',
            position: { right: '0px' },            
            data: {
                'pageType': type,
                'data':data,
                'DetailId':this.DetailId,
                'submodule':this.subModule,
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result === true){
                this.getDetail();
                
                if(type == 'point_location'){
                    this.loadMap();
                }
            }
        });
    }
    
    // delete funcation start //
    delete(id: string, api:string, label:string) {
        this.comanFuncation.delete(id, this.subModule, label, api, 'single_action', id).subscribe((result: boolean) => {
            if (result === true) {
                this.getDetail();
            }
        });
    }
    // delete funcation end
    
    getQuotation() {
        this.skLoading1 = true;
        this.api.post({_id : this.DetailId}, 'sites/read-quotation').subscribe(result => {
            if (result['statusCode']  ===  200) {
                this.skLoading1 = false;
                this.quotationList = result['data'];
            }
        });
    }
    
    chartOptions1:any= {
        chart: {
            height: 286,
            type: 'radialBar',
            responsive: 'true',
            offsetX: 0,
            offsetY: 15,
        },
        plotOptions: {
            radialBar: {
                startAngle: -135,
                endAngle: 135,
                size: 120,
                imageWidth: 50,
                imageHeight: 50,
                track: {
                    strokeWidth: '97%',
                    // strokeWidth: "0",
                },
                dropShadow: {
                    enabled: false,
                    top: 0,
                    left: 0,
                    bottom: 0,
                    blur: 3,
                    opacity: 0.5
                },
                dataLabels: {
                    name: {
                        fontSize: '16px',
                        color: undefined,
                        offsetY: 30,
                    },
                    hollow: {
                        size: "60%"
                    },
                    value: {
                        offsetY: -10,
                        fontSize: '22px',
                        color: undefined,
                        formatter: function (val: string) {
                            return val + "%";
                        }
                    }
                }
            }
        },
        colors: ['rgba(var(--primary-rgb))'],
        fill: {
            type: "solid",
            gradient: {
                shade: "dark",
                type: "horizontal",
                shadeIntensity: .5,
                gradientToColors: ["#5c67f7"],
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100]
            }
        },
        stroke: {
            dashArray: 3
        },
        series: [0],
        labels: ["Complete"]
    };
    
    headers_one=[
        {label:"Created By"},
        {label:"Created At"},
        {label:"Quotation Id"},
        {label:"Site Detail"},
        {label:"Customer Detail"},
        {label:"Total Item"},
        {label:"Total Qty"},
        {label:"Amount"},
        {label:"Status"},
        {label:"Note"},
    ]
    
    statusOptions = [        
        {
            name:'Win'
        },
        {
            name:'Lost'
        }
    ]
}
