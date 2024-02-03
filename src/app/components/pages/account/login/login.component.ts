import { Component } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  
    constructor(private authService: AuthService) { }
  
    loginWithGoogle() {
      this.authService.loginWithGoogleProvider();
    }
  
    loginWithEmailAndPassword(email: string, password: string) {
      this.authService.loginWithEmailAndPassword(email, password);
    }


}
