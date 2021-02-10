#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');
const { Command, Option } = require('commander');
const packageJson = require('./package.json');

let appName;

const program = new Command(packageJson.name)
.usage('<project-name> [options]')
.version(packageJson.version)
.arguments('[project-name]')
.action(name => {
    if (!name) { 
        console.error(`${os.EOL}please specify a project name.${os.EOL}`); 
        process.exit(1);
    }
    appName = name;
 })
 .addOption(new Option('-t, --template <project-template>', 'specify a project template for the project').default('default').choices(['default', 'typescript', 'ts']))
.allowUnknownOption()
.parse(process.argv);

const options = program.opts();

const projectFolder = path.resolve(appName);
options.template = options.template.replace('ts', 'typescript');
const templateFolder = path.join(__dirname,`templates/${options.template}`);
const templatePackageJson = JSON.parse(fs.readFileSync(path.join(templateFolder, 'package.json')));
templatePackageJson.name = appName;
templatePackageJson.version = '0.1.0';

fs.ensureDirSync(appName);
fs.copySync(templateFolder, appName);
fs.rename(path.join(appName, 'gitignore'), path.join(appName, '.gitignore'));
fs.writeFileSync(
    path.join(projectFolder, 'package.json'),
    JSON.stringify(templatePackageJson, null, 2) + os.EOL
);

const spawnOpts = {
    cwd: projectFolder,
    env: process.env,
    stdio:[0, 1, 2],
    shell:true
  };

spawn('npm', ['install'], spawnOpts);

