//imports
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
//components
import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { SignupComponent } from './components/pages/account/signup/signup.component';
import { LoginComponent } from './components/pages/account/login/login.component';
import { AccountComponent } from './components/pages/account/account.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    AccountComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'TeamTasky';

  constructor() {

  }
}
