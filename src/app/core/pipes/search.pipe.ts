import { Pipe, PipeTransform } from '@angular/core';

interface note {
  title: string;
  content: string;
}
@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(notes: note[], term: string): note[] {
    return notes?.filter((el) =>
      el.title.toLowerCase().includes(term.toLowerCase())
    );
  }
}
