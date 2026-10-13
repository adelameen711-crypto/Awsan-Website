const fs = require('fs');
const path = require('path');

const dirPath = __dirname;
const htmlFile = path.join(dirPath, 'index.html');
const cssFile = path.join(dirPath, 'style.css');
const jsFile = path.join(dirPath, 'script.js');

let htmlContent = fs.readFileSync(htmlFile, 'utf8');

// 1. Extract CSS
const styleRegex = /<style>([\s\S]*?)<\/style>/;
const styleMatch = htmlContent.match(styleRegex);

if (styleMatch) {
    const cssContent = styleMatch[1];
    fs.writeFileSync(cssFile, cssContent.trim() + '\n', 'utf8');
    htmlContent = htmlContent.replace(styleRegex, '<link rel="stylesheet" href="style.css" />');
}

// 2. Extract JS
const scriptRegex = /<script>([\s\S]*?)<\/script>/g;
let jsContent = '';
let isFirstScript = true;

htmlContent = htmlContent.replace(scriptRegex, (match, p1) => {
    jsContent += p1.trim() + '\n\n';
    if (isFirstScript) {
        isFirstScript = false;
        return '<script src="script.js"></script>';
    }
    return '';
});

// Clean up extra empty lines caused by removing scripts
htmlContent = htmlContent.replace(/(\n\s*){3,}/g, '\n\n');

if (jsContent) {
    fs.writeFileSync(jsFile, jsContent.trim() + '\n', 'utf8');
}

fs.writeFileSync(htmlFile, htmlContent, 'utf8');

console.log('Extraction completed successfully.');
