const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
  fs.readFile("index.json", "utf-8", (err, data) => {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  });
});
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to the port 8000");
});
