import { Component, Input } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { SpkListviewCardComponent } from '../../../../../../@spk/reusable-apps/spk-listview-card/spk-listview-card.component';
import { SpkApexchartsComponent } from '../../../../../../@spk/spk-apexcharts/apexcharts.component';
import { ShowcodeCardComponent } from '../../../../../shared/components/showcode-card/showcode-card.component';

@Component({
  selector: 'app-analytics',
  imports: [SharedModule, SpkListviewCardComponent, ShowcodeCardComponent, SpkApexchartsComponent],
  templateUrl: './analytics.component.html'
})
export class AnalyticsComponent {
  chartOptions1: any;
  @Input() analyticsData!: any;
  @Input() chartData!: any;
  
  
  
  
  cardData :any= [];
  
  
  constructor() {
    setTimeout(() => {
      this.setCardData();
      this.setChartData();
    }, 100); 
  }
  setChartData(){
    // Create dynamic categories for X-Axis (handle both March and April)
    const categories = this.chartData.map((item:any) => `${item.dayOfMonth} ${item.startMonthName}`);
    
    // Create the counts array for the series
    const counts = this.chartData.map((item:any) => item.count);
    
    this.chartOptions1 = {
      series: [{
        name: "Check In",
        data: counts
      }],
      
      chart: {
        height: 320,
        type: 'line',
        zoom: {
          enabled: false
        },
        events: {
          mounted: (chart: any) => {
            chart.windowResizeHandler();
          }
        },
      },
      colors: ['#5c67f7'],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 6,
      },
      grid: {
        borderColor: '#f2f5f7',
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          gradientToColors: ["#FDD835"],
          shadeIntensity: 1,
          type: "horizontal",
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100]
        }
      },
      markers: {
        size: 4,
        colors: ["#FFA41B"],
        strokeColors: "#fff",
        strokeWidth: 2,
        hover: {
          size: 7
        }
      },
      xaxis: {
        categories: categories,  // Dynamic categories based on chartData
        labels: {
          show: true,
          style: {
            colors: "#8c9097",
            fontSize: '11px',
            fontWeight: 600,
            cssClass: 'apexcharts-xaxis-label',
          },
        }
      },
      yaxis: {
        labels: {
          show: true,
          style: {
            colors: "#8c9097",
            fontSize: '11px',
            fontWeight: 600,
            cssClass: 'apexcharts-yaxis-label',
          },
        }
      }
    };
  }
  setCardData(){
    this.cardData =  [
      {
        id: 1,
        customClass: "flex items-start justify-between mb-2",
        titleClass: "dark:text-textmuted/50 block mb-1",
        valueClass: "fw-medium mb-0",
        cardClass: "overflow-hidden main-content-card",
        title: "Total Visit",
        value: this.analyticsData?.total_visit,
        graph: "Increased",
        color: "success",
        percentage: "2.56%",
        percentageIcon: "ti ti-arrow-narrow-up text-[1rem]",
        bg: "primary",
        icon: "ri-user-location-line text-xl",
      },
      {
        id: 2,
        customClass: "flex items-start justify-between mb-2",
        titleClass: "dark:text-textmuted/50 block mb-1",
        valueClass: "fw-medium mb-0",
        cardClass: "overflow-hidden main-content-card",
        title: "Planned Visit",
        value: this.analyticsData?.planned_visit,
        graph: "Decreased",
        color: "danger",
        percentage: "3.05%",
        percentageIcon: "ti ti-arrow-narrow-down text-[1rem]",
        bg: "primarytint1color",
        icon: "ri-map-pin-line text-xl"
      },
      {
        id: 3,
        customClass: "flex items-start justify-between mb-2",
        titleClass: "dark:text-textmuted/50 block mb-1",
        valueClass: "fw-medium mb-0",
        cardClass: "overflow-hidden main-content-card",
        title: "Unplanned Visit",
        value: this.analyticsData?.unplanned_visit,
        graph: "Increased",
        color: "success",
        percentage: "2.16%",
        percentageIcon: "ti ti-arrow-narrow-up text-[1rem]",
        bg: "primarytint2color",
        icon: "ri-map-pin-line text-xl"
      },
      {
        id: 4,
        customClass: "flex items-start justify-between mb-2",
        titleClass: "dark:text-textmuted/50 block mb-1",
        valueClass: "fw-medium mb-0",
        cardClass: "overflow-hidden main-content-card",
        title: "Avg. Meeting Time",
        value: this.analyticsData?.average_meeting_time,
        graph: "Increased",
        color: "success",
        percentage: "2.1%",
        percentageIcon: "ti ti-arrow-narrow-up text-[1rem]",
        bg: "primarytint3color",
        icon: "ri-time-line text-xl"
      },
      {
        id: 4,
        customClass: "flex items-start justify-between mb-2",
        titleClass: "dark:text-textmuted/50 block mb-1",
        valueClass: "fw-medium mb-0",
        cardClass: "overflow-hidden main-content-card",
        title: "Productive Visit",
        value: this.analyticsData?.productive_visit,
        graph: "Increased",
        color: "success",
        percentage: "2.1%",
        percentageIcon: "ti ti-arrow-narrow-up text-[1rem]",
        bg: "success",
        icon: "ri-shopping-cart-line text-xl"
      },
      {
        id: 4,
        customClass: "flex items-start justify-between mb-2",
        titleClass: "dark:text-textmuted/50 block mb-1",
        valueClass: "fw-medium mb-0",
        cardClass: "overflow-hidden main-content-card",
        title: "New Counter Visit",
        value: this.analyticsData?.new_counter_visit,
        graph: "Increased",
        color: "success",
        percentage: "2.1%",
        percentageIcon: "ti ti-arrow-narrow-up text-[1rem]",
        bg: "warning",
        icon: "ri-store-line text-xl"
      },
    ]
  }
  
}
