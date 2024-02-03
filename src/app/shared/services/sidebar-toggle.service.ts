import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarToggleService {
  private _sidebarOpen = new BehaviorSubject<boolean>(false);

  get sidebarOpen$() {
    return this._sidebarOpen.asObservable();
  }

  toggleSidebar() {
    this._sidebarOpen.next(!this._sidebarOpen.value);
  }
}
