const express = require("express");
const app = express();
const apiRoutes = require("./routes/apiRoutes.js");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const port = 5500;

app.get("/", (req, res) => {
  res.json({
    message: "Server is Running",
  });
});
app.use(cors({ origin: true, credentials: true }));
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", apiRoutes);
app.get("/files", (req, res) => {
  const filePath = path.join(__dirname, "..", "client", "files.html");
  res.sendFile(filePath);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
