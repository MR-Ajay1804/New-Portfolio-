import { readFileSync } from "node:fs";
import { inflateSync } from "node:zlib";

const file = process.argv[2];
const pdf = readFileSync(file);
const raw = pdf.toString("latin1");
const chunks = [];

function decodePdfString(value) {
  return value
    .replace(/\\([nrtbf\\()])/g, (_, c) => ({ n: "\n", r: "\r", t: "\t", b: "\b", f: "\f", "\\": "\\", "(": "(", ")": ")" }[c] || c))
    .replace(/\\([0-7]{1,3})/g, (_, oct) => String.fromCharCode(parseInt(oct, 8)));
}

function readHex(hex) {
  const clean = hex.replace(/\s+/g, "");
  let out = "";
  for (let i = 0; i < clean.length - 1; i += 2) {
    const code = parseInt(clean.slice(i, i + 2), 16);
    if (Number.isFinite(code) && code > 0) out += String.fromCharCode(code);
  }
  return out;
}

for (const match of raw.matchAll(/<<(?:.|\n|\r)*?>>\s*stream\r?\n/g)) {
  const dict = match[0];
  const start = match.index + match[0].length;
  const end = raw.indexOf("endstream", start);
  if (end < 0) continue;
  const bytes = pdf.subarray(start, end);
  let stream;
  try {
    stream = /\/FlateDecode/.test(dict) ? inflateSync(bytes).toString("latin1") : bytes.toString("latin1");
  } catch {
    continue;
  }

  for (const textMatch of stream.matchAll(/\((?:\\.|[^\\)])*\)\s*Tj/g)) {
    chunks.push(decodePdfString(textMatch[0].slice(1, textMatch[0].lastIndexOf(")"))));
  }
  for (const arrayMatch of stream.matchAll(/\[((?:.|\n|\r)*?)\]\s*TJ/g)) {
    const array = arrayMatch[1];
    for (const part of array.matchAll(/\((?:\\.|[^\\)])*\)|<([0-9A-Fa-f\s]+)>/g)) {
      if (part[0].startsWith("(")) chunks.push(decodePdfString(part[0].slice(1, -1)));
      else if (part[1]) chunks.push(readHex(part[1]));
    }
    chunks.push("\n");
  }
}

console.log(chunks.join(" ").replace(/[ \t]+/g, " ").replace(/\n\s+/g, "\n").trim());
