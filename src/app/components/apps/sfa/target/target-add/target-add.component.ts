import { Component } from '@angular/core';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { ApiService } from '../../../../../core/services/api/api.service';
import { CURRENCY_SYMBOLS, LOGIN_TYPES } from '../../../../../utility/constants';
import { CommonApiService } from '../../../../../shared/services/common-api.service';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DateService } from '../../../../../shared/services/date.service';
import { LogService } from '../../../../../core/services/log/log.service';
import { ModuleService } from '../../../../../shared/services/module.service';
import { ShowcodeCardComponent } from '../../../../../shared/components/showcode-card/showcode-card.component';
import { TargetLogService } from '../../../../../core/services/log/target_log.service';

@Component({
    selector: 'app-target-add',
    imports: [CommonModule, SharedModule,MaterialModuleModule,SpkReusableTablesComponent,FormsModule,ShowcodeCardComponent],
    templateUrl: './target-add.component.html',
})

export class TargetAddComponent {
    CURRENCY_SYMBOLS = CURRENCY_SYMBOLS;
    data:any ={};
    category_form:any ={};
    product_form:any ={};
    pageType:any = {};
    skLoading:boolean = false
    loading:boolean = false
    today= new Date();
    productData:any = [];
    categoryData:any = [];
    selectedCustomers:any = [];
    originalData:any={}
    submodule:any={};
    
    constructor(public api: ApiService,public toastr: ToastrServices,public CommonApiService: CommonApiService,private router : Router,private dateService : DateService,public route: ActivatedRoute,private targetLogService: TargetLogService,public moduleService: ModuleService){}
    
    ngOnInit() {
        const subModule = this.moduleService.getSubModuleByName('SFA', 'Target');
        if (subModule) {
            this.submodule = subModule;
        }
        
        // this.CommonApiService.getCustomerCategorySubType(LOGIN_TYPES.PRIMARY);
        this.CommonApiService.getUserData()
        this.data.target_type = 'Field User';
        
        this.route.paramMap.subscribe(params => {
            if(params){
                this.DetailId = params.get('id');
                const editParam = params.get('edit');
                
                this.pageType.formType = editParam ? editParam : 'add';
                if (this.DetailId) {
                    this.skLoading = true;
                    this.getDetail();
                }
            }
        });
    }
    
    onTabChange(target_type: string) {
        this.data = {}
        this.category_form = {}
        this.product_form = {}
        this.data.target_type = target_type;
        if (target_type === 'Customer') {
            this.CommonApiService.getCustomerCategorySubType(LOGIN_TYPES.PRIMARY);            
        }
        if(target_type === 'Field User'){
            this.CommonApiService.getUserData()
        }
    }
    
    getCategoryORProduct(value: any)
    {
        setTimeout(() => {
            this.category_form.name = 'Category';
            this.product_form.name = 'Product';
        }, 100);
        
        if (value === true) {
            this.CommonApiService.getDropDownData(6,'category_name')
            this.CommonApiService.getProduct()
        }
    }
    
    
    onCustomerCategoryChange(value: any) {
        const selectedValue = this.CommonApiService.customerCategorySubType.find((item: any) => item.value === value);
        if (selectedValue) {
            this.data.customer_type_name = selectedValue.label;
        }
        this.CommonApiService.getCustomerData(this.data.customer_type_id);
    }
    
    onCustomerChange(value: string) {
        const list = this.data.target_type === 'Customer' ? this.CommonApiService.customerData: this.CommonApiService.userData;
        const selected = list.find((item:any) => item.value === value);
        this.data.assign_to_name = selected.label || null;
        
    }
    
    onProductChange(value: any) {
        let selectedValue
        if(this.category_form.name === 'Category'){
            selectedValue = this.CommonApiService.dropDownData['category_name'].find((item: any) => item.value === value);
            if (selectedValue) {
                this.category_form.field_name = selectedValue.label;
            }
        }
        if (this.product_form.name === 'Product') {
            selectedValue = this.CommonApiService.productList.find((item: any) => item.value === value);
            if (selectedValue) {
                this.product_form.field_name = selectedValue.label;
            }
        }
    }
    
