const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  const movies = [];
  const result = await axios.get(
    "https://project-c-dd6df-default-rtdb.firebaseio.com/movies.json"
  );
  const data = result.data;
  for (let key in data) {
    movies.push(data[key]);
    console.log(movies);
  }
  res.send(movies);
});

module.exports = router;
