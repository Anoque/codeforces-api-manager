import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import {NetResponse, NetService} from '../../core/net.service';
import {MatDialog, MatSnackBar, MatTabChangeEvent, PageEvent} from '@angular/material';
import { Chart } from 'chart.js';
import { UsersService } from '../users.service';
import { UserStatisticsComponent } from '../user-statistics/user-statistics.component';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  name: string;
  data: any;
  status: any[];
  rating: any[];
  blog: any[];
  showLoader = true;
  showStatus = false;
  showContests = false;
  showBlog = false;
  subscribers: Subscription;
  pageEvent: PageEvent;
  statusPage: any[];
  itemsLength = 12;
  displayedStatusColumns: any[];

  constructor(private netService: NetService, private route: ActivatedRoute, public snackBar: MatSnackBar, public usersService: UsersService,
              public dialog: MatDialog) {
    this.name = '';
    this.subscribers = new Subscription();
    this.status = [];
    this.statusPage = [];
    this.rating = [];
    this.blog = [];
    this.displayedStatusColumns = ['id', 'name', 'index', 'language', 'attempts', 'verdict', 'tags'];
  }

  ngOnInit() {
    this.subscribers.add(this.route.params.subscribe((params: Params) => {
      this.name = params['name'];

      if (this.usersService.getUser() != null && this.usersService.getUser()['handle'] === this.name) {
        this.data = this.usersService.getUser();
      } else {
        this.getUserInfo();
      }

      this.showLoader = false;
    }));
  }

  getUserInfo(): void {
    this.netService.get('http://codeforces.com/api/user.info?handles=' + this.name).subscribe((res: NetResponse) => {

      if (res.isSuccess()) {
        this.data = res.getResponse()[0];
        this.usersService.setUser(this.data);
      }
    });
  }

  getStatus() {
    this.netService.get('http://codeforces.com/api/user.status?handle=' + this.name).subscribe((res: NetResponse) => {
      if (res.isSuccess()) {
        this.showStatus = true;
        this.usersService.setStatus(res.getResponse());
        this.status = this.usersService.getStatus();
        this.packRatingData();
        if (this.status.length <= this.itemsLength) {
          this.statusPage = this.status;
        } else {
          this.statusPage = this.status.slice(0, this.itemsLength);
        }
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }

  openDialog(type: string, width: number = 460): void {
    const dialogRef = this.dialog.open(UserStatisticsComponent, {
      data: { type: type },
      width : width + 'px'
    });

    /*
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
    */
  }

  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    if (tabChangeEvent.index === 2) {
      this.netService.get('http://codeforces.com/api/user.rating?handle=' + this.name).subscribe((res: NetResponse) => {
        // console.log(res);
        if (res.isSuccess() && this.rating.length === 0) {
          this.rating = res.getResponse();
          this.showContests = true;

          if (this.rating.length > 0) {
            for (let i = 0; i < this.rating.length; i++) {
              this.rating[i].title = this.rating[i].contestName.replace(/(<br>|<\/br>)/g, '');
            }
          }
        }
      });
    } else if (tabChangeEvent.index === 3) {
      this.netService.get('http://codeforces.com/api/user.blogEntries?handle=' + this.name).subscribe((res: NetResponse) => {
        // console.log(res);
        if (res.isSuccess() && this.blog.length === 0) {
          this.blog = res.getResponse();
          this.showBlog = true;

          if (this.blog.length > 0) {
            for (let i = 0; i < this.blog.length; i++) {
              this.blog[i].title = this.blog[i].title.replace(/(<p>|<\/p>|<br>|<\/br>)/g, '');
            }
          }
        }
      });
    }
  }

  setPage(event) {
    const start = event.pageIndex * this.itemsLength;
    const end = (start + this.itemsLength < this.status.length) ? start + this.itemsLength : (this.status.length + 1);
    this.statusPage = this.status.slice(start, end);
  }

  packRatingData() {
    const temp = [];
    this.status.forEach(value => {
      const id = temp.map((id) => { return id.problem.contestId; }).indexOf(value.problem.contestId);
      if (id !== -1) {
        if (temp[id]['problem']['index'] === value.problem.index) {
          temp[id]['decided'] = (value.verdict === 'OK');
          temp[id]['attempts'].push(value);
        }
      } else {
        value['decided'] = (value.verdict === 'OK');
        value['attempts'] = [];
        temp.push(value);
      }
    });
    this.status = temp;
  }

  getClientWidth(): number {
    return document.documentElement.offsetWidth / (document.documentElement.offsetWidth / document.documentElement.offsetHeight) - 200;
  }
}
