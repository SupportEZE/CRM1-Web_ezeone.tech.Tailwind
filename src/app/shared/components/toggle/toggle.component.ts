import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle',
  standalone: false,
  templateUrl: './toggle.component.html',
})
export class ToggleComponent {
  @Input() disabled: boolean = false; // Disable toggle
  @Input() checked: boolean = false; // Toggle state
  @Input()  class:string =''
  @Output() checkedChange = new EventEmitter<boolean>(); // Emit state change
  
  handleToggle(): void {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.checkedChange.emit(this.checked);
    }
  }
}
