import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpineIndexComponent } from './spine-index.component';

describe('SpineIndexComponent', () => {
  let component: SpineIndexComponent;
  let fixture: ComponentFixture<SpineIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpineIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpineIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
