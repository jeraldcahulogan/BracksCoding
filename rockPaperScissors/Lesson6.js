// GETTING THE ID NEEDED FROM HTML
const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
const resetBtn = document.getElementById("resetBtn");
const scoreRecords = document.getElementById("scoreRecords");
const showDecision = document.getElementById("showDecision");
const comparing = document.getElementById("comparing");

// FOR COUNTING THE UPDATED SCORE
let score = JSON.parse(localStorage.getItem('storedScore')) || {
    lossCount: 0,
    tieCount: 0,
    winCount: 0
};


//FUNCTION FOR UPDATING THE SCORE
function updateScore() {
    if (decision === 'You Win') {
        score.winCount += 1;
    } else if (decision === 'You Lose') {
        score.lossCount += 1;
    } else if (decision === 'Tie') {
        score.tieCount += 1;
    }

    //STORING THE SCORE TO THE LOCAL STORAGE NAMED (score)
    localStorage.setItem('storedScore', JSON.stringify(score)); //CONVERTING score INTO A STRING USING JSON (BECAUSE LOCAL STORAGE ONLY ACCEPT STRING)
}

function comparingResult(mypicked) {
    comparing.innerHTML = `You <img src="image/${mypicked}-emoji.png"> <img src="image/${result}-emoji.png"> computer`;
}


//ROCK
//  RESULT FOR RANDOM CHOICE(ROCK, PAPER OR SCISSORS) & MAKING DESICSION WHETHER WIN, LOSE OR TIE
let result;
let decision;
function rockResult(mypicked) {
    let randomChoice = Math.random();
    if (randomChoice >= 0 && randomChoice < 1/3) {
        result = 'rock';
        decision = 'Tie';
    } else if (randomChoice >= 1/3 && randomChoice < 2/3) {
        result = 'paper';
        decision = 'You Lose';
    } else {
        result = 'scissors';
        decision = 'You Win';
    }
    updateScore();  //CALLING THE UPDATED SCORE OF THE PLAYER
    showDecision.textContent = `${decision}`;
    comparingResult();
    showScoreRecords();

}

//PAPER
//  RESULT FOR RANDOM CHOICE(ROCK, PAPER OR SCISSORS) & MAKING DESICSION WHETHER WIN, LOSE OR TIE
function paperResult(mypicked) {
    let randomChoice = Math.random();
    if (randomChoice >= 0 && randomChoice < 1/3) {
        result = 'rock';
        decision = 'You Win';
    } else if (randomChoice >= 1/3 && randomChoice < 2/3) {
        result = 'paper';
        decision = 'Tie';
    } else {
        result = 'scissors';
        decision = 'You Lose';
    }
    updateScore();  //CALLING THE UPDATED SCORE OF THE PLAYER
    showDecision.textContent = `${decision}`;
    comparingResult();
    showScoreRecords();

}

//SCISSORS
//  RESULT FOR RANDOM CHOICE(ROCK, PAPER OR SCISSORS) & MAKING DESICSION WHETHER WIN, LOSE OR TIE
function scissorsResult(mypicked) {
    let randomChoice = Math.random();
    if (randomChoice >= 0 && randomChoice < 1/3) {
        result = 'rock';
        decision = 'You Lose';
    } else if (randomChoice >= 1/3 && randomChoice < 2/3) {
        result = 'paper';
        decision = 'You Win';
    } else {
        result = 'scissors';
        decision = 'Tie';
    }
    updateScore();  //CALLING THE UPDATED SCORE OF THE PLAYER
    // console.log(JSON.parse(localStorage.getItem('storedScore')));
    showDecision.textContent = `${decision}`;
    comparingResult();
    showScoreRecords();
}



// ON CLICK PROCESS
let picked;

rock.onclick = function () {
    picked = 'rock';
    rockResult(picked);
    comparingResult(picked);
}

paper.onclick = function () {
    picked = 'paper';
    paperResult(picked);
    comparingResult(picked);
}

scissors.onclick = function () {
    picked = 'scissors';
    scissorsResult(picked);
    comparingResult(picked);
}

resetBtn.onclick = function () {
    localStorage.removeItem('storedScore');
    score = {
        lossCount: 0,
        tieCount: 0,
        winCount: 0
    };
    console.log(JSON.parse(localStorage.getItem('storedScore')));
    showDecision.textContent = ``;
    comparing.textContent = ``
    showScoreRecords();
};

function showScoreRecords(){
    scoreRecords.textContent = `Win: ${score.winCount} Losses: ${score.lossCount} Tie: ${score.tieCount}`;
}

showScoreRecords();














































// const rock = document.getElementById("rock");
// const paper = document.getElementById("paper");
// const scissors = document.getElementById("scissors");
// const resetBtn = document.getElementById("resetBtn");

// // Retrieve score from localStorage or set default
// let score = JSON.parse(localStorage.getItem('storedScore')) || {
//     lossCount: 0,
//     tieCount: 0,
//     winCount: 0
// };

// // Function to update the score
// function updateScore(decision) {
//     if (decision === 'Win') {
//         score.winCount += 1;
//     } else if (decision === 'Lose') {
//         score.lossCount += 1;
//     } else if (decision === 'Tie') {
//         score.tieCount += 1;
//     }

//     localStorage.setItem('storedScore', JSON.stringify(score)); // Save updated score to localStorage
// }

// // Function to handle game result
// function playGame(mypick, winCondition) {
//     const choices = ['rock', 'paper', 'scissors'];
//     const result = choices[Math.floor(Math.random() * choices.length)];
//     let decision;

//     if (mypick === result) {
//         decision = 'Tie';
//     } else if (result === winCondition) {
//         decision = 'Win';
//     } else {
//         decision = 'Lose';
//     }

//     updateScore(decision);
//     window.alert(`You picked ${mypick}. Computer picked ${result}.\nDecision: ${decision}\n\nScore:\nWin: ${score.winCount} Losses: ${score.lossCount} Tie: ${score.tieCount}`);
// }

// // On click process
// rock.onclick = () => playGame('rock', 'scissors');
// paper.onclick = () => playGame('paper', 'rock');
// scissors.onclick = () => playGame('scissors', 'paper');

// resetBtn.onclick = function () {
//     localStorage.removeItem('storedScore');
//     score = {
//         lossCount: 0,
//         tieCount: 0,
//         winCount: 0
//     };
//     window.alert(`Score reset.\n\nScore:\nWin: ${score.winCount} Losses: ${score.lossCount} Tie: ${score.tieCount}`);
// };
