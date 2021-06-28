import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadComponent } from './upload/upload.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VideoComponent } from './video/video.component';
import { MatIconModule } from '@angular/material/icon'; 
 import {MatProgressBarModule} from '@angular/material/progress-bar';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PlayComponent } from './play/play.component'; 

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    VideoComponent,
    PageNotFoundComponent,
    PlayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
