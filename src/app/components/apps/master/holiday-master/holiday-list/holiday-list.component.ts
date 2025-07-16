import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import {FormsModule } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared.module';
import { SortablejsModule } from '@maksim_m/ngx-sortablejs';
import { ApiService } from '../../../../../core/services/api/api.service';
import { SweetAlertService } from '../../../../../core/services/alert/sweet-alert.service';
import Swal from 'sweetalert2';
import { HolidayAddComponent } from '../holiday-add/holiday-add.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { DateService } from '../../../../../shared/services/date.service';
import { ModuleService } from '../../../../../shared/services/module.service';

@Component({
    selector: 'app-holiday-list',
    standalone: true,
    imports: [SharedModule,MaterialModuleModule,CommonModule,RouterModule,SpkReusableTablesComponent,FormsModule,SortablejsModule,],
    templateUrl: './holiday-list.component.html'
})
export class HolidayListComponent {
    filter:any ={};
    skLoading:boolean = false;
    onClick1(event:any){
        if (event) {
        }
    }
    
    public disabled: boolean = false;
    productModule:any = [];
    holidayList:any = [];
    pagination:any = {}
    accessRight:any = {};
    
    constructor(private toastr: ToastrServices, public dialog:MatDialog,public api:ApiService, public alert : SweetAlertService, private dateService: DateService,public moduleService: ModuleService) {
    }
    
    ngOnInit() {
        const accessRight = this.moduleService.getAccessMap('Masters', 'Holidays');
        if (accessRight) {
            this.accessRight = accessRight;
        }

        this.getList(); // Fetch roles on component initialization
    }

    onRefresh()
    {
        this.filter ={}
        this.getList();
    }
    
    listColumns=[
        {label:"Date",field:"Date"},
        {label:"Day",field:"Day"},
        {label:"Holiday Type",field:"Holiday Type"},
        {label:"Holiday Name",field:"Holiday Name"},
        {label:"Month",field:"Month"},
        {label:"Year",field:"Year"},
        {label:"Region",field:"Region"},
    ]
    
    onDateChange(type: 'start' | 'end', event: any) {
        if (type === 'start') {
            this.filter.start_date = event;
        } else {
            this.filter.end_date = event;
        }
        
        if(this.filter.start_date && this.filter.end_date){
            this.getList();
        }
    }
    
    getList() {
        
        if(this.filter.start_date && this.filter.end_date){
            const startDate = this.filter.start_date ? this.dateService.formatToYYYYMMDD(this.filter.start_date) : null;
            const endDate = this.filter.end_date ? this.dateService.formatToYYYYMMDD(this.filter.end_date) : null;
            this.filter.holiday_date = {
                start_date: startDate,
                end_date: endDate
            };
        }
        
        
        if (this.filter.regional_state && !Array.isArray(this.filter.regional_state)) {
            this.filter.regional_state = [this.filter.regional_state];
        }
        this.skLoading = true;
        this.api.post({ 'filters': this.filter, 'page': this.pagination.cur_page ?? 1}, 'holiday/read').subscribe(result => {
            if (result['statusCode']  ===  200) {
                this.skLoading = false;
                this.holidayList = result['data'];
                this.pagination = result['pagination'];
            }
        });
    }
    
    trackByFn(index: number, item: any): number {
        return item.id; // Ensure this is unique
    }
    
    // -------- Sorting//
    
    // --------//
    
    // -------- Pagination//
    changeToPagination(btnType: string) {
        if (btnType == 'Previous') {
            if (this.pagination.prev && this.pagination.cur_page > 1) {
                this.pagination.cur_page--;  // Decrement the page number
                this.getList();
            }
        }
        else
        {
            if (this.pagination.next) {
                this.pagination.cur_page++;  // Increment the page number
                this.getList();
            }
        }
    }
    
    openModal() {
        const dialogRef = this.dialog.open(HolidayAddComponent, {
            width: '768px',
            data: {
                'lastPage':'product',
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result === true){
                this.getList();
            }
        });
    }
    
    deleteRow(id:string){
        this.alert.confirm("Are you sure?")
        .then(result => {
            if (result.isConfirmed) {
                this.api.patch({ _id: id, is_delete: 1}, 'holiday/delete').subscribe(result => {
                    if (result['statusCode']  ===  200) {
                        this.toastr.success(result['message'], '', 'toast-top-right');
                        this.getList();
                    }                        
                });
            }
        });
    }
}

