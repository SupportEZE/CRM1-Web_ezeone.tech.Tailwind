import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedModule } from '../../../../../../shared/shared.module';
import { MaterialModuleModule } from '../../../../../../material-module/material-module.module';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SortablejsModule } from '@maksim_m/ngx-sortablejs';
import { CommonModule } from '@angular/common';
import { ToastrServices } from '../../../../../../shared/services/toastr.service ';
import { ApiService } from '../../../../../../core/services/api/api.service';
import { DateService } from '../../../../../../shared/services/date.service';
import { ModuleService } from '../../../../../../shared/services/module.service';
import { FORMIDCONFIG } from '../../../../../../../config/formId.config';
import {LOGIN_TYPES } from '../../../../../../utility/constants';
import { CommonApiService } from '../../../../../../shared/services/common-api.service';
import { SpkInputComponent } from '../../../../../../../@spk/spk-input/spk-input.component';
import { SpkNgSelectComponent } from '../../../../../../../@spk/spk-ng-select/spk-ng-select.component';
import { FormValidationService } from '../../../../../../utility/form-validation';

@Component({
  selector: 'app-spin-win-add',
  imports: [SharedModule,MaterialModuleModule,CommonModule, FormsModule,SortablejsModule, RouterModule,FormsModule, ReactiveFormsModule,SpkInputComponent, SpkNgSelectComponent],
  templateUrl: './spin-win-add.component.html',
})
export class SpinWinAddComponent {
  FORMID:any= FORMIDCONFIG;
  skLoading:boolean = false
  spinForm: FormGroup = new FormGroup({});
  data:any ={}
  @Input() moduleData :any;
  subModule:any;
  inputFields: number[] = [];
  spinWinId:any
  pageType:any = 'add';
  spinWinDetails:any
  @Output() valueChange = new EventEmitter<any>();
  
  
  constructor(private toastr: ToastrServices,  public api: ApiService,  public commonApi: CommonApiService,private fb: FormBuilder, private router: Router, private formValidation: FormValidationService, private route: ActivatedRoute, public moduleService: ModuleService,)
  {
    
  }
  ngOnInit() {    
    const subModule = this.moduleService.getSubModuleByName('IRP', 'Bonus');
    const subSubModule = this.moduleService.getSubSubModuleByName('IRP', 'Bonus', 'Spin & Win');
    if (subSubModule) {
      this.subModule = subSubModule;
    }
    this.route.paramMap.subscribe(params => {
      if(params){
        this.spinWinId = params.get('id');
        const editParam = params.get('edit');
        this.pageType = editParam ? editParam : 'add';
        if(this.spinWinId){
          this.getSpinWinDetail();
        }
      }
    });
    
    this.spinForm = this.fb.group({
      eligible_days: ['', Validators.required],
      customer_type_id: ['', Validators.required],
      customer_type_name: [''],
      point_section: ['', Validators.required],
    });
    
    this.commonApi.getDropDownData(this.subModule.sub_module_id, 'point_section')
    this.commonApi.getCustomerCategorySubType([LOGIN_TYPES.INFLUENCER]);
  }
  
  
  
  onSingleSelectChange(value: any, type?: any) {
    if(type){}
    this.valueChange.emit(value)
  }
  
  findName(event:any) {
    const selectedIds = event;
    if (Array.isArray(selectedIds) && selectedIds.length > 0) {
      const matchedNames = this.commonApi.customerCategorySubType
      .filter((row: any) => selectedIds.includes(row.value))
      .map((row: any) => row.label);
      this.spinForm.patchValue({ customer_type_name: matchedNames });
    }
  }
  
  
  onSubmit() {
    
    if (this.spinForm.valid)
      {
      this.api.disabled = true;
      let formValues = { ...this.spinForm.value };
      let point_section = Number(formValues.point_section);
      let slab_data = Object.keys(formValues)
      .filter(key => key.startsWith('slab_point_'))
      .map(key => ({ slab_point: Number(formValues[key]) }));
      let payload: any = {
        customer_type_name: formValues.customer_type_name || [],
        customer_type_id: formValues.customer_type_id || [],
        point_section: isNaN(point_section) ? 0 : point_section,
        eligible_days: Number(formValues.eligible_days) || 0,
        slab_data: slab_data
      };
      const isEditMode = this.pageType === 'edit';
      const functionName = isEditMode ? 'spin-win/update' : 'spin-win/create';
      if (this.spinWinId) {
        payload._id = this.spinWinId;
      }
      this.api.post(payload, functionName).subscribe({
        next: (result) => {
          this.api.disabled = false;
          if (result['statusCode'] === 200) {
            this.toastr.success(result['message'], '', 'toast-top-right');
            this.router.navigate(['/apps/loyalty/spin-win-list']);
          }
        }
      });
    }
    else{
      this.toastr.error('Form Is Invalid', '', 'toast-top-right')
      this.formValidation.markFormGroupTouched(this.spinForm);
    }
  }  
  
  onSelectionChange(event: any) {
    const selectedValue = Number(event); 
    if (isNaN(selectedValue)) {
      return;
    }
    this.inputFields = Array(selectedValue).fill(0);
    Object.keys(this.spinForm.controls).forEach((key) => {
      if (key.startsWith('slab_point_')) {
        this.spinForm.removeControl(key);
      }
    });
    for (let i = 0; i < selectedValue; i++) {
      this.spinForm.addControl(`slab_point_${i}`, new FormControl('', Validators.required));
    }
  } 
  getSpinWinDetail() {
    this.skLoading = true;
    this.api.post({ _id: this.spinWinId }, 'spin-win/detail').subscribe(result => {
      if (result['statusCode'] === 200) {
        this.skLoading = false;
        this.spinWinDetails = result['data'];
        this.spinWinDetails.point_section = this.spinWinDetails.point_section?.toString()
        this.spinForm.patchValue(this.spinWinDetails)
        if (this.spinWinDetails.slab_data && this.spinWinDetails.slab_data.length) {
          this.inputFields = this.spinWinDetails.slab_data;
          this.spinWinDetails.slab_data.forEach((item: { slab_point: any; }, index: any) => {
            this.spinForm.addControl(
              `slab_point_${index}`,
              new FormControl(item.slab_point, Validators.required)
            );
          });
        }
      }
    });
  }      
  
}
