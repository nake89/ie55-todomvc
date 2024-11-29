function jsonEncode(ob) {
	var isArray = (typeof ob === "object" && ob.length) ? true : false;
	var str = isArray ? "[" : "{ ";
	for (var o in ob) {
		str += isArray ? "" : ' "' + o + '": ';
		if (typeof ob[o] === "string") {
		    str += ' "' + ob[o] + '",';
		}
		if (typeof ob[o] === "number") {
		    str += ob[o] + ",";
		}
		if (typeof ob[o] === "object") {
		    str += jsonEncode(ob[o]) + ","
		}
	}
	str += isArray ? "]" : " }";
	return str;
}

var myOb = {
	id: 123123,
	data: {
		name: "Kevin",
		age: 35,
		hobbies: ["this", "and", "that", { programming: "javascript" }],
		metadata: {
			id: 345345,
			info: "okiedokie"
		}
	},
	error: "no error"
}

var json = jsonEncode(myOb);
document.write(json);
