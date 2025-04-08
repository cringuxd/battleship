import {Player, Ship, Gameboard, Coordinate} from './ship.js';
import {humanGrid, computerGrid, createUIGrid, displayShip,displayStartButton} from './interface.js';
import './styles.css';

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

function createPlayer(player) {
    let board = createBoard();
    return new Player(player,board);
}

const player1 = createPlayer("Human");
const player2 = createPlayer("Computer");

displayStartButton();

export {player1, player2,createBoard};

