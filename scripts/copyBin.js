const { mkdirSync, cpSync } = require("fs");
const path = require("path");

const src = path.join(__dirname, "..", "bin");
const dest = path.join(__dirname, "..", "dist", "bin");

mkdirSync(dest, { recursive: true });

cpSync(src, dest, { recursive: true });
