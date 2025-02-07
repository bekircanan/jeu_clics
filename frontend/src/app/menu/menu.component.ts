import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  private pseudo?: string;

  constructor(private router: Router) {
    this.pseudo = sessionStorage.getItem('pseudo') || undefined;
  }

  getPseudo() {
    return this.pseudo;
  }

  PlayGame() {
    if (!this.pseudo) {
      this.setPseudo();
    } else {
      this.router.navigateByUrl('/game');
    }
  }

  SeeScores() {
    if (!this.pseudo) {
      this.setPseudo();
    } else {
      this.router.navigateByUrl('/scores');
    }
  }

  logout() {
    sessionStorage.clear();
    this.pseudo = undefined;
  }

  private setPseudo() {
    const enterPseudo = prompt('Enter your pseudo');
    if(enterPseudo) {
      this.pseudo = enterPseudo;
      sessionStorage.setItem('pseudo', this.pseudo);
    }else {
      this.router.navigateByUrl('/');
    }
  }
}
