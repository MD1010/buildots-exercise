const express = require("express");
const app = express();
const port = 5000;
const axios = require("axios");
const cors = require("cors");

const API_ENDPOINT = "https://k4g5uwrgk3.execute-api.eu-west-1.amazonaws.com";

app.use(cors());
app.get("/apartments", async (req, res) => {
  try {
    const { data } = await axios.get(API_ENDPOINT);
    res.send(data.apartments);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
