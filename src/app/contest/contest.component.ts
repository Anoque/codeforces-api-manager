import { Component, OnInit } from '@angular/core';
import {NetService} from '../core/net.service';

export interface ContestElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.css']
})
export class ContestComponent implements OnInit {
  showLoader: boolean = true;
  data: any[];
  displayedColumns: string[];

  constructor(private netService: NetService) {
    this.displayedColumns = ['id', 'name', 'phase', 'type'];
    this.data = [];
  }

  ngOnInit() {
    this.netService.get('http://codeforces.com/api/contest.list').subscribe(res => {
      if (typeof res.status !== 'undefined' && res.status === 'OK') {
        this.data = res.result;
      }
      this.showLoader = false;
      /*
      durationSeconds:7200
      frozen:false
      id:1032
      name:"Технокубок 2018 - Отборочный Раунд 3"
      phase:"BEFORE"
      relativeTimeSeconds:-5786312
      startTimeSeconds:1542557100
      type:"CF"
       */
    });
  }

}
