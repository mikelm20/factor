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
  lis=[];
  
constructor(private http : HttpClient){
  this.i=0;
}

  ngOnInit(): void {
    this.http.get("http://127.0.0.1:5000/videos")
    .subscribe(Response => {
      console.log(Response);
      this.li=Response;
      this.lis=this.li.list;
    });
  }

  display = false;
 onPress(index: number) {
   this.display = !this.display;
   this.i=index;
 }
}
