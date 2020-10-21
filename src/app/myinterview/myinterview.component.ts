import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-myinterview',
  templateUrl: './myinterview.component.html',
  styleUrls: ['./myinterview.component.css']
})
export class MyinterviewComponent implements OnInit,OnDestroy {
  myInterview
  uid
  Interview:Subscription
  dataquestion={
    typeInterviewtext:null,
  typeInterviewimage:null,
  typeInterviewfile:null,
  typeInterviewvideo:null,
  questionfile:'',
  questionimage:'',
  questiontext:'',
  questionvideo:''
  }
  constructor(private fs:AngularFirestore,private afauth:AngularFireAuth,private router:Router) { 
    this.afauth.user.subscribe(user=>{
     return this.uid=user.uid
    })
  }

  ngOnInit(): void {
    this.Interview=this.fs.collection("myinterview").valueChanges().subscribe(data=>{
     return this.myInterview=data
    })
  }
  startinterview(uidUser,uidWorker,nameInterview,typeInterview,nameWorker,question){
    this.router.navigate(['/startinterview/'+nameWorker+'/'+uidUser+'/'+'/'+nameInterview+'/'+typeInterview+'/'+question])
  }
  questions(typeInterviewtext,typeInterviewimage,typeInterviewfile,typeInterviewvideo,questionfile,questionimage,questiontext,questionvideo){
    this.dataquestion.questionfile=questionfile
    this.dataquestion.questionimage=questionimage
    this.dataquestion.questiontext=questiontext
    this.dataquestion.questionvideo=questionvideo
    this.dataquestion.typeInterviewfile=typeInterviewfile
    this.dataquestion.typeInterviewimage=typeInterviewimage
    this.dataquestion.typeInterviewtext=typeInterviewtext
    this.dataquestion.typeInterviewvideo=typeInterviewvideo

  }
  ngOnDestroy(){
    this.Interview.unsubscribe()
  }
  
}
