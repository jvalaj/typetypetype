#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');

console.log('🚀 TypeTypeType Development Server');
console.log('==================================\n');

// Check if node_modules exists
if (!fs.existsSync('node_modules')) {
    console.log('📦 Installing dependencies...');
    const install = spawn('npm', ['install'], { stdio: 'inherit' });
    install.on('close', (code) => {
        if (code === 0) {
            startDev();
        } else {
            console.error('❌ Failed to install dependencies');
            process.exit(1);
        }
    });
} else {
    startDev();
}

function startDev() {
    console.log('🔥 Starting development server...\n');
    
    const electron = spawn('npm', ['start'], { 
        stdio: 'inherit',
        shell: true
    });
    
    electron.on('close', (code) => {
        console.log(`\n👋 Development server stopped (code: ${code})`);
    });
    
    // Handle process termination
    process.on('SIGINT', () => {
        console.log('\n🛑 Stopping development server...');
        electron.kill('SIGINT');
    });
    
    process.on('SIGTERM', () => {
        console.log('\n🛑 Stopping development server...');
        electron.kill('SIGTERM');
    });
} 