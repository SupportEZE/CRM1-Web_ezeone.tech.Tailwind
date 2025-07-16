import { CommonModule } from '@angular/common';
import { Component, Inject, Input, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import {FormGroup, FormsModule } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared.module';
import { SortablejsModule } from '@maksim_m/ngx-sortablejs';
import { ApiService } from '../../../../../core/services/api/api.service';
import { SweetAlertService } from '../../../../../core/services/alert/sweet-alert.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { DateService } from '../../../../../shared/services/date.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LeaveModalComponent } from '../leave-modal/leave-modal.component';
import { FORMIDCONFIG } from '../../../../../../config/formId.config';
import { ModuleService } from '../../../../../shared/services/module.service';
import { FormFieldTypes } from '../../../../../utility/constants';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import { ModalsComponent } from '../../../../../shared/components/modals/modals.component';
import { UtilService } from '../../../../../utility/util.service';
import { CommonApiService } from '../../../../../shared/services/common-api.service';
@Component({
    selector: 'app-leave-list',
    standalone: true,
    imports: [SharedModule,MaterialModuleModule,CommonModule,RouterModule,SpkReusableTablesComponent,FormsModule,SortablejsModule,],
    templateUrl: './leave-list.component.html'
})
export class LeaveListComponent {
    @ViewChild('reusableTable') reusableTable!: any;
    filter:any ={};
    listColumns : any = [];
    skLoading:boolean = false;
    view: any;
    readonly fieldTypes = FormFieldTypes;
    onClick1(event:any){
        if (event) {
        }
    }
    originalFormFields: any[] = []; // Store API response separately
    formGroup: FormGroup = new FormGroup({});
    @Input() formFields: any[] = [];
    public disabled: boolean = false;
    page: number = 1;
    moduleFormId:number =0;
    moduleTableId:number =0;
    FORMID:any= FORMIDCONFIG;
    sorting: any = {};
    subModule:any;
    accessRight:any = {};
    
    constructor(private toastr: ToastrServices, public dialog:MatDialog,public api:ApiService, public alert : SweetAlertService, private dateService: DateService, public moduleService: ModuleService, public comanFuncation: ComanFuncationService,public util:UtilService, public CommonApiService: CommonApiService) {
    }
    
    ngOnInit() {
        const accessRight = this.moduleService.getAccessMap('Masters', 'Leave Policy');
        if (accessRight) {
            this.accessRight = accessRight;
        }
        const subModule = this.moduleService.getSubModuleByName('Masters', 'Leave Policy');
        const form = this.moduleService.getFormById('Masters', 'Leave Policy', this.FORMID.ID['LeaveMasterForm']);
        const tableId = this.moduleService.getTableById('Masters', 'Leave Policy', this.FORMID.ID['LeaveMasterTable']);
        
        if (subModule) {
            this.subModule = subModule;
        }
        if (form) {
            this.moduleFormId = form.form_id;
        }
        if (tableId) {
            this.moduleTableId = tableId.table_id;
        }
        
        this.getHeaderConfigListing();
        this.getFormData()
    }
    
    onRefresh()
    {
        this.filter = {};
        this.reusableTable.clearSearchInputs();
        this.getHeaderConfigListing();
    }
    
    //---------Leave Listing----------//
    
    tableConfigData:any = {};
    visibleHeaders:any = [];
    getHeaderConfigListing() {
        this.CommonApiService.getHeaderConfigListing(this.moduleTableId, this.moduleFormId).subscribe((result: any) => {
            this.tableConfigData = result.data.table_data;
            const allHeaders = this.tableConfigData['tableHead'];
            
            // --------- For columns filter in listing//
            this.visibleHeaders = allHeaders.filter((header: any) => header.list_view_checked);
            this.getList();
            // ---------//
        });
    }
    
    leaveListing:any = [];
    
    getList() {
        this.skLoading = true;
        this.api.post({filters: this.filter, sorting: this.sorting, 'page': this.page}, 'leave/read').subscribe(result => {
            if (result['statusCode']  ===  200) {
                this.skLoading = false;
                this.leaveListing = result['data'];
                // this.leaveListing = this.dateService.formatDatesInArray(this.leaveListing);
            }
        });
    }
    
    trackByFn(index: number, item: any): number {
        return item.id; // Ensure this is unique
    }
    
    // -------- Sorting//
    onSortChanged(event: { field: string; order: number }) {
        this.sorting = {};
        this.sorting[event.field] = event.order;
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
    
    handleDateChange(event: { [key: string]: { selectedDate:string } }) {
        this.filter = event;
        this.getList();
    }
    
    // delete funcation start //
    delete(id: string, api:string, label:string) {
        this.comanFuncation.delete(id, this.subModule, label, api, 'single_action', id,).subscribe((result: boolean) => {
            if (result === true) {
                this.getList();
            }
        });
    }
    // delete funcation end
    
    updateLeaveWiseLeave(row?: any) {
        const dialogRef = this.dialog.open(LeaveModalComponent, {
            width: '768px',
            data: {
                'lastPage':'leave-add',
                'formType': row ? 'edit' : 'add',
                'formData': row || {}
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result === true){
                this.getHeaderConfigListing();
            }
        });
    }
    
    
    // ***** List Logs Modal Start *****//
    openMainLogModal(row_id:string) {
        this.comanFuncation.listLogsModal(this.subModule.sub_module_id, row_id, this.subModule.module_type).subscribe(result => {
        });
    }
    // ***** List Logs Modal End *****//
    
    
    //--------Leave Listing---------//
    
    getFormData(){
        this.skLoading = true;
        this.api.post({"form_id":this.moduleFormId, 'platform':'web'}, 'form-builder/read').subscribe(result => {
            if(result['statusCode'] == 200){
                if (result?.data?.form_data) {
                    this.originalFormFields = JSON.parse(JSON.stringify(result.data.form_data));
                }
                this.formFields = result['data']['form_data'];
                this.skLoading = false;
                this.formFields.forEach((feild:any) => {
                    this.util.createValidation(feild);
                });
            }
        });
    }
    
    openModal(event: any) {
        const dialogRef = this.dialog.open(ModalsComponent, {
            // width: '1024px',
            data: {
                'lastPage': 'leave-master',
                'form_Fields': this.originalFormFields,
                'moduleFormId': this.moduleFormId,
                "moduleId": this.subModule.sub_module_id,
                "moduleName": this.subModule.title,
                "module_type": this.subModule.module_type
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.getHeaderConfigListing();
            }
        });
    }

    openHeaderSettingModal() {
        this.getHeaderConfigListing();
        const dialogRef = this.dialog.open(ModalsComponent, {
            width: '450px',
            panelClass: 'mat-right-modal',
            position: { right: '0px' },
            data: {
                'lastPage': 'header-config',
                'moduleFormId':this.moduleFormId,
                'moduleTableId':this.moduleTableId,
                'moduleName':this.subModule.title,
                "tableConfigData": this.tableConfigData,
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result === true){
                this.getHeaderConfigListing();
            }
        });
    }
}