    addToList(type:string) {
        const isCategory = this.category_form.name === 'Category';
        const isProduct = this.product_form.name === 'Product';
        
        if (isCategory && type && (type === 'Category')) {
            if (!this.category_form.field_value || !this.category_form.input_type || !this.category_form.target_value) {
                this.toastr.error('Fill all required Category fields.', '', 'toast-top-right');
                return;
            }
            
            // Duplicate check for Category
            const isDuplicate = this.categoryData.some((item:any) =>
                item.field_value === this.category_form.field_value &&
            item.input_type === this.category_form.input_type);
            
            if (isDuplicate) {
                this.toastr.error('Entry with the same Category, already exists.', '', 'toast-top-right');
                this.category_form = {};
                this.category_form.name = 'Category';
                return;
            }
            
            this.categoryData.push({ ...this.category_form });
        } 
        else if (isProduct && type && (type === 'Product')) {
            if (!this.product_form.field_value || !this.product_form.input_type || !this.product_form.target_value) {
                this.toastr.error('Fill all required Product fields.', '', 'toast-top-right');
                return;
            }
            
            // Duplicate check for Category
            const isDuplicate = this.productData.some((item:any) =>
                item.field_value === this.product_form.field_value &&
            item.input_type === this.product_form.input_type);
            
            if (isDuplicate) {
                this.toastr.error('Entry with the same Product, already exists.', '', 'toast-top-right');
                this.product_form = {};
                this.product_form.name = 'Product';
                return;
            }
            
            this.productData.push({ ...this.product_form });
        } 
        else {
            console.warn('Neither Category nor Product selected properly.');
            this.toastr.error('Please select a valid Product Type.', '', 'toast-top-right');
            return;
        }
        
        this.category_form = {};
        this.product_form = {};
        this.category_form.name = 'Category';
        this.product_form.name = 'Product';
    }
    
    
    deleteItem(index: number , type: string) {
        if (type === 'Category') {
            this.categoryData.splice(index, 1);
        }
        if (type === 'Product') {
            this.productData.splice(index, 1);
        }
        this.toastr.success('Data removed from the list.', '', 'toast-top-right');
    }
    
    targetAchievementRate:any = {};
    getTargetAchievementRate() {
        this.loading = true;
        this.api.post({'target_type': this.data.target_type, 'assign_to_id': this.data.assign_to_id}, 'target/achievement').subscribe(result => {
            if (result['statusCode']  ===  200) {
                this.loading = false;
                this.targetAchievementRate = result['data'];
            }
            
            if (this.data.target_type = 'Field User') {
                this.getAssignCustomerAchievement();
            }
        });
    }
    
    assignCustomerAchievement:any = {};
    getAssignCustomerAchievement() {
        this.loading = true;
        this.api.post({'target_type': this.data.target_type, 'assign_to_id': this.data.assign_to_id}, 'target/assign-customer-achievement').subscribe(result => {
            if (result['statusCode']  ===  200) {
                this.loading = false;
                this.assignCustomerAchievement = result['data'];
            }
        });
    }
    
    onCheckboxChange(customer: any, index: number): void {
        // This is enough to trigger Angular change detection
    }
    
