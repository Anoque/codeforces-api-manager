import {Component, Inject, OnInit} from '@angular/core';
import { UsersService } from '../users.service';
import { Chart } from 'chart.js';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

class DialogData {
  type: string;
}

@Component({
  selector: 'app-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.css']
})
export class UserStatisticsComponent implements OnInit {
  chart: any;

  chartsData: any;
  chartHeight = 0;
  showCharts = false;
  objectKeys = Object.keys;

  showErrorMessage = false;

  constructor (public dialogRef: MatDialogRef<DialogData>, @Inject(MAT_DIALOG_DATA) public data: any, private userService: UsersService) {
    this.chartsData = [];
  }

  ngOnInit() {
    if (this.userService.getStatus() == null) {
      this.showErrorMessage = true;
    } else {
      switch (this.data.type) {
        case 'type': {
          this.setChartByType();
          break;
        }
        case 'language': {
          this.setChartByLanguage();
          break;
        }
        default: {
          this.setChartByType();
          break;
        }
      }
    }
  }

  public closeDialog() {
    this.dialogRef.close();
  }

  setChart(labels: any, data: any, type: string): void {
    this.chart = new Chart('chart', {
      type: type,
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
        }],
        borderWidth: 1
      }
    });
  }

  setChartByType(): void {
    const chartData = [];
    const chartLabels = [];

    for (const item of this.userService.status) {
      const index = chartLabels.indexOf(item.problem.index);
      if (item.verdict === 'OK') {
        if (index === -1) {
          chartLabels.push(item.problem.index);
          chartData.push(1);
        } else {
          chartData[index]++;
        }
      }
    }

    this.setChart(chartLabels, chartData, 'pie');

    const d = [];
    for (let i = 0; i < chartLabels.length; i++) {
      d[chartLabels[i]] = chartData[i];
    }

    this.chartsData.push(d);
    this.chartHeight = 400;
    this.showCharts = true;
  }

  setChartByLanguage() {
    const chartData = [];
    const chartLabels = [];

    for (const item of this.userService.status) {
      if (item.verdict == 'OK') {
        const index = chartLabels.indexOf(item.programmingLanguage);
        if (index === -1) {
          chartLabels.push(item.programmingLanguage);
          chartData.push(1);
        } else {
          chartData[index]++;
        }
      }
    }

    this.setChart(chartLabels, chartData, 'pie');

    const d = [];
    for (let i = 0; i < chartLabels.length; i++) {
      d[chartLabels[i]] = chartData[i];
    }

    this.chartsData.push(d);
    this.chartHeight = 400;
    this.showCharts = true;
  }
}
