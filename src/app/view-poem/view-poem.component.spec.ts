import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPoemComponent } from './view-poem.component';

describe('ViewPoemComponent', () => {
  let component: ViewPoemComponent;
  let fixture: ComponentFixture<ViewPoemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPoemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPoemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
