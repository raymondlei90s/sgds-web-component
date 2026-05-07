import { chromium } from '@playwright/test';
import { promises as fs } from 'fs';
import path from 'path';

const STORYBOOK_URL = 'http://localhost:6006';
const OUTPUT_DIR = './mintlify-docs/images';
const VIEWPORT = { width: 1280, height: 720 };

// Component list - all 47 components
const COMPONENTS = [
  'Accordion', 'Alert', 'Badge', 'Breadcrumb', 'Button', 'Card', 'Checkbox',
  'CloseButton', 'ComboBox', 'Datepicker', 'DescriptionList', 'Divider', 'Drawer',
  'Dropdown', 'FileUpload', 'Footer', 'Icon', 'IconButton', 'IconCard', 'IconList',
  'ImageCard', 'Input', 'Link', 'Mainnav', 'Masthead', 'Modal', 'OverflowMenu',
  'Pagination', 'ProgressBar', 'QuantityToggle', 'Radio', 'Select', 'Sidebar',
  'Sidenav', 'Skeleton', 'Spinner', 'Stepper', 'Subnav', 'Switch', 'SystemBanner',
  'Tab', 'Table', 'TableOfContents', 'Textarea', 'ThumbnailCard', 'Toast', 'Tooltip'
];

// Block patterns
const PATTERNS = {
  'hero': ['hero', 'hero-center', 'hero-fullbleed', 'hero-image', 'hero-bg-image', 'hero-bg-image-light'],
  'cta': ['contained-primary', 'contained-primary-center', 'contained-raised', 'contained-raised-center',
          'fullbleed-primary', 'fullbleed-primary-center', 'fullbleed-alternate', 'fullbleed-alternate-center'],
  'feature': ['feature-4-8-img-left', 'feature-4-8-img-right', 'feature-6-6-img-left', 'feature-6-6-img-right',
              'feature-8-4-img-left', 'feature-8-4-img-right', 'feature-no-img-center', 'feature-no-img-left'],
  'cards': ['cards-3', 'cards-4'],
  'stats': ['stats-3', 'stats-4', 'stats-5', 'stats-right-6', 'stats-right-8'],
  'form': ['basic-center', 'basic-left', 'basic-right', 'form-multistep-stepper'],
  'header': ['page-header', 'page-header-breadcrumb'],
  'filter': ['filter', 'filter-checkboxes']
};

// Utilities
const UTILITIES = [
  'background-color', 'border-color', 'border-radius', 'border-width',
  'opacity', 'typography', 'spacing', 'elevation'
];

async function captureScreenshots() {
  console.log('🚀 Starting screenshot capture...');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: VIEWPORT });

  try {
    // Wait for Storybook to be ready
    console.log('⏳ Waiting for Storybook to load...');
    await page.goto(STORYBOOK_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Capture component screenshots
    console.log('\n📸 Capturing component screenshots...');
    for (const component of COMPONENTS) {
      await captureComponent(page, component);
    }

    // Capture pattern screenshots
    console.log('\n📸 Capturing pattern screenshots...');
    for (const [category, patterns] of Object.entries(PATTERNS)) {
      for (const pattern of patterns) {
        await capturePattern(page, category, pattern);
      }
    }

    // Capture utility screenshots
    console.log('\n📸 Capturing utility screenshots...');
    for (const utility of UTILITIES) {
      await captureUtility(page, utility);
    }

    console.log('\n✅ Screenshot capture complete!');
  } catch (error) {
    console.error('❌ Error during screenshot capture:', error);
  } finally {
    await browser.close();
  }
}

async function captureComponent(page, componentName) {
  try {
    const componentDir = path.join(OUTPUT_DIR, 'components', componentName.toLowerCase());
    await fs.mkdir(componentDir, { recursive: true });

    // Navigate to component story
    const storyUrl = `${STORYBOOK_URL}/?path=/story/components-${componentName.toLowerCase()}--basic`;
    console.log(`  📷 ${componentName}...`);

    await page.goto(storyUrl, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);

    // Wait for the iframe to load
    const iframe = page.locator('iframe[id="storybook-preview-iframe"]');
    await iframe.waitFor({ timeout: 5000 });

    // Take screenshot of the iframe element
    await iframe.screenshot({
      path: path.join(componentDir, 'default.png')
    });
  } catch (error) {
    console.error(`  ❌ Failed to capture ${componentName}:`, error.message);
  }
}

async function capturePattern(page, category, patternName) {
  try {
    const patternDir = path.join(OUTPUT_DIR, 'patterns', category);
    await fs.mkdir(patternDir, { recursive: true });

    const storyUrl = `${STORYBOOK_URL}/?path=/story/blocks-${category}-${patternName}--default`;
    console.log(`  📷 ${category}/${patternName}...`);

    await page.goto(storyUrl, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);

    // Wait for the iframe to load
    const iframe = page.locator('iframe[id="storybook-preview-iframe"]');
    await iframe.waitFor({ timeout: 5000 });

    // Take screenshot of the iframe element
    await iframe.screenshot({
      path: path.join(patternDir, `${patternName}.png`)
    });
  } catch (error) {
    console.error(`  ❌ Failed to capture ${category}/${patternName}:`, error.message);
  }
}

async function captureUtility(page, utilityName) {
  try {
    const utilityDir = path.join(OUTPUT_DIR, 'utilities');
    await fs.mkdir(utilityDir, { recursive: true });

    const storyUrl = `${STORYBOOK_URL}/?path=/story/utilities-${utilityName}--default`;
    console.log(`  📷 ${utilityName}...`);

    await page.goto(storyUrl, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);

    // Wait for the iframe to load
    const iframe = page.locator('iframe[id="storybook-preview-iframe"]');
    await iframe.waitFor({ timeout: 5000 });

    // Take screenshot of the iframe element
    await iframe.screenshot({
      path: path.join(utilityDir, `${utilityName}.png`)
    });
  } catch (error) {
    console.error(`  ❌ Failed to capture ${utilityName}:`, error.message);
  }
}

// Run the script
captureScreenshots().catch(console.error);
