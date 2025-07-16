import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'spk-listview-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spk-listview-card.component.html',
  styleUrl: './spk-listview-card.component.scss'
})
export class SpkListviewCardComponent {
  @Input() showIncORDecBy :boolean=false;
  @Input() showIcon :boolean=true;
  @Input() card!: {

    value?: string ;
    graph?: string ;
    valueClass?: string ;
    percentage?: string ;
    colClass?: string ;
    cardClass?: string ;
    icon?: string ;
    bg?: string ;
    color?: string ;
    customClass?: string ;
    customClass1?: string ;
    titleClass?: string ;
    title?: string ;
    svgClass?: string ;
    percentageIcon?: string ;
   svg?: any; 
 };

 constructor(private sanitizer: DomSanitizer) {}
 sanitizeHtml(html: string): SafeHtml {
   return this.sanitizer.bypassSecurityTrustHtml(html);
 }
 sanitizeIcon(svg: string): SafeHtml {
   return this.sanitizer.bypassSecurityTrustHtml(svg);
 }
}
