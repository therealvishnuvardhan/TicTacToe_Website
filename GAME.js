const cards = document.getElementsByClassName("card");
const resultDiv = document.getElementById("result");
setCellsDisabled(true);

document.getElementById("startX").addEventListener("click", function() {
    xTurn = true;
    this.disabled = true;
    document.getElementById("startO").disabled = true;
    setCellsDisabled(false);
});
document.getElementById("startO").addEventListener("click", function() {
    xTurn = false;
    this.disabled = true;
    document.getElementById("startX").disabled = true;
    setCellsDisabled(false);
});

document.getElementById("startGame").addEventListener("click", function() {
    document.getElementById("container").style.display = "block";
    this.style.display = "none";
    document.getElementById("startmusic").play();


});

const pauseMusicBtn = document.getElementById("pauseMusic");
const playMusicBtn = document.getElementById("playMusic");
const startMusic = document.getElementById("startmusic");

pauseMusicBtn.addEventListener("click", function() {
    startMusic.pause();
    pauseMusicBtn.style.display = "none";
    playMusicBtn.style.display = "inline-block";
});

playMusicBtn.addEventListener("click", function() {
    startMusic.play();
    playMusicBtn.style.display = "none";
    pauseMusicBtn.style.display = "inline-block";
});

// When game starts, play music and show Pause button
document.getElementById("startGame").addEventListener("click", function() {
    document.getElementById("button-container").style.display = "block";
    this.style.display = "none";
    startMusic.play();
    pauseMusicBtn.style.display = "inline-block";
    playMusicBtn.style.display = "none";
    setCellsDisabled(false);
});

let xTurn = true;
for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", function(event) {

        if (event.target.textContent === "") {
            event.target.textContent = xTurn ? "X" : "O";
            xTurn = !xTurn;
            const winner = winningcondition();
            if (winner) {
                setTimeout(() => {
                    resultDiv.textContent = winner + " wins!";
                }, 100);
                updateScore(winner);
                setCellsDisabled(true);
               const winAudio = document.getElementById("winAudio");
                winAudio.volume = 0.25; // Set volume to 25%
                winAudio.play();
                
            }
            else{
                const isDraw = Array.from(cards).every(card => card.textContent !== "");
                if (isDraw) {
                    setTimeout(() => {
                        resultDiv.textContent = "It's a draw!";
                    }, 100);
                    updateScore("draw");
                    setCellsDisabled(true);
                    const sadAudio = document.getElementById("sadAudio");
                    sadAudio.volume = 0.25; // Set volume to 25%
                    sadAudio.play();

                }
            }
        }
    });

    const resetButton = document.getElementById("resetButton");
    resetButton.addEventListener("click", function() {
        for (let i = 0; i < cards.length; i++) {
            let btn = cards[i].querySelector("button");
            if (btn) {
                cards[i].innerHTML = `<button id="button${i + 1}"></button>`;
                cards[i].style.backgroundColor = "";
            }
        }
        xTurn = true;
        document.getElementById("startX").disabled = false;
        document.getElementById("startO").disabled = false;

        resetScores();
    });
}

function winningcondition(){

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (cards[a].textContent && cards[a].textContent === cards[b].textContent && cards[a].textContent === cards[c].textContent) {
            cards[a].style.backgroundColor = "lightgreen";
            cards[b].style.backgroundColor= "lightgreen";
            cards[c].style.backgroundColor = "lightgreen";
            return cards[a].textContent;
        }
    }

    return null;
}

function updateScore(winner) {
    const scoreX = document.getElementById("scoreX");
    const scoreO = document.getElementById("scoreO");
    const drawScore = document.getElementById("draw");
    let xScore = parseInt(scoreX.textContent) || 0;
    let oScore = parseInt(scoreO.textContent) || 0;
    let draw = parseInt(drawScore.textContent) || 0;

    if (winner === "X") {
        xScore++;
        scoreX.textContent = xScore;
    } else if (winner === "O") {
        oScore++;
        scoreO.textContent = oScore;
    } else {
        draw++;
        drawScore.textContent = draw;
    }
}

function resetScores() {
    document.getElementById("scoreX").textContent = "0";
    document.getElementById("scoreO").textContent = "0";
    document.getElementById("draw").textContent = "0";
    document.getElementById("result").textContent = "";
}

function nextRound() {
    for (let i = 0; i < cards.length; i++) {
        let btn = cards[i].querySelector("button");
        if (btn) {
            btn.textContent = "";            
 
        }
        cards[i].style.backgroundColor = "";
    }
    resultDiv.textContent = "";

    // Disable board until X/O is chosen
    xTurn = true;
    document.getElementById("startX").disabled = false;
    document.getElementById("startO").disabled = false;
    setCellsDisabled(true);
}
document.getElementById("startNewGame").addEventListener("click", nextRound);



function setCellsDisabled(disabled) {
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.pointerEvents = disabled ? "none" : "auto";
    }
}

