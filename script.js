'use strict';

// Selecting elements..
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const rollDice = document.querySelector('.btn--roll');
const newBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

let scores, currentScore, stillPlaying, activePlayer;

const init = function(){
    currentScore = 0;
    activePlayer = 0;
    stillPlaying = true;
    scores = [0, 0]; 

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');

};
init();

// Roll Dice Functionality
rollDice.addEventListener('click', function(){
    if (stillPlaying){
    //generate a random dice roll
        const dice = Math.trunc(Math.random()*6)+1;

        //Display roll dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        //check if number ===1
        if (dice !== 1){
            //Add dice to current score..
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }else{
            // Switch player... 
            document.getElementById(`current--${activePlayer}`).textContent = 0;
            activePlayer = activePlayer === 0 ? 1 : 0;
            currentScore = 0;
            player0El.classList.toggle('player--active');
            player1El.classList.toggle('player--active');
        };
    }
    
});

// Hold Button Functionality.....
holdBtn.addEventListener('click', function(){
    if (stillPlaying){
        const activePlayerScore = document.getElementById(`score--${activePlayer}`);
        const activePlayerCurrentScore = Number(document.getElementById(`current--${activePlayer}`).textContent);
        scores[activePlayer] = scores[activePlayer] + activePlayerCurrentScore
        activePlayerScore.textContent = scores[activePlayer];
        if (!(scores[activePlayer] >= 100)) {
            //Switch Player..
            currentScore = 0;
            document.getElementById(`current--${activePlayer}`).textContent = 0;
            activePlayer = activePlayer === 0 ? 1 : 0;
            player0El.classList.toggle('player--active');
            player1El.classList.toggle('player--active');
        }else{
            //Player Wins...
            stillPlaying = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }
    }
});

newBtn.addEventListener('click', init);