import { Component, ElementRef, ViewChild } from '@angular/core';
import { SharedModule } from '../../../../../../shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { SpkReusableTablesComponent } from '../../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { SpkApexchartsComponent } from '../../../../../../../@spk/spk-apexcharts/apexcharts.component';
import { ApiService } from '../../../../../../core/services/api/api.service';
import { CommonModule } from '@angular/common';
import { LogService } from '../../../../../../core/services/log/log.service';
import { ModuleService } from '../../../../../../shared/services/module.service';
import { FormsModule } from '@angular/forms';
import { ShowcodeCardComponent } from '../../../../../../shared/components/showcode-card/showcode-card.component';
import { DateService } from '../../../../../../shared/services/date.service';
import { SpkGalleryComponent } from '../../../../../../../@spk/spk-reusable-plugins/spk-gallery/spk-gallery.component';
import { SweetAlertService } from '../../../../../../core/services/alert/sweet-alert.service';
import { MatDialog } from '@angular/material/dialog';
import { StatusChangeModalComponent } from '../../../../../../shared/components/status-change-modal/status-change-modal.component';
import { ToastrServices } from '../../../../../../shared/services/toastr.service ';
import { LogsComponent } from '../../../../../../shared/components/logs/logs.component';
import { SpkProductCardComponent } from '../../../../../../../@spk/reusable-apps/spk-product-card/spk-product-card.component';
import { MaterialModuleModule } from '../../../../../../material-module/material-module.module';
import { FollowUpAddComponent } from '../../../followup/follow-up-add/follow-up-add.component';
import { CommentsComponent } from '../../../../../../shared/components/comments/comments.component';
@Component({
    selector: 'app-enquiry-detail',
    imports: [SharedModule, SpkReusableTablesComponent,SpkApexchartsComponent,CommonModule,FormsModule,ShowcodeCardComponent,SpkProductCardComponent,LogsComponent,MaterialModuleModule,CommentsComponent],
    templateUrl: './enquiry-detail.component.html',
})
export class OzoneEnquiryDetailComponent {
    DetailId:  any;
    Detail: any;
    formattedKeysFormData: { [key: string]: any } = {};
    DetailFormData:any;
    enquiryMainStages:any = [];
    logList:any=[];
    skLoading:boolean = false
    skLoading1:boolean = false
    subModule:any = {};
    originalData:any = {};
    assignType:any  = 'upcomming';
    activeTab:any = 'Task Activity'
    taskActivity:any=[];
    accessRight:any = {};

    
    constructor(private router: Router,public route: ActivatedRoute,public api:ApiService,private logService:LogService,public moduleService: ModuleService,private dateService: DateService,public alert : SweetAlertService,public dialog:MatDialog,private toastr: ToastrServices){}
    
    ngOnInit() {
        const accessRight = this.moduleService.getAccessMap('SFA', 'Enquiry');
        if (accessRight) {
            this.accessRight = accessRight;
        }

        const subModule = this.moduleService.getSubModuleByName('SFA', 'Enquiry');
        
        if (subModule) {
            this.subModule = subModule;
        }
        
        this.route.paramMap.subscribe(params => {
            this.DetailId = params.get('id');
            
            if(this.DetailId){
                this.getEnquiryDetail();
            }
        });
    }
    
    getEnquiryDetail() {
        this.skLoading = true;
        this.api.post({_id: this.DetailId}, 'enquiry/detail').subscribe(result => {
            if (result['statusCode']  ===  200) {
                this.skLoading = false;
                this.Detail = result['data'];
                this.DetailFormData = this.Detail['form_data'];
                this.enquiryMainStages = this.Detail['stages']
                
                const completed = this.enquiryMainStages.filter((item: any) => Object.values(item)[0] === true).length;
                const total = this.enquiryMainStages.length;
                const percentage = total > 0 ? (completed / total) * 100 : 0;
                
                this.chartOptions1 = {
                    ...this.chartOptions1,
                    series: [parseFloat(percentage.toFixed(2))]
                };
                // Formating
                this.formattedKeysFormData = this.formatAndPrintFormData(this.DetailFormData);
                // Formating
                this.getLogs();
                this.getTaskActivity();
            }
        });
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
    
    onUpdateStage(stageName: string, prevValue: boolean, checked: boolean,) {
        const originalData = { [stageName]: prevValue };
        const updatedData = { [stageName]: checked };
        this.alert.confirm("Are you sure?", "You want to update stage", "Yes it!")
        .then((result) => {
            if (result.isConfirmed) {
                this.api.post({ stage: stageName, enquiry_id : this.DetailId , checked: checked}, 'enquiry/save-stage').subscribe(result => {
                    if (result['statusCode']  ===  200) {
                        this.logService.logActivityOnUpdate(true, originalData, updatedData, this.subModule.module_id, this.subModule.title, 'update', this.DetailId || null, () => { }, this.subModule.module_type);
                        this.getEnquiryDetail();
                        this.toastr.success(result['message'], '', 'toast-top-right');
                    }                        
                });
            }
        });
    }    
    
    
    
    getTaskActivity() {
        this.skLoading1 = true;
        this.api.post({enquiry_id : this.DetailId}, 'enquiry/activities').subscribe(result => {
            if (result['statusCode']  ===  200) {
                this.skLoading1 = false;
                this.taskActivity = result['data'];
            }
        });
    }
    
    editPage(event:any){
        this.router.navigate(['/apps/sfa/enquiry-list/enquiry-detail/'+ this.DetailId +'/edit']);
    }
    
    updateStatus()
    {
        const dialogRef = this.dialog.open(StatusChangeModalComponent, {
            width: '450px',
            data: {
                'lastPage':'enquiry',
                'DetailId':this.DetailId,
                'status':this.Detail.status,
                'reason':this.Detail.reason,
                'subModule':this.subModule,
                'options':this.statusOptions,
                'apiPath':'enquiry/status-update',
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result === true){
                this.getEnquiryDetail();
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
            category_type: 'Enquiry',
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
                this.getEnquiryDetail();
            }
        });
        
    }
    
    statusOptions = [
        {
            name:'Inprocess'
        },
        {
            name:'Lost'
        },
        {
            name:'Drop'
        },
        {
            name:'Junk & Close'
        },
        {
            name:'Win'
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
}
