import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FoodCatalogueRoutingModule } from './food-catalogue-routing.module';
import { FoodCatalogueComponent } from './components/food-catalogue.component';

@NgModule({
  declarations: [FoodCatalogueComponent],
  imports: [CommonModule, FormsModule, RouterModule, FoodCatalogueRoutingModule]
})
export class FoodCatalogueModule { }
