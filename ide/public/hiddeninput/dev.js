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


// var currentNetworkRequest = {};

// var originalXMLHttpRequest = XMLHttpRequest;
// XMLHttpRequest = function() { originalXMLHttpRequest };
// XMLHttpRequest.prototype.open = function (method, url, isAsync) {
// 	currentNetworkRequest.method = method;
// 	currentNetworkRequest.url = url;

// };

// function hijack(object, funcName, override) {
//     var original = object[funcName];
//     object[funcName] = override(original);
//     return original;
// }
// hijack(XMLHttpRequest, 'open', function(original) {
//     return function(method, url, isAsync) {
// 	console.log(method);
// 	console.log(url);
//         original.call(this, method, url, isAsync);
//     };
// });
// hijack(XMLHttpRequest, 'setRequestHeader', function(original) {
//     return function(key, value) {
// 	console.log(value);
//         original.call(this, key, value);
//     };
// });

window.onload = function() {

// function hijack(scope, original, before){
// 		console.log("hijack");
// 	// for (var i = 0; i < arguments.length; i++) {
// 		// console.log(arguments[i]);
// 	// }
//   var copy = original;
//   return function(arguments){
// 		console.log("ARGUMENTS");
// 		console.log(arguments.length);
// 		console.log(arguments);
// 		console.log("hijack copy contructor name");
// 		console.log(copy.constructor.name);
// 		console.log("hijack before contructor name");
// 		console.log(before.constructor.name);
// 		console.log("hijack scope constructor name");
// 		console.log(scope.constructor.name);
//     before.apply(scope, arguments);
//     copy.apply(scope, arguments);
//   };
// }

// XMLHttpRequest.prototype.open = hijack(this, XMLHttpRequest.prototype.open, function() {
// 	console.log("hijack prototype");
// 	// for (var i = 0; i < arguments.length; i++) {
// 	// 	console.log(arguments[i]);
// 	// }
// });


XMLHttpRequest.prototype.open = (function() {
	var originalFn = XMLHttpRequest.prototype.open
	return function() {
		console.log("arguments")
		console.log(arguments.length)
		console.log(arguments[0])
		return originalFn.apply(this, arguments);
	}
})()

	var obi = {name: "Obi-Wan Kenobi",
	occupation: "Jedi"}
	console.log(obi);
	console.log("hello");
	console.log("hello2");
	console.log("hello3");


var http = new XMLHttpRequest();
console.log("Constructor name");
console.log(http.constructor.name);

		console.log("xml");
var url = 'https://httpbin.org/get';

http.open('GET', url, true);
		console.log("open");

//Send the proper header information along with the request
http.setRequestHeader('Content-type', 'application/json');
		console.log("header");

http.onreadystatechange = function() {//Call a function when the state changes.
		console.log("orig statechange");
    if(http.readyState == 4 && http.status == 200) {
        console.log(http.responseText);
    } else {
        console.log("httperror");
        console.log(http.status);
    }
}
		console.log("statechange");
http.send();
		console.log("send");

}
