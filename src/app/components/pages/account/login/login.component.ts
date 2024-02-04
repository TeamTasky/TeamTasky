import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';
import { RouterLink } from '@angular/router';
import { SettingsService } from '../../../../shared/services/settings.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    allowUserCreation = true;
    allowGoogleAccount = true;
  
    constructor(private authService: AuthService, private settingsService: SettingsService) { }

    async ngOnInit() {
      const newAccountSetting = await this.settingsService.getSetting('allowUserCreation');
      if (newAccountSetting && newAccountSetting.value === true){
        this.allowUserCreation = true;
      } else {
        this.allowUserCreation = false;
      }
      const googleSetting = await this.settingsService.getSetting('allowGoogleAccount');
      if (googleSetting && googleSetting.value === true){
        this.allowGoogleAccount = true;
      } else {
        this.allowGoogleAccount = false;
      }
    }
  
    loginWithGoogle() {
      this.authService.loginWithGoogleProvider();
    }
  
    loginWithEmailAndPassword(email: string, password: string) {
      this.authService.loginWithEmailAndPassword(email, password);
    }


}
