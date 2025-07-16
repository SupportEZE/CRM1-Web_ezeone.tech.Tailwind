import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SpkApexchartsComponent } from '../../spk-apexcharts/apexcharts.component';

@Component({
  selector: 'spk-project-card',
  standalone: true,
  imports: [CommonModule,SpkApexchartsComponent],
  templateUrl: './spk-project-card.component.html',
  styleUrl: './spk-project-card.component.scss'
})
export class SpkProjectCardComponent {
  @Input() title?: string;
  @Input() count?: string | number;
  @Input() percentage?: string;
  @Input() iconClass?: string;
  @Input() badgeClass?: string;
  @Input() chartOptions?: any;
  @Input() chartId?: string;
  @Input() avatarClass?: string;
  @Input() showGraph:boolean=true

}
