const fs = require('fs-extra');
const path = require('path');
const Handlebars = require('handlebars');

function FileHelper(srcRoot, dstRoot) {
    this.copySourceRoot = srcRoot;
    this.copyDestRoot = dstRoot;
}

FileHelper.prototype = {
    // Read file
    rf: function (filePath){
        return fs.readFileSync(filePath, 'utf8');
    },
    // Read template files
    rtf: function (filePath){
        const rSrcDir = path.join(__dirname, this.copySourceRoot);
        return this.rf(`${rSrcDir}/${filePath}`);
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
        filePath = filePath.replace(/^\/\//, '/');
        this.wf(`${this.copyDestRoot}/${filePath}`, content);
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
    },
    // Export compiled file (filePath is for a template file)
    etf: function(filePath, options, dst) {
        let template = this.rtf(filePath);
        template = Handlebars.compile(template)(options);
        let saveTo = dst ? dst : this.fileMap.find(t=> t.src == filePath).dst;
        this.wpf(saveTo, template);
    }
}

module.exports = FileHelper;