const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/api", (req, res) => {
  res.json({
    message: "Hello from the backend! This message is served by a Node.js Express server running inside a Docker container.",
  });
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
