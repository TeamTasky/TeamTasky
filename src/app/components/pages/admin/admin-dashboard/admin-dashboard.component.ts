import { Component, OnInit } from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { SettingsService } from '../../../../shared/services/settings.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [MatSlideToggleModule],
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent implements OnInit{
  color = 'warn';
  setting: any;
  allowUserCreation = false;
  allowGoogleAccount = false;



  constructor(private settingsService: SettingsService, private authService: AuthService, private router: Router) {}

  async ngOnInit(){

    this.setting = await this.settingsService.getSetting('allowUserCreation');
    this.allowUserCreation = this.setting.value;
    this.setting = await this.settingsService.getSetting('allowGoogleAccount');
    this.allowGoogleAccount = this.setting.value;
    
  }

  onToggleAllowUserCreation(event: any) {
    this.allowUserCreation = event.checked;
    this.settingsService.setSetting('allowUserCreation', this.allowUserCreation);
  }

  onToggleAllowGoogleAccount(event: any) {
    this.allowGoogleAccount = event.checked;
    this.settingsService.setSetting('allowGoogleAccount', this.allowGoogleAccount);
  }

  logout() {
    this.authService.logout();
    sessionStorage.removeItem('admin');
  }

}
