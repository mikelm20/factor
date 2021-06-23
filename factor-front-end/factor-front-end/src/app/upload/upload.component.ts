import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {

  @Input()
      requiredFileType: string | undefined;
      formData: FormData | undefined;
      fileName = '';
      uploadProgress: number | undefined;
      uploadSub: Subscription = new Subscription;

      constructor(private http: HttpClient) {}

      onNewFile(event:any){
        const file:File = event.target.files[0];
        
          if (file) {
              this.fileName = file.name;
              this.formData = new FormData();
              this.formData.append("file", file);
              this.formData.append( "name", this.fileName);
          }
      }
      
        onFileUpload() {
        
        const upload$ = this.http.post("http://127.0.0.1:5000/videos/upload", this.formData, {
            reportProgress: true,
            observe: 'events'
        })
        .pipe(
            finalize(() => this.reset())
        );
      
        this.uploadSub = upload$.subscribe(event => {
          if (event.type == HttpEventType.UploadProgress) {
            const total: number = event.total!;  
            this.uploadProgress = Math.round(100 * (event.loaded / total));
          }
        })
      }

    cancelUpload() {
      this.uploadSub.unsubscribe();
      this.reset();
    }

    reset() {
      this.uploadProgress = null!;
      this.uploadSub = null!;
    }
  }