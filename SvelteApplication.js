const path = require('path');

const FileHelper = require('./files/helper');
const Packager = require('./packages/Packager');

function SvelteApplication(opts) {

    this.appTemplate = {
        filesRoot: './svelte',
        filesToCopy: [
            { src: '/index.html.hbs', dst: `/public/index.html` },
            { src: '/favicon.png', dst: `/public/favicon.png` },
            { src: '/global.css', dst: `/public/global.css` },
            { src: '/main.js', dst: `/src/main.js` },
            { src: '/gitignore', dst: `/.gitignore` }
        ]
    }
    this.o = opts;
    this.name = this.o.name;
    this.dir = path.resolve(this.o.name);
    this.fh = new FileHelper(this.appTemplate.filesRoot, this.dir);
    this.packager = new Packager(this);
    const Bundler = require(`./bundlers/${this.o.bundler}`);
    this.bundler = new Bundler(this);
    const Transpiler = require(`./transpilers/${this.o.transpiler}`);
    this.transpiler = new Transpiler(this)
    this.appTemplate.filesToCopy.map(file => { this.fh.cf(file.src, file.dst); });
    this.create = function () {
        this.fh.cd(this.dir);
        this.packager.export();
        this.bundler.export();
        this.transpiler.modifyFiles();
        this.transpiler.exportConfig();
    }
}

SvelteApplication.prototype = {
    needsPreprocess: function () {
        return this.o.transpiler != 'none';
    }
}

module.exports = SvelteApplication;