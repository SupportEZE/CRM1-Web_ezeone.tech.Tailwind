import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spk-widget-budget-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spk-widget-budget-card.component.html',
  styleUrl: './spk-widget-budget-card.component.scss'
})
export class SpkWidgetBudgetCardComponent {
  @Input() title: string = '';
  @Input() footer: boolean = true;

  @Input() subtitle: string = '';
  @Input() mainValue: string = '';
  @Input() increasedAmount: string = '';
  @Input() increasedPercentage: string = '';
}
