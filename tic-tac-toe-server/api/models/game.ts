export class Game {
    board: number[][];
    startedOn: Date;

    constructor(public id: number, public humanPlayerFirst: boolean) {
        this.startedOn = new Date();
        this.board = [[0, 0, 0,], [0, 0, 0], [0, 0, 0]];
    }

}