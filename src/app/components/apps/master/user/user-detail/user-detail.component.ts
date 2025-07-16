import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../../core/services/api/api.service';
import { SweetAlertService } from '../../../../../core/services/alert/sweet-alert.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { ShowcodeCardComponent } from '../../../../../shared/components/showcode-card/showcode-card.component';
import { ComanFuncationService } from '../../../../../shared/services/comanFuncation.service';
import { AuthService } from '../../../../../shared/services/auth.service';
import { NameUtilsService } from '../../../../../utility/name-utils';
import { ModuleService } from '../../../../../shared/services/module.service';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { FORMIDCONFIG } from '../../../../../../config/formId.config';
import { HighlightService } from '../../../../../shared/services/highlight.service';
import { LOGIN_TYPES } from '../../../../../utility/constants';

@Component({
    selector: 'app-user-detail',
    standalone: true,
    imports: [SharedModule, CommonModule, ShowcodeCardComponent, MaterialModuleModule],
    templateUrl: './user-detail.component.html',
})
export class UserDetailComponent {
    FORMID:any= FORMIDCONFIG;
    LOGIN_TYPES = LOGIN_TYPES
    userId: string | null | undefined;
    recentActivities:any = [];
    skLoading:boolean = false
    profilePic:any = {};
    submodule:any;
    accessRight:any = {};
    orgData: any = {}
    activeTab:any = 'Basic Detail';
    pageKey = 'user-detail';
    
    constructor(public route: ActivatedRoute, public api:ApiService, private router: Router, public alert:SweetAlertService, private toastr: ToastrService,public comanFuncation:ComanFuncationService,private authService: AuthService, public nameUtils: NameUtilsService, public moduleService: ModuleService, private highlightService: HighlightService) {}
    ngOnInit() {
        this.orgData = this.authService.getOrg();
        
        const accessRight = this.moduleService.getAccessMap('Customers');
        if (accessRight) {
            this.accessRight = accessRight;
        }
        
        // let highlight = this.highlightService.getHighlight(this.pageKey);
        // if (highlight != undefined) {
        //     this.activeTab = highlight.tab;
        //     this.highlightedId = highlight.rowId;
        //     this.pagination.cur_page = highlight.pageIndex;
        //     this.filter = highlight.filters
        //     this.highlightService.clearHighlight(this.pageKey);
        // }
        
        const subModule = this.moduleService.getModuleByName('Customers');
        const form = this.moduleService.getModuleForm('Customers', this.FORMID.ID['Customer']);
        const tableId = this.moduleService.getModuleTable('Customers', this.FORMID.ID['CustomerTable']);
        
        if (subModule) {
            this.submodule = subModule;
        }
        
        this.route.paramMap.subscribe(params => {
            this.userId = params.get('id');
            
            if(this.userId){
                this.getUserDetail();
            }
        });
    }
    
    readMore: boolean[] = [];
    toggleReadMore(index: number) {
        this.readMore[index] = !this.readMore[index]; // Toggle the specific item's state
    }
    
    isContentOverflowed(element: HTMLElement): boolean {
        const lineHeight = parseFloat(window.getComputedStyle(element).lineHeight);
        const maxLines = 2;
        return element.scrollHeight > lineHeight * maxLines;
    }
    
    
    userDetail: any;
    formattedKeysFormData: { [key: string]: any } = {};
    formattedKeysRecentActivities: { [key: string]: any } = {};
    userDetailFormData:any;
    userDetailImages:any = [];
    
    getUserDetail() {
        this.skLoading = true;
        this.api.post({_id: this.userId}, 'user/read-detail').subscribe(result => {
            if (result['statusCode']  ===  200) {
                this.skLoading = false;
                this.userDetail = result['data'];
                this.recentActivities = result['data']['recent_activities'];
                this.userDetailFormData = result['data']['form_data'];
                this.profilePic = result?.['data']?.['files']?.find((doc: any) => doc.label === 'Profile Pic');
                // Formating
                this.formattedKeysFormData = this.formatAndPrintFormData(this.userDetailFormData);
                this.userDetailImages = result['data']['files'];
            }
        });
    }
    
    formatAndPrintFormData(form: any) {
        const formattedObject: { [key: string]: any } = {}; // Create a new object to store formatted keys and values
        
        for (let key in form) {
            if (form.hasOwnProperty(key)) {
                const formattedKey = key
                .split('_') // Split by underscore
                .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
                .join(' '); // Join with spaces
                
                formattedObject[formattedKey] = form[key]; // Assign the original value to the new formatted key
            }
        }
        
        return formattedObject; // Return the new object with formatted keys
    }
    
    
    onDeleteImage(data: any) {
        this.api.disabled = true;
        this.alert.confirm("Are you sure?")
        .then(result => {
            if (result.isConfirmed) {
                this.api.patch({'_id': this.userId , 'file_id' : data.file_id, 'file_path':data.filepath}, 'user/delete-file').subscribe(result => {
                    if (result['statusCode']  ===  200) {
                        this.api.disabled = false;
                        Swal.fire('Deleted!', result.message, 'success');
                        this.getUserDetail();
                    }
                });
            }
        });
    }
    
    
    editPage(event:any){
        this.router.navigate(['/apps/master/user/user-list/user-detail/'+ this.userId +'/edit']);
    }
    
    isFallback = false;
    onError(event: any) {
        this.isFallback = true;
        event.target.src = `${this.api.rootUrl}brand-logos/${this.orgData?.org_name}/desktop-logo.png`
    }
    
    // ******status change funcation start*****//
    onToggleChange(newState: boolean, id: string, status: string) {
        this.comanFuncation.statusChange(newState, id, status, this.submodule, 'toggle', 'user/update-status').subscribe((result: boolean) => {
            this.getUserDetail();
        });
    }
}