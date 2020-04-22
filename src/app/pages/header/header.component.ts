import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user/services/user.service';
import { UserSession } from 'src/app/models/userSession';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public sessionUser$: Observable<UserSession>;
  // public sub: Subscription;
  constructor(public session: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.sessionUser$ = this.session.userSession$;
  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }

  onLogOut() {
    this.session.closeSession();
    this.router.navigateByUrl('');
  }

   onGoUsers() {
    this.router.navigateByUrl('container/users');
   }


}
