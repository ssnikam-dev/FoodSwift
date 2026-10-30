import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RestaurantListingRoutingModule } from './restaurant-listing-routing.module';
import { RestaurantListingComponent } from './components/restaurant-listing.component';

@NgModule({
  declarations: [RestaurantListingComponent],
  imports: [CommonModule, FormsModule, RestaurantListingRoutingModule]
})
export class RestaurantListingModule { }
