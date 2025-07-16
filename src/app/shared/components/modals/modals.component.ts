import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../core/services/api/api.service';
import { RemoveSpaceService } from '../../../core/services/remove-space/removeSpace.service';
import { MaterialModuleModule } from '../../../material-module/material-module.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared.module';
import { FormFieldTypeOptions, FormFieldTypes, LOGIN_TYPES } from '../../../utility/constants';
import { SpkReusableTablesComponent } from '../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrServices } from '../../services/toastr.service ';
import { SortablejsModule } from '@maksim_m/ngx-sortablejs';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { RemoveDuplicateService } from '../../../core/services/remove-duplicate/remove-duplicate.service';
import { SweetAlertService } from '../../../core/services/alert/sweet-alert.service';
import Swal from 'sweetalert2';
import { ModuleDropdownComponent } from '../module-dropdown/module-dropdown.component';
import { ModalHeaderComponent } from '../modal-header/modal-header.component';

@Component({
    selector: 'app-modals',
    imports: [MaterialModuleModule, SortablejsModule, SpkReusableTablesComponent, FormsModule, ReactiveFormsModule, CommonModule, SharedModule, ModuleDropdownComponent, ModalHeaderComponent],
    templateUrl: './modals.component.html'
})
export class ModalsComponent {
    pageType:any = 'add'
    data:any ={};
    listarray:any=[];
    inputOptions = FormFieldTypeOptions; // Your existing field configurations
    readonly fieldTypes = FormFieldTypes;
    selectedTabIndex = 0
    key_value:string= ''
    key_action:string= 'created';
    lastPage:any;
    formDropdown:any =[];
    formDropdownOption:any =[];
    skLoading:boolean = false
    loginType:any=[];
    wholePageTableData:any = {};
    
    
    constructor(
        public cdr: ChangeDetectorRef,
        public alert: SweetAlertService,
        public toastr: ToastrServices,
        public spaceRemove:RemoveSpaceService,
        public removeDuplicate: RemoveDuplicateService,
        public api: ApiService,
        @Inject(MAT_DIALOG_DATA) public modalData: any,
        private dialogRef: MatDialogRef<ModalsComponent>
    ){
        console.log(modalData, 'modalData');
        
        if (modalData.lastPage == 'product' || modalData.lastPage == 'user-add' || modalData.lastPage == 'expense-policy-add' || modalData.lastPage == 'enquiry' || modalData.lastPage == 'site' || modalData.lastPage == 'leave-master' || modalData.lastPage == 'form-config') {
            modalData.form_Fields.forEach((field:any) => {
                if ([this.fieldTypes.SINGLE_SELECT, this.fieldTypes.RADIO_SELECT,this.fieldTypes.CHECKBOX_SELECT, this.fieldTypes.MULTI_SELECT].includes(field.type)) {
                    const { control, ...rest } = field;
                    this.formDropdown.push(rest);


                }
            });
            console.log(this.formDropdown, 'formDropdown');
            
            this.separateByIsShow();
        }
        
        
        if (modalData.lastPage == 'expense-policy-list' || modalData.lastPage == 'enquiry-list' || modalData.lastPage == 'header-config') {
            this.skLoading = true;
            if (modalData?.tableConfigData) {
                this.skLoading = false;
                this.separateByIsHeaderConfig();
            }
        }
        
        if (modalData.lastPage == 'role-and-permission-add') {
            this.getRoleList();
        }
        
    }
    
    
    showTrueFileds: any[] = [];
    showFalseFileds: any[] = [];
    
    separateByIsShow() {
        this.modalData.form_Fields.forEach((item: any) => {
            if (item.is_show) {
                this.showTrueFileds.push(item);
            } else {
                this.showFalseFileds.push(item);
            }
        });
    }
    
    getColumns(): any[] {
        return [ 
            { label: "Sr.No", field: "Sr.No" }, ...(this.data && (this.data.is_child_dependency === 'Option')
            ? [{ label: "Dependancy Value", field: "Dependancy Value" }]
            : []),
            { label: "Options", field: "Options" },
            { label: "Action", field: "Action" }
        ];
    }
    
    
    
    normalOptionFileds = {
        handle: '.handle',
        animation: 150,
        onEnd: (event: any) => this.saveSortedOrder()
    };
    
