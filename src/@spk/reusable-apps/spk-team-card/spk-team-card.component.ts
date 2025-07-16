import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'spk-team-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spk-team-card.component.html',
  styleUrl: './spk-team-card.component.scss'
})
export class SpkTeamCardComponent {
  @Input() icon!: string;
  @Input() iconBackground!: string;
  @Input() label!: string;
  @Input() value!: string;

  @Input() isTeamView: boolean = false; // Determines if the team view should be displayed
  @Input() teamData: Array<{ image: string; name: string; role: string }> = [];
}
