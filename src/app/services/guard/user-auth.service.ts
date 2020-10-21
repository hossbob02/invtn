import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private as:AuthService,private router:Router) { }
  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean>
  {
    return new Promise(resolve=>{
      this.as.user.subscribe(user=>{
        if(user.uid) {
          resolve(true)
        }
        else{
          resolve(false)
          this.router.navigate(['/'])
          
        }
      })
    })
  }
}
