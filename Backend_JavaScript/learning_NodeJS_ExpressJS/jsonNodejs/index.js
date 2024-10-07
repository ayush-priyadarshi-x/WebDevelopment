const bio = {
  name: "Ayush",
  class: 10,
  roll_no: 4,
  country: "nepal",
};
const fs = require("fs");
function ok(x) {
  let y = JSON.stringify(x);
  fs.writeFile("sender.js", `${y}`, (err) => {
    if (err != null) {
      console.log(err);
    }
  });
}
function anotherok() {
  let data = fs.readFile("sender.js", "utf-8", (err, data) => {
    if (err != null) {
      console.log(err);
    } else {
      console.log(data);
      console.log(JSON.parse(data));
    }
  });
}
anotherok();
