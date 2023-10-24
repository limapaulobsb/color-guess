import { randomRgb, rgbToHex } from './utils/index.js';

// =====> Start Global Variables <=====
let round = 0;
let score = 0;
let colors = [];

const messageElem = document.getElementById('game-message');
const circleElems = document.querySelectorAll('.color-circle');

// =====> End Global Variables <=====
// =====> Start Function Declarations <=====

function refreshState() {
  // Prepare a new round
  const roundElem = document.getElementById('current-round');
  const scoreElem = document.getElementById('current-score');

  round += 1;
  roundElem.innerText = round;
  scoreElem.innerText = score;
  messageElem.innerText = 'Choose the right color!';
  circleElems.forEach((el) => (el.disabled = false));
}

function generateNewColors() {
  // Randomly generate new colors and render on screen
  const rgbCodeElems = document.querySelectorAll('.rgb-code');
  const hexCodeElems = document.querySelectorAll('.hex-code');

  colors = [];

  for (let i = 0; i < circleElems.length; i++) {
    colors.push(randomRgb());
    const { red, green, blue } = colors[i];
    circleElems[i].style.backgroundColor = `rgb(${red} ${green} ${blue})`;
    rgbCodeElems[i].innerText = `R: ${red} G: ${green} B: ${blue}`;
    hexCodeElems[i].innerText = rgbToHex(red, green, blue);
  }
}

function selectColor() {
  // Randomly select a color to guess
  const correctElem = document.querySelector('[correct=true]');
  const valueElems = document.querySelectorAll('.color-value');
  const hexElem = document.getElementById('main-hex');

  if (correctElem) {
    correctElem.removeAttribute('correct');
  }

  const randomIndex = Math.floor(Math.random() * circleElems.length);
  const { red, green, blue } = colors[randomIndex];
  valueElems[0].innerText = red;
  valueElems[1].innerText = green;
  valueElems[2].innerText = blue;
  hexElem.innerText = rgbToHex(red, green, blue);
  circleElems[randomIndex].setAttribute('correct', true);
}

function startRound() {
  refreshState();
  generateNewColors();
  selectColor();
}

function validateAnswer(target) {
  // Answering correctly increases 2 points and each incorrect answer decreases
  // 1 point.
  if (target.getAttribute('correct') === 'true') {
    score += 2;
    messageElem.innerText = 'Correct!';
    circleElems.forEach((el) => (el.disabled = true));
  } else {
    if (score > 0) {
      score -= 1;
    }

    messageElem.innerText = 'Wrong! Try again!';
    target.disabled = true;
  }
}

// =====> End Function Declarations <=====
// =====> Start Onload Events and Listeners setup <=====

window.onload = () => {
  startRound();

  document.addEventListener('click', ({ target }) => {
    if (target.matches('.color-circle')) validateAnswer(target);
  });

  document.getElementById('start-round').addEventListener('click', startRound);
};

// =====> End Onload Events and Listeners setup <=====
