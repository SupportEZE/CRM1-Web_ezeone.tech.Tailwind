import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'spk-apexcharts',
  standalone: true,
  imports: [NgApexchartsModule, CommonModule],
  templateUrl: './apexcharts.component.html',
  styleUrl: './apexcharts.component.scss'
})
export class SpkApexchartsComponent {
  @Input() chartOptions:any;  
}
