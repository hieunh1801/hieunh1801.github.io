# Angular Question and Answer

## Template with context variable

```html title="component.html"
<!-- using template -->
<ng-container
  [ngTemplateOutlet]="sampleForm"
  [ngTemplateOutletContext]="{
                sampleIndex: sample.index,
                requestIndex: requestIndexSelected
              }"
></ng-container>

<!-- define template -->
<ng-template
  #sampleForm
  let-sampleIndex="sampleIndex"
  let-requestIndex="requestIndex"
>
</ng-template>
```
