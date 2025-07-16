import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SpkApexchartsComponent } from "../../spk-apexcharts/apexcharts.component";

@Component({
  selector: 'spk-crypto-marketcap-card',
  standalone: true,
  imports: [CommonModule,SpkApexchartsComponent],
  templateUrl: './spk-crypto-marketcap-card.component.html',
  styleUrl: './spk-crypto-marketcap-card.component.scss'
})
export class SpkCryptoMarketcapCardComponent {
  @Input() crypto:any;
}