    saveSortedOrder() {
        this.modalData.form_Fields = [...this.showFalseFileds, ...this.showTrueFileds].map((item, index) => ({
            ...item,
            sequence: index + 1
        }));
        this.key_action = 'updated';
    }
    
    findValue(name:any, data:any){
        const index = this.formDropdown.findIndex((row:any) => row.name === name);
        if(index != -1){
            this.formDropdownOption = this.formDropdown[index]['options'];
        }
    }
    
    
    
    onTabChange(event: MatTabChangeEvent) {
        this.selectedTabIndex = event.index;
        if(this.selectedTabIndex === 0){
            this.data = {}
        }
    }
    
    addtolist() {
        const { dropdown_option } = this.data;
        
        if (!dropdown_option?.trim()) {
            this.toastr.error('Option cannot be empty', '', 'toast-top-right');
            return;
        }
        const formattedValue = this.spaceRemove.formatValue({ value: dropdown_option }).value;
        const exists = this.listarray.some((item: any) => item.value === formattedValue);
        if (!exists) {
            const newItem: any = { label: dropdown_option, value: formattedValue };
            if (this.data.is_child_dependency === 'Option') {
                newItem.parent_field_value = this.data.option_dependancy_field_value;
                newItem.parent_field_name = this.data.parent_field_value;
            }
            this.listarray.push(newItem);
        }
        this.toastr.success('Option Added Successfully', '', 'toast-top-right');
        this.data.dropdown_option = '';
    }
    
    delete(i:any){
        this.listarray.splice(i, 1)
    }
    
    
    updateForm(value:any){
        delete value['control'];
        this.key_value = value.name;
        this.key_action = 'updated';
        this.data = value;
        if(this.data.required == true){
            this.data.required =  'true';
        }
        else{
            this.data.required =  'false';
        }
        if(this.data.options){
            this.listarray = this.data.options;
        }
    }
    
