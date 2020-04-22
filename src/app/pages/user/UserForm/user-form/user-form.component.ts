import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/models/userLogin';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements OnInit, OnChanges {
  public newUser = true;
  public userData: UserModel = { userName: '', userPassword: '', userAdmin: false};
  constructor(private service: UserService,  private toast: ToastrService, private cdr: ChangeDetectorRef) { }

  @Input()
  public userToEdit: any = {};

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.userToEdit) {
      this.newUser = false;
      this.userData = { userName: this.userToEdit.userName, userPassword: '', userAdmin: this.userToEdit.userRole };
    }
  }

  public onSubmit() {
    if (this.newUser) {
      this.service.createUser(this.userData).subscribe((res: boolean) => {
        this.toast.success('User Created Successfuly');
        this.service.notifyNewUser();
        this.resetForm();
    },
      (err) => {
        this.toast.error('User already exist');
       });
      } else {
        this.service.updateUser(this.userData).subscribe((res: boolean) => {
          this.toast.success('User Updated Successfuly');
          this.service.notifyNewUser();
          this.resetForm();
      },
        (err) => {
          this.toast.error('User do not exist');
         });
      }
  }

  public resetForm(form?: NgForm) {
    this.newUser = true;
    this.userData = {
      userName: '',
      userPassword: '',
      userAdmin: false,
    };
    if (form != null) {
      form.form.reset();
    }
    this.cdr.markForCheck();
  }
}
