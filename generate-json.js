import fs from "fs";

const buffer = fs.readFileSync(0);

let offset = 0;
const readUTF = () => {
	const length = buffer.readUInt16BE(offset);
	offset += 2;
	const string = buffer.slice(offset, offset + length).toString();
	offset += length;
	return string;
};

const mapping = [];
while (offset < buffer.length) {
	const file = readUTF();
	const hash = readUTF();
	mapping.push([file, hash]);
}

console.log(JSON.stringify(mapping, null, 2));
