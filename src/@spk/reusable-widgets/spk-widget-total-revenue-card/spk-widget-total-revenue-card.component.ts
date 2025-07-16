import { Component, Input } from '@angular/core';
interface ProgressBar {
  width: number;
  colorClass: string;
}

interface RevenueItem {
  title: string;
  amount: string;
  statusText: string;
  statusPercentage: string;
  statusClass: string;
  statusIcon: string;
  iconClass: string;
  type: string;
}
@Component({
  selector: 'app-spk-widget-total-revenue-card',
  standalone: true,
  imports: [],
  templateUrl: './spk-widget-total-revenue-card.component.html',
  styleUrl: './spk-widget-total-revenue-card.component.scss'
})
export class SpkWidgetTotalRevenueCardComponent {
  @Input() cardTitle: string = '';
  @Input() totalRevenue: string = '';
  @Input() mainIncreasePercentage: string = '';
  @Input() progressBars!: ProgressBar[]
  @Input() revenueItems!: RevenueItem[]
}
