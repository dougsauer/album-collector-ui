/*  Copyright 2020 by Douglas Sauer | Blue Heart Software. */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularMaterialModule} from '../angular-material.module';
import {AlbumListComponent} from './album-list/album-list.component';
import {AlbumTableComponent} from './album-table/album-table.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AlbumListComponent,
    AlbumTableComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    HttpClientModule
  ]
})
export class AlbumsModule {
}
