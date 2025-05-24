import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-users-table',
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css'
})
export class UsersTableComponent {
  users: any[] = [];
  p: number = 1;
  itemsPerPage: number = 14;

  constructor( private userService: UserService) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
    });
  }

  editUser(UserId: number) {}
  deleteUser(UserId: number){}
}
