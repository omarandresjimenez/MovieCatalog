import { Component, OnInit } from '@angular/core';
import { MovieCatalogService } from '../../services/movie.catalog.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  rating = '1+';
  constructor(private service: MovieCatalogService) { }

  ngOnInit(): void {
  }

  onSearch(value: string) {
    this.service.searchMovies(value.trim());
  }

  filerByRating(val) {
    this.rating = val.toString() + '+';
    this.service.setRatingFilter(val);
  }
}
