import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user
  admin
  verifUserConnect
  isUserConnect
  uid
  constructor(private as:AuthService,private routes:Router,private afauth:AngularFireAuth,private fs:AngularFirestore) {
   
    this.as.user.subscribe(user=>{
      if(user){
        this.uid=user.uid
        return this.user=true
      }else{
        this.user=false
      }
    })
    this.as.user.subscribe(user=>{
      if(user.email==='admin@fiverr.com'){
        this.admin=true
      }else{
        this.admin=false
      }
    })
   
    
   }

  ngOnInit(): void {
   
  }
logout(){
  
  this.as.logout().then(()=>{this.routes.navigate(['/login'])}).then(()=>{
  localStorage.removeItem("uiduser")
  window.location.reload()
})


}
}
