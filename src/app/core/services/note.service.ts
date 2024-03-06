import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  token: any;
  constructor(private _http: HttpClient) {
    if (localStorage.getItem('userToken')) {
      this.token = `3b8ny__${localStorage.getItem('userToken')}`;
      console.log(this.token);
    }
  }

  addNote(form: any): Observable<any> {
    const headers = new HttpHeaders({
      token: this.token,
    });
    const options = { headers: headers };
    return this._http.post(
      `https://note-sigma-black.vercel.app/api/v1/notes`,
      form,
      options
    );
  }

  getNotes(): Observable<any> {
    const headers = new HttpHeaders({
      token: this.token,
    });
    const options = { headers: headers };
    return this._http.get(
      `https://note-sigma-black.vercel.app/api/v1/notes`,
      options
    );
  }

  deleteNote(id: string): Observable<any> {
    const headers = new HttpHeaders({
      token: this.token,
    });
    const options = { headers: headers };
    return this._http.delete(
      `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
      options
    );
  }

  updateNote(id: string, form: any): Observable<any> {
    const headers = new HttpHeaders({
      token: this.token,
    });
    const options = { headers: headers };
    return this._http.put(
      `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
      form,
      options
    );
  }
}
