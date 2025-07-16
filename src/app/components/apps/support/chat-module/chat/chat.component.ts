import {
    Component,
    ElementRef,
    HostListener,
    inject,
    Renderer2,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';
import { SpkDropdownsComponent } from '../../../../../../@spk/reusable-ui-elements/spk-dropdowns/spk-dropdowns.component';
import { SpkGalleryComponent } from '../../../../../../@spk/spk-reusable-plugins/spk-gallery/spk-gallery.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { ApiService } from '../../../../../core/services/api/api.service';
import { ChatService } from '../../../../../shared/services/chat.service';
import moment from 'moment';
import { FormsModule } from '@angular/forms';
import { SkeletonComponent } from '../../../../../shared/components/skeleton/skeleton.component';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { AuthService } from '../../../../../shared/services/auth.service';


@Component({
    selector: 'app-chat',
    standalone: true,
    imports: [
        FormsModule,
        CommonModule,
        SharedModule,
        RouterModule,
        SkeletonComponent,
        OverlayscrollbarsModule,
        MaterialModuleModule
    ],
    templateUrl: './chat.component.html',
})
export class ChatComponent {
    active: any;
    closeResult = '';
    isOpen: boolean = false;
    skLoading: boolean = false;
    recents: any =[]
    activeUser :any = {};
    constructor(public apiService:ApiService,public chatService: ChatService,private authService: AuthService){}
    
    messages:any=[]
    message:string='';
    loginId:string=''
    @ViewChild('inputField') messageInput: any;
    reqSent:boolean = false
    intervalId:any;
    OrgLoginData:any = {};
    orgData: any = {}
    
    ngOnInit() {
        this.orgData = this.authService.getOrg();
        
        this.getPendingChats();
        
        this.chatService.listen('newChat').subscribe((message: any) => {
            if (message) this.getPendingChats(false);
        });
        
        this.chatService.listen('chatValidationError').subscribe((message: any) => {
            if (message)  this.apiService.toastr.error(message.message, '', 'toast-bottom-right');
        });
        
        this.OrgLoginData = this.authService.getUser();
        this.loginId = this.OrgLoginData?._id
    }
    
    handleClick(activeUser: any): void {
        this.activeUser = activeUser;
        if (window.innerWidth <= 992) {
            document.querySelector('.main-chart-wrapper ')?.classList.add('responsive-chat-open');
        }
        
        this.messages =[];
        this.message ='';
        if (this.receiveMessagesSubs) {
            this.receiveMessagesSubs.unsubscribe();
        }
        if (this.errSubs) {
            this.errSubs.unsubscribe();
        }
        setTimeout(() => {
            const input :any= document.querySelector('#myInput');
            if (input) {
                input.focus();
            }
        }, 1000);
        
        this.getRoomId();
    }
    
    close(): void {
        this.chatService.eventEmit('leaveRoom',this.activeUser.room_id)
        this.activeUser = {};
        this.messages =[];
        this.message ='';
        if (this.receiveMessagesSubs) {
            this.receiveMessagesSubs.unsubscribe();
        }
        if (this.errSubs) {
            this.errSubs.unsubscribe();
        }
    }  
    detailsclick() {
        document.querySelector('.chat-user-details ')?.classList.add('open');
    }
    
    removedetails() {
        document.querySelector('.main-chart-wrapper ')?.classList.remove('responsive-chat-open');
    }
    removedetails1() {
        document.querySelector('.main-chart-wrapper ')?.classList.remove('responsive-chat-open');
    }
    
    search:string='';
    getPendingChats(showSkeleton:any = true){
        if(showSkeleton)this.reqSent = false;
        this.skLoading = true;
        this.apiService.post({search:this.search},'chat/pending-chats').subscribe((result:any)=>{
            this.reqSent = true;
            this.skLoading = false;
            if(result['statusCode'] == 200){
                this.recents = result['data'];
                this.recents.map(async (item:any)=>{
                    item.time = moment(item.created_at).utc().format('hh:mm a')
                    item.message = item.last_message;
                    if(item?.files){
                        let index = item.files.findIndex((r :any)=> (r.label == 'Profile Pic'));
                        if(index != -1) {item.image = item.files[index].signed_url}
                    }
                })
            }
        },err=>{
            this.reqSent = true;
            this.skLoading = false;
        })
    }
    receiveMessagesSubs: any = null;
    errSubs: any = null;
    userStatus:string = 'Offline';
    getRoomId(){
        
        let reqData = {receiver_id : this.activeUser.sender_id,receiver_type:this.activeUser.sender_type}
        this.apiService.post(reqData,'chat/room-id').subscribe((result:any)=>{
            if(result['statusCode'] == 200){
                this.activeUser.room_id = result['data'].room_id;
                this.chatService.eventEmit('supportJoinRoom',{room_id:this.activeUser.room_id,receiver_type:this.activeUser.sender_type,receiver_id:this.activeUser._id})
                this.getPreviousMessages();
                this.receiveMessagesSubs = this.chatService.receiveMessages().subscribe((message: any) => {
                    this.messages.push({message: message.message , type:'recieved', time : moment(message.created_at).format('hh:mm a')});
                    this.scrollToBottom();
                });
                this.errSubs = this.chatService.errorListen().subscribe((message: any) => {
                    this.apiService.toastr.error(message.message, '', 'toast-bottom-right');
                });
                this.chatService.listen('appStatus').subscribe((message: any) => {
                    this.userStatus = message.status;
                });
                
                
            }
        })
    }
    getPreviousMessages(){
        
        let reqData = {room_id:this.activeUser.room_id}
        this.apiService.post(reqData,'chat/read-chat-message').subscribe((result:any)=>{
            if(result['statusCode'] == 200){
                result['data'].map((r:any)=>{
                    r.time = moment(r.created_at).format('hh:mm a')
                })
                this.messages = [...result['data'],...this.messages]
                setTimeout(() => {
                    this.scrollToBottom();        
                }, 100);
                
            }
        })
    }
    
    sendMessage() {
        if(this.message.trim()){
            this.chatService.sendMessage({sender_id:this.loginId, receiver_id:this.activeUser.sender_id, message:this.message ,room_id:this.activeUser.room_id,platform:'web',chat_id:this.activeUser._id,created_at : moment().utc()});
            this.messages.push({ message: this.message.trim(),sender_id:this.loginId, type:'sent',time : moment().format('hh:mm a')});
            this.message = ''
            setTimeout(() => {
                this.scrollToBottom();
            }, 100);
        }
    }
    
    ngOnDestroy(): void {
        if (this.receiveMessagesSubs) {
            this.receiveMessagesSubs.unsubscribe();
        }
        if (this.errSubs) {
            this.errSubs.unsubscribe();
        }
        this.chatService.eventEmit('destroy',{room_id:this.activeUser.room_id,messages:this.messages});
    }
    @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any): void {
        this.chatService.eventEmit('destroy',{room_id:this.activeUser.room_id,messages:this.messages});
    }
    
    @ViewChild('scrollContainer')
    private scrollContainer!: ElementRef;
    
    
    scrollToBottom() {
        
        const element = this.scrollContainer.nativeElement;
        element.scrollTop = element.scrollHeight;
        
    }
    
    isFallback = false;
    onError(event: any) {
        this.isFallback = true;
        event.target.src = `${this.apiService.rootUrl}brand-logos/${this.orgData?.org_name}/desktop-logo.png`
    }
    
}
