import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserLogin } from 'src/app/models/userLogin';
import { UserService } from '../user/services/user.service';
import { UserSession } from 'src/app/models/userSession';
import { Observable, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public userLogin: UserLogin = { userName: '', userPassword: '' };
  public userSession$: Observable<UserSession> = this.session.userSession$;
  public sub: Subscription;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private session: UserService,
              private toast: ToastrService) { }

  public ngOnInit(): void {
    this.sub = this.userSession$.subscribe((res: UserSession) => {
      if (res) {
        this.router.navigate([ '..', 'container' ], { relativeTo: this.route });
      }
    },
    (err) => this.toast.warning(err));
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public onSubmit(form) {
    this.session.authenticate(this.userLogin);
  }

  public logAsGuest() {
    this.router.navigate([ '..', 'container' ], { relativeTo: this.route });
  }
}
