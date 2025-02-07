import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { CommonModule, NgStyle } from '@angular/common';
import { Gameh, GameClick } from '../models/game.model';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-game',
  imports: [
    NgStyle,
    CommonModule
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  pseudo: string | null = sessionStorage.getItem('pseudo');
  position = { top: '50%', left: '50%' };
  clickTimes: number[] = [];
  startTime: number = 0;
  clickCount: number = 0;
  maxClicks: any = 5;
  gameStarted: boolean = false;

  constructor(private configService: ConfigService ,private gameService: GameService, private router: Router) {}

  ngOnInit(): void {
    this.configService.getMaxCLick().subscribe((config) => {
      this.maxClicks = config;
    });
    this.loadRandomImage();
  }

  loadRandomImage(): void {
    this.position = {
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 80 + 10}%`
    };
  }

  onImageClick(): void {
    const now = performance.now();

    if (!this.gameStarted) {
      this.gameStarted = true;
      this.startTime = now;
    } else {
      const elapsedTime = (now - this.startTime) / 1000;
      this.clickTimes.push(elapsedTime);
      this.startTime = now;
    }

    this.clickCount++;

    if (this.clickCount > this.maxClicks) {
      this.endGame();
    } else {
      this.loadRandomImage();
    }
  }

  endGame(): void {
    const bestTime = Math.min(...this.clickTimes);
    const averageTime = this.clickTimes.reduce((sum, time) => sum + time, 0) / this.clickTimes.length;

    const game: Gameh = {
      pseudo: this.pseudo!,
      bestTime: bestTime,
      averageTime: averageTime,
      createdAt: new Date(),
      clicks: this.clickTimes.map((time, index): GameClick => ({
        clickNumber: index,
        clickTime: time
      })),
    };

    this.gameService.saveGame(game).subscribe();
    this.router.navigateByUrl('game-end');
  }

  quitGame(): void {
    if (confirm('Êtes-vous sûr de vouloir quitter le jeu ?')) {
      this.router.navigateByUrl('/')
    }
  }

}
