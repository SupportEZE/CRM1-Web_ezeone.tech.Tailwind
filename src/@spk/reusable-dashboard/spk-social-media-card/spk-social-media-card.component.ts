import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SharedModule } from '../../../app/shared/shared.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'spk-social-media-card',
  imports: [SharedModule,CommonModule],
  templateUrl: './spk-social-media-card.component.html',
  styleUrl: './spk-social-media-card.component.scss'
})
export class SpkSocialMediaCardComponent {
  @Input() socialmedia! :any;
  @Input() showEditButton: boolean = false;
  @Output() clickEvent = new EventEmitter<boolean>();
  
  
  constructor(private sanitizer: DomSanitizer) {}
  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  

  hitButton(event: any) {
    this.clickEvent.emit(event);
}
}
