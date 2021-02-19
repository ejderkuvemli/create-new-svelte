const path = require('path');
const fs = require('fs-extra');

function Bundler(app) {
    this.config = { variables: [], entry: '', imports: [], rules: [], functions: [], plugins: [], extensions: [] }
    this.type = 'es'; //node, es
    this.app = app;
    this.mustExport = true;
    this.fileName = `${this.app.o.bundler}.config.js`;

    this.getFunc = function (func) {
        let imports, needs, requires;
        if (func.prototype) {
            imports = func.prototype.imports;
            needs = func.prototype.needs;
            requires = func.prototype.requires;
            requiresPlugin = func.prototype.requiresPlugin;
        }

        func = func.toString();
        return { body: func.slice(func.indexOf("{") + 1, func.lastIndexOf("}")), imports: imports, needs: needs, requires: requires, requiresPlugin: requiresPlugin };
    }

    this.f = function (func) {
        this.config.functions.push(func.toString());
    }

    this.p = function (plugin) {
        plugin = this.getFunc(plugin);
        this.ap(plugin);
        this.config.plugins.push(plugin.body.trimEnd());
    }

    this.i = function (pkg, name) {
        const importAs = this.app.packager.add(pkg);
        name = name ? name : importAs ? importAs : pkg;
        const i = this.type == 'es' ?
            `import ${Array.isArray(name) ? `{ ${name.join(', ')} }` : name} from '${pkg}';\r\n` :
            `const ${name} = require('${pkg}');\r\n`;;
        this.config.imports.push(i);
    }

    this.in = function (pkg) {
        this.i(pkg, pkg, false);
    }

    this.ap = function (tool) {
        if (tool.imports)
            tool.imports.map(imp => this.i(imp));
        if (tool.needs)
            tool.needs.map(func => this.f(func));
        if (tool.requires)
            tool.requires.map(req => this.app.packager.add(req));
        if (tool.requiresPlugin)
            tool.requiresPlugin.map(req => this.p(req));
    }

    this.transpiler = function (type) { }
    this.export = function () {

        const config = this.config;
        const opts = this.app.o;
        const configTemplate = path.join(__dirname, `./${app.o.bundler}/config.template`);
        if (fs.existsSync(configTemplate)) {

            let template = this.app.fh.rf(configTemplate);
            let plugins = '', rules = '', extensions = '';
            if (config.plugins.length > 0)
                plugins = `,\r\n\tplugins: [\r\n\t${config.plugins.join(',').replace(/\r\n/gm, '\r\n\t')}\r\n\t]`;
            if (config.rules.length > 0)
                rules = `rules: [\r\n\t\t\t${config.rules.join(',').replace(/\r\n/gm, '\r\n\t')}\r\n\t]`;
            if (config.extensions.length > 0)
                extensions = `extensions: [\r\n\t${config.extensions.map((v) => ` '${v}'`)}\r\n\t]`;
            template = template.replace(/\${imports}/, config.imports.join('').trim());
            template = template.replace(/\${variables}/, config.variables.join('\r\n').trim());
            template = template.replace(/\${functions}/, config.functions.join('\r\n').trim());
            template = template.replace(/\${entry}/, config.entry);
            template = template.replace(/\${rules}/, rules);
            template = template.replace(/\${plugins}/, plugins);
            template = template.replace(/\${extensions}/, extensions);

            this.app.fh.wf(path.join(opts.name, this.fileName), template);
        }
    }
}

module.exports = Bundler;