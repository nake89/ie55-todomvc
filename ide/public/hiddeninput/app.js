var currentMode = "";
var normalModeKeyPresses = [];
var textInEditor = "";
var cursorPosY = 0;
var cursorPosX = 0;

window.onload = function () {
  // Start in normal mode
  normalMode();
  currentMode = "NORMAL";
  //document.body.addEventListener("keyup", geckoKeyPress, true);
  addEvent(document.body, "keyup", geckoKeyPress)
};


function geckoKeyPress(evt) {
  console.log("key press")
  console.log(Object.keys(evt));
  // console.log(evt);
  // https://stackoverflow.com/a/29099509 maps numpad to correct number
  var key = evt.keyCode;
  key = String.fromCharCode((96 <= key && key <= 105) ? key - 48 : key);
  key = isNaN(key) ? evt.shiftKey ? key : key.toLowerCase() : key;
  console.log(key);
  if (currentMode === "NORMAL") {
    switch (key) {
      case "i":
        insertMode();
        return
        break;
    }
    if (evt.keyCode) {

    }
    // switch (evt.keyCode) {
    //   case 73: // i
    //     insertMode();
    //     break;
    //   case 27: // ESC
    //     normalModeKeyPresses = [];
    //     normalMode();
    //     break;
    //   case 86: // V
    //     visualMode();
    //     break;
    //   case 69: // D
    //     normalModeKeyPresses.push("D");
    //     break;
    // }
  } else if (currentMode === "INSERT") {
    console.log("in insert mode");
    if (evt.keyCode === 27) {
      normalModeKeyPresses = [];
      normalMode();
      cursorPosX--;
    }
    // Left Arrrow
    if (evt.keyCode === 37) {
      leftArrow();
    }
    // Right arrow
    if (evt.keyCode === 39) {
      rightArrow();
    }

    // Up arrow
    if (evt.keyCode === 38) {
      uparrow();
    }
    // Down arrow
    if (evt.keyCode === 40) {
      downarrow();
    }
    if (evt.keyCode === 13) {
      // textInEditor += "\n";
      // cursorPosY++;
      enter();
    }
    // backspace
    if (evt.keyCode === 8) {
      //textInEditor = textInEditor.slice(0, -1);
      //cursorPosX--;
      backspace();
    } else {
      addCharacter(key);
    }
  }
  printIDE();

}

function leftArrow() {
  cursorPosX--;
}
function rightArrow() {
  cursorPosX++;
}

function uparrow() {
  if (cursorPosY === 0) return;
  cursorPosY--;
  var splitted = textInEditor.split("\n");
  if (splitted[cursorPosY].length < cursorPosX) {
    cursorPosX = splitted[cursorPosY].length;
  }
}

function downarrow() {
  var splitted = textInEditor.split("\n");
  if (cursorPosY >= splitted.length) return;
  cursorPosY++;
  if (splitted[cursorPosY].length < cursorPosX) {
    cursorPosX = splitted[cursorPosY].length;
  }
}

function backspace() {
  var splitted = textInEditor.split("\n");
  splitted[cursorPosY] = splitted[cursorPosY].slice(0, -1);
  textInEditor = splitted.join("\n");
  cursorPosX--;

}

function addCharacter(key) {
  //var reg = new RegExp("^[ A-Za-z0-9\"'><=?!$%\\(){}[\]*`^_@./#&+-]*$");
  var reg = new RegExp(/^\w$/);
  console.log(reg)
  console.log(key)
  console.log(reg.test(key))
  if (!reg.test(key)) return
  var splitted = textInEditor.split("\n");
  splitted[cursorPosY] += key;
  textInEditor = splitted.join("\n");
  cursorPosX++;
}
function enter() {
  var splitted = textInEditor.split("\n");
  console.log("KKKKKKKKKKKK")
  console.log(splitted)
  splitted.splice(cursorPosY + 1, 0, "\n")
  console.log(splitted)
  cursorPosY++;
  cursorPosX = 0;
  textInEditor = splitted.join("\n")
}

function printIDE() {
  console.log(textInEditor);
  console.log(document.getElementById("ide"));
  var textToPrint = getTextWithCursor();
  document.getElementById("ide").innerHTML = textToPrint;
}

function getTextWithCursor() {
  var splitted = textInEditor.split("\n");
  // if (cursorPosX === textInEditor.length) return textInEditor + "&#9608;";
  //console.log(`textInEditor.length: ${textInEditor.length}`)
  //console.log(`cursorPosX: ${cursorPosX}`)
  var beginText = splitted[cursorPosY].slice(0, cursorPosX);
  //console.log(`beginText: ${beginText}`)
  // console.log(`beginText: ${textInEditor.slice(0,5)}`)
  var cursorText = splitted[cursorPosY][cursorPosX];
  //var endText = textInEditor.slice(cursorPosX+1, textInEditor.length-1 );
  if (cursorText) {
    cursorText = '<span class="cursor">' + cursorText + '</span>';
  } else {
    cursorText = "&#9608;";
  }
  //console.log(`Cursor text: ${cursorText}`)
  var endText = splitted[cursorPosY].slice(cursorPosX + 1, textInEditor.length);
  //console.log(`endText: ${endText}`);
  var finalText = beginText + cursorText + endText;
  //console.log(`finalText: ${finalText}`);
  //finalText = finalText.split("\n").join("<br>");
  if (finalText && finalText.length > 0) {
    console.log("finaltext is set")
    splitted.splice(cursorPosY, 1, finalText);
  }
  console.log(splitted)
  var joined = splitted.join("<br>");
  console.log(joined)
  return joined;
  //return finalText;
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
  var vimMode = document.getElementById("vimmode");
  vimMode.innerHTML = text;
  vimMode.style.backgroundColor = color;
}


function addEvent( obj, type, fn ) {
  if ( obj.attachEvent ) {
    obj['e'+type+fn] = fn;
    obj[type+fn] = function(){obj['e'+type+fn]( window.event );}
    obj.attachEvent( 'on'+type, obj[type+fn] );
  } else
    obj.addEventListener( type, fn, false );
}
function removeEvent( obj, type, fn ) {
  if ( obj.detachEvent ) {
    obj.detachEvent( 'on'+type, obj[type+fn] );
    obj[type+fn] = null;
  } else
    obj.removeEventListener( type, fn, false );
}

// 73 i
// 27 esc
// 86 v
// 69 D
// 68 E
