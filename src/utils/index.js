export function randomRgb() {
  // Generate random RGB code
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  return { red, green, blue };
}

export function rgbToHex(red, green, blue) {
  // Convert an RGB code to hexadecimal
  const hexRed = red > 16 ? red.toString(16) : `0${red.toString(16)}`;
  const hexGreen = green > 16 ? green.toString(16) : `0${green.toString(16)}`;
  const hexBlue = blue > 16 ? blue.toString(16) : `0${blue.toString(16)}`;

  return `#${hexRed}${hexGreen}${hexBlue}`.toUpperCase();
}
