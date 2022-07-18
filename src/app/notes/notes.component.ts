import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.services';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  constructor(
    private userService: UserService
    ) {  }

  ngOnInit(): void {
  }

  onclick() {
    this.userService.logout()
    .then(() => {
      console.log('User logged out')
    })
    .catch(err => console.log(err))
  }

}
