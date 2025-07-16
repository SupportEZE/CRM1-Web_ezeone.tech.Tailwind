import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SpkApexchartsComponent } from '../../spk-apexcharts/apexcharts.component';

@Component({
  selector: 'spk-currency-exchange',
  imports: [CommonModule,SpkApexchartsComponent],
  templateUrl: './spk-currency-exchange.component.html',
  styleUrl: './spk-currency-exchange.component.scss'
})
export class SpkCurrencyExchangeComponent {
  @Input() crypto:any;
}