    onSubmit() {
        
        if (this.data.is_additional_target) {
            
            if (this.data.target_type === 'Customer') {
                if (this.categoryData.length === 0 && this.productData.length === 0) {
                    this.toastr.error('Please add at least one row.', '', 'toast-top-right');
                    return;
                }
            }
            
            if (this.data.target_type === 'Field User') {
                this.selectedCustomers = this.customers.filter(c => c.checked && c.target_value);
                if (this.categoryData.length === 0 && this.productData.length === 0 && this.selectedCustomers.length === 0) {
                    this.toastr.error('Please add at least one row.', '', 'toast-top-right');
                    return;
                }
            }
            this.data.additional_target = [...this.categoryData , ...this.productData , ...this.selectedCustomers];
        }
        
        if (this.data.start_date || this.data.end_date) {
            this.data.start_date = this.dateService.formatToYYYYMMDD(this.data.start_date);
            this.data.end_date = this.dateService.formatToYYYYMMDD(this.data.end_date);
        }
        
        this.api.disabled = true;
        const isEditMode = this.pageType.formType === 'edit';
        const functionName = isEditMode ? 'target/update' : 'target/create';
        const httpMethod = isEditMode ? 'patch' : 'post';
        
        this.api[httpMethod](this.data, functionName).subscribe(result => {
            if(result['statusCode'] === 200){
                this.api.disabled = false;
                if(this.pageType.formType === 'edit'){
                    
                    const changedFields = this.getSmartDiff(this.originalData, this.data);
                    
                    if (Object.keys(changedFields).length > 0) {
                        this.targetLogService.logActivityOnUpdate(isEditMode, 
                            changedFields, // Only pass changed fields
                            this.submodule.module_id, 
                            this.submodule.title, 
                            'update', 
                            this.DetailId || null, 
                            () => { }, 
                            this.submodule.module_type
                        );
                    }
                }
                this.toastr.success(result['message'], '', 'toast-top-right');
                this.router.navigate(['/apps/sfa/target']);
            }
            else
            {
                this.api.disabled = false;
            }
        });
    }
    
    IGNORED_KEYS = ['progress', 'total_achieved', 'status'];
    
    normalizeObject(obj: any): any {
        if (Array.isArray(obj)) {
            return obj.map(this.normalizeObject);
        } else if (obj && typeof obj === 'object') {
            const clone: any = {};
            for (const [key, value] of Object.entries(obj)) {
                if (!this.IGNORED_KEYS.includes(key)) {
                    clone[key] = this.normalizeObject(value);
                }
            }
            return clone;
        }
        return obj;
    }
    
    deepEqual(obj1: any, obj2: any): boolean {
        return JSON.stringify(this.normalizeObject(obj1)) === JSON.stringify(this.normalizeObject(obj2));
    }
    
    getArrayDiff(oldArray: any[], newArray: any[], keyField: string = 'field_value') {
        const result = {
            added: [] as any[],
            removed: [] as any[],
            modified: [] as { old: any; new: any }[],
        };
        
        const oldMap = new Map(oldArray.map(item => [item[keyField] || item.name, item]));
        const newMap = new Map(newArray.map(item => [item[keyField] || item.name, item]));
        
        // Find removed and modified
        for (const [key, oldItem] of oldMap.entries()) {
            const newItem = newMap.get(key);
            if (!newItem) {
                result.removed.push(oldItem);
            } else if (!this.deepEqual(oldItem, newItem)) {
                result.modified.push({ old: oldItem, new: newItem });
            }
        }
        
        // Find added
        for (const [key, newItem] of newMap.entries()) {
            if (!oldMap.has(key)) {
                result.added.push(newItem);
            }
        }
        
        return result;
    }
    
    getSmartDiff(oldData: any, newData: any) {
        const result: any = {};
        
        for (const key of Object.keys({ ...oldData, ...newData })) {
            const oldValue = oldData[key];
            const newValue = newData[key];
            
            if (Array.isArray(oldValue) && Array.isArray(newValue)) {
                const diff = this.getArrayDiff(oldValue, newValue);
                if (diff.added.length || diff.removed.length || diff.modified.length) {
                    result[key] = diff;
                }
            } else if (
                typeof oldValue === 'object' &&
                typeof newValue === 'object' &&
                oldValue !== null &&
                newValue !== null
            ) {
                if (!this.deepEqual(oldValue, newValue)) {
                    result[key] = { old: oldValue, new: newValue };
                }
            } else if (oldValue !== newValue) {
                result[key] = { old: oldValue, new: newValue };
            }
        }
        
        return result;
    }
    
    
    
