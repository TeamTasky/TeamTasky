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
    <header class="font-bold h-16 flex justify-between items-center bg-dark-blue">
      <div class="flex items-center">
        <button [routerLink]="['/dashboard']" class="bg-transparent">
          <img [src]="'assets/img/icono.png'" alt="User Photo" class="h-12 w-12 ml-3 object-cover md:w-38">
        </button>
      </div>
      <div class="bg-transparent">
        <button [routerLink]="['/account']" class="px-4 bg-transparent">
          <div class="bg-transparent">
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
