### Basic example

```html
<my-accordion activeIds="panel-id-1">
  <my-panel id="panel-id-1">
    <span *my-panel-title>Panel #1 title</span>
    <div *my-panel-content>
      <strong>Panel #1 content</strong>
    </div>
  </my-panel>
  <my-panel id="panel-id-2" type="info">
    <span *my-panel-title>Panel #2 of type <em>info</em></span>
    <div *my-panel-content>
      <em>Panel #2 content</em>
    </div>
  </my-panel>
</my-accordion>
```
