let currentPlayer = "player";
let clickedCells = new Set();
let playerWins = parseInt(localStorage.getItem("playerWin")) || 0;
let botWins = parseInt(localStorage.getItem("botWin")) || 0;

function getArraysFromStorage() {
    let arrayPlayerString = localStorage.getItem("playerBoard");
    let arrayBotString = localStorage.getItem("botBoard");

    playerField = JSON.parse(arrayPlayerString);
    botField = JSON.parse(arrayBotString);
    
    localStorage.removeItem("playerBoard");
    localStorage.removeItem("botBoard");

    setTimeout(function () {
        renderPlayerField();
        renderBotField();
    }, 0);
}

function playerShoot(row, col) {
    if (clickedCells.has(`${row}-${col}`)) {
        return;
    }
    clickedCells.add(`${row}-${col}`);
    if (botField[row][col].schiffAufFeld) {
        botField[row][col].feldGetroffen = true;
        let cell = document.getElementById("botFieldTbl").rows[row].cells[col];
        cell.className = "hit";
        botField[row][col].schiffAufFeld = false;
        checkWinCondition();

        let ship = botField[row][col].gesetztesSchiff;
        if (ship) {
            checkShipSunk(botField, ship);
        }
    } else {
        botField[row][col].feldGetroffen = true;
        let cell = document.getElementById("botFieldTbl").rows[row].cells[col];
        cell.className = "miss";
    }

    currentPlayer = 'bot';
    botShoot();
}

function botShoot() {
    let availableCells = [];

    for (let i = 0; i < playerField.length; i++) {
        for (let j = 0; j < playerField[i].length; j++) {
            if (!playerField[i][j].feldGetroffen) {
                availableCells.push({ row: i, col: j });
            }
        }
    }

    if (availableCells.length === 0) {
        checkWinCondition();
        return;
    }

    let randomIndex = Math.floor(Math.random() * availableCells.length);
    let selectedCell = availableCells[randomIndex];

    let row = selectedCell.row;
    let col = selectedCell.col;

    if (playerField[row][col].schiffAufFeld) {
        playerField[row][col].feldGetroffen = true;
        let cell = document.getElementById("playerFieldTbl").rows[row].cells[col];
        cell.className = "hit";
        playerField[row][col].schiffAufFeld = false;
        checkWinCondition();
    } else {
        playerField[row][col].feldGetroffen = true;
        let cell = document.getElementById("playerFieldTbl").rows[row].cells[col];
        cell.className = "miss";
    }

    currentPlayer = 'player';
}

function checkShipSunk(field, ship) {
    let shipSunk = true;
    
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[i].length; j++) {
            if (field[i][j].gesetztesSchiff === ship && !field[i][j].feldGetroffen) {
                shipSunk = false;
                break;
            }
        }
        if (!shipSunk) {
            break;
        }
    }

    if (shipSunk) {
        alert("Das Schiff wurde versenkt!");
    }
}

function checkWinCondition() {
    let playerShipsRemaining = 0;
    let botShipsRemaining = 0;

    for (let i = 0; i < playerField.length; i++) {
        for (let j = 0; j < playerField[i].length; j++) {
            if (playerField[i][j].schiffAufFeld) {
                playerShipsRemaining++;
            }
        }
    }

    for (let i = 0; i < botField.length; i++) {
        for (let j = 0; j < botField[i].length; j++) {
            if (botField[i][j].schiffAufFeld) {
                botShipsRemaining++;
            }
        }
    }

    if (playerShipsRemaining === 0) {
        botWin();
    } else if (botShipsRemaining === 0) {
        playerWin();
    }
}

function playerWin() {
    playerWins++;
    localStorage.setItem("playerWin", playerWins);
    fillWinModal();
    winModal.style.display = "block";
}

function botWin() {
    botWins++;
    localStorage.setItem("botWin", botWins);
    fillWinModal();
    winModal.style.display = "block";
}

function restartGame() {
    window.location.href = "./Placement.html";
}

