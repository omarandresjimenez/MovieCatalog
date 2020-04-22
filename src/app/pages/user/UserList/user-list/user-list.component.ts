import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { UserSession } from 'src/app/models/userSession';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit {
  public users$: Observable<[UserSession]>;

  constructor(private service: UserService,
              private toast: ToastrService,
              private cdr: ChangeDetectorRef ) { }

  @Output()
  public editUser = new EventEmitter<{}>();

  ngOnInit(): void {
    this.users$ = this.service.getUsers();
    this.service.newUserAdded$.subscribe(() => {
    this.users$ = this.service.getUsers();
    this.cdr.markForCheck();
   });
  }

  onDelete($event: MouseEvent, userName: string) {
    $event.stopPropagation();
    if (confirm('Are you sure?')) {
      this.service.deleteUser(userName).subscribe((res) => {
        this.toast.success('User removed successfuly');
        this.users$ = this.service.getUsers();
        this.cdr.markForCheck();
      });
    }
  }

  onEditUser(userName: string, userRole: boolean) {
      this.editUser.emit({userName, userRole});
  }

}
