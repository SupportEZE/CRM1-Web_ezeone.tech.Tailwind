import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Gallery, GalleryModule, ImageItem, ImageSize, ThumbnailsPosition } from 'ng-gallery';
import { Lightbox, LightboxModule } from 'ng-gallery/lightbox';
import { SharedModule } from '../../../app/shared/shared.module';

@Component({
  selector: 'spk-gallery',
  standalone: true,
  imports: [GalleryModule,LightboxModule, CommonModule,SharedModule],
  templateUrl: './spk-gallery.component.html',
  styleUrl: './spk-gallery.component.scss'
})
export class SpkGalleryComponent {
  @Input() imageData:any=[]
  @Input() imageData1:any=[]
  @Input() mainClass:any
  @Input() colClass:any
  @Input() lightboxClass:string=''
  @Input() badge:any
  @Input() imageName:any
  @Input() gallerize:boolean=false
  @Input() imageWithText:boolean=false
  @Input() imageWithDelete:boolean=false
  @Output() deleteImage = new EventEmitter<number>();
  constructor(public gallery: Gallery, public lightbox: Lightbox) {}
  ngOnInit() {
    /** Basic Gallery Example */
    
    // Creat gallery items
    // this.items = this.imageData.map(
    //   (item) => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl })
    // );
    
    /** Lightbox Example */
    
    // Get a lightbox gallery ref
    const lightboxRef = this.gallery.ref('lightbox');
    
    // Add custom gallery config to the lightbox (optional)
    lightboxRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top,
    });
  }
  
  onDeleteImage(index: any) {
    this.deleteImage.emit(index); // Emit the image to the parent component
  }
}

