function findImports(code) {
  const imports = [];

  const requireRegex = /require\(["'](.+?)["']\)/g;

  let match;

  while ((match = requireRegex.exec(code)) !== null) {
    const importPath = match[1];

    if (importPath.startsWith(".")) {
      imports.push(importPath);
    }
  }

  return imports;
}

module.exports = {
  findImports,
};
