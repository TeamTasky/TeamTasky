import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SettingsService } from '../services/settings.service';

@Injectable({
  providedIn: 'root'
})
export class SignupGuard implements CanActivate{
  constructor(private router: Router, private settingsService: SettingsService) {}

  async canActivate(): Promise<boolean> {
    const setting = await this.settingsService.getSetting('allowUserCreation');
    if (setting && setting.value === true){
      return true;
    } else {
      return false;
    }
  }


}