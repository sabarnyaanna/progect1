import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ProductsListComponent } from './products-list.component';
import { ProductDetailsComponent } from './product-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsListComponent },
  { path: 'products/:id', component: ProductDetailsComponent }
];