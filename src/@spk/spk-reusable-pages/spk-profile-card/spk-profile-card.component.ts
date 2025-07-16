import { Component, Input } from '@angular/core';
import { SpkDropdownsComponent } from "../../reusable-ui-elements/spk-dropdowns/spk-dropdowns.component";

@Component({
  selector: 'spk-profile-card',
  imports: [SpkDropdownsComponent],
  templateUrl: './spk-profile-card.component.html',
  styleUrl: './spk-profile-card.component.scss'
})
export class SpkProfileCardComponent {
  @Input() name: string='';
  @Input() email: string='';
  @Input() role: string='';
  @Input() avatar: string='';
  @Input() badgeClass: string='';
}
