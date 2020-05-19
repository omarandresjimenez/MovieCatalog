import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export abstract class AppHttpErrorHandler {
    router: Router;
    toast: ToastrService;
    public constructor(public routerP: Router, public toastP: ToastrService) {
        this.router = routerP;
        this.toast = toastP;
    }

    public handleError(res: HttpErrorResponse) {
    switch (true) {
      case (res.status === 401):
        sessionStorage.clear();
        this.router.navigate([ '/' ]);
        return of(null);

      case (res.status >= 500):
        this.toast.error('Unexpected server error');
        return throwError(res);

      case (!!res.error.message || !!res.message):
        this.toast.error(res.error.message || res.message);
        return throwError(res);

      default:
        return throwError(res);
    }
  }


}