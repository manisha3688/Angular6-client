import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsDashboardComponent } from './transactionsdashboard/transactionsdashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/transactionsdashboard', pathMatch: 'full' },
  { path: 'transactionsdashboard', component:  TransactionsDashboardComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
