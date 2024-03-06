import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoteService } from 'src/app/core/services/note.service';

@Component({
  selector: 'app-note-data',
  templateUrl: './note-data.component.html',
  styleUrls: ['./note-data.component.css'],
})
export class NoteDataComponent {
  constructor(
    private _fb: FormBuilder,
    private note: NoteService,
    private DialogRef: MatDialogRef<NoteDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  form: FormGroup = this._fb.group({
    title: [this.data ? this.data.title : '', [Validators.required]],
    content: [this.data ? this.data.content : '', [Validators.required]],
  });

  sendData() {
    console.log(this.form);
    if (this.data == null) {
      this.addNote();
    } else {
      this.updateNote();
    }
  }

  addNote() {
    this.note.addNote(this.form.value).subscribe({
      next: (res) => {
        console.log(res);
        this.DialogRef.close('add');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  updateNote() {
    console.log(this.data._id, this.form.value);

    this.note.updateNote(this.data._id, this.form.value).subscribe({
      next: (res) => {
        console.log(res);
        this.DialogRef.close('update');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
