import { Component, OnInit } from '@angular/core';
import { Gameh, GameClick } from '../models/game.model';
import { Router } from '@angular/router';
import { ScoreService } from '../services/score.service'
import { CommonModule } from '@angular/common';
import { ConfigService } from '../services/config.service'
import { MatDialog } from '@angular/material/dialog';
import { ScoreClickComponent } from '../score-click/score-click.component';

@Component({
  selector: 'app-scores',
  imports: [CommonModule],
  templateUrl: './scores.component.html',
  styleUrl: './scores.component.scss'
})
export class ScoresComponent implements OnInit {
  Gamehs: any[] = [];
  pageSize: any = 5;
  currentPage: number = 1;
  totalPages: number = 1;
  constructor(private router: Router, private ScoreService: ScoreService, private configService: ConfigService, private dialog: MatDialog) {}

  ngOnInit() {
    this.configService.getPageSize().subscribe((config) => {
      this.pageSize = config;
    });
    this.ScoreService.getScores().subscribe((Scores:any) => {
      this.Gamehs = Scores;
      this.totalPages = Math.ceil(this.Gamehs.length / this.pageSize);
    });
  }

  changePage(direction: number) {
    if (this.currentPage + direction > 0 && this.currentPage + direction <= this.totalPages) {
      this.currentPage += direction;
    }
  }

  get paginatedScores() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.Gamehs.slice(start, start + this.pageSize);
  }

  ShowClick(id: number) {
    let Clicks:any[]=[];
    this.ScoreService.getClicks(id).subscribe((clicks: any) => {
      Clicks = clicks;
      this.dialog.open(ScoreClickComponent, {
        data: { clicks: Clicks }
      });
    });
  }

  Menu() {
    this.router.navigateByUrl('/')
  }
}
