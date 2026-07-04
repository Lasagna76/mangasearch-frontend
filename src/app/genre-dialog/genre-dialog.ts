import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Genere } from '../models/manga';
import { GenreDialogData, GenreDialogResult, GenreState } from '../models/genreseletcion';


@Component({
  selector: 'app-genre-dialog',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './genre-dialog.html',
  styleUrl: './genre-dialog.css',
})
export class GenreDialog implements OnInit {

  private readonly dialogRef = inject(MatDialogRef<GenreDialog>);
  readonly data = inject<GenreDialogData>(MAT_DIALOG_DATA);

  readonly generiPerCategoria = new Map<string, Genere[]>();

  private readonly stateRecord = signal<Record<number, GenreState>>({});

  readonly includeCount = computed(() =>
    Object.values(this.stateRecord()).filter(s => s === 'include').length
  );
  readonly excludeCount = computed(() =>
    Object.values(this.stateRecord()).filter(s => s === 'exclude').length
  );

  private readonly nextState: Record<GenreState, GenreState> = {
    neutral: 'include',
    include: 'exclude',
    exclude: 'neutral'
  };

  get categorieKeys(): string[] {
    return [...this.generiPerCategoria.keys()];
  }

  ngOnInit(): void {
    this.buildCategoriaMap();
    this.restoreSelection();
  }


  private buildCategoriaMap(): void {
    this.data.generi.forEach(g => {
      if (!this.generiPerCategoria.has(g.categoria)) {
        this.generiPerCategoria.set(g.categoria, []);
      }
      this.generiPerCategoria.get(g.categoria)!.push(g);
    });
  }

  private restoreSelection(): void {
    const initial: Record<number, GenreState> = {};
    this.data.generi.forEach(g => {
      initial[g.id] = this.data.selection.include.includes(g.id) ? 'include'
        : this.data.selection.exclude.includes(g.id) ? 'exclude'
          : 'neutral';
    });
    this.stateRecord.set(initial);
  }

  getState(id: number): GenreState {
    return this.stateRecord()[id] ?? 'neutral';
  }

  toggleState(id: number): void {
    this.stateRecord.update(current => ({
      ...current,
      [id]: this.nextState[current[id] ?? 'neutral']
    }));
  }

  onReset(): void {
    this.stateRecord.update(current =>
      Object.fromEntries(Object.keys(current).map(id => [id, 'neutral' as GenreState]))
    );
  }

  onApply(): void {
    this.dialogRef.close(this.buildResult());
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private buildResult(): GenreDialogResult {
    const entries = Object.entries(this.stateRecord());
    return {
      include: entries.filter(([, s]) => s === 'include').map(([id]) => Number(id)),
      exclude: entries.filter(([, s]) => s === 'exclude').map(([id]) => Number(id))
    };
  }

}
