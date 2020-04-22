import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-user-container',
  templateUrl: './user.container.component.html',
  styleUrls: ['./user.container.component.scss']
})
export class UserContainerComponent implements OnInit {
  public user: any;
  constructor() { }

  ngOnInit(): void {
  }

  onUserSelected(user: any) {
    this.user = user;
  }
}
