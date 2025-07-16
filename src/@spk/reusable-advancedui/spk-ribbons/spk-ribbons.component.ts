import { Component, Input } from '@angular/core';

@Component({
  selector: 'spk-ribbons',
  imports: [],
  templateUrl: './spk-ribbons.component.html',
  styleUrl: './spk-ribbons.component.scss'
})
export class SpkRibbonsComponent {
  @Input() mainClass: string = '';
  @Input() bodyClass: string = ''; 
  @Input() ribbonClass: string = ''; 
  @Input() title: string = ''; 
  @Input() textAlignment: string = ''; 
  @Input() topTitle?: string = ''; 
  @Input() bottomTitle?: string = ''; 
  @Input() description: string = ''; 
  @Input() descriptionClass: string = ''; 
}
