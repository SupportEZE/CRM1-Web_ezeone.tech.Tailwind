import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spk-widget-sales-reusablecards',
  standalone: true,
  imports: [],
  templateUrl: './spk-widget-sales-reusablecards.component.html',
  styleUrl: './spk-widget-sales-reusablecards.component.scss'
})
export class SpkWidgetSalesReusablecardsComponent {
  @Input() borderClass: string = '';
  @Input() badgeClass: string = '';
  @Input() badgeIcon: string = '';
  @Input() percentageChange: string = '';
  @Input() value: string = '';
  @Input() description: string = '';
  @Input() avatarClass: string = '';
  @Input() svg: any = '';
}
