import {Component, Input, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input()
  queryModelChanged!: Subject<string>;
  @Input()
  loadedCount!: number | undefined;
  @Input()
  totalCount!: number | undefined;
  @Input()
  query!: string;
  @Input()
  error!: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
