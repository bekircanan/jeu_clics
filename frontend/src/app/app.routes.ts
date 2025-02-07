import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { GameComponent } from './game/game.component';
import { ScoresComponent } from './scores/scores.component';
import { ScoreComponent } from './score/score.component';
import { GameEndComponent } from './game-end/game-end.component';

export const routes: Routes = [
    { path: '', component: MenuComponent },  
  { path: 'game', component: GameComponent },
  { path: 'scores', component: ScoresComponent },
  { path: 'scores/:id', component: ScoreComponent },
  { path: 'game-end', component: GameEndComponent }
];
