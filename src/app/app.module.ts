import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TransactionsDashboardComponent } from './transactionsdashboard/transactionsdashboard.component';
import { TransactionAddComponent } from './transactionadd/transactionadd.component';
import { AppRoutingModule } from './app-routing.module';
import { TransactionDetailsComponent } from './transactiondetails/transactiondetails.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TransactionsDashboardComponent,
    TransactionAddComponent,
    TransactionDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
