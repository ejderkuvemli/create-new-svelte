const path = require('path');

const SvelteConfig = require('./configuration/svelte-config');
const FileHelper = require('./files/helper');
const Packager = require('./packages/Packager');

function SvelteApplication(opts) {

    this.appTemplate = {
        filesRoot: './svelte',
        filesToCopy: [
            { src: '/favicon.png', dst: `/public/favicon.png` },
            { src: '/global.css', dst: `/public/global.css` },
            { src: '/gitignore', dst: `/.gitignore` }
        ],
        fileMap: [
            { src: 'index.html.hbs', dst: `/public/index.html` },
            { src: 'App.svelte.hbs', dst: '/src/App.svelte' },
            { src: 'main.js.hbs', dst: `/src/main.js` }
        ]
    }


    this.o = opts;
    this.name = this.o.name;
    this.dir = path.resolve(this.o.name);
    this.fh = new FileHelper(this.appTemplate.filesRoot, this.dir);
    //this.config = new SvelteConfig(this);
    this.fh.fileMap = this.appTemplate.fileMap;
    this.appTemplate.filesToCopy.map(file => { this.fh.cf(file.src, file.dst); });

    this.packager = new Packager(this);
    const Bundler = require(`./bundlers/${this.o.bundler}`);
    this.bundler = new Bundler(this);
    const Transpiler = require(`./transpilers/${this.o.transpiler}`);
    this.transpiler = new Transpiler(this)

    this.create = function () {
        this.fh.cd(this.dir);
        this.fh.cd(this.dir + '/public');
        this.fh.cd(this.dir + '/src');

        this.packager.export();
        this.bundler.modifyFiles();
        this.bundler.export();

        if (this.transpiler) {
            this.transpiler.modifyFiles();
            this.transpiler.exportConfig();
        }

        if (this.config) {
            this.config.export();
        }

    }
}

SvelteApplication.prototype = {
    needsPreprocess: function () {
        return this.o.transpiler != 'none';
    }
}

module.exports = SvelteApplication;