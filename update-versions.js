/**
 * UPDATE CACHE BUSTING VERSIONS
 * ==============================
 * Updates version numbers in HTML files to force browser cache refresh
 * 
 * Usage: node update-versions.js
 */

const fs = require('fs');
const path = require('path');

const FILES_TO_UPDATE = [
    './partners.html',
    './projects.html',
    './property.html'
];

function updateVersions() {
    const timestamp = Date.now();
    let filesUpdated = 0;

    console.log('🔄 Updating cache-busting versions...\n');

    FILES_TO_UPDATE.forEach(filePath => {
        if (!fs.existsSync(filePath)) {
            console.log(`⚠️  Skipping ${filePath} (not found)`);
            return;
        }

        let content = fs.readFileSync(filePath, 'utf8');
        let updated = false;

        // Update partners.js version
        const partnersRegex = /(<script\s+src="\/static\/js\/partners\.js)(\?v=\d+)?(">)/g;
        if (content.match(partnersRegex)) {
            content = content.replace(partnersRegex, `$1?v=${timestamp}$3`);
            updated = true;
            console.log(`✓ ${filePath} - Updated partners.js version`);
        }

        // Update properties.js version
        const propertiesRegex = /(<script\s+src="\/static\/js\/properties\.js)(\?v=\d+)?(">)/g;
        if (content.match(propertiesRegex)) {
            content = content.replace(propertiesRegex, `$1?v=${timestamp}$3`);
            updated = true;
            console.log(`✓ ${filePath} - Updated properties.js version`);
        }

        if (updated) {
            fs.writeFileSync(filePath, content);
            filesUpdated++;
        }
    });

    console.log(`\n✅ Updated ${filesUpdated} file(s) with version: ${timestamp}`);
}

try {
    updateVersions();
} catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
}