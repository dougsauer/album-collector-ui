/*  Copyright 2020 by Douglas Sauer | Blue Heart Software. */
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AlbumListComponent} from './albums/album-list/album-list.component';

const routes: Routes = [
  {path: '', component: AlbumListComponent},
  {path: 'list', component: AlbumListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
