import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  standalone:false,
  templateUrl: './icon-button.component.html',
})
export class IconButtonComponent {
  @Input() icon: string = '';         // The icon to display
  @Input() tooltip: string = '';      // The tooltip for the button
  @Input() buttonClass: string = '';  // The class to be applied to the button (style)
  @Input() tooltipText: string = '';  // The class to be applied to the button (style)
  @Input() disabled: boolean = false;  // The class to be applied to the button (style)

  @Output() clickEvent: EventEmitter<void> = new EventEmitter(); // The click event
  
  // Emit the click event when the button is clicked
  onClick() {
    this.clickEvent.emit();
  }
  
}
