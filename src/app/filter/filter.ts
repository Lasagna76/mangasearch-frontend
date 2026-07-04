import { Component, computed, DestroyRef, inject, input, output, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { GenreDialog } from '../genre-dialog/genre-dialog';
import { GenreDialogData, GenreDialogResult } from '../models/genreseletcion';
import { MatExpansionModule } from '@angular/material/expansion';
import { MangaService } from '../manga-service';
import { MatButton } from '@angular/material/button';
import { Mangasearchrequest, SortDirection, SortField } from '../models/mangasearchrequest';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { MatFormField, MatLabel, MatSelect, MatOption } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-filter',
  imports: [MatExpansionModule, MatButton, NgxSliderModule, MatFormField, MatLabel, MatSelect, MatOption, MatSlideToggleModule],
  templateUrl: './filter.html',
  styleUrl: './filter.css',
})
export class Filter {

  readonly loading = input<boolean>(false); 
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  mangaService = inject(MangaService);

  readonly searchRequested = output<Mangasearchrequest>();

  readonly generi = toSignal(this.mangaService.getGeneri(), { initialValue: [] });
  readonly genreSelection = signal<GenreDialogResult>({ include: [], exclude: [] });

  readonly ratingMin = signal<number>(0);
  readonly ratingMax = signal<number>(10);
  readonly sliderOptions: Options = {
    floor: 0,
    ceil: 10,
    step: 0.1,
    animate: false,
    hideLimitLabels: true
  };

  private readonly currentYear = new Date().getFullYear();
  readonly yearMin = signal<number>(1950);
  readonly yearMax = signal<number>(this.currentYear);
  readonly yearOptions: Options = {
    floor: 1950,
    ceil: this.currentYear,
    step: 1,
    animate: false,
    hideLimitLabels: true
  };

  readonly languages = [
    { code: 'ja', label: 'Japanese' },
    { code: 'zh', label: 'Chinese (Semplified)' },
    { code: 'zh-hk', label: 'Chinese (Traditional)' },
    { code: 'en', label: 'English' },
    { code: 'ko', label: 'Korean' }
  ] as const;
  readonly selectedLanguage = signal<string | null>(null);

  readonly sortFields = [
    { value: 'lastChapterDate' as SortField, label: 'Last chapter' },
    { value: 'bayesianRating' as SortField, label: 'Rating' },
    { value: 'followersCount' as SortField, label: 'Follower' },
    { value: 'annoPubblicazione' as SortField, label: 'Year' }
  ] as const;
  readonly sortField = signal<SortField>('lastChapterDate');
  readonly sortDirection = signal<SortDirection>('DESC');


  openGenreDialog(): void {
    this.dialog.open<GenreDialog, GenreDialogData, GenreDialogResult>(
      GenreDialog,
      {
        width: '640px',
        maxHeight: '80vh',
        data: {
          generi: this.generi(),
          selection: this.genreSelection()
        }
      }
    )
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        if (result) {
          this.genreSelection.set(result);
        }
      });
  }

  search(): void {

    const request: Mangasearchrequest = {
      includedGenres: this.genreSelection().include,
      excludedGenres: this.genreSelection().exclude,
      minRating: this.ratingMin() > 0 ? this.ratingMin() : undefined,
      maxRating: this.ratingMax() < 10 ? this.ratingMax() : undefined,
      minYear: this.yearMin() > 1950 ? this.yearMin() : undefined,
      maxYear: this.yearMax() < this.currentYear ? this.yearMax() : undefined,
      originalLanguage: this.selectedLanguage() ?? undefined,
      sortField: this.sortField(),
      sortDirection: this.sortDirection()
    };

    this.searchRequested.emit(request);
  }
}


