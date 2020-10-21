import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Upload } from './Upload';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private basePath: string = '/Videos';
  private uploadTask: firebase.storage.UploadTask;
  uploadProgress$ = new Subject<number>();
  dataParam = {
    uidUser: '',
    uidWorker: '',
    nameWorker: '',
    typeInterview: '',
    nameInterview: '',
    question: '',
    time:'',
    key:'',
    nqv:0
  };
  constructor(
    public db: AngularFirestore,
    public firebaseAuth: AngularFireAuth,
    private fs:AngularFirestore
  ) {}
  pushUpload(upload: Upload) {
    let storageRef = firebase.storage().ref();
    this.uploadTask = storageRef
      .child(`${this.basePath}/${upload.file.name}`)
      .put(upload.file);

    this.uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // upload in progress
        this.uploadProgress$.next(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => {
        // upload failed
        console.log(error);
      },
      () => {
        // upload success

        this.uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          if (url) {
            upload.url = url;
            upload.name = upload.file.name;
            this.saveFileData(upload);
          }
        });
      }
    );
  }

  // Writes the file details to the realtime db
  private saveFileData(upload: Upload) {
    this.db.collection('messages').add({
      name: upload.name,
      response: upload.url,
      uidUser: this.dataParam.uidUser,
      nameWorker: this.dataParam.nameWorker,
      typeInterview: this.dataParam.typeInterview,
      nameInterview: this.dataParam.nameInterview,
      question: this.dataParam.question,
      time:this.dataParam.time
    }).then(()=>{
      this.fs.collection("myinterview").doc(this.dataParam.key).update({
        typeInterviewvideo:false,
        nqv:this.dataParam.nqv-1
      }).then(()=>{
        window.location.reload()
      })
    });
  }
}
