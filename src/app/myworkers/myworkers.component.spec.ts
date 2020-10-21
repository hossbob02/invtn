import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyworkersComponent } from './myworkers.component';

describe('MyworkersComponent', () => {
  let component: MyworkersComponent;
  let fixture: ComponentFixture<MyworkersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyworkersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyworkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
