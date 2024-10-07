const fs = require("fs");
const data = fs.readFile("first.txt", "utf-8", (err, data) => {
  console.log(err);
  console.log(data);
});
console.log(data);
console.log("yo");
