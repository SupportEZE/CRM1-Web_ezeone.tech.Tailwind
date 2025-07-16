import { Component } from '@angular/core';
import { LightboxModule } from 'ng-gallery/lightbox';
import { ShowcodeCardComponent } from '../../../../../../shared/components/showcode-card/showcode-card.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SharedModule } from '../../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { LogService } from '../../../../../../core/services/log/log.service';
import { ModuleService } from '../../../../../../shared/services/module.service';
import { ApiService } from '../../../../../../core/services/api/api.service';
import { SweetAlertService } from '../../../../../../core/services/alert/sweet-alert.service';
import { FORMIDCONFIG } from '../../../../../../../config/formId.config';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModuleModule } from '../../../../../../material-module/material-module.module';
import { StatusChangeModalComponent } from '../../../../../../shared/components/status-change-modal/status-change-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrServices } from '../../../../../../shared/services/toastr.service ';
import { ComanFuncationService } from '../../../../../../shared/services/comanFuncation.service';

@Component({
  selector: 'app-bonus-point-detail',
  imports: [
    SharedModule,
    RouterModule,
    ShowcodeCardComponent, 
    LightboxModule,
    CommonModule,
    FormsModule,
    MaterialModuleModule,
    ReactiveFormsModule,
  ],
  templateUrl: './bonus-point-detail.component.html',
})
export class BonusPointDetailComponent {
  areaBonusForm: FormGroup = new FormGroup({});
  areaBonusDetail: any;
  skLoading : boolean = false;
  stateLoading: boolean = false;
  districtLoading: boolean = false;
  bonusId: any;
  submodule:any =0;
  FORMID:any= FORMIDCONFIG;
  moduleName:string = '';
  moduleFormId:number =0;
  moduleId:number=0
  selectedDistricts: string[] = [];
  selectedState: string | null = null;
  districtList: any[] = [];
  pointCategoriesData: any = [];
  statList: any[] = [];
  isEditing = false;
  logList:any=[];
  selectedStates: string[] = []; 
  documentForm: any;
  stateDistricts: { [state: string]: any[] } = {};
  selectAllChecked: { [state: string]: boolean } = {};
  
  constructor(
    private router: Router,
    public alert:SweetAlertService,
    public route: ActivatedRoute,
    public api:ApiService,
    private toastr: ToastrServices,
    private moduleService: ModuleService,
    private logService:LogService,
    private fb: FormBuilder,
    public dialog:MatDialog,
    public comanFuncation: ComanFuncationService
  ) {
  }
  
  ngOnInit() {
    const subModule = this.moduleService.getSubModuleByName('IRP', 'Bonus');
    const subSubModule = this.moduleService.getSubSubModuleByName('IRP','Bonus', 'Area Bonus');
    const form = this.moduleService.getFormById('IRP', 'Bonus', this.FORMID.ID['BonusFormList']);
    if (subModule) {
      this.moduleId = subModule.module_id;
      this.moduleName = subModule.title;
    }
    if (subSubModule) {
      this.submodule = subSubModule;
      this.moduleName = subSubModule.title;
    }
    if (form) {
      this.moduleFormId = form.form_id;
    }
    
    this.route.paramMap.subscribe(params => {
      this.bonusId = params.get('id');
      if(this.bonusId){
        this.getBonusDetail();
        this.getPointCategoryData();
        
        this.areaBonusForm = this.fb.group({});
      }
    });
  }
  
  
  originalData:any ={}
  getBonusDetail() {
    this.skLoading = true;
    this.api.post({ _id: this.bonusId }, 'bonus/detail').subscribe(result => {
      if (result['statusCode'] === 200) {
        this.skLoading = false;
        this.areaBonusDetail = result['data'];
        this.originalData.state = JSON.parse(JSON.stringify(this.areaBonusDetail['state']));
        this.originalData.district = JSON.parse(JSON.stringify(this.areaBonusDetail['district']));
        this.originalData._id = this.bonusId;
        this.getState();
        this.logService.getLogs(this.submodule.module_id, (logs) => {
          this.logList = logs;
        }, this.bonusId ? this.bonusId : '',this.submodule.module_type);
      }
    });
  }
  

  // ******status change funcation start*****//
  onToggleChange(newState: boolean, id: string, status: string) {
    this.comanFuncation.statusChange(newState, id, status, this.submodule, 'toggle', 'bonus/update-status').subscribe((result: boolean) => {
      this.getBonusDetail();
    });
  }


