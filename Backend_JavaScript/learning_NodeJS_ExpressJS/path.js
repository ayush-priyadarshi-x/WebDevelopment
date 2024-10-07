const path = require("path");
console.log(
  path.parse("C:/Users/manoj/OneDrive/Desktop/.vscode/Nodejs/Notes>")
);
const mypath = path.parse(
  "C:/Users/manoj/OneDrive/Desktop/.vscode/Nodejs/Notes>"
);
const { root, dir, base, name } = mypath;
console.log(root, dir, base, name);
