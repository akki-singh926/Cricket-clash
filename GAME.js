let score = 0;
let ballsLeft = 10;
let totalBalls;

// Start Game Functionality
document.getElementById('start-game').addEventListener('click', function() {
    totalBalls = parseInt(document.getElementById('ball-count').value);
    ballsLeft = totalBalls;
    document.getElementById('ball-counter').textContent = ballsLeft;
    document.querySelector('.start-screen').classList.add('hidden');
    document.querySelector('.game-screen').classList.remove('hidden');
});

// Game Logic
document.querySelectorAll('.game-button').forEach(button => {
    button.addEventListener('click', function() {
        if (ballsLeft > 0) {
            const playerChoice = this.getAttribute('data-choice');
            const computerChoice = getComputerChoice();
            updateScoreAndBallCount(playerChoice, computerChoice);
        }
    });
});

function getComputerChoice() {
    const choices = ['bat', 'ball', 'stump'];
    return choices[Math.floor(Math.random() * 3)];
}

function updateScoreAndBallCount(playerChoice, computerChoice) {
    let resultmsg;

    if (playerChoice === computerChoice) {
        resultmsg = 'tie';
    } else if (
        (playerChoice === 'bat' && computerChoice === 'ball') ||
        (playerChoice === 'ball' && computerChoice === 'stump') ||
        (playerChoice === 'stump' && computerChoice === 'bat')
    ) {
        resultmsg = 'user won';
        score++;
    } else {
        resultmsg = 'computer won';
    }

    ballsLeft--;
    document.getElementById('ball-counter').textContent = ballsLeft;
    document.getElementById('score-counter').textContent = score;
    animateScoreCounter();

    if (ballsLeft === 0) {
        showGameOverPopup();
    }
}

function animateScoreCounter() {
    const scoreCounter = document.getElementById('score-counter');
    scoreCounter.classList.add('animate');
    setTimeout(() => {
        scoreCounter.classList.remove('animate');
    }, 500);
}

function showGameOverPopup() {
    const finalScore = document.getElementById('final-score');
    finalScore.textContent = score;

    const gameResult = document.getElementById('game-result');
    if (score >= Math.floor(totalBalls / 2)) {
        gameResult.textContent = 'You Won!';
    } else if (score < Math.floor(totalBalls / 2) && score > 0) {
        gameResult.textContent = 'You Lost!';
    } else {
        gameResult.textContent = 'It\'s a tie! No winner!';
    }
    

    document.getElementById('game-over-popup').classList.add('show');
}

// Restart Game
document.getElementById('play-again').addEventListener('click', function() {
    score = 0;
    ballsLeft = totalBalls;
    document.querySelector('.game-screen').classList.add('hidden');
    document.querySelector('.start-screen').classList.remove('hidden');
    document.getElementById('game-over-popup').classList.remove('show');
});
