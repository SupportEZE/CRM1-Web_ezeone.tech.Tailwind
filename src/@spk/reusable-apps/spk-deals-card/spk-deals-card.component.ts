import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SpkDropdownsComponent } from '../../reusable-ui-elements/spk-dropdowns/spk-dropdowns.component';

@Component({
  selector: 'spk-deals-card',
  standalone: true,
  imports: [CommonModule,SpkDropdownsComponent],
  templateUrl: './spk-deals-card.component.html',
  styleUrl: './spk-deals-card.component.scss'
})
export class SpkDealsCardComponent {
  @Input() avatarUrl: string = '';
  @Input() name: string = '';
  @Input() amountType: string = '';
  @Input() timestamp: string = '';
  @Input() companyName: string = '';
  @Input() amount: string = '';
  @Input() additionalCompanyName: string = '';
}
