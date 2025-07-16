import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SpkApexchartsComponent } from '../../spk-apexcharts/apexcharts.component';

@Component({
  selector: 'app-spk-widget-stackedchart-reusablecard',
  standalone: true,
  imports: [SpkApexchartsComponent],
  templateUrl: './spk-widget-stackedchart-reusablecard.component.html',
  styleUrl: './spk-widget-stackedchart-reusablecard.component.scss'
})
export class SpkWidgetStackedchartReusablecardComponent {
  @Input() title: string = '';
  @Input() value: string = '';
  @Input() percentageChange: string = '';
  @Input() percentage: string = '';
  @Input() changeIcon: string = '';
  @Input() chartOptions: any;
  @Input() chartId: string = '';
  @Input() textClass: string = '';
  @Input() avatarClass: string = '';
  @Input() iconSvg: string = '';
  @Input() changeDirection: 'success' | 'danger' = 'success';
  constructor(private sanitizer: DomSanitizer) {}
  @Input() svg!: SafeHtml; 
  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
