import { ChangeDetectionStrategy, Component, computed, inject, signal, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MangaService } from '../manga-service';
import { ReportType } from '../models/report';
import { MatProgressBar } from "@angular/material/progress-bar";
import { MatIcon } from "@angular/material/icon";
import { MatFormField, MatLabel, MatSelect, MatOption, MatHint } from "@angular/material/select";
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-report-dialog',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatDialogContent, MatProgressBar, MatIcon, MatFormField, MatLabel, MatSelect, MatOption, MatHint, MatDialogActions, MatInput, MatButton],
  templateUrl: './report-dialog.html',
  styleUrl: './report-dialog.css',
})
export class ReportDialog {

  private readonly dialogRef = inject(MatDialogRef<ReportDialog>);
  private readonly service = inject(MangaService);

  readonly reportTypes: { value: ReportType; label: string }[] = [
    { value: 'BUG', label: 'Bug' },
    { value: 'DATA', label: 'Data inconsistency' }
  ];

  readonly selectedType = signal<ReportType | null>(null);
  readonly description = signal<string>('');
  readonly state = signal<'idle' | 'loading' | 'success' | 'error'>('idle');

  private readonly MAX_LENGTH = 500;

  readonly isValid = computed(() =>
    this.selectedType() !== null &&
    this.description().trim().length >= 10 &&
    this.description().trim().length <= this.MAX_LENGTH
  );

  onSubmit(): void {
    if (!this.isValid()) return;

    this.state.set('loading');
    this.service.submit({
      type: this.selectedType()!,
      description: this.description().trim()
    }).subscribe({
      next: () => this.state.set('success'),
      error: () => this.state.set('error')
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}

