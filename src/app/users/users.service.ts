import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UsersService {
  user: any;
  status: any;
  constructor() {}

  setUser(data: any): void {
    this.user = data;
  }

  getUser(): any {
    return this.user;
  }

  setStatus(data: any): void {
    this.status = data;
  }

  getStatus(): any {
    return this.status;
  }
}
