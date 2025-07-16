import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';



@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }


  // Error Alert Start
  showAlert(msg:any) {
    Swal.fire({
      title: 'Error!',
      text: msg,
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }
  // Error Alert End


  // Success Alert Start
    sucess(msg:any){
      Swal.fire({
        title: msg,
        icon: "success",
        draggable: true
      });
    }
  // Success Alert End


  // Confirmation Alert Start
  confirm(msg: string, textMessage?: string, btnText?: string) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: true
    });
  
    return swalWithBootstrapButtons.fire({
      title: msg,
      text: textMessage ? textMessage : "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "No, cancel!",
      confirmButtonText: btnText ? btnText : "Yes, update it!",
      reverseButtons: false
    });
  }

  

  confirm2(msg:any){
    Swal.fire({
      title: msg,
      icon: "question",
      iconHtml: "؟",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      showCancelButton: true,
      showCloseButton: false
    });
  }
  // Confirmation Alert End


  


}
