const fs = require('fs-extra');
const path = require('path');

function FileHelper(srcRoot, dstRoot) {
    this.copySourceRoot = srcRoot;
    this.copyDestRoot = dstRoot;
}

FileHelper.prototype = {
    // Read file
    rf: function (filePath){
        return fs.readFileSync(filePath, 'utf8');
    },
    // Read project file
    rpf: function (filePath){
        return this.rf(`${this.copyDestRoot}${filePath}`);
    },
    // Write file
    wf: function (filePath, content) {
        fs.writeFileSync(filePath, content);
    },
    // Write project file
    wpf: function (filePath, content) {
        this.wf(`${this.copyDestRoot}${filePath}`, content);
    },
    // Copy file
    cf: function (src, dst) {
        const rSrcDir = path.join(__dirname, this.copySourceRoot);
        fs.copySync(`${rSrcDir}${src}`, `${this.copyDestRoot}${dst}`);
    },
    // Ensure the directory exists
    cd: function (dir){
        fs.ensureDirSync(dir);
    },
    // Rename file
    rn: function(oldPath, newPath) {
        fs.renameSync(`${this.copyDestRoot}${oldPath}`, `${this.copyDestRoot}${newPath}`);
    }
}

module.exports = FileHelper;