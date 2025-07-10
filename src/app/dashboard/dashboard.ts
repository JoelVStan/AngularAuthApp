import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../shared/services/auth';
import { User } from '../shared/services/user';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styles: ``
})
export class Dashboard implements OnInit {
  constructor(
    private router: Router,
    private authService: Auth,
    private userService: User  
  ) { }

  fullName: string = '';
  ngOnInit(): void {
    this.userService.getUserProfile()
      .subscribe({
        next: (response: any) => {
          if (response) {
            // You can handle the user profile data here if needed
            console.log('User Profile:', response);
            this.fullName = response.fullName || '';
          }
        },
        error: (error: any) => {
          console.error('Error fetching user profile:', error);
          this.router.navigateByUrl('/signin');
        }
      })
  }

  onLogout() {
    this.authService.deleteToken();
    this.router.navigateByUrl('/signin');
  }
}
