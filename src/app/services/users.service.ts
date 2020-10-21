import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private fs:AngularFirestore) { }
getusers(){
  return this.fs.collection('users').snapshotChanges()
}
getWorker(){
  return this.fs.collection('workerManager').snapshotChanges()
}
getmyWorker(){
  return this.fs.collection('myworkers').snapshotChanges()
}
}
