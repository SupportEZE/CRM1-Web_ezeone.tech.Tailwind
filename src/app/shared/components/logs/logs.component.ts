import { Component, Inject, Input, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../../shared.module';
import { CommonModule } from '@angular/common';
import { ModalHeaderComponent } from '../modal-header/modal-header.component';

@Component({
  selector: 'app-logs',
  imports: [SharedModule, CommonModule, ModalHeaderComponent, MatDialogModule],
  templateUrl: './logs.component.html',
})
export class LogsComponent {
  
  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public modalData: any, @Optional() private dialogRef: MatDialogRef<LogsComponent>){}
  
  @Input() logList: any[] = [];  // Input for log data
  @Input() skLoading: boolean = false;  // Input for loading state
  @Input() hideHeader: boolean = true;  // Input for loading state
  @Input() closeBtn: boolean = true;  // Input for loading state
  @Input() scrollHeight: string = '550';
  readMore: boolean[] = []
  
  toggleReadMore(index: number): void {
    this.readMore[index] = !this.readMore[index];  // Toggle the specific item's read more state
  }
  
  isContentOverflowed(element: HTMLElement): boolean {
    // Determine if the content is overflowing (exceeds 2 lines)
    const lineHeight = parseFloat(window.getComputedStyle(element).lineHeight);
    const maxLines = 2;
    return element.scrollHeight > lineHeight * maxLines;
  }
  
  close() {
    this.dialogRef.close(); // Closes the dialog
  }
}
