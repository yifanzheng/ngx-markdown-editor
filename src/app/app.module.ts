import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MarkdownComponent } from './markdown/markdown.component';
import { MarkdownService } from './markdown/markdown.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    MarkdownComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [MarkdownService],
  bootstrap: [AppComponent]
})
export class AppModule { }
