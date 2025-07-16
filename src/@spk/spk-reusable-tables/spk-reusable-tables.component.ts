import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MaterialModuleModule } from '../../app/material-module/material-module.module';
import { DateRange } from '@angular/material/datepicker';
import { ApiService } from '../../app/core/services/api/api.service';
import { DateService } from '../../app/shared/services/date.service';

@Component({
    selector: 'spk-reusable-tables',
    standalone: true,
    imports: [FormsModule,ReactiveFormsModule,CommonModule,MaterialModuleModule],
    templateUrl: './spk-reusable-tables.component.html',
    styleUrl: './spk-reusable-tables.component.scss'
})
export class SpkReusableTablesComponent {
    @Input() columns: any[] = [];
    @Input() columnsFilter: any[] = [];
    @Input() tableClass: string='';
    @Input() tableHead: string='';
    @Input() tableFooter: string='';
    @Input() tableBody: string='';
    @Input() trClass: string='';
    @Input() checkboxClass: string='';
    @Input() tableFoot: string='';
    @Input() tableHeadColumn: string='';
    @Input() data: any[] = [];
    @Input() subModule: any = {};
    @Input() title: any[] = [];
    @Input() footerData: any[] = [];
    @Input() showFooter: boolean = false;
    @Input() showCheckbox :boolean=false;
    @Input() showS_No :boolean=false;
    @Input() showAction :boolean=false;
    @Input() showHeaderRow :boolean=true;
    @Input() showFilterRow :boolean=false;
    @Input() showSorting :boolean=false;
    @Input() rows: { checked: boolean; [key: string]: any }[] = [];
    allTasksChecked!: boolean;
    tableData: any;  
    @Output() toggleSelectAll = new EventEmitter<boolean>();
    @Output() openDetails = new EventEmitter<any>();
    @Output() sortChanged = new EventEmitter<{ field: string; order: number }>();
    @Output() selectionChange = new EventEmitter<{ category_name: string; selections: string[] }>(); // Emit the required structure
    @Output() textSearchChange = new EventEmitter<{searchText: string; name: string}>();
    @Input() initialRange: DateRange<Date> | null = null;
    @Output() dateRangeChange = new EventEmitter<{ [key: string]: { start: string; end: string } }>();
    @Output() dateChange = new EventEmitter<any>();
    @Input() tableHeight: string = '450px';
    
    
    ngOnInit() {
        this.setTableHeight();
    }
    
    
    @HostListener('window:resize', ['$event'])
    onResize() {
        this.setTableHeight();
    }
    
    setTableHeight() {
        const headerHeight = 160; // Adjust if needed
        const footerHeight = 160;  // Adjust if needed
        const availableHeight = window.innerHeight - headerHeight - footerHeight;
        this.tableHeight = `${availableHeight}px`;
    }
    
    onToggleSelectAll(event: any) {
        this.toggleSelectAll.emit(event.target.checked);
    }
    toggleRowChecked(row: any) {
        row.checked = !row.checked;
        this.allTasksChecked = this.data.every(row => row.checked);
    }
    
    // Update the "Select All" checkbox based on row selections
    updateSelectAllCheckbox(): void {
        this.allTasksChecked = this.data.every(row => row.checked); // Check if all rows are selected
    }
    
    sendSortRequest(field: string, order: 'asc' | 'desc') {
        const orderValue = order === 'asc' ? 1 : -1;
        this.sortChanged.emit({ field, order: orderValue });
    }
    
    handleSelectChange(event: any, column: any): void {
        column.selections = event.value;
        this.selectionChange.emit({ category_name: column.name, selections: column.selections });
    }
    
    handleSingleSelectChange(event: any, column: any): void {
        column.selections = event.value;
        this.selectionChange.emit({ category_name: column.name, selections: column.selections });
    }    
    
    searchTexts: { [key: string]: string } = {};
    searchText: string = '';
    handleTextChange(name: string) {
        const searchText = this.searchTexts[name] || '';
        // if (searchText.length >= 3) {
        this.textSearchChange.emit({ searchText, name });
        // }
    }
    
