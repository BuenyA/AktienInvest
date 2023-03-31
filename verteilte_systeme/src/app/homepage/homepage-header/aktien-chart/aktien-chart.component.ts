import { Component } from '@angular/core';

import {
    ApexAxisChartSeries,
    ApexChart,
    ApexTitleSubtitle,
    ApexDataLabels,
    ApexFill,
    ApexMarkers,
    ApexYAxis,
    ApexXAxis,
    ApexTooltip
} from "ng-apexcharts";
import { dataSeries } from "./data-series";

@Component({
    selector: 'app-aktien-chart',
    templateUrl: './aktien-chart.component.html',
    styleUrls: ['./aktien-chart.component.scss']
})
export class AktienChartComponent {

    public series: ApexAxisChartSeries;
    public chart: ApexChart;
    public dataLabels: ApexDataLabels;
    public markers: ApexMarkers;
    public title: ApexTitleSubtitle;
    public fill: ApexFill;
    public yaxis: ApexYAxis;
    public xaxis: ApexXAxis;
    public tooltip: ApexTooltip;

    constructor() {
        this.initChartData();
    }

    public initChartData(): void {
        let ts2 = 1484418600000;
        let dates = [];
        for (let i = 0; i < 120; i++) {
            ts2 = ts2 + 86400000;
            dates.push([ts2, dataSeries[1][i].value]);
        }

        this.series = [
            {
                name: "Depot",
                data: dates
            }
        ];
        this.chart = {
            type: "area", //Before "area" -> Line 74-83
            stacked: false,
            height: 400,
            width: 1060,
            zoom: {
                type: "x",
                enabled: true,
                autoScaleYaxis: true
            },
            toolbar: {
                autoSelected: "zoom"
            }
        };
        this.dataLabels = {
            enabled: false
        };
        this.markers = {
            size: 0
        };
        this.title = {
            text: "Dein Depotchart",
            align: "center"
        };
        this.fill = {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 0,
                stops: [0, 90, 100]
            }
        };
        this.yaxis = {
            labels: {
                formatter: function (val) {
                    return (val / 1000000).toFixed(0);
                }
            },
            title: {
                text: "Kurs"
            }
        };
        this.xaxis = {
            type: "datetime"
        };
        this.tooltip = {
            shared: false,
            y: {
                formatter: function (val) {
                    return (val / 1000000).toFixed(0);
                }
            }
        };
    }
}