import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { CardMovie, CardMovieCast } from 'src/app/models/cardMovie';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent implements OnInit {

  constructor() { }

   @Input()
   public card: CardMovie;

   @Input()
   public casts: CardMovieCast[];

   @Output()
   public backCatalog = new EventEmitter<boolean>();

   ngOnInit(): void {
   }

   onBack() {
     this.backCatalog.emit(true);
   }

}
