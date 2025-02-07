import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  constructor(private http: HttpClient) { }
  url = "https://localhost:7091/api/config/";

  getMaxCLick() {
    return this.http.get(this.url + 'clicks');
  }

  getPageSize() {
    return this.http.get(this.url + 'page');
  }
}
