import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { element } from 'protractor';
import { Observable, observable } from 'rxjs';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-myworkers',
  templateUrl: './myworkers.component.html',
  styleUrls: ['./myworkers.component.css'],
})
export class MyworkersComponent implements OnInit {
  uid;
  worker = [];
  allworker = [];
  workerSentToAdmin;
  Myworkerstate = {
    waitingList: 'none',
    myworkerAccept: '',
  };
  dataUserLogin;
  dataInterview = {
    name: '',
    email: '',
    id: '',
    uidUser: '',
    nameUser: '',
  };
  user = [];
  type = {
    typeInterview: '',
    nameInterview: '',
    questiontext: '',
    questionimage: '',
    questionvideo: '',
    questionfile: '',
    minute:1,
    nqt:0,
    nqf:0,
    nqi:0,
    nqv:0,
  };
  checkbock={
    text:'',
    video:'',
    file:'',
    image:''
  }
  successAddInterview
  nameUserAdd
  linkQuestion
  linkQuestion2
  daytime
  interview
  verifInterview
  nameeUser
  companyy
  constructor(
    private afstate: AngularFireAuth,
    private fs: AngularFirestore,
    private us: UsersService
  ) {
    this.afstate.user.subscribe((user) => {
      if (user) {
        return (this.uid = user.uid);
      }
    });
  }

  ngOnInit(): void {
    this.us.getmyWorker().subscribe((data) => {
      this.worker = data.map((element) => {
        return {
          id: element.payload.doc.id,
          name: element.payload.doc.data()['name'],
          email: element.payload.doc.data()['email'],
          nameUser: element.payload.doc.data()['nameUser'],
          uidUser:element.payload.doc.data()['uiduser']
        };
      });
    });
    
  this.fs.collection("users").snapshotChanges().subscribe(data=>{
    this.nameUserAdd=data.map(element=>{
      if(element.payload.doc.id===localStorage.getItem("uiduser")){
        return{
          name:element.payload.doc.data()['name'],
          company:element.payload.doc.data()['company'],
          interview:element.payload.doc.data()['interview']
        }
      }
    })
  })
  this.fs
  .collection('users')
  .ref.doc(localStorage.getItem("uiduser"))
  .get()
  .then((data) => {
    this.nameeUser=data.data().name
    this.companyy=data.data().company
    this.verifInterview=data.data().interview
  });
  
}

deleteMyWorker(id){
  this.fs.collection("myworkers").doc(id).delete()
}
  addWorker(fw) {
   
   
    let data = fw.value;
    this.fs
      .collection('myworkers')
      .add({
        uiduser: this.uid,
        name: data.name,
        email: data.email,
        nameUser:this.nameeUser,
        company:this.companyy
      })
      .then(() => {
        this.workerSentToAdmin =
          'successfully! ';
      });
    //console.log(this.uid);
  }
  myworkerAccept() {
    this.Myworkerstate.myworkerAccept = '';
    this.Myworkerstate.waitingList = 'none';
  }
 // waitingList() {
   // this.Myworkerstate.myworkerAccept = 'none';
  //  this.Myworkerstate.waitingList = '';
  //}

  getdatainterview(name, email, id, uidUser) {
    this.dataInterview.name = name;
    this.dataInterview.email = email;
    this.dataInterview.id = id;
    this.dataInterview.uidUser = uidUser;
  }
  addInterview() {
    
    let key=Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    this.interview=this.verifInterview
    this.daytime=new Date().toLocaleString()
    this.fs.collection('myinterview').doc(key).set({
      //uidWorker: this.dataInterview.id,
      uidUser: this.uid,
      nameWorker: this.dataInterview.name,
      typeInterviewtext: this.checkbock.text,
      typeInterviewimage: this.checkbock.image,
      typeInterviewfile: this.checkbock.file,
      typeInterviewvideo: this.checkbock.video,
      typetext: this.checkbock.text,
      typeimage: this.checkbock.image,
      typefile: this.checkbock.file,
      nqt:this.type.nqt,
      nqv:this.type.nqv,
      nqi:this.type.nqi,
      nqf:this.type.nqf,
      typevideo: this.checkbock.video,
      nameInterview: this.type.nameInterview,
      questiontext: this.type.questiontext,
      questionfile: this.type.questionfile,
      questionimage: this.type.questionimage,
      questionvideo: this.type.questionvideo,
      minute:this.type.minute,
      time:this.daytime,
      linkInterview:window.location.host+'/'+'startinterview'+'/'+this.dataInterview.name+'/'+this.uid+'/'+key
    }).then(()=>{
      this.successAddInterview='Your interview send to worker'
     this.linkQuestion=window.location.host+'/'+'startinterview'+'/'+this.dataInterview.name+'/'+this.uid+'/'+this.type.nameInterview+'/'+this.type.minute+'/'+this.type.typeInterview+'/'+this.type.questiontext
   // this.linkQuestion2=window.location.host+'/'+this.dataInterview.id
    });
    this.fs.collection('users').doc(this.uid).update({
      interview:this.interview-1
    }).then(()=>{
      window.location.reload()
    })
  }
  delete(id) {
    this.fs.collection('workerManager').doc(id).delete();
  }
}
