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
    if (!this.completed && this.board[rowIndex][columnIndex] === 0) {
      this.board[rowIndex][columnIndex] = this.humanPlayerFirst ? 1 : 2;
      let winnerIndex = this.findWinnerIndex();
      if (winnerIndex) {
        this.completed = { winnerIndex: winnerIndex };
      } else {
        this.checkForFullBoard();
        this.makeMove();
        winnerIndex = this.findWinnerIndex();
        if (winnerIndex) {
          this.completed = { winnerIndex: winnerIndex };
        } else {
          this.checkForFullBoard();
        }
      }
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

  private checkForFullBoard(): void {
    let isBoardFull = !this.board
      .find(row => row.findIndex(square => square === 0) > -1);
    if (isBoardFull) {
      this.completed = { winnerIndex: 0 };
    }
  }

  private findWinnerIndex(): number {
    if (this.completed) {
      return this.completed.winnerIndex;
    }
    let b = this.board;
    if (this.isRowWinner(0)) {
      return b[0][0];
    } else if (this.isRowWinner(1)) {
      return b[1][0];
    } else if (this.isRowWinner(2)) {
      return b[2][0];
    } else if (this.isColumnWinner(0)) {
      return b[0][0];
    } else if (this.isColumnWinner(1)) {
      return b[0][1];
    } else if (this.isColumnWinner(2)) {
      return b[0][2];
    } else if (this.isRightDiagonalWinner()) {
      return b[2][0];
    } else if (this.isLeftDiagonalWinner()) {
      return b[0][0];
    }
    return 0;
  }

  private isRightDiagonalWinner(): boolean {
    let b = this.board;
    return b[2][0] !== 0 &&
           b[2][0] === b[1][1] &&
           b[2][0] === b[0][2];
  }

  private isLeftDiagonalWinner(): boolean {
    let b = this.board;
    return b[0][0] !== 0 &&
           b[0][0] === b[1][1] &&
           b[0][0] === b[2][2];
  }

  private isRowWinner(rowIndex): boolean {
    let b = this.board;
    return b[rowIndex][0] !== 0 &&
           b[rowIndex][0] === b[rowIndex][1] &&
           b[rowIndex][0] === b[rowIndex][2];
  }

  private isColumnWinner(columnIndex): boolean {
    let b = this.board;
    return b[0][columnIndex] !== 0 &&
           b[0][columnIndex] === b[1][columnIndex] &&
           b[0][columnIndex] === b[2][columnIndex];
  }
}
