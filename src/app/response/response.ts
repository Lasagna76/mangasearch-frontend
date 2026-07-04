import { Component, input, output } from '@angular/core';
import { Manga } from '../models/manga';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MangaCard } from '../manga-card/manga-card';
import { PageState } from '../models/mangasearchrequest';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-response',
  imports: [MatPaginator,MangaCard,MatIcon],
  templateUrl: './response.html',
  styleUrl: './response.css',
})
export class Response {

  mangas = input.required<Manga[]>();

  totalElements = input.required<number>();

  page = input.required<number>();

  pageChange = output<number>();

  readonly state = input<PageState>('idle');

  readonly isLastPage = input<boolean>(false);

  onPage(event: PageEvent): void {
    this.pageChange.emit(event.pageIndex);
  }

}
