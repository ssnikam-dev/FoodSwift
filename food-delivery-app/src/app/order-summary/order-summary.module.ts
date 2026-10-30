import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { OrderSummaryRoutingModule } from './order-summary-routing.module';
import { OrderSummaryComponent } from './components/order-summary.component';

@NgModule({
  declarations: [OrderSummaryComponent],
  imports: [CommonModule, RouterModule, OrderSummaryRoutingModule]
})
export class OrderSummaryModule { }
