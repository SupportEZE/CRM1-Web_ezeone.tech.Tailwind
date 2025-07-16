import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SpkApexchartsComponent } from '../../spk-apexcharts/apexcharts.component';

@Component({
  selector: 'spk-invoicelist-card',
  standalone: true,
  imports: [CommonModule,SpkApexchartsComponent],
  templateUrl: './spk-invoicelist-card.component.html',
  styleUrl: './spk-invoicelist-card.component.scss'
})
export class SpkInvoicelistCardComponent {
  @Input() title: string = '';
  @Input() amount: number = 0;
  @Input() unit: string = '';
  @Input() badgeText: string = '';
  @Input() percentageChange: number = 0;
  @Input() percentageColor: string = 'text-muted';
  @Input() trendIcon: string = 'ti ti-arrow-up';
  @Input() bgColorClass: string = 'bg-primary';
  @Input() iconPath: string = '';

  @Input('chartOptions') chartOptions:any;
}
