import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NoteDataComponent } from '../note-data/note-data.component';
import { NoteService } from 'src/app/core/services/note.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  notes: any[] = [];
  value = '';

  constructor(public dialog: MatDialog, private note: NoteService) {}
  ngOnInit(): void {
    this.getNotes();
  }

  openDialog() {
    const dialogRef = this.dialog.open(NoteDataComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'add') {
        this.getNotes();
      }
    });
  }

  getNotes() {
    this.note.getNotes().subscribe({
      next: (res) => {
        this.notes = res.notes;
        console.log(this.notes);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  deleteNote(note: any) {
    console.log(note);
    this.note.deleteNote(note._id).subscribe({
      next: (res) => {
        console.log(res);
        this.getNotes();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  setData(note: any) {
    console.log('update', note);

    const dialogRef = this.dialog.open(NoteDataComponent, { data: note });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'update') {
        this.getNotes();
      }
    });
  }
}
