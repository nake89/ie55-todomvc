if (!Object.keys) {
  Object.keys = function (obj) {
    var keys = [];

    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        keys.push(i);
      }
    }

    return keys;
  };
}

(function () {
  // Check if console is undefined
  if (typeof console === 'undefined') {
    console = {};
  }

  // Check if console.log is undefined
  if (typeof console.log !== 'function') {
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
      logEntry.innerText = String(message); // Ensure the message is a string
      logDiv.appendChild(logEntry);
    };
  }
})();
