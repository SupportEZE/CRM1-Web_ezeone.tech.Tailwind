import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { FormBuilder, FormControl, FormsModule } from '@angular/forms';
import { SortablejsModule } from '@maksim_m/ngx-sortablejs';
import { ToastrModule } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RemoveSpaceService } from '../../../../../core/services/remove-space/removeSpace.service';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { ApiService } from '../../../../../core/services/api/api.service';
import { LogService } from '../../../../../core/services/log/log.service';
import { SweetAlertService } from '../../../../../core/services/alert/sweet-alert.service';
import { MatDialog } from '@angular/material/dialog';
import { ModuleService } from '../../../../../shared/services/module.service';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import { DateService } from '../../../../../shared/services/date.service';
import { FORMIDCONFIG } from '../../../../../../config/formId.config';
import { FormFieldTypes } from '../../../../../utility/constants';
import { ModalsComponent } from '../../../../../shared/components/modals/modals.component';
import { CommonApiService } from '../../../../../shared/services/common-api.service';

@Component({
  selector: 'app-point-category-list',
  imports: [SharedModule,CommonModule,RouterModule,SpkReusableTablesComponent,FormsModule,SortablejsModule,ToastrModule],
  templateUrl: './point-category-list.component.html'
})
export class PointCategoryListComponent {
  range: any;
  customerType:any;
  customerLoginType:any;
  skLoading:boolean = false
  filter:any ={}
  sorting: any = {};
  listData:any =[]
  pagination:any = {}
  submodule:any;
  FORMID:any= FORMIDCONFIG;
  tableData:any =[];
  tableHeader:any =[];
  readonly fieldTypes = FormFieldTypes;
  activeTab:any ='Active';
  userSubTypes:any =[]
  accessRight:any = {};
  constructor(private toastr: ToastrServices,public api:ApiService, public remove:RemoveSpaceService, private logService:LogService, public alert : SweetAlertService, private router: Router, public dialog: MatDialog, private fb: FormBuilder, public moduleService: ModuleService, public comanFuncation: ComanFuncationService, public dateService:DateService, public route:ActivatedRoute, public CommonApiService: CommonApiService) {
    this.range = this.fb.group({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null)
    });        
  }
  
  ngOnInit(){
    const accessRight = this.moduleService.getAccessMap('Masters', 'Point Category');
        if (accessRight) {
            this.accessRight = accessRight;
        }
    this.getSubType();
    const subModule = this.moduleService.getSubModuleByName('Masters', 'Point Category');
    if (subModule) {
      this.submodule = subModule;
    }
   
    this.route.paramMap.subscribe(params => {
      if(params){
        this.customerType = params.get('type_name');
        this.customerLoginType = params.get('login_type');
        if(this.customerLoginType == 'Influencer'){
          this.activeTab = 'Pending'
        }
        else{
          this.activeTab = "Active"
        }
        // this.pageType = editParam ? editParam : 'add';
        this.getList();
      }
    });
  }
  
    getSubType(){
      this.api.post({ 'is_loyalty': true}, 'customer-type/read-dropdown').subscribe(result => {
      if(result['statusCode'] == 200){
        if(result['data']){
          this.userSubTypes = result['data'];
          if (result['data']){
            result.data.forEach((row: any) => row.table_class = 'text-right');
          }
          this.tableHeader = [{ label: "Created At", value: '' }, { label: "Created By", value: '' }, { label: "Point Category", value: '' }, ...result['data'], { label: "Status", value: '' }];
        }
      }
    });
  }

  
  getList() {
    this.skLoading = true;
    this.api.post({ filters: this.filter, 'page': this.pagination.cur_page ?? 1 }, 'point-category/read').subscribe(result => {
      if (result['statusCode']  ===  200) {
        this.skLoading = false;
        this.listData = result['data'];
        this.listData.forEach((row:any) => {
          if(row.status === 'Active'){
            row.isChecked = true
          }
          else{
            row.isChecked = false
          }
        });
        this.pagination = result['pagination'];
      }
    });
  }
  


  // ******status change funcation start*****//
  onToggleChange(newState: boolean, id: string, status: string) {
    this.comanFuncation.statusChange(newState, id, status, this.submodule, 'toggle', 'point-category/update-status',).subscribe((result: boolean) => {
      if (result) {
        this.getList();
      } else {
        this.getList();
      }
    });
  }
  // ******status change funcation end*****//
 
  changeToPagination(btnType: string) {
    if (btnType == 'Previous') {
      if (this.pagination.prev && this.pagination.cur_page > 1) {
        this.pagination.cur_page--;  // Decrement the page number
        this.getList();
      }
    }
    else
    {
      if (this.pagination.next) {
        this.pagination.cur_page++;  // Increment the page number
        this.getList();
      }
    }
  }
  
  changeToPage(newPage: number) {
    this.pagination.cur_page = newPage;
    this.getList();
  }
  // --------//
  
  
  onTabChange(tab: any) {
    this.activeTab = tab;
    this.getList();
  }
  
 
  
  
  onSortChanged(event: { field: string; order: number }) {
    this.sorting = {};
    this.sorting[event.field] = event.order;
    this.getList();
  }
  
  
  handleSelectionChange(event: { category_name: string; selections: string[] }): void {
    const { category_name, selections } = event;
    this.filter[category_name] = selections;
    this.getList();
  }
  
  
  
  
  
  
  
  
  onRefresh(){
    this.filter = {};
    this.getList();
  }
  
  
  // ***** List Logs Modal Start *****//
  openMainLogModal(row_id:string) {
    this.comanFuncation.listLogsModal(this.submodule.sub_module_id, row_id, this.submodule.module_type).subscribe(result => {
    });
  }
  // ***** List Logs Modal End *****//
  
 
  
  goToPage()
  {
    this.router.navigate(['/apps/master/points-category-list/points-category-add']);
  }

  goToEditPage(id:string)
  {
    this.router.navigate(['/apps/master/points-category-list/points-category-edit/edit/'+id]);
  }
  
 
  
}
