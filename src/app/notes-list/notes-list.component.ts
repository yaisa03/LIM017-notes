import { Component, OnInit } from '@angular/core';
import { Dialog, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {

  constructor(public dialog: Dialog) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    console.log('works');
    this.dialog.open<string>(addNote);
  }
}


@Component({
  selector: 'addNote',
  templateUrl: './addNote.html',
  styleUrls: ['./addNote.css'],
})


export class addNote {
  constructor(public dialogRef: DialogRef) {}
  uploadNote(): void {
    this.dialogRef.close()
  }
}