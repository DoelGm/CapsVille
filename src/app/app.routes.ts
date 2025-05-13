import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PostComponent } from './pages/post/post.component';
import { CatalogComponent } from './pages/catalog/catalog.component';


export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'post', component: PostComponent}, 
    {path: 'catalog', component: CatalogComponent},
];
