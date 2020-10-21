import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: Observable<firebase.User>;
 // connectUser
  constructor(private afauth: AngularFireAuth) {
    this.user = this.afauth.user;
  //  this.connectUser=this.afauth.user
    
  }

  login(email, password) {
    return this.afauth.signInWithEmailAndPassword(email, password);
  }
  logout() {
    return this.afauth.signOut();
  }
}
