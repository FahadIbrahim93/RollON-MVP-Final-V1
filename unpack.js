const fs = require('fs');
const path = require('path');

const mapFilePath = process.argv[2];
const outDir = process.argv[3];

if (!mapFilePath || !outDir) {
    console.error("Usage: node unpack.js <mapfile> <outdir>");
    process.exit(1);
}

const mapData = JSON.parse(fs.readFileSync(mapFilePath, 'utf8'));

console.log('Total Sources:', mapData.sources.length);
console.log('Has Source Content:', !!mapData.sourcesContent);

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

let extracted = 0;

mapData.sources.forEach((sourcePath, index) => {
    if (sourcePath && mapData.sourcesContent && mapData.sourcesContent[index]) {
        // Basic sanitization of webpack/vite sourcemap paths
        let cleanPath = sourcePath;
        if (cleanPath.startsWith('webpack://')) cleanPath = cleanPath.substring(10);
        // Ignore node_modules generally or just dump them in a subfolder
        if (cleanPath.includes('node_modules')) {
            return; // Skip third party libs to focus on user code
        }

        // Remove query params or weird chars
        cleanPath = cleanPath.split('?')[0];

        // Remove ".." and other relative pathing that can escape outDir
        cleanPath = cleanPath.replace(/\.\.\//g, '');

        // Resolve absolute path safely within outDir
        const safePath = path.join(outDir, cleanPath.replace(/[:*?"<>|]/g, '_'));

        try {
            const dir = path.dirname(safePath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(safePath, mapData.sourcesContent[index]);
            extracted++;
        } catch (e) {
            console.error("Failed to write:", cleanPath, e.message);
        }
    }
});

console.log(`Successfully extracted ${extracted} original source files (excluding node_modules) into ${outDir}`);
