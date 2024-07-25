function devView() {
    let table = document.getElementById("botFieldTbl");
    let shipCells = table.getElementsByClassName("ship");

    for (let i = 0; i < shipCells.length; i++) {
        shipCells[i].style.backgroundColor = "#555";
    }
}

function gameView() {
    let table = document.getElementById("botFieldTbl");
    let shipCells = table.getElementsByClassName("ship");

    for (let i = 0; i < shipCells.length; i++) {
        shipCells[i].style.backgroundColor = "lightskyblue";
    }
}

function winGame() {
    localStorage.removeItem("playerBoard");
    localStorage.removeItem("botBoard");
    playerWin();
}

function looseGame() {
    localStorage.removeItem("playerBoard");
    localStorage.removeItem("botBoard");
    botWin();
}

devMode = function () {
    devView();
}

gameMode = function () {
    gameView();
}

win = function () {
    winGame();
}

loose = function () {
    looseGame();
}