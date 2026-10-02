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
  const branchResponse = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/ref/heads/${data.default_branch}`,
  );

  const branchData = await branchResponse.json();
  const treeResponse = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/trees/${branchData.object.sha}?recursive=1`,
  );

  const treeData = await treeResponse.json();
  const files = treeData.tree.map((item) => {
    return {
      path: item.path,
      type: item.type === "blob" ? "file" : "folder",
    };
  });
  res.json({
    repository: {
      name: data.name,
      owner: data.owner.login,
      description: data.description,
      language: data.language,
      defaultBranch: data.default_branch,
    },
    files: files,
  });
});
app.get("/api/repository/file", async (req, res) => {
  const githubUrl = req.query.url;
  const filePath = req.query.path;

  const url = new URL(githubUrl);
  const parts = url.pathname.split("/");

  const owner = parts[1];
  const repo = parts[2];

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
  );

  const data = await response.json();

  const content = Buffer.from(data.content, "base64").toString("utf-8");

  res.json({
    path: data.path,
    content: content,
  });
});
app.listen(PORT, () => {
  console.log(`CodeAtlas server running on port ${PORT}`);
});
