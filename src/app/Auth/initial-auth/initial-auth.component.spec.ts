import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialAuthComponent } from './initial-auth.component';

describe('InitialAuthComponent', () => {
  let component: InitialAuthComponent;
  let fixture: ComponentFixture<InitialAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InitialAuthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitialAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
