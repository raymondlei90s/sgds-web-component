import { chromium } from '@playwright/test';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function generateFavicon() {
  console.log('🎨 Generating DocsWhisperer favicon...');

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 512, height: 512 }
  });

  // Create SVG HTML
  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; padding: 0; }
    svg { display: block; }
  </style>
</head>
<body>
  <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
    <!-- Background gradient -->
    <defs>
      <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#5925DC;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#1F69FF;stop-opacity:1" />
      </linearGradient>
      <linearGradient id="cornerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#4A1EB8;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#1854CC;stop-opacity:1" />
      </linearGradient>
    </defs>

    <!-- Background -->
    <rect width="512" height="512" fill="url(#bgGradient)" rx="80"/>

    <!-- Document icon -->
    <g>
      <!-- Main document -->
      <rect x="128" y="77" width="179" height="333" fill="white" rx="8"/>

      <!-- Folded corner -->
      <path d="M 307 77 L 266 77 L 307 118 Z" fill="url(#cornerGradient)"/>

      <!-- Document lines -->
      <line x1="153" y1="128" x2="282" y2="128" stroke="#5925DC" stroke-width="5" stroke-linecap="round"/>
      <line x1="153" y1="169" x2="282" y2="169" stroke="#5925DC" stroke-width="5" stroke-linecap="round"/>
      <line x1="153" y1="210" x2="282" y2="210" stroke="#5925DC" stroke-width="5" stroke-linecap="round"/>
      <line x1="153" y1="251" x2="282" y2="251" stroke="#5925DC" stroke-width="5" stroke-linecap="round"/>
      <line x1="153" y1="292" x2="245" y2="292" stroke="#5925DC" stroke-width="5" stroke-linecap="round"/>
    </g>

    <!-- Whisper waves -->
    <g stroke="white" stroke-width="7" fill="none" stroke-linecap="round">
      <path d="M 328 226 Q 349 226 349 256 Q 349 286 328 286" opacity="1.0"/>
      <path d="M 349 205 Q 390 205 390 256 Q 390 307 349 307" opacity="0.75"/>
      <path d="M 370 184 Q 431 184 431 256 Q 431 328 370 328" opacity="0.5"/>
    </g>

    <!-- "DW" monogram -->
    <text x="460" y="470" font-family="Arial, sans-serif" font-size="61" font-weight="bold" fill="white" text-anchor="end">DW</text>
  </svg>
</body>
</html>
  `;

  // Set HTML content
  await page.setContent(html);
  await page.waitForTimeout(500);

  // Take screenshot
  const outputPath = path.join(__dirname, '../mintlify-docs/favicon.png');
  await page.screenshot({
    path: outputPath,
    omitBackground: false
  });

  await browser.close();

  console.log('✅ Favicon generated at:', outputPath);
  console.log('📏 Size: 512x512px');
  console.log('🎨 Design: Document with whisper waves (DocsWhisperer)');
}

generateFavicon().catch(console.error);
