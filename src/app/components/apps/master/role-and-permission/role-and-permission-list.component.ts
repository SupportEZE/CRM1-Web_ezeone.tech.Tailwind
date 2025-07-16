import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Optional } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SpkReusableTablesComponent } from '../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import {FormsModule} from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { SortablejsModule } from '@maksim_m/ngx-sortablejs';
import { ToastrModule} from 'ngx-toastr';
import { ApiService } from '../../../../core/services/api/api.service';
import { FORMIDCONFIG } from '../../../../../config/formId.config';
import { ModalsComponent } from '../../../../shared/components/modals/modals.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrServices } from '../../../../shared/services/toastr.service ';
import { SweetAlertService } from '../../../../core/services/alert/sweet-alert.service';
import { MaterialModuleModule } from '../../../../material-module/material-module.module';
import { ModuleService } from '../../../../shared/services/module.service';
import { LogService } from '../../../../core/services/log/log.service';
import { LogsComponent } from '../../../../shared/components/logs/logs.component';

interface Module {
    module_name: string;
    parent_module_name?: string; // Optional, if it can be undefined
    checked?: boolean[]; // Adjust according to your needs
}
@Component({
    selector: 'app-role-and-permission-list',
    standalone: true,
    imports: [SharedModule,CommonModule,RouterModule,SpkReusableTablesComponent,FormsModule,SortablejsModule,ToastrModule,MaterialModuleModule, LogsComponent],
    templateUrl: './role-and-permission-list.component.html',
})



export class RoleAndPermissionListComponent {
    
    public disabled: boolean = false;
    sorting: any = {};
    selectedField: string = '';
    isModalOpen: boolean = false;
    range: any;
    skLoading:boolean = false
    FORMID:any= FORMIDCONFIG;
    selectedChoices = [];
    allModulesData:any = [];  
    mastersModule:any = {};
    productModule:any = [];
    module_table:any = {};
    module_form:any = {};
    roleListArray:any=[];
    filter: any = {};
    data: any = {};
    selectedRole: any = null;
    assign_module_data = [];
    search_key: string = '';
    moduleListing: any[] = [];
    currentUserPermissions: string[] = [];
    logList:any =[]
    subModule:any={};
    moduleType:any;
    accessRight:any = {};
    
    constructor(private toastr: ToastrServices, public api: ApiService, public dialog:MatDialog,private cd: ChangeDetectorRef,public alert: SweetAlertService,public moduleService: ModuleService,private logService: LogService) {
    }
    
    ngOnInit() {
        const accessRight = this.moduleService.getAccessMap('Masters', 'Roles & Permission');
        if (accessRight) {
            this.accessRight = accessRight;
        }
        
        const subModule = this.moduleService.getSubModuleByName('Masters', 'Roles & Permission');
        
        if (subModule) {
            this.subModule = subModule;
        }
        
        this.getRoleList(); // Fetch roles on component initialization
    }
    
    readMore: boolean[] = [];
    toggleReadMore(index: number) {
        this.readMore[index] = !this.readMore[index]; // Toggle the specific item's state
    }
    
    isContentOverflowed(element: HTMLElement): boolean {
        const lineHeight = parseFloat(window.getComputedStyle(element).lineHeight);
        const maxLines = 2;
        return element.scrollHeight > lineHeight * maxLines;
    }
    
    onRefresh()
    {
        this.search_key = '';
        this.getModuleListRoleWise();
    }
    
    isAccessDisabled(list: any, column: string): boolean {
        return list.default_access[column] === "disable"; // Disable checkbox if value is "disable"
    }
    
    getDefaultAccessValue(list: any, column: string): boolean {
        return list.permission_access[column] === true;
    }
    
    modifiedIndexes: Set<number> = new Set();
    updatePermission(list: any, column: string, event: Event) {
        const input = event.target as HTMLInputElement;
        list.permission_access[column] = input.checked;
        
        const index = this.moduleListing.findIndex(item => item.id === list.id);
        if (index !== -1) {
            this.modifiedIndexes.add(index);
        }
    }
    
    toggleSelectAll(column: string) {
        const allChecked = this.moduleListing
        .filter(list => list?.default_access?.[column] !== 'disable' && list?.permission_access)
        .every(list => list.permission_access[column] === true);
        
        this.moduleListing.forEach(list => {
            if (list?.default_access?.[column] !== 'disable' && list?.permission_access) {
                list.permission_access[column] = !allChecked;
            }
        });
    }
    
