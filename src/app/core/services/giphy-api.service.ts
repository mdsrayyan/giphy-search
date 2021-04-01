import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';
import {GiphySearchResult} from '../../shared/models/giphy.model';

@Injectable({
  providedIn: 'root'
})
export class GiphyApiService {
  private readonly URL = environment.url;
  private readonly params = new HttpParams().set('api_key', environment.key);

  constructor(private http: HttpClient) { }
  /**
   * @summary gets all the gifs related to the query search
   * @param query - searched string
   * @param offset - page that we are currently on
   * @param limit - no of items to be fetched per call
   * @returns the name of the merchant
   */
  get(query: string, offset: number = 0, limit: number = environment.app.requestLimit): Observable<GiphySearchResult> {
    return this.http.get<GiphySearchResult>(this.URL, {
      params: this.params.set('q', query).set('limit', `${limit}`).set('offset', `${offset}`),
    });
  }
}
