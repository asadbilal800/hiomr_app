import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private sharedService: SharedService,private router: Router) { }

  canActivate(): boolean {
    if (this.sharedService.isInProgress) {
      return true; // Allow navigation if user is in progress
    } else {
      this.router.navigate(['']); // Redirect to login page if user is not in progress
      return false;
    }
  }
}
