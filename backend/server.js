const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "CodeAtlas API is running",
  });
});

const PORT = 5000;
app.get("/api/repository", (req, res) => {
  const githubUrl = req.query.url;
  res.json({
    githubUrl: githubUrl,
  });
});

app.listen(PORT, () => {
  console.log(`CodeAtlas server running on port ${PORT}`);
});
