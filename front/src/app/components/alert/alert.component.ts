import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {

  constructor() { }

  latitudeFormControl = new FormControl('', [
    Validators.required,
  ]);

  longitudeFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  coordsForm = new FormGroup({
    latitude: this.latitudeFormControl,
    longitude: this.longitudeFormControl
  });

  getFormValue = (key: string): string => {
    return this.coordsForm.get(key)?.value;
  }

  unsetFormValue = (key: string): void => {
    this.coordsForm.get(key)?.setValue('');
  }

}
