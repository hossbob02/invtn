import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  messagee
  verif=false
  constructor(private fs:AngularFirestore) { }

  ngOnInit(): void {
  }

  contact(f){
    let data=f.value
    this.fs.collection("listContact").add({
      name:data.name,
      email:data.email,
      subject:data.subject,
      message:data.message
    }).then(()=>{
      this.verif=true
      this.messagee="Successfully Contact! we will contact you with email"
    })
  }
}
