import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared.module';
import { ShowcodeCardComponent } from '../showcode-card/showcode-card.component';

@Component({
  selector: 'app-point-location',
  standalone: true,
  imports: [CommonModule,SharedModule,ShowcodeCardComponent],
  templateUrl: './point-location.component.html',
  styleUrl: './point-location.component.scss'
})
export class PointLocationComponent {
  
  @Input() detail: any;
  @Input() title: string = '';
  @Input() iconClass: string = '';  // Declare the iconClass input
  @Input() actionIcons: boolean = false; // Declare the actionIcons input
  @Output() action = new EventEmitter<any>();
  @Output() loadMap = new EventEmitter<void>(); // Add loadMap event emitter
  
  constructor() {}

  ngOnInit(): void {
    if (this.detail?.lat && this.detail?.long) {
      this.loadMap.emit(); // Emit event to load map
    }
  }

  onAction() {
    this.action.emit(this.detail);
  }
  
}
