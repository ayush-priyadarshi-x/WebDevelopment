const http = require("http");
console.log("hello");
const server = http.createServer((req, res) => {
  let url = req.url;
  if (url == "/") {
    res.end("Hello from the other side.");
  } else if (url == "/contact") {
    res.end("Hello from the contact side.");
  } else if (url == "/about") {
    res.end("Hello from the about side.");
  } else {
    res.writeHead(404, { "Content-type": "text/html" });
    res.end("Error");
  }
});
server.listen(8000, "127.0.0.1", () => {
  console.log("Ready");
});
