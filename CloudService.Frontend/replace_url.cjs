const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace 'http://localhost:5154...' with `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5154'}...`
  // Handle single quotes
  content = content.replace(/'http:\/\/localhost:5154([^']*)'/g, '`${process.env.NEXT_PUBLIC_API_BASE_URL || \'http://localhost:5154\'}$1`');
  
  // Handle double quotes
  content = content.replace(/"http:\/\/localhost:5154([^"]*)"/g, '`${process.env.NEXT_PUBLIC_API_BASE_URL || \'http://localhost:5154\'}$1`');
  
  // Handle template literals
  content = content.replace(/`http:\/\/localhost:5154([^`]*)`/g, '`${process.env.NEXT_PUBLIC_API_BASE_URL || \'http://localhost:5154\'}$1`');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated: ' + filePath);
  }
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      replaceInFile(fullPath);
    }
  }
}

walk(srcDir);
