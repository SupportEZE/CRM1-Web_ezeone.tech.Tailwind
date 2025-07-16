import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../../core/services/api/api.service';
import { DateService } from '../../../../../shared/services/date.service';
import { LogService } from '../../../../../core/services/log/log.service';
import { ModuleService } from '../../../../../shared/services/module.service';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { SpkGalleryComponent } from '../../../../../../@spk/spk-reusable-plugins/spk-gallery/spk-gallery.component';
import { ShowcodeCardComponent } from '../../../../../shared/components/showcode-card/showcode-card.component';
import { FormsModule } from '@angular/forms';
import { SpkProductCardComponent } from '../../../../../../@spk/reusable-apps/spk-product-card/spk-product-card.component';
import { NameUtilsService } from '../../../../../utility/name-utils';
import { CommentsComponent } from '../../../../../shared/components/comments/comments.component';
import { MatDialog } from '@angular/material/dialog';
import { TicketStatusChangeModalComponent } from '../status-change-modal/status-change-modal.component';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { AuthService } from '../../../../../shared/services/auth.service';

@Component({
    selector: 'app-ticket-detail',
    imports: [SpkProductCardComponent, SharedModule, MaterialModuleModule, CommonModule, ShowcodeCardComponent, FormsModule, CommentsComponent],
    templateUrl: './ticket-detail.component.html',
})
export class TicketDetailComponent {
    
    @ViewChild('commentList') commentList!: ElementRef;
    comment: string = '';
    ticketId:  any;
    ticketDetail: any;
    formattedKeysFormData: { [key: string]: any } = {};
    ticketDetailFormData:any;
    ticketDetailImages:any = [];
    commentsData:any = [];
    skLoading:boolean = false
    skCommentsLoading:boolean = false
    subModule:any = {};
    logList:any=[];
    orgData: any = {};
    activeTab: any = 'comments';
    accessRight:any = {};
    
    constructor(public dialog:MatDialog, public nameUtils: NameUtilsService,public route: ActivatedRoute, public api:ApiService, private logService:LogService, private dateService: DateService,public moduleService: ModuleService, private authService: AuthService){
        this.orgData = this.authService.getUser();
    }
    
    ngOnInit() {
        const accessRight = this.moduleService.getAccessMap('Ticket');
        if (accessRight) {
            this.accessRight = accessRight;
        }

        const subModule = this.moduleService.getModuleByName('Ticket');
        if (subModule) {
            this.subModule = subModule;
        }
        
        this.route.paramMap.subscribe(params => {
            
            this.ticketId = params.get('id');
            
            if(this.ticketId){
                this.getDetail();
            }
        });
    }
    
    getDetail() {
        this.skLoading = true;
        this.ticketDetailImages =[];
        this.api.post({_id: this.ticketId,module_id:this.subModule.module_id}, 'ticket/detail').subscribe(result => {
            if (result['statusCode']  ===  200) {
                this.skLoading = false;
                this.ticketDetail = result['data'];
                this.ticketDetailImages =this.ticketDetail?.files;
                let element = document.getElementById('task-comments-tab-pane');
                setTimeout(() => {
                    element?.click();
                }, 200);
            }
        });
    }
    
    openModal(data:any) {
        {
            const dialogRef = this.dialog.open(TicketStatusChangeModalComponent, {
                width: '450px',
                data: data
            });
            dialogRef.afterClosed().subscribe(result => {
                if (result === true) {
                    this.getDetail();
                }
            });
        }
    }
    
    getComments() {
        this.getCommentsDetail(); // Load comments
        setTimeout(() => this.scrollToBottom(), 200); // Scroll down
    }
    
    getCommentsDetail() {
        this.skCommentsLoading = true;
        let reqData = {  
            "module_name": this.subModule.module_name ? this.subModule.module_name : '',
            "module_id": this.subModule.module_id ? this.subModule.module_id : '',
            "row_id": this.ticketId,
        }
        this.api.post(reqData, 'comment/read-comments').subscribe(result => {
            if (result['statusCode']  ===  200) {
                this.skCommentsLoading = false;
                this.commentsData = result['data'];
                this.commentsData = this.dateService.formatToDDMMYYYYHHMM(this.commentsData);
                setTimeout(() => this.scrollToBottom(), 100);
            }
        });
    }
    
    postComment()
    {
        if (this.comment) {
            this.api.disabled = true;
            if (this.comment.trim() === '') return;
            let reqData = {  
                "module_name": this.subModule.module_name ? this.subModule.module_name : '',
                "module_id": this.subModule.module_id ? this.subModule.module_id : '',
                "comment":this.comment
            }
            this.api.post(reqData, 'comment/save-comment').subscribe(result => {
                if (result['statusCode']  ===  200) {
                    this.comment = '';
                    this.api.disabled = false;
                    this.getCommentsDetail();
                    
                    setTimeout(() => this.scrollToBottom(), 100);
                }
            });
        }
    }
    
    scrollToBottom() {
        if (this.commentList) {
            setTimeout(() => {
                this.commentList.nativeElement.scrollTop = this.commentList.nativeElement.scrollHeight;
            }, 100);
        }
    }
}
