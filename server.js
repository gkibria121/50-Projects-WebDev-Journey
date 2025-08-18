import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => {
  const currentDir = process.cwd();
  const folders = fs
    .readdirSync(currentDir, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isDirectory() &&
        entry.name !== "api" &&
        !entry.name.startsWith(".")
    )
    .map((dir) => dir.name);

  const folderCards = folders
    .map(
      (folder, index) => `
      <div class="folder-card" style="animation-delay: ${index * 0.1}s"> 
        <a href="/${folder}" class="folder-link">
          <div class="folder-content">
            <div class="folder-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <h3 class="folder-name">${folder
              .replace(/-/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase())}</h3>
            <div class="folder-meta">
              <span class="project-count">Web Project</span>
            </div>
          </div>
          <div class="folder-arrow">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </a>
      </div>
    `
    )
    .join("\n");

  const emptyState =
    folders.length === 0
      ? `
    <div class="empty-state">
      <div class="empty-icon">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
        </svg>
      </div>
      <h3>No Projects Found</h3>
      <p>Add some project folders to get started</p>
    </div>
  `
      : "";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>50 Projects - WebDev Journey</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :root {
      --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      --accent-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      --glass-bg: rgba(255, 255, 255, 0.08);
      --glass-border: rgba(255, 255, 255, 0.18);
      --text-primary: #ffffff;
      --text-secondary: rgba(255, 255, 255, 0.8);
      --text-muted: rgba(255, 255, 255, 0.6);
      --shadow-lg: 0 25px 50px rgba(0, 0, 0, 0.25);
      --shadow-xl: 0 35px 60px rgba(0, 0, 0, 0.3);
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: var(--primary-gradient);
      min-height: 100vh;
      overflow-x: hidden;
      position: relative;
      line-height: 1.6;
    }

    body::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.4) 0%, transparent 60%),
        radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 60%),
        radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.3) 0%, transparent 60%),
        radial-gradient(circle at 90% 90%, rgba(255, 200, 120, 0.2) 0%, transparent 50%);
      pointer-events: none;
      z-index: -1;
      animation: backgroundShift 20s ease-in-out infinite alternate;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 3rem 2rem;
      position: relative;
      z-index: 1;
    }

    .header {
      text-align: center;
      margin-bottom: 4rem;
      animation: fadeInUp 1s ease-out;
    }

    .title {
      font-size: clamp(2.5rem, 6vw, 5rem);
      font-weight: 900;
      background: linear-gradient(135deg, #fff 0%, #f0f0f0 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 1.5rem;
      letter-spacing: -0.02em;
      text-shadow: 0 2px 30px rgba(255, 255, 255, 0.3);
      position: relative;
    }

    .title::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 100px;
      height: 4px;
      background: var(--accent-gradient);
      border-radius: 2px;
      opacity: 0.8;
    }

    .subtitle {
      font-size: 1.3rem;
      color: var(--text-secondary);
      font-weight: 400;
      letter-spacing: 0.5px;
      max-width: 600px;
      margin: 0 auto;
    }

    .stats {
      display: flex;
      justify-content: center;
      gap: 3rem;
      margin-top: 2rem;
      flex-wrap: wrap;
    }

    .stat-item {
      text-align: center;
      background: var(--glass-bg);
      backdrop-filter: blur(20px);
      padding: 1.5rem 2rem;
      border-radius: 16px;
      border: 1px solid var(--glass-border);
    }

    .stat-number {
      font-size: 2rem;
      font-weight: 800;
      color: var(--text-primary);
      display: block;
    }

    .stat-label {
      font-size: 0.9rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-top: 0.5rem;
    }

    .folders-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2.5rem;
      margin-top: 3rem;
    }

    .folder-card {
      background: var(--glass-bg);
      backdrop-filter: blur(25px);
      border: 1px solid var(--glass-border);
      border-radius: 24px;
      padding: 2.5rem;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
      opacity: 0;
      transform: translateY(40px);
      animation: slideInUp 0.8s ease-out forwards;
      cursor: pointer;
    }

    .folder-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
      opacity: 0;
      transition: opacity 0.4s ease;
      border-radius: 24px;
    }

    .folder-card::after {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05));
      border-radius: 24px;
      z-index: -1;
      opacity: 0;
      transition: opacity 0.4s ease;
    }

    .folder-card:hover {
      transform: translateY(-15px) scale(1.02);
      box-shadow: var(--shadow-xl);
    }

    .folder-card:hover::before,
    .folder-card:hover::after {
      opacity: 1;
    }

    .folder-link {
      text-decoration: none;
      color: inherit;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      position: relative;
      z-index: 2;
    }

    .folder-content {
      flex: 1;
    }

    .folder-icon {
      width: 60px;
      height: 60px;
      margin-bottom: 2rem;
      color: var(--text-primary);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--accent-gradient);
      border-radius: 16px;
      backdrop-filter: blur(10px);
    }

    .folder-icon svg {
      width: 28px;
      height: 28px;
      stroke: white;
      stroke-width: 2.5;
    }

    .folder-card:hover .folder-icon {
      transform: scale(1.1) rotate(5deg);
      box-shadow: 0 10px 25px rgba(79, 172, 254, 0.4);
    }

    .folder-name {
      font-size: 1.6rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 0.8rem 0;
      transition: all 0.3s ease;
      line-height: 1.3;
    }

    .folder-meta {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .project-count {
      font-size: 0.9rem;
      color: var(--text-muted);
      background: rgba(255, 255, 255, 0.1);
      padding: 0.4rem 0.8rem;
      border-radius: 20px;
      font-weight: 500;
      letter-spacing: 0.5px;
    }

    .folder-arrow {
      color: var(--text-muted);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      transform: translateX(0);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.05);
    }

    .folder-card:hover .folder-arrow {
      transform: translateX(8px);
      color: var(--text-primary);
      background: rgba(255, 255, 255, 0.15);
    }

    .empty-state {
      text-align: center;
      padding: 6rem 2rem;
      color: var(--text-secondary);
      grid-column: 1 / -1;
    }

    .empty-state .empty-icon {
      margin: 0 auto 3rem;
      color: var(--text-muted);
    }

    .empty-state h3 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: var(--text-primary);
    }

    .empty-state p {
      font-size: 1.1rem;
      color: var(--text-muted);
    }

    .floating-shapes {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
    }

    .shape {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.03);
      animation: float 8s ease-in-out infinite;
    }

    .shape:nth-child(1) {
      width: 120px;
      height: 120px;
      top: 15%;
      left: 8%;
      animation-delay: 0s;
    }

    .shape:nth-child(2) {
      width: 80px;
      height: 80px;
      top: 70%;
      right: 8%;
      animation-delay: 3s;
    }

    .shape:nth-child(3) {
      width: 100px;
      height: 100px;
      bottom: 15%;
      left: 15%;
      animation-delay: 6s;
    }

    .shape:nth-child(4) {
      width: 60px;
      height: 60px;
      top: 40%;
      right: 20%;
      animation-delay: 2s;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(40px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes slideInUp {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes float {
      0%, 100% {
        transform: translateY(0px) rotate(0deg);
      }
      25% {
        transform: translateY(-30px) rotate(90deg);
      }
      50% {
        transform: translateY(-15px) rotate(180deg);
      }
      75% {
        transform: translateY(-25px) rotate(270deg);
      }
    }

    @keyframes backgroundShift {
      0% {
        transform: translateX(0) translateY(0);
      }
      100% {
        transform: translateX(10px) translateY(-10px);
      }
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .container {
        padding: 2rem 1rem;
      }

      .folders-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .folder-card {
        padding: 2rem 1.5rem;
      }

      .stats {
        gap: 1.5rem;
      }

      .stat-item {
        padding: 1rem 1.5rem;
      }

      .folder-name {
        font-size: 1.4rem;
      }
    }

    @media (max-width: 480px) {
      .folder-card {
        padding: 1.5rem;
      }

      .folder-icon {
        width: 50px;
        height: 50px;
        margin-bottom: 1.5rem;
      }

      .folder-icon svg {
        width: 24px;
        height: 24px;
      }
    }
  </style>
</head>
<body>
  <div class="floating-shapes">
    <div class="shape"></div>
    <div class="shape"></div>
    <div class="shape"></div>
    <div class="shape"></div>
  </div>

  <div class="container">
    <header class="header">
      <h1 class="title">50 Projects Journey</h1>
      <p class="subtitle">Exploring the world of web development through hands-on projects</p>
      
      <div class="stats">
        <div class="stat-item">
          <span class="stat-number">${folders.length}</span>
          <span class="stat-label">Projects</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">∞</span>
          <span class="stat-label">Possibilities</span>
        </div>
      </div>
    </header>

    <main class="folders-grid">
      ${folderCards}
      ${emptyState}
    </main>
  </div>
</body>
</html>`;

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
});
// // Catch-all route for slug/files
app.use((req, res, next) => {
  // Skip if it's the root path (handled by the index route above)
  if (req.path === "/") {
    return next();
  }

  const slugPath = req.path.substring(1); // Remove leading slash
  const filePath = path.join(process.cwd(), slugPath);
  console.log(slugPath, filePath);
  if (fs.existsSync(filePath)) {
    if (fs.statSync(filePath).isDirectory()) {
      const indexPath = path.join(filePath, "index.html");
      if (fs.existsSync(indexPath)) {
        let html = fs.readFileSync(indexPath, "utf-8");
        // Fix relative paths in HTML
        html = html.replace(
          /href="style\.css"/g,
          `href="/${slugPath}/style.css"`
        );
        html = html.replace(
          /src="script\.js"/g,
          `src="/${slugPath}/script.js"`
        );
        html = html.replace(
          /href="\.\/style\.css"/g,
          `href="/${slugPath}/style.css"`
        );
        html = html.replace(
          /src="\.\/script\.js"/g,
          `src="/${slugPath}/script.js"`
        );
        res.setHeader("Content-Type", "text/html");
        res.status(200).send(html);
        return;
      }
    } else if (fs.statSync(filePath).isFile()) {
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
        ".gif": "image/gif",
        ".webp": "image/webp",
        ".ico": "image/x-icon",
        ".woff": "font/woff",
        ".woff2": "font/woff2",
        ".ttf": "font/ttf",
        ".mp4": "video/mp4",
        ".webm": "video/webm",
      };
      res.setHeader(
        "Content-Type",
        mimeTypes[ext] || "application/octet-stream"
      );
      const fileContent = fs.readFileSync(filePath);
      res.status(200).send(fileContent);
      return;
    }
  }

  res.status(404).send("Not Found");
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
