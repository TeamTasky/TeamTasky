import { Component } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  constructor(private authService: AuthService) {}

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
