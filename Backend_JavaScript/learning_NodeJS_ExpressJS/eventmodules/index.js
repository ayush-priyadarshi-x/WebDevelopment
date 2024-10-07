const EventEmitter = require("events");
const events = new EventEmitter();
events.on("saymyname", (sc, msg) => {
  console.log(`The staus code is ${sc} and the page is ${msg}`);
});
events.emit("saymyname", 200, "ok");
