import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map!: mapboxgl.Map;
  constructor(private dataService: DataStorageService) { }
  ngOnInit() {
    this.dataService.currentPosition.subscribe((value) => {
      if (value.x > 0 && value.y > 0) {
        this.map.setCenter({lat: value.x, lng: value.y})
        //this.map.addSource("trees", {})
      }
    })
  }
}
