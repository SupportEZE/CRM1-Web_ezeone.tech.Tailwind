import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModuleModule } from '../../app/material-module/material-module.module';

@Component({
  selector: 'spk-input-listing',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModuleModule],
  templateUrl: './spk-input-listing.component.html'
})
export class SpkInputListingComponent {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() model: string = '';
  @Output() modelChange = new EventEmitter<string>();
  @Output() enterKey = new EventEmitter<void>();

  onInputChange(value: string): void {
    this.model = value;
    this.modelChange.emit(value);
  }
  
  debugKey(event: KeyboardEvent) {
  }
  
  onEnter(): void {
    this.enterKey.emit();
  }

  clearInput(): void {
    this.model = '';
    this.modelChange.emit('');
  }
}
