import {Player, Ship, Gameboard, Coordinate} from './ship.js'
import {player2} from './main.js'

const humanGrid = document.querySelector(".human-grid");
const computerGrid = document.querySelector(".computer-grid");

function createUIGrid(grid,player) {
    let squares = [];
    for(let i = 0; i < 100; i++) {
        squares[i] = document.createElement("div");
        squares[i].setAttribute("class","grid-square");
        if(player.playertype == "Computer") {
            squares[i].addEventListener("click", function(e) {
                hitSquare(i,squares[i],player);
    
            });
        }
        if(player.playertype == "Human") {
            displayShip(i,squares[i],player)
        }
        grid.appendChild(squares[i]);
    }
}

function hitSquare(i,square,player) {
    let coord = new Coordinate(Math.floor(i/10),(i%10));
    player.gameboard.receiveAttack(coord);

    if(player.gameboard.board[Math.floor(i/10)][i%10] == -2) {
        square.style["background-color"] = "black";
    }
    else if(player.gameboard.board[Math.floor(i/10)][i%10] == -1) {
        square.style["background-color"] = "red";
    }

    if(player.playertype == "Human") {
        //make computer hit random square with hitSquare()
    }
}

function displayShip(i,square,player) {
    if(player.gameboard.board[Math.floor(i/10)][i%10] > 0) {
        square.style["background-color"] = "blue";
    }
}

export {humanGrid, computerGrid, createUIGrid}