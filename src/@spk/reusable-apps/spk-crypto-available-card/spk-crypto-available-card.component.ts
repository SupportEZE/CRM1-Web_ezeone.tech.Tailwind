import { Component, Input } from '@angular/core';

@Component({
  selector: 'spk-crypto-available-card',
  imports: [],
  templateUrl: './spk-crypto-available-card.component.html',
  styleUrl: './spk-crypto-available-card.component.scss'
})
export class SpkCryptoAvailableCardComponent {
  @Input() title:string='' 
    @Input() available: string='';
    @Input() usdValue: string='';
    @Input() currencySymbol: string='';
    @Input() imgSrc: string='';
  buttons=[
    {
      class:"btn btn-primary-light btn-w-lg btn-wave flex-fill",
      text:"primary"
    },
    {
      class:"btn btn-primary1-light btn-w-lg btn-wave flex-fill",
      text:"primary"
    }
  ]
}
