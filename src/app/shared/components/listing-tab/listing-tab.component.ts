import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-listing-tab',
  imports: [CommonModule],
  templateUrl: './listing-tab.component.html',
})
export class ListingTabComponent {
  
  @Input() tabs: any[] = [];
  @Input() activeTab: string = '';
  @Input() countShow :boolean=true;
  @Input() iconShow :boolean=true;
  @Output() tabChange = new EventEmitter<{ tab: string, subTab: string, value?: any }>();
  
  onTabChange(tab: string, subTab: string, value?: any) {
    this.tabChange.emit({ tab, subTab, value });
  }
  
  ngOnChanges(){
  }
}

