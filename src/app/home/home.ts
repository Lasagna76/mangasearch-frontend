import { Component, inject, signal } from '@angular/core';
import { MangaCard } from "../manga-card/manga-card";
import { MangaService } from '../manga-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatProgressBar } from '@angular/material/progress-bar';
import { catchError, of, tap } from 'rxjs';
import { PageState } from '../models/mangasearchrequest';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-home',
  imports: [MangaCard, MatProgressBar,MatIcon,MatDivider],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  mangaService = inject(MangaService);

  readonly state = signal<PageState>('loading');

  readonly mangas = toSignal(
    this.mangaService.getLatest().pipe(
      tap({
        next: () => this.state.set('success'),
        error: () => this.state.set('error')
      }),
      catchError(() => of([]))
    ),
    { initialValue: [] }
  );
}


