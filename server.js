const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "client", "build")));

app.use(cors());

//Body Parser middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: false,
    parameterLimit: 50000
  })
);

app.get("/", clientServing);
function clientServing(req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
}

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server running on port ${port}`));
