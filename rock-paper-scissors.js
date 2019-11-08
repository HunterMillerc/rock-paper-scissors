//Add variables for elements needed in game
var playerChoices = document.querySelectorAll('.choices');
var playerChoiceBackground = document.getElementById('playerChoiceIcon');
var descPlayerChoice = document.getElementById('playerSelection');
var computerChoiceBackground = document.getElementById('computerChoiceIcon');
var bottomText = document.getElementById('bottomText');
var descComputerChoice = document.getElementById('computerSelection');
var updatePlayerScore = document.getElementById('playerScore');
var updateComputerScore = document.getElementById('computerScore');
var playerAddOne = document.querySelector('#playerAddOneText');
var computerAddOne = document.querySelector('#computerAddOneText');
//Hides playAgain selections at start
var playAgainSelections = document.querySelectorAll('.playAgain');
function hidePlayAgainSelections()
{
    [...playAgainSelections].forEach(function(playAgainSelections)
    {
        playAgainSelections.style.visibility = 'hidden';
    });
}

//Initiate both scores to = 0
var playerScore = 0;
var computerScore = 0;

//Loops through rock, paper, scissor icons to make mouse pointer into 'pointer'
//Does same thing for playAgainSelections at end of game when playAgainSelections shown


[...playerChoices].forEach(function(playerChoiceMouseOvers)
{
    playerChoiceMouseOvers.addEventListener('mouseover', function()
    {
        playerChoiceMouseOvers.style.cursor = 'pointer';
    });
});

[...playAgainSelections].forEach(function(playAgainSelections)
{
    playAgainSelections.addEventListener('mouseover', function()
    {
        playAgainSelections.style.cursor = 'pointer';
    });
});

//Show player choices at start of game
function showPlayerChoices()
{
    playerChoices.forEach(function(playerChoices)
    {
        playerChoices.style.visibility = 'visible';
    });
}

//play Game

function playGame()
{
    playerChoiceBackground.classList.remove('iconPaper', 'iconScissors', 'iconRock');
    computerChoiceBackground.classList.remove('iconPaper', 'iconScissors', 'iconRock');
    bottomText.textContent = "Please choose an option: Rock, Paper, or Scissors";
    hidePlayAgainSelections();
    showPlayerChoices();
    playerChoices.forEach((playerChoice) =>
    {
        playerChoice.addEventListener('click', () =>
        {
            var playerGuess = playerChoice.id;
            if (playerGuess == 'paper')
            {
                playerChoiceBackground.classList.add('iconPaper');
                descPlayerChoice.textContent = "Paper";
            }
            else if (playerGuess == 'scissors')
            {
                playerChoiceBackground.classList.add('iconScissors');
                descPlayerChoice.textContent = "Scissors";
            }
            else if (playerGuess == 'rock')
            {
                playerChoiceBackground.classList.add('iconRock');
                descPlayerChoice.textContent = "Rock";
            }
            computerGuess = returnComputerGuess();
            var result = compareGuesses(playerGuess, computerGuess);
            updateScores(result);
            if (playerScore == 3)
            {
                gameEnd();
                playerWon();
            }
            else if (computerScore == 3)
            {
                gameEnd();
                computerWon();
            }
        });
    });
}

//Disable player choice divs when game is over

function playerWon()
{
    [...addOneText].forEach(function(addOneText)
    {
        addOneText.addEventListener('transitionend', () =>
        {
            playerChoices.forEach(function(playerChoices)
            {
                playerChoices.style.visibility = 'hidden';
                bottomText.textContent = "You won! Play again?";
            });
        });
    });
}

function computerWon()
{
    [...addOneText].forEach(function(addOneText)
    {
        addOneText.addEventListener('transitionend', () =>
        {
            playerChoices.forEach(function(playerChoices)
            {
                playerChoices.style.visibility = 'hidden';
                bottomText.textContent = "The computer won! Try again?";
            });
        });
    });
}


//Provides random selection for computer and introduces resulting image to 
//computer choice icon on top right of page
//Also provides text below icon depending on choice

