import { Component, EventEmitter, Output } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { ShowcodeCardComponent } from '../../../../../shared/components/showcode-card/showcode-card.component';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../../core/services/api/api.service';
import { ModuleService } from '../../../../../shared/services/module.service';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { CommonApiService } from '../../../../../shared/services/common-api.service';
import { CURRENCY_SYMBOLS, LOGIN_TYPES } from '../../../../../utility/constants';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { CustomerModalComponent } from '../../../customer/customer-modal/customer-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { SpkNgSelectComponent } from '../../../../../../@spk/spk-ng-select/spk-ng-select.component';
import { StatusChangeModalComponent } from '../../../../../shared/components/status-change-modal/status-change-modal.component';
import { LogService } from '../../../../../core/services/log/log.service';
import Swal from 'sweetalert2';
import { SweetAlertService } from '../../../../../core/services/alert/sweet-alert.service';

@Component({
  selector: 'app-primary-order-add',
  imports: [SharedModule,GalleryModule, SpkNgSelectComponent ,ShowcodeCardComponent,CommonModule,MaterialModuleModule,SpkReusableTablesComponent,NgSelectModule,ReactiveFormsModule, FormsModule],
  templateUrl: './primary-order-add.component.html',
})

export class PrimaryOrderAddComponent {
  @Output() valueChange = new EventEmitter<any>();
  mainTabs = [
    { name: 'customer', label: 'Customer Details', icon: 'ri-user-3-line' },
    { name: 'product', label: 'Product Detail', icon: 'ri-box-3-line' },
    { name: 'cart', label: 'Cart', icon: 'ri-shopping-cart-line' },
    // { name: 'complete', label: 'Complete Order', icon: 'ri-checkbox-circle-line' } 
  ];
  
  cartColumn=[
    {label:"Sr. No.",table_class:"Sr. No."},
    {label:"Product Detail",},
    {label:"Price", table_class:"text-right"},
    {label:"Discount", table_class:"text-right"},
    {label:"Unit Price", table_class:"text-right"},
    {label:"Qty", table_class:"text-center"},
    {label:"UOM", table_class:"text-center"},
    {label:"Sub-Total", table_class:"text-right"},
    {label:"GST", table_class:"text-right"},
    {label:"Net Amount", table_class:"text-right"},
  ]
  
  CURRENCY_SYMBOLS = CURRENCY_SYMBOLS;
  primaryOrderForm!: FormGroup ;
  orderForm!: FormGroup ;
  filter:any = {};
  data:any = {};
  shippingDetails: any = [];
  submodule:any;
  selectedShippingAddress: any = null;
  total_quantity: number = 1;
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
  productListLoading = false; // ✅ for list only
  dropdownLoading = false;    // ✅ for filter sidebar
  isCustomerSelected: boolean = false;
  uomOptions: string[] = ['PCS', 'Boxes', 'Cartons'];
  customerCategorySubType: any = []
  
