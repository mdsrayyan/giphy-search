import {Component, Input, OnInit} from '@angular/core';
import {GiphyGifObject} from '../../models/giphy.model';

@Component({
  selector: 'app-grid-image',
  templateUrl: './grid-image.component.html',
  styleUrls: ['./grid-image.component.scss']
})
export class GridImageComponent implements OnInit {
  @Input()
  image!: GiphyGifObject;
  loaded = false;
  constructor() { }

  ngOnInit(): void {
  }

}
