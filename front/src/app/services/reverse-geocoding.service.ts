import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FeatureCollection } from 'geojson';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReverseGeocodingService {
  constructor(private http: HttpClient) { }

  findNearAddress(query: string): Observable<FeatureCollection> {
    const params = {q: query.trim().replace(" ", "+")};
    return this.http.get<FeatureCollection>("https://api-adresse.data.gouv.fr/search/", {params});
  }
}

