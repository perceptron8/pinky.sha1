"use strict";

var fs = require("fs");

if (process.argv.length != 3) {
	console.error("usage: node index.js filename");
	process.exit(-1);
}

var filename = process.argv[2];
var buffer = fs.readFileSync(filename);
var offset = 0;

while (offset < buffer.length) {
	var readUTF = function() {
		var length = buffer.readUInt16BE(offset);
		offset += 2;
		var string = buffer.toString("utf8", offset, offset + length);
		offset += length;
		return string;
	};
	var file = readUTF();
	var hash = readUTF();
	console.log(hash, file);
}
