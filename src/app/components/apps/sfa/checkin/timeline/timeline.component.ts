import { Component, Input } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { SpkProductCardComponent } from '../../../../../../@spk/reusable-apps/spk-product-card/spk-product-card.component';
import moment from 'moment';
import { RemoveSpaceService } from '../../../../../core/services/remove-space/removeSpace.service';

@Component({
  selector: 'app-timeline',
  imports: [SharedModule,SpkProductCardComponent],
  templateUrl: './timeline.component.html',
})
export class TimelineComponent {
  @Input() listingData!: any;
  groupedData: any = {};
  Object = Object;
  
  ngOnInit() {
    this.groupDataByDate();
  }
  constructor(public remove:RemoveSpaceService,){}
  
  groupDataByDate() {
    this.groupedData = this.listingData.reduce((acc: any, item: any) => {
      const date = new Date(item.activity_date);
      const formattedDate = moment(date).format('D MMM y');
      if (!acc[formattedDate]) {
        acc[formattedDate] = [];
      }
      
      acc[formattedDate].push(item);
      return acc;
    }, {});
  }
  
  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
