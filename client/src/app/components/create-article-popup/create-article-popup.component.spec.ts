import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateArticlePopupComponent } from './create-article-popup.component';

describe('CreateArticlePopupComponent', () => {
  let component: CreateArticlePopupComponent;
  let fixture: ComponentFixture<CreateArticlePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateArticlePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateArticlePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
