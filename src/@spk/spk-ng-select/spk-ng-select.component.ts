import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, forwardRef, Input, Output, Renderer2 } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroupDirective, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MaterialModuleModule } from '../../app/material-module/material-module.module';
import { DateService } from '../../app/shared/services/date.service';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

interface Option {
  label: string; // Adjust according to your option structure
  value: any;    // Use the appropriate type based on your data
}

@Component({
  selector: 'spk-ng-select',
  standalone: true,
  imports: [NgSelectModule, FormsModule, CommonModule, MaterialModuleModule, ReactiveFormsModule, NgxMatSelectSearchModule],
  templateUrl: './spk-ng-select.component.html',
  styleUrl: './spk-ng-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SpkNgSelectComponent),
      multi: true,
    }
  ]
})
export class SpkNgSelectComponent implements ControlValueAccessor {
  @Input() label!: string;
  @Input() fieldReq?: boolean = false;
  @Input() search: boolean = false;
  @Input() options: any = []; // Options for the select
  @Input() disabled: any = false; // Disable the select
  @Input() multiple?: boolean = false;   // Enable multiple selection
  @Input() placeholder: string = ''      // Placeholder text
  @Output() change: EventEmitter<Option | Option[]> = new EventEmitter(); // Emit value change
  @Input() control!: FormControl;
  @Input() formControlName!: string;
  selected: string = ''
  @Output() selectedChange = new EventEmitter<any>(); 
  @Output() searchChanged = new EventEmitter<string>();
  @Input() searchFn!: (searchText: string) => Observable<any[]>;
  // @Output() selectionChanged = new EventEmitter<any>();
  searchControl = new FormControl();
  
  private onTouched: () => void = () => { };
  private onChange: (value: any) => void = () => { };
  private isUpdating = false;
  
  constructor(private formGroupDirective: FormGroupDirective, public date: DateService) { }
  
  ngOnInit() {
    if (this.formGroupDirective.form && this.formControlName) {
      this.control = this.formGroupDirective.form.get(this.formControlName) as FormControl;
    }
    
    
    this.searchControl.valueChanges.pipe(debounceTime(300),distinctUntilChanged()).subscribe(value => 
      {
        this.searchChanged.emit(value);
      });
    }
    
    onSelectionChange(selected: any): void {
      this.selectedChange.emit(selected);
      // this.control.patchValue(selected.value);
    }
    
    /** Required for ControlValueAccessor */
    writeValue(value: any): void {
      if (value !== undefined && this.control.value !== value) {
        this.isUpdating = true;
        this.control.setValue(value, { emitEvent: false }); // Prevent event emission
        this.isUpdating = false;
      }
    }
    
    registerOnChange(fn: any): void {
      this.onChange = fn;
      this.control.valueChanges.subscribe(value => {
        if (!this.isUpdating) {
          this.isUpdating = true;
          this.onChange(value);
          this.isUpdating = false;
        }
      });
    }
    
    registerOnTouched(fn: any): void {
      this.onTouched = fn;
    }
    
    onBlur(): void {
      this.onTouched();
    }
  }
  