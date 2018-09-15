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

  constructor(private netService: NetService, private route: ActivatedRoute, public snackBar: MatSnackBar, public usersService: UsersService,
              public dialog: MatDialog) {
    this.name = '';
    this.subscribers = new Subscription();
    this.status = [];
    this.statusPage = [];
    this.rating = [];
    this.blog = [];
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
      console.log(res);
      if (res.isSuccess()) {
        this.data = res.getResponse()[0];
        this.usersService.setUser(this.data);
      }
    });
  }

  getStatus() {
    this.netService.get('http://codeforces.com/api/user.status?handle=' + this.name).subscribe((res: NetResponse) => {
      if (res.isSuccess()) {
        this.status = res.getResponse();
        this.showStatus = true;
        this.usersService.setStatus(this.status);
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

  openDialog(type: string): void {
    const dialogRef = this.dialog.open(UserStatisticsComponent, {
      data: { type: type },
      width : '460px'
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

}
