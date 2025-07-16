import { Component, Input } from '@angular/core';
import { ApiService } from '../../../../../core/services/api/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LogService } from '../../../../../core/services/log/log.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { NgxEditorModule } from 'ngx-editor';
import { SharedModule } from '../../../../../shared/shared.module';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { FORMIDCONFIG } from '../../../../../../config/formId.config';
import { ModuleService } from '../../../../../shared/services/module.service';
import { ShowcodeCardComponent } from '../../../../../shared/components/showcode-card/showcode-card.component';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';

@Component({
  selector: 'app-point-category-add',
  imports: [SharedModule, NgSelectModule, ShowcodeCardComponent, FormsModule,NgxEditorModule,ReactiveFormsModule,CommonModule, MaterialModuleModule],
  templateUrl: './point-category-add.component.html'
})
export class PointCategoryAddComponent {
  submodule:any
  moduleFormId:number =0;
  id:any
  @Input() formFields: any[] = [];
  myForm!: FormGroup;
  skLoading:boolean = false;
  pageType:any = 'add'
  originalData:any={}
  FORMID:any= FORMIDCONFIG;
  pointCategoryForm!: FormGroup;
  formIniatialized: boolean = false;
  userSubTypes:any =[];
  formInitialized = false;
  data:any ={}
  
  
  constructor(private toastr: ToastrServices, public api: ApiService, public dialog:MatDialog, public route: ActivatedRoute, private router: Router, private logService: LogService, private moduleService: ModuleService,private fb: FormBuilder
  ){}
  
  ngOnInit() {
    const subModule = this.moduleService.getSubModuleByName('Masters', 'Point Category');
    if (subModule) {
      this.submodule = subModule;
    }
    
    this.route.paramMap.subscribe(params => {
      if(params){
        this.id = params.get('id');
        const editParam = params.get('edit');
        this.pageType = editParam ? editParam : 'add';
        if(this.id){
          this.getCustomerDetail()
        }
      }
      else{
        this.getSubType();
      }
    });
  }
    
  pointDetail:any ={}
  getCustomerDetail() {
    this.skLoading = true;
    this.api.post({_id: this.id}, 'point-category/detail').subscribe(result => {
      if (result['statusCode']  ===  200) {
        this.skLoading = false;
        this.pointDetail = result['data'];
        this.data.point_category_name = result['data']['point_category_name'];
        let temArray = this.transformData(result['data']['point']);
        this.originalData.point_category_name = result['data']['point_category_name'];
        this.getSubType();
        this.originalData._id = this.id
        this.originalData.point = temArray;
      }
      
    });
    
  }
  
  submit(){
    this.userSubTypes.forEach((row:any) => {
      row.point_value =  Number(row.point_value)
    });
    this.data.point = this.userSubTypes;
    const isEditMode = this.pageType === 'edit';
    if (isEditMode) {
      const noChanges = this.logService.logActivityOnUpdate(
        isEditMode, 
        this.originalData, 
        this.data, 
        this.submodule.sub_module_id, 
        this.submodule.title, 
        'update', 
        this.id || null,
        () => {},
        this.submodule.module_type
      );
      if (noChanges) {
        this.api.disabled = false;
        this.toastr.warning('No changes detected', '', 'toast-top-right')
        return ;
      }
    }
    
    const httpMethod = isEditMode ? 'patch' : 'post';
    const functionName = isEditMode ? 'point-category/update' : 'point-category/create';
    this.api.disabled = true;
    this.data._id = this.id;
    this.api[httpMethod](this.data, functionName).subscribe(result => {
      if(result['statusCode'] == 200){
        this.api.disabled = false;
        this.router.navigate(['/apps/master/points-category-list']);
        this.toastr.success(result['message'], '', 'toast-top-right');
      }
    });
  }
  
  transformData(data: any[]): any[] {
    return data.map(row => ({
      customer_type_name: row.label ? row.label :row.customer_type_name,
      customer_type_id: row.value ? row.value : row.customer_type_id,
      point_value: row.point_value ? Number(row.point_value) : '0',
    }));
  }
  getSubType(){
    this.api.post({'is_loyalty': true}, 'customer-type/read-dropdown').subscribe(result => {
      if(result['statusCode'] == 200){
        if (this.id){
          this.userSubTypes = result['data'].map((item:any) => {
            const match = this.pointDetail.point.find((detail:any) => detail.customer_type_id === item.value);
            return {
              ...item,
              point_value: match ? match.point_value.toString() : 0
            };
          });
          this.userSubTypes = this.transformData(this.userSubTypes)
        }
        else{
          if (result['data']) {
            this.userSubTypes = this.transformData(result['data'])
          }
        }
       
      }
    });
  }
  
  
  
}
