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
import { ProductTableComponent } from './component/admin/product-table/product-table.component';
import { UsersTableComponent } from './component/admin/users-table/users-table.component';
import { NewTicketComponent } from './component/admin/new-ticket/new-ticket.component';
import { NewCustumerComponent } from './component/admin/new-custumer/new-custumer.component';
import { CustumerTableComponent } from './component/admin/custumer-table/custumer-table.component';
import { NewUserComponent } from './component/admin/new-user/new-user.component';

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
      { path: 'new-product', component:  NewProductComponent},
      { path: 'product-list', component:  ProductTableComponent},
      { path: 'user-list', component:  UsersTableComponent},
      { path: 'new-user', component:  NewUserComponent},
      { path: 'customer-list', component:  CustumerTableComponent},
      { path: 'new-customer', component:  NewCustumerComponent},
      { path: 'new-ticket', component:  NewTicketComponent},
    ]
  }
];
