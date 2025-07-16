import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spk-widget-transaction-card',
  standalone: true,
  imports: [],
  templateUrl: './spk-widget-transaction-card.component.html',
  styleUrl: './spk-widget-transaction-card.component.scss'
})
export class SpkWidgetTransactionCardComponent {
  @Input() transactions: Array<{
    title: string,
    date: string,
    iconClass: string,
    avatarClass: string,
    percentage: string,
    isPositive: boolean
  }> = [];
}
