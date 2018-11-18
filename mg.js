$(window).load(function () {
    shuffle();
});

var cards = document.querySelectorAll('.memory-card');
var hasFlippedCard = false;
var lockBoard = false;
var firstCard, secondCard;
var endOfGameTally = 12;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.card === secondCard.dataset.card) {
        setTimeout(() => {
            firstCard.classList.add("match");
            secondCard.classList.add("match");
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
            resetBoard();
        }, 400);
        endOfGameTally -= 2;
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 1300);
    }
    endGameModal();
}

function resetBoard() {
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}

function shuffle() {
    cards.forEach(card => {
        var randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
}

cards.forEach(card => card.addEventListener('click', flipCard));

function endOfGame() {
    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function newGame() {
    location.reload();
}

document.getElementById("newGame").addEventListener("click", newGame);

var closeicon = document.querySelector(".close");
var modal = document.getElementById("popup1");
var arrOfMatches = document.getElementsByClassName("match");

function endGameModal() {
    if (endOfGameTally === 0) {
        modal.classList.add("show");
        modal.style.display = "block";
        document.getElementsByClassName("close").onclick = function () {
            modal.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        document.getElementById("play-again").addEventListener("click", function (e) {
            playAgain()
        });
        closeModal();
    };
}

function closeModal() {
    closeicon.addEventListener("click", function (e) {
        playAgain()
    });
}

function playAgain() {
    modal.classList.remove("show");
    newGame();
}