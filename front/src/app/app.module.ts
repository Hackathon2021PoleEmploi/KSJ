import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QueryComponent } from './components/query/query.component';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTooltipModule  } from '@angular/material/tooltip'
import { FormsModule } from '@angular/forms'
import { MapComponent } from './components/map/map.component'
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/reducers/user.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    QueryComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    FormsModule,
    MatIconModule,
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1IjoibWFydGluZmlsbGlhdSIsImEiOiJja29jdzdkMm8wbTFwMm5uMWdoNHhkYzN5In0.JqnjcJ3sQvguHA1tRaNA6A', // Optional, can also be set per map (accessToken input of mgl-map)
      geocoderAccessToken: 'TOKEN' // Optional, specify if different from the map access token, can also be set per mgl-geocoder (accessToken input of mgl-geocoder)
    }),
    StoreModule.forRoot({user: userReducer}),
    StoreDevtoolsModule.instrument()  // XXX TODO disable in prod
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
