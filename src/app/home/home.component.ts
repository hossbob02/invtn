import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  success
  constructor(private fs:AngularFirestore) { 
    //window.location.reload()
  }

  ngOnInit(): void {
    
  }
  contactAdmin(f){
    let data=f.value
    this.fs.collection("listContact").add({
      name:data.name,
      email:data.email,
      password:data.password,
      company:data.company,
      message:data.message
    }).then(()=>{
      this.success='successful contact, your requests send to admin,when admin active your account he contact you with email'
    })
  }
}
