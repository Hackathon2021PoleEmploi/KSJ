import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FeatureCollection } from 'geojson';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReverseGeocodingService {
  constructor(private http: HttpClient) { }

  getDomain() {
    return environment.production ? "https://api-adresse.data.gouv.fr/" : "/reversegeocodingapi/";
  }

  findNearAddress(query: string): Observable<FeatureCollection> {
    const params = {q: query.trim().replace(" ", "+")};
    return this.http.get<FeatureCollection>(`${this.getDomain()}search/`, {params});
  }
}

