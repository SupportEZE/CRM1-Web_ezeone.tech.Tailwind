import { Injectable } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastrServices {
  constructor(private toastr: ToastrService) {

  }

// success toastr start
success(msg:string, btntext:any, position:any){
    this.toastr.success(msg, btntext, {
      timeOut: 3000,
      positionClass: position,
    });
  }
// success toastr end

// error toastr start
  error(msg:string, btntext:any, position:any){
    this.toastr.error(msg, btntext, {
      timeOut: 3000,
      positionClass: position,
    });
  }
// error toastr start


// warning toastr start
  warning(msg:string, btntext:any, position:any){
    this.toastr.warning(msg, btntext, {
      timeOut: 3000,
      positionClass: position,
    });
  }
// warning toastr start

// info toastr start
  info(msg:string, btntext:any, position:any){
    this.toastr.info(msg, btntext, {
      timeOut: 3000,
      positionClass: position,
    });
  }
  notification(title:any,msg:string, position:any,disableTimeOut:any){
    this.toastr.info(msg,title, {
      // timeOut: 3000,
      disableTimeOut:disableTimeOut,
      closeButton:true,
      positionClass: position,
    });
  }
// info toastr start


}
