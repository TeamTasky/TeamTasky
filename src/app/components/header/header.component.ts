import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { SidebarToggleService } from '../../shared/services/sidebar-toggle.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <header class="font-bold h-16 flex justify-between items-center bg-accent">
      <div class="flex items-center">
        <button class="text-white px-4" (click)="toggleSidebar()">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </button>
      </div>
      <div class="">
        <button [routerLink]="['/account']" class="px-4">
          <div class="">
          <img *ngIf="isAuthenticated && user.photoURL; else defaultImage" [src]="user?.photoURL" alt="User Photo" class="h-10 w-10 object-cover md:w-38 rounded-full">
          <ng-template #defaultImage>
            <img [src]="'assets/img/default-user.png'" alt="User Photo" class="h-10 w-10 object-cover md:w-38 rounded-full">
          </ng-template>
          </div>
        </button>
      </div>
    </header>
  `
  
})
export class HeaderComponent implements OnInit{
  isAuthenticated = false;
  user: any; 

  constructor(
    private authService: AuthService, 
    private router: Router,
    private sidebarToggleService: SidebarToggleService
    ) { }

  async ngOnInit() {
    this.isAuthenticated = this.authService.isLoggedIn;

    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
      this.user = await this.authService.getUser(this.user.uid);
      if (this.user) {
        this.user = {
          id: this.user.id,
          email: this.user.email,
          displayName: this.user.displayName,
          photoURL: this.user.photoURL,
          teamIds: this.user.teamIds,
          createdAt: this.user.createdAt,
        };
      }
    }
  }

  logout() {
    this.authService.logout();
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  toggleSidebar() {
    debugger;
    this.sidebarToggleService.toggleSidebar();
  }
  
}
