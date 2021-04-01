import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridImageComponent } from './grid-image.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

describe('GiphyImageComponent', () => {
  let component: GridImageComponent;
  let fixture: ComponentFixture<GridImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridImageComponent ],
      imports: [MatSnackBarModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
