import { Component, Input } from '@angular/core';
import { SharedModule } from '../../../app/shared/shared.module';

@Component({
  selector: 'spk-nft-card',
  imports: [SharedModule],
  templateUrl: './spk-nft-card.component.html',
  styleUrl: './spk-nft-card.component.scss'
})
export class SpkAppsNftCardComponent {
  @Input() nft: any ;
}
