import { Component, OnInit } from '@angular/core';
import { NetService } from '../core/net.service';
import { ContestList, DataService } from '../shared/data.service';
import { Subscription } from 'rxjs';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.css']
})
export class ContestComponent implements OnInit {
  showLoader = true;
  data: any[];
  displayedColumns: string[];
  dataSource: ContestList;
  subscribers: Subscription;
  pageEvent: PageEvent;
  itemsLength = 10;

  constructor(private netService: NetService, private dataService: DataService) {
    this.displayedColumns = ['id', 'name', 'phase', 'type'];
    this.data = [];
    this.subscribers = new Subscription();
    this.dataSource = this.dataService.contestList;
  }

  ngOnInit() {
    this.subscribers.add(this.dataSource.status.loaded.subscribe(value => {
      if (value) {
        this.data = this.dataSource.data.splice(0, this.itemsLength);
        this.showLoader = false;
      }
    }));
    this.loadData();
  }

  loadData() {
    this.dataService.getContestList();
  }

  setPage(event) {
    if (event.pageSize !== this.itemsLength)
      this.itemsLength = event.pageSize;

    const start = event.pageIndex * this.itemsLength;
    const end = (start + this.itemsLength < this.dataSource.data.length) ? start + this.itemsLength : (this.dataSource.data.length + 1);
    this.data = this.dataSource.data.slice(start, end);
  }

}
