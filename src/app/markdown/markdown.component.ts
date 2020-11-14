import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MarkdownService } from './markdown.service';

declare var editormd: any;

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MarkdownComponent),
      multi: true
    }
  ]
})
export class MarkdownComponent implements OnInit, ControlValueAccessor {

  markdownContent: string;

  // editormd 对象
  private markdownEditor: any;

  private editorDefaultConfig = {
    width: '100%',
    height: '640',
    path: 'assets/editor.md/lib/',
    saveHTMLToTextarea: true
  };

  private onChange = (_: any) => { };
  private onTouched = () => { };

  constructor(
    private markdownService: MarkdownService
  ) { }

  ngOnInit() {
    this.editorStartup();
  }

  writeValue(obj: any): void {
    this.markdownContent = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  private editorStartup(): void {
    this.markdownService.getEditorConfig()
      .subscribe(
        res => {
          const editorConfig = res ? res : this.editorDefaultConfig;
          this.createEditor(editorConfig);
        },
        () => {
          console.warn('Markdown Editor init failed');
        }
      );
  }

  private createEditor(editorConfig: any): void {
    this.markdownEditor = editormd('markdown-editor', editorConfig);
    if (this.markdownEditor) {
      // 注册变更事件
      this.markdownEditor.on('change', () => {
        this.onChange(this.markdownContent);
        // 获取 html 格式的内容
        // console.log(this.markdownEditor.getHTML());
        // 获取 markdown 格式的内容
        // console.log(this.markdownEditor.getMarkdown());
      });
    }
  }
}