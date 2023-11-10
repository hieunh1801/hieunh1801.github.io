
```ts title=".component.ts"
  requestForms = this.fb.array([]);

  addRequestForm() {
    this.requestForms.push(this.generateNewRequestItem());
  }

  removeRequestForm(index: number) {
    this.requestForms.removeAt(index);
  }

  get requestsCount(): number {
    return this.requestForms.length;
  }

  generateNewRequestItem(): FormGroup {
    return this.fb.group({
      requestNumber: ["", [Validators.required]],
      hostpitalId: ["", [Validators.required]],
      doctorId: ["", [Validators.required]],
      agencyId: ["", [Validators.required]],
      agencyContactId: ["", [Validators.required]],
      marketingAgencyId: ["", [Validators.required]],
      productId: ["", [Validators.required]],
      productName: ["", [Validators.required]],
      // createdActor: ["", [Validators.required]],
      experiment: ["0", [Validators.required]],
      reportTemplateId: ["0", [Validators.required]],
    });
  }

  getRequestFormGroup(idx: number): FormGroup {
    return this.requestForms.controls[idx] as FormGroup;
  }
  

```


```html title=".component.html"

<ng-template #requestList>
  <div *ngFor="let requestForm of requestForms.controls; let i = index">
    <div [formGroup]="getRequestFormGroup(i)" class="requestForm">
      <mat-form-field>
        <mat-label>검사 카테고리*</mat-label>
        <input matInput formControlName="experiment" />
      </mat-form-field>

      <!-- Add other form controls here if needed -->
    </div>
    <div>
      <!-- Button to remove the request form -->
      <button type="button" (click)="removeRequestForm(i)">Remove</button>
    </div>
  </div>
</ng-template>
```