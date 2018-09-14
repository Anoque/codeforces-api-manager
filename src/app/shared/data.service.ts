import { Injectable } from '@angular/core';
import { NetService } from '../core/net.service';
import { BehaviorSubject } from 'rxjs';

export class DataStatus {
  private _initialized: BehaviorSubject<boolean>;
  get initialized(): BehaviorSubject<boolean> {
    return this._initialized;
  }

  private _loaded: BehaviorSubject<boolean>;
  get loaded(): BehaviorSubject<boolean> {
    return this._loaded;
  }

  constructor() {
    this._initialized = new BehaviorSubject(false);
    this._loaded = new BehaviorSubject(null);
  }
}

export class ContestList {
  status: DataStatus;
  data: any[];

  constructor() {
    this.status = new DataStatus();
    this.data = [];
  }
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  contestList: ContestList;

  constructor(private netService: NetService) {
    this.contestList = new ContestList();
  }

  getContestList() {
    this.netService.get('http://codeforces.com/api/contest.list').subscribe(res => {
      this.contestList.status.initialized.next(true);
      if (res.isSuccess()) {
        this.contestList.data = res.getResponse();
        this.contestList.status.loaded.next(true);
      } else {
        this.contestList.status.loaded.next(false);
      }
    });
  }
}
