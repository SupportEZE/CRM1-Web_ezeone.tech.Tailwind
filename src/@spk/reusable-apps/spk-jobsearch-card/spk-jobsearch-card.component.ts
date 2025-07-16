import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SpkDropdownsComponent } from '../../reusable-ui-elements/spk-dropdowns/spk-dropdowns.component';

@Component({
  selector: 'spk-jobsearch-card',
  standalone: true,
  imports: [CommonModule,SpkDropdownsComponent],
  templateUrl: './spk-jobsearch-card.component.html',
  styleUrl: './spk-jobsearch-card.component.scss'
})
export class SpkJobsearchCardComponent {
  @Input() job: any ;
  @Input() companyName: string = '';
  @Input() location: string = '';
  @Input() openings: number = 0;
  @Input() education: string = '';
  @Input() experience: string = '';
  @Input() jobType: string = '';
  @Input() buttonClass: string = '';
  @Input() locationClass: string = '';
  @Input() experienceClass: string = '';
  @Input() salaryRange: string = '';
  @Input() salary: string = '';
  @Input() imgSrc?: string = '';
  @Input() ngbDropdown: boolean = false;
  @Input() icons: boolean = false;
  @Input() icon?: boolean = false;
  @Input() buttonIcon?: boolean = false;
  @Input() iconbg?: string = '';
}
