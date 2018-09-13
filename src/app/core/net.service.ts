import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class NetService {

    constructor(private httpClient: HttpClient) {}

    public get(url: string): Observable<any> {
        // const params = new HttpParams().set('id', '3');
        // const options = {params: params};

        return this.httpClient.get(url);
    }

    public post(url: string, data: object) {
        return this.httpClient.post(url, data);
    }

}
