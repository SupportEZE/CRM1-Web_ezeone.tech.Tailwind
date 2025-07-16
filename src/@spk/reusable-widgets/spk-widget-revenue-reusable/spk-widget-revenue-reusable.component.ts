import { Component, Input } from '@angular/core';
import { SpkApexchartsComponent } from '../../spk-apexcharts/apexcharts.component';

@Component({
  selector: 'app-spk-widget-revenue-reusable',
  standalone: true,
  imports: [SpkApexchartsComponent],
  templateUrl: './spk-widget-revenue-reusable.component.html',
  styleUrl: './spk-widget-revenue-reusable.component.scss'
})
export class SpkWidgetRevenueReusableComponent {
  @Input() title: string = '';
  @Input() value: string = '';
  @Input() change: string = '';
  @Input() bg: string = '';
  @Input() arrow: string = '';
  @Input() changeType: string = 'success'; // 'success' or 'danger'
  @Input() iconClass: string = ''; // The class for the icon inside the avatar
  @Input() chartOptions: any = {}; // Chart options for ApexCharts
}
