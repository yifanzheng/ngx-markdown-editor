## ngx-markdown-editor

最近，尝试在 Angular 项目中实现 Markdown 编辑功能。在网上搜索了一番之后，决定使用 [Editor.md](http://editor.md.ipandao.com/index.html) 插件来实现 Markdown 编辑功能。 Editor.md 功能比较丰富，但是文档不是很友好。

### 使用

- 首先，下载 Editor.md 文件，放到 `assets` 目录下。

- 使用 npm 下载 jquery。

```node
npm install jquery
```

- 在 angular.json 中配置 Editor.md 的 css 和 js。

```json
"styles": [
  "src/styles.css",
  "src/assets/editor.md/css/editormd.css"

],
"scripts": [
  "node_modules/jquery/dist/jquery.js",
  "src/assets/editor.md/editormd.js",
  "src/assets/editor.md/lib/marked.min.js",
  "src/assets/editor.md/lib/prettify.min.js",
  "src/assets/editor.md/lib/raphael.min.js",
  "src/assets/editor.md/lib/underscore.min.js"
]
```

- 配置 Markdown 编辑器

```json
{
    "mode": "gfm",
    "name": "",
    "value": "",
    "theme": "",
    "editorTheme": "eclipse",
    "previewTheme": "",
    "markdown": "",
    "appendMarkdown": "",
    "width": "100%",
    "height": "640",
    "path": "assets/editor.md/lib/",
    "pluginPath": "",
    "delay": 300,
    "autoLoadModules": true,
    "watch": true,
    "placeholder": "Enjoy Markdown! coding now...",
    "gotoLine": true,
    "codeFold": true,
    "autoHeight": false,
    "autoFocus": true,
    "autoCloseTags": true,
    "searchReplace": true,
    "syncScrolling": true,
    "readOnly": false,
    "tabSize": 4,
    "indentUnit": 4,
    "lineNumbers": true,
    "lineWrapping": true,
    "autoCloseBrackets": true,
    "showTrailingSpace": true,
    "matchBrackets": true,
    "indentWithTabs": true,
    "styleSelectedText": true,
    "matchWordHighlight": true,
    "styleActiveLine": true,
    "dialogLockScreen": true,
    "dialogShowMask": true,
    "dialogDraggable": true,
    "dialogMaskBgColor": "#fff",
    "dialogMaskOpacity": 0.1,
    "fontSize": "13px",
    "saveHTMLToTextarea": true,
    "previewCodeHighlight": true,
    "disabledKeyMaps": [],
    "imageUpload": false,
    "imageFormats": [
        "jpg",
        "jpeg",
        "gif",
        "png",
        "bmp",
        "webp"
    ],
    "imageUploadURL": "",
    "crossDomainUpload": false,
    "uploadCallbackURL": "",
    "toc": true,
    "tocm": true,
    "htmlDecode": true,
    "pageBreak": true,
    "atLink": true,
    "emailLink": true,
    "taskList": false,
    "emoji": false,
    "tex": false,
    "flowChart": false,
    "sequenceDiagram": false,
    "toolbar": true,
    "toolbarAutoFixed": true,
    "toolbarIcons": "full",
    "toolbarTitles": {}
}
```

- 集成到 Angular 项目中。

**markdown.component.html**

```html
<div id="markdown-editor">
    <textarea style="display:none;" [(ngModel)]="markdownContent"></textarea>
</div>
```

**markdown.component.ts**

```ts
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
```

**app.component.html**

```html
<app-markdown [(ngModel)]="text"></app-markdown>
```

### 效果图

![markdown](https://img-blog.csdnimg.cn/20201116222026443.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L29zY2hpbmFfNDE3OTA5MDU=,size_16,color_FFFFFF,t_70#pic_center)
