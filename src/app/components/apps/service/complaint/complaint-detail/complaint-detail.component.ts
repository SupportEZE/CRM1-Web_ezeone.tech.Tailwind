import { Component } from '@angular/core';
import { CommentsComponent } from '../../../../../shared/components/comments/comments.component';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { LogsComponent } from '../../../../../shared/components/logs/logs.component';
import { SpkProductCardComponent } from '../../../../../../@spk/reusable-apps/spk-product-card/spk-product-card.component';
import { ShowcodeCardComponent } from '../../../../../shared/components/showcode-card/showcode-card.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SpkApexchartsComponent } from '../../../../../../@spk/spk-apexcharts/apexcharts.component';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { MatDialog } from '@angular/material/dialog';
import { SweetAlertService } from '../../../../../core/services/alert/sweet-alert.service';
import { DateService } from '../../../../../shared/services/date.service';
import { ModuleService } from '../../../../../shared/services/module.service';
import { LogService } from '../../../../../core/services/log/log.service';
import { ApiService } from '../../../../../core/services/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ComplaintModalComponent } from '../complaint-modal/complaint-modal.component';
import { ServiceInvoiceModalComponent } from '../../service-invoice/service-invoice-modal/service-invoice-modal.component';
import { CURRENCY_SYMBOLS } from '../../../../../utility/constants';
import * as L from 'leaflet';

@Component({
  selector: 'app-complaint-detail',
  imports: [
    SharedModule,
    SpkReusableTablesComponent,
    SpkApexchartsComponent,
    CommonModule,
    FormsModule,
    ShowcodeCardComponent,
    SpkProductCardComponent,
    LogsComponent,
    MaterialModuleModule,
    CommentsComponent],
    templateUrl: './complaint-detail.component.html',
    styleUrl: './complaint-detail.component.scss'
  })
  export class ComplaintDetailComponent {
    CURRENCY_SYMBOLS = CURRENCY_SYMBOLS
    DetailId:  any;
    Detail: any;
    formattedKeysFormData: { [key: string]: any } = {};
    DetailFormData:any;
    complaintMainStages:any = [];
    visitDetails:any = [];
    invoiceDetails:any = [];
    complaintImages:any = [];
    inspectionDetails:any = {};
    logList:any=[];
    skLoading:boolean = false
    skLoading1:boolean = false
    subModule:any = {};
    originalData:any = {};
    assignType:any  = 'upcomming';
    activeTab:any = 'Visit Activity'
    taskActivity:any=[];
    accessRight:any = {};
    zoom = 3;
    map: any;
    myMap: any;
    latitude: number = 0;
    longitude: number = 0;
    
    statusOptions = [
      {
        name:'Close'
      },
      {
        name:'Cancel'
      },
    ]
    
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
      {label:"Product Description", table_class:''},
      {label:"Total Qty", table_class:'text-right'},
      {label:"Amount", table_class:'text-right'},
    ]
    
    
    constructor(
      private router: Router,
      public route: ActivatedRoute,
      public api:ApiService,
      private logService:LogService,
      public moduleService: ModuleService,
      private dateService: DateService,
      public alert : SweetAlertService,
      public dialog:MatDialog,
      private toastr: ToastrServices
    ) {}
    
    ngOnInit() {
      const accessRight = this.moduleService.getAccessMap('WCMS', 'Complaint');
      if (accessRight) {
        this.accessRight = accessRight;
      }
      
      const subModule = this.moduleService.getSubModuleByName('WCMS', 'Complaint');
      
      if (subModule) {
        this.subModule = subModule;
      }
      
      this.route.paramMap.subscribe(params => {
        this.DetailId = params.get('id');
        
        if(this.DetailId){
          this.getComplaintDetail();
        }
      });
    }
    
    getComplaintDetail() {
      this.skLoading = true;
      this.api.post({_id: this.DetailId}, 'complaint/detail').subscribe(result => {
        if (result['statusCode']  ===  200) {
          this.skLoading = false;
          this.Detail = result['data'];
          this.visitDetails = this.Detail['visit_details'] || [];
          this.invoiceDetails = this.Detail['invoice_details'] || {};
          this.inspectionDetails = this.Detail['inspection_details'] || {};
          this.complaintImages = this.Detail['complaint_images'] || {};
          this.logService.getLogs(this.subModule.module_id, (logs) => {
            this.logList = logs;
          },this.DetailId ? this.DetailId : '',this.subModule.module_type);
          this.getLogs();
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
    
    editPage(event:any){
      this.router.navigate(['/apps/sfa/complaint/complaint-detail/'+ this.DetailId +'/edit']);
    }
    
    addInvoice(complaint: any) {
      const dialogRef = this.dialog.open(ServiceInvoiceModalComponent, {
        width: '850px',
        data: {
          'lastPage':'complaint-detail',
          complaint_id: this.Detail._id,
          service_engineer_id: this.Detail.service_engineer_id,
          customer_mobile: this.Detail.customer_mobile,
          customer_name: this.Detail.customer_name,
          address: this.Detail.address
        }
      });
      
      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.getComplaintDetail();
        }
      });
    }
    
    openModal(type:string, row?:any) {
      let data ={}
      data = {lat: row.lat , long: row.long , _id : row._id , complaint_id : row._id}
      const dialogRef = this.dialog.open(ComplaintModalComponent, {
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
          this.getComplaintDetail();
          this.loadMap();
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
    
    updateStatus()
    {
      const dialogRef = this.dialog.open(ComplaintModalComponent, {
        width: '450px',
        data: {
          'lastPage':'complaint',
          'DetailId':this.DetailId,
          'subModule':this.subModule,
          'options':this.statusOptions,
          'apiPath':'complaint/status-update',
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result === true){
          this.getComplaintDetail();
        }
      });
    }
    
  }
  