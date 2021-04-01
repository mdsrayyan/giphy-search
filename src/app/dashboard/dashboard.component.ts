import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter} from 'rxjs/operators';
import {HelperService} from '../core/util/helper.service';
import {GiphyGifObject, GiphyPaginationObject, GiphySearchResult} from '../shared/models/giphy.model';
import {GiphyApiService} from '../core/services/giphy-api.service';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild(CdkVirtualScrollViewport) virtualScroll!: CdkVirtualScrollViewport;
  query: string;
  pagination!: GiphyPaginationObject;
  images!: GiphyGifObject[];
  scrollRequestThreshold = environment.app.scrollOffset;
  error = false;
  queryModelChanged: BehaviorSubject<string> = new BehaviorSubject<string>('');
  queryModelChangedSubscription!: Subscription;
  onScrollIndexChangedSubscription!: Subscription;
  loadMoreItemsSubscription!: Subscription;

  constructor(private api: GiphyApiService, private helperService: HelperService) {
    this.query = '';
  }


  ngOnInit(): void {
    this.subscribeToQueryChange();
    this.search();
  }

  /**
   * @summary Subscribes to query change and calls respective method
   * Also filter the non empty strings and distinct results to exclude unwanted search results
   */
  subscribeToQueryChange(): void {
    this.queryModelChangedSubscription = this.queryModelChanged
      .pipe(
        debounceTime(500),
        filter(this.helperService.nonEmptyPredicate),
        distinctUntilChanged()
      )
      .subscribe(newValue => {
        this.query = newValue;
        this.search();
      });
  }

  /**
   * @summary Calls API service with the searched query
   * Image data is processed here and additional subscriptions are reset
   */
  search(): void {
    this.api.get(this.query).subscribe((result: GiphySearchResult) => {
      this.pagination = result.pagination;
      this.images = result.data;
      this.error = false;
      this.virtualScroll.scrollToIndex(0);
      this.resetScrollSubscription();
      this.subscribeToScroll();
    }, () => {
      this.error = true;
    });
  }

  /**
   * @summary Subscribes to scroll change to set the context for onScrollChange method
   */
  subscribeToScroll(): void {
    this.onScrollIndexChangedSubscription = this.virtualScroll.scrolledIndexChange
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(
        this.onScrollIndexChanged.bind(this)
      );
  }

  /**
   * @summary Calculate the logic to load more data
   * @param scrollIndex - This is being set during scroll subscription from 'subscribeToScroll' method
   */
  onScrollIndexChanged(scrollIndex: number): void {
    // check whether the user has scrolled reaching the scrollRequestThreshold
    if (this.pagination && (scrollIndex >= Math.floor(this.images.length * this.scrollRequestThreshold / 100))) {
      // check if there are more items that can be requested
      if (this.pagination.total_count > this.pagination.count && this.pagination.total_count > this.pagination.offset) {
        this.loadMoreItems();
      }
    }
  }

  /**
   * @summary Calls API service to load more images
   * Also handles the error scenario when service errored out
   */
  loadMoreItems(): void {
    if (this.loadMoreItemsSubscription) {
      this.loadMoreItemsSubscription.unsubscribe();
    }

    this.loadMoreItemsSubscription = this.api.get(this.query, this.images.length).subscribe((result: GiphySearchResult) => {
      this.pagination = result.pagination;
      this.images = [...this.images, ...result.data];
      this.error = false;
    }, () => {
      this.error = true;
    });
  }

  /**
   * @summary Resets the scroll subscription when called for
   */
  resetScrollSubscription(): void {
    if (this.onScrollIndexChangedSubscription) {
      this.onScrollIndexChangedSubscription.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    if (this.queryModelChangedSubscription) {
      this.queryModelChangedSubscription.unsubscribe();
    }
  }

}
