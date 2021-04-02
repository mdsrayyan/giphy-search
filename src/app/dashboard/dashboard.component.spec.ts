import {ComponentFixture, TestBed} from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import {HttpClientModule} from '@angular/common/http';
import {GiphyApiService} from '../core/services/giphy-api.service';
import {of, Subscription, throwError} from 'rxjs';
import {ScrollingModule} from '@angular/cdk/scrolling';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [HttpClientModule, ScrollingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* Unit tests */

  it('search() should correctly update the pagination and images fields and correctly reset the scroll', () => {
    const spyApiGet = spyOn(TestBed.get(GiphyApiService), 'get').and.returnValue(of({}));
    const spyScrollToIndex = spyOn(component.virtualScroll, 'scrollToIndex');
    const query = 'this is my query';
    component.query = query;
    component.pagination = {
      total_count: 300,
      count: 30,
      offset: 0
    };
    component.images = [];

    component.search();

    expect(spyApiGet).toHaveBeenCalledWith(query);
    expect(spyScrollToIndex).toHaveBeenCalledTimes(1);
    expect(component.pagination).toEqual(component.pagination);
    expect(component.images).toEqual(component.images);
  });

  it('search() should flag the error field when the http request fails', () => {
    spyOn(TestBed.inject(GiphyApiService), 'get').and.returnValue(throwError('something wrong happened'));
    component.error = false;

    component.search();

    expect(component.error).toBe(true);
  });

  it('when destroyed, it should safely unsubscribe the subscription (if any)', () => {
    component.ngOnDestroy();

    component.onScrollIndexChangedSubscription = new Subscription();
    const unsubscribeSpy = spyOn(component.onScrollIndexChangedSubscription, 'unsubscribe');
    component.resetScrollSubscription();

    expect(unsubscribeSpy).toHaveBeenCalledTimes(1);
  });

  it('reset the scroll subscription when called for method', () => {
    component.ngOnDestroy();

    component.queryModelChangedSubscription = new Subscription();
    const unsubscribeSpy = spyOn(component.queryModelChangedSubscription, 'unsubscribe');
    component.ngOnDestroy();

    expect(unsubscribeSpy).toHaveBeenCalledTimes(1);
  });

  it('Should call load more when threshold limit reaches', () => {
    const spyApiGet = spyOn(TestBed.get(GiphyApiService), 'get').and.returnValue(of( {
      data: [],
      pagination: {},
      meta: {}
    }));
    component.pagination = {
      total_count: 3000,
      count: 500,
      offset: 3
    };
    component.query = 'sample query';
    const scrollIndex = 500;
    component.images = Array(50);
    component.images.length = 50;
    component.onScrollIndexChanged(scrollIndex);
    expect(spyApiGet).toHaveBeenCalledWith('sample query', 50);
  });
});
