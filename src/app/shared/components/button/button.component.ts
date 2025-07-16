import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-button',
  standalone:false,
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() buttonType: string = '';
  @Input() buttonClass: string = '';
  @Input() disabled: boolean = false;
  @Input() formType: 'add' | 'edit' = 'add';
  @Input() iconClass?: string; // Optional icon for normal state
  @Input() loadingIconClass?: string; // Optional loading icon
  @Input() label?: string; // Button label
  
  @Output() buttonClick = new EventEmitter<void>(); // Emit click event
  
  ngOnInit(){
  }
  get buttonText(): string {
    if (this.label) {
      return this.label; // Use custom label if provided
    }
    return this.disabled ? (this.formType === 'edit' ? 'Updating' : 'Saving') : (this.formType === 'edit' ? 'Update' : 'Save');
  }
  
  handleClick(): void {
    if (!this.disabled && this.buttonType === 'submit') {
      this.buttonClick.emit();
    }
  }
}
