/*  Copyright 2020 by Douglas Sauer | Blue Heart Software. */
import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';

import {AlbumTableDataSource} from './album-table-datasource';
import {Album} from '../shared/album.model';
import {AlbumsService} from '../shared/albums.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-album-table',
  templateUrl: './album-table.component.html',
  styleUrls: ['./album-table.component.scss']
})
export class AlbumTableComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Album>;
  dataSource!: AlbumTableDataSource;
  totalCount = 0;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['_id', 'title'];

  private totalCountSub!: Subscription;

  constructor(private albumsService: AlbumsService) {
  }

  ngOnInit(): void {
    this.dataSource = new AlbumTableDataSource(this.albumsService);
    this.totalCountSub =
      this.dataSource
        .getTotalCountUpdateListener()
        .subscribe(totalCt => this.totalCount = totalCt);
  }

  ngAfterViewInit(): void {
    this.dataSource.setSort(this.sort);
    this.dataSource.setPaginator(this.paginator);
    this.table.dataSource = this.dataSource;
    this.dataSource.loadAlbums();
  }

  ngOnDestroy(): void {
    if (this.totalCountSub) {
      this.totalCountSub.unsubscribe();
    }
  }

}
