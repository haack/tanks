import Game from './game';

// polyfill
Math.clamp = function(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

console.log("Starting game...");
Game.start();
