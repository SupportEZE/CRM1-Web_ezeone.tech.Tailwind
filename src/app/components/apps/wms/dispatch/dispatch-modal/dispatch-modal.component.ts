import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { FilePondModule } from 'ngx-filepond';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { ModalHeaderComponent } from '../../../../../shared/components/modal-header/modal-header.component';
import { SpkInputComponent } from '../../../../../../@spk/spk-input/spk-input.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SpkNgSelectComponent } from '../../../../../../@spk/spk-ng-select/spk-ng-select.component';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../../../core/services/api/api.service';
import { LogService } from '../../../../../core/services/log/log.service';
import { CommonApiService } from '../../../../../shared/services/common-api.service';
import { FormValidationService } from '../../../../../utility/form-validation';
import { UploadFileService } from '../../../../../shared/services/upload.service';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { LOGIN_TYPES } from '../../../../../utility/constants';
import { SweetAlertService } from '../../../../../core/services/alert/sweet-alert.service';

@Component({
  selector: 'app-dispatch-modal',
  imports:[SharedModule, FilePondModule, MaterialModuleModule, ModalHeaderComponent, FormsModule, CommonModule, ReactiveFormsModule, SpkReusableTablesComponent],
  templateUrl: './dispatch-modal.component.html'
})
export class DispatchModalComponent {
  dispatchForm: FormGroup = new FormGroup({});
  gatepassForm: FormGroup;
  btnFlag:boolean = false;
  company:any = []
  expandedRowIndex: number | null = null;
  expandedQr: any = null;
  originalData: any = {};

  
  
  constructor(public toastr: ToastrServices, @Inject(MAT_DIALOG_DATA) public modalData: any, public dialogRef: MatDialogRef<DispatchModalComponent>, public api: ApiService, private fb: FormBuilder, private formValidation: FormValidationService, public commonApi: CommonApiService, private logService: LogService, public CommonApiService: CommonApiService, public uploadService: UploadFileService, public alert:SweetAlertService) {
    console.log(modalData, 'modalData');
   


    this.dispatchForm = this.fb.group({
      dispatch_from: ['Company', Validators.required],
      warehouse_id: ['',],
    });
    
    
    this.gatepassForm = this.fb.group({
      invoice_number: [{value:'', disabled: false }, [Validators.required]],
      e_way_number: [{value:'', disabled: false }, Validators.pattern(/^\d{12}$/)],
      driver_name: [{value:'', disabled: false }, Validators.required],
      mobile: [{value:'', disabled: false }, [Validators.required, Validators.minLength(10),Validators.maxLength(10),Validators.pattern(/^[6-9]\d{9}$/)]],
      vehicle_number: [{value:'', disabled: false }, [Validators.required, Validators.pattern(/^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/)]],
      transportation_mode: [{value:'', disabled: false }, Validators.required],
      bilty_number: [{value:'', disabled: false }],
    });
    if (modalData.lastPage === 'bilty_update') {
      this.getGatepassDetail();
      this.gatepassForm.get('invoice_number')?.disable();
      this.gatepassForm.get('e_way_number')?.disable();
      this.gatepassForm.get('driver_name')?.disable();
      this.gatepassForm.get('mobile')?.disable();
      this.gatepassForm.get('vehicle_number')?.disable();
      this.gatepassForm.get('transportation_mode')?.disable();
    }

    if(modalData.lastPage === 'primary-order-detail'){
      this.commonApi.getCustomerData('', LOGIN_TYPES.WHAREHOUSE);
      modalData.item.forEach((row: any, i: number) => {
        const controlName = `inputQty${i}`;
        this.dispatchForm.addControl(controlName, new FormControl('', Validators.required));
        row.remaining_qty = row.total_quantity - row.dispatch_quantity;
        row.inputQty = row.remaining_qty;
        row.item_id = row._id;
        delete row._id;
        
        this.dispatchForm.get(controlName)?.setValue(row.inputQty);
      });

      console.log(modalData.item, 'modalData.item')
    }   
    
    if (modalData.lastPage === 'manual') {
      this.getItems();
    }
    this.dispatchForm.get('dispatch_from')?.valueChanges.subscribe(type => {
      const warehouseControl = this.dispatchForm.get('warehouse_id');
      if (type === 'Warehouse') {
        warehouseControl?.setValidators([Validators.required]);
      } else {
        warehouseControl?.clearValidators();
      }
      warehouseControl?.updateValueAndValidity();
    });
  }
  
  
  
