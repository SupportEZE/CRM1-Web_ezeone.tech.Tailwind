import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'spk-accordions',
  imports: [CommonModule,FormsModule],
  templateUrl: './spk-accordions.component.html',
  styleUrl: './spk-accordions.component.scss'
})
export class SpkAccordionsComponent {
@Input() accordions:any;
@Input() groupClass:any;
@Input() alwaysOpen?:any ;
toggleAccordion(accordion: any): void {
  accordion.active = !accordion.active;
}
constructor(private sanitizer: DomSanitizer) {}
sanitizeHtml(html: string): SafeHtml {
  return this.sanitizer.bypassSecurityTrustHtml(html);
}
sanitizeIcon(svg: string): SafeHtml {
  return this.sanitizer.bypassSecurityTrustHtml(svg);
}
}
