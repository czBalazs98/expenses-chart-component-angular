import { Component } from '@angular/core';
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  LinearScale,
} from 'chart.js';

@Component({
  selector: 'app-expenses-bar-chart',
  templateUrl: './expenses-bar-chart.component.html',
  styleUrls: ['./expenses-bar-chart.component.scss'],
})
export class ExpensesBarChartComponent {
  chart!: Chart;

  columnColor: string = 'hsl(10, 79%, 65%)';
  columnHoverColor: string = 'hsl(10, 79%, 75%)';
  colors: string[] = [];

  todayColor: string = 'hsl(186, 34%, 60%)';
  todayHoverColor: string = 'hsl(186, 34%, 70%)';
  hoverColors: string[] = [];

  constructor() {
    Chart.register(LinearScale, BarController, CategoryScale, BarElement);
  }

  ngOnInit() {
    this.getColors();
    this.chart = new Chart('expensesBarChart', {
      type: 'bar',
      data: {
        labels: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3, 23],
            borderRadius: 5,
            backgroundColor: this.colors,
            borderWidth: 1,
            hoverBackgroundColor: this.hoverColors,
          },
        ],
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
            display: false,
          },
        },
      },
    });
  }

  getColors() {
    const today = new Date().getDay();
    for (let i = 0; i < 7; ++i) {
      this.colors.push(this.columnColor);
      this.hoverColors.push(this.columnHoverColor);
    }

    if (today === 0) {
      this.colors[6] = this.todayColor;
      this.hoverColors[6] = this.todayHoverColor;
    } else {
      this.colors[today - 1] = this.todayColor;
      this.hoverColors[today - 1] = this.todayHoverColor;
    }
  }
}
