import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBorrowingTransactionDialogComponent } from './add-borrowing-transaction-dialog.component';

describe('AddBorrowingTransactionDialogComponent', () => {
  let component: AddBorrowingTransactionDialogComponent;
  let fixture: ComponentFixture<AddBorrowingTransactionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBorrowingTransactionDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBorrowingTransactionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
