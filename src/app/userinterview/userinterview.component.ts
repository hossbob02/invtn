import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { element } from 'protractor';

@Component({
  selector: 'app-userinterview',
  templateUrl: './userinterview.component.html',
  styleUrls: ['./userinterview.component.css'],
})
export class UserinterviewComponent implements OnInit {
  uid;
  message = [];
  responseWorker = {
    question: '',
    response: '',
    type:''
  };
  constructor(private fs: AngularFirestore, private afauth: AngularFireAuth) {
    this.afauth.user.subscribe((user) => {
      if (user) {
        return (this.uid = user.uid);
      }
    });
    let data=new Date
    console.log(data.getDate().toLocaleString()+data.getTime())
  }

  ngOnInit(): void {
    this.fs
      .collection('messages')
      .snapshotChanges()
      .subscribe((data) => {
        this.message = data.map((element) => {
          return {
            id: element.payload.doc.id,
            nameInterview: element.payload.doc.data()['nameInterview'],
            nameWorker: element.payload.doc.data()['nameWorker'],
            question: element.payload.doc.data()['question'],
            response: element.payload.doc.data()['response'],
            typeInterview: element.payload.doc.data()['typeInterview'],
            uidUser: element.payload.doc.data()['uidUser'],
            uidWorker: element.payload.doc.data()['uidWorker'],
            time:element.payload.doc.data()['time'],
          };
        });
      });
  }

  details(question, response,type) {
    this.responseWorker.question = question;
    this.responseWorker.response = response;
  this.responseWorker.type=type
  }
}
