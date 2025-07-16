import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { Validators } from 'ngx-editor';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import jsonDoc from '../../../../../shared/data/editor';
import { MatDialog } from '@angular/material/dialog';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { ApiService } from '../../../../../core/services/api/api.service';
import { LocationMasterAddComponent } from '../location-master-add/location-master-add.component';
import { SweetAlertService } from '../../../../../core/services/alert/sweet-alert.service';
import Swal from 'sweetalert2';
import { ShowcodeCardComponent } from '../../../../../shared/components/showcode-card/showcode-card.component';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { LogService } from '../../../../../core/services/log/log.service';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import { ModuleService } from '../../../../../shared/services/module.service';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { BeatRouteModalComponent } from '../beat-route-modal/beat-route-modal.component';

@Component({
    selector: 'app-location-master-list',
    standalone: true,
    imports: [SharedModule, ReactiveFormsModule, CommonModule, SpkReusableTablesComponent, FormsModule, ShowcodeCardComponent, MaterialModuleModule],
    templateUrl: './location-master-list.component.html'
})
export class LocationMasterListComponent {
    activeTab:any ='Pincode';
    skLoading:boolean = false
    pincodeMasterList:any=[];
    zoneMasterList:any=[];
    beatRouteMasterList:any=[];
    listingPagination:any = {}
    filter:any = {};
    accessRight:any = {};
    subModule:any={};
    
    constructor(public dialog: MatDialog, public api: ApiService, public alert : SweetAlertService, private logService: LogService, public comanFuncation: ComanFuncationService,public moduleService: ModuleService,public toastr: ToastrServices){}
    
    fileNavItems = [
        { name: 'Pincode', icon: 'ri-map-pin-line', active: true, tooltipLabel: 'Add Pincode'},
        { name: 'Zone', icon: 'ri-global-line', tooltipLabel: 'Add Zone'},
        { name: 'Beat Route', icon: 'ri-road-map-line', tooltipLabel: 'Add Beat Route'},
    ];
    
    ngOnInit() {
        const accessRight = this.moduleService.getAccessMap('Masters', 'Location Master');
        if (accessRight) {
            this.accessRight = accessRight;
        }
        
        const modules = this.moduleService.getSubModuleByName('Masters', 'Location Master');
        if (modules) {
            this.subModule = modules;
        }
                
        this.getPincodeMaster();
    }
    
    onRefresh(activeTab:string)
    {
        this.filter = {};
        if (activeTab == 'Pincode') {
            this.getPincodeMaster();
        }
        if (activeTab == 'Zone') {
            this.getZoneMaster();
        }
        if (activeTab == 'Beat Route') {
            this.getBeatRouteMaster();
        }
    }
    
    getNavData(activeTab:string)
    {
        this.filter = {};
        this.page = 1;
        this.listingPagination.cur_page = 1;
        if (activeTab == 'Pincode') {
            this.getPincodeMaster();
        }
        if (activeTab == 'Zone') {
            this.getZoneMaster();
        }
        if (activeTab == 'Beat Route') {
            this.getBeatRouteMaster();
        }
    }
    
    form = new FormGroup({
        editorLocation: new FormControl(
            { value: jsonDoc, disabled: false },
            Validators.required()
        ),
    });
    
    
    // ------------Pincode Master-------------- //
    trackById(index: number, item: any) {
        return item.id; // Unique identifier for each item
    }
    
    listColumns=[
        {label:"S.No",field:"S.No"},
        // {label:"Country",field:"Country"},
        {label:"State",field:"State"},
        {label:"District",field:"District"},
        {label:"City",field:"City"},
        {label:"Pincode",field:"Pincode"},
        {label:"Action",field:"Action"},
    ]
    
    
    getPincodeMaster()
    {
        const page = this.listingPagination.cur_page;
        this.skLoading = true;
        this.api.post({filters: this.filter, page}, 'postal-code/read').subscribe(result => {
            if(result['statusCode'] == 200){
                this.skLoading = false;
                this.pincodeMasterList = result['data'];
                this.listingPagination = result['pagination'];             
            }
        });
    }
    
    onDeleteRow(rowId: any , activeTab:string) {
        this.alert.confirm("Are you sure?")
        .then((result) => {
            if (result.isConfirmed) {
                let deleteEndpoint = '';
                switch (activeTab) {
                    case 'Pincode': deleteEndpoint = 'postal-code/delete'; break;
                    case 'Zone': deleteEndpoint = 'zone-master/delete'; break;
                    case 'Beat Route': deleteEndpoint = 'beat-route/delete'; break;
                    default: return;
                }
                this.api.patch({ _id: rowId, is_delete: 1}, deleteEndpoint).subscribe(result => {
                    if (result['statusCode']  ===  200) {
                        this.logService.logActivityOnDelete(this.subModule.module_id, this.subModule.title, 'delete', rowId, activeTab, this.subModule.module_type);
                        
                        Swal.fire('Deleted!', result.message, 'success');
                        if (activeTab == 'Pincode') {
                            this.getPincodeMaster();
                        }
                        if (activeTab == 'Zone') {
                            this.getPincodeMaster();
                        }
                        if (activeTab == 'Beat Route') {
                            this.getBeatRouteMaster();
                        }
                    }                        
                });
            }
        });
    }    
    // ------------Pincode Master-------------- //
    
    
    onUpdate(activeTab:string, row: any) {
        this.openModal(activeTab, row);
    }
    
