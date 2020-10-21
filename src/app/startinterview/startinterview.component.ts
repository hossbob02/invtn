import {
  Component,
  OnDestroy,
  OnInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { Upload } from '../services/Upload';
import { UploadService } from '../services/upload.service';

declare var MediaRecorder: any;

@Component({
  selector: 'app-startinterview',
  templateUrl: './startinterview.component.html',
  styleUrls: ['./startinterview.component.css'],
})
export class StartinterviewComponent implements OnInit, OnDestroy {
  uploadProgress = 0;
  file: File;
  is_record = true;
  is_file = true;
  recorder: any;
  dataParam = {
    key:'',
    uidUser: '',
    nameWorker: '',
    checktext:null ,
    checkvideo:null ,
    checkfile:null ,
    checkimage:null ,
    questiontext:'',
    questionfile:'',
    questionvideo:'',
    questionimage:'',
    nameInterview: '',
    nqf:0,
    nqt:0,
    nqv:0,
    nqi:0,
    minute:0
  };

  displaySection = {
    text: '',
    image: '',
    video: '',
    file: '',
  };
  params: Subscription;
  task: AngularFireUploadTask;
  downloadURL: Observable<string>;
  ref: AngularFireStorageReference;
  url;
  persentange;
  persentange1;
  min=60
  start=false
  daytime
  counter
  messageSendToUser
  constructor(
    private activate: ActivatedRoute,
    private fs: AngularFirestore,
    private fst: AngularFireStorage,
    private uploadService: UploadService,
  
  ) {
    this.params = this.activate.params.subscribe((query) => {
      //console.log(query)
      this.dataParam.uidUser = query.iduser;
      this.dataParam.key=query.key
      this.dataParam.nameWorker=query.nameworker
    });
    this.fs.collection("myinterview").ref.doc(this.dataParam.key).get().then((data)=>{
      this.dataParam.uidUser=data.data().uidUser
      this.dataParam.questionfile=data.data().questionfile
      this.dataParam.questiontext=data.data().questiontext
      this.dataParam.questionimage=data.data().questionimage
      this.dataParam.questionvideo=data.data().questionvideo
      this.dataParam.checktext=data.data().typeInterviewtext
      this.dataParam.checkfile=data.data().typeInterviewfile
      this.dataParam.checkimage=data.data().typeInterviewimage
      this.dataParam.checkvideo=data.data().typeInterviewvideo
      this.dataParam.nameInterview=data.data().nameInterview
      this.dataParam.minute=data.data().minute
      this.dataParam.nqf=data.data().nqf
      this.dataParam.nqv=data.data().nqv
      this.dataParam.nqi=data.data().nqi
      this.dataParam.nqt=data.data().nqt
    })
    //console.log(this.dataParam);
    this.uploadService.dataParam.uidUser = this.dataParam.uidUser;
   // this.uploadService.dataParam.uidWorker = this.dataParam.uidWorker;
    this.uploadService.dataParam.nameInterview = this.dataParam.nameInterview;
    this.uploadService.dataParam.key=this.dataParam.key
    this.uploadService.dataParam.typeInterview = 'video';
    this.uploadService.dataParam.nameWorker = this.dataParam.nameWorker;
    this.uploadService.dataParam.question = this.dataParam.questionvideo;
    
    this.uploadService.dataParam.time=new Date().toLocaleString()
   ////////////////////////////
  }

  ngOnInit(): void {
    const id: any = this.dataParam.uidUser;
    this.fs
      .collection('users')
      .ref.doc(id)
      .get()
      .then((data) => {
        console.log(data.data());
      });

    
    
    this.daytime=new Date().toLocaleString()
    //console.log(this.daytime)
  }
  ngOnDestroy() {
    this.params.unsubscribe();
  }
  uploadImage(event) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.fst.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.persentange = this.task.percentageChanges();
    this.task.then((data) =>
      data.ref.getDownloadURL().then((url) => {
        // console.log(url)
        this.fs.collection('messages').add({
          response: url,
          //uidWorker: this.dataParam.uidWorker,
          uidUser: this.dataParam.uidUser,
          nameInterview: this.dataParam.nameInterview,
          typeInterview: 'image',
          nameWorker: this.dataParam.nameWorker,
          question: this.dataParam.questionimage,
          time:this.daytime
        }).then(()=>{
          //this.dataParam.nqi=this.dataParam.nqi-1
          this.fs.collection("myinterview").doc(this.dataParam.key).update({
            typeInterviewimage:false,
            nqi:this.dataParam.nqi-1
          }).then(()=>{
            window.location.reload()
          })
        });
      })
    );
  }
  uploadFile(event) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.fst.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.persentange1 = this.task.percentageChanges();
    this.task.then((data) =>
      data.ref.getDownloadURL().then((url) => {
        // console.log(url)
        this.fs.collection('messages').add({
          response: url,
          //uidWorker: this.dataParam.uidWorker,
          uidUser: this.dataParam.uidUser,
          nameInterview: this.dataParam.nameInterview,
          typeInterview: 'file',
          nameWorker: this.dataParam.nameWorker,
          question: this.dataParam.questionfile,
          time:this.daytime
        }).then(()=>{
          //this.dataParam.nqf=this.dataParam.nqf-1
          this.fs.collection("myinterview").doc(this.dataParam.key).update({
            typeInterviewtext:false,
            nqf:this.dataParam.nqf-1
          }).then(()=>{
            window.location.reload()
          })
        })
      })
    )
  }
  sendMessage(f) {
    let data = f.value;
    this.fs.collection('messages').add({
      response: data.response,
      //uidWorker: this.dataParam.uidWorker,
      uidUser: this.dataParam.uidUser,
      nameInterview: this.dataParam.nameInterview,
      typeInterview: 'text',
      nameWorker: this.dataParam.nameWorker,
      question: this.dataParam.questiontext,
      time:this.daytime
    }).then(()=>{
     // this.dataParam.nqt=this.dataParam.nqt-1
      this.messageSendToUser="Your Interview Text Sent To Your User"
      this.fs.collection("myinterview").doc(this.dataParam.key).update({
        typeInterviewtext:false,
        nqt:this.dataParam.nqt-1
      }).then(()=>{
        window.location.reload()
      })
    });
  }
  upload() {
    this.uploadService.dataParam.question = this.dataParam.questionvideo;
    this.uploadService.dataParam.nameInterview = this.dataParam.nameInterview;
    var upload = new Upload(this.file);
    this.uploadService.uploadProgress$.subscribe((res) => {
      this.uploadProgress = res;
    });
    this.uploadService.pushUpload(upload);
  }
  record() {
    this.counter=this.dataParam.minute*60
    let intervalId = setInterval(() => {
      this.counter = this.counter - 1;
      console.log(this.counter)
      if(this.counter === 0) clearInterval(intervalId)
  }, 1000)
    //let k=60
 //  while(this.i<k){
  //  setInterval(()=>{
  //    this.i=this.i+1
 //   },1000)
 // }
 this.start=true
    this.is_record = false;
    this.uploadProgress = 0;
    const constraints = {
      video: true,
      audio: true,
    };
    let timee=this.dataParam.minute*60*1000
    const video = document.querySelector('video');
    let recordingTimeMS = timee; // recording time

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        video.srcObject = stream;
        // video.captureStream = video.captureStream || video.mozCaptureStream;
        return new Promise((resolve) => (video.onplaying = resolve));
      })
      .then(() => startRecording(video.srcObject, recordingTimeMS))
      .then((recordedChunks) => {
        let recordedBlob = new Blob(recordedChunks, { type: 'video/webm' });
        var result = URL.createObjectURL(recordedBlob);
        this.file = new File([recordedBlob], getFileName());
        this.is_file = false;
      });

    function getFileName() {
      return 'recording_' + Math.floor(Math.random() * 1000000000) + '.webm';
      
    }

    var $this = this;
    function startRecording(stream, lengthInMS) {
      $this.recorder = new MediaRecorder(stream);
      let data = [];

      $this.recorder.ondataavailable = (event) => data.push(event.data);
      $this.recorder.start();
      // console.log(recorder.state + " for " + (lengthInMS/1000) + " seconds...");

      let stopped = new Promise((resolve, reject) => {
        $this.recorder.onstop = resolve;
        $this.recorder.onerror = (event) => reject(event.name);
      });

      // let recorded = wait(lengthInMS).then(
      // () => this.recorder.state == "recording" && this.recorder.stop()
      // );

      return Promise.all([
        stopped,
        // $this.recorded
      ]).then(() => data);
    }

    function wait(delayInMS) {
      return new Promise((resolve) => setTimeout(resolve, delayInMS));
    }
    let time=this.dataParam.minute*60*1000
    setTimeout(()=>{
      const video = document.querySelector('video');
    (<MediaStream>video.srcObject).getTracks().forEach((track) => track.stop());
    this.recorder.state == 'recording' && this.recorder.stop();
    this.is_record = true;
    },time)
    //this.dataParam.nqv=this.dataParam.nqv-1
    this.uploadService.dataParam.nqv=this.dataParam.nqv
  }

  stop() {
    const video = document.querySelector('video');
    (<MediaStream>video.srcObject).getTracks().forEach((track) => track.stop());
    this.recorder.state == 'recording' && this.recorder.stop();
    this.is_record = true;
  }
  finish(){}
}
