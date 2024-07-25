function renderPlayerField() {
    let table = document.getElementById("playerFieldTbl");

    for (let i = 0; i < playerField.length; i++) {
        let row = document.createElement("tr");

        for (let j = 0; j < playerField[i].length; j++) {
            let cell = document.createElement("td");
            cell.dataset.row = i;
            cell.dataset.col = j;

            if (playerField[i][j].schiffAufFeld) {
                cell.className = "ship";
            } else if (!playerField[i][j].schiffWarAufFeld) {
                cell.className = "water";
            }

            row.appendChild(cell);
        }

        table.appendChild(row);
    }
}

function renderBotField() {
    let table = document.getElementById("botFieldTbl");

    for (let i = 0; i < botField.length; i++) {
        let row = document.createElement("tr");

        for (let j = 0; j < botField[i].length; j++) {
            let cell = document.createElement("td");
            cell.dataset.row = i;
            cell.dataset.col = j;

            if (botField[i][j].schiffAufFeld) {
                cell.className = "ship";
            } else if (!botField[i][j].schiffWarAufFeld) {
                cell.className = "water";
            }

            // Füge einen Klick-Eventlistener für den Spieler hinzu
            cell.addEventListener("click", function () {
                let row = parseInt(this.dataset.row);
                let col = parseInt(this.dataset.col);
                playerShoot(row, col);
            });

            row.appendChild(cell);
        }

        table.appendChild(row);
    }
}
