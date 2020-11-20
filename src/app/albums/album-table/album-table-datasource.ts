/*  Copyright 2020 by Douglas Sauer | Blue Heart Software. */
import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, Observable, Subject, Subscription} from 'rxjs';

import {Album} from '../shared/album.model';
import {AlbumsService} from '../shared/albums.service';
import {map} from 'rxjs/operators';

/**
 * Data source for the AlbumTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class AlbumTableDataSource extends DataSource<Album> {
  // private data!: AlbumModel[] ;
  private paginator!: MatPaginator;
  private sort!: MatSort;
  private changeSub!: Subscription;
  private totalCountUpdated = new Subject<number>();


  constructor(private albumsService: AlbumsService) {
    super();
  }


  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Album[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      // observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    this.changeSub = merge(...dataMutations).subscribe((d) => {
      this.loadAlbums();
    });

    return this.albumsService.getAlbumUpdateListener().pipe(map((data) => {
      this.totalCountUpdated.next(data.albumCount);
      return data.albums;
    }));
  }

  loadAlbums(): void {
    this.albumsService.getAlbums(this.paginator.pageSize, this.paginator.pageIndex);
  }

  getTotalCountUpdateListener(): Observable<number> {
    return this.totalCountUpdated.asObservable();
  }
  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {
    if (this.changeSub) {
      this.changeSub.unsubscribe();
    }
  }

  setPaginator(value: MatPaginator): void {
    this.paginator = value;
  }

  setSort(value: MatSort): void {
    this.sort = value;
  }


  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  // private getSortedData(data: AlbumModel[]): AlbumModel[] {
  //   console.log('AlbumTableDatasource getSortedData executing ^^^vvv');
  //   if (!this.sort.active || this.sort.direction === '') {
  //     return data;
  //   }
  //
  //   return data.sort((a, b) => {
  //     const isAsc = this.sort.direction === 'asc';
  //     switch (this.sort.active) {
  //       case 'name':
  //         return compare(a.name, b.name, isAsc);
  //       case 'id':
  //         return compare(+a.id, +b.id, isAsc);
  //       default:
  //         return 0;
  //     }
  //   });
  // }

} // end AlbumTableDataSource

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
// function compare(a: string | number, b: string | number, isAsc: boolean): number {
//   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
// }
