import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TOKEN_KEY } from '../shared/constants';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styles: ``
})
export class Dashboard {
  constructor(private router: Router) { }

  onLogout() {
    localStorage.removeItem(TOKEN_KEY);
    this.router.navigateByUrl('/signin');
  }
}
