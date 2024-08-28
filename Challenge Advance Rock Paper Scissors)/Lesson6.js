const buttons = [...document.querySelectorAll("button")];
const scoreRecords = document.getElementById("scoreRecords");
const showDecision = document.getElementById("showDecision");
const comparing = document.getElementById("comparing");
const autoPickBtn = document.getElementById("autoPickBtn");

// //for generating an auto result
const autoResult = () =>{
    let myRandomChoice = Math.random();
    if (myRandomChoice >= 0 && myRandomChoice < 1/3) {
        picked = 'rock';
        winCondition = 'scissors'
    } else if (myRandomChoice >= 1/3 && myRandomChoice < 2/3) {
        picked = 'paper';
        winCondition = 'rock'
    } else {
        picked = 'scissors';
        winCondition = 'paper';
    }
    decisionMaking(picked, winCondition);  
}

// Function for generatin a computer random choice
const randomComputerChoice = () => {
    const randomComputerPick = Math.random();
    if(randomComputerPick < 1/3) {
        return 'rock';
    } else if (randomComputerPick < 2/3) {
        return 'paper';
    } else {
        return 'scissors';
    }
};

//function for generating the decision results(tie, win or lose)
const decisionMaking = (mypick, winCondition) => {
    const computerPick = randomComputerChoice();
    let decision;

    if(mypick === computerPick) {
        decision = 'Tie';
    } else if(computerPick === winCondition) {
        decision = 'You Win';
    } else {
        decision = 'You Lose';
    }
    showDecision.textContent = `${decision}`; //displaying the decision in HTML/Web Page
    comparingResult(mypick,computerPick); //passing values to comparingResult function
    updateScore(decision);
};

//Funcion for showing computer and your choice with image in HTML/Web Page
const comparingResult = (mypicked, computerPicked) => comparing.innerHTML = `You <img src="image/${mypicked}-emoji.png"> <img src="image/${computerPicked}-emoji.png"> computer`;


//updating the scores then storing it to localStorage
const updateScore = (decision) =>{
    decision === 'You Win' ? score.winCount += 1 : 
    decision === 'You Lose' ? score.lossCount += 1 : score.tieCount += 1;
    
    //STORING THE SCORE TO THE LOCAL STORAGE NAMED (score)
    localStorage.setItem('storedScore', JSON.stringify(score)); //CONVERTING score INTO A STRING USING JSON (BECAUSE LOCAL STORAGE ONLY ACCEPT STRING)

    // console.log(score.lossCount, score.tieCount, score.winCount);
    showScoreRecords(score);
}

//getting the values of localStorge and inserting to object score, if localStorage is empty set default
let score = JSON.parse(localStorage.getItem('storedScore')) || {
    lossCount: 0,
    tieCount: 0,
    winCount: 0
};

// Function for showing the Stored Scores
const showScoreRecords = () => scoreRecords.textContent = `Win: ${score.winCount} Losses: ${score.lossCount} Tie: ${score.tieCount}`;

//function for autoPlay
function autoPlayFunction(){
    let intervalID;
    let isAutoPlay = false;
    autoPlayBtn.addEventListener('click', () => {
        if (!isAutoPlay) {
            autoResult();
            intervalID = setInterval(autoResult, 1000);
            document.getElementById("autoPlayBtn").innerHTML = 'Stop Playing';
            isAutoPlay = true;
        } else {
            clearInterval(intervalID);
            document.getElementById("autoPlayBtn").innerHTML = 'Auto Play';
            isAutoPlay = false;
        }
    }

)};

//function for autoPick
function ifReset(){
    localStorage.removeItem('storedScore');
    score = {
        lossCount: 0,
        tieCount: 0,
        winCount: 0
    };
    showDecision.textContent = ``;
    comparing.textContent = ``
    showScoreRecords();
}

//for clicking the buttons
buttons.forEach(button => button.addEventListener ('click', () => {
    //for clicking the button rock, paper and scissors
    let picked;
    let winCondition;
    switch (button.id) {
        case 'rock':
            picked = 'rock';
            winCondition = 'scissors'
            break;
        case 'paper':
            picked = 'paper';
            winCondition = 'rock'
            break;
        case 'scissors':
            picked = 'scissors';
            winCondition = 'paper';
            break;
    }
    decisionMaking(picked, winCondition);    

    // for clicking the button reset
    switch(button.id){
        case 'resetBtn':
            ifReset();
            break;

        //for autopick button
        case 'autoPickBtn':
            autoResult();
            break;
        }
}));

//for keydown
document.body.addEventListener('keydown', (event) =>{
    switch (event.key){
        case 'r':
            picked = 'rock';
            winCondition = 'scissors';
            decisionMaking(picked, winCondition); 
            break;
        case 'p':
            picked = 'paper';
            winCondition = 'rock'
            decisionMaking(picked, winCondition);  
            break;
        case 's':
            picked = 'scissors';
            winCondition = 'paper';
            decisionMaking(picked, winCondition);  
            break;
        case 'Delete':
            ifReset();
            break;
        case ' ':
            if (event.ctrlKey){
                autoResult();
            }
            break;
    }
})

autoPlayFunction();
showScoreRecords();