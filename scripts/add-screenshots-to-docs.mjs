import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS_DIR = path.join(__dirname, '../mintlify-docs');

// Component list
const COMPONENTS = [
  'accordion', 'alert', 'badge', 'breadcrumb', 'button', 'card', 'checkbox',
  'close-button', 'combo-box', 'datepicker', 'description-list', 'divider', 'drawer',
  'dropdown', 'file-upload', 'footer', 'icon', 'icon-button', 'icon-card', 'icon-list',
  'image-card', 'input', 'link', 'mainnav', 'masthead', 'modal', 'overflow-menu',
  'pagination', 'progress-bar', 'quantity-toggle', 'radio', 'select', 'sidebar',
  'sidenav', 'skeleton', 'spinner', 'stepper', 'subnav', 'switch', 'system-banner',
  'tab', 'table', 'table-of-contents', 'textarea', 'thumbnail-card', 'toast', 'tooltip'
];

async function addScreenshotsToComponents() {
  console.log('📝 Adding screenshots to component documentation...\n');

  for (const component of COMPONENTS) {
    try {
      const mdxPath = path.join(DOCS_DIR, 'components', `${component}.mdx`);

      // Check if file exists
      try {
        await fs.access(mdxPath);
      } catch {
        console.log(`  ⏭️  Skipping ${component} (file not found)`);
        continue;
      }

      // Read the file
      let content = await fs.readFile(mdxPath, 'utf-8');

      // Convert component name for image path (remove hyphens, lowercase)
      const imageComponentName = component.replace(/-/g, '').toLowerCase();
      const imagePath = `/images/components/${imageComponentName}/default.png`;
      const imageTag = `\n<img src="${imagePath}" alt="${component} component preview" />\n`;

      // Check if image already exists in content
      if (content.includes('<img') || content.includes('![')) {
        console.log(`  ⏭️  ${component} already has image`);
        continue;
      }

      // Find the first section after frontmatter (look for ## heading)
      const firstHeadingMatch = content.match(/\n(## .+)/);

      if (firstHeadingMatch) {
        // Insert image before the first heading
        const insertPosition = content.indexOf(firstHeadingMatch[0]);
        content = content.slice(0, insertPosition) + imageTag + content.slice(insertPosition);
      } else {
        // If no heading found, insert after frontmatter and description
        const lines = content.split('\n');
        let insertIndex = 0;
        let inFrontmatter = false;

        for (let i = 0; i < lines.length; i++) {
          if (lines[i] === '---') {
            if (!inFrontmatter) {
              inFrontmatter = true;
            } else {
              // Found closing frontmatter
              insertIndex = i + 1;
              // Skip description line
              if (lines[i + 1]) insertIndex = i + 2;
              break;
            }
          }
        }

        lines.splice(insertIndex, 0, imageTag);
        content = lines.join('\n');
      }

      // Write the updated content
      await fs.writeFile(mdxPath, content, 'utf-8');
      console.log(`  ✅ ${component}`);

    } catch (error) {
      console.error(`  ❌ Failed to update ${component}:`, error.message);
    }
  }

  console.log('\n✅ Screenshot references added to component documentation!');
}

addScreenshotsToComponents().catch(console.error);
