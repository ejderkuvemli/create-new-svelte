const fs = require('fs-extra');
const path = require('path');
const os = require('os');

const args = process.argv.slice(2);
const appName = args[0];
const root = path.resolve(appName);

const packageJson = {
    name: appName,
    version: '0.0.1',
    private: true,
};

fs.ensureDirSync(appName);

fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(packageJson, null, 2) + os.EOL
);

