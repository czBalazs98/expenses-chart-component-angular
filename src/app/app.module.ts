import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FooterComponent } from './common/components/footer/footer.component';
import { ExpensesChartComponent } from './expenses-chart/components/expenses-chart/expenses-chart.component';
import { BalanceComponent } from './expenses-chart/components/balance/balance.component';
import { SpendingsComponent } from './expenses-chart/components/spendings/spendings.component';
import { ExpensesBarChartComponent } from './expenses-chart/components/expenses-bar-chart/expenses-bar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ExpensesChartComponent,
    BalanceComponent,
    SpendingsComponent,
    ExpensesBarChartComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
