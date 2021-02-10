#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const child_process = require('child_process');

const args = process.argv.slice(2);
const appName = args[0];
const root = path.resolve(appName);
const templateFolder = path.join(__dirname,'templates/default');
const packageJson = JSON.parse(fs.readFileSync(path.join(templateFolder, 'package.json')));
packageJson.name = appName;
packageJson.version = '0.1.0';

fs.ensureDirSync(appName);
fs.copySync(templateFolder, appName);
fs.rename(path.join(appName, 'gitignore'), path.join(appName, '.gitignore'));
fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(packageJson, null, 2) + os.EOL
);

child_process.execSync('npm install --prefix ' + appName, {stdio:[0,1,2]} );