function returnComputerGuess() 
{
    var computerInput = ["rock", "paper", "scissors"];
    var computerInputGuess = computerInput[Math.floor(Math.random() * computerInput.length)];
    if (computerInputGuess === "paper")
    {
        computerChoiceBackground.classList.add('iconPaper');
        descComputerChoice.textContent = "Paper";
        return computerInputGuess = "paper";
    }
    else if (computerInputGuess === "scissors")
    {
        computerChoiceBackground.classList.add('iconScissors');
        descComputerChoice.textContent = "Scissors";
        return computerInputGuess = "scissors";
    }
    else if (computerInputGuess === "rock")
    {
        computerChoiceBackground.classList.add('iconRock');
        descComputerChoice.textContent = "Rock";
        return computerInputGuess = "rock";
    }
}

//Compare the guesses
function compareGuesses(playerGuess, computerGuess)
{
    if (playerGuess === computerGuess)
    {
        return 0;
    }
    else if 
    (
    (playerGuess === 'rock' && computerGuess === 'scissors')
                                ||
    (playerGuess === 'paper' && computerGuess === 'rock')
                                ||
    (playerGuess === 'scissors' && computerGuess === 'paper')
    )
    {
        return 1;
    }
    else 
    {
        return 2;
    }
}

//Update scores and perform transition for +1 or tie at bottom of page, then remove when transition done

function updateScores(result)
{
    if(result === 1)
    {
        playerScore ++;
        updatePlayerScore.textContent = playerScore;
        updateComputerScore.textContent = computerScore;
        playerAddOne.textContent = "+1";
        transform();
        removeText();
    }
    if (result === 2)
    {
        computerScore ++;
        updateComputerScore.textContent = computerScore;
        updatePlayerScore.textContent = playerScore;
        computerAddOne.textContent = "+1";
        transform();
        removeText();
    }
    if (result === 0)
    {
        updateComputerScore.textContent = computerScore;
        updatePlayerScore.textContent = playerScore;
        sayTie();
        transform();
        removeText();
    }
}

//Add +1 or tie on bottom divs functions
var addOneText = document.getElementsByClassName('addOneText');

function sayTie()
{
    [...addOneText].forEach(function(addOneText)
    {
        addOneText.textContent = "Tie!";
    });
}

function transform()
{
        [...addOneText].forEach(function(addOneText)
        {
            addOneText.classList.add('scale');
            playerChoices.forEach(function(playerChoices)
            {
                playerChoices.classList.add('wait');
            });
        });
}

function removeText()
{
    [...addOneText].forEach(function(addOneText)
    {
        addOneText.addEventListener('transitionend', () => 
        {
            playerChoices.forEach(function(playerChoices)
            {
                playerChoices.classList.remove('wait');
            });
            addOneText.textContent = '';
            removeScale();
            clearIcons();
        });
    });
}

function removeScale()
{
    [...addOneText].forEach(function(addOneText)
    {
       addOneText.classList.remove('scale'); 
    });
}

//Get rid of icons shown on top of page for choices
function clearIcons()
{
    playerChoiceBackground.classList.remove('iconPaper', 'iconScissors', 'iconRock');
    descPlayerChoice.textContent = "";
    computerChoiceBackground.classList.remove('iconPaper', 'iconScissors', 'iconRock');
    descComputerChoice.textContent = "";
}

//Enable gameEnd occurence. Allow user to click yes to play again or no to not play again
//Currently, resetting scores shows each score as 'undefined' when play again yes performed
var yesPlayAgain = document.getElementById('yesPlayAgain');
var noPlayAgain = document.getElementById('noPlayAgain');
function gameEnd()
{
    showPlayAgainSelections();
    yesPlayAgain.addEventListener('click', () =>
    {
        resetScores();
        playGame();
    });
    noPlayAgain.addEventListener('click', () =>
    {
        hidePlayAgainSelections();
        bottomText.textContent = "Enjoy the scenic layout of the webpage!";
    });
}

//Showing the divs for thumbs up or down to play again or not
function showPlayAgainSelections()
{
    [...addOneText].forEach(function(addOneText)
    {
        addOneText.addEventListener('transitionend', () =>
        {
            [...playAgainSelections].forEach(function(playAgainSelections)
            {
                playAgainSelections.style.visibility = 'visible';
            });
        });
    });
}

//Reset scores to 0
function resetScores()
{
    playerScore = 0;
    computerScore = 0;
    updateComputerScore.textContent = 0;
    updatePlayerScore.textContent = 0;
}
playGame();