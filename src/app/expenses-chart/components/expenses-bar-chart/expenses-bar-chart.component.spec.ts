import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesBarChartComponent } from './expenses-bar-chart.component';

describe('ExpensesBarChartComponent', () => {
  let component: ExpensesBarChartComponent;
  let fixture: ComponentFixture<ExpensesBarChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpensesBarChartComponent]
    });
    fixture = TestBed.createComponent(ExpensesBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
