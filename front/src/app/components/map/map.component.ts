import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FeatureCollection } from 'geojson';
import * as mapboxgl from 'mapbox-gl';
import { Observable } from 'rxjs';
import { IUserPosition } from 'src/app/types/position';

const currentPositionAsFeatColl = (x: number, y: number): FeatureCollection => {
  return {
    type: 'FeatureCollection',
    "features": [
      { "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [x, y]
        },
        "properties": {
          "prop0": "value0"
        }
      },
    ]
  };
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map!: mapboxgl.Map;
  currentUserPosition$: Observable<IUserPosition>;
  userPosition: FeatureCollection | undefined;

  constructor(private store: Store<any>) {  // XXX TODO type
      this.currentUserPosition$ = store.select((s) => s.user.position)
    }

  ngOnInit() {
    this.currentUserPosition$.subscribe((value) => {
      if (value.lat > 0 && value.lon > 0) {
        this.map.setCenter({lat: value.lat, lng: value.lon})
        this.userPosition = currentPositionAsFeatColl(value.lat, value.lon);
      }
    })
  }
}
