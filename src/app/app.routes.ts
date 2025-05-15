import { Routes } from '@angular/router';
import { HomeComponent } from './pages/public/home/home.component';
import { PostComponent } from './pages/public/post/post.component';
import { CatalogComponent } from './pages/public/catalog/catalog.component';


import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ProductComponent } from './pages/public/product/product.component';
import { NewProductComponent } from './component/admin/new-product/new-product.component';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'post', component: PostComponent },
      { path: 'catalog', component: CatalogComponent },
       { path: 'product/:id', component: ProductComponent},
      { path: 'login', component: LoginComponent }
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', component:  DashboardComponent},
      { path: 'new-product', component:  NewProductComponent}
    ]
  }
];
