import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spk-widget-webdesigner-reusablecard',
  standalone: true,
  imports: [],
  templateUrl: './spk-widget-webdesigner-reusablecard.component.html',
  styleUrl: './spk-widget-webdesigner-reusablecard.component.scss'
})
export class SpkWidgetWebdesignerReusablecardComponent {
  @Input() image: string = '';
  @Input() name: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() socialLinks: Array<{ icon: string}> = [];
}
