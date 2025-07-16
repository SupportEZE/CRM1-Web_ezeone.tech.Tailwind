import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { ApiService } from '../../core/services/api/api.service';

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    private socket: Socket;
    
    constructor(public apiService:ApiService) {
        // Connect to the backend
        
        this.socket = io(this.apiService.webSocketUrl, {
            transports: ['websocket'],
            reconnection: true, 
            auth: {
                token:  localStorage.getItem('authToken')
            }
        });
        this.socket.on('exception', (msg: any) => {
            this.apiService.toastr.error(msg.message, '', 'toast-bottom-right');
        })
    }
    eventEmit(eventName:string,data:any){
        this.socket.emit(eventName, data);
        
    }
    // Emit a message to the server
    sendMessage(data: any): void {
        this.socket.emit('supportMessage', data);
    }
    
    // Listen for incoming messages
    receiveMessages() {
        return new Observable<string>((observer) => {
            this.socket.on('appMessage', (msg: string) => {
                observer.next(msg);
            });
        });
    }
    errorListen() {
        return new Observable<string>((observer) => {
            this.socket.on('supportMessageError', (msg: string) => {
                observer.next(msg);
            });
        });
    }
    listen(event:any) {
        return new Observable<string>((observer) => {
            this.socket.on(event, (msg: string) => {
                observer.next(msg);
            });
        });
    }
    userStatus() {
        return new Observable<string>((observer) => {
            this.socket.on('userStatus', (msg: string) => {
                observer.next(msg);
            });
        });
    }
}
