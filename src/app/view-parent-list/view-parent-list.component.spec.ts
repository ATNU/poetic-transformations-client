import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewParentListComponent } from './view-parent-list.component';

describe('ViewParentListComponent', () => {
  let component: ViewParentListComponent;
  let fixture: ComponentFixture<ViewParentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewParentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewParentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
