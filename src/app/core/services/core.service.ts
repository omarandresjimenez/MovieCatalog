import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CoreService {
    private httpInProcess = new BehaviorSubject<boolean>(false);
    public httpInProcess$: Observable<boolean>  = this.httpInProcess.asObservable();

    public callHttpRequest(res: boolean) {
      this.httpInProcess.next(res);
    }
}
