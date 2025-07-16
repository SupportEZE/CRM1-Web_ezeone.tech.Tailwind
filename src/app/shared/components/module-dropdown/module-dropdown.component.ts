import { Component, Inject, Input} from '@angular/core';
import { SharedModule } from '../../shared.module';
import { CommonModule } from '@angular/common';
import { ToastrServices } from '../../services/toastr.service ';
import { ApiService } from '../../../core/services/api/api.service';
import { MaterialModuleModule } from '../../../material-module/material-module.module';
import { FormsModule } from '@angular/forms';
import { ComanFuncationService } from '../../services/comanFuncation.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-module-dropdown',
  imports: [SharedModule, CommonModule, MaterialModuleModule, FormsModule],
  templateUrl: './module-dropdown.component.html'
})
export class ModuleDropdownComponent {
  skLoading:boolean = false;
  optionLoading:boolean = false;
  btnDisabled:boolean = false;
  data:any ={}
  @Input() moduleData :any;
  dropDown:any =[];
  dropDownValue:any =[];
  dropDownDependentValue: any = [];
  openIndex: number | null = null; 
  
  constructor(@Inject(MAT_DIALOG_DATA) public modalData: any,private dialogRef: MatDialogRef<ModuleDropdownComponent>,private toastr: ToastrServices, public api:ApiService, private comanFuncation:ComanFuncationService){}
  ngOnInit(){
    if (this.modalData.call_as === 'modal') {
      this.moduleData = this.modalData.moduleData;
    }
    this.getCategoryName();
  }
  
  
  toggleCollapse(index: number) {
    this.openIndex = this.openIndex === index ? null : index;
    this.data.dependent_value_option = '';
  }
  
  delete(cat_id:string, id: string, label:any) {
    this.comanFuncation.delete(id, this.moduleData, label, 'dropdown/delete-option',).subscribe((result: boolean) => {
      if (result === true) {
        this.getOptions(cat_id);
      }
    });
  }
  
  
  getCategoryName()
  {
    this.skLoading = true;
    this.api.post({'module_id':this.moduleData.sub_module_id ? this.moduleData.sub_module_id : this.moduleData.module_id}, 'dropdown/read').subscribe(result => {
      if (result['statusCode'] === 200) {
        this.skLoading = false;
        this.dropDown = result['data']
      }
    });
  }
  
  getOptions(id:string)
  {
    this.dropDownValue =[];
    this.data.dropdown_option = '';
    this.optionLoading = true;
    this.api.post({'dropdown_id':id}, 'dropdown/read-option').subscribe(result => {
      if (result['statusCode'] === 200) {
        this.optionLoading = false
        this.dropDownValue = result['data']
      }
    });
  }
  

  getDependentOptions(id: string) {
    this.dropDownDependentValue = [];
    this.data.dropdown_option = '';
    this.optionLoading = true;
    this.api.post({ 'dropdown_id': id }, 'dropdown/read-option').subscribe(result => {
      if (result['statusCode'] === 200) {
        this.optionLoading = false
        this.dropDownDependentValue = result['data']
      }
    });
  }

  submitOption(id: string, dropdown_name: string, dropDownDependentValue:any)
  {
    if (dropDownDependentValue > 0 &&
      this.data.dependent_value_option === undefined &&
      this.data.dropdown_option === undefined){
      this.toastr.error('Option is required', '', 'toast-top-right');
      return
    }
    else{
      if (!this.data.dropdown_option && this.data.dropdown_option == undefined) {
        this.toastr.error('Option is required', '', 'toast-top-right');
        return
      }
    }

    
    this.btnDisabled = true;
    this.api.post({
      'module_id': this.moduleData.sub_module_id ? this.moduleData.sub_module_id : this.moduleData.module_id,
      'module_name': this.moduleData.sub_module_name ? this.moduleData.sub_module_name : this.moduleData.module_name,
      'module_type': this.moduleData.module_type, 'dropdown_id': id, 'dropdown_name': dropdown_name, 'option_name': this.data.dropdown_option, 'dependent_option_name': this.data.dependent_value_option ? this.data.dependent_value_option : ''
    }, 'dropdown/create-option').subscribe(result => {
      if (result['statusCode'] === 200) {
        this.data.dropdown_option=''
        this.btnDisabled = false;
        this.getOptions(id);
        this.toastr.success(result['message'], '', 'toast-top-right');
      }
      else{
        this.btnDisabled = false;
      }
    });
  }
  
}
