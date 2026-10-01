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
app.get("/api/repository", async (req, res) => {
  const githubUrl = req.query.url;

  const url = new URL(githubUrl);

  const parts = url.pathname.split("/");

  const owner = parts[1];
  const repo = parts[2];

  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);

  const data = await response.json();

  res.json(data);
});

app.listen(PORT, () => {
  console.log(`CodeAtlas server running on port ${PORT}`);
});
