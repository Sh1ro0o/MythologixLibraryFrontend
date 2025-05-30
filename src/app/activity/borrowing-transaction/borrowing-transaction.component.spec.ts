import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowingTransactionComponent } from './borrowing-transaction.component';

describe('BorrowingTransactionComponent', () => {
  let component: BorrowingTransactionComponent;
  let fixture: ComponentFixture<BorrowingTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BorrowingTransactionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorrowingTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
