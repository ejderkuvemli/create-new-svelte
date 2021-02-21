const path = require('path');
const fs = require('fs-extra');
const Handlebars = require('handlebars');
const beautify = require('js-beautify').js;

function ConfigFile(app) {
    this.config = { variables: [], entry: '', imports: [], rules: [], functions: [], plugins: [], extensions: [], exportType: '', exports: [] }
    this.type = 'es'; //node, es, json
    this.templateRoot = __dirname;
    this.app = app;
    this.name = this.app.o.bundler;
    this.mustExport = true;
    this.fileName = `${this.app.o.bundler}.config.js`;

    this.getFunc = function (func) {
        let body = func.toString();
        body = body.split('\n');
        body.shift();
        body.pop();
        body = body.join('\n').replace(/\r$/, '').replace(/^\s/, '\n ');
        return { body: body, imports: func.imports, needs: func.needs, requires: func.requires, requiresPlugin: func.requiresPlugin };
    }

    this.f = function (func) {
        this.config.functions.push(func.toString());
    }

    this.setPlugin = function (plugin, options, imports) {
        plugin = this.getFunc(plugin);
        if (options) {
            plugin.body = plugin.body.replace(/\{options\}/g, options.toString().match(/(\{)([^]*)\}/g)[0]);
        }
        if (imports) {
            imports.map(imp => this.i(imp));
        }
        this.ap(plugin);
        return plugin;
    }

    this.p = function (plugin, options, imports) {
        plugin = this.setPlugin(plugin, options, imports);
        this.config.plugins.push(plugin.body);
    }

    this.i = function (pkg, name) {
        const importAs = this.app.packager.add(pkg);
        name = name ? name : importAs ? importAs : pkg;
        name = Array.isArray(name) ? `{ ${name.join(', ')} }` : name;
        const i = this.type == 'es' ?
            `import ${name} from '${pkg}';` :
            `const ${name} = require('${pkg}');`;

        this.config.imports.push(i);
    }

    this.in = function (pkg) {
        this.i(pkg, pkg, false);
    }

    this.v = function (key, value) {
        let template;
        if (value) {
            template = `const ${key} = ${value};`;
        } else {
            template = `let ${key};`
        }
        this.config.variables.push(template);
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

    this.s = function (script, task, pkg) {
        this.app.packager.s(script, task, pkg);
    }

    this.export = function () {
        const configSource = fs.readFileSync(path.join(__dirname, `./config.hbs`), 'utf8');
        const exportsSource = fs.readFileSync(`${this.templateRoot}/exports.hbs`, 'utf8');
        Handlebars.registerPartial("exports", exportsSource);
        const configTemplate = Handlebars.compile(configSource, { preventIndent: true, noEscape: true });
        this.config.exportType = this.type === 'node' ? 'module.exports =' : 'export default';
        let configOutput = configTemplate(this.config);
        configOutput = beautify(configOutput);
        this.app.fh.wpf(this.fileName, configOutput);
    }
}

module.exports = ConfigFile;