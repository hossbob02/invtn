import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserinterviewComponent } from './userinterview.component';

describe('UserinterviewComponent', () => {
  let component: UserinterviewComponent;
  let fixture: ComponentFixture<UserinterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserinterviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserinterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
