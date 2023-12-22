import { Routes } from '@angular/router';
import { ListProductComponent } from './components/list-product/list-product.component';
import { FormProductComponent } from './components/form-product/form-product.component';

export const routes: Routes = [
  { path: '', component: ListProductComponent },
  { path: 'agregar', component: FormProductComponent },
  { path: 'editar/:id', component: FormProductComponent },
];
