import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message
  constructor(private as:AuthService,private routes:Router,private fs:AngularFirestore) { }

  ngOnInit(): void {
  }
  login(f){
    let data=f.value
    console.log(data.email+" "+data.password)
    this.as.login(data.email,data.password).then((user)=>{
      localStorage.setItem("uiduser",user.user.uid)
      this.routes.navigate(['/'])
      window.location.reload()
    })
     //window.location.reload()
     
  }
  
}