    close() {
        this.dialogRef.close(); // Closes the dialog
    }
    
    
    deleteItem(index:number, label:string){
        this.alert.confirm("Are you sure you want to delete this?", "Once deleted, this item cannot be restored.", "Delete it!")
        .then(result => {
            if (result.isConfirmed) {
                this.key_value = this.showTrueFileds[index]['name'];
                this.data.label = label,
                this.key_action='deleted'
                const moudle_type = (this.modalData?.module_type || this.modalData ?.moduleData?.module_type)
                this.api.post({ 'module_type': moudle_type, "module_id": this.modalData.moduleId, "dropdown_name": this.modalData.form_Fields[index]['name'] }, 'dropdown/delete').subscribe(result => { });
                const parentIndex = this.modalData.form_Fields.findIndex((row: any) => row.name === this.showTrueFileds[index].parent_field_name);
                if(parentIndex !== -1) {
                    const parentChildIndex = this.modalData.form_Fields[parentIndex].child_dependency.findIndex((row: any) => row.child_field_name == this.showTrueFileds[index].name);
                    if(parentChildIndex !== -1) {
                        this.modalData.form_Fields[parentIndex].child_dependency.splice(parentChildIndex, 1); 
                    }
                }
                this.showTrueFileds.splice(index, 1);
                this.modalData.form_Fields = [...this.showFalseFileds, ...this.showTrueFileds];
                this.submit();
            }
        });
    }
    
    
    submit(){
        if ((this.data.type == this.fieldTypes.RADIO_SELECT||this.data.type == this.fieldTypes.CHECKBOX_SELECT) && this.listarray.length === 0){
            this.toastr.error('Add dropdown option', '', 'toast-top-right');
            return;
        }
        
        if ((this.data.type == this.fieldTypes.MULTI_SELECT || this.data.type == this.fieldTypes.SINGLE_SELECT)){
            this.data.api_path = "dropdown/read-dropdown";
        }
        
        if (this.key_action == 'created'){
            this.data.name = this.data.label;
        }
        const formattedValue = this.spaceRemove.formatString(this.data.name);
        if (this.modalData.form_Fields.some((field:any) => ((field.name === formattedValue) && this.key_action=='created'))) {
            this.toastr.error(`${this.data.name} this field already exists`, '', 'toast-top-right');
            return;
        }
        this.api.disabled = true;
        if(this.key_action=='created') {
            this.key_value = formattedValue;
            this.modalData.form_Fields.push({
                "id": this.modalData.form_Fields.length+1,
                'label':this.data.label,
                'name': formattedValue,
                'placeholder': this.data.label,
                "type": this.data.type,
                "min_length": this.data.min_length ? Number(this.data.min_length) : 0,
                "max_length": this.data.max_length ? Number(this.data.max_length) : 0,
                "required":  this.data.required == "true" ? true : false,
                "read_only": false,
                "validation_error": "This field is required",
                "is_show":  true,
                "is_parent_dependency": (this.data.is_child_dependency === "Direct" ||  this.data.is_child_dependency === "Option") ? true : false,
                "is_child_dependency": (this.data.is_child_dependency === "Direct" ||  this.data.is_child_dependency === "Option") ? true : false,
                "child_dependency": [],
                "options": this.listarray,
                "sequence": this.modalData.form_Fields.length+1,
                "class_name": this.data.class_name,
                "list_view_checked": (this.data.type === this.fieldTypes.UPLOAD) ? false : true,
                "is_header_config": (this.data.type === this.fieldTypes.UPLOAD) ? false : true,
                "listing_sequence": this.modalData.form_Fields.length+1,
                "filter_checked": false,
                "is_change": true,
                "key_source": "custom",
                "parent_field_name":this.data.parent_field_name ? this.data.parent_field_name: this.data.parent_field_value ? this.data.parent_field_value : '', 
                "pattern":this.data.pattern_validation,
                "search": this.data.search == "Yes" ? true : false,
                "search_api": this.data.search_api,
                "search_payload": this.data.search_payload,
                "option_type": this.data.option_type,
                "api_path": this.data.api_path,
            });
        }
        const childFieldOptions = ((this.data.type == this.fieldTypes.SINGLE_SELECT || this.data.type == this.fieldTypes.MULTI_SELECT || this.data.type == this.fieldTypes.RADIO_SELECT || this.data.type == this.fieldTypes.CHECKBOX_SELECT) ? this.listarray : [])
        if ((this.listarray && this.listarray.length > 0) || (this.data.is_child_dependency === 'Direct' || this.data.is_child_dependency === 'Option')) {
            const parentIndex = this.modalData.form_Fields.findIndex((row:any) => row.name === (this.data.parent_field_name || this.data.parent_field_value));
            if(parentIndex !== -1) {
                this.modalData.form_Fields[parentIndex]['is_child_dependency']=true;
                const parentChildIndex = this.modalData.form_Fields[parentIndex].child_dependency.findIndex((row:any)=> row.child_field_name ==  this.spaceRemove.formatString(this.data.name));
                if(parentChildIndex !== -1) {
                    this.modalData.form_Fields[parentIndex].child_dependency[parentChildIndex].child_field_option = [...childFieldOptions];
                } else {
                    this.modalData.form_Fields[parentIndex].child_dependency.push({
                        ...(this.data.is_child_dependency !== 'Option' && { parent_field_value: this.data.parent_field_value }),
                        visibilty: this.data.is_child_dependency,
                        child_field_name: this.spaceRemove.formatString(this.data.name),
                        child_field_option: childFieldOptions
                    });
                }  
            }
            
        }
        
        const sanitizedData = this.modalData.form_Fields.map( ((row:any) => {
            return {...row, control:null};
        }));
        this.api.post({"form_data":sanitizedData, 'form_type':'add', 'platform':'web', "form_id":this.modalData.moduleFormId, "form_name":this.modalData.moduleName}, 'form-builder/create').subscribe(result => {
            if(result['statusCode'] == 200){
                if ((this.data.type == this.fieldTypes.MULTI_SELECT || this.data.type == this.fieldTypes.SINGLE_SELECT)) {
                    this.createDropdown();
                    
                }
                this.logsApi();
                this.api.disabled = false;
                this.toastr.success(result['message'], '', 'toast-top-right');
                this.dialogRef.close(true)
            }
        });
    }
    
    
    logsApi(){
        this.api.post({'module_name':this.modalData.moduleName, 'message':this.data.label + ' field has been ' + this.key_action, 'action':this.key_action, "module_id":this.modalData.moduleId, "form_id":this.modalData.moduleFormId , 'module_type': this.modalData.module_type ? this.modalData.module_type : this.modalData.moduleData.module_type}, 'log/form-action').subscribe(result => {
            if(result['statusCode'] === 200){
                // this.logsApi()
                // this.api.disabled = false;
            }
        });
    }
    
    
    createDropdown() {
        const payload = {
            module_name: this.modalData.moduleName,
            module_id: this.modalData.moduleId,
            dropdown_name: this.key_action === 'created' ? this.spaceRemove.formatString(this.data.name) : this.data.name,
            dropdown_display_name: this.data.label,
            module_type: this.modalData?.moduleData?.module_type,
            ...(this.data.parent_field_value && { dependent_dropdown_name: this.data.parent_field_value })
        };
        
        const endpoint = this.key_action === 'created' ? 'dropdown/create' : 'dropdown/update';
        this.api.post(payload, endpoint).subscribe();
    }
    
    
    
    
    // ---------------------------Header Listing Config Start------------------------------ //
    onCheckboxChange(item: any, type: string, event: Event) {
        const target = event.target as HTMLInputElement;
        if (type === 'list_view_checked') {
            item.list_view_checked = target.checked;
        } else if (type === 'filter_checked') {
            item.filter_checked = target.checked;
        }        
    }

