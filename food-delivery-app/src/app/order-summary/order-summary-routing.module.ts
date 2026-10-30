import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderSummaryComponent } from './components/order-summary.component';
import { AuthGuard } from '../auth/services/auth.guard';

const routes: Routes = [
  // login/register is required only here, i.e. when the user actually orders
  { path: 'orderSummary', component: OrderSummaryComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderSummaryRoutingModule { }
