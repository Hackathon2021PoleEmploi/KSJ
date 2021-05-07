import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { nearestTrees, topGenres } from 'src/app/store/actions/tree.actions';
import { reverseGeocode, updateAllergies, updatePosition } from 'src/app/store/actions/user.actions';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {

  address: string = "";
  allergies: string = "";

  isGeocoding$: Observable<boolean>;
  genres$: Observable<string[]>;

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('fruitInput')
  fruitInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto')
  matAutocomplete!: MatAutocomplete;

  constructor(private store: Store<any>) {
    this.isGeocoding$ = store.select((s) => s.user.reverseGeocoding);
    this.genres$ = store.select((s) => s.trees.topGenres);
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
  }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.store.dispatch(updatePosition({userPosition: {lat: position.coords.latitude, lon: position.coords.longitude}}))
    }, (error) => console.log(error));
    this.store.dispatch(topGenres());
  }

  search() {
    if (this.address.trim().length > 0) {
      this.store.dispatch(reverseGeocode({query: this.address}));
    }
  }

  updateAllergies() {
    this.store.dispatch(updateAllergies({allergies: this.allergies}))
  }

  find() {
    this.store.dispatch(nearestTrees());
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }
}
