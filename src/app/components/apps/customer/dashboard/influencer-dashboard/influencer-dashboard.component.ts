import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Renderer2 } from '@angular/core';
import { FlatpickrDefaults } from 'angularx-flatpickr';
import { FormsModule } from '@angular/forms';
import { SpkSalesCardsComponent } from '../../../../../../@spk/reusable-dashboard/spk-sales-cards/spk-sales-cards.component';
import { SpkApexchartsComponent } from '../../../../../../@spk/spk-apexcharts/apexcharts.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SpkReusableTablesComponent } from '../../../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';

@Component({
  selector: 'app-influencer-dashboard',
  templateUrl: './influencer-dashboard.component.html',
  imports: [CommonModule, SpkSalesCardsComponent, SpkApexchartsComponent, FormsModule, NgApexchartsModule, SpkReusableTablesComponent],
  providers: [FlatpickrDefaults],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfluencerDashboardComponent {
  inlineDatePicker: boolean = false;
  weekNumbers!: true
  // selectedDate: Date | null = null; 
  flatpickrOptions: any = {
    inline: true,
  };
  // flatpickrOptions: FlatpickrOptions;
  orderColumns = [
    { header: 'Customer', field: 'customer' },
    { header: 'Product', field: 'product' },
    { header: 'Quantity', field: 'quantity' },
    { header: 'Amount', field: 'price' },
    { header: 'Status', field: 'status' },
    { header: 'Date Ordered', field: 'date' },
    { header: 'Actions', field: 'actions' }
  ]

  constructor(private cdr: ChangeDetectorRef) {
    // document.querySelector('.single-page-header')?.classList.add('hidden');
  }
  rangeValue: { from: Date; to: Date } = {
    from: new Date(),
    to: (new Date() as any)['fp_incr'](10)
  };

  ngOnInit() {
    this.cdr.detectChanges();
  }
  ngOnDestroy() {
    // document.querySelector('.single-page-header')?.classList.remove('hidden');
  }

  chartOptions = {
  series: [{
    name: "Check In",
    data: [15, 16, 25, 41, 53, 51, 15, 67, 20, 24, 53, 16, 22, 41, 53]
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
  // title: {
  //   text: 'Dynamic Updating Chart',
  //   align: 'left',
  //   style: {
  //     fontSize: '13px',
  //     fontWeight: 'bold',
  //     color: '#8c9097'
  //   },
  // },
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
    categories: ['1 Mar', '2 Mar', '3 Mar', '4 Mar', '5 Mar', '6 Mar', '7 Mar', '8 Mar', '9 Mar', '10 Mar',
      '11 Mar', '12 Mar', '13 Mar', '14 Mar', '15 Mar'],
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
    categories: ['16', '58', '100'],
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

}
  chartOptions1: any = {
    series: [1754, 634, 878, 470],
    labels: ["Scan/Purchase", "Bonus", "Refferal", "Social"],
    chart: {
      height: 260,
      type: 'donut',
    },
    dataLabels: {
      enabled: false,
    },

    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      markers: {
        size: 4,
        shape: undefined,
        border: 'none',
        strokeWidth: 0
      },
      offsetY: 20,
    },
    stroke: {
      show: true,
      curve: 'smooth',
      lineCap: 'round',
      colors: "#fff",
      width: 0,
      dashArray: 0,
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        offsetY: 10,
        expandOnClick: false,
        donut: {
          size: '80%',
          background: 'transparent',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '20px',
              color: '#495057',
              offsetY: -25
            },
            value: {
              show: true,
              fontSize: '15px',
              color: undefined,
              offsetY: -20,
              // formatter: function (val: string) {
              //   return val + "%"
              // }
            },
            total: {
              show: true,
              showAlways: true,
              label: 'Total',
              fontSize: '22px',
              fontWeight: 600,
              color: '#495057',
            }

          }
        }
      }
    },
    grid: {
      padding: {
        bottom: -100
      }
    },
    colors: ["rgba(var(--primary-rgb))", "rgba(227, 84, 212, 1)",
       "rgba(255, 93, 159, 1)",
        "rgba(255, 142, 111, 1)"],
  };

  chartOptions2: any = {
    series: [{
      name: 'Point Earning',
      type: 'bar',
      data: [55, 25, 25, 165, 75, 64, 70, 55, 25, 25, 165, 75]
    }, {
      name: 'Point Redeem',
      type: 'bar',
      data: [71, 97, 72, 52, 73, 51, 71, 71, 97, 72, 52, 73]
    }
    ],
    chart: {
      width: "100%",
      height: 230,
      type: 'bar',
      stacked: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false
      }
    },
    grid: {
      borderColor: '#f1f1f1',
      strokeDashArray: 3
    },
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      markers: {
        shape: "circle",
        size: 4,
        strokeWidth: 0
      },
    },
    stroke: {
      curve: 'smooth',
      width: [0],
    },
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      bar: {
        columnWidth: "30%",
        borderRadius: [3],
        borderRadiusWhenStacked: "all",
      }
    },
    colors: ["rgba(var(--primary-rgb))", "rgba(227, 84, 212, 1)", "rgba(255, 142, 111, 1)"],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    tooltip: {
      shared: true,
      intersect: false,
    },
  };
  chartOptions3: any = {
    chart: {
      type: 'line',
      height: 30,
      width: 100,
      sparkline: {
        enabled: true
      },
      dropShadow: {
        enabled: false,
        blur: 3,
        opacity: 0.2,
      }
    },
    stroke: {
      show: true,
      curve: 'smooth',
      lineCap: 'butt',
      colors: undefined,
      width: 2,
      dashArray: 0,
    },
    fill: {
      gradient: {
        enabled: false
      }
    },
    series: [{
      name: 'Total Income',
      data: [0, 30, 10, 35, 26, 31, 14, 22, 40, 12]
    }],
    yaxis: {
      min: 0
    },
    colors: ['rgb(126, 103, 221)'],
  }
  chartOptions4: any = {
    chart: {
      type: 'line',
      height: 30,
      width: 100,
      sparkline: {
        enabled: true
      },
      dropShadow: {
        enabled: false,
        blur: 3,
        opacity: 0.2,
      }
    },
    stroke: {
      show: true,
      curve: 'smooth',
      lineCap: 'butt',
      colors: undefined,
      width: 2,
      dashArray: 0,
    },
    fill: {
      gradient: {
        enabled: false
      }
    },
    series: [{
      name: 'Total Income',
      data: [0, 20, 15, 25, 15, 25, 6, 25, 32, 15]
    }],
    yaxis: {
      min: 0
    },
    colors: ['rgb(227, 84, 212)'],
  }
  chartOptions5: any = {
    chart: {
      type: 'line',
      height: 30,
      width: 100,
      sparkline: {
        enabled: true
      },
      dropShadow: {
        enabled: false,
        blur: 3,
        opacity: 0.2,
      }
    },
    stroke: {
      show: true,
      curve: 'smooth',
      lineCap: 'butt',
      colors: undefined,
      width: 2,
      dashArray: 0,
    },
    fill: {
      gradient: {
        enabled: false
      }
    },
    series: [{
      name: 'Total Income',
      data: [0, 10, 30, 12, 16, 25, 4, 35, 26, 15]
    }],
    colors: ['rgb(255, 93, 159)'],
    yaxis: {
      min: 0
    },
  }
  chartOptions6: any = {
    chart: {
      type: 'line',
      height: 30,
      width: 100,
      sparkline: {
        enabled: true
      },
      dropShadow: {
        enabled: false,
        blur: 3,
        opacity: 0.2,
      }
    },
    stroke: {
      show: true,
      curve: 'smooth',
      lineCap: 'butt',
      colors: undefined,
      width: 2,
      dashArray: 0,
    },
    fill: {
      gradient: {
        enabled: false
      }
    },
    series: [{
      name: 'Total Income',
      data: [0, 12, 19, 26, 10, 18, 8, 17, 35, 14]
    }],
    colors: ['rgb(255, 142, 111)'],
    yaxis: {
      min: 0
    },
  }


  chartOptions8: any = {
    series: [{
      name: '',
      data: [35, 36, 22, 44, 48, 37, 36, 26, 27, 33, 32, 36]
    }, {
      name: 'This Year',
      data: [55, 53, 46, 40, 45, 38, 46, 37, 22, 34, 40, 44,]
    },
    ],
    chart: {
      type: 'line',
      height: 170,
      stacked: true,
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: false
      },
      dropShadow: {
        enabled: true,
        enabledOnSeries: undefined,
        top: 6,
        left: 1,
        blur: 4,
        color: '#000',
        opacity: 0.12
      },
      zoom: {
        enabled: false
      },
    },
    grid: {
      show: true,
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: false
        }
      },
      padding: {
        top: 2,
        right: 2,
        bottom: 2,
        left: 2
      },
      borderColor: '#f1f1f1',
      strokeDashArray: 3
    },
    markers: {
      size: 4,
      hover: {
        size: 3
      },
    },
    colors: ["rgba(227, 84, 212, 1)", "rgba(var(--primary-rgb))"],
    stroke: {
      curve: 'straight',
      width: 2,
      dashArray: 2
    },
    legend: {
      show: true,
      position: "bottom",
      fontSize: '10px',
      fontFamily: 'Poppins',
      markers: {
        size: 4,
        shape: undefined,
        border: 'none',
        strokeWidth: 0
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
        color: "rgba(119, 119, 142, 0.05)",
        offsetX: 0,
        offsetY: 0,
      },
      axisTicks: {
        show: true,
        borderType: "solid",
        color: "rgba(119, 119, 142, 0.05)",
        width: 6,
        offsetX: 0,
        offsetY: 0,
      },
      title: {
        style: {
          color: '#adb5be',
          fontSize: '14px',
          fontFamily: 'poppins, sans-serif',
          fontWeight: 600,
          cssClass: 'apexcharts-yaxis-label',
        },
      },
      labels: {
        show: false,
        formatter: function (y: number) {
          return y.toFixed(0) + "";
        }
      }
    },
    xaxis: {
      type: 'month',
      categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      axisBorder: {
        show: true,
        color: "rgba(119, 119, 142, 0.05)",
        offsetX: 0,
        offsetY: 0,
      },
      title: {
        style: {
          color: '#adb5be',
          fontSize: '5px',
          fontFamily: 'poppins, sans-serif',
          fontWeight: 600,
          cssClass: 'apexcharts-yaxis-label',
        },
      },
    },
  }


  
  handleToggleSelectAll(checked: boolean) {
    this.allTasksChecked = checked;
  }

  chartOptions7: any = {
    chart: {
      type: 'line',
      height: 30,
      width: 100,
      sparkline: {
        enabled: true
      },
      dropShadow: {
        enabled: false,
        blur: 3,
        opacity: 0.2,
      }
    },
    stroke: {
      show: true,
      curve: 'smooth',
      lineCap: 'butt',
      colors: undefined,
      width: 2,
      dashArray: 0,
    },
    fill: {
      gradient: {
        enabled: false
      }
    },
    series: [{
      name: 'Total Income',
      data: [0, 12, 19, 17, 35, 14, 26, 10, 18, 8]
    }],
    colors: ['rgb(158, 92, 247)'],
    yaxis: {
      min: 0
    },
  }

  cardData = [
    {
      id: 1,
      cardClass: "overflow-hidden main-content-card",
      customClass: "justify-content-between align-items-start  mb-2",
      valueClass: "fw-medium mb-0",
      titleClass: "d-block mb-1",
      title: "Profile Completed",
      value: "87%",
      graph: "increased",
      color: "success",
      percentage: "2.56%",
      percentageIcon: "ti ti-arrow-narrow-up fs-16",
      bg: "primary",
      icon: "ti ti-shopping-cart",
      bar: true,
    },
    {
      id: 2,
      cardClass: "overflow-hidden main-content-card",
      customClass: "justify-content-between align-items-start  mb-2",
      valueClass: "fw-medium mb-0",
      titleClass: "d-block mb-1",
      title: "Rank",
      value: "15",
      graph: "increased",
      color: "success",
      percentage: "0.34%",
      percentageIcon: "ti ti-arrow-narrow-up fs-16",
      bg: "primarytint1color",
      icon: "ti ti-users",
      bar: false,

    },
    {
      id: 3,
      cardClass: "overflow-hidden main-content-card",
      customClass: "justify-content-between align-items-start  mb-2",
      valueClass: "fw-medium mb-0",
      titleClass: "d-block mb-1",
      title: "Refferal",
      value: "2",
      graph: "Last refer",
      color: "success",
      percentage: "7.66%",
      percentageIcon: "ti ti-arrow-narrow-up fs-16",
      bg: "primarytint2color",
      icon: "ti ti-currency-dollar",
      bar: false,

    },
    {
      id: 4,
      cardClass: "overflow-hidden main-content-card",
      customClass: "justify-content-between align-items-start  mb-2",
      valueClass: "fw-medium mb-0",
      titleClass: "d-block mb-1",
      title: "Complaint",
      value: "2",
      graph: "Last Complaint",
      color: "danger",
      percentage: "30 day's",
      percentageIcon: "ti ti-arrow-narrow-down fs-16",
      bg: "primarytint3color",
      icon: "ti ti-chart-bar",
      bar: false,

    },
    {
      id: 4,
      cardClass: "overflow-hidden main-content-card",
      customClass: "justify-content-between align-items-start  mb-2",
      valueClass: "fw-medium mb-0",
      titleClass: "d-block mb-1",
      title: "Scan/Purchase",
      value: "40",
      graph: "Last Scan 1 day ago",
      color: "danger",
      percentage: "0.74%",
      percentageIcon: "ti ti-arrow-narrow-down fs-16",
      bg: "primarytint3color",
      icon: "ti ti-chart-bar",
      bar: true,
    },
    {
      id: 4,
      cardClass: "overflow-hidden main-content-card",
      customClass: "justify-content-between align-items-start  mb-2",
      valueClass: "fw-medium mb-0",
      titleClass: "d-block mb-1",
      title: "Spin & Win",
      value: "40",
      graph: "Last Spin 12 day's",
      color: "danger",
      percentage: "0.74%",
      percentageIcon: "ti ti-arrow-narrow-down fs-16",
      bg: "primarytint3color",
      icon: "ti ti-chart-bar",
      bar: true,
    },
  ]
  allTasksChecked!: boolean;
  toggleSelectAll(event: Event) {
    this.allTasksChecked = (event.target as HTMLInputElement).checked;
  }

  products = [
    {
      image: './assets/images/ecommerce/jpg/4.jpg',
      name: 'SwiftBuds',
      price: '$39.99',
      status: 'Success',
      badgeClass: 'bg-primary'
    },
    {
      image: './assets/images/ecommerce/jpg/6.jpg',
      name: 'CozyCloud Pillow',
      price: '$19.95',
      status: 'Pending',
      badgeClass: 'bg-primarytint1color'
    },
    {
      image: './assets/images/ecommerce/jpg/3.jpg',
      name: 'AquaGrip Bottle',
      price: '$9.99',
      status: 'Failed',
      badgeClass: 'bg-primarytint2color'
    },
    {
      image: './assets/images/ecommerce/jpg/1.jpg',
      name: 'GlowLite Lamp',
      price: '$24.99',
      status: 'Success',
      badgeClass: 'bg-primarytint3color'
    },
    {
      image: './assets/images/ecommerce/jpg/2.jpg',
      name: 'Bitvitamin',
      price: '$26.45',
      status: 'Success',
      badgeClass: 'bg-secondary'
    },
    {
      image: './assets/images/ecommerce/jpg/5.jpg',
      name: 'FitTrack',
      price: '$49.95',
      status: 'Success',
      badgeClass: 'bg-warning'
    }
  ];


  companiesColumn = [
    {
      label: 'Name'
    },
    {
      label: 'Points'
    },
    {
      label: 'Profile Status'
    }
  ]
}
const data = [
  {
    id: 1,
    src: "./assets/images/faces/1.jpg",
    customer: "Elena smith",
    customerMail: "elenasmith387@gmail.com",
    product: "All-Purpose Cleaner",
    quantity: "3",
    price: "$9.99",
    status: "In Progress",
    bg: "primary",
    date: "03,Sep 2024",
    checked: true,
  },
  {
    id: 2,
    src: "./assets/images/faces/12.jpg",
    customer: "Nelson Gold",
    customerMail: "noahrussell556@gmail.com",
    product: "Kitchen Knife Set",
    quantity: "4",
    price: "$49.99",
    status: "Pending",
    bg: "primarytint1color",
    date: " 26,Jul 2024",
    checked: false,

  },
  {
    id: 3,
    src: "./assets/images/faces/6.jpg",
    customer: "Grace Mitchell",
    customerMail: "gracemitchell79@gmail.com",
    product: "Velvet Throw Blanket",
    quantity: "2",
    price: "$29.99",
    status: "Success",
    bg: "primarytint2color",
    date: "12,May 2024",
    checked: true,

  },
  {
    id: 4,
    src: "./assets/images/faces/14.jpg",
    customer: "Spencer Robin",
    customerMail: "leophillips124@gmail.com",
    product: "Aromatherapy Diffuser",
    quantity: "4",
    price: "$19.99",
    status: "Success",
    bg: "primarytint2color",
    date: "15,Aug 2024",
    checked: true,

  },
  {
    id: 5,
    src: "./assets/images/faces/3.jpg",
    customer: "Chloe Lewis",
    customerMail: "chloelewis67@gmail.com",
    product: "Insulated Water Bottle",
    quantity: "2",
    price: "$14.99",
    status: "Pending",
    bg: "primarytint3color",
    date: "11,Oct 2024",
    checked: false,

  },


]