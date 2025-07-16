import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'spk-pricing-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spk-pricing-card.component.html',
  styleUrl: './spk-pricing-card.component.scss'
})
export class SpkPricingCardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() price: string = '';
  @Input() perMonth: string = '';
  @Input() additionalCost: string = '';
  @Input() planType: string = '';
  @Input() badge: string = '';
  @Input() buttonText: string = '';
  @Input() bgColor: string = '';
  @Input() buttonClass: string = '';
  @Input() iconPaths: Array<{ d: string; opacity?: string }> = [];
  @Input() features: { name: string, badge?: string, badgeClass?: string, trialPeriod?: string }[] = [];
}
