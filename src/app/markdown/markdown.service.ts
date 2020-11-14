import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MarkdownService {

  constructor(
    private httpClient: HttpClient
  ) {}

  getEditorConfig(): Observable<any> {
    return this.httpClient.get(`assets/markdown/editor-config.json`);
  }
}
