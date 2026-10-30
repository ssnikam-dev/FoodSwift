import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './header/header.module';
import { RestaurantListingModule } from './restaurant-listing/restaurant-listing.module';
import { FoodCatalogueModule } from './food-catalogue/food-catalogue.module';
import { OrderSummaryModule } from './order-summary/order-summary.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    HeaderModule,
    AuthModule,
    CartModule,
    RestaurantListingModule,
    FoodCatalogueModule,
    OrderSummaryModule,
    AppRoutingModule          // keep last so '**' doesn't shadow feature routes
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
