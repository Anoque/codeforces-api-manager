import { Component, OnInit } from '@angular/core';
import { NetService } from '../core/net.service';
import { ContestList, DataService } from '../shared/data.service';
import { Subscription } from 'rxjs';

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

  constructor(private netService: NetService, private dataService: DataService) {
    this.displayedColumns = ['id', 'name', 'phase', 'type'];
    this.data = [];
    this.subscribers = new Subscription();
    this.dataSource = this.dataService.contestList;
  }

  ngOnInit() {
    this.subscribers.add(this.dataSource.status.loaded.subscribe(value => {
      if (value) {
        this.data = this.dataSource.data;
        this.showLoader = false;
      }
    }));
    this.loadData();
  }

  loadData() {
    this.dataService.getContestList();
  }

}
