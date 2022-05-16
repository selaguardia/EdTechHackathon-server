const express = require("express");
const app = express();

const PORT = 3000;

app.use((req, res, next) => {
  console.log(`METHOD:${req.method} \nOG-URL:${req.originalUrl}`);
  next();
});

app.get("/", (req, res) => {
  res.send('Team 1 Homepage')
});

app.listen(PORT, () => {
  console.log(`✅ Listening for client requests on Port ${PORT} ✅`);
});