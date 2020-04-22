import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { CardMovie } from 'src/app/models/cardMovie';

@Component({
  selector: 'app-card-movie',
  templateUrl: './card-movie.component.html',
  styleUrls: ['./card-movie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardMovieComponent implements OnInit {

  constructor() { }

   @Input()
   public card: CardMovie;

   @Output()
   public selectedCard = new EventEmitter<string>();

  ngOnInit(): void {
  }

  onSelect(id: string) {
    this.selectedCard.emit(id);
  }
}
