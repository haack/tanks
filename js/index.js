Math.clamp = function(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

console.log("Setting up canvas");
var game = new Game();
