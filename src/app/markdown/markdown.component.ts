import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MarkdownService } from './markdown.service';

declare var editormd: any;
// declare var $: any;

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.css']
})
export class MarkdownComponent implements OnInit, AfterViewInit {

  markdownContent: string = '### Htl';

  private editorConfig: any;

  private markdownEditor: any;

  constructor(
    private markdownService: MarkdownService
  ) { }


  ngOnInit() {
    this.loadEditorConfig();
  }

  ngAfterViewInit(): void {
    // 创建编辑器
    this.markdownEditor = editormd('markdown-editor', this.editorConfig);
  }

  private loadEditorConfig(): void {
    this.markdownService.getEditorConfig()
    .subscribe(
      res => {
        this.editorConfig = res;
      }
    );
  }
}
