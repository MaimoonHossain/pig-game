'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, activePlayer, currentSocre, playing;

const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  scores = [0, 0];
  activePlayer = 0;
  currentSocre = 0;
  playing = true;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');

  document.querySelector(`.player--winner`).classList.remove('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentSocre = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  // Generating a random dice roll
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    // display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentSocre += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentSocre;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  // Add current score to active player's score
  if (playing) {
    scores[activePlayer] += currentSocre;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if player's score is >= 20
    // Finish the game
    if (scores[activePlayer] >= 50) {
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
});

document.querySelector('.btn--new').addEventListener('click', init);
