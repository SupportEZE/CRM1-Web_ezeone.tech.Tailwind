import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModuleModule } from '../../../../../../material-module/material-module.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DateService } from '../../../../../../shared/services/date.service';
import { FormValidationService } from '../../../../../../utility/form-validation';
import { ApiService } from '../../../../../../core/services/api/api.service';
import { ToastrServices } from '../../../../../../shared/services/toastr.service ';
import { ShowcodeCardComponent } from '../../../../../../shared/components/showcode-card/showcode-card.component';
import { LOGIN_TYPES } from '../../../../../../utility/constants';
import { CommonApiService } from '../../../../../../shared/services/common-api.service';
import { SpkInputComponent } from '../../../../../../../@spk/spk-input/spk-input.component';
import { SpkNgSelectComponent } from '../../../../../../../@spk/spk-ng-select/spk-ng-select.component';
import { SpkFlatpickrComponent } from '../../../../../../../@spk/spk-flatpickr/spk-flatpickr.component';

@Component({
  selector: 'app-bonus-point-add',
  imports: [SharedModule,MaterialModuleModule,CommonModule,FormsModule,RouterModule,ReactiveFormsModule,ShowcodeCardComponent,SpkInputComponent,SpkNgSelectComponent, SpkFlatpickrComponent
  ],
  templateUrl: './bonus-point-add.component.html',
})
export class BonusPointAddComponent {
  skLoading:boolean = false
  bonusForm: FormGroup = new FormGroup({});
  today= new Date();
  pointCategoriesData: any = [];
  selectedDistricts: string[] = [];
  selectedStates: string[] = [];
  stateDistricts: { [state: string]: any[] } = {};
  selectAllChecked: { [state: string]: boolean } = {};
  
  
  constructor(
    private toastr: ToastrServices, 
    public api: ApiService,
    private formValidation: FormValidationService,
    private fb: FormBuilder,
    private dateService: DateService,
    private router: Router,
    public commonApi: CommonApiService
  ){
  }
  
  ngOnInit() {    
    this.getPointCategoryData();
    
    this.bonusForm = this.fb.group({
      customer_type_id: [[], Validators.required],
      customer_type_name: [[]],
      title: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      selectedStates: [[], Validators.required],
      rows: this.fb.array([])  
    });
    this.commonApi.getStates()
    this.commonApi.getCustomerCategorySubType([LOGIN_TYPES.INFLUENCER]);
  }
  
  
  findName(event: any) {
    const selectedIds = event;
    if (Array.isArray(selectedIds) && selectedIds.length > 0) {
      const matchedNames = this.commonApi.customerCategorySubType
      .filter((row: any) => selectedIds.includes(row.value))
      .map((row: any) => row.label);
      this.bonusForm.patchValue({ customer_type_name: matchedNames });
    }
  }
  
  
  get rows(): FormArray {
    return this.bonusForm.get('rows') as  FormArray;
  }
  
  populateRows() {
    this.pointCategoriesData.forEach((item:any) => {
      this.rows.push(this.fb.group({
        point_category_name: [item.point_category_name],
        _id: [item._id],
        point_category_value: [item.point_category_value, [Validators.required, Validators.min(0)]]
      }));
    });
  }

  onDateChange() {
    this.bonusForm.get('end_date')?.reset();
  }

  
  onSubmit() {
    if (this.bonusForm.valid) {
      this.api.disabled = true;
      let formValues = { ...this.bonusForm.value };
      // formValues.start_date = this.dateService.formatToYYYYMMDD(formValues.start_date);
      // formValues.end_date = this.dateService.formatToYYYYMMDD(formValues.end_date);
      let selectedStates = this.bonusForm.get('selectedStates')?.value || [];
      let selectedDistricts: string[] = [];
      for (let state of selectedStates) {
        if (this.stateDistricts[state]) {
          selectedDistricts.push(
            ...this.stateDistricts[state]
            .filter(district => this.selectedDistricts.includes(district.value))
            .map(district => district.value)
          );
        }
      }
      
      let pointCategories = this.bonusForm.get('rows')?.value.map((row: any) => ({
        point_category_name: row.point_category_name,
        point_category_id: row._id,
        point_category_value: row.point_category_value
      })) || [];
      let payload = {
        customer_type_name: formValues.customer_type_name || [], customer_type_id: formValues.customer_type_id || [], title: formValues.title, start_date: formValues.start_date,
        end_date: formValues.end_date, state: selectedStates, district: selectedDistricts, product_point: pointCategories
      };
      this.api.post(payload, 'bonus/create').subscribe({
        next: (result) => {
          this.api.disabled = false;
          if (result['statusCode'] === 200) {
            this.toastr.success(result['message'], '', 'toast-top-right');
            this.router.navigate(['/apps/loyalty/bonus']);
            this.bonusForm.reset();
          }
        }
      });  
    }
    else{
      this.toastr.error('Form Is Invalid', '', 'toast-top-right')
      this.formValidation.markFormGroupTouched(this.bonusForm);
    }
  }
  
  getPointCategoryData() {
    this.api.post({}, 'bonus/read-point-category').subscribe(result => {
      if (result['statusCode'] === 200) {
        this.pointCategoriesData = result['data'];
        this.populateRows();
      }
    });
  }
  
  
  
  getDistrict(state: string) {
    this.api.post({ state }, 'postal-code/districts').subscribe(result => {
      if (result.statusCode === 200 && Array.isArray(result.data)) {
        this.stateDistricts[state] = result.data.map((item: any) =>
          typeof item === "string" ? { label: item, value: '' } : item
      );
    } else {
      this.stateDistricts[state] = [];
    }
  });
}

toggleStateSelection(state: any) {
  if (this.selectedStates.includes(state.value)) {
    this.selectedStates = this.selectedStates.filter(s => s !== state.value);
    delete this.stateDistricts[state.value];
  } else {
    this.selectedStates.push(state.value);
    this.getDistrict(state.value);
  }
  this.bonusForm.patchValue({ selectedStates: this.selectedStates });
}

selectAll(event: any, state: string) {
  const checked = (event.target as HTMLInputElement).checked;
  this.selectAllChecked[state] = checked;
  const districts = this.stateDistricts[state];
  districts.forEach(d => d.sel = checked);
  if (checked) {
    const valuesToAdd = districts
    .map(d => d.value)
    .filter(val => !this.selectedDistricts.includes(val));
    this.selectedDistricts.push(...valuesToAdd);
  } else {
    const valuesToRemove = districts.map(d => d.value);
    this.selectedDistricts = this.selectedDistricts.filter(
      val => !valuesToRemove.includes(val)
    );
  }
}


toggleDistrictSelection(district: { label: string; value: string }, state: string) {
  const index = this.selectedDistricts.indexOf(district.value);
  if (index > -1) {
    this.selectedDistricts.splice(index, 1);
  } else {
    this.selectedDistricts.push(district.value);
  }
  const districtObj = this.stateDistricts[state].find(d => d.value === district.value);
  if (districtObj) {
    districtObj.sel = index === -1;
  }
  const allSelected = this.stateDistricts[state].every(d => this.selectedDistricts.includes(d.value));
  this.selectAllChecked[state] = allSelected;
}

getPointControl(index: number): FormControl {
  return this.bonusForm.get(`points.points_${index}`) as FormControl;
}

}
