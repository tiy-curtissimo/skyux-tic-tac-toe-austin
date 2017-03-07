interface CompletedGameReport {
  winnerIndex: number
}

export class Game {
  public startedOn;
  public board: number[][];
  public completed: CompletedGameReport;

  constructor(public id: number, public humanPlayerFirst: boolean) {
    this.startedOn = new Date();
    this.board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
  }
}
