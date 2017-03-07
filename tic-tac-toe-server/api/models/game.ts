interface CompletedGameReport {
  winnerIndex: number
}

export class Game {
  public startedOn;
  public board: number[][];
  public completed: CompletedGameReport;

  static fromState(state: Game): Game {
    let game = new Game(state.id, state.humanPlayerFirst);
    game.board = state.board;
    if (state.completed) {
      game.completed = state.completed;
    }
    game.startedOn = new Date(state.startedOn);

    return game;
  }

  constructor(public id: number, public humanPlayerFirst: boolean) {
    this.startedOn = new Date();
    this.board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    if (!humanPlayerFirst) {
      this.makeMove();
    }
  }

  play(columnIndex: number, rowIndex: number): boolean {
    if (this.board[rowIndex][columnIndex] === 0) {
      this.board[rowIndex][columnIndex] = this.humanPlayerFirst ? 1 : 2;
      this.makeMove();
      return true;
    }
    return false;
  }

  private makeMove(): void {
    let choiceMaker = (r: number, c: number, v: number) => {
      return { r, c, v };
    };
    let x = [0, 1, 2];
    let choices = x.reduce((acc, i) => acc.concat(x.map(j => choiceMaker(i, j, Math.random()))), []);
    choices.sort((a, b) => a.v < b.v ? -1 : a.v > b.v ? 1 : 0);
    for (let choice of choices) {
      if (this.board[choice.r][choice.c] === 0) {
        this.board[choice.r][choice.c] = this.humanPlayerFirst ? 2 : 1;
        break;
      }
    }
  }
}
