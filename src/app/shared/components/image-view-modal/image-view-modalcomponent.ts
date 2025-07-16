import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../core/services/api/api.service';
import { MaterialModuleModule } from '../../../material-module/material-module.module';
import { ModalHeaderComponent } from '../modal-header/modal-header.component';


@Component({
  selector: 'app-image-view-modal',
  imports: [CommonModule, MaterialModuleModule, ModalHeaderComponent],
  standalone:true,
  templateUrl: './image-view-modal.component.html',
})
export class ImageViewModalComponent {
  imageUrl:any;
  flipH: boolean = false;
  flipV: boolean = false;
  scale: number = 0.5;
  cale: number = 0.5;
  rotation: number = 0;
  lastX = 0;
  lastY = 0;
  posX = 0;
  posY = 0;
  isDragging = false;
  minScale: number = 0.5;
  maxScale: number = 2;
  
  constructor( @Inject(MAT_DIALOG_DATA) public imageData: any, public api:ApiService,  public dialogRef: MatDialogRef<ImageViewModalComponent>) 
  { }
  ngOnInit() { 
    this.getUrl();
  }


  zoomIn() {
    if (this.scale < this.maxScale) {
      this.scale = Math.min(this.scale + 0.1, this.maxScale);
    }
  }

  zoomOut() {
    if (this.scale > this.minScale) {
      this.scale = Math.max(this.scale - 0.1, this.minScale);
    }
  }
  
  rotate() {
    this.rotation += 90;
  }
  
  
  flipHorizontal() {
    this.flipH = !this.flipH;
  }
  
  flipVertical() {
    this.flipV = !this.flipV;
  }
  
  
  getUrl(){
    this.api.post({ '_id': this.imageData._id }, this.imageData.apiPath).subscribe((result: any) => {
      if (result['statusCode'] ===200){
        this.imageUrl = result['data']['signed_url']
      }
    })
  }

  startDragging(event: MouseEvent | TouchEvent) {
    this.isDragging = true;
    const clientX = this.getClientX(event);
    const clientY = this.getClientY(event);
    this.lastX = clientX;
    this.lastY = clientY;
  }

  stopDragging() {
    this.isDragging = false;
  }

  onDrag(event: MouseEvent | TouchEvent) {
    if (!this.isDragging) return;
    const clientX = this.getClientX(event);
    const clientY = this.getClientY(event);
    this.posX += clientX - this.lastX;
    this.posY += clientY - this.lastY;
    this.lastX = clientX;
    this.lastY = clientY;
  }

  private getClientX(event: MouseEvent | TouchEvent): number {
    return (event instanceof MouseEvent) ? event.clientX : event.touches[0].clientX;
  }

  private getClientY(event: MouseEvent | TouchEvent): number {
    return (event instanceof MouseEvent) ? event.clientY : event.touches[0].clientY;
  }

  closeModal() {
    this.dialogRef.close();
  }
}