    separateByIsHeaderConfig() {
        this.modalData.tableConfigData.tableHead.forEach((item: any) => {
            if (item.is_header_config) {
                this.showTrueFileds.push(item);
            } else {
                this.showFalseFileds.push(item);
            }
        });
    }
    
    normalOptions = {
        animation: 150,
        group: 'shared',
        onEnd: (event: any) => this.updateListingOrder()
    };
    
    updateListingOrder() {
        this.modalData.tableConfigData.tableHead = [...this.showFalseFileds, ...this.showTrueFileds].map((item, index) => ({
            ...item,
            listing_sequence: index + 1
        }));
        this.key_action = 'updated';
    }
    
    saveAssignedHeaders()
    {
        this.api.disabled = true;
        this.api.post({ 'platform': 'web', 'table_id': this.modalData.moduleTableId, 'form_id': this.modalData.moduleFormId, 'table_data': this.modalData.tableConfigData, "form_name":this.modalData.moduleName }, 'table-builder/create').subscribe(result => {
            if (result['statusCode']  ===  200) {
                this.api.disabled = false;
                this.alert.sucess(result['message']);
                this.dialogRef.close(true);
            }
        });
    }
    
    // ---------------------------Header Listing Config End------------------------------ //
    
    // -----Table Config Modal Start----- //
    
    // -----Role And Permission Add Modal Start----- //
    roleColumn=[
        {label:"S.No",field:"S.No"},         
        {label:"Name",field:"Name"},
        {label:"Action",field:"Action"},
    ]
    
    onDeleteRole(roleId: any) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                this.api.patch({ _id: roleId, is_delete: 1}, 'rbac/delete').subscribe(result => {
                    if (result['statusCode']  ===  200) {
                        Swal.fire('Deleted!', result.message, 'success');
                        this.getRoleList();
                    }                        
                });
            }
        });
    }
    
    updateRole(row:any)
    {
        this.data.user_role_name = row.user_role_name;
        this.data._id = row._id;
        this.data.formType = 'edit';
    }
    
    roleListArray:any=[];    
    getRoleList(){
        this.skLoading = true;
        this.api.post({}, 'rbac/read').subscribe(result => {
            if(result['statusCode'] == 200){
                this.skLoading = false;
                this.roleListArray = result['data'];
            }
        });
    }
    
    saveRole(){
        this.api.disabled = true;
        let function_name;
        if (this.data.formType === 'edit') {
            function_name = 'rbac/update';
        } else {
            function_name = 'rbac/create';
        }
        const httpMethod = this.data.formType === 'edit' ? 'patch' : 'post';
        this.api[httpMethod](this.data, function_name).subscribe(result => {
            if(result['statusCode'] === 200){
                this.api.disabled = false;
                this.data.user_role_name = '';
                this.toastr.success(result['message'], '', 'toast-top-right');
                this.getRoleList();
            }
            else
            {
                this.api.disabled = false;
            }
        });
    }
    
    // -----Role And Permission Add Modal Start----- //
    
    
    
}
