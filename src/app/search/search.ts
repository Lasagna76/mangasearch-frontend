import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MangaService } from '../manga-service';
import { Manga } from '../models/manga';
import { Mangasearchrequest, PageState, SearchPageRequest } from '../models/mangasearchrequest';
import { Response } from "../response/response";
import { Filter } from "../filter/filter";
import { catchError, debounceTime, EMPTY, Subject, switchMap, tap } from 'rxjs';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-search',
  templateUrl: './search.html',
  styleUrl: './search.css',
  imports: [Response, Filter, MatProgressBar]
})
export class Search {


  readonly state = signal<PageState>('idle');
  private readonly mangaService = inject(MangaService);
  private readonly destroyRef = inject(DestroyRef);

  readonly mangas = signal<Manga[]>([]);

  readonly totalPages = signal(0);

  readonly totalElements = signal(0);

  readonly currentPage = signal(0);

  private readonly PAGE_SIZE = 24;

  readonly currentFilters = signal<Mangasearchrequest | null>(null);

  private readonly pageRequest = new Subject<number>();

  readonly isLastPage = computed(() =>
    this.totalPages() > 0 && this.currentPage() >= this.totalPages() - 1
  );

  constructor() {

    this.pageRequest.pipe(

      debounceTime(300),

      tap({ next: () => this.state.set("loading") }),

      switchMap(page => {
        return this.mangaService.search(
          this.currentFilters()!,
          { page, size: this.PAGE_SIZE }
        ).pipe(
          catchError(error => {
            this.state.set("error");
            return EMPTY;
          })
        );
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: response => {
        this.mangas.set(response.content);
        this.totalElements.set(response.totalElements);
        this.currentPage.set(response.page);
        this.state.set(response.content.length === 0 ? 'empty' : 'success');
      }
    });
  }

  private loadPage(page: number): void {
    this.pageRequest.next(page);
  }

  onPageChange(page: number): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.loadPage(page);
  }

  onSearch(request: Mangasearchrequest): void {
    this.currentFilters.set(request);
    this.loadPage(0);
  }


}