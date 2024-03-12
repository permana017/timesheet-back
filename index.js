const { urlencoded, json } = require("express");
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./helper/connection");
const router = require("./src/views/index");

app.use(express.static("public"));
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(json());

app.use("/api/v1", router);

app.get("*", (req, res) => {
  return res.send({ status: 404, message: "not founds" });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
