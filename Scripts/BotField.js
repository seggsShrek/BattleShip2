let botField = [];

document.addEventListener('DOMContentLoaded', function () {
    createBotField();
}, false);

function createBotField() {
    for (let row = 0; row < fieldSize; row++) {
        botField[row] = [];
        for (let col = 0; col < fieldSize; col++) {
            botField[row][col] = new Spielfeld();
        }
    }

    for (const ship of ships) {
        let shipPlaced = false;
        while (!shipPlaced) {
            const randomRow = Math.floor(Math.random() * fieldSize);
            const randomCol = Math.floor(Math.random() * fieldSize);
            const randomOrientation = Math.random() < 0.5 ? "hor" : "ver";

            if (canPlaceShipForBot(ship, randomRow, randomCol, randomOrientation)) {
                placeShipOnBotField(ship, randomRow, randomCol, randomOrientation);
                shipPlaced = true;
            }
        }
    }
}

function canPlaceShipForBot(ship, row, col, orientation) {
    const shipLength = ship.length;
    const fieldSize = botField.length;

    if (orientation === "hor") {
        if (col + shipLength > fieldSize) {
            return false;
        }

        for (let i = col; i < col + shipLength; i++) {
            if (botField[row][i].schiffAufFeld) {
                return false;
            }
            if (isAdjacentCellOccupied(row, i)) {
                return false;
            }
        }
    } else {
        if (row + shipLength > fieldSize) {
            return false;
        }

        for (let i = row; i < row + shipLength; i++) {
            if (botField[i][col].schiffAufFeld) {
                return false;
            }
            if (isAdjacentCellOccupied(i, col)) {
                return false;
            }
        }
    }

    return true;
}

function isAdjacentCellOccupied(row, col) {
    const fieldSize = botField.length;
    const adjacentCells = [
        [row - 1, col], [row + 1, col],
        [row, col - 1], [row, col + 1],
        [row - 1, col - 1], [row - 1, col + 1],
        [row + 1, col - 1], [row + 1, col + 1]
    ];

    for (const [adjRow, adjCol] of adjacentCells) {
        if (
            adjRow >= 0 && adjRow < fieldSize &&
            adjCol >= 0 && adjCol < fieldSize &&
            botField[adjRow][adjCol].schiffAufFeld
        ) {
            return true;
        }
    }

    return false;
}


function placeShipOnBotField(ship, row, col, orientation) {
    const shipLength = ship.length;

    if (orientation === "hor") {
        for (let i = col; i < col + shipLength; i++) {
            botField[row][i].schiffAufFeld = true;
            botField[row][i].gesetztesSchiff = ship.name;
        }
    } else {
        for (let i = row; i < row + shipLength; i++) {
            botField[i][col].schiffAufFeld = true;
            botField[i][col].gesetztesSchiff = ship.name;
        }
    }
}

