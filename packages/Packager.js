const path = require('path');
const os = require('os');
const allPackages = require('./package-definitions.json');

function Packager(app) {
    this.app = app;
    this.fileName = 'package.json';
    this.packageJson = require('./package.json');
    this.packageJson.name = app.name;
}

Packager.prototype = {
    export: function () {
        this.app.fh.wf(
            path.join(this.app.dir, this.fileName),
            JSON.stringify(this.packageJson, null, 2) + os.EOL
        );
    },
    // Add dependency
    ad: function (name, version, isDev) {
        let pkg = allPackages.find(p=> p.n === name);
        if (!pkg)  {
           return null;
        }
        version = version ? version : pkg.v;
        let section = isDev ? 'devDependencies' : 'dependencies';
        this.packageJson[section][name] = '^' + version;
        return pkg.i;
    },
    // Add devDependency   
    add:
        function _add(name, version) {
            return this.ad(name, version, true);
        },
    // Add script
    s: function _s(key, value, pkgs) {
        this.packageJson.scripts[key] = value;
        if (pkgs){
            pkgs.map(pkg=> this.add(pkg));
        }
    }
}

module.exports = Packager;