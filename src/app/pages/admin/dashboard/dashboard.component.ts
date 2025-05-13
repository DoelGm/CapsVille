import { Component } from '@angular/core';
import { SidebarAdminComponent } from '../../../component/admin/sidebar-admin/sidebar-admin.component';

@Component({
  selector: 'app-dashboard',
  imports: [SidebarAdminComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
