import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-login.component.html'
})
export class AdminLoginComponent {

  constructor(private router: Router, private authService: AuthService) { }

  async login(user: string, password: string) {
    if (user === 'admin') {
      const admin = await this.authService.loginWithAdminUser(password);
      if (admin) {
        console.log('Usuario y contraseña correctos');
        this.router.navigate(['/admin-dashboard']);
      }
    }
  }

}
