const { mkdirSync, cpSync } = require("fs");
const path = require("path");

const src = path.join(__dirname, "..", "backend", "db", "schema.sql");
const dest = path.join(__dirname, "..", "dist", "backend", "schema.sql");

mkdirSync(path.dirname(dest), { recursive: true });

cpSync(src, dest);
