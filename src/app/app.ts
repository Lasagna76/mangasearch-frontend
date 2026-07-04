import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ReportDialog } from './report-dialog/report-dialog';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-root',
  imports: [MatButtonModule, MatToolbarModule, MatIconModule, RouterOutlet, RouterLink,MatMenuModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

 private readonly breakpointObserver = inject(BreakpointObserver);

readonly isMobile = toSignal(
  this.breakpointObserver.observe('(max-width: 819px)').pipe(
    map(result => result.matches)
  ),
  { initialValue: false }
);

  protected readonly title = signal('MangaSearch');

  private readonly dialog = inject(MatDialog);

openReportDialog(): void {
  this.dialog.open(ReportDialog, {
    width: '500px',
    maxHeight: '80vh',
    restoreFocus: false
  });
}
}
