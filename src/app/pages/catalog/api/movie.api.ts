import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment.prod';
import { Observable } from 'rxjs';
import { map, toArray, tap, take } from 'rxjs/operators';
import { CardMovie, CardMovieCast } from '@app/models/cardMovie';


@Injectable({
  providedIn: 'root'
})
export class MovieApiService {
  private readonly BASEURL = environment.baseUrlApiMovie;
  private readonly MAX_RESULTS = 50;
  constructor(private http: HttpClient) { }

  public movieSearch(search: string): Observable<CardMovie[]> {
    return this.http.get<any[]>(this.BASEURL + 'search/shows?q=' + (!search ? 'a' : search))
            .pipe(map((res) => res.map((item) => {
                 const obj: CardMovie = {
                     id: item.show.id,
                     name: item.show.name,
                     image: item.show.image,
                     summary: item.show.summary,
                     rating: item.show.rating.average,
                     genres: item.show.genres,
                 };
                 return obj;
               }
             )));
  }

  public movieCast(id: string): Observable<CardMovieCast[]> {
    return this.http.get<any[]>(this.BASEURL + 'shows/' + id + '/cast')
            .pipe(map((res) => res.slice(0, this.MAX_RESULTS).map((item) => {
                 const obj: CardMovieCast = {
                     id: item.person.id,
                     name: item.person.name,
                     image: item.person.image?.medium,
                 };
                 return obj;
               }
             )));
  }

}