  getPointCategoryData() {
    this.api.post({}, 'bonus/read-point-category').subscribe(result => {
      if (result['statusCode'] === 200) {
        this.pointCategoriesData = result['data']
      }
    });
  }
  
  getState() {
    this.stateLoading = true;
    this.api.post({}, 'postal-code/states').subscribe(result => {
      if (result.statusCode === 200) {
        this.selectedStates = this.areaBonusDetail?.state || [];
        this.stateLoading = false;
        this.statList = result.data.map((state: any) => {
          const stateName = typeof state === 'string' ? state : state.value;
          const isChecked = this.selectedStates.includes(stateName);
          if (isChecked) {
            state.checked = true,
            this.getDistrict(stateName);
          }
          
          return {
            label: typeof state === 'string' ? state : state.label,
            value: stateName,
            checked: isChecked
          };
        });
      }
    });
  }
  
  getDistrict(state: string) {
    this.districtLoading = true,
    this.api.post({ "state": state }, 'postal-code/districts').subscribe(result => {
      if (result.statusCode === 200) {
        this.selectedDistricts = this.areaBonusDetail?.district || [];
        this.districtList = result.data.map((district: any) => {
          const districtName = typeof district === 'string' ? district : district.value;
          return {
            label: typeof district === 'string' ? district : district.label,
            value: districtName,
            checked: this.selectedDistricts.includes(districtName)
          };
        });
        if (result.statusCode === 200 && Array.isArray(this.districtList)) {
          this.stateDistricts[state] = this.districtList.map((item: any) =>
            typeof item === "string" ? { label: item} : item
        );
      }
      this.districtLoading = false;
      const allSelected = this.stateDistricts[state].every(d => d.checked);
      this.selectAllChecked[state] = allSelected;
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


selectAll(event: any, state: string) {
  const checked = (event.target as HTMLInputElement).checked;
  this.selectAllChecked[state] = checked;
  const districts = this.stateDistricts[state];
  districts.forEach(d => d.checked = checked);
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


toggleSelectAllDistricts(event: Event) {
  const isChecked = (event.target as HTMLInputElement).checked;
  
  if (!this.areaBonusDetail?.district) return;
  this.areaBonusDetail.district.forEach((district: { name: string; selected?: boolean }) => {
    district.selected = isChecked;
  });
  
  this.selectedDistricts = isChecked
  ? this.areaBonusDetail.district.map((district: { name: string }) => district.name)
  : [];
}

updateStatus(type: string)
{
  const dialogRef = this.dialog.open(StatusChangeModalComponent, {
    width: '600px',
    data: {
      'lastPage':type,
      'bonusId':this.bonusId,
      'status':this.areaBonusDetail.status,
    }
  });
  dialogRef.afterClosed().subscribe(result => {
    if(result === true){
      this.getBonusDetail();
    }
  });
}

updateBonusPoints(type: string)
{
  const dialogRef = this.dialog.open(StatusChangeModalComponent, {
    width: '400px',
    data: {
      'lastPage': type,
      'bonusId':this.bonusId,
      'module_id': this.submodule.module_id,
      'module_name': this.moduleName
    }
  });
  dialogRef.afterClosed().subscribe(result => {
    if(result === true){
      this.getBonusDetail();
    }
  });
}

updateArea() {
  const isEditMode = true
  if (isEditMode) {
   const update_data = { 'state': this.selectedStates, 'district': this.selectedDistricts, _id: this.bonusId }
    const noChanges = this.logService.logActivityOnUpdate(
      isEditMode,
      this.originalData,
      update_data,
      this.submodule.module_id,
      this.moduleName,
      'update',
      this.bonusId || null,
      () => { },
      this.submodule.module_type
    );
    if (noChanges) {
      this.api.disabled = false;
      this.toastr.warning('No changes detected', '', 'toast-top-right')
      return;
    }
  
  }
  this.api.disabled = true
  const payload = { state: this.selectedStates, district: this.selectedDistricts, _id: this.bonusId };
  this.api.post(payload, 'bonus/update-states').subscribe(
    (result) => {
      if (result.statusCode === 200) {
        this.api.disabled = false;
        this.toastr.success(result.message, '', 'toast-top-right')
      }
    }
  );
}



}
