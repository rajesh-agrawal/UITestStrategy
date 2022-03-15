import { prepareEventListenerParameters } from '@angular/compiler/src/render3/view/template';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './common/user.model';
import { CrudService } from './crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-service-example';
  currentUser: User;
  constructor(private router: Router, private authenticationService: CrudService) {
    if (localStorage.getItem("user") != undefined) {
      this.currentUser = JSON.parse(localStorage.getItem("user"));
      this.router.navigate(["user"]);
    }else{
      this.router.navigate(["login"]);
      
    }




  }
  logout() {
    if (localStorage.getItem("user") != undefined) {
      localStorage.removeItem("user");
      this.currentUser = null;
      this.router.navigate(["login"]);
    }

  }
}
