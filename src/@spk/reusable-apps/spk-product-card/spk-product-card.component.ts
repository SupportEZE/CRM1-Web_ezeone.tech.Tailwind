import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { MaterialModuleModule } from '../../../app/material-module/material-module.module';
import { ImageViewModalComponent } from '../../../app/shared/components/image-view-modal/image-view-modalcomponent';
import { ComanFuncationService } from '../../../app/shared/services/comanFuncation.service';

@Component({
  selector: 'spk-product-card',
  standalone: true,
  imports: [RouterModule,CommonModule, MaterialModuleModule],
  templateUrl: './spk-product-card.component.html',
  styleUrl: './spk-product-card.component.scss'
})
export class SpkProductCardComponent {
  @Input() imageData: any;
  @Input() apiPath : any;
  @Input() heading: boolean = true;
  @Input() subHeading: boolean = true;
  @Input() editBtn: boolean = true;
  @Input() delBtn: boolean = true;
  @Output() delete: EventEmitter<void> = new EventEmitter(); // The click event
  @Output() edit: EventEmitter<void> = new EventEmitter(); // The click event
  @Output() editNumber: EventEmitter<void> = new EventEmitter(); // The click event

  constructor(public dialog: MatDialog, public comanFuncation: ComanFuncationService){
  }
  
  onClick() {
    this.delete.emit();
  }

  onEditClick() {
    this.edit.emit();
  }
  onEditNumberClick() {
    this.editNumber.emit();
  }
  
  downloadFile(url: string) {
    window.open(url, '_blank')
  }
}
