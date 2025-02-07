import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Gameh } from '../models/game.model';

@Injectable({ providedIn: 'root' })
export class GameService {
  constructor(private http: HttpClient) { }

  url = "https://localhost:7091/api/";

  saveGame(game: Gameh) {
    return this.http.post(this.url + 'game/save', {
      id: game.id,
      pseudo: game.pseudo,
      bestTime: game.bestTime,
      averageTime: game.averageTime,
      createdAt: game.createdAt,
      clicks: game.clicks.map(click => ({
        clickNumber: click.clickNumber,
        clickTime: click.clickTime
      }))
    });
  }

  getClassPseudo(id: number) {
    let body = new FormData();
    body.append("id", id.toString());
    return this.http.post(this.url + 'game-end/pseudo', body);
  }

  getClassTout(id: number) {
    let body = new FormData();
    body.append("id", id.toString());
    return this.http.post(this.url + 'game-end/tout', body);
  }

  getClicks(id: number) {
    let body = new FormData();
    body.append("id", id.toString());
    return this.http.post(this.url + 'game-end/clicks', body);
  }

  getId(pseudo: string) {
    let body = new FormData();
    body.append("pseudo", pseudo);
    return this.http.post(this.url + 'game-end/id', body);
  }

}
