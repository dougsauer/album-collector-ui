/*  Copyright 2020 by Douglas Sauer | Blue Heart Software. */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

import {environment} from '../../../environments/environment';
import {Album} from './album.model';

const BACKEND_URL = environment.apiUrl + '/albums';

@Injectable({providedIn: 'root'})
export class AlbumsService {
  private albums: Album[] = [];
  private albumsUpdated = new Subject<{ albums: Album[]; albumCount: number }>();

  constructor(private http: HttpClient, private router: Router) {
  }

  getAlbumUpdateListener(): Observable<{ albums: Album[], albumCount: number }> {
    return this.albumsUpdated.asObservable();
  }

  getAlbums(albumsPerPage: number, currentPage: number): void {
    const queryParams = `?pagesize=${albumsPerPage}&page=${currentPage + 1}`;
    this.http
      .get<{ message: string; albums: Album[]; maxAlbums: number }>(
        BACKEND_URL + queryParams
      )
      .pipe(
        map(responseData => {
          return {
            albums: responseData.albums,
            maxPosts: responseData.maxAlbums
          };
        })
      )
      .subscribe(transformedData => {
        this.albums = transformedData.albums;
        this.albumsUpdated.next({
          albums: [...this.albums],
          albumCount: transformedData.maxPosts
        });
      });
  }

}

