import { HelperService } from '../../../services/helper/helper.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexStroke
} from "ng-apexcharts";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  chartOptions;chartOptions2;chartOptions3;chartOptions4;

  constructor(private helper: HelperService) {
    this.chartOptions = {
      series: [
        {
          name: "Number of Responses",
          data: this.helper.generateRandomSeries(7,1,50),
        }
      ],
      chart: {
        type: "bar",
        height: 430,
        toolbar:{
          offsetY: 20
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          dataLabels: {
            position: "top"
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["#fff"]
      },
      xaxis: {
        categories: ["MON","TUES","WED","THURS","FRI","SAT","SUN"],
        lines:{
          show: false
        }
      },
      title:{
        text: `VISITORS LAST 7 DAYS`,
        align: 'center',

      },
      colors:['var(--bs-primary)']
    };
    this.chartOptions2= {
      chart: {
        type: "area",
        height: 430,
        toolbar:{
          show: false,
        }
      },
      stroke: {
        show: true,
        width: 3,
        curve:'smooth',
      },
      dataLabels: {
        enabled: false
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "#ffffff"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      series: [
        {
          name: "Number of New Users",
          data: this.helper.generateRandomSeries(5,1,80),
        }
      ],
      xaxis: {
        categories: ["JAN","FEB","MAR","APR","MAY"],
        lines:{
          show: false
        }
      },
      title:{
        text: `TOTAL NEW USERS`,
        align: 'center',
        floating:true
      },
      colors:['#009979']
    }
    this.chartOptions3 = {
      series: this.helper.generateRandomSeries(2,1,100),
      chart: {
        type: "donut",
        height: 430,
      },
      labels: ["MEN", "WOMEN"],
      responsive: [
        {

          options: {
            chart: {

            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
      title:{
        text:`TOTAL USERS BY GENDER`,
        align: 'center'
      },
      colors:['var(--bs-primary)','var(--bs-secondary)','var(--bs-info)']
    };
    this.chartOptions4 = {
      series: this.helper.generateRandomSeries(3,90,100),
        chart: {
          type: 'polarArea'
        },
        labels: ['Blog Post 25', 'Blog Post 46', 'Blog Post 90'],
        fill: {
          opacity: 1
        },
        stroke: {
          width: 1,
          colors: undefined
        },
        yaxis: {
          show: false
        },
        legend: {
          position: 'bottom'
        },
        plotOptions: {
          polarArea: {
            rings: {
              strokeWidth: 0
            }
          }
        },
        theme: {
          monochrome: {
            enabled: true,
            color: '#28a745',
            shadeTo: 'dark',
            shadeIntensity: 0.6
          }
        },
        title:{
          text: `TOP 3 BLOG POSTS WITH THE MOST VIEWS`,
          align: 'center',
          floating:true
        }

    };
   }

  ngOnInit(): void {
  }
}
