import { Component, OnInit } from '@angular/core';
import { NetService } from '../core/net.service';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {UsersService} from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  form: FormGroup;
  searchData: any;

  constructor(private netService: NetService, private fb: FormBuilder, private router: Router, private usersService: UsersService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      value: ['']
    });
  }

  onSubmit(): void {
    this.netService.get('http://codeforces.com/api/user.info?handles=' + this.form.get('value').value).subscribe(res => {
      if (typeof res.status !== 'undefined' && res.status === 'OK') {
        this.usersService.setUser(res.result[0]);
        this.router.navigate(['users/info/' + this.form.get('value').value]);
      }
    });
  }

  onReset(): void {
    this.form.reset('value');
  }
}
