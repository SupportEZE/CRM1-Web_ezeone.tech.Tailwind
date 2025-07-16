import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api/api.service';
import { Observable } from 'rxjs';
import { API_TYPE, LOGIN_TYPES } from '../../utility/constants';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class CommonApiService {
    listPageData:any = {};
    PageTableData:any = {};
    allPageHeaders:any = [];
    PageHeaders:any = [];
    orgData:any={}
    constructor(public api: ApiService, private authService :AuthService) {
        this.orgData = this.authService.getOrg();
        // this.getEncrypt();
    }
    
    getHeaderConfigListing(moduleTableId: number, moduleFormId: number): Observable<any> {
        return this.api.post(
            { platform: 'web', table_id: moduleTableId, form_id: moduleFormId }, 'table-builder/read'
        );
    }
    
    userData:any=[]
    getUserData(login_type_ids?:any, search?:any ){
        this.api.post({login_type_ids:login_type_ids, 'search':search}, 'user/read-dropdown').subscribe((result: any) => {
            if (result['statusCode'] === 200) {
                this.userData = result['data'] 
            } 
        })
    }
    
    assignUserData:any=[]
    getAssignUserData(customer_id:any){
        this.api.post({"customer_id" : customer_id}, 'user/assign-users').subscribe((result: any) => {
            if (result['statusCode'] === 200) {
                this.assignUserData = result['data'] 
            } 
        })
    }

    fcmToken:any;
    setFCM(){
        if(!localStorage.getItem('fcmToken'))return;
        this.api.post({fcm_token:localStorage.getItem('fcmToken')}, 'notification/set-fcm').subscribe((result: any) => {
            if (result['statusCode'] === 200) {
                this.userData = result['data'] 
            } 
        })
    }
    customerTypeData:any=[]
    getCustomerTypeData(){
        let PRIMARY_CUSTOMER: number[] = [];
        let SECONDARY_CUSTOMER: number[] = [];
        let INFLUENCER: number[] = [];
        
        
        if (this.orgData.sfa || this.orgData.sfa){
            PRIMARY_CUSTOMER = [LOGIN_TYPES.PRIMARY, LOGIN_TYPES.SUB_PRIMARY];
            SECONDARY_CUSTOMER = [LOGIN_TYPES.SECONDARY];
        }
        if (this.orgData.irp) {
            INFLUENCER = [LOGIN_TYPES.INFLUENCER]
        }
        
        
        
        const login_type_ids = [...(PRIMARY_CUSTOMER || []), ...(SECONDARY_CUSTOMER || []), ...(INFLUENCER || [])]
        this.api.post({login_type_ids:login_type_ids}, 'customer-type/read-dropdown').subscribe((result: any) => {
            if (result['statusCode'] === 200) {
                this.customerTypeData = result['data'] 
            } 
        })
    }
    customerData:any=[]
    getCustomerData(cust_type_id?: any, login_type_id?: any, search?:any){
        const payload = {
            ...(cust_type_id && { customer_type_id: cust_type_id }),
            ...(login_type_id && { login_type_id: login_type_id }),
            ...(search && { search: search })
        };
        
        this.api.post(payload, 'customer/read-dropdown').subscribe((result: any) => {
            if (result['statusCode'] === 200) {
                this.customerData = result['data'] 
            } 
        })
    }
    // unreadChatCount:any = 0
    // getUnreadChat(){
    //     this.api.post({}, 'chat/unread-chat-count').subscribe((result: any) => {
    //         if (result['statusCode'] === 200) {
    //             if(result['data']?.length)this.unreadChatCount = result['data'][0]?.count || 0
    //         } 
    //     })
    // }
    
    
    // dropDownData:any=[];
    // getDropDownData(moduleId:number,dropDownName:string){
    //     let reqData = {
    //         "module_id": moduleId,
    //         "dropdown_name": dropDownName
    //     }
    //     this.api.post(reqData, 'dropdown/read-dropdown').subscribe((result: any) => {
    //         if (result['statusCode'] === 200) {
    //             this.dropDownData = result['data'] 
    //         } 
    //     })
    // }
    
    dropDownData: { [key: string]: any[] } = {};
    
    getDropDownData(moduleId: number, dropDownName: string) {
        let reqData = {
            "module_id": moduleId,
            "dropdown_name": dropDownName
        }
        this.api.post(reqData, 'dropdown/read-dropdown').subscribe((result: any) => {
            if (result['statusCode'] === 200) {
                this.dropDownData[dropDownName] = result.data;
            }
        })
    }
    getFormData(moduleFormId: number){
        return this.api.post(
            { platform: 'web', form_id: moduleFormId }, 'form-builder/read'
        );
    }
    
    statList:any=[];
    getStates(search?:any) {
        this.api.post({ 'filters':{'search': search}}, 'postal-code/states').subscribe(result => {
            if (result.statusCode === 200) {
                this.statList = result.data;
            }
        })
    }
    
    getDistricts(state: string): Observable<any> {
        return this.api.post({ state: state }, 'postal-code/districts');
    }
    
    productList:any=[];
    getProduct(search?: any) {
        this.api.post({page : 1, 'dropdown-name': 'Product', filters: { 'search': search }}, 'product/read-dropdown').subscribe(result => {
            
            if (result.statusCode === 200) {
                this.productList = result.data;
            }
        })
    }
    
    // ***** Login Type ID Funcation Start ***** //
    loginType:any=[]
    getLoginType(login_type_ids:any){
        this.api.post({"login_type_ids" : login_type_ids}, 'rbac/read-login-types').subscribe(result => {
            if (result['statusCode'] === 200) {
                this.loginType = result['data'] 
            } 
        })
    }
    // ***** Login Type ID Funcation End ***** //
    
    // ***** Login Type ID Funcation Start ***** //
    customerMapping:any=[]
    getCustomerMapping(customer_id:any){
        this.api.post({"customer_id" : customer_id}, 'customer/read-customer-to-customer-mapping').subscribe(result => {
            if (result['statusCode'] === 200) {
                this.customerMapping = result['data'] 
            } 
        })
    }
    // ***** Login Type ID Funcation End ***** //
    
    
    // ***** Customer Type ID Funcation Start ***** //
    customerCategorySubType:any=[]
    getCustomerCategorySubType(login_sub_type_id:any, search?:any){
        this.api.post({ "login_type_id": login_sub_type_id, 'search': search}, 'rbac/read-customer-type').subscribe(result => {
            if (result['statusCode'] === 200) {
                this.customerCategorySubType = result['data'] 
            } 
        })
    }
    // ***** Customer Type ID Funcation End ***** //
    
    enquiryData:any=[]
    getEnquiryData(login_sub_type_id:any){
        this.api.post({"login_type_id" : login_sub_type_id}, 'quotation/read-enquiry').subscribe(result => {
            if (result['statusCode'] === 200) {
                this.enquiryData = result['data'] 
            } 
        })
    }

    // getEncrypt() {
    //     this.api.post({}, 'control/keys', API_TYPE.AUTH).subscribe(result => {
    //         if (result['statusCode'] === 200) {
    //             this.api.encrypt = result['data']['crypto']
    //         }
    //     })
    // }
}

// this.api.post({"form_id":this.moduleFormId, 'platform':'web'}, 'form-builder/read').subscribe(result => {
//     if(result['statusCode'] == 200){
//         if (result?.data?.form_data) {
//             this.originalFormFields = JSON.parse(JSON.stringify(result.data.form_data));
//         }
//         this.formFields = result['data']['form_data'];
//         this.skLoading = false;
//         this.formFields.forEach((feild:any) => {
//             this.util.createValidation(feild);
//         });
//         this.initializeForm();

//     }
// });