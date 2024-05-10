import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  user$= this.usersServices.currentUserProfile$;
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  constructor(public authService: AuthenticationService , private router: Router, private usersServices: UsersService){ }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['']);
    });
  }
}
