import { Component, OnInit } from '@angular/core';
import { User } from '../common/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  username: string;
  currentUser: User;
  constructor() {

  }

  ngOnInit(): void {
    if (localStorage.getItem("user") != undefined) {
      this.currentUser = JSON.parse(localStorage.getItem("user"));
      this.username = this.currentUser.firstName + " " + this.currentUser.lastName;

    }
  }

}
