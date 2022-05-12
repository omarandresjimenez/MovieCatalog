import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { MovieApiService } from '../api/movie.api';
import { CardMovie, CardMovieCast } from '../../../models/cardMovie';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MovieCatalogService {
  public movieCatalog$ = new Observable<CardMovie[]>();
  public ratingFilter$  = new Observable<number>();
  private movieCatalog = new BehaviorSubject<CardMovie[]>([]);
  private ratingFilter = new BehaviorSubject<number>(1);
  constructor(private service: MovieApiService) {
    this.movieCatalog$ = this.movieCatalog.asObservable();
    this.ratingFilter$ = this.ratingFilter.asObservable();
  }

  public searchMovies(search: string): void {
    this.service.movieSearch(search).pipe(shareReplay(1)).
        subscribe((res: CardMovie[]) => {
        this.movieCatalog.next(res);
      });
  }

  public setRatingFilter(val: number): void {
     this.ratingFilter.next(val);
  }

  public getCastMovie(id: string): Observable<CardMovieCast[]> {
    return this.service.movieCast(id);
  }

}
