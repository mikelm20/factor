import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, } from '@angular/common/http';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  transcript:any;

  @Input()
  list: any;
  @Input()
  i: any;
  
constructor(private http : HttpClient){
}

  ngOnInit(): void {
    this.http.get("http://localhost:5000/transcripts/transcript/"+this.list[this.i].name)
    .subscribe(Response => {
      console.log("Trying to show text:"+Response);
    });
    console.log("Playing:"+this.list[this.i].name);
  };

}
