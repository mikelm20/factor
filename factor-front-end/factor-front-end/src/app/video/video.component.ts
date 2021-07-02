import { Component, OnInit } from '@angular/core';
import { HttpClient, } from '@angular/common/http';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  i:number;
  li:any;
  text:any;
  
constructor(private http : HttpClient){
  this.i=0;
}

  ngOnInit(): void {
    this.http.get("http://127.0.0.1:5000/videos")
    .subscribe(Response => {
      console.log(Response);
      this.li=Response;
    });
  }

  display = false;
 onPress(index: number) {
   this.display = !this.display;
   this.i=index;
 }

 transcribeAWS(index: number) {
   this.i=index;
   this.http.get("http://127.0.0.1:5000/transcripts/transcribe/AWS/"+this.li[this.i].name)
    .subscribe(Response => {
      console.log(Response);
      this.text=Response;
    });
 }

 transcribeDS(index: number) {
   this.i=index;
   this.http.get("http://127.0.0.1:5000/transcripts/transcribe/DS/"+this.li[this.i].name)
    .subscribe(Response => {
      console.log(Response);
      this.text=Response;
    });
 }
}
