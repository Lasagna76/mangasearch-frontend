import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaCard } from './manga-card';

describe('MangaCard', () => {
  let component: MangaCard;
  let fixture: ComponentFixture<MangaCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangaCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MangaCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
