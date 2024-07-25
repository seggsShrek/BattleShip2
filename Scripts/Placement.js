class Spielfeld {
    constructor() {
        this.feldGetroffen = false;
        this.schiffAufFeld = false;
        this.schiffWarAufFeld = false;
        this.gesetztesSchiff = "";
    }
}

class Ship {
    constructor(name, length) {
        this.name = name;
        this.length = length;
    }
}

const fieldSize = 10;
let playerField = [];
let currOrientation = "hor";;
const ships = [
    new Ship("Schlachtschiff", 5),
    new Ship("Kreuzer1", 4),
    new Ship("Kreuzer2", 4),
    new Ship("Zerstörer1", 3),
    new Ship("Zerstörer2", 3),
    new Ship("Zerstörer3", 3),
    new Ship("U-Boot1", 2),
    new Ship("U-Boot2", 2),
    new Ship("U-Boot3", 2),
    new Ship("U-Boot4", 2)
];

document.addEventListener('DOMContentLoaded', function () {
    createPlayerField();
}, false);


function createPlayerField() {
    const table = document.getElementById('placeShipTbl');

    for (let row = 0; row < fieldSize; row++) {
        playerField[row] = [];
        const tr = document.createElement("tr");

        for (let col = 0; col < fieldSize; col++) {
            const td = document.createElement('td');
            td.classList.add('cell');
            td.dataset.row = row;
            td.dataset.col = col;
            td.addEventListener('click', placeShip);
            tr.appendChild(td);
            playerField[row][col] = new Spielfeld();
        }

        table.appendChild(tr);
    }
}

function simulateUserClicks(numClicks) {
    let clickCounter = 0;

    for (let i = 0; i < numClicks; i++) {
        const currRow = getRandomInt(fieldSize);
        const currCol = getRandomInt(fieldSize);

        simulateUserClick(currRow, currCol);
        clickCounter++;

        if (clickCounter % 2 === 0) {
            rotateShip();
        }
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function simulateUserClick(row, col) {
    const event = new MouseEvent('click', {
        view: window
    });

    const target = document.querySelector(`td[data-row="${row}"][data-col="${col}"]`);
    target.dispatchEvent(event);
}

function placeShip(event) {
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);
    const selectedShip = ships[0].name;

    if (canPlaceShip(selectedShip, row, col)) {
        const ship = getShipByName(selectedShip);
        const shipLength = ship.length;

        if (currOrientation === "hor") {
            if (col + shipLength <= fieldSize) {
                for (let i = col; i < col + shipLength; i++) {
                    playerField[row][i].schiffAufFeld = true;
                    playerField[row][i].gesetztesSchiff = selectedShip;
                }
                drawShip(row, col, shipLength, currOrientation);
            }
        } else {
            if (row + shipLength <= fieldSize) {
                for (let i = row; i < row + shipLength; i++) {
                    playerField[i][col].schiffAufFeld = true;
                    playerField[i][col].gesetztesSchiff = selectedShip;
                }
                drawShip(row, col, shipLength, currOrientation);
            }
        }

        ships.splice(0, 1);
    }
}


function canPlaceShip(shipName, row, col) {
    const ship = getShipByName(shipName);
    const shipLength = ship.length;

    const isOutOfBounds = (r, c) => r < 0 || r >= fieldSize || c < 0 || c >= fieldSize;
    const isShipPresent = (r, c) => playerField[r][c].schiffAufFeld;

    const checkAdjacentCells = (r, c) => {
        const directions = [
            [-1, 0], // oben
            [1, 0],  // unten
            [0, -1], // links
            [0, 1],  // rechts
            [-1, -1],// oben links
            [-1, 1], // oben rechts
            [1, -1], // unten links
            [1, 1]   // unten rechts
        ];

        for (const [dr, dc] of directions) {
            const newRow = r + dr;
            const newCol = c + dc;

            if (!isOutOfBounds(newRow, newCol) && isShipPresent(newRow, newCol)) {
                return true;
            }
        }

        return false;
    };

    if (currOrientation === "hor") {
        if (col + shipLength > fieldSize) {
            return false;
        }

        for (let i = col; i < col + shipLength; i++) {
            if (isShipPresent(row, i) || checkAdjacentCells(row, i)) {
                return false;
            }
        }
    } else {
        if (row + shipLength > fieldSize) {
            return false;
        }

        for (let i = row; i < row + shipLength; i++) {
            if (isShipPresent(i, col) || checkAdjacentCells(i, col)) {
                return false;
            }
        }
    }

    return true;
}

function getShipByName(shipName) {
    return ships.find(ship => ship.name === shipName);
}

function drawShip(row, col, shipLength, orientation) {
    const table = document.getElementById('placeShipTbl');

    if (orientation === "hor") {
        for (let i = col; i < col + shipLength; i++) {
            const td = table.rows[row].cells[i];
            td.classList.add('ship');
        }
    } else {
        for (let i = row; i < row + shipLength; i++) {
            const td = table.rows[i].cells[col];
            td.classList.add('ship');
        }
    }
}

function rotateShip() {
    currOrientation = currOrientation === "hor" ? "ver" : "hor";
    if (currOrientation === "hor") {
        document.getElementById("orientation").textContent = "Ausrichtung: Horizontal";
    } else {
        document.getElementById("orientation").textContent = "Ausrichtung: Vertikal";
    }
}

function startGame() {
    let arrayPlayerString = JSON.stringify(playerField);
    let arrayBotString = JSON.stringify(botField);

    localStorage.setItem("playerBoard", arrayPlayerString);
    localStorage.setItem("botBoard", arrayBotString);

    if (ships.length == 0) {
        window.location.href = "./Game.html";
    }
}



