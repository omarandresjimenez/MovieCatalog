import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MovieCatalogService } from './services/movie.catalog.service';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { CardMovie, CardMovieCast } from '@app/models/cardMovie';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogComponent implements OnInit, OnDestroy {
  public moviesCatalog$: CardMovie[];
  public casts: CardMovieCast[] = [];

  public cardInfo: CardMovie = null;
  public catalogView = true;
  private subs: Subscription[] = [];
  private set sub(sub: Subscription) { this.subs.push(sub); }

  constructor(private serviceCatalog: MovieCatalogService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.serviceCatalog.searchMovies('');
    this.sub =
    combineLatest([  this.serviceCatalog.movieCatalog$, this.serviceCatalog.ratingFilter$]).
       subscribe(([ res, filter ]: [ CardMovie[], number]) => {
        this.catalogView = true;
        this.moviesCatalog$ = [ ...res.filter((item: CardMovie) => item.rating >= filter) ];
        this.cdr.markForCheck();
      });
  }


  ngOnDestroy(): void {
    this.subs.forEach((sub: Subscription) => sub.unsubscribe());
  }

  onSelectCard(id: string) {
    this.sub = this.serviceCatalog.getCastMovie(id).subscribe((res) => {
       this.casts.length = 0;
       this.casts = res;
       this.catalogView = false;
       this.cardInfo = this.moviesCatalog$.find((card) => card.id === id);
       this.cdr.markForCheck();
      });
  }

  onBack() {
    this.catalogView = true;
    this.cardInfo = null;
    this.casts.length = 0;
  }
}
