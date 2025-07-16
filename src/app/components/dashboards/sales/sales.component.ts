import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Renderer2 } from '@angular/core';
import {FlatpickrDefaults  } from 'angularx-flatpickr';
// import { SpkFlatpickrComponent } from '../../../../@spk/spk-flatpickr/spk-flatpickr.component';
import { SpkSalesCardsComponent } from '../../../../@spk/reusable-dashboard/spk-sales-cards/spk-sales-cards.component';
import { SpkDropdownsComponent } from '../../../../@spk/reusable-ui-elements/spk-dropdowns/spk-dropdowns.component';
import { SpkApexchartsComponent } from '../../../../@spk/spk-apexcharts/apexcharts.component';
import { SpkReusableTablesComponent } from '../../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule,SpkSalesCardsComponent,SpkDropdownsComponent,SpkApexchartsComponent,SpkReusableTablesComponent,FormsModule],
  providers:[FlatpickrDefaults],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalesComponent {
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
    document.querySelector('.single-page-header')?.classList.add('hidden');
  }
  rangeValue: { from: Date; to: Date } = {
    from: new Date(),
    to: (new Date() as any)['fp_incr'](10)
  };
  
  ngOnInit() {
    this.cdr.detectChanges(); 
  }
  ngOnDestroy(){
    document.querySelector('.single-page-header')?.classList.remove('hidden');
  }
  
  chartOptions:any = {
    series: [{
      name: 'Growth',
      type: "column",
      data: [140, 120, 190, 364, 140, 230, 166, 340, 260, 260, 120, 320]
    }, {
      name: "Profit",
      type: "area",
      data: [180, 620, 476, 220, 520, 680, 435, 515, 638, 454, 525, 230],
    }, {
      name: "Sales",
      type: "line",
      data: [200, 330, 110, 130, 380, 420, 580, 335, 375, 638, 454, 480],
    }],
    chart: {
      redrawOnWindowResize: true,
      height: 318,
      type: 'bar',
      toolbar: {
        show: false
      },
      dropShadow: {
        enabled: true,
        enabledOnSeries: undefined,
        top: 7,
        left: 0,
        blur: 1,
        color: ["transparent", 'transparent', 'rgb(227, 84, 212)'],
        opacity: 0.05,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '18%',
        borderRadius: 2
      },
    },
    grid: {
      borderColor: '#f1f1f1',
      strokeDashArray: 3
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: [0, 2, 2],
      curve: "smooth",
    },
    legend: {
      show: true,
      fontSize: "12px",
      position: 'bottom',
      horizontalAlign: 'center',
      fontWeight: 500,
      height: 40,
      offsetX: 0,
      offsetY: 10,
      labels: {
        colors: '#9ba5b7',
      },
      markers: {
        width: 7,
        height: 7,
        shape: "circle",
        size: 3.5,
        strokeWidth: 0,
        strokeColor: '#fff',
        fillColors: undefined,
        radius: 12,
        offsetX: 0,
        offsetY: 0
      },
    },
    colors: ['rgba(var(--primary-rgb))', "rgba(119, 119, 142, 0.05)", 'rgb(227, 84, 212)'],
    yaxis: {
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
        formatter: function (y:any) {
          return y.toFixed(0) + "";
        },
        show: true,
        style: {
          colors: "#8c9097",
          fontSize: '11px',
          fontWeight: 600,
          cssClass: 'apexcharts-xaxis-label',
        },
      }
    },
    xaxis: {
      type: "month",
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Agu', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisBorder: {
        show: true,
        color: 'rgba(119, 119, 142, 0.05)',
        offsetX: 0,
        offsetY: 0,
      },
      axisTicks: {
        show: true,
        borderType: 'solid',
        color: 'rgba(119, 119, 142, 0.05)',
        width: 6,
        offsetX: 0,
        offsetY: 0
      },
      labels: {
        rotate: -90,
        style: {
          colors: "#8c9097",
          fontSize: '11px',
          fontWeight: 600,
          cssClass: 'apexcharts-xaxis-label',
        },
      }
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y:any) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + "%";
          }
          return y;
        },
      },
    },
    fill: {
      colors: undefined,
      opacity: 1,
      type: ['solid', 'solid'],
      gradient: {
        shade: 'light',
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ['#fdc530'],
        inverseColors: true,
        opacityFrom: 0.35,
        opacityTo: 0.05,
        stops: [0, 50, 100],
        colorStops: ['#fdc530']
      }
    }
  }
  chartOptions1:any = {
    series: [1754, 634, 878, 470],
    labels: ["Delivered", "Cancelled", "Pending", "Returned"],
    chart: {
      height: 175,
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
        border:'none',
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
    colors: ["rgba(var(--primary-rgb))", "rgba(227, 84, 212, 1)", "rgba(255, 93, 159, 1)", "rgba(255, 142, 111, 1)"],
  };
  orders=data;
  click(id:number){
    const data = this.orders.filter((x: { id: number }) => {
      return x.id != id;
      
    })
    this.orders = data;
    
  }
  chartOptions2:any= {
    series: [{
      name: 'Total',
      type: 'bar',
      data: [80, 90, 59, 86, 120, 165, 115]
    }, {
      name: 'This Year',
      type: 'bar',
      data: [55, 25, 25, 165, 75, 64, 70]
    }, {
      name: 'Last Year',
      type: 'bar',
      data: [71, 97, 72, 52, 73, 51, 71]
    }
  ],
  chart: {
    width:"100%",
    height: 268,
    type: 'bar',
    stacked: {
      enabled: true,
    },
    toolbar: {
      show: false,
    },
    zoom:{
      enabled:false
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
  dataLabels:{
    enabled:false
  },
  plotOptions: {
    bar: {
      columnWidth: "30%",
      borderRadius: [3],
      borderRadiusWhenStacked: "all",
    }
  },
  colors: ["rgba(var(--primary-rgb))", "rgba(227, 84, 212, 1)", "rgba(255, 142, 111, 1)"],
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  tooltip: {
    shared: true,
    intersect: false,
  },
};
chartOptions3:any= {
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
chartOptions4:any= {
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
chartOptions5:any= {
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
chartOptions6:any= {
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
handleToggleSelectAll(checked: boolean) {
  this.orders.forEach(order => order.checked = checked);
  this.allTasksChecked = checked;
}

chartOptions7:any= {
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
cardData=[
  {
    id:1,
    cardClass:"overflow-hidden main-content-card",
    customClass:"justify-content-between align-items-start  mb-2",
    valueClass:"fw-medium mb-0",
    titleClass:"d-block mb-1" ,
    title:"Total Products",
    value:"854",
    graph:"increased",
    color:"success",
    percentage:"2.56%",
    percentageIcon:"ti ti-arrow-narrow-up fs-16",
    bg:"primary",
    icon:"ti ti-shopping-cart",
  },
  {
    id:2,
    cardClass:"overflow-hidden main-content-card",
    customClass:"justify-content-between align-items-start  mb-2",
    valueClass:"fw-medium mb-0",
    titleClass:"d-block mb-1" ,
    title:"Total Users",
    value:"31,876",
    graph:"increased",
    color:"success",
    percentage:"0.34%",
    percentageIcon:"ti ti-arrow-narrow-up fs-16",
    bg:"primarytint1color",
    icon:"ti ti-users"
  },
  {
    id:3,
    cardClass:"overflow-hidden main-content-card",
    customClass:"justify-content-between align-items-start  mb-2",
    valueClass:"fw-medium mb-0",
    titleClass:"d-block mb-1" ,
    title:"Total Revenue",
    value:"34,241",
    graph:"increased",
    color:"success",
    percentage:"7.66%",
    percentageIcon:"ti ti-arrow-narrow-up fs-16",
    bg:"primarytint2color",
    icon:"ti ti-currency-dollar"
  },
  {
    id:4,
    cardClass:"overflow-hidden main-content-card",
    customClass:"justify-content-between align-items-start  mb-2",
    valueClass:"fw-medium mb-0",
    titleClass:"d-block mb-1" ,
    title:"Total Sales",
    value:"1,76,586",
    graph:"Decreased",
    color:"danger",
    percentage:"0.74%",
    percentageIcon:"ti ti-arrow-narrow-down fs-16",
    bg:"primarytint3color",
    icon:"ti ti-chart-bar"
  }
]
allTasksChecked!: boolean;
toggleSelectAll(event: Event) {
  this.allTasksChecked = (event.target as HTMLInputElement).checked;
}

statistics=[
  {
    expenses:"Total Expenses",
    price:"134,032",
    bg:"success",
    arrow:"up",
    chartOptions:this.chartOptions3,
    change:"0.45%", 
  },
  {
    expenses:"General Leads",
    price:"74,354",
    bg:"danger",
    arrow:"down",
    chartOptions:this.chartOptions4,
    change:"3.84%", 
  },
  {
    expenses:"Churn Rate",
    price:"6.02%",
    bg:"success",
    arrow:"up",
    chartOptions:this.chartOptions5,
    change:"0.72%", 
  },
  {
    expenses:"New Users",
    price:"7,893",
    bg:"success",
    arrow:"up",
    chartOptions:this.chartOptions6,
    change:"11.05%", 
  },
  {
    expenses:"Returning Users",
    price:"3,258",
    bg:"success",
    arrow:"up",
    chartOptions:this.chartOptions7,
    change:"1.69%", 
  }
]
countries=[
  {src:"./assets/images/flags/us_flag.jpg", name:"Haryana", sales:"31,672", progress:"90"},
  {src:"./assets/images/flags/italy_flag.jpg",name:"Rajesthan",sales:"29,557",progress:"85",bg:"primarytint1color "},
  {src:"./assets/images/flags/spain_flag.jpg",name:"Mumbai",sales:"24,562", progress:"80", bg:"primarytint2color "},
  {src:"./assets/images/flags/uae_flag.jpg", name:"Assam", sales:"21,532", progress:"75",bg:"primarytint3color "},
  {src:"./assets/images/flags/argentina_flag.jpg",name:"Bihar",sales:"18,753",progress:"70",bg:"secondary"},
  {src:"./assets/images/flags/china_flag.jpg",name:"Delhi",sales:"12,342",progress:"65",bg:"info"},
  {src:"./assets/images/flags/french_flag.jpg",name:"Goa",sales:"15,533",progress:"60", bg:"warning"}
]

products = [
  {
    image: './assets/images/ecommerce/jpg/4.jpg',
    name: 'Bharat Petro Can',
    price: '39.99',
    status: 'Success',
    badgeClass: 'bg-primary'
  },
  {
    image: './assets/images/ecommerce/jpg/6.jpg',
    name: 'IndianOil Smart Jug',
    price: '19.95',
    status: 'Pending',
    badgeClass: 'bg-primarytint1color'
  },
  {
    image: './assets/images/ecommerce/jpg/3.jpg',
    name: 'HP LubriPack',
    price: '9.99',
    status: 'Failed',
    badgeClass: 'bg-primarytint2color'
  },
  {
    image: './assets/images/ecommerce/jpg/1.jpg',
    name: 'Reliance Fuel Card',
    price: '24.99',
    status: 'Success',
    badgeClass: 'bg-primarytint3color'
  },
  {
    image: './assets/images/ecommerce/jpg/2.jpg',
    name: 'Essar Energy Flask',
    price: '26.45',
    status: 'Success',
    badgeClass: 'bg-secondary'
  },
  {
    image: './assets/images/ecommerce/jpg/5.jpg',
    name: 'ONGC Gear Oil',
    price: '49.95',
    status: 'Success',
    badgeClass: 'bg-warning'
  }
];


companiesColumn= [
  {
    header:'Product'
  },
  {
    header:'Price'
  },
  {
    header:'Status'
  }
]
}
const data = [
  {
    id: 1,
    src: "./assets/images/faces/1.jpg",
    customer: "Aarav Sharma",
    customerMail: "aarav.sharma01@gmail.com",
    product: "All-Purpose Cleaner",
    quantity: "3",
    price: "9.99",
    status: "In Progress",
    bg: "primary",
    date: "03,Sep 2024",
    checked: true,
  },
  {
    id: 2,
    src: "./assets/images/faces/12.jpg",
    customer: "Sneha Patel",
    customerMail: "sneha.patel24@gmail.com",
    product: "Kitchen Knife Set",
    quantity: "4",
    price: "49.99",
    status: "Pending",
    bg: "primarytint1color",
    date: "26,Jul 2024",
    checked: false,
  },
  {
    id: 3,
    src: "./assets/images/faces/6.jpg",
    customer: "Rajesh Verma",
    customerMail: "rajesh.verma78@gmail.com",
    product: "Velvet Throw Blanket",
    quantity: "2",
    price: "29.99",
    status: "Success",
    bg: "primarytint2color",
    date: "12,May 2024",
    checked: true,
  },
  {
    id: 4,
    src: "./assets/images/faces/14.jpg",
    customer: "Priya Mehta",
    customerMail: "priya.mehta99@gmail.com",
    product: "Aromatherapy Diffuser",
    quantity: "4",
    price: "19.99",
    status: "Success",
    bg: "primarytint2color",
    date: "15,Aug 2024",
    checked: true,
  },
  {
    id: 5,
    src: "./assets/images/faces/3.jpg",
    customer: "Vikram Joshi",
    customerMail: "vikram.joshi45@gmail.com",
    product: "Insulated Water Bottle",
    quantity: "2",
    price: "14.99",
    status: "Pending",
    bg: "primarytint3color",
    date: "11,Oct 2024",
    checked: false,
  },
];
