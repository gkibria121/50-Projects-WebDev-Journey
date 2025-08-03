import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const slug = req.query.slug || "";
  const filePath = path.join(process.cwd(), slug);

  // If it's a directory, serve index.html
  const isDirectory =
    fs.existsSync(filePath) && fs.statSync(filePath).isDirectory();

  if (isDirectory) {
    const indexPath = path.join(filePath, "public", "index.html");
    if (fs.existsSync(indexPath)) {
      let html = fs.readFileSync(indexPath, "utf-8");
      html = html.replace("style.css", `${slug}/public/style.css`);
      html = html.replace("script.js", `${slug}/public/script.js`);
      res.setHeader("Content-Type", "text/html");
      res.status(200).send(html);
      return;
    }
  }
  // Else try to serve file (e.g., script.js or style.css)
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
      ".js": "application/javascript",
      ".css": "text/css",
      ".html": "text/html",
      ".json": "application/json",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".svg": "image/svg+xml",
    };
    const mimeType = mimeTypes[ext] || "application/octet-stream";
    res.setHeader("Content-Type", mimeType);
    const fileContent = fs.readFileSync(filePath);
    res.status(200).send(fileContent);
    return;
  }

  // Not found
  res.status(404).send("Not Found");
}
