import { Component, EventEmitter, Output } from '@angular/core';
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  LinearScale,
  Tooltip
} from 'chart.js';
import { Expense } from '../../model/expense';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-expenses-bar-chart',
  templateUrl: './expenses-bar-chart.component.html',
  styleUrls: ['./expenses-bar-chart.component.scss'],
})
export class ExpensesBarChartComponent {
  chart!: Chart;

  labels: string[] = [];
  values: number[] = [];

  @Output()
  amountSumEvent = new EventEmitter<number>();

  columnColor: string = 'hsl(10, 79%, 65%)';
  columnHoverColor: string = 'hsl(10, 79%, 75%)';
  colors: string[] = [];

  todayColor: string = 'hsl(186, 34%, 60%)';
  todayHoverColor: string = 'hsl(186, 34%, 70%)';
  hoverColors: string[] = [];

  constructor(private httpClient: HttpClient) {
    Chart.register(
      LinearScale,
      BarController,
      CategoryScale,
      BarElement,
      Tooltip
    );
  }

  ngOnInit() {
    this.httpClient
      .get<Expense[]>('/assets/data.json')
      .subscribe((data) => this.handleChartData(data));
  }

  handleChartData(expenses: Expense[]) {
    expenses.forEach((expense) => {
      this.labels.push(expense.day);
      this.values.push(expense.amount);
    });
    this.getColors();
    this.createChart();
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

  createChart() {
    this.chart = new Chart('expensesBarChart', {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [
          {
            data: this.values,
            borderRadius: 5,
            backgroundColor: this.colors,
            borderWidth: 1,
            hoverBackgroundColor: this.hoverColors,
          },
        ],
      },
      options: {
        plugins: {
          tooltip: {
            enabled: false,
            external: function (context) {
              let tooltipEl = document.getElementById('tooltip');

              if (!tooltipEl) {
                tooltipEl = document.createElement('div');
                tooltipEl.id = 'tooltip';
                tooltipEl.style.position = 'absolute';
                tooltipEl.style.pointerEvents = 'none';
                tooltipEl.style.backgroundColor = 'hsl(25, 47%, 15%)';
                tooltipEl.style.color = 'hsl(33, 100%, 98%)';
                tooltipEl.style.padding = '0.25rem';
                tooltipEl.style.borderRadius = '0.25rem';
                document.body.appendChild(tooltipEl);
              }

              const tooltipModel = context.tooltip;
              if (tooltipModel.opacity === 0) {
                tooltipEl.style.opacity = '0';
                return;
              }

              if (tooltipModel.body) {
                tooltipEl.innerHTML = '$' + tooltipModel.body[0].lines[0];
              }

              const position = context.chart.canvas.getBoundingClientRect();
              tooltipEl.style.opacity = '1';
              tooltipEl.style.left =
                position.left +
                tooltipModel.caretX -
                tooltipModel.width / 2 +
                'px';
              tooltipEl.style.top =
                position.top +
                tooltipModel.caretY -
                tooltipEl.offsetHeight -
                4 +
                'px';
            },
          },
        },
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
}
