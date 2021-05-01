import fs from "fs";

if (process.argv.length != 3) {
	console.error(`usage: node ${process.argv[1]} filename`);
	process.exit(-1);
}

const buffer = fs.readFileSync(`${process.argv[2]}`);
const pattern = /^building_lib\/(buffad_)?c(ollectible)?_[a-z0-9_]*\.png$/;
const mapping = [];

let offset = 0;
const readUTF = () => {
	const length = buffer.readUInt16BE(offset);
	offset += 2;
	const string = buffer.slice(offset, offset + length).toString();
	offset += length;
	return string;
};

while (offset < buffer.length) {
	const file = readUTF();
	const hash = readUTF();
	if (file.match(pattern)) {
		mapping.push([file, hash]);
	}
}

console.log(mapping);
