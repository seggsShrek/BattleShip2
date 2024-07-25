let ruleModal = document.getElementById("ruleModal");
let ruleBtn = document.getElementById("ruleButton");
let winModal = document.getElementById("winModal");

function fillRuleModal() {       
    const modalText = `
      <h1>Spielregeln</h1>
      <h3>Spielvorbereitung</h3>
      <p>
        a. Das Spielfeld besteht aus einem quadratischen Raster, das horizontal von A bis J und vertikal von 1 bis 10
        nummeriert ist.
        b. Jeder Spieler erhält ein eigenes Spielfeld und markiert seine Schiffe auf dem Raster.
        c. Es gibt verschiedene Schiffe mit unterschiedlicher Länge: ein Schlachtschiff (5 Felder), ein Kreuzer (4
        Felder), zwei Zerstörer (je 3 Felder) und drei U-Boote (je 2 Felder).
        d. Die Schiffe müssen horizontal oder vertikal platziert werden und dürfen sich nicht überlappen oder berühren.
        Die Platzierung der Schiffe ist geheim und wird nicht dem Gegner gezeigt.
      </p>
      <h3>Spielablauf</h3>
      <p>
        a. Die Spieler nehmen abwechselnd Schüsse auf das Spielfeld des Gegners, indem sie ein Feld ansagen (z.B. "A3").
        b. Der Gegner gibt bekannt, ob der Schuss ein Treffer oder ein Fehlschuss ist, indem er "Treffer" oder "Wasser"
        sagt.
        c. Wenn ein Schiff getroffen wurde, muss der Spieler den Treffer markieren, um den Fortschritt beim Versenken
        des Schiffes zu verfolgen.
        d. Wenn alle Felder eines Schiffes getroffen wurden, gibt der Spieler bekannt, dass das Schiff versenkt wurde.
        e. Das Spiel endet, wenn ein Spieler alle Schiffe des Gegners versenkt hat.
      </p>
      <h3>Trefferregeln</h3>
      <p>
        a. Ein Treffer tritt auf, wenn ein Schuss auf ein Feld trifft, auf dem sich ein Teil eines Schiffes befindet.
        b. Ein Fehlschuss tritt auf, wenn ein Schuss auf ein Feld trifft, auf dem sich kein Teil eines Schiffes
        befindet.
        c. Ein Spieler darf das gleiche Feld nicht zweimal beschießen.
      </p>
      <h3>Gewinnbedingungen</h3>
      <p>
        a. Der Spieler, der zuerst alle Schiffe des Gegners versenkt hat, gewinnt das Spiel.
      </p>
    `;

    document.getElementById("ruleModalContent").innerHTML += modalText;
}

function fillWinModal() {
    let playerWinCount = localStorage.getItem("playerWin");
    let botWinCount = localStorage.getItem("botWin");
    let winModalContent = document.getElementById("winModalContent");

    winModalContent.innerHTML = "";

    let heading = document.createElement("h2");
    heading.textContent = "Spielstand";
    winModalContent.appendChild(heading);

    let playerScore = document.createElement("p");
    playerScore.textContent = "Spieler: " + playerWinCount;
    winModalContent.appendChild(playerScore);

    let botScore = document.createElement("p");
    botScore.textContent = "Bot: " + botWinCount;
    winModalContent.appendChild(botScore);

    let restartButton = document.createElement("button");
    restartButton.textContent = "Neustart";
    restartButton.onclick = restartGame;
    winModalContent.appendChild(restartButton);

}

ruleBtn.onclick = function () {
    ruleModal.style.display = "block";
};

window.onclick = function (event) {
    if (event.target == ruleModal) {
        ruleModal.style.display = "none";
    }
};


