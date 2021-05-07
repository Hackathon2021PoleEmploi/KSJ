import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUserPosition } from 'src/app/types/position';

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
export class AlertComponent implements OnInit {

  genres$: Observable<string[]>;
  pos$: Observable<IUserPosition>;
  
  constructor(private store: Store<any>) { 
    this.genres$ = store.select((s) => s.trees.topGenres);
    this.pos$ = store.select((s) => s.user.position);
  }
  
  ngOnInit(): void {
    this.pos$.subscribe((value) => {
      this.setFormValue('latitude', value.lat);
      this.setFormValue('longitude', value.lon);
    });
  }

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

  setFormValue = (key: string, value: number): void => {
    this.coordsForm.get(key)?.setValue(value);
  }

}
