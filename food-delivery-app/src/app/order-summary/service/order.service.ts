import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL_Order } from 'src/app/constants/url';

@Injectable({ providedIn: 'root' })
export class OrderService {

  private apiUrl = API_URL_Order + '/order/saveOrder';

  constructor(private http: HttpClient) { }

  // Authorization header is added by AuthInterceptor
  saveOrder(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
