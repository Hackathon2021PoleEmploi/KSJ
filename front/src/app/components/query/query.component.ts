import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { nearestTrees, topGenres } from 'src/app/store/actions/tree.actions';
import { reverseGeocode, updateAllergies, updatePosition } from 'src/app/store/actions/user.actions';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { filter, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {

  address: string = "";

  isGeocoding$: Observable<boolean>;

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  allergies: string[] = [];
  allAllergies: string[] = [];

  @ViewChild('fruitInput')
  fruitInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto')
  matAutocomplete!: MatAutocomplete;

  constructor(private store: Store<any>) {
    this.isGeocoding$ = store.select((s) => s.user.reverseGeocoding);
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => {
        console.log(fruit);
        return fruit ? this._filter(fruit) : this.allAllergies.slice()
      }));
  }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.store.dispatch(updatePosition({userPosition: {lat: position.coords.latitude, lon: position.coords.longitude}}))
    }, (error) => console.log(error));
    this.store.select((s) => s.trees.topGenres).subscribe((values) => {
      this.allAllergies = values;
    })
    this.store.dispatch(topGenres());
  }

  search() {
    if (this.address.trim().length > 0) {
      this.store.dispatch(reverseGeocode({query: this.address}));
    }
  }

  updateAllergies() {
    this.store.dispatch(updateAllergies({allergies: this.allergies.join(",")}));
  }

  find() {
    this.store.dispatch(nearestTrees());
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.allergies.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.updateAllergies();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.allergies.indexOf(fruit);

    if (index >= 0) {
      this.allergies.splice(index, 1);
    }

    this.updateAllergies();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.allergies.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.updateAllergies();
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
console.log(filterValue)
    return this.allAllergies.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }
}
