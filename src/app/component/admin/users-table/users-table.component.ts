import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-users-table',
  imports: [CommonModule],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css'
})
export class UsersTableComponent {
  users: any[] = [];
  constructor() {}

  editUser(UserId: number) {}
  deleteUser(UserId: number){}
}