  constructor(
    public moduleService: ModuleService,
    public dialog:MatDialog,
    public CommonApiService: CommonApiService,
    private fb: FormBuilder,
    public api: ApiService,
    private toastr: ToastrServices,
    private logService : LogService,
    public alert : SweetAlertService,
  ) {}
  
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
      assign_to_id: [null, Validators.required],
    });      
    this.CommonApiService.getCustomerCategorySubType([LOGIN_TYPES.PRIMARY, LOGIN_TYPES.SUB_PRIMARY]);
  }
  
  onTabChange(tab: string): void {
    if (!this.isCustomerSelected && tab !== 'customer') {
      this.toastr.error('Please Select a Customer First', '', 'toast-top-right');
      return;
    }
     if(this.shippingDetails.length === 0){
      this.toastr.error('Customer shipping address is required.', '', 'toast-top-right');
      return
    }
    this.activeTab = tab;
    if (this.activeTab === 'product') {
      this.getProudctList();
    }
    if (this.activeTab === 'cart') {
      this.getCartList();
    }
  }
  
  onNextTab(tab: string): void {
     if(this.shippingDetails.length === 0){
      this.toastr.error('Customer shipping address is required.', '', 'toast-top-right');
      return
    }

    this.activeTab = tab;
    if (tab === 'product') {
      this.getProudctList();
    }
    if (tab === 'cart') {
      this.getCartList();
    }
  }
  
  onPreviousTab(tab: string): void {
    this.activeTab = tab;
    if (tab === 'product') {
      this.getProudctList();
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
    this.getProudctList(); // API call
  }
  
  getProudctList() {
    if (!this.selectedCustomerId) return;
    this.productListLoading = true;
    this.api.post({ customer_id: this.selectedCustomerId, filters: this.filter, page: 1 }, 'order/read-product').subscribe((result) => {
      if (result.statusCode === 200) {
        this.productDetail = result['data'];
        this.discountDetail = result['data']['discount_form'];
        this.pagination = result['pagination'];
        this.fetchOrderDropdowns();
        // 👇 Calculate unit price, sub total, GST and net amount for each product row
        this.productDetail.forEach((row: any) => {
          const mrp = +row.mrp || 0;
          // Step 1: Calculate unit price using all discounts
          const discounts = Object.values(row.discount_form || {}).filter((v: any) => typeof v === 'number') as number[];
          row.unit_price = this.calculateUnitPrice(mrp, discounts);
          // Step 2: Set total_quantity (default 1)
          const total_quantity = +row.total_quantity || 1;
          row.total_quantity = total_quantity;
          // Step 3: Calculate gross_amount
          row.gross_amount = parseFloat((row.unit_price * total_quantity).toFixed(2));  
          const gstRate = 18;
          const gstAmount = row.gross_amount * (gstRate / 100);
          row.gst_amount = parseFloat(gstAmount.toFixed(2));
          row.net_amount_with_tax = parseFloat((row.gross_amount + row.gst_amount).toFixed(2));
        });
      } 
      this.productListLoading = false;
    });
  }  
  
  getCartList() {
    if (!this.selectedCustomerId) return;
    this.skLoading = true;
    this.api.post({ customer_id: this.selectedCustomerId, filters: this.filter, page: 1 }, 'order/read-cart').subscribe((result) => {
      if (result.statusCode === 200) {
        this.cartDetail = result['data']['items'];
        this.orderSummary = result['data']['summary'];
        this.pagination = result['pagination'];
      } 
      this.skLoading = false;
    });
  } 
  
  recalculateProductAmounts(product: any) {
    const total_quantity = +product.total_quantity || 0;
    product.total_quantity = total_quantity;
    if (total_quantity === 0) {
      product.gross_amount = 0;
      product.gst_amount = 0;
      product.net_amount_with_tax = 0;
      return;
    }
    const mrp = +product.mrp || 0;
    const discounts = this.getDiscountArray(product.discount_form);
    product.unit_price = this.calculateUnitPrice(mrp, discounts);
    product.gross_amount = parseFloat((product.unit_price * total_quantity).toFixed(2));
    product.gst_amount = parseFloat((product.gross_amount * 0.18).toFixed(2));
    product.net_amount_with_tax = parseFloat((product.gross_amount + product.gst_amount).toFixed(2));
  }
  
  calculateUnitPrice(mrp: number, discounts: number[]): number {
    let unitPrice = mrp;
    for (const discount of discounts) {
      unitPrice -= (unitPrice * (discount / 100));
    }
    return parseFloat(unitPrice.toFixed(2));
  }
  
  calculateEffectiveDiscount(mrp: number, unitPrice: number): number {
    if (!mrp) return 0;
    const discountAmount = mrp - unitPrice;
    return parseFloat(((discountAmount / mrp) * 100).toFixed(2));
  }
  
  getDiscountBreakdown(mrp: number, discounts: number[]): { label: string, amount: number }[] {
    const breakdown: { label: string, amount: number }[] = [];
    let price = mrp;
    for (const discount of discounts) {
      const discountAmount = parseFloat((price * (discount / 100)).toFixed(2));
      breakdown.push({
        label: `${discount}%`,
        amount: discountAmount
      });
      price -= discountAmount;
    }
    return breakdown;
  }
  
  getTotalDiscountAmount(mrp: number, discounts: number[]): number {
    let price = mrp;
    let total = 0;
    for (const discount of discounts) {
      const amount = parseFloat((price * (discount / 100)).toFixed(2));
      total += amount;
      price -= amount;
    }
    return parseFloat(total.toFixed(2));
  }
  
  getDiscountArray(discountForm: any): number[] {
    return Object.values(discountForm || {}).filter((v: any) => typeof v === 'number') as number[];
  }
  
  decreaseQuantity(product: any) {
    if (product.total_quantity > 1) {
      product.total_quantity--;
    } else {
      product.total_quantity = 0; // allow zero
    }
    this.recalculateProductAmounts(product);
  }
  
  increaseQuantity(product: any) {
    product.total_quantity = (+product.total_quantity || 0) + 1;
    this.recalculateProductAmounts(product);
  }
  
  getTotalDiscountPercent(discountArray: number[]): number {
    let price = 100;
    discountArray.forEach(d => {
      price -= (price * d) / 100;
    });
    return parseFloat((100 - price).toFixed(2));
  }
  
  getDiscountPercentString(discounts: number[]): string {
    return discounts.join(' + ');
  }  
  
  getDiscountSumHtml(discountDetail: any): string {
    if (!discountDetail || typeof discountDetail !== 'object') return '0';
    const values = Object.values(discountDetail).filter(value => typeof value === 'number').map(value => `<span class="text-[13px]">${value}</span>`);return values.join(' + ');
  }
  
  formatLabel(key: string): string {
    return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
  }
  
  toggleShowMore(key: string) {
    this.showMoreMap[key] = !this.showMoreMap[key];
  }
  
  onCustomerCategoryChange(value: any) {
    const selectedValue = this.CommonApiService.customerCategorySubType.find((item: any) => item.value === value);
    if (selectedValue) {
      this.data.customer_type_name = selectedValue.value;
    }
    this.CommonApiService.getCustomerData(this.data.customer_type_name);
  }
  
  onSearch(search: string, type: any) {
    if (type === 'customer') {
      const customerTypeId = this.primaryOrderForm.get('customer_type_id')?.value;
      this.CommonApiService.getCustomerData(customerTypeId, LOGIN_TYPES.PRIMARY, search);
    }
  }
  
  updateSubtotal(product: any) {
    product.gross_amount = parseFloat((product.unit_price * product.total_quantity).toFixed(2));
  }
  
  getShippingDetails(customerId: string) {
    this.selectedCustomerId = customerId; // store the selected ID
    this.isCustomerSelected = true;
    this.skLoading = true;
    this.api.post({ customer_id: customerId }, 'order/fetch-shipping-address').subscribe((result) => {
      if (result.statusCode === 200) {
        this.shippingDetails = result['data'];
        this.selectedShippingAddress = this.shippingDetails[0];
        this.skLoading = false
      }
    });
  }  
  
  handleAddNewAddress(): void {
    const customerTypeId = this.primaryOrderForm.get('assign_to_id')?.value;
    if (!customerTypeId) {
      this.toastr.error('Please Select a Customer First.', '', 'toast-top-right');
      return;
    }
    this.openModal('shipping_address');
  }
  
  changeToPagination(btnType: string) {
    if (btnType == 'Previous') {
      if (this.pagination.prev && this.pagination.cur_page > 1) {
        this.pagination.cur_page--;  // Decrement the page number
        this.getProudctList();
      }
    }
    else
    {
      if (this.pagination.next) {
        this.pagination.cur_page++;  // Increment the page number
        this.getProudctList();
      }
    }
  } 
  
  changeToPage(newPage: number) {
    this.pagination.cur_page = newPage;
    this.getProudctList();
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
        this.getProudctList();
      }
    });
  }
  
  openModal(type: string, row?: any) {
    let data = row ? row : '';
    const dialogRef = this.dialog.open(CustomerModalComponent, {
      width: '768px',
      data: {
        pageType: type,
        fromPrimaryOrderAdd: true, // or omit 
        customer_id: this.primaryOrderForm.get('assign_to_id')?.value,
        data: data,
        submodule: this.submodule || 'order', // adjust as needed
      }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.getShippingDetails(this.primaryOrderForm.get('assign_to_id')?.value); // ✅ Correct way
      }
    });
  }
  
  addOrder(row: any) {
    // Basic presence checks
    if (!this.selectedCustomerId) {
      this.toastr.error('Please select a customer.', '', 'toast-top-right');
      return;
    }
    if (!row || !row._id) {
      this.toastr.error('Invalid product data.', '', 'toast-top-right');
      return;
    }
    if (!row.total_quantity || row.total_quantity <= 0) {
      this.toastr.error('Quantity must be greater than 0.', '', 'toast-top-right');
      return;
    }
    if (!row.unit_price || row.unit_price <= 0) {
      this.toastr.error('Unit price is required and must be greater than 0.', '', 'toast-top-right');
      return;
    }
    if (!row.uom) {
      this.toastr.error('Please select Unit of Measure (UOM).', '', 'toast-top-right');
      return;
    }
    
    const discounts = this.getDiscountArray(row.discount_form);
    const shipping = this.selectedShippingAddress;
    const formattedShippingAddress = `${shipping.shipping_address}, ${shipping.shipping_city.trim()}, ${shipping.shipping_district}, ${shipping.shipping_state} - ${shipping.shipping_pincode}`;
    
    const payload: any = {
      customer_id: this.selectedCustomerId,
      customer_type_id: this.customer_type_id,
      shipping_address: formattedShippingAddress || '',
      product_id: row._id,
      product_code: row.product_code,
      product_name: row.product_name,
      category_name: row.category_name || '--',
      total_quantity: row.total_quantity,
      mrp: row.mrp,
      unit_price: row.unit_price,
      gross_amount: row.gross_amount,
      gst_amount: row.gst_amount,
      gst_percent: row.gst_percent || 18,
      net_amount_with_tax: row.net_amount_with_tax,
      uom: row.uom,
      discount_amount: this.getTotalDiscountAmount(row.mrp, discounts),
      discount_percent: this.getDiscountPercentString(discounts),
    };
    
    // Add scheme_id only if present and truthy
    if (row.scheme_id) {
      payload.scheme_id = row.scheme_id;
    }
    
    this.api.post(payload, 'order/add-cart').subscribe((result: any) => {
      if (result.statusCode === 200) {
        this.toastr.success(result['message'], '', 'toast-top-right');
        this.getProudctList();
      }
    });
  }
  
  placeOrder() {
    const remark = this.orderForm.get('order_create_remark')?.value?.trim();
    if (!remark) {
      this.toastr.error('Please enter a remark before placing the order.', '', 'toast-top-right');
      return;
    }
    this.alert.confirm('Do you want to place the order?').then((result) => {
      if (result.isConfirmed) {
        this.api.disabled = true;
        this.api.post({ customer_id: this.selectedCustomerId, order_create_remark: remark },'order/primary-order-add').subscribe((result: any) => {
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
  
  cartFlag:boolean = false;
  removeCart() {
    this.alert.confirm("Are you sure you want to clear the cart?").then((result) => {
      if (result.isConfirmed) {
        this.cartFlag = true;
        this.api.post({ customer_id: this.selectedCustomerId }, 'order/delete-cart')
        .subscribe((result: any) => {
          if (result.statusCode === 200) {
            Swal.fire('Cleared!', result.message, 'success');
            this.getCartList();
          }
          this.cartFlag = false;
        });
      }
    });
  }
  
  onDeletCart(rowId: any) {
    this.alert.confirm("Are you sure?")
    .then((result) => {
      if (result.isConfirmed) {
        this.api.patch({ _id: rowId, is_delete: 1}, 'order/delete-cart-item').subscribe(result => {
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
