

export interface GameClick {
  clickNumber: number;
  clickTime: number;
}

export interface Gameh {
  id?: number;
  pseudo: string;
  bestTime: number;
  averageTime: number;
  createdAt: Date;
  clicks: GameClick[];
}
