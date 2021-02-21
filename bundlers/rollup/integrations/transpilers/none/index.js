const plugins = require('../../../plugins');

function NoTranspiler(bundler) {
    this.init = () => {
        bundler.config.entry = `'src/main.js'`;
        bundler.p(plugins.sveltePlugin, () => ({
            compilerOptions: {
                // enable run-time checks when not in production
                dev: !prod
            }
        }));
    }
}

module.exports = NoTranspiler;