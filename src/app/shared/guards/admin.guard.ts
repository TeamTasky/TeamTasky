import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate{
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (sessionStorage.getItem('admin') === 'true'){
      return true;
    } else {
      this.router.navigate(['/admin']);
      return false;
    }
  }


}