    allSelected(column: string): boolean {
        const relevant = this.moduleListing
        .filter(list => list?.default_access?.[column] !== 'disable' && list?.permission_access);
        
        return relevant.length > 0 && relevant.every(list => list.permission_access[column] === true);
    }
    
    
    listColumns=[
        {label:"S.No"},
        {label:"Module"},
        {label:"Add", table_class:'text-center'},
        {label:"Approve", table_class:'text-center'},
        {label:"Delete", table_class:'text-center'},
        {label:"Export", table_class:'text-center'},
        {label:"Import", table_class:'text-center'},
        {label:"Modify", table_class:'text-center'},
        {label:"View", table_class:'text-center'},
    ]
    
    
    
    getRoleList(){
        this.api.post({}, 'rbac/read').subscribe(result => {
            if(result['statusCode'] == 200){
                this.roleListArray = result['data'];
                if (this.roleListArray.length > 0) {
                    this.data.selectedRole = this.roleListArray[0]._id;
                    this.getModuleListRoleWise();
                }
            }
        });
    }
    
    getModuleListRoleWise()
    {
        this.skLoading = true;
        this.api.post({search_key: this.search_key, user_role_id: this.data.selectedRole}, 'rbac/read-modules').subscribe(result => {
            if(result['statusCode'] == 200){
                this.skLoading = false;
                this.moduleListing = result['data'];
                this.originalData = JSON.parse(JSON.stringify(this.moduleListing));
                
                this.logService.getLogs(this.subModule.sub_module_id, (logs) => {
                    this.logList = logs;
                },'',this.subModule.module_type);
                this.cd.detectChanges();
            }
        });
    }
    
    getChangedData(): {
        [moduleName: string]: {
            old: { permission_access: any };
            new: { permission_access: any };
        };
    } {
        const changedData: {
            [moduleName: string]: {
                old: { permission_access: any };
                new: { permission_access: any };
            };
        } = {};

        for (let i = 0; i < this.moduleListing.length; i++) {
            const current = this.moduleListing[i];
            const original = this.originalData[i];

            const currentPerms = current.permission_access || {};
            const originalPerms = original.permission_access || {};

            const keys = new Set([
                ...Object.keys(currentPerms),
                ...Object.keys(originalPerms)
            ]);

            let hasChanged = false;
            for (const key of keys) {
                if (currentPerms[key] !== originalPerms[key]) {
                    hasChanged = true;
                    break;
                }
            }

            if (hasChanged) {
                changedData[current.module_name] = {
                    old: { permission_access: { ...originalPerms } },
                    new: { permission_access: { ...currentPerms } }
                };
            }
        }
        return changedData;
    }
     
    
    
      
      
    
    originalData:any=[]
    
    updateRoleWiseModule()
    {
        this.alert.confirm("Are you sure?")
        .then((result) => {
            if (result.isConfirmed) {
                const changedData = this.getChangedData();

                const oldDataWithModule = Object.entries(changedData).map(([moduleName, data]) => ({
                    module_name: moduleName,
                    ...data.old
                }));

                const newDataWithModule = Object.entries(changedData).map(([moduleName, data]) => ({
                    module_name: moduleName,
                    ...data.new
                  }));

                if (Object.keys(changedData).length === 0) {
                    this.api.disabled = false;
                    this.toastr.warning('No changes detected', '', 'toast-top-right');
                    return;
                }
                
                this.logService.logActivityOnUpdate(
                    true, 
                    oldDataWithModule,
                    newDataWithModule,
                    this.subModule.sub_module_id,
                    this.subModule.title,
                    'updateMany',
                    '',
                    () => { },
                    this.subModule.module_type
                );

                this.api.disabled = true;
                this.api.post({ permission: this.moduleListing , user_role_id: this.data.selectedRole}, 'rbac/add-permissions').subscribe(result => {
                    if(result['statusCode'] === 200){
                        this.api.disabled = false;
                        this.toastr.success(result['message'], '', 'toast-top-right');
                        this.getModuleListRoleWise()
                    }
                });
            }
        });
    }
        
    addRoleModal(event:any) {
        const dialogRef = this.dialog.open(ModalsComponent, {
            width: '500px',
            data: {
                'lastPage':'role-and-permission-add',
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            // if(result === true){
            this.getRoleList()
            // }
        });
    }
}
