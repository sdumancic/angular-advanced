import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { merge, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { IOrderItemsSearchResultsUI } from '../../facade/order-items-search-results-ui.model';

@Component({
  selector: 'app-order-items-search-results',
  templateUrl: './order-items-search-results.component.html',
  styleUrls: ['./order-items-search-results.component.scss'],
})
export class OrderItemsSearchResultsComponent
  implements AfterViewInit, OnDestroy
{
  _searchResults: IOrderItemsSearchResultsUI[];

  @Input() set searchResults(value: IOrderItemsSearchResultsUI[]) {
    this._searchResults = value;
    this.dataSource = new MatTableDataSource(this._searchResults);
    this.fetchPage();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<IOrderItemsSearchResultsUI>;
  dataSource: MatTableDataSource<IOrderItemsSearchResultsUI>;

  displayedColumns = [
    'productGroupName',
    'productName',
    'amount',
    'vatAmount',
    'totalAmount',
    'actions',
  ];

  private unsubscribe$ = new Subject<void>();

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.sort.sortChange
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((val) => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(() => this.fetchPage())
      )
      .subscribe();
  }

  fetchPage() {
    const sortDirection = this.sort?.direction;
    const sortBy = this.sort?.active;

    this._searchResults.sort((a, b) => {
      return sortBy ? this.compare(a[sortBy], b[sortBy], sortDirection) : null;
    });

    if (this.paginator) {
      this.paginator.length = this._searchResults.length;
      this.dataSource.paginator = this.paginator;
    }
  }

  compare(first: any, second: any, sortDirection: string) {
    if (typeof first === 'string') {
      return sortDirection === 'asc'
        ? first.localeCompare(second)
        : -1 * first.localeCompare(second);
    } else if (typeof first === 'number') {
      return sortDirection === 'asc'
        ? first > second
          ? 1
          : -1
        : second > first
        ? 1
        : -1;
    }
  }

  onDel = (row) => {
    this._searchResults = this._searchResults.filter(
      (item) => item.id !== row.id
    );
    this.dataSource.data = this._searchResults;
  };

  // for test add one with name new
  onEdit = (row) => {
    console.log('edit ', row);
  };
}