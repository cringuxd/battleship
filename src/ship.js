
//Contains the class for the Ship
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
    #board;
    constructor() {

    }
}

class Player {
    #playertype;
    #gameboard;
    constructor(playertype) {
        this.#playertype = playertype;
        this.#gameboard = new Gameboard();
    }
}