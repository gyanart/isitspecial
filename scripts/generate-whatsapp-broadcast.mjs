import fs from 'fs';
import path from 'path';

// WhatsApp Channel Broadcast Generator for IsItSpecial
const blogDir = path.resolve('src/content/blog');
const storeTag = 'isitspecial-21';
const channelUrl = 'https://whatsapp.com/channel/0029VbE0Bs69Gv7SoqV89q04';

// Find the latest MDX file in blog
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'));
if (files.length === 0) {
  console.log('No articles found in src/content/blog');
  process.exit(1);
}

// Read target file (first arg or most recent)
const targetFile = process.argv[2] ? `${process.argv[2]}.mdx` : files[0];
const filePath = path.join(blogDir, targetFile);

if (!fs.existsSync(filePath)) {
  console.error(`File not found: ${filePath}`);
  process.exit(1);
}

const content = fs.readFileSync(filePath, 'utf8');

// Parse frontmatter fields
function getField(name) {
  const match = content.match(new RegExp(`^${name}:\\s*["']?([^"'\n\r]+)["']?`, 'm'));
  return match ? match[1].trim() : '';
}

const title = getField('title');
const description = getField('description');
const specialScore = getField('specialScore') || '9.5';
const specialVerdict = getField('specialVerdict') || 'Modern Masterpiece';
const category = getField('category') || 'Everyday Curiosities';
const slug = path.basename(targetFile, '.mdx');

// Find productKeyword or affiliateUrl in content
const kwMatch = content.match(/productKeyword=["']([^"']+)["']/);
const kw = kwMatch ? kwMatch[1] : title.split(' ')[0];

const blogUrl = `https://www.isitspecial.com/blog/${slug}`;
const amazonIndiaUrl = `https://www.amazon.in/s?k=${encodeURIComponent(kw)}&tag=${storeTag}`;
const amazonGlobalUrl = `https://www.amazon.com/s?k=${encodeURIComponent(kw)}&tag=${storeTag}`;

const broadcastMessage = `
⚡ *NEW TEARDOWN ON IS IT SPECIAL?*
━━━━━━━━━━━━━━━━━━━━
🔍 *${title}*

📊 *Special Index Verdict:* ${specialVerdict} (${specialScore}/10)
📂 *Category:* ${category}

📝 *Summary:*
${description}

━━━━━━━━━━━━━━━━━━━━
📖 *Read the Full Unvarnished Teardown:*
👉 ${blogUrl}

🛒 *Check Real-Time Stock & Prices on Amazon:*
🇮🇳 India: ${amazonIndiaUrl}
🌍 Global: ${amazonGlobalUrl}

━━━━━━━━━━━━━━━━━━━━
✨ *Join our official WhatsApp channel for honest teardown alerts:*
${channelUrl}
`.trim();

console.log('\n======================================================');
console.log('📢 READY-TO-PASTE WHATSAPP CHANNEL BROADCAST MESSAGE');
console.log('======================================================\n');
console.log(broadcastMessage);
console.log('\n======================================================');
console.log('👉 Tip: Copy the text above and paste directly into:');
console.log(`   ${channelUrl}`);
console.log('======================================================\n');
