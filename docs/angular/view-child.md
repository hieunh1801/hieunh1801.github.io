```html title=".component.html"
<input #someInput placeholder="Your favorite sea creature">
```

```ts title=".component.ts"
import {
  Component,
  ViewChild,
  AfterViewInit,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('someInput') someInput!: ElementRef; // <- using it
  ngAfterViewInit() {
    this.someInput.nativeElement.value = 'Whale!';
  }
}
```
