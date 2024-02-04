import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SettingsService } from '../../../../shared/services/settings.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit{

  allowGoogleAccount = true;

  constructor(private authService: AuthService, private settingsService: SettingsService) {}

  async ngOnInit() {
    const googleSetting = await this.settingsService.getSetting('allowGoogleAccount');
      if (googleSetting && googleSetting.value === true){
        this.allowGoogleAccount = true;
      } else {
        this.allowGoogleAccount = false;
      }
  }

  signUp(name:string, email: string, password: string, confirmPassword: string) {
    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    // Check password complexity
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      alert("Password must be at least 8 characters long, include 1 uppercase letter, and 1 number.");
      return;
    }

    // Call authentication service
    this.authService.signupWithEmailAndPassword(name, email, password);
  }

  signupWithGoogle() {
    this.authService.loginWithGoogleProvider();
  }
}
