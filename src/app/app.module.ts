import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FooterComponent } from './common/components/footer/footer.component';
import { ExpensesChartComponent } from './expenses-chart/components/expenses-chart/expenses-chart.component';
import { BalanceComponent } from './expenses-chart/components/balance/balance.component';
import { SpendingsComponent } from './expenses-chart/components/spendings/spendings.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ExpensesChartComponent,
    BalanceComponent,
    SpendingsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
