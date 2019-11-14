//Variables for choice icon backgrounds and text display for choices on top of page
let choiceIcons = document.getElementsByClassName('choiceIcon');
let playerChoiceIcon = document.getElementById('playerChoiceIcon');
let playerChoiceText = document.getElementById('playerSelection');
let computerChoiceIcon = document.getElementById('computerChoiceIcon');
let computerChoiceText = document.getElementById('computerSelection');

//Variables for choices in middle of page and updated scores
let playerChoices = document.getElementsByClassName('choices');
let playerScoreText = document.getElementById('playerScore');
let computerScoreText = document.getElementById('computerScore');

//Variables for bottom +1/Tie text, new game buttons, bottom text
let playerAddOneText = document.getElementById('playerAddOneText');
let computerAddOneText = document.getElementById('computerAddOneText');
let bothAddOneText = document.getElementsByClassName('addOneText');
let playAgainChoices = document.getElementsByClassName('playAgain');
let bottomText = document.getElementById('bottomText');

//Hide choiceIcons at beginning
[...choiceIcons].forEach(choiceIcon => choiceIcon.classList.remove("iconPaper", "iconScissors", "iconRock"));

//Hide playAgain choices & show playAgain choices
function hidePlayAgainChoices(){
    for(let i = 0; i < playAgainChoices.length; i++){
        playAgainChoices[i].style.visibility = 'hidden'
    }
}

function showPlayAgainChoices(){
    for(let i = 0; i < playAgainChoices.length; i++){
        playAgainChoices[i].style.visibility = 'visible';
        playAgainChoices[i].style.cursor = 'pointer';
        if (playerScore > computerScore){
            bottomText.textContent = "You won! Play again?";
        }
        else{
            bottomText.textContent = "The computer won! Try again?";
        }
    }
    for(let i = 0; i < bothAddOneText.length; i++){
        bothAddOneText[i].removeEventListener('transitionend', showPlayAgainChoices);
    }
    for(let i = 0; i < playerChoices.length; i++){
        playerChoices[i].style.visibility = 'hidden';
    }
}

//Show playerChoices
function showPlayerChoices(){
    for(let i = 0; i < playerChoices.length; i++){
        playerChoices[i].style.visibility = 'visible';
    }
}

//Make cursor for playerChoices pointer
for(let i = 0; i < playerChoices.length; i++){
    playerChoices[i].style.cursor = "pointer";
}

//Random computer selection
function computerGuess() 
{
    let computerInput = ["rock", "paper", "scissors"];
    let computerInputGuess = computerInput[Math.floor(Math.random() * computerInput.length)];
    if (computerInputGuess === "paper"){
        computerChoiceIcon.classList.add('iconPaper');
        computerChoiceText.textContent = "Paper";
        return computerInputGuess = "paper";
    }
    else if (computerInputGuess === "scissors"){
        computerChoiceIcon.classList.add('iconScissors');
        computerChoiceText.textContent = "Scissors";
        return computerInputGuess = "scissors";
    }
    else if (computerInputGuess === "rock"){
        computerChoiceIcon.classList.add('iconRock');
        computerChoiceText.textContent = "Rock";
        return computerInputGuess = "rock";
    }
}

//Clear icons on top of page
function clearIcons(){
    playerChoiceIcon.classList.remove('iconPaper', 'iconScissors', 'iconRock');
    playerChoiceText.textContent = "";
    computerChoiceIcon.classList.remove('iconPaper', 'iconScissors', 'iconRock');
    computerChoiceText.textContent = "";
}

//Compare the guesses
function compareGuesses(playerSelection, computerSelection){
    if (playerSelection === computerSelection){
        return 0;
    }
    else if 
    (
        (playerSelection === 'rock' && computerSelection === 'scissors')
                                    ||
        (playerSelection === 'paper' && computerSelection === 'rock')
                                    ||
        (playerSelection === 'scissors' && computerSelection === 'paper')
    ) {
        return 1;
    }
    else {
        return 2;
    }
}