    openModal(activeTab:string,row?: any) {
        const dialogRef = this.dialog.open(LocationMasterAddComponent, {
            width: '350px',
            panelClass: 'mat-right-modal',
            position: { right: '0px' },
            data: {
                'lastPage':activeTab,
                'formType': row ? 'edit' : 'create',  // Set formType based on row data
                'formData': row || {}  // Pass the row data if it's edit
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result === true){
                if (activeTab == 'Pincode') {
                    this.getPincodeMaster();
                }
                if (activeTab == 'Zone') {
                    this.getZoneMaster();
                }
                if (activeTab == 'Beat Route') {
                    this.getBeatRouteMaster();
                }
            }
        });
    }
    
    
    
    
    // -------- Pagination//
    page: number = 1;
    
    
    changeToPage(page: number) {
        this.listingPagination.cur_page = page; 
        this.getPincodeMaster(); // API call with the updated page
    }
    
    changeToPagination(action: string) {
        if (action === 'Next' && this.listingPagination.cur_page < this.listingPagination.total_pages) {
            this.listingPagination.cur_page++;
        } else if (action === 'Previous' && this.listingPagination.cur_page > 1) {
            this.listingPagination.cur_page--;
        }
        this.getPincodeMaster(); 
    }
    // -------- Pagination//
    
    
    // ------------Zone Master-------------- //    
    zoneColumns=[
        {label:"S.No",field:"S.No"},
        {label:"Zone",field:"Zone"},
        {label:"State",field:"State"},
        {label:"Action",field:"Action"},
    ]
    
    getZoneMaster()
    {
        const page = this.listingPagination.cur_page;
        this.skLoading = true;
        if (this.filter.state && !Array.isArray(this.filter.state)) {
            this.filter.state = [this.filter.state];
        }
        this.api.post({filters: this.filter, page}, 'zone-master/read').subscribe(result => {
            if(result['statusCode'] == 200){
                this.skLoading = false;
                this.zoneMasterList = result['data'];
                this.listingPagination = result['pagination'];            
            }
        });
    }
    // ------------Zone Master-------------- //
    
    
    // ------------Beat Route Master-------------- //
    beatRouteColumns=[
        {label: ''},
        {label:"S.No", table_class: 'text-center'},
        {label:"State"},
        {label:"District"},
        {label:"Beat Code"},
        {label:"Users"},
        {label:"Description"},
        {label:"Action"},
    ]
    
    sampleUsers = [
        {label: 'Admin' },
        {label: 'Manager' },
        {label: 'Field User' },
        {label: 'Support Staff' },
        {label: 'Viewer' }
    ];
    
    getBeatRouteMaster()
    {
        const page = this.listingPagination.cur_page;
        this.skLoading = true;
        if (this.filter.state && !Array.isArray(this.filter.state)) {
            this.filter.state = [this.filter.state];
        }
        this.api.post({filters: this.filter, page}, 'beat-route/read').subscribe(result => {
            if(result['statusCode'] == 200){
                this.skLoading = false;
                this.beatRouteMasterList = result['data'];
                this.listingPagination = result['pagination'];             
            }
        });
    }
    
    showChangeStatusBtn: boolean = false;
    
    toggleRowChecked() {
        this.showChangeStatusBtn = this.beatRouteMasterList.some((r:any) => r.checked);
    }
    
    onAssignTeam() {
        const selectedRows = this.beatRouteMasterList.filter((row: any) => row.checked).map((row: any) => (row.beat_route_code));
        
        if (selectedRows.length === 0) {
            this.toastr.error('Please select at least one row.', '', 'toast-top-right');
            return;
        }
        
        const dialogRef = this.dialog.open(BeatRouteModalComponent, {
            width: '400px',
            data: {
                'selectedRows' : selectedRows
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result === true){
                this.showChangeStatusBtn = false;
                this.getBeatRouteMaster();
            }
        });
    }
    
    onRemoveAssigning(row:any, user_id:string) {
        this.alert.confirm("Are you sure?", "You want to remove this assigning ", "Yes it!")
        .then((result) => {
            if (result.isConfirmed) {
                this.api.patch({ beat_route_code: row.beat_route_code, user_id : user_id}, 'beat-route/unassign-beat').subscribe(result => {
                    if (result['statusCode']  ===  200) {
                        this.logService.logActivityOnDelete(this.subModule.module_id, this.subModule.title, 'delete', row._id , 'Unassign User' , this.subModule.module_type);
                        this.getBeatRouteMaster();
                        this.toastr.success(result['message'], '', 'toast-top-right');
                    }                        
                });
            }
        });
    }
    // ------------Beat Route Master-------------- //
    
    // ***** List Logs Modal Start *****//
    openMainLogModal(row_id: string) {
        this.comanFuncation.listLogsModal(this.subModule.module_id, row_id, this.subModule.module_type).subscribe(result => {
            if(result === true){
                if (this.activeTab == 'Pincode') {
                    this.getPincodeMaster();
                }
                if (this.activeTab == 'Zone') {
                    this.getZoneMaster();
                }
                if (this.activeTab == 'Beat Route') {
                    this.getBeatRouteMaster();
                }
            }
        });
    }
    
    // ***** List Logs Modal End *****//
    
}
