import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarAdminComponent } from '../../component/admin/navbar-admin/navbar-admin.component';

@Component({
  standalone: true,
  selector: 'app-admin-layout',
  imports: [NavbarAdminComponent, RouterOutlet],
  template: `
    <app-navbar-admin></app-navbar-admin>
    <router-outlet></router-outlet>
  `
})
export class AdminLayoutComponent {}
