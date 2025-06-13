var currentMode = "";
var normalModeKeyPresses = [];
var oRTE;

function emptyNormalModeKeyPresses() {
  normalModeKeyPresses = [];
}

window.onload = function () {
  var rte = "ide";
  if (document.all) {
    oRTE = frames[rte].document;
    oRTE.designMode = "On";
    oRTE.attachEvent("onkeypress", function evt_ie_keypress(event) {ieKeyPress(event, rte);});
    oRTE.focus();
  } else {
    console.log(document.getElementById(rte));
    // This is off because we start in normal mode
    document.getElementById(rte).contentDocument.designMode = "off";
    // console.log(document.getElementById(rte).contentDocument)
    // console.log(document.getElementById(rte).contentDocument.designMode)
    document.getElementById(rte).contentWindow.focus();
    oRTE = document.getElementById(rte).contentWindow.document;
    oRTE.addEventListener("keyup", geckoKeyPress, true);
  }
  // Start in normal mode
  normalMode();
  currentMode = "NORMAL";
};


function geckoKeyPress(evt) {
  // var oRTE = document.getElementById("ide").contentWindow.document;
  console.log(evt);
  if (currentMode === "NORMAL") {
    switch (evt.keyCode) {
      case 73: // i
        document.getElementById("ide").contentDocument.designMode = "on";
        insertMode();
        break;
      case 27: // ESC
        normalModeKeyPresses = [];
        document.getElementById("ide").contentDocument.designMode = "off";
        normalMode();
        break;
      case 86: // V
        document.getElementById("ide").contentDocument.designMode = "off";
        visualMode();
        break;
      case 69: // D
        normalModeKeyPresses.push("D");
        setTimeout(emptyNormalModeKeyPresses(),1000);
        break;
      case 68: // D
        normalModeKeyPresses.push("D");
        setTimeout(emptyNormalModeKeyPresses(),1000);
        break;
      case 81: // Q
        var rng = setRange();
        console.log(rng);
        break;
    }
  } else if (currentMode === "INSERT") {
    switch (evt.keyCode) {
      case 27: // ESC
        normalModeKeyPresses = [];
        document.getElementById("ide").contentDocument.designMode = "off";
        normalMode();
        break;
    }
  }
}

function setRange() {
  	if (document.all) {
		var selection = oRTE.document.selection;
		if (selection != null) rng = selection.createRange();
	} else {
		var selection = oRTE.getSelection();
    console.log(selection)
		rng = selection.getRangeAt(selection.rangeCount - 1).cloneRange();
	}
	return rng;
}

function ieKeyPress() {

}

function normalMode() {
  var mode = "NORMAL";
  changeVimMode(mode, "#9966ff");
  currentMode = mode;
}
function insertMode() {
  var mode = "INSERT";
  changeVimMode(mode, "#00ff99");
  currentMode = mode;
}
function visualMode() {
  var mode = "VISUAL";
  changeVimMode(mode, "#ffff99")
  currentMode = mode;
}

function changeVimMode(text, color) {
  const vimMode = document.getElementById("vimmode");
  vimMode.innerHTML = text;
  vimMode.style.backgroundColor = color;
}


// 73 i
// 27 esc
// 86 v
// 69 D
// 68 E
