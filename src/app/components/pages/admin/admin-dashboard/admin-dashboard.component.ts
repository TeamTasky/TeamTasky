import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';
import { RouterOutlet } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterOutlet, SettingsComponent, RouterLink],
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent implements OnInit{



  constructor(private authService: AuthService) {}

  async ngOnInit(){

    
  }

  

  logout() {
    this.authService.logout();
    sessionStorage.removeItem('admin');
  }

}
