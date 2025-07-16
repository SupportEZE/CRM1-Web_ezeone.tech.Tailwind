import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-page-header',
  standalone:false,
  // imports: [CommonModule],
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {
  @Input() title!: string;
  @Input() title1!: any;
  @Input() activeitem!: string;
  @Input() buttonText!: string;
  @Input() buttonText1!: string;
  @Input() icon!: string;
  @Input() icon1!: string;
  @Input() btnShow!: boolean;
  @Input() btnDisabled!: boolean;
  @Input() btnShow1!: boolean;
  @Input() buttonValue: any = null;   // Optional value for first button
  @Input() buttonValue1: any = null;
  @Input() dataHsOverlay: string = '';
  @Input() showInput:boolean=false;
  @Input() labelName!: string;
  @Input() inputType!: string;
  @Input() class!: string;
  @Input() search:boolean=false;
  @Input() multiple:boolean=false;
  @Input() filterLabel:boolean=false;
  @Input() optionArray: any[] = [];
  @Input() filterForm?: FormGroup;
  @Input() showSelectOption:boolean=false;
  @Output() buttonClick = new EventEmitter<void>();
  @Output() buttonClick1 = new EventEmitter<void>();
  @Output() onSingleSelectChange = new EventEmitter<any>();
  @Output() valueChange = new EventEmitter<any>();
  @Output() onsearchChange = new EventEmitter<any>();
  
  
  constructor(public location: Location){}
  back(): void {
    this.location.back()
  }
  
  onButtonClick() {
    this.buttonClick.emit(this.buttonValue); // Emit optional value
  }
  
  onButtonClick1() {
    this.buttonClick1.emit(this.buttonValue1);  // Emit optional value
  }
  
  onSingleSelectChangeHandler(event: any): void {
    this.onSingleSelectChange.emit(event);
  }
  
  emitValueChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(value);
  }
  onsearchChangeHanler(event: any): void {
    this.onsearchChange.emit(event);
  }
  
}
