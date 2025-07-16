import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'spk-pricing-switch-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spk-pricing-switch-card.component.html',
  styleUrl: './spk-pricing-switch-card.component.scss'
})
export class SpkPricingSwitchCardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() price: string = '';
  @Input() perMonth: string = '';
  @Input() additionalCost: string = '';
  @Input() planType: string = '';
  @Input() buttonText: string = '';
  @Input() buttonClass: string = '';
  @Input() features: { name: string, badge?: string, badgeClass?: string, trialPeriod?: string }[] = [];
  @Input() vatTax: string = '';
  @Input() total: string = '';
  @Input() isRecommended: boolean = false;
}
