/*  Copyright 2020 by Douglas Sauer | Blue Heart Software. */
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutModule} from '@angular/cdk/layout';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AngularMaterialModule} from './angular-material.module';
import {MainNavComponent} from './main-nav/main-nav.component';
import {AlbumsModule} from './albums/albums.module';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    AlbumsModule,
    AppRoutingModule,
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
