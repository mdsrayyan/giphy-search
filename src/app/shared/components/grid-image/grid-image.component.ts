import {Component, Input, OnInit} from '@angular/core';
import {GiphyGifObject} from '../../models/giphy.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-grid-image',
  templateUrl: './grid-image.component.html',
  styleUrls: ['./grid-image.component.scss']
})
export class GridImageComponent implements OnInit {
  @Input()
  image!: GiphyGifObject;
  loaded = false;
  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  /**
   * @summary Acknowledge message when user clicks on copy button
   */
  acknowledgeCopy(): void {
    this.snackBar.open('Link copied to clipboard', '' , {
      duration: 2000,
    });
  }

}
