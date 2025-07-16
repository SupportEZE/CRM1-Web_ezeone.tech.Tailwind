import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-pagination-footer',
  imports: [CommonModule, MatDialogModule, FormsModule],
  templateUrl: './pagination-footer.component.html',
})
export class PaginationFooterComponent {
  @Input() currentPage!: number;
  @Input() class!: string;
  @Input() totalPage!: number;
  @Input() pageLimit!: number;
  @Input() listLength!: any;
  @Input() preBtn!: boolean;
  @Input() nextBtn!: boolean;
  @Output() nextButtonClick = new EventEmitter<void>();
  @Output() preButtonClick = new EventEmitter<void>();
  @Output() pageChange = new EventEmitter<number>(); // Emits the new page number
  page: number = 1;
  
  ngOnChanges() {
    this.page = this.currentPage; // Update input when `currentPage` changes
  }
  
  handleNextClick() {
    if (this.page < this.totalPage) {
      this.page++; 
      this.pageChange.emit(this.page);  // Emit the updated page
    }
  }
  
  handlePrevClick() {
    if (this.page > 1) {
      this.page--; 
      this.pageChange.emit(this.page); 
    }
  }
  
  onEnterPress() {
    if (this.page < 1 || this.page > this.totalPage) {
      this.page = this.currentPage; // Reset if out of range
      return;
    }
    this.pageChange.emit(this.page); // Send entered page number to parent
  }
}
