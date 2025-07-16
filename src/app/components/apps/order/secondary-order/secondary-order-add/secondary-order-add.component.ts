import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared.module';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { SpkNgSelectComponent } from '../../../../../../@spk/spk-ng-select/spk-ng-select.component';
import { ShowcodeCardComponent } from '../../../../../shared/components/showcode-card/showcode-card.component';
import { CommonModule } from '@angular/common';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SweetAlertService } from '../../../../../core/services/alert/sweet-alert.service';
import { LogService } from '../../../../../core/services/log/log.service';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { ApiService } from '../../../../../core/services/api/api.service';
import { CommonApiService } from '../../../../../shared/services/common-api.service';
import { MatDialog } from '@angular/material/dialog';
import { ModuleService } from '../../../../../shared/services/module.service';
import Swal from 'sweetalert2';
import { CURRENCY_SYMBOLS, LOGIN_TYPES } from '../../../../../utility/constants';
import { StatusChangeModalComponent } from '../../../../../shared/components/status-change-modal/status-change-modal.component';
import { AuthService } from '../../../../../shared/services/auth.service';

@Component({
  selector: 'app-secondary-order-add',
  imports: [
    SharedModule,
    GalleryModule,
    SpkNgSelectComponent, 
    ShowcodeCardComponent,
    CommonModule,
    MaterialModuleModule,
    SpkReusableTablesComponent,
    NgSelectModule,
    ReactiveFormsModule,
    FormsModule],
    templateUrl: './secondary-order-add.component.html',
  })
  export class SecondaryOrderAddComponent {
    CURRENCY_SYMBOLS = CURRENCY_SYMBOLS;
    primaryOrderForm!: FormGroup ;
    orderForm!: FormGroup ;
    filter:any = {};
    data:any = {};
    shippingDetails: any = [];
    submodule:any;
    quantity: number = 1;
    skLoading:boolean = false;
    activeTab:any ='customer';
    showCompleteTab: boolean = false;
    productDetail: any[] = [];
    cartDetail:any[] =[];
    discountDetail:any={};
    selectedCustomerId: string | null = null;
    pagination:any={};
    filterGroups: { [key: string]: any[] } = {};
    showMoreMap: { [key: string]: boolean } = {};
    customer_type_id: any;
    orderSummary: any = {};
    productListLoading = false;
    dropdownLoading = false;
    isCustomerSelected: boolean = false;
    uomOptions: string[] = ['PCS', 'Boxes', 'Cartons'];
    customerCategorySubType: any = [];
    orgData: any = {}
    @Output() valueChange = new EventEmitter<any>();
    
    mainTabs = [
      { name: 'customer', label: 'Customer Details', icon: 'ri-user-3-line' },
      { name: 'product', label: 'Product Detail', icon: 'ri-box-3-line' },
      { name: 'cart', label: 'Cart', icon: 'ri-shopping-cart-line' },
    ];
    
    cartColumn=[
      {label:"Sr. No.",table_class:"Sr. No."},
      {label:"Product Detail",},
      {label:"Price", table_class:"text-right"},
      {label:"Discount", table_class:"text-center"},
      {label:"Unit Price", table_class:"text-right"},
      {label:"Qty", table_class:"text-center"},
      {label:"UOM", table_class:"text-center"},
      {label:"Sub-Total", table_class:"text-right"},
      {label:"GST", table_class:"text-right"},
      {label:"Net Amount", table_class:"text-right"},
    ]
    
    gstType = [
      { label: "GST PAID", value: "GST PAID" },
      { label: "GST EXTRA", value: "GST EXTRA" }
    ]
    
    constructor(
      public moduleService: ModuleService,
      public dialog:MatDialog,
      public CommonApiService: CommonApiService,
      private fb: FormBuilder,
      public api: ApiService,
      private toastr: ToastrServices,
      private logService : LogService,
      public alert : SweetAlertService,
      private authService:AuthService,
    ) {
      this.orgData = this.authService.getUser();
    }
    
    ngOnInit() {
      const subModule = this.moduleService.getSubModuleByName('SFA', 'Order');
      if (subModule) {
        this.submodule = subModule;
      }
      this.orderForm = this.fb.group({
        order_create_remark: ['', Validators.required],
      });    
      this.primaryOrderForm = this.fb.group({
        customer_type_id: [null, Validators.required],
        customer_type_name: [''],
        retailer_id: [null, Validators.required],
        distributor_id: [null, Validators.required],
        customer_id: [null, Validators.required], // used for API call
        gst_type: [null, Validators.required]
      });
      
      let SECONDARY_CUSTOMER: number[] = [];    
      if (this.orgData?.org?.sfa || this.orgData?.org?.dms) {
        SECONDARY_CUSTOMER = [LOGIN_TYPES.SECONDARY];
      }
      this.CommonApiService.getCustomerCategorySubType([LOGIN_TYPES.SECONDARY]);
      //  if (this.selectedCustomerId) {
      this.getCartList();
      // }
    }
    
    // onTabChange(tab: string): void {
    //   if (!this.selectedCustomerId && tab !== 'customer') {
    //     this.toastr.error('Please Select a Customer First', '', 'toast-top-right');
    //     return;
    //   }
    //   this.activeTab = tab;
    //   if (this.activeTab === 'product') {
    //     this.getProductList();
    //   }
    //   if (this.activeTab === 'cart') {
    //     this.getCartList();
    //   }
    // }
    
    onTabChange(tab: string): void {
      // ❌ If tab is 'customer' and cart has items, block
      if (tab === 'customer' && this.cartDetail?.length > 0) {
        this.toastr.error('Please clear cart first', '', 'toast-top-right');
        return;
      }
      
      // ❌ If tab is 'product' and cart has items, block
      if (tab === 'product' && this.cartDetail?.length > 0) {
        this.toastr.error('Please clear cart first', '', 'toast-top-right');
        return;
      }
      
      // ❌ Block if no customer selected and user is navigating to any tab except customer or cart (with empty cart)
      if (!this.selectedCustomerId) {
        if (tab !== 'customer' && !(tab === 'cart' && this.cartDetail?.length === 0)) {
          this.toastr.error('Please Select a Customer First', '', 'toast-top-right');
          return;
        }
      }
      
      // ✅ All validations passed
      this.activeTab = tab;
      
      if (tab === 'product') {
        this.getProductList();
      }
      
      if (tab === 'cart') {
        this.getCartList();
      }
    }
    
    
    onNextTab(tab: string): void {
      this.activeTab = tab;
      if (tab === 'product') {
        this.getProductList();
      }
      if (tab === 'cart') {
        this.getCartList();
      }
    }
    
    onPreviousTab(tab: string): void {
      this.activeTab = tab;
      if (tab === 'product') {
        this.getProductList();
      }
      if (tab === 'cart') {
        this.getCartList();
      }
    }
    
    fetchOrderDropdowns() {
      if (Object.keys(this.filterGroups).length > 0) return; // Prevent reload if already loaded
      this.dropdownLoading = true;
      this.api.post({}, 'order/fetch-order-dropdowns').subscribe((result) => {
        if (result.statusCode === 200) {
          const rawData = result['data'];
          this.filterGroups = {};
          Object.keys(rawData).forEach(key => {
            this.filterGroups[key] = (rawData[key] || []).map((item: any) => ({
              ...item,
              checked: false
            }));
            this.showMoreMap[key] = false;
          });
        }
        this.dropdownLoading = false;
      });
    }
    
    get filterGroupKeys(): string[] {
      return Object.keys(this.filterGroups);
    }
    
    hasAnyValidFilter(key: string): boolean {
      return this.filterGroups[key]?.some((item: any) => item.count > 0);
    }
    
    onFilterChange(groupKey: string, index: number, event: Event): void {
      const checkbox = event.target as HTMLInputElement;
      this.filterGroups[groupKey][index].checked = checkbox.checked;
      // Rebuild final filter object
      this.filter = {};
      Object.keys(this.filterGroups).forEach(key => {
        const selectedLabels = this.filterGroups[key].filter(item => item.checked).map(item => item.label);
        this.filter[key] = selectedLabels;
      });
      this.getProductList(); // API call
    }
    
    onCustomerCategoryChange(value: any) {
      const selected = this.CommonApiService.customerCategorySubType.find((item: any) => item.value === value);
      if (selected) {
        this.primaryOrderForm.patchValue({
          customer_type_name: selected.label
        });
      }
      this.CommonApiService.getCustomerData(value); // get retailers
    }
    
    onCustomerSelected(value: any) {
      const selected = this.CommonApiService.customerData.find((item: any) => item.value === value);
      if (selected) {
        this.primaryOrderForm.patchValue({
          customer_id: selected.value
        });
        this.selectedCustomerId = selected.value; // ✅ retailer ID
      }
      
      this.CommonApiService.getCustomerMapping(value); // get distributors
    }
    
    onUserSelected(distributorId: string): void {
      this.primaryOrderForm.patchValue({
        distributor_id: distributorId
      });
      
      this.isCustomerSelected = true;
      
      // ❌ Don’t override selectedCustomerId here if API needs retailer ID only
    }
    
    getProductList() {
      const retailerId = this.primaryOrderForm.get('retailer_id')?.value;
      if (!retailerId) return;
      
      this.productListLoading = true;
      
      this.api.post({
        customer_id: retailerId,
        filters: this.filter,
        page: 1
      }, 'secondary-order/read-product').subscribe((result) => {
        if (result.statusCode === 200) {
          this.productDetail = result['data'];
          this.discountDetail = result['data']['discount_form'];
          this.pagination = result['pagination'];
          this.fetchOrderDropdowns();
          this.productDetail.forEach((product: any) => {
            product.basic_discount = null;
            this.calculateProductPrice(product);
          });
        }
        this.productListLoading = false;
      });
    }
    
    validateDiscount(row: any): void {
      if (row.basic_discount == null || row.basic_discount === '') return;
      const maxAllowed = +row.discount_form?.basic_discount || 0;
      if (+row.basic_discount > maxAllowed) {
        this.toastr.error('Input Disocunt Cannot be Greater than Basiq Discount', '', 'toast-top-right');
        row.basic_discount = maxAllowed;
      }
      this.calculateProductPrice(row);
    }
    
    calculateProductPrice(product: any): void {
      const gstType = this.primaryOrderForm.get('gst_type')?.value;
      const mrp = +product.mrp || 0;
      const quantity = +product.quantity || 0;
      const gstPercent = +product.gst_percent || 18;
      const discountPercent = product.basic_discount != null ? +product.basic_discount : null;
      product.quantity = quantity;
      if (discountPercent === null || isNaN(discountPercent)) {
        product.unit_price = null;
        product.sub_total = null;
        product.gst = null;
        product.net_amount = null;
        product.discount_amount = null;
        product.net_price_per_unit = null;
        return;
      }
      const discountAmountPerUnit = (mrp * discountPercent) / 100;
      const discountedPrice = mrp - discountAmountPerUnit;
      let unitPrice = 0;
      let gstAmount = 0;
      let subTotal = 0;
      let netAmount = 0;
      if (gstType === 'GST PAID') {
        // unitPrice includes GST
        unitPrice = discountedPrice;
        const basePrice = discountedPrice / (1 + gstPercent / 100);
        const gstPerUnit = unitPrice - basePrice;
        gstAmount = gstPerUnit * quantity;
      } else {
        // GST is extra
        unitPrice = discountedPrice;
        gstAmount = unitPrice * gstPercent / 100 * quantity;
      }
      subTotal = unitPrice * quantity;
      netAmount = subTotal + (gstType === 'GST PAID' ? 0 : gstAmount);
      product.discount_amount = this.toFixed(discountAmountPerUnit * quantity);
      product.unit_price = this.toFixed(unitPrice);
      product.sub_total = this.toFixed(subTotal);
      product.gst = this.toFixed(gstAmount);
      product.net_amount = this.toFixed(netAmount);
      product.net_price_per_unit = this.toFixed(discountedPrice);
    }
    
    recalculateProductAmounts(product: any) {
      const quantity = +product.quantity || 0;
      product.quantity = quantity;
      if (quantity === 0) {
        product.sub_total = 0;
        product.gst = 0;
        product.net_amount = 0;
        return;
      }
      const gstType = this.primaryOrderForm?.get('gst_type')?.value || 'GST EXTRA';
      const gstPercent = +product.gst_percent || 18;
      const unitPrice = +product.unit_price || 0;
      const subTotal = unitPrice * quantity;
      let gstAmount = 0;
      let netAmount = 0;
      if (gstType === 'GST PAID') {
        // GST is included in unit price → no GST added
        const basePrice = unitPrice / (1 + gstPercent / 100);
        const gstPerUnit = unitPrice - basePrice;
        gstAmount = gstPerUnit * quantity;
        netAmount = subTotal; // Already included
      } else {
        // GST extra
        gstAmount = subTotal * gstPercent / 100;
        netAmount = subTotal + gstAmount;
      }
      product.sub_total = this.toFixed(subTotal);
      product.gst = this.toFixed(gstAmount);
      product.net_amount = this.toFixed(netAmount);
    }
    
    toFixed(value: number): number {
      return Math.round(value * 100) / 100;
    }
    
    // getCartList() {
    //   if (!this.selectedCustomerId) return;
    //   this.skLoading = true;
    //   this.api.post({ customer_id: this.selectedCustomerId, filters: this.filter, page: 1 }, 'secondary-order/read-cart').subscribe((result) => {
    //     if (result.statusCode === 200) {
    //       this.cartDetail = result['data']['items'];
    //       this.orderSummary = result['data']['summary'];
    //       this.pagination = result['pagination'];
    //     } 
    //     this.skLoading = false;
    //   });
    // }
    
    getCartList(): void {
      this.skLoading = true;
      this.api.post({ customer_id: this.selectedCustomerId, filters: this.filter, page: 1 },'secondary-order/read-cart').subscribe((result) => {
        this.skLoading = false;
        if (result.statusCode === 200) {
          this.cartDetail = result['data']['items'];
          this.orderSummary = result['data']['summary'];
          this.pagination = result['pagination'];
          if (this.cartDetail.length > 0) {
            this.activeTab = 'cart';
          } else {
            this.activeTab = 'customer';
          }
        }
      });
    }
    
    decreaseQuantity(product: any) {
      if (product.quantity > 1) {product.quantity--;
      } else {
        product.quantity = 0; // allow zero
      }
      this.recalculateProductAmounts(product);
    }
    
    increaseQuantity(product: any) {
      product.quantity = (+product.quantity || 0) + 1;
      this.recalculateProductAmounts(product);
    } 
    
    toggleShowMore(key: string) {
      this.showMoreMap[key] = !this.showMoreMap[key];
    }
    
    onSearch(search: string, type: string): void {
      if (!search || search.trim().length < 2) {
        return;
      }
      if (type === 'customer') {
        const customerTypeId = this.primaryOrderForm.get('customer_type_id')?.value;
        this.CommonApiService.getCustomerData(customerTypeId, LOGIN_TYPES.PRIMARY, search);
      }
    }
    
    changeToPagination(btnType: string) {
      if (btnType == 'Previous') {
        if (this.pagination.prev && this.pagination.cur_page > 1) {
          this.pagination.cur_page--;  // Decrement the page number
          this.getProductList();
        }
      }
      else
      {
        if (this.pagination.next) {
          this.pagination.cur_page++;  // Increment the page number
          this.getProductList();
        }
      }
    } 
    
    changeToPage(newPage: number) {
      this.pagination.cur_page = newPage;
      this.getProductList();
    }
    
    openSchemeModal(scheme_id: any) 
    {
      const dialogRef = this.dialog.open(StatusChangeModalComponent, {
        width: '400px',
        data: {
          'lastPage': 'order-add',
          'scheme_id': scheme_id || null // Pass the row data if it's edit
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result === true){
          this.getProductList();
        }
      });
    }
    
    addOrder(row: any) {
      if (!this.selectedCustomerId) return this.toastr.error('Please select a customer.', '', 'toast-top-right');
      if (!row || !row._id) return this.toastr.error('Invalid product data.', '', 'toast-top-right');
      if (!row.quantity || row.quantity <= 0) return this.toastr.error('Quantity must be greater than 0.', '', 'toast-top-right');
      if (!row.unit_price || row.unit_price <= 0) return this.toastr.error('Unit price is required and must be greater than 0.', '', 'toast-top-right');
      if (!row.uom) return this.toastr.error('Please select Unit of Measure (UOM).', '', 'toast-top-right');
      const distributorId = this.primaryOrderForm.get('distributor_id')?.value;
      this.calculateProductPrice(row);
      const payload: any = {
        customer_id: this.selectedCustomerId,
        customer_type_id: this.customer_type_id,
        product_id: row._id,
        product_code: row.product_code,
        product_name: row.product_name,
        category_name: row.category_name || '--',
        total_quantity: row.quantity,
        mrp: row.mrp,
        unit_price: row.unit_price,
        gross_amount: row.sub_total,
        gst_amount: row.gst,
        gst_percent: row.gst_percent || 18,
        net_amount_with_tax: row.net_amount,
        uom: row.uom,
        discount_percent: row.basic_discount || 0,
        discount_amount: row.discount_amount || 0,
        delivery_from: distributorId || null,
      };
      if (row.scheme_id) {
        payload.scheme_id = row.scheme_id;
      }
      this.api.post(payload, 'secondary-order/add-cart').subscribe((result: any) => {
        if (result.statusCode === 200) {
          this.toastr.success(result.message, '', 'toast-top-right');
          this.getProductList();
        }
      });
    }
    
    placeOrder() {
      const remark = this.orderForm.get('order_create_remark')?.value?.trim();
      const gstType = this.primaryOrderForm.get('gst_type')?.value;
      if (!remark) {
        this.toastr.error('Please enter a remark before placing the order.', '', 'toast-top-right');
        return;
      }
      this.alert.confirm('Do you want to place the order?').then((result) => {
        if (result.isConfirmed) {
          this.api.disabled = true;
          this.api.post({ customer_id: this.selectedCustomerId, order_create_remark: remark, 'gst_type' : gstType },'secondary-order/secondary-order-add').subscribe((result: any) => {
            if (result?.statusCode === 200 || result?.success === true) {
              this.toastr.success(result.message || 'Order placed successfully.', '', 'toast-top-right');
              this.showCompleteTab = true;
              this.activeTab = 'complete';
            } else {
              this.toastr.error(result?.message || 'Failed to place the order.', '', 'toast-top-right');
            }
            this.api.disabled = false;
          });
        }
      });
    }
    
    removeCart() {
      this.alert.confirm("Are you sure you want to clear the cart?").then((result) => {
        if (result.isConfirmed) {
          this.api.disabled = true;
          this.api.patch({ customer_id: this.selectedCustomerId }, 'secondary-order/delete-cart')
          .subscribe((result: any) => {
            if (result.statusCode === 200) {
              Swal.fire('Cleared!', result.message, 'success');
              this.getCartList();
            }
            this.api.disabled = false;
          });
        }
      });
    }
    
    onDeletCart(rowId: any) {
      this.alert.confirm("Are you sure?")
      .then((result) => {
        if (result.isConfirmed) {
          this.api.patch({ _id: rowId, is_delete: 1}, 'secondary-order/delete-cart-item').subscribe(result => {
            if (result['statusCode']  ===  200) {
              this.logService.logActivityOnDelete(this.submodule.module_id, this.submodule.title, 'delete', rowId , 'Order' , this.submodule.module_type);
              Swal.fire('Deleted!', result.message, 'success');
              this.getCartList();
            }                        
          });
        }
      });
    }
    
  }
  