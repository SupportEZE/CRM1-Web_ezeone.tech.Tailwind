import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SpkApexchartsComponent } from '../../spk-apexcharts/apexcharts.component';

@Component({
  selector: 'app-spk-widget-top-reusablecard',
  standalone: true,
  imports: [SpkApexchartsComponent,CommonModule],
  templateUrl: './spk-widget-top-reusablecard.component.html',
  styleUrl: './spk-widget-top-reusablecard.component.scss'
})
export class SpkWidgetTopReusablecardComponent {
  @Input() avatarClass!: string;
  @Input() svgPath!: string;
  @Input() title!: string;
  @Input() value!: string;
  @Input() percentage!: string;
  @Input() percentageIcon!: string;
  @Input() percentageClass!: string;
  @Input() chartOptions!: any;
  constructor(private sanitizer: DomSanitizer) {}
  @Input() svg!: SafeHtml; 
  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
