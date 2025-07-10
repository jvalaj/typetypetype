#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 TypeTypeType Build Script');
console.log('=============================\n');

// Check if node_modules exists
if (!fs.existsSync('node_modules')) {
    console.log('📦 Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });
}

// Get platform argument
const platform = process.argv[2];

if (!platform) {
    console.log('Usage: node build.js [win|mac|linux|all]');
    console.log('\nOptions:');
    console.log('  win    - Build for Windows (.exe)');
    console.log('  mac    - Build for macOS (.app)');
    console.log('  linux  - Build for Linux (AppImage)');
    console.log('  all    - Build for all platforms');
    process.exit(1);
}

const platforms = platform === 'all' ? ['win', 'mac', 'linux'] : [platform];

console.log(`🔨 Building for: ${platforms.join(', ')}\n`);

platforms.forEach(p => {
    console.log(`📱 Building for ${p.toUpperCase()}...`);
    try {
        execSync(`npm run build:${p}`, { stdio: 'inherit' });
        console.log(`✅ ${p.toUpperCase()} build completed!\n`);
    } catch (error) {
        console.error(`❌ ${p.toUpperCase()} build failed!\n`);
    }
});

console.log('🎉 Build process completed!');
console.log('📁 Check the "dist" folder for your builds.'); 