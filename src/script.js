// =====> Start Global Variables <=====

const valueElems = document.querySelectorAll('.color-value');
const hexElem = document.getElementById('main-hex');
const messageElem = document.getElementById('game-message');
const circleElems = document.querySelectorAll('.color-circle');
const rgbCodeElems = document.querySelectorAll('.rgb-code');
const hexCodeElems = document.querySelectorAll('.hex-code');
const roundElem = document.getElementById('current-round');
const scoreElem = document.getElementById('current-score');

let round = 0;
let score = 0;

// =====> End Global Variables <=====
// =====> Start Function Declarations <=====

function randomRgb() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  return { red, green, blue };
}

function rgbToHex(red, green, blue) {
  const hexRed = red > 16 ? red.toString(16) : `0${red.toString(16)}`;
  const hexGreen = green > 16 ? green.toString(16) : `0${green.toString(16)}`;
  const hexBlue = blue > 16 ? blue.toString(16) : `0${blue.toString(16)}`;

  return `#${hexRed}${hexGreen}${hexBlue}`.toUpperCase();
}

function startRound() {
  // Refresh state
  const correctElem = document.querySelector('[correct=true]');

  if (correctElem) {
    correctElem.removeAttribute('correct');
  }

  circleElems.forEach((el) => (el.disabled = false));
  round += 1;
  roundElem.innerText = round;
  scoreElem.innerText = score;
  messageElem.innerText = 'Choose the right color!';

  // Generate new colors
  const colors = [];

  for (let i = 0; i < circleElems.length; i++) {
    colors.push(randomRgb());
    const { red, green, blue } = colors[i];
    circleElems[i].style.backgroundColor = `rgb(${red} ${green} ${blue})`;
    rgbCodeElems[i].innerText = `R: ${red} G: ${green} B: ${blue}`;
    hexCodeElems[i].innerText = rgbToHex(red, green, blue);
  }

  // Randomly selects a color to guess
  const randomIndex = Math.floor(Math.random() * circleElems.length);
  const { red, green, blue } = colors[randomIndex];
  valueElems[0].innerText = red;
  valueElems[1].innerText = green;
  valueElems[2].innerText = blue;
  hexElem.innerText = rgbToHex(red, green, blue);
  circleElems[randomIndex].setAttribute('correct', true);
}

function validateAnswer(target) {
  // Answering correctly increases 2 points and each incorrect answer decreases
  // 1 point.
  if (target.getAttribute('correct') === 'true') {
    circleElems.forEach((el) => (el.disabled = true));
    messageElem.innerText = 'Correct!';
    score += 2;
  } else {
    target.disabled = true;
    messageElem.innerText = 'Wrong! Try again!';

    if (score > 0) {
      score -= 1;
    }
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