    DetailId:  any;
    basiqDetail:any = {};
    getDetail() {
        this.api.post({_id: this.DetailId}, 'target/detail').subscribe(result => {
            if (result['statusCode']  ===  200) {
                this.skLoading = false;
                const temp = result['data'];
                // Format dates safely
                if (temp?.result?.start_date) {
                    temp.result.start_date = this.dateService.formatToYYYYMMDD(temp.result.start_date);
                }
                if (temp?.result?.end_date) {
                    temp.result.end_date = this.dateService.formatToYYYYMMDD(temp.result.end_date);
                }
                
                // Safely clone and store result data
                const formattedData = {
                    ...temp.result,
                    additional_target: temp.additional_target || []
                };
                
                this.originalData = structuredClone(formattedData);  // deep copy
                
                this.data = formattedData;
                
                if (this.data?.target_type === 'Field User') {
                    this.CommonApiService.getUserData();
                }
                this.getTargetAchievementRate()
                if (this.data?.is_additional_target) {
                    this.getCategoryORProduct(this.data?.is_additional_target);
                }
                
                if (this.data?.additional_target?.length) {
                    this.categoryData = this.data?.additional_target.filter((item: any) => item.name === 'Category');
                    
                    this.productData = this.data?.additional_target.filter((item: any) => item.name === 'Product');
                    
                    this.data?.additional_target.forEach((saved: any) => {
                        const found = this.customers.find(c => c.name === saved.name);
                        
                        if (found) {
                            found.checked = true;
                            found.target_value = saved.target_value;
                        }
                    });
                    
                }
            }
        });
    }
    
    productType = [
        {label : "Category"},
        {label : "Product"},
    ]
    
    categoryHeaderColumn=[
        {label:"S.No", table_class :"text-center"},
        {label:"Type", table_class :""},
        {label:"Category Name", table_class :""},
        {label:"Qty/Value", table_class :"text-center"},
        {label:"Target", table_class :"text-center"},
        {label:"Action", table_class :"text-center"},
    ]
    
    productHeaderColumn=[
        {label:"S.No", table_class :"text-center"},
        {label:"Type", table_class :""},
        {label:"Product Name", table_class :""},
        {label:"Qty/Value", table_class :"text-center"},
        {label:"Target", table_class :"text-center"},
        {label:"Action", table_class :"text-center"},
    ]
    
    customers = [
        { name: 'Primary Sale Target',   description: 'Additional primary sale target',       icon: 'shopping_cart',  input_show: true, target_value: '', input_type: 'qty', checked: false },
        { name: 'Secondary Sale',        description: 'Target for secondary sale',            icon: 'repeat',         input_show: true, target_value: '', input_type: 'qty', checked: false },
        { name: 'New Customer',          description: 'New customer create target',           icon: 'person_add',     input_show: true, target_value: '', input_type: 'qty', checked: false },
        { name: 'Enquiry Close',         description: 'Enquiry close target',                 icon: 'done_all',       input_show: true, target_value: '', input_type: 'qty', checked: false },
        { name: 'Site Creation',         description: 'New site creation target',             icon: 'add_location',   input_show: true, target_value: '', input_type: 'qty', checked: false },
        { name: 'Site Close',            description: 'Close site target',                    icon: 'location_off',   input_show: true, target_value: '', input_type: 'qty', checked: false },
        { name: 'Customer Visit',        description: 'Customer visit target',                icon: 'event_available',input_show: true, target_value: '', input_type: 'qty', checked: false },
        { name: 'Event',                 description: 'Event in your area target',            icon: 'event',          input_show: true, target_value: '', input_type: 'qty', checked: false },
        { name: 'Influencer Registration', description: 'New Influencer registration target', icon: 'how_to_reg',     input_show: true, target_value: '', input_type: 'qty', checked: false },
        { name: 'Payment Collection',    description: 'Payment collection target',            icon: 'payments',       input_show: true, target_value: '', input_type: 'qty', checked: false },
    ]
    
    companiesColumn = [
        {label: 'S.No', table_class: 'text-center'},
        {label: 'Name', table_class: ''},
        {label: 'Maximum In Month', table_class: 'text-center'},
        {label: 'Minimum In Month', table_class: 'text-center'},
        {label: 'Average In Month', table_class: 'text-center'},
        {label: 'Assign Type', table_class: 'text-center'}
    ]
}
