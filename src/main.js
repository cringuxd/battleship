import {Player, Ship, Gameboard, Coordinate} from './ship.js';
import {humanGrid, computerGrid, createUIGrid} from './interface.js';
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

let coordinates1 = [
    new Coordinate(0,1),
    new Coordinate(1,1),
    new Coordinate(2,1)
];
let coordinates2 = [
    new Coordinate(4,3),
    new Coordinate(4,4),
    new Coordinate(4,5)
];

player1.gameboard.placeShip(coordinates1,coordinates1.length);
player2.gameboard.placeShip(coordinates2,coordinates2.length);

console.log(player2.gameboard.ships[0].coordinates);

createUIGrid(humanGrid,player1);
createUIGrid(computerGrid,player2);

export {player2};

