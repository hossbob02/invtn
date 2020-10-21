import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyinterviewComponent } from './myinterview.component';

describe('MyinterviewComponent', () => {
  let component: MyinterviewComponent;
  let fixture: ComponentFixture<MyinterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyinterviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyinterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
