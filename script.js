let isCorrect, score = 0;

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

function genColors() {
  document.getElementById('answer').innerText = 'Choose the right color!';
  isCorrect = false;

  const colorCircles = document.getElementsByClassName('color-circle');
  const colors = [];

  for (let i = 0; i < colorCircles.length; i++) {
    colors.push(randomRgb());
    const rgbColor = `rgb(${colors[i].red}, ${colors[i].green}, ${colors[i].blue})`;
    colorCircles[i].style.backgroundColor = rgbColor;
  }

  const randomIndex = Math.floor(Math.random() * colorCircles.length);
  colorCircles[randomIndex].setAttribute('correct', true);
  const rgbValues = document.getElementsByClassName('rgb-value');
  const { red, green, blue } = colors[randomIndex];
  rgbValues[0].innerText = red;
  rgbValues[1].innerText = green;
  rgbValues[2].innerText = blue;
  document.getElementById('hex').innerText = rgbToHex(red, green, blue);
}

window.addEventListener('load', () => {
  genColors();
});

document.addEventListener('click', ({ target }) => {
  if (target.classList.contains('color-circle')) {
    if (target.getAttribute('correct') === 'true') {
      document.getElementById('answer').innerText = 'Correct!';
      if (!isCorrect) {
        isCorrect = true;
        score += 2;
      }
    } else {
      document.getElementById('answer').innerText = 'Wrong! Try again!';
      if (!isCorrect && score > 0) {
        score -= 1;
      }
    }
    document.getElementById('score').innerText = score;
  }
});

document.getElementById('new-round-button').onclick = function () {
  document.querySelector('[correct=true]').removeAttribute('correct');
  genColors();
};
