import { Component, Inject } from '@angular/core';
import { ModalHeaderComponent } from '../../../../../shared/components/modal-header/modal-header.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../../../core/services/api/api.service';
import { LogService } from '../../../../../core/services/log/log.service';
import { CommonApiService } from '../../../../../shared/services/common-api.service';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpkNgSelectComponent } from '../../../../../../@spk/spk-ng-select/spk-ng-select.component';
import { FormValidationService } from '../../../../../utility/form-validation';
import { SpkInputComponent } from '../../../../../../@spk/spk-input/spk-input.component';

@Component({
  selector: 'app-product-modal',
  imports: [ModalHeaderComponent, SharedModule, MaterialModuleModule, SpkNgSelectComponent, SpkInputComponent],
  templateUrl: './product-modal.component.html'
})
export class ProductModalComponent {
  
  pointCategoryForm!: FormGroup;
  dispatchForm!: FormGroup;
  pointCategory:any =[];
  originalData:any ={};
  options = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ];
  
  constructor(public toastr: ToastrServices, @Inject(MAT_DIALOG_DATA) public modalData: any, public dialogRef: MatDialogRef<ProductModalComponent>, public api:ApiService, private logService: LogService,public CommonApiService: CommonApiService, private fb: FormBuilder,  private formValidation: FormValidationService){
  }
  
  ngOnInit() {
    this.pointCategoryForm = this.fb.group({
      point_category_id: ['', Validators.required],
      point_category_name: ['', Validators.required],
    });
    
    this.dispatchForm = this.fb.group({
      box_size: ['', Validators.required],
      qr_genration: ['', Validators.required],
      box_with_item: ['', Validators.required],
      uom: ['', Validators.required],
    });
    
    if (this.modalData.pageType === 'point_category'){
      if (this.modalData.point_category_id){
        this.originalData = {'point_category_name': this.modalData.point_category_name }
        this.pointCategoryForm.patchValue({ 'point_category_id': this.modalData.point_category_id });
        this.pointCategoryForm.patchValue({ 'point_category_name': this.modalData.point_category_name });
        this.findName(this.pointCategoryForm.value.point_category_id)
      }
      this.getPointCategory();
    }
    if (this.modalData.pageType === 'dispatch') {
      if (this.modalData.dispatch_config){
        this.modalData.dispatch_config.qr_genration  = this.modalData.dispatch_config.qr_genration === true ? 'Yes' :'No';
        this.modalData.dispatch_config.box_with_item = this.modalData.dispatch_config.box_with_item === true ? 'Yes' : 'No';
        this.originalData = this.modalData.dispatch_config;
        this.dispatchForm.patchValue(this.modalData.dispatch_config)
      }

    }
  }
  
  
  
  submit() {
    if (this.pointCategoryForm.valid) {
      this.pointCategoryForm.value.product_id = this.modalData.product_id;
      const isEditMode = true;
      if (isEditMode) {
        const noChanges = this.logService.logActivityOnUpdate(
          isEditMode,
          this.originalData,
          {'point_category_name':this.pointCategoryForm.value.point_category_name},
          this.modalData.subModule.sub_module_id,
          this.modalData.subModule.title,
          'update',
          this.modalData.product_id || null,
          () => { },
          this.modalData.subModule.module_type
        );
        if (noChanges) {
          this.api.disabled = false;
          this.toastr.warning('No changes detected', '', 'toast-top-right')
          return;
        }
      }
      this.api.disabled = true;
      if (this.pointCategoryForm.value.point_category_name === 'none'){
        this.pointCategoryForm.value.is_delete =  1;
      }
      this.api.post(this.pointCategoryForm.value, 'point-category/point-product-map').subscribe(result => {
        if (result['statusCode'] == 200) {
          this.dialogRef.close(true)
          this.api.disabled = false;
          this.toastr.success(result['message'], '', 'toast-top-right');
        }
      });
    }
    else {
      this.formValidation.markFormGroupTouched(this.pointCategoryForm);
    }
  }
  
  getPointCategory() {
    this.api.post({ 'module_id': this.modalData.subModule.module_id ? this.modalData.subModule.module_id  : '', 'page':1}, 'point-category/read-dropdown').subscribe(result => {
      if (result['statusCode'] == 200) {
        let value = { 'label': 'none', 'value':'none' }
        let data = Array.isArray(result['data']) ? result['data'] : [];
        this.pointCategory = [value, ...data]
      } 
    });
  }
  
  
  findName(event: any) {
    let index = this.pointCategory.findIndex((row: any) => row.value === event);
    if (index !== -1) {
      let name = this.pointCategory[index]['label'];
      this.pointCategoryForm.patchValue({ 'point_category_name': name });
    }
  }
  
  
  onSubmit()
  {
    if (this.dispatchForm.valid) {
     
      this.dispatchForm.value.product_id = this.modalData.product_id;
      const isEditMode = true;
      if (isEditMode) {
        const noChanges = this.logService.logActivityOnUpdate(
          isEditMode,
          this.originalData,
          this.dispatchForm.value,
          this.modalData.subModule.sub_module_id,
          this.modalData.subModule.title,
          'update',
          this.modalData.product_id || null,
          () => { },
          this.modalData.subModule.module_type
        );
        if (noChanges) {
          this.api.disabled = false;
          this.toastr.warning('No changes detected', '', 'toast-top-right')
          return;
        }
      }
      this.api.disabled = true;
      this.dispatchForm.value.qr_genration = this.dispatchForm.value.qr_genration === 'Yes' ? true : false;
      this.dispatchForm.value.box_with_item = this.dispatchForm.value.box_with_item === 'Yes' ? true : false;
      this.api.post(this.dispatchForm.value, 'product/save-dispatch-config').subscribe(result => {
        if (result['statusCode'] == 200) {
          this.dialogRef.close(true)
          this.api.disabled = false;
          this.toastr.success(result['message'], '', 'toast-top-right');
        }
      });
    }
    else {
      this.formValidation.markFormGroupTouched(this.dispatchForm);
    }
  }
  
  
  closeModal() {
    this.dialogRef.close(); // Closes the dialog
  }
}