  ngOnInit() {}
  closeModal() {
    this.dialogRef.close();
  }

 
  
  
  getColumn(type:string){
    if(type === 'product'){
      return [
        { label: "Sr. No.", table_class: "Sr. No." },
        { label: "Product Detail", },
        { label: "Order Qty", table_class: "text-center" },
        { label: "Remaining QTY", table_class: "text-right" },
        { label: "Pending Dispatch", table_class: "text-right" },
      ]
    }
    else if (type === 'dispatch_packing'){
      return [
        { label: "Sr. No.", table_class: "Sr. No." },
        { label: "Product Detail"},
        { label: "Qty."},
        { label: "Dispatch Qty." },
      ]
    }
    else if (type === 'item'){
      return [
        { label: "Sr. No.", table_class: "Sr. No." },
        { label: "Product Detail"},
        { label: "Dispatch Qty." },
      ]
    }
    else if (type === 'dispatch_item') {
      return [
        { label: "Sr. No.", table_class: "Sr. No." },
        { label: "Box QR Code No." },
        { label: "Item QR Code No." },
      ]
    }
    else{
      return [
        { label: "Sr. No.", table_class: "Sr. No." },
        { label: "Date Created", },
        { label: "Company Name	",},
        { label: "Order No.",},
      ]
    }
    
  }
  
  toggleExpand(index: number, qr: any): void {
    if (this.expandedRowIndex === index && this.expandedQr?._id === qr._id) {
      this.expandedRowIndex = null;
      this.expandedQr = null;
    } else {
      this.expandedRowIndex = index;
      this.expandedQr = qr;
    }
  }

  getGatepassDetail() {
    this.api.post({ '_id': this.modalData._id }, 'gatepass/detail').subscribe(result => {
      if (result['statusCode'] === 200) {
        // this.skLoading = false;
        const dispatchDetail = result?.data?.gatePassData ?? {};
        if (dispatchDetail){
          this.originalData = dispatchDetail;
          this.gatepassForm.patchValue(dispatchDetail);
        }
        this.modalData.item = result?.data?.linkedOrders ?? [];
      }
    });
  }
  
  onSubmit(){
    this.alert.confirm("Are you sure?", "You want to dispatch plan", "Yes it!").then(result => {
      if (result.isConfirmed) {
        this.modalData.item.forEach((row: any) => {
          Object.entries(row).forEach(([key, value]) => {
            if (key.startsWith('inputQty')) {
              row['planned_qty'] = value;
              delete row[key];
            }
          });
        });
        this.formValidation.removeEmptyControls(this.dispatchForm);
        this.dispatchForm.value.items = this.modalData.item;
        const formPayload = { ...this.dispatchForm.value };
        // Remove all controls starting with 'inputQty'
        Object.keys(formPayload).forEach(key => {
          if (key.startsWith('inputQty')) {
            delete formPayload[key];
          }
        });
        this.api.disabled = true;
        const lastpageData = JSON.parse(JSON.stringify(this.modalData));
        lastpageData.orderDetail.order_id = lastpageData.orderDetail._id
        delete lastpageData.orderDetail.contact_person_info;
        delete lastpageData.orderDetail.contact_person_info;
        delete lastpageData.orderDetail.item;
        delete lastpageData.orderDetail.order_tracking_status;
        const payload = { ...{ 'orderDetail': lastpageData.orderDetail }, ...formPayload }
        this.api.post(payload, 'dispatch/dispatch-plan').subscribe(result => {
          if (result['statusCode'] === 200) {
            this.api.disabled = false;
            this.toastr.success(result['message'], '', 'toast-top-right');
            this.dialogRef.close(true)
          }
        });
      }
    })
  }
  
  
  
  
  
