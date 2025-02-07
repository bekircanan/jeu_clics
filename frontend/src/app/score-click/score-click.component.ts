import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-score-click',
  imports: [CommonModule],
  templateUrl: './score-click.component.html',
  styleUrl: './score-click.component.scss'
})
export class ScoreClickComponent {
  constructor(
    public dialogRef: MatDialogRef<ScoreClickComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { clicks: any }
  ) { }

  closeDialog() {
    this.dialogRef.close();
  }
}
