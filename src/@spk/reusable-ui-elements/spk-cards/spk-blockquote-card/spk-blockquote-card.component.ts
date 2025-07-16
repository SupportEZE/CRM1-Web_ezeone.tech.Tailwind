import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'spk-blockquote-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spk-blockquote-card.component.html',
  styleUrl: './spk-blockquote-card.component.scss'
})
export class SpkBlockquoteCardComponent {
  @Input() quote: string = '';  // The quote text
  @Input() author: string = '';  // Author's name
  @Input() source: string = '';  // Citation source
  @Input() footerText: string = '';  // Optional footer text
  @Input() backgroundClass: string = '';  // Optional custom background class
  @Input() isDarkTheme: boolean = false;  // Optional flag for dark theme
  @Output() buttonClick = new EventEmitter<void>();
  
}
