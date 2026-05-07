import { chromium } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function generateLogo(theme) {
  const isDark = theme === 'dark';
  const textColor = isDark ? '#FFFFFF' : '#1A1A1A';
  const accentColor = isDark ? '#8B5CF6' : '#5925DC';

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; padding: 0; background: transparent; }
    svg { display: block; }
  </style>
</head>
<body>
  <svg width="800" height="200" xmlns="http://www.w3.org/2000/svg">
    <!-- Document icon -->
    <g transform="translate(20, 30)">
      <!-- Main document -->
      <rect x="0" y="0" width="100" height="140" fill="${accentColor}" rx="6"/>

      <!-- Folded corner -->
      <path d="M 100 0 L 75 0 L 100 25 Z" fill="${isDark ? '#6D28D9' : '#4A1EB8'}"/>

      <!-- Document lines -->
      <line x1="15" y1="30" x2="80" y2="30" stroke="white" stroke-width="4" stroke-linecap="round" opacity="0.8"/>
      <line x1="15" y1="50" x2="80" y2="50" stroke="white" stroke-width="4" stroke-linecap="round" opacity="0.8"/>
      <line x1="15" y1="70" x2="80" y2="70" stroke="white" stroke-width="4" stroke-linecap="round" opacity="0.8"/>
      <line x1="15" y1="90" x2="60" y2="90" stroke="white" stroke-width="4" stroke-linecap="round" opacity="0.8"/>
    </g>

    <!-- Whisper waves -->
    <g transform="translate(130, 100)" stroke="${accentColor}" stroke-width="5" fill="none" stroke-linecap="round">
      <path d="M 0 -15 Q 12 -15 12 0 Q 12 15 0 15" opacity="0.9"/>
      <path d="M 12 -25 Q 32 -25 32 0 Q 32 25 12 25" opacity="0.7"/>
      <path d="M 24 -35 Q 52 -35 52 0 Q 52 35 24 35" opacity="0.5"/>
    </g>

    <!-- Text: DocsWhisperer -->
    <text x="210" y="115" font-family="'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif"
          font-size="56" font-weight="700" fill="${textColor}" letter-spacing="-1">
      DocsWhisperer
    </text>
  </svg>
</body>
</html>
  `;

  return html;
}

async function generateLogos() {
  console.log('🎨 Generating DocsWhisperer logos...');

  const browser = await chromium.launch();

  // Generate light logo
  const lightPage = await browser.newPage({
    viewport: { width: 800, height: 200 }
  });
  await lightPage.setContent(await generateLogo('light'));
  await lightPage.waitForTimeout(300);
  const lightPath = path.join(__dirname, '../mintlify-docs/logo-light.svg');

  // For SVG, we'll create it directly
  const lightSVG = `<svg width="800" height="200" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(20, 30)">
      <rect x="0" y="0" width="100" height="140" fill="#5925DC" rx="6"/>
      <path d="M 100 0 L 75 0 L 100 25 Z" fill="#4A1EB8"/>
      <line x1="15" y1="30" x2="80" y2="30" stroke="white" stroke-width="4" stroke-linecap="round" opacity="0.8"/>
      <line x1="15" y1="50" x2="80" y2="50" stroke="white" stroke-width="4" stroke-linecap="round" opacity="0.8"/>
      <line x1="15" y1="70" x2="80" y2="70" stroke="white" stroke-width="4" stroke-linecap="round" opacity="0.8"/>
      <line x1="15" y1="90" x2="60" y2="90" stroke="white" stroke-width="4" stroke-linecap="round" opacity="0.8"/>
    </g>
    <g transform="translate(130, 100)" stroke="#5925DC" stroke-width="5" fill="none" stroke-linecap="round">
      <path d="M 0 -15 Q 12 -15 12 0 Q 12 15 0 15" opacity="0.9"/>
      <path d="M 12 -25 Q 32 -25 32 0 Q 32 25 12 25" opacity="0.7"/>
      <path d="M 24 -35 Q 52 -35 52 0 Q 52 35 24 35" opacity="0.5"/>
    </g>
    <text x="210" y="115" font-family="'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif"
          font-size="56" font-weight="700" fill="#1A1A1A" letter-spacing="-1">DocsWhisperer</text>
  </svg>`;

  const darkSVG = `<svg width="800" height="200" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(20, 30)">
      <rect x="0" y="0" width="100" height="140" fill="#8B5CF6" rx="6"/>
      <path d="M 100 0 L 75 0 L 100 25 Z" fill="#6D28D9"/>
      <line x1="15" y1="30" x2="80" y2="30" stroke="white" stroke-width="4" stroke-linecap="round" opacity="0.8"/>
      <line x1="15" y1="50" x2="80" y2="50" stroke="white" stroke-width="4" stroke-linecap="round" opacity="0.8"/>
      <line x1="15" y1="70" x2="80" y2="70" stroke="white" stroke-width="4" stroke-linecap="round" opacity="0.8"/>
      <line x1="15" y1="90" x2="60" y2="90" stroke="white" stroke-width="4" stroke-linecap="round" opacity="0.8"/>
    </g>
    <g transform="translate(130, 100)" stroke="#8B5CF6" stroke-width="5" fill="none" stroke-linecap="round">
      <path d="M 0 -15 Q 12 -15 12 0 Q 12 15 0 15" opacity="0.9"/>
      <path d="M 12 -25 Q 32 -25 32 0 Q 32 25 12 25" opacity="0.7"/>
      <path d="M 24 -35 Q 52 -35 52 0 Q 52 35 24 35" opacity="0.5"/>
    </g>
    <text x="210" y="115" font-family="'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif"
          font-size="56" font-weight="700" fill="#FFFFFF" letter-spacing="-1">DocsWhisperer</text>
  </svg>`;

  const fs = await import('fs/promises');
  await fs.writeFile(lightPath, lightSVG, 'utf-8');
  console.log('✅ Light logo generated at:', lightPath);

  const darkPath = path.join(__dirname, '../mintlify-docs/logo-dark.svg');
  await fs.writeFile(darkPath, darkSVG, 'utf-8');
  console.log('✅ Dark logo generated at:', darkPath);

  await browser.close();

  console.log('🎨 Logo design: Document with whisper waves + "DocsWhisperer" text');
}

generateLogos().catch(console.error);
