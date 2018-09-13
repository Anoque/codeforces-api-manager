import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UsersService {
  user: any;
  constructor(private httpClient: HttpClient) {}

  setUser(data: any) {
    this.user = data;
  }

  getUser(): any {
    return this.user;
  }
}
