import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ScoreService {
  constructor(private http: HttpClient) {}
  url = "https://localhost:7091/api/";

  getScores() {
    return this.http.get(this.url + 'score/Scores');
  }

  getClicks(id: number) {
    let body = new FormData();
    body.append("id", id.toString());
    return this.http.post(this.url + 'game-end/clicks', body);
  }
}
