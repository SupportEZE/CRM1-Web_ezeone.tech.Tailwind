import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { SpkNgSelectComponent } from '../../../../@spk/spk-ng-select/spk-ng-select.component';

@Component({
  selector: 'app-showcode-card',
  templateUrl: './showcode-card.component.html',
  styleUrl: './showcode-card.component.scss',
  standalone: true,
  imports : [CommonModule,FormsModule, SpkNgSelectComponent, ReactiveFormsModule]
})
export class ShowcodeCardComponent {
  @Input() actionIcons: boolean = false;
  @Input() iconClass!:string;
  @Input() iconName!:string;
  @Input() buttonName!:string;
  @Input('title') title!:string;
  @Input('titleView') titleView !: boolean;
  @Input('view') view!:boolean;
  @Input('prism') prism!:string;
  @Input('overallCount') overallCount!:number;
  @Input('tsCode') tsCode!:string;
  @Input() class!:string;
  @Input('classbody') classbody!:string;
  @Input('boxClass') boxClass!:string;
  @Input('boxHeader') boxHeader?:string;
  toggleStatus = false;
  @Input() overallCountShow!: boolean;
  @Input() refresBtnShow!: boolean;
  @Input() filterBtnShow!: boolean;
  @Input() logBtnShow!: boolean;
  @Input() btn1!: boolean;
  @Input() activeTab?: string;
  @Input() searchPlaceholder: string = 'Search...';
  @Input() showSearch :boolean=false;
  
  @Output() refresh = new EventEmitter<string>();
  @Output() action = new EventEmitter<string>();
  @Output() logBtn = new EventEmitter<string>();
  @Output() search = new EventEmitter<string>();
  @Output() btnClick = new EventEmitter<string>();
  @Output() filterClick = new EventEmitter<string>();
  
  @Input() labelName!: string;
  @Input() searchSel: boolean = false;
  @Input() multiple: boolean = false;
  @Input() filterLabel: boolean = false;
  @Input() optionArray: any[] = [];
  @Input() filterForm?: FormGroup;
  @Input() showSelectOption:boolean=false;
  @Output() buttonClick = new EventEmitter<void>();
  @Output() buttonClick1 = new EventEmitter<void>();
  @Output() onSingleSelectChange = new EventEmitter<any>();
  @Output() onsearchChange = new EventEmitter<any>();
  @Output() monthChanged = new EventEmitter<string>();
  
  
  @Input() disabled: boolean = false;
  @Input() filterMonth: boolean = false;
  @Input() max: any;
  @Input() selectedMonth: any;
  
  
  
  
  searchTerm: string = '';
  hasTsCode = false;
  
  constructor(private cdr: ChangeDetectorRef) {}
  
  ngOnChanges(){
  }
  
  toggleShowCode(){
    this.toggleStatus = !this.toggleStatus;
  }
  
  onRefreshClick() {
    this.searchTerm = '';
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    this.selectedMonth = `${year}-${month}`;
    this.activeTab ? this.refresh.emit(this.activeTab) : this.refresh.emit();
  }
  
  onFilterClick() {
    this.filterClick.emit();
  }
  
  onlogBtnClick() {
    this.activeTab ? this.logBtn.emit(this.activeTab) : this.logBtn.emit();
  }
  
  
  onSearchClick() {
    this.search.emit(this.searchTerm);
  }
  
  onActionClick(value:any) {
    this.action.emit(value);
  }
  
  onBtnClick(value:any) {
    this.btnClick.emit(value);
  }
  
  
  onMonthChange(month: string): void {
    this.selectedMonth = month;
    this.monthChanged.emit(month);
  }
  
  onSingleSelectChangeHandler(event: any): void {
    this.onSingleSelectChange.emit(event);
  }
  onsearchChangeHanler(event: any): void {
    this.onsearchChange.emit(event);
  }
}
