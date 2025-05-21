import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarAdminComponent } from '../../component/admin/navbar-admin/navbar-admin.component';
import { SidebarAdminComponent } from "../../component/admin/sidebar-admin/sidebar-admin.component";

@Component({
  standalone: true,
  selector: 'app-admin-layout',
  imports: [NavbarAdminComponent, RouterOutlet, SidebarAdminComponent],
  template: `
    <app-navbar-admin></app-navbar-admin>
      <div class="row">
        <div class="col-md-3">
          <app-sidebar-admin></app-sidebar-admin>
        </div>
        <div class="col-md-9">
          <router-outlet></router-outlet>
        </div>
      </div>
    
  `
})
export class AdminLayoutComponent {}
