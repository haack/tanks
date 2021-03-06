import Game from "./game";

// polyfill
Math.clamp = function(number, min, max) {
  return Math.max(min, Math.min(number, max));
};

const defaultBotCode = `class MyBot extends Bot {
	update() {
		// insert logic here
	}
}

module.exports = MyBot;`;

let editorConfig = {
  theme: "monokai",
  mode: "javascript",
  lineNumbers: true,
  smartIndent: true,
  indentWithTabs: true,
  tabSize: 4,
  indentUnit: 4,
  lineWrapping: false
};

let editor = CodeMirror.fromTextArea(
  document.getElementById("code"),
  editorConfig
);
editor.getDoc().setValue(localStorage.getItem("code") || defaultBotCode);

$("#stop-code").click(() => {
  Game.stop();
});

$("#run-code").click(() => {
  let code = editor.getDoc().getValue();
  localStorage.setItem("code", code);
  Game.addBot(code);
  Game.start();
});
