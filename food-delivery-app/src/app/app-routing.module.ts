import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Feature modules register their own routes; this module must be imported LAST in AppModule
const routes: Routes = [
  { path: '', redirectTo: 'restaurant-listing', pathMatch: 'full' },
  { path: '**', redirectTo: 'restaurant-listing' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
