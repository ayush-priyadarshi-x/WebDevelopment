const bodyParser = require("body-parser");
const express = require("express");
const db = require("./database/db");
const cors = require("cors");

const index = require("./routes/index");
const login = require("./routes/login");
const signup = require("./routes/signup");
const calendar = require("./routes/calendar");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", index);
app.use("/login", login);
app.use("/signup", signup);
app.use("/calendar", calendar);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`The server is running on PORT: ${PORT}`);
});
