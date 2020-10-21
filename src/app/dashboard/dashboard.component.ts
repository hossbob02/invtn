import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UsersService } from '../services/users.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  dataDisplay = {
    tableUser: '',
    tableWorker: 'none',
    listContact: 'none',
    allworkers: 'none',
  };
  dataWorker = {
    name: '',
    email: '',
    password: '',
    nameUser: '',
    document: '',
    company:'',
    uidUser:''
  };
  successMessage;
  users = [];
  worker = [];
  successWorkerAccept;
  contact = [];
  id = [];
  allworker = [];
  userUpdate = {
    name: '',
    company: '',
    interview: 0,
    id: '',
  };
  messageUpdate;
  dataMessage={
    name:'',
    message:''
  }
  constructor(private fs: AngularFirestore, private us: UsersService) {
    this.us.getusers().subscribe((data) => {
      this.users = data.map((element) => {
        return {
          id: element.payload.doc.id,
          name: element.payload.doc.data()['name'],
          company: element.payload.doc.data()['company'],
          email: element.payload.doc.data()['email'],
          interview: element.payload.doc.data()['interview'],
        };
      });
    });
    this.us.getWorker().subscribe((data) => {
      this.worker = data.map((element) => {
        return {
          id: element.payload.doc.id,
          name: element.payload.doc.data()['name'],
          email: element.payload.doc.data()['email'],
          nameUser: element.payload.doc.data()['nameUser'],
          company:element.payload.doc.data()['company'],
          password: element.payload.doc.data()['password'],
          //accept: element.payload.doc.data()['accept'],
          uidUser:element.payload.doc.data()['uiduser']
        };
      });
    });
    this.fs
      .collection('listContact')
      .valueChanges()
      .subscribe((data) => (this.contact = data));
  }

  ngOnInit(): void {
    this.us.getmyWorker().subscribe((data) => {
      this.allworker = data.map((element) => {
        return {
          id: element.payload.doc.id,
          name: element.payload.doc.data()['name'],
          email: element.payload.doc.data()['email'],
          nameUser: element.payload.doc.data()['nameUser'],
          company:element.payload.doc.data()['company']
        };
      });
    });
  }
  deleteUser(id){
    this.fs.collection("users").doc(id).delete()
  }
  listuser() {
    this.dataDisplay.tableUser = '';
    this.dataDisplay.tableWorker = 'none';
    this.dataDisplay.listContact = 'none';
    this.dataDisplay.allworkers = 'none';
  }
  listworker() {
    this.dataDisplay.tableUser = 'none';
    this.dataDisplay.tableWorker = '';
    this.dataDisplay.allworkers = 'none';
    this.dataDisplay.listContact = 'none';
  }
  listContact() {
    this.dataDisplay.tableUser = 'none';
    this.dataDisplay.tableWorker = 'none';
    this.dataDisplay.listContact = '';
    this.dataDisplay.allworkers = 'none';
  }
  listallworker() {
    this.dataDisplay.tableUser = 'none';
    this.dataDisplay.tableWorker = 'none';
    this.dataDisplay.listContact = 'none';
    this.dataDisplay.allworkers = '';
  }

  addUser(f) {
    let data = f.value;
    this.fs
      .collection('users')
      .doc(data.uid)
      .set({
        name: data.name,
        company: data.company,
        email: data.email,
        interview: data.interview,
        uid: data.uid,
      })
      .then(() => (this.successMessage = 'User added!'));
  }
  accept(name, email, nameUser, password,id,company,uidUser) {
    this.dataWorker.name = name;
    this.dataWorker.email = email;
    this.dataWorker.nameUser = nameUser;
    this.dataWorker.password = password;
    this.dataWorker.document = id;
    this.dataWorker.company=company
    this.dataWorker.uidUser=uidUser
  }
  acceptWorker(faw) {
    let data = faw.value;
    this.fs
      .collection('myworkers')
      .doc(data.uidd)
      .set({
        nameworker: this.dataWorker.name,
        emailWorker: this.dataWorker.email,
        nameUser: this.dataWorker.nameUser,
        passwordWorker: this.dataWorker.password,
        uidWorker: data.uidd,
        company:this.dataWorker.company,
        uidUser:this.dataWorker.uidUser
      })
      .then(() => {
        this.fs
          .collection('workerManager')
          .doc(this.dataWorker.document)
          .delete();
        this.successWorkerAccept = 'added';
      });
  }
  deleteWorkerManager(id) {
    this.fs.collection('workerManager').doc(id).delete();
  }
  updateUser(id, name, company, email, interview) {
    this.userUpdate.name = name;
    this.userUpdate.company = company;
    this.userUpdate.interview = interview;
    this.userUpdate.id = id;
  }
  updateUserById() {
    this.fs
      .collection('users')
      .doc(this.userUpdate.id)
      .update({
        name: this.userUpdate.name,
        company: this.userUpdate.company,
        interview: this.userUpdate.interview,
      })
      .then(() => {
        this.messageUpdate = 'successfully update';
      });
  }
  showMessage(message,name){
    this.dataMessage.message=message
    this.dataMessage.name=name
  }
}
