import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { NetService } from '../../core/net.service';
import { MatDialog, MatSnackBar } from '@angular/material';
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
  status: any;
  showLoader = true;
  showStatus = false;
  subscribers: Subscription;

  constructor(private netService: NetService, private route: ActivatedRoute, public snackBar: MatSnackBar, private usersService: UsersService,
              public dialog: MatDialog) {
    this.name = '';
    this.subscribers = new Subscription();
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
    this.netService.get('http://codeforces.com/api/user.info?handles=' + this.name).subscribe(res => {
      if (typeof res.status !== 'undefined' && res.status === 'OK') {
        this.data = res.result[0];
        this.usersService.setUser(res.result[0]);
      }
    });
  }

  getStatus() {
    this.netService.get('http://codeforces.com/api/user.status?handle=' + this.name).subscribe(res => {
      if (typeof res.status !== 'undefined' && res.status === 'OK') {
        this.status = res.result;
        this.showStatus = true;
        this.usersService.setStatus(this.status);
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

}
