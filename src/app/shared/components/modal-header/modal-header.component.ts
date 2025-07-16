import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MaterialModuleModule } from '../../../material-module/material-module.module';


@Component({
  selector: 'app-modal-header',
  imports: [CommonModule, MaterialModuleModule],
  templateUrl: './modal-header.component.html',
})
export class ModalHeaderComponent {
  @Input() title?: string; // Title label
  @Input() closeBtn: boolean = false; // Title label
  @Input() headerClass?: string = 'p-4';
  @Output() close = new EventEmitter<any>();

  
  ngOnInit(){
  }
  
  
  handleClick(): void {
    this.close.emit();
  }
}
