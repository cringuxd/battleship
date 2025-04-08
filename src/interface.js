import {Player, Ship, Gameboard, Coordinate} from './ship.js'
import {player1, player2,createBoard} from './main.js'

const humanGrid = document.querySelector(".human-grid");
const computerGrid = document.querySelector(".computer-grid");
const buttonDiv = document.querySelector(".button");

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
        if(square.style["background-color"] == "black" && player.playertype == "Human") {
            const computerChoice = Math.floor(Math.random()*100);
            const computerSquare = humanGrid.childNodes[computerChoice+1];
            hitSquare(computerChoice,computerSquare,player1);
        }
        else {
            square.style["background-color"] = "black";
        }
    }
    else if(player.gameboard.board[Math.floor(i/10)][i%10] == -1) {
        if(square.style["background-color"] == "red" && player.playertype == "Human") {
            const computerChoice = Math.floor(Math.random()*100);
            const computerSquare = humanGrid.childNodes[computerChoice+1];
            hitSquare(computerChoice,computerSquare,player1);
        }
        else {
            square.style["background-color"] = "red";
        }
    }
    const check = checkGameEnd(player);
    if(player.playertype == "Computer" && check == false) {
        //make computer hit random square with hitSquare()
        const computerChoice = Math.floor(Math.random()*100);
        const computerSquare = humanGrid.childNodes[computerChoice+1];
        hitSquare(computerChoice,computerSquare,player1);
    }
}

function displayShip(i,square,player) {
    if(player.gameboard.board[Math.floor(i/10)][i%10] > 0) {
        square.style["background-color"] = "blue";
    }
}

function checkGameEnd(player) {
    if(player.gameboard.noShips == true) {
        if(player.playertype == "Human") {
            console.log("Game over! Computer wins!");
        }
        else {
            console.log("Game over! You win!");
        }
        clearGameGrids();
        displayStartButton();
        player1.gameboard = createBoard();
        player2.gameboard = createBoard();
        return true;
    }
    return false;
}

function clearGameGrids() {
    while(humanGrid.firstChild) {
        humanGrid.removeChild(humanGrid.firstChild);
    }
    while(computerGrid.firstChild) {
        computerGrid.removeChild(computerGrid.firstChild);
    }
}

function displayStartButton() {
    let button = document.createElement("button");
    button.setAttribute("class","start-button");
    button.textContent = "START GAME";
    button.addEventListener("click", function(e) {
        buttonDiv.removeChild(button);
        promptShipPlacement();
    });

    buttonDiv.appendChild(button);
}

function promptShipPlacement() {
    let numShip = prompt("Enter the amount of ships you want to place (between 1 and 4): ");
    let shipLengths = [];
    let shipCoords = [];

    while(numShip < 0 && numShip >= 4) {
        numShip = prompt("Please enter a number greater than 0 and less than 5: ");
    }

    for(let i = 0; i < numShip; i++) {
        let len = prompt("Enter the length of ship number " + (i+1) + ":");
        shipLengths.push(len);
    }
    
    for(let i = 0; i < shipLengths.length; i++) {
        let ships = [];
        for(let j = 0; j < shipLengths[i]; j++) {
            let x = prompt("Enter x coordinate number " + (j+1) + " of ship number " + (i+1) +":");
            let y = prompt("Enter y coordinate number " + (j+1) + " of ship number " + (i+1) +":");
            let coord = new Coordinate(x,y);
            ships.push(coord);
        }
        shipCoords.push(ships);
        console.log(shipCoords);
    }

    placeUserShips(numShip,shipLengths,shipCoords);

    createUIGrid(humanGrid,player1);
    createUIGrid(computerGrid,player2);
}

function placeUserShips(numShip, shipLengths, shipCoords) {
    console.log(shipCoords[0]);
    for(let i = 0; i < numShip; i++) {
        player1.gameboard.placeShip(shipCoords[i],shipLengths[i]);
    }
    let coordinates2 = [
        new Coordinate(4,3),
        new Coordinate(4,4),
        new Coordinate(4,5)
    ];
    
    player2.gameboard.placeShip(coordinates2,coordinates2.length);
}


export {humanGrid, computerGrid, createUIGrid, displayShip, displayStartButton}