import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  private baseUrl = "https://authserver-z742wpzi3q-ue.a.run.app/api/auth/user/singUp"

  constructor(private Http: HttpClient) { }

  get (endpoint: string): Observable<any> {


   return this.Http.get(endpoint);
  }

  post (endpoint: string, body: any, requestOptions: any ): Observable<any> {
    console.log(body)
    return this.Http.post(endpoint, body,);
  }

}

