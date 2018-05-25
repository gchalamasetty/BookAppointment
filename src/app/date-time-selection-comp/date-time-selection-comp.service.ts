import { Headers, Http, RequestOptions, Response } from "@angular/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
@Injectable()
export class BookingConfirmationService {
    constructor(private http: HttpClient) { }

    public submitServiceInstallRequest(body) {
        let url = "myAssignment/dateTimeSelect/requestServiceInstall"
        return this.http.post(url, body);
    }
}