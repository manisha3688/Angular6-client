import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsDashboardComponent } from './transactionsdashboard.component';
import { TransactionAddComponent } from '../transactionadd/transactionadd.component';
import { TransactionDetailsComponent } from '../transactiondetails/transactiondetails.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing';

describe('TransactionsDashboardComponent', () => {
  let component: TransactionsDashboardComponent;
  let fixture: ComponentFixture<TransactionsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionsDashboardComponent , TransactionAddComponent, TransactionDetailsComponent],
      imports: [ ReactiveFormsModule, HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
