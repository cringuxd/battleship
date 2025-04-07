import {createBoard} from './main.js'
import {Player, Ship, Gameboard, Coordinate} from './ship.js'

test('ship at ([1][1], [2][1], and [3][1]', () => {
    let board = createBoard();
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
    board.placeShip(coordinates1,coordinates1.length);
    board.placeShip(coordinates2,coordinates2.length);

    board.receiveAttack(coordinates2[0]);
    board.receiveAttack(coordinates2[1]);
    board.receiveAttack(coordinates2[2]);

    board.receiveAttack(coordinates1[0]);
    board.receiveAttack(coordinates1[1]);
    board.receiveAttack(coordinates1[2]);

    expect(board.noShips).toBe(true);
});