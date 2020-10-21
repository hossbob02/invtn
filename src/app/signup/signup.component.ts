import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private af:AngularFireAuth,private fs:AngularFirestore,private router:Router) { }

  ngOnInit(): void {
  }
  register(f){
    let data=f.value
    this.af.createUserWithEmailAndPassword(data.email,data.password).then(user=>{
      this.fs.collection("users").doc(user.user.uid).set({
        name:data.name,
        company:data.company,
        email:data.email,
        uid:user.user.uid,
        interview:0
      }).then(()=>{
        localStorage.setItem("uiduser",user.user.uid)
        this.router.navigate(['/'])
      })
    })
  }
}
