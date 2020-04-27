import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { CoreService } from '../services/core.service';

@Component({
    selector: 'app-overlay',
    templateUrl: './overlay.component.html',
    styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit, OnDestroy {
    http$: Observable<boolean> = this.httpservice.httpInProcess$;
    enabled = false;
    sub: Subscription;
    constructor(public httpservice: CoreService) { }

    ngOnInit() {
      this.sub =  this.http$.subscribe((res) => this.enabled = res);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}

