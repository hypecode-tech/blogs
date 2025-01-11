const fs = require('fs');
const path = require('path');
const baseDir = './';
const baseUrl = 'https://hypecode.tech/blog';

// Process each folder in the baseDir
const processFolders = (dir) => {
  fs.readdirSync(dir).forEach(folder => {
    const folderPath = path.join(dir, folder);
    const stat = fs.statSync(folderPath);

    if (stat.isDirectory()) {
      const slug = folder; // Use folder name as slug
      const link = `${baseUrl}/${slug}`;

      // Look for README.md in the folder
      const readmePath = path.join(folderPath, 'README.md');
      if (fs.existsSync(readmePath)) {
        const content = fs.readFileSync(readmePath, 'utf-8');
        const updatedContent = content.replace(/<!-- SLUG:.*? -->/, `<!-- SLUG: ${link} -->`);
        fs.writeFileSync(readmePath, updatedContent, 'utf-8');
        console.log(`Updated SLUG for: ${folder}`);
      }
    }
  });
};

processFolders(baseDir);
