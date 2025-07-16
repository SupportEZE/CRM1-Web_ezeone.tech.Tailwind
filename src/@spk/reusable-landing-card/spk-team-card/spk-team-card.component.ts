import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'spk-team-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spk-team-card.component.html',
  styleUrl: './spk-team-card.component.scss'
})
export class SpkTeamCardComponent {
  @Input() name!: string;
  @Input() role!: string;
  @Input() teamClass!: string;
  @Input() class1!: string;
  @Input() description!: string;
  @Input() bodyClass!: string;
  @Input() image!: string;
  @Input() backgroundColor!: string;
  @Input() badgeColor!: string;
  @Input() showIcons!: boolean;
  @Input() showButtons!: boolean;

  @Output() presentClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() leaveClicked: EventEmitter<void> = new EventEmitter<void>();

  onPresentClick() {
    // Emit the event when the "Present" button is clicked
    this.presentClicked.emit();
  }
  onleaveClicked(){
    this.leaveClicked.emit();
  }
}
