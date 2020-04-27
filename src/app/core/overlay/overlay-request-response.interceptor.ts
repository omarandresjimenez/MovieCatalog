import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable, of, BehaviorSubject, throwError } from 'rxjs';
import { tap, delay, catchError } from 'rxjs/operators';
import { CoreService } from '../services/core.service';



@Injectable({
    providedIn: 'root',
  }
)
export class OverlayRequestResponseInterceptor implements HttpInterceptor {


  constructor(private coreserv: CoreService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.coreserv.callHttpRequest(true);
    return next
          .handle(req)
          .pipe(
            tap(event => {
              if (event instanceof HttpResponse) {
                this.coreserv.callHttpRequest(false);
              }
            }),
            catchError(err => {
              this.coreserv.callHttpRequest(false);
              return throwError(err);
            })
          );
  }
}
