import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-page-sub-header',
  standalone:false,
  // imports: [],
  templateUrl: './page-sub-header.component.html',
})
export class PageSubHeaderComponent {
  @Input() pageTitle: string = '';
  @Input() class: string = '';

  @Input() listLength!: number;
  @Input() importIcon: string = 'ri-upload-cloud-line';
  @Input() btnShow1Icon: string = 'ri-file-list-line';
  @Input() btnShow2Icon: string = 'ri-apps-2-add-line';
  @Input() refreshLabel: string = 'Refresh';
  @Input() importLabel: string = 'Import';
  @Input() logsLabel: string = 'Refresh';
  @Input() addBtnLabel: string = 'Add Product';
  @Output() onRefresh = new EventEmitter<void>();
  @Output() logBtn = new EventEmitter<void>();
  @Output() importBtn = new EventEmitter<void>();
  @Input() btnShow!: boolean;
  @Input() btnShow1!: boolean;
  @Input() btnShow2!: boolean;
  @Input() btnShow3!: boolean;
  @Output() button1 = new EventEmitter<void>();


  // Method to trigger refresh action
  handleRefresh() {
    this.onRefresh.emit();
  }

  openModal() {
    this.logBtn.emit();
  }



  // // Method to trigger add product action
  // handlebutton1() {
  //   this.button1.emit();
  // }

}
