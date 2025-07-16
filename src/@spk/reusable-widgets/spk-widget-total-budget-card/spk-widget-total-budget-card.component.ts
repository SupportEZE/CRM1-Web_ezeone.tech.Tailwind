import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spk-widget-total-budget-card',
  standalone: true,
  imports: [],
  templateUrl: './spk-widget-total-budget-card.component.html',
  styleUrl: './spk-widget-total-budget-card.component.scss'
})
export class SpkWidgetTotalBudgetCardComponent {
  @Input() budgetTitle: string = '';
  @Input() liClass?: string = '';
  @Input() budgetAmount: string = '';
  @Input() increasePercentage: string = '';
  @Input() incomeItems: any = []
}
