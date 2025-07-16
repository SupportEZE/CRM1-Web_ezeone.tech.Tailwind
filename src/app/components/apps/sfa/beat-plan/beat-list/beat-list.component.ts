import { Component } from '@angular/core';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from '../../../../../shared/shared.module';
import { ApiService } from '../../../../../core/services/api/api.service';
import { SweetAlertService } from '../../../../../core/services/alert/sweet-alert.service';
import { DateService } from '../../../../../shared/services/date.service';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { ModuleService } from '../../../../../shared/services/module.service';
import { CommonModule } from '@angular/common';
import { FORMIDCONFIG } from '../../../../../../config/formId.config';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { SpkApexchartsComponent } from '../../../../../../@spk/spk-apexcharts/apexcharts.component';
import { MatDialog } from '@angular/material/dialog';
import { BeatDetailInfoComponent } from '../../../log-modal/info-modal/beat-detail-info/beat-detail-info.component';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';

@Component({
    selector: 'app-beat-list',
    imports: [
        SharedModule,
        RouterModule,
        SpkReusableTablesComponent,
        CommonModule,
        MaterialModuleModule,
        FormsModule,
        SpkApexchartsComponent
    ],
    templateUrl: './beat-list.component.html',
})
export class BeatListComponent {
    DATA:any = {};
    invoices=this.DATA
    pagination:any = {}
    filter:any ={};
    skLoading:boolean = false;
    beatMasterList:any=[];
    beatCountList:any={};
    FORMID:any= FORMIDCONFIG;
    moduleFormId:number =0;
    moduleId:number=0
    submoduleId:any ={}
    page: number = 1;
    beat_code: any;
    accessRight:any = {};
    filterForm!: FormGroup;
    inputValue:any;
    
    
    constructor(
        public api: ApiService, 
        public alert : SweetAlertService,
        private router: Router,
        private dateService: DateService,
        private toastr: ToastrServices,
        public moduleService: ModuleService,
        public dialog:MatDialog,
        private fb: FormBuilder,
        private comanFuncation:ComanFuncationService
    ){
        this.filterForm = this.fb.group({
            input_value: [null]
        });
    }
    
    ngOnInit() {
        const accessRight = this.moduleService.getAccessMap('SFA', 'Beat plan');
        if (accessRight) {
            this.accessRight = accessRight;
        }
        const subModule = this.moduleService.getSubModuleByName('SFA', 'Beat plan');
        const form = this.moduleService.getFormById('SFA', 'Beat plan', this.FORMID.ID['BeatList']);
        if (subModule) {
            this.submoduleId = subModule;
            // this.submoduleId.sub_module_id = this.submoduleId.module_id
        }
        if (form) {
            this.moduleFormId = form.form_id;
        }
        this.getBeatList();
        
    }
    
    click(id:string){
        const data = this.invoices.filter((x: { Price: string }) => {
            return x.Price != id;
            
        })
        this.invoices = data;
    }
    invoiceColumn=[
        {label:"S.No",field:"S.No"},
        {label:"User Details",field:"User Details"},
        {label:"Reporting Manager",field:"Reporting Manager"},
        {label:"Beat Date",field:"Beat Date"},
        {label:"Beat Detail",field:"Beat Detail"},
        {label:"Primary Customer",field:"Primary Customer"},
        {label:"Secondary Customer",field:"Secondary Customer"},
        // {label:"Action",field:"Action"},
    ]
    
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
    
    getBeatList() {
        const page = this.pagination.cur_page;
        if(this.filter.date){
            this.filter.date = this.dateService.formatToYYYYMMDD(this.filter.date);
        }
        
        this.skLoading = true;
        this.api.post({filters: this.filter}, 'beat/read').subscribe(result => {
            if (result['statusCode'] == 200) {
                this.skLoading = false;
                this.beatMasterList = result['data'];
                this.pagination = result['pagination'];
                this.getBeatCount();
            }
        });
    }
    
    getBeatCount() {
        this.skLoading = true;
        this.api.post({}, 'beat/read-count').subscribe(result => {
            if (result['statusCode'] == 200) {
                this.skLoading = false;
                this.beatCountList = result['data'];
            }
        });
    }
    
    
    onRefresh()
    {
        this.filter = {};
        this.getBeatList();
    }
    
    goToBeatAdd() {
        this.router.navigate(['/apps/sfa/beat-list/beat-add']);
    }
    
    changeToPagination(btnType: string) {
        if (btnType == 'Previous') {
            if (this.pagination.prev && this.page > 1) {
                this.page--;  // Decrement the page number
                this.getBeatList();
            }
        }
        else
        {
            if (this.pagination.next) {
                this.page++;  // Increment the page number
                this.getBeatList();
            }
        }
    }
    
    changeToPage(newPage: number) {
        this.page = newPage;
        this.pagination.cur_page = newPage;
        this.getBeatList();
    }
    
    openModal(beat_code: any , user_id: string) {
        const dialogRef = this.dialog.open(BeatDetailInfoComponent, {
            width: '650px',
            data: {
                'lastPage':'beat-list',
                'beat_code': beat_code || null, // Pass the row data if it's edit
                'user_id': user_id
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result === true){
                this.getBeatList();
            }
        });
    }
    
    delete(id: string, api: string, label: string) {
        this.comanFuncation.delete(id, this.submoduleId, label, api, 'single_action', id).subscribe((result: boolean) => {
            if (result === true) {
                this.getBeatList();
            }
        });
    }
    
    
    valueChange(event: any): void {
        this.inputValue = event;
    }
    
    saveBeatTarget(){
        if (!this.inputValue){
            this.toastr.error('Enter Target Value', '', 'toast-top-right');
            return
        }
        this.alert.confirm("Are you sure?", "You want to update target", "Yes it!").then(result => {
            if (result.isConfirmed) {
                this.api.disabled = true;
                this.api.post({ 'target_value': this.inputValue}, 'beat/update-beat-target').subscribe(result => {
                    if (result['statusCode'] === 200) {
                        this.api.disabled = false;
                        this.toastr.success(result['message'], '', 'toast-top-right');
                    }
                });
            }
            if (result.isDismissed){
                this.api.disabled = false;
            }
        })
        
    }
}
