import { Component, input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { Manga } from '../models/manga';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manga-card',
  imports: [MatCardModule,MatIconModule,MatChipsModule,MatTooltipModule,CommonModule],
  templateUrl: './manga-card.html',
  styleUrl: './manga-card.css',
})
export class MangaCard {

manga = input.required<Manga>();

handleImageError(event: Event) {
  const imgElement = event.target as HTMLImageElement;
  const fallbackUrl = 'https://placehold.co/400x600/eeeeee/999999?text=NO IMAGE AVAILABLE';
  
  if (imgElement.src === fallbackUrl) {
    imgElement.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    return;
  }
  imgElement.src = fallbackUrl;
}

apriMangaDex() {
  window.open(this.manga().link, '_blank', 'noopener');
}


}
