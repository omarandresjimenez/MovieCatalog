import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../src/environments/environment';
import { UserService } from '../../pages/user/services/user.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: UserService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const currentUser = this.authenticationService.getCurrentUser();
        const isLoggedIn = currentUser && currentUser.userToken;
        const isApiUrl = request.url.startsWith(environment.baseUrlApiUser);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.userToken}`
                }
            });
        }

        return next.handle(request);
    }
}