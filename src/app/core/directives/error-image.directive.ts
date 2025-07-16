import { Directive, HostListener, Input, ElementRef } from '@angular/core';

@Directive({
  selector: 'img[appErrorImage]',
//   standalone: true
})
export class ErrorImageDirective {
  @Input() appErrorImage: string = 'https://via.placeholder.com/150'; // Default image URL

  constructor(private el: ElementRef) {}

  @HostListener('error')
  onError() {
    this.el.nativeElement.src = this.appErrorImage; // Replace broken image with default
  }
}
