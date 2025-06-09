import { Component, inject, model } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertDialogData } from '../../../Models/data/alert-dialog-data';

@Component({
  selector: 'app-alert-dialog',
  standalone: false,
  templateUrl: './alert-dialog.component.html',
  styleUrl: './alert-dialog.component.scss'
})
export class AlertDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AlertDialogComponent>);
  readonly data = inject<AlertDialogData>(MAT_DIALOG_DATA);

  constructor() { }

  onDialogClose() {
    this.dialogRef.close();
  }
}