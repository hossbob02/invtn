import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartinterviewComponent } from './startinterview.component';

describe('StartinterviewComponent', () => {
  let component: StartinterviewComponent;
  let fixture: ComponentFixture<StartinterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartinterviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartinterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
