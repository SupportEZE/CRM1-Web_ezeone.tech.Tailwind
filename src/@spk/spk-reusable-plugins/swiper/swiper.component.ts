import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, Input, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import Swiper from 'swiper';
import { register } from 'swiper/element';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

Swiper.use([Autoplay, Navigation, Pagination]);
register();

@Component({
  selector: 'spk-swiper',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './swiper.component.html',
  styleUrl: './swiper.component.scss',
})
export class SwiperComponent {
  @Input() imageData: any[] = [];
  @Input() swiperClass: string = '';
  @Input() spaceBetween: number = 10;
  @Input() slidesPerView!: number;
  @Input() direction: string = '';
  @Input() autoplayDelay: number = 2000;
  @Input() navigation?: any ;
  @Input() pagination?: any ;
  @Input() autoplayDisableOnInteraction: boolean = false;
  @Input() breakpoints: any = {};

  @ViewChild('swiperContainer') swiperContainer!: ElementRef;

  ngAfterViewInit() {
    if (this.swiperContainer?.nativeElement) {
      const swiperEl = this.swiperContainer.nativeElement;
  
      // Convert string input values for navigation and pagination
      // const isnavigation = this.navigation !== false;
      // const isPaginationEnabled = this.pagination == false;
  
      Object.assign(swiperEl, {
        slidesPerView: this.slidesPerView,
        spaceBetween: this.spaceBetween,
        direction: this.direction,
        navigation: this.navigation,
        pagination: this.pagination,

        autoplay: {
          delay: this.autoplayDelay,
          disableOnInteraction: this.autoplayDisableOnInteraction,
        },
        breakpoints: this.breakpoints,
     
      });
  
      // swiperEl.initialize();
    }
  }
  @Input() dynamicAttributes: { [key: string]: any } = {};

  constructor(private renderer: Renderer2) {}

 

  
}
