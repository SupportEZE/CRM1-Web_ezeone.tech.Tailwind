import { Component, Input } from '@angular/core';

@Component({
  selector: 'spk-search-candidate-card',
  imports: [],
  templateUrl: './spk-search-candidate-card.component.html',
  styleUrl: './spk-search-candidate-card.component.scss'
})
export class SpkSearchCandidateCardComponent {
  @Input() candidate: any;
}
