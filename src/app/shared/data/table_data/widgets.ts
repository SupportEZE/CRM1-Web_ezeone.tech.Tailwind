import * as echarts from 'echarts';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexPlotOptions, ApexStroke, ApexTooltip, ApexXAxis, ApexYAxis, ChartType } from "ng-apexcharts";

export let echartLineBarOption: any = {
    grid: {
        top: '6',
        right: '0',
        bottom: '17',
        left: '25'
    },
    tooltip: {
        show: true,
        showContent: true,
        alwaysShowContent: true,
        triggerOn: 'mousemove',
        trigger: 'axis',
        axisPointer: {
            label: {
                show: false,
            }
        }
    },
    xAxis: {
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        axisLine: {
            lineStyle: {
                color: 'rgba(95, 210, 207, 1)'
            }
        },
        axisLabel: {
            fontSize: 10,
            color: 'rgba(95, 210, 207, 1)'
        },

    },
    yAxis: {
        splitLine: {
            lineStyle: {
                color: 'rgba(95, 210, 207, 1)'
            }
        },
        axisLine: {
            lineStyle: {
                color: 'rgba(95, 210, 207, 1)'
            }
        },
        axisLabel: {
            fontSize: 10,
            color: 'rgba(95, 210, 207, 1)'
        }
    },
    series: [
    
        {
            name: 'Total Sales',
            symbolSize: 20,
            barWidth: 10,
            type: 'bar',
            height:235,
            data: [17, 22, 28, 23, 15, 40, 14, 22, 37, 47, 39],
            itemStyle: {
                normal: {
                    barBorderRadius: [50, 50, 0, 0],
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            { offset: 0, color: '#705ec8' },
                            { offset: 1, color: '#20c2fa' }

                        ]
                    )
                }
            },
            color:'rgba(95, 210, 207, 1)'
        },
    ],
    color: ['rgba(95, 210, 207, 1)','rgba(95, 210, 207, 1)']
}
export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    yaxis: ApexYAxis;
    xaxis: {
        categories:string[],
        show:boolean
    };
    fill: ApexFill;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
    grid:ApexGrid
    // legend: ApexLegend;
  };
export const chartOptions:ChartOptions = {
    series: [
      {
        name: 'Revenue',
        data:  [17, 22, 28, 23, 15, 40, 14, 22, 37, 47, 39],
        color:'rgba(95, 210, 207, 1)',
      
      },
    
    ],
    chart: {
      type: "bar",
      height: 235
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "30%",
        borderRadius: 4,

      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"]
    },
    xaxis: {
      categories: ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov'],
      show:false
    },
    yaxis: {
        show:false
      // title: {
      //   text: "$ (thousands)"
      // }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function(val) {
          return "$ " + val + " thousands";
        }
      }
    },
    grid:{
        show:false
    }
  };