import {Player, Ship, Gameboard, Coordinate} from './ship.js'

function createBoard() {
    //currently 10x10 empty
    let board = [];
    for(let i = 0; i < 10; i++) {
        let row = [];
        for(let j = 0; j < 10; j++) {
            row.push(0);
        }
        board.push(row);
    }
    return new Gameboard(board);
}

function createPlayer() {

}

export { createBoard }