    range: FormGroup;
    constructor(private fb: FormBuilder, public api:ApiService,private dateService: DateService) {
        this.range = this.fb.group({
            start: new FormControl<Date | null>(null),
            end: new FormControl<Date | null>(null)
        });
    }
    
    
    singleSelectControls: { [key: string]: FormControl } = {};
    dateControls: { [key: string]: FormControl } = {};
    dateRangeGroups: { [key: string]: FormGroup } = {};
    multiSelectControls: { [key: string]: FormControl } = {};
    ngOnChanges() {
        if (this.initialRange) {
            this.range.patchValue(this.initialRange);
        }
        
        this.columns.forEach(column => {
            if (column.type === 'SINGLE_SELECT' && !this.singleSelectControls[column.name]) {
                this.singleSelectControls[column.name] = new FormControl(null);
            }
            
            if (column.type === 'MULTI_SELECT' && !this.multiSelectControls[column.name]) {
                this.multiSelectControls[column.name] = new FormControl([]);
            }
            
            if (column.type === 'DATE' && !this.dateControls[column.name]) {
                this.dateControls[column.name] = new FormControl(null);
            }
            
            if (column.type === 'DATE_RANGE' && !this.dateRangeGroups[column.name]) {
                this.dateRangeGroups[column.name] = this.fb.group({
                    start: new FormControl<Date | null>(null),
                    end: new FormControl<Date | null>(null)
                });
            }
            
            if(column.api_path){
                this.getOptions(column.label, column.name, column.api_path, column.api_payload, column.api_payload_key)
            }
        });
    }
    
    clearSearchInputs() {
        this.searchTexts = {};
        Object.keys(this.singleSelectControls).forEach(key => {
            this.singleSelectControls[key].setValue(null);
        });
        
        Object.keys(this.multiSelectControls).forEach(key => {
            this.multiSelectControls[key].setValue([]);
        });
        
        Object.keys(this.dateControls).forEach(key => {
            this.dateControls[key].setValue(null);
        });
        
        Object.keys(this.dateRangeGroups).forEach(key => {
            this.dateRangeGroups[key].reset();
        });
    }
    
    async getOptions(dropdown_name: string, name: string,  api_path: string, api_payload?: any, api_payload_key?: any): Promise<void> {
        try {
            
            let payload:Record<string,any>={
                dropdown_name, 
                module_id: this.subModule.sub_module_id || this.subModule.module_id,
            }
            if(api_payload && api_payload_key){
                payload[api_payload_key] = api_payload;
            }
            const result: any = await this.api.post(
                payload, 
                api_path
            ).toPromise();
            
            if (result?.statusCode === 200) {
                this.columns.forEach(column => {
                    if (column.name === name) {
                        column.options = result.data;
                    }
                });
            }
        } catch (error) {
        }
    }
    
    // onDateChange(name: string) {
    //     const start = this.range.get('start')?.value;
    //     const end = this.range.get('end')?.value;
    //     if (start && end) {
    //         const dataToEmit = { [name]: { start: start, end: end } };
    //         this.dateRangeChange.emit(dataToEmit);
    //     }
    // }
    
    onDateChange(name: string) {
        const group = this.dateRangeGroups[name];
        const start = group?.get('start')?.value;
        const end = group?.get('end')?.value;
        
        if (start && end) {
            const formattedStart = this.dateService.formatToYYYYMMDD(new Date(start));
            const formattedEnd = this.dateService.formatToYYYYMMDD(new Date(end));
            const dataToEmit = { [name]: { start: formattedStart, end: formattedEnd } };
            this.dateRangeChange.emit(dataToEmit);
        }
    }
    
    onSingleDateChange(columnName: string, event: any) {
        let selectedDate
        selectedDate = event.value; // Get the date
        if(selectedDate){
            selectedDate = this.dateService.formatToYYYYMMDD(selectedDate);
        }
        if (selectedDate) {
            const dataToEmit = {[columnName] : selectedDate};
            this.dateChange.emit(dataToEmit);
        }
    }
}