const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const router = require("./router");
const app = express();
const cors = require("cors");

// App Setup
// Middleware for logging
app.use(morgan("combined"));
// Disable cors
app.use(cors());
// Middleware for parse every request to json
app.use(bodyParser.json({ type: "*/*" }));
router(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening on:", port);
