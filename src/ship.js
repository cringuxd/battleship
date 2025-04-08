
class Coordinate {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
}

class Ship {
    #length;
    #timesHit;
    #sunk;
    #coordinates; 
    constructor(length,coordinates) {
        this.#length = length;
        this.#timesHit = 0;
        this.#sunk = false;
        this.#coordinates = coordinates;
    }

    get length() {
        return this.#length;
    }
    get timesHit() {
        return this.#timesHit;
    }
    get sunk() {
        return this.#sunk;
    }
    get coordinates() {
        return this.#coordinates;
    }

    hit() {
        this.#timesHit++;
        this.isSunk();
    }

    isSunk() {
        if(this.#timesHit >= this.#length) {
            this.#sunk = true;
        }
    }
}

class Gameboard {
    /*
        board number flags:
        0 -> unoccupied
        any positive number -> occupied by ship
        -1 -> occupied by destroyed ship
        -2 -> missed attack
    */
    #board;
    #ships;
    #numShips;
    #noShips;
    constructor(board) {
        this.#board = board;
        this.#ships = [];
        this.#numShips = 0;
        this.#noShips = false;
    }

    get board() {
        return this.#board;
    }

    get numShips() {
        return this.#numShips;
    }

    get noShips() {
        return this.#noShips;
    }

    get ships() {
        return this.#ships;
    }

    placeShip(coordinates,length) {
        this.#ships.push(new Ship(length,coordinates));
        this.#numShips++;
        for(let i = 0; i < length; i++) {
            this.#board[coordinates[i].x][coordinates[i].y] = this.#numShips;
        }
    }

    receiveAttack(coordinate) {
        let sunkCount = 0;
        if(this.#board[coordinate.x][coordinate.y] != 0 && this.#board[coordinate.x][coordinate.y] != -1 && this.#board[coordinate.x][coordinate.y] != -2) {
            this.#ships[((this.#board[coordinate.x][coordinate.y])-1)].hit();
            this.#board[coordinate.x][coordinate.y] = -1;
        }
        else if(this.#board[coordinate.x][coordinate.y] == 0) {
            this.#board[coordinate.x][coordinate.y] = -2;
        }

        for(let i = 0; i < this.#ships.length; i++) {
            if(this.#ships[i].sunk == true) {
                sunkCount++;
            }
        }
        if(sunkCount == this.#numShips) {
            this.#noShips = true;
        }
    }
}

class Player {
    #playertype;
    #gameboard;
    constructor(playertype,board) {
        this.#playertype = playertype;
        this.#gameboard = board;
    }
    get playertype() {
        return this.#playertype;
    }

    get gameboard() {
        return this.#gameboard;
    }
    set gameboard(board) {
        this.#gameboard = board;
    }
}



export {Ship, Gameboard, Player, Coordinate};
