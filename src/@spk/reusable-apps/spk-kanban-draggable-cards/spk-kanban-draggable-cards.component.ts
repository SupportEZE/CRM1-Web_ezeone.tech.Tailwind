import { Component, Input } from '@angular/core';
import { SpkDropdownsComponent } from '../../../@spk/reusable-ui-elements/spk-dropdowns/spk-dropdowns.component';

@Component({
  selector: 'spk-kanban-draggable-cards',
  standalone: true,
  imports: [SpkDropdownsComponent,SpkDropdownsComponent],
  templateUrl: './spk-kanban-draggable-cards.component.html',
  styleUrl: './spk-kanban-draggable-cards.component.scss'
})
export class SpkKanbanDraggableCardsComponent {
  @Input() taskId!: string;
  @Input() idBg?: string;
  @Input() priorityBg?: string;
  @Input() taskTitle!: string;
  @Input() taskDescription!: string;
  @Input() taskPriority!: string;
  @Input() taskStatus!: string;
  @Input() taskBadges: any[] = [];
  @Input() likes!: number;
  @Input() comments!: number;
  @Input() avatars: string[] = [];
}
