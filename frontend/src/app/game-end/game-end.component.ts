import { Component, OnInit } from '@angular/core';
import { GameClick } from '../models/game.model';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-end',
  imports: [CommonModule],
  templateUrl: './game-end.component.html',
  styleUrl: './game-end.component.scss'
})
export class GameEndComponent implements OnInit {
  id?: any;
  pseudo: string | null = sessionStorage.getItem('pseudo');
  clicks?: any;
  classPseudo?: any;
  classTout?: any;

  constructor(private gameService: GameService, private router: Router) {}

  ngOnInit(): void {
    if (!this.pseudo) {
      this.router.navigateByUrl('/');
    } else {

      this.gameService.getId(this.pseudo).subscribe(
        (response: any) => {
          this.id = response[0].id_partie;

          this.setClassPseudo();
          this.setClassTout();
          this.setClicks(); 
        },
        (error) => console.error('getId error:', error)
      );
    }
    
  }

  setClassPseudo() {
    if (this.id) {
      this.gameService.getClassPseudo(this.id).subscribe(
        (nbClass: any) => {
            this.classPseudo = nbClass[0].rank;
        },
        (error) => {
          console.error('Error calling getClassPseudo:', error);
        }
      );
    }
  }

  setClassTout() {
    if (this.id)
      this.gameService.getClassTout(this.id).subscribe(
        (nbClass: any) => {
          this.classTout = nbClass[0].rank;
    });

  }

  setClicks() {
    if (this.id)
      this.gameService.getClicks(this.id).subscribe(
        (response: any) => {
          this.clicks = response
        });
  }

  Menu() {
    this.router.navigateByUrl('/')
  }

}