  genrateGatepass() {
    if (this.gatepassForm.valid) {

      const text = this.modalData.lastPage === 'bilty_update' ? 'You want to update gatepass' : 'You want to genrate gatepass'

      this.alert.confirm("Are you sure?", text, "Yes it!").then(result => {
        if (result.isConfirmed) { 
          this.api.disabled = true;
          if (this.modalData.lastPage === 'bilty_update'){
            this.gatepassForm.value._id = this.modalData?._id ?? {};
          }
          else{
            this.gatepassForm.value.dispatch_data = this.modalData?.item ?? [];
          }
          const cleanedPayload = this.formValidation.cleanedPayload(this.gatepassForm.value)

          const isEditMode = this.modalData.lastPage === 'bilty_update' ? true :false;
          if (isEditMode) {
            // result.primaryFields['_id'] = this.productId;
            const noChanges = this.logService.logActivityOnUpdate(
              isEditMode,
              this.originalData,
              this.gatepassForm.value,
              this.modalData.submodule.module_id,
              this.modalData.submodule.title,
              'update',
              this.modalData._id || null,
              () => { },
              this.modalData.submodule.module_type
            );
            if (noChanges) {
              this.api.disabled = false;
              this.toastr.warning('No changes detected', '', 'toast-top-right')
              return;
            }

          }
          const httpMethod = isEditMode ? 'patch' : 'post';
          const functionName = isEditMode ? 'gatepass/update' : 'gatepass/create';
          this.api[httpMethod](cleanedPayload, functionName).subscribe({
            next: (result) => {
              this.api.disabled = false;
              if (result['statusCode'] == 200) {
                this.api.disabled = false;
                this.toastr.success(result['message'], '', 'toast-top-right');
                this.dialogRef.close(true)
              }
            },
          });
        }});
      }
      else {
        this.formValidation.markFormGroupTouched(this.gatepassForm);
      }
      
    }
    
    dispatchItem(row: any, index: number): void {
      const controlName = `inputQty${index}`;
      const control = this.dispatchForm.get(controlName);
      const qty = Number(control?.value);
      if (isNaN(qty) || qty < 0) {
        this.toastr.error('Enter a valid non-negative total_quantity.', '', { positionClass: 'toast-top-right' });
        control?.setValue(null);
        return;
      }
      if ((qty > row.total_quantity) && (row.dispatch_quantity <= 0)) {
        alert('row number ' + index + 1 +  'Only ' + row.total_quantity + ' items allow to dispatch.');
        control?.setValue(row.total_quantity);
        return;
      }
      if (qty > row.remaining_qty) {
        this.toastr.error('row number ' + index + 1 +  `Only ${row.remaining_qty} items remaining to dispatch.`, '', { positionClass: 'toast-top-right' });
        control?.setValue(null);
        return;
      }
      row.inputQty = qty
    }
    
    
    
    
    get visibleRows() {
      return this.itemList?.filter((row:any) => !row.dispatch_info?.qr_genration) || [];
    }
    
  itemLoading: boolean = false;
  itemList:any =[];
     getItems() {
        this.itemLoading = true;
        this.api.post({ 'dispatch_id': this.modalData.id }, 'dispatch/items').subscribe(result => {
          if (result['statusCode'] === 200) {
            this.itemLoading = false;
            this.itemList = result?.data?.items ?? [];
            if (this.itemList.length > 0) {
              this.itemList = this.itemList.map((item: any) => ({
                ...item,
                qty: item.planned_qty,
              }));
            }
          }
        });
      }

    updateQty(row: any) {
      if (Number(row.planned_qty) > Number(row.qty)) {
        row.planned_qty = row.qty
        this.toastr.error('maximum qty allowed ' + Number(row.qty), '', 'toast-top-right');
        return
      }
      this.btnFlag = true;
      this.api.post({ '_id': this.modalData.id, 'item_id': row._id, 'master_box': this.modalData?.item?.label, 'master_box_id': this.modalData?.item?._id, 'planned_qty': row.planned_qty }, 'dispatch/manual-dispatch').subscribe(result => {
        if (result['statusCode'] === 200) {
          this.btnFlag = false;
          this.toastr.success(result['message'], '', 'toast-top-right');
        }
      });
    }
  }
  