import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  menuName: string = 'login';
  constructor(private router: Router) {
    this.router.events.subscribe({
      next: (result) => {
        if (result instanceof NavigationEnd) {
          console.log(result.url);
          this.menuName = result.url.replace('/', '');
        }
      },
    });
  }
}
