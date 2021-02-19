const path = require('path');

const FileHelper = require('./files/helper');
const Packager = require('./packages/Packager');
const BundlerFactory = require('./bundlers/BundlerFactory');
const TranspilerFactory = require('./transpilers/TranspilerFactory');

function SvelteApplication(opts) {

    this.appTemplate = {
        filesRoot: './svelte',
        filesToCopy: [
            { src: '/index.html', dst: `/public/index.html` },
            { src: '/favicon.png', dst: `/public/favicon.png` },
            { src: '/global.css', dst: `/public/global.css` },
            { src: '/App.svelte', dst: `/src/App.svelte` },
            { src: '/main.js', dst: `/src/main.js` },
            { src: '/gitignore', dst: `/.gitignore` }
        ]
    }
    this.o = opts;
    this.name = this.o.name;
    this.dir = path.resolve(this.o.name);
    this.fh = new FileHelper(this.appTemplate.filesRoot, this.dir);
    this.packager = new Packager(this);
    this.bundler = new BundlerFactory(this).create();
    this.transpiler = new TranspilerFactory(this).create();
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