import { Component, OnInit } from '@angular/core';
import { ReverseGeocodingService } from '../services/reverse-geocoding.service';

@Component({
  selector: 'app-reverse-geocode-address',
  templateUrl: './reverse-geocode-address.component.html',
  styleUrls: ['./reverse-geocode-address.component.css']
})
export class ReverseGeocodeAddressComponent implements OnInit {

  address: string = "";

  constructor(private reverseGeocode: ReverseGeocodingService) { }

  ngOnInit(): void {
  }

  search() {
    if (this.address.trim().length > 0) {
      this.reverseGeocode.findNearAddress(this.address).subscribe((values) => console.log(values))
    }
  }
}
