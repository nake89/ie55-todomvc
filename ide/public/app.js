var currentMode = "";
var normalModeKeyPresses = [];

window.onload = function () {
  var rte = "ide";
  if (document.all) {
    var oRTE = frames[rte].document;
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
    var oRTE = document.getElementById(rte).contentWindow.document;
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
        break;
    }
  }
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
