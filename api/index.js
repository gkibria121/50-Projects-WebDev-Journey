const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
  const currentDir = path.join(process.cwd());
  const folders = fs
    .readdirSync(currentDir, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isDirectory() &&
        entry.name !== "api" &&
        !entry.name.startsWith(".")
    )
    .map((dir) => dir.name);

  const listHtml = folders
    .map(
      (folder, index) => `
      <div class="folder-card" style="animation-delay: ${index * 0.1}s"> 
        <a href="/${folder}" class="folder-link">
          <h3 class="folder-name">${folder}</h3>
          <span class="folder-arrow">→</span>
        </a>
      </div>
    `
    )
    .join("\n");

  const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Directory Explorer</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
        overflow-x: hidden;
        position: relative;
      }

      body::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: 
          radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.3) 0%, transparent 50%);
        pointer-events: none;
        z-index: -1;
      }

      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
        position: relative;
        z-index: 1;
      }

      .header {
        text-align: center;
        margin-bottom: 3rem;
        animation: fadeInUp 0.8s ease-out;
      }

      .title {
        font-size: clamp(2.5rem, 5vw, 4rem);
        font-weight: 800;
        background: linear-gradient(135deg, #fff 0%, #f0f0f0 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 1rem;
        text-shadow: 0 2px 20px rgba(255, 255, 255, 0.3);
      }

      .subtitle {
        font-size: 1.2rem;
        color: rgba(255, 255, 255, 0.8);
        font-weight: 400;
        letter-spacing: 0.5px;
      }

      .folders-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
      }

      .folder-card {
        cursor:pointer;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 20px;
        padding: 2rem;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
        opacity: 0;
        transform: translateY(30px);
        animation: slideInUp 0.6s ease-out forwards;
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
        transition: opacity 0.3s ease;
        border-radius: 20px;
      }

      .folder-card:hover {
        transform: translateY(-10px);
        box-shadow: 
          0 20px 40px rgba(0, 0, 0, 0.2),
          0 0 0 1px rgba(255, 255, 255, 0.3);
      }

      .folder-card:hover::before {
        opacity: 1;
      }

      .folder-icon {
        width: 60px;
        height: 60px;
        margin-bottom: 1.5rem;
        color: rgba(255, 255, 255, 0.9);
        transition: all 0.3s ease;
      }

      .folder-card:hover .folder-icon {
        transform: scale(1.1);
        color: #fff;
      }

      .folder-link {
        text-decoration: none;
        color: inherit;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
      }

      .folder-name {
        font-size: 1.5rem;
        font-weight: 600;
        color: #fff;
        margin: 0;
        transition: all 0.3s ease;
      }

      .folder-arrow {
        font-size: 1.5rem;
        color: rgba(255, 255, 255, 0.6);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        transform: translateX(0);
      }

      .folder-card:hover .folder-arrow {
        transform: translateX(10px);
        color: #fff;
      }

      .empty-state {
        text-align: center;
        padding: 4rem 2rem;
        color: rgba(255, 255, 255, 0.8);
      }

      .empty-icon {
        width: 80px;
        height: 80px;
        margin: 0 auto 2rem;
        opacity: 0.6;
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
        background: rgba(255, 255, 255, 0.05);
        animation: float 6s ease-in-out infinite;
      }

      .shape:nth-child(1) {
        width: 100px;
        height: 100px;
        top: 20%;
        left: 10%;
        animation-delay: 0s;
      }

      .shape:nth-child(2) {
        width: 60px;
        height: 60px;
        top: 60%;
        right: 10%;
        animation-delay: 2s;
      }

      .shape:nth-child(3) {
        width: 80px;
        height: 80px;
        bottom: 20%;
        left: 20%;
        animation-delay: 4s;
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
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
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        33% { transform: translateY(-20px) rotate(120deg); }
        66% { transform: translateY(10px) rotate(240deg); }
      }

      @media (max-width: 768px) {
        .container {
          padding: 1rem;
        }
        
        .folders-grid {
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        
        .folder-card {
          padding: 1.5rem;
        }
      }
    </style>
  </head>
  <body>
    <div class="floating-shapes">
      <div class="shape"></div>
      <div class="shape"></div>
      <div class="shape"></div>
    </div>
    
    <div class="container">
      <div class="header">
        <h1 class="title">Directory Explorer</h1>
        <p class="subtitle">Navigate through your project structure</p>
      </div>
      
      ${
        folders.length > 0
          ? `
        <div class="folders-grid">
          ${listHtml}
        </div>
      `
          : `
        <div class="empty-state">
          <div class="empty-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V8C22 6.89543 21.1046 6 20 6H12L10 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h2>No folders found</h2>
          <p>There are no accessible directories in the current location.</p>
        </div>
      `
      }
    </div>
  </body>
</html>`;

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
};