//Update player scores
function updateScores(result){
    if(result === 1){
        playerScore ++;
        playerScoreText.textContent = playerScore;
        computerScoreText.textContent = computerScore;
        playerAddOneText.textContent = "+1";
        transform();
        for(let i = 0; i < bothAddOneText.length; i++){
            bothAddOneText[i].addEventListener('transitionend', removeText);
        }
    }
    if (result === 2)
    {
        computerScore ++;
        computerScoreText.textContent = computerScore;
        playerScoreText.textContent = playerScore;
        computerAddOneText.textContent = "+1";
        transform();
        for(let i = 0; i < bothAddOneText.length; i++){
            bothAddOneText[i].addEventListener('transitionend', removeText);
        }
    }
    if (result === 0)
    {
        computerScoreText.textContent = computerScore;
        playerScoreText.textContent = playerScore;
        sayTie();
        transform();
        for(let i = 0; i < bothAddOneText.length; i++){
            bothAddOneText[i].addEventListener('transitionend', removeText);
        }
    }
}

//Say Tie! on both addOneText
function sayTie(){
    for(let i = 0; i < bothAddOneText.length; i++){
        bothAddOneText[i].textContent = "Tie!";
    }
}

//Add scale to bothAddOneText, make player wait until animation done
function transform(){
    for(let i = 0; i < bothAddOneText.length; i++){
        bothAddOneText[i].classList.add('scale');
    }
    for(let i = 0; i < playerChoices.length; i++){
        playerChoices[i].classList.add('wait');
    }
}

function removeText(){
    for(let i = 0; i < bothAddOneText.length; i++){
        bothAddOneText[i].classList.remove('scale');
        bothAddOneText[i].textContent = "";
        bothAddOneText[i].removeEventListener('transitionend', removeText);
    }
    for(let i = 0; i < playerChoices.length; i++){
        playerChoices[i].classList.remove('wait');
    }
    clearIcons();
}
window.addEventListener('load', game);
//Start game
let playerScore = 0;
let computerScore = 0;
function game(){
    bottomText.textContent = "Please pick a choice: Rock, Paper, or Scissors";
    hidePlayAgainChoices();
    showPlayerChoices();
    for(let i = 0; i < playerChoices.length; i++){
        playerChoices[i].addEventListener('click', playerClickChoice);
    }

    function playerClickChoice(e){
        let playerSelection = e.target.id;
        if (playerSelection == 'paper') {
            playerChoiceIcon.classList.add('iconPaper');
            playerChoiceText.textContent = "Paper";
        }
        else if (playerSelection == 'scissors'){
            playerChoiceIcon.classList.add('iconScissors');
            playerChoiceText.textContent = "Scissors";
        }
        else if (playerSelection == 'rock'){
            playerChoiceIcon.classList.add('iconRock');
            playerChoiceText.textContent = "Rock";
        }
        let computerSelection = computerGuess();
        let result = compareGuesses(playerSelection, computerSelection)
        updateScores(result);
        if(playerScore == 3 || computerScore == 3){
            playerScore = 0;
            computerScore = 0;
            for(let i = 0; i < playerChoices.length; i++){
                playerChoices[i].removeEventListener('click', playerClickChoice);
            }
            for(let i = 0; i < bothAddOneText.length; i++){
                bothAddOneText[i].addEventListener('transitionend', showPlayAgainChoices);
            }
            for(let i = 0; i < playAgainChoices.length; i++){
                playAgainChoices[i].addEventListener('click', playAgainClick)
            }
            function playAgainClick(e){
                let playAgainClickChoice = e.target.id;
                if(playAgainClickChoice == "noPlayAgain"){
                    for(let i = 0; i < playAgainChoices.length; i++){
                        playAgainChoices[i].style.visibility = 'hidden';
                    }
                    bottomText.textContent = "Enjoy the scenery!";
                }
                else if (playAgainClickChoice == "yesPlayAgain"){
                    for(let i = 0; i < playAgainChoices.length; i++){
                        playAgainChoices[i].removeEventListener('click', playAgainClick);
                    }
                    playerScoreText.textContent = "";
                    computerScoreText.textContent = "";
                    game();
                }
            }
        }
    }
}
