import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class NetResponse {
  constructor(private success: boolean, private response: any) { }

  isSuccess() {
    return this.success;
  }

  getResponse() {
    return  this.response;
  }

  getErrorMsg() {
    return this.response['error_msg'] || this.response;
  }
}

@Injectable()
export class NetService {
  netPackageDebug = true;

  constructor(private httpClient: HttpClient) {}

  public get(url: string): Observable<NetResponse> {
    return this.httpClient.get(url).pipe(map(response => {
      if (this.netPackageDebug) {
        console.log('response: ', response);
      }
      return this.parseResponse(response);
    }));
  }

  public post(url: string, data: object) {
    return this.httpClient.post(url, data);
  }

  private parseResponse(response: any) {
    const result: any = response['result'] || response['comment'];
    return new NetResponse((response['status'] === 'OK'), result);
  }

}
