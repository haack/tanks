import Game from './game';

// polyfill
Math.clamp = function(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

const defaultBotCode = `class MyBot extends Bot {
	start() {
		// initialisation
	}

	update() {
		// logic on update
	}
}`;

var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    theme: 'monokai',
    mode: "javascript",
    lineNumbers: true,
    smartIndent: true,
    indentWithTabs: true,
    tabSize: 4,
    indentUnit: 4,
    lineWrapping: true,
});

editor.getDoc().setValue(defaultBotCode);

$('#stop-code').click(() => {
    Game.stop();
});

$('#run-code').click(() => {
    let code = editor.getDoc().getValue();
    Game.addBot(code)
    Game.start();
})
