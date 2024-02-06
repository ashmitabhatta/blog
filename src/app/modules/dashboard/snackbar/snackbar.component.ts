import { Component, inject } from '@angular/core';
import { MatSnackBarHorizontalPosition, MatSnackBarRef } from '@angular/material/snack-bar';
@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {
  snackBarRef = inject(MatSnackBarRef);
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
} 
