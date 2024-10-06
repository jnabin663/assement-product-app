import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialogue',
  templateUrl: './confirmation-dialogue.component.html',
  styleUrls: ['./confirmation-dialogue.component.css']
})
export class ConfirmationDialogueComponent implements OnInit {
  title: string;
  message: string;

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) {
    this.title = data.title;
    this.message = data.message;
  }

  ngOnInit() {
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }

}

export class ConfirmDialogModel {

  constructor(public title: string, public message: string) {
  }
}
