const { mkdirSync, cpSync } = require("fs");
const path = require("path");

const src = path.join(__dirname, "..", "assets", "icons");
const dest = path.join(__dirname, "..", "dist", "assets", "icons");

mkdirSync(path.dirname(dest), { recursive: true });

cpSync(src, dest, { recursive: true });
