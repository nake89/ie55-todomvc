var hijackConsoleLog = true;

var JSON = {};

// implement JSON.stringify serialization
JSON.stringify = function (obj) {

var t = typeof (obj);
if (t != "object" || obj === null) {

    // simple data type
    if (t == "string") obj = '"'+obj+'"';
    return String(obj);

}
else {

    // recurse array or object
    var n, v, json = [], arr = (obj && obj.constructor == Array);

    for (n in obj) {
        v = obj[n]; t = typeof(v);

        if (t == "string") v = '"'+v+'"';
        else if (t == "object" && v !== null) v = JSON.stringify(v);

        json.push((arr ? "" : '"' + n + '":') + String(v));
    }

    return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
}
};
(function () {
  // Check if console is undefined
  if (hijackConsoleLog || typeof console === 'undefined') {
    console = {};
  }

  // Check if console.log is undefined
  if (hijackConsoleLog || typeof console.log !== 'function') {
    console.log = function (message) {
      // Find or create the log div
      var logDiv = document.getElementById('logDiv');
      if (!logDiv) {
        logDiv = document.createElement('div');
        logDiv.id = 'logDiv';
        logDiv.style.border = '1px solid #ccc';
        logDiv.style.padding = '10px';
        logDiv.style.margin = '10px';
        logDiv.style.height = '200px';
        logDiv.style.overflowY = 'auto';
        logDiv.style.fontFamily = 'monospace';
        logDiv.style.backgroundColor = '#f9f9f9';
        document.body.appendChild(logDiv);
      }

      // Append the message to the div
      var logEntry = document.createElement('div');
	    if (typeof message === "object") {
      logEntry.innerText = JSON.stringify(message); // Ensure the message is a string
	    } else {
      logEntry.innerText = String(message); // Ensure the message is a string
	    }
      logDiv.appendChild(logEntry);
    };
  }
})();


window.onload = function() {
	var obi = {name: "Obi-Wan Kenobi",
	occupation: "Jedi"}
	console.log(obi);
	console.log("hello");
	console.log("hello2");
	console.log("hello3");
